/**
 * Rate Limiter Service
 *
 * Provides multi-layered protection against bot abuse and spam:
 * - IP-based rate limiting
 * - Session tracking
 * - Progressive delays
 * - Abuse detection
 */

interface RateLimitEntry {
  timestamps: number[];
  sessionIds: Set<string>;
  violations: number;
  lastViolation: number | null;
}

interface RateLimitConfig {
  maxRequestsPerHour: number;
  maxSessionsPerIP: number;
  cooldownMinutes: number;
  violationThreshold: number;
  blockDurationMinutes: number;
}

// In-memory storage (for production, use Redis or a database)
const rateLimitStore = new Map<string, RateLimitEntry>();
const sessionStore = new Map<string, { ip: string; createdAt: number; lastActivity: number }>();

// Configuration
const config: RateLimitConfig = {
  maxRequestsPerHour: 5, // Allow 5 conversations per hour per IP
  maxSessionsPerIP: 3, // Allow max 3 active sessions per IP
  cooldownMinutes: 30, // 30-second cooldown between requests
  violationThreshold: 3, // 3 violations = temporary block
  blockDurationMinutes: 60, // Block for 1 hour after violations
};

/**
 * Clean up old entries to prevent memory leaks
 */
function cleanupOldEntries() {
  const now = Date.now();
  const oneHourAgo = now - 60 * 60 * 1000;

  // Clean up rate limit store
  for (const [ip, entry] of rateLimitStore.entries()) {
    entry.timestamps = entry.timestamps.filter(ts => ts > oneHourAgo);
    if (entry.timestamps.length === 0 && entry.violations === 0) {
      rateLimitStore.delete(ip);
    }
  }

  // Clean up expired sessions (older than 2 hours)
  const twoHoursAgo = now - 2 * 60 * 60 * 1000;
  for (const [sessionId, session] of sessionStore.entries()) {
    if (session.lastActivity < twoHoursAgo) {
      sessionStore.delete(sessionId);
      // Remove from IP's session list
      const ipEntry = rateLimitStore.get(session.ip);
      if (ipEntry) {
        ipEntry.sessionIds.delete(sessionId);
      }
    }
  }
}

/**
 * Get or create rate limit entry for an IP
 */
function getRateLimitEntry(ip: string): RateLimitEntry {
  if (!rateLimitStore.has(ip)) {
    rateLimitStore.set(ip, {
      timestamps: [],
      sessionIds: new Set(),
      violations: 0,
      lastViolation: null,
    });
  }
  return rateLimitStore.get(ip)!;
}

/**
 * Check if IP is currently blocked due to violations
 */
export function isIPBlocked(ip: string): { blocked: boolean; reason?: string; retryAfter?: number } {
  const entry = getRateLimitEntry(ip);

  if (entry.violations >= config.violationThreshold && entry.lastViolation) {
    const blockUntil = entry.lastViolation + config.blockDurationMinutes * 60 * 1000;
    const now = Date.now();

    if (now < blockUntil) {
      const retryAfter = Math.ceil((blockUntil - now) / 1000);
      return {
        blocked: true,
        reason: 'Too many violations. Temporary block active.',
        retryAfter,
      };
    } else {
      // Block expired, reset violations
      entry.violations = 0;
      entry.lastViolation = null;
    }
  }

  return { blocked: false };
}

/**
 * Check rate limit for an IP address
 */
export function checkRateLimit(ip: string): {
  allowed: boolean;
  reason?: string;
  retryAfter?: number;
  delayMs?: number;
} {
  // Clean up old entries periodically
  if (Math.random() < 0.1) { // 10% chance on each call
    cleanupOldEntries();
  }

  // Check if IP is blocked
  const blockCheck = isIPBlocked(ip);
  if (blockCheck.blocked) {
    return {
      allowed: false,
      reason: blockCheck.reason,
      retryAfter: blockCheck.retryAfter,
    };
  }

  const now = Date.now();
  const entry = getRateLimitEntry(ip);
  const oneHourAgo = now - 60 * 60 * 1000;

  // Remove timestamps older than 1 hour
  entry.timestamps = entry.timestamps.filter(ts => ts > oneHourAgo);

  // Check hourly rate limit
  if (entry.timestamps.length >= config.maxRequestsPerHour) {
    entry.violations++;
    entry.lastViolation = now;

    const oldestTimestamp = entry.timestamps[0];
    const retryAfter = Math.ceil((oldestTimestamp + 60 * 60 * 1000 - now) / 1000);

    return {
      allowed: false,
      reason: `Rate limit exceeded. Maximum ${config.maxRequestsPerHour} requests per hour.`,
      retryAfter,
    };
  }

  // Progressive delay: add delay based on recent request count
  let delayMs = 0;
  if (entry.timestamps.length >= 3) {
    delayMs = 10000; // 10 seconds
  } else if (entry.timestamps.length >= 2) {
    delayMs = 5000; // 5 seconds
  } else if (entry.timestamps.length >= 1) {
    delayMs = 2000; // 2 seconds
  }

  // Log this request
  entry.timestamps.push(now);

  return {
    allowed: true,
    delayMs,
  };
}

/**
 * Create a new session
 */
export function createSession(ip: string, sessionId: string): {
  allowed: boolean;
  reason?: string;
} {
  const entry = getRateLimitEntry(ip);

  // Check max sessions per IP
  if (entry.sessionIds.size >= config.maxSessionsPerIP) {
    return {
      allowed: false,
      reason: `Too many active sessions from this IP. Maximum ${config.maxSessionsPerIP} allowed.`,
    };
  }

  // Create session
  sessionStore.set(sessionId, {
    ip,
    createdAt: Date.now(),
    lastActivity: Date.now(),
  });

  entry.sessionIds.add(sessionId);

  return { allowed: true };
}

/**
 * Update session activity
 */
export function updateSession(sessionId: string): boolean {
  const session = sessionStore.get(sessionId);
  if (session) {
    session.lastActivity = Date.now();
    return true;
  }
  return false;
}

/**
 * End a session
 */
export function endSession(sessionId: string): void {
  const session = sessionStore.get(sessionId);
  if (session) {
    const entry = rateLimitStore.get(session.ip);
    if (entry) {
      entry.sessionIds.delete(sessionId);
    }
    sessionStore.delete(sessionId);
  }
}

/**
 * Get session info
 */
export function getSession(sessionId: string): { ip: string; createdAt: number; lastActivity: number } | null {
  return sessionStore.get(sessionId) || null;
}

/**
 * Get statistics for monitoring
 */
export function getStatistics() {
  const now = Date.now();
  const stats = {
    totalIPs: rateLimitStore.size,
    totalSessions: sessionStore.size,
    blockedIPs: 0,
    activeViolations: 0,
    recentRequests: 0,
  };

  for (const [_, entry] of rateLimitStore.entries()) {
    if (entry.violations >= config.violationThreshold && entry.lastViolation) {
      const blockUntil = entry.lastViolation + config.blockDurationMinutes * 60 * 1000;
      if (now < blockUntil) {
        stats.blockedIPs++;
      }
    }
    if (entry.violations > 0) {
      stats.activeViolations++;
    }
    stats.recentRequests += entry.timestamps.length;
  }

  return stats;
}

/**
 * Get detailed info for admin dashboard
 */
export function getDetailedStats() {
  const ips: Array<{
    ip: string;
    requestCount: number;
    sessionCount: number;
    violations: number;
    blocked: boolean;
  }> = [];

  for (const [ip, entry] of rateLimitStore.entries()) {
    const blockCheck = isIPBlocked(ip);
    ips.push({
      ip,
      requestCount: entry.timestamps.length,
      sessionCount: entry.sessionIds.size,
      violations: entry.violations,
      blocked: blockCheck.blocked,
    });
  }

  // Sort by violations desc, then by request count desc
  ips.sort((a, b) => {
    if (a.violations !== b.violations) return b.violations - a.violations;
    return b.requestCount - a.requestCount;
  });

  return {
    summary: getStatistics(),
    ips: ips.slice(0, 50), // Top 50 IPs
    config,
  };
}
