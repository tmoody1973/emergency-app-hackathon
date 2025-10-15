'use client';

import { useEffect, useState } from 'react';
import DashboardHeader from '@/components/layout/DashboardHeader';

interface SecurityStats {
  summary: {
    totalIPs: number;
    totalSessions: number;
    blockedIPs: number;
    activeViolations: number;
    recentRequests: number;
  };
  ips: Array<{
    ip: string;
    requestCount: number;
    sessionCount: number;
    violations: number;
    blocked: boolean;
  }>;
  config: {
    maxRequestsPerHour: number;
    maxSessionsPerIP: number;
    violationThreshold: number;
    blockDurationMinutes: number;
  };
}

export default function SecurityDashboard() {
  const [stats, setStats] = useState<SecurityStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  const loadStats = async () => {
    try {
      const response = await fetch('/api/admin/security');
      const data = await response.json();

      if (data.success) {
        setStats(data);
        setLastUpdated(new Date(data.timestamp).toLocaleString());
      }
    } catch (error) {
      console.error('Error loading security stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadStats();

    // Auto-refresh every 30 seconds
    const interval = setInterval(loadStats, 30000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        <DashboardHeader />
        <main className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#3B82F6] mx-auto mb-4"></div>
              <p className="text-gray-600">Loading security statistics...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        <DashboardHeader />
        <main className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <p className="text-gray-600">Unable to load security statistics</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Page Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-black mb-2">Security Dashboard</h1>
            <p className="text-lg text-gray-700">
              Monitor rate limiting, bot protection, and system security
            </p>
          </div>
          <button
            onClick={loadStats}
            className="rounded-lg bg-[#3B82F6] px-6 py-2 text-sm font-semibold text-white hover:bg-[#2563EB] transition-colors"
          >
            Refresh
          </button>
        </div>

        {/* Last Updated */}
        <div className="mb-6 text-sm text-gray-600">
          Last updated: {lastUpdated} • Auto-refreshes every 30 seconds
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          {/* Total IPs */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-600">Total IPs</p>
              <svg className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.summary.totalIPs}</p>
          </div>

          {/* Active Sessions */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-600">Active Sessions</p>
              <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.summary.totalSessions}</p>
          </div>

          {/* Recent Requests */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-600">Recent Requests</p>
              <svg className="h-5 w-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.summary.recentRequests}</p>
          </div>

          {/* Blocked IPs */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-600">Blocked IPs</p>
              <svg className="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-red-600">{stats.summary.blockedIPs}</p>
          </div>

          {/* Violations */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-600">Active Violations</p>
              <svg className="h-5 w-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-orange-600">{stats.summary.activeViolations}</p>
          </div>
        </div>

        {/* Configuration */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Rate Limit Configuration</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Max Requests/Hour</p>
              <p className="text-2xl font-bold text-gray-900">{stats.config.maxRequestsPerHour}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Max Sessions/IP</p>
              <p className="text-2xl font-bold text-gray-900">{stats.config.maxSessionsPerIP}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Violation Threshold</p>
              <p className="text-2xl font-bold text-gray-900">{stats.config.violationThreshold}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Block Duration</p>
              <p className="text-2xl font-bold text-gray-900">{stats.config.blockDurationMinutes} min</p>
            </div>
          </div>
        </div>

        {/* IP Details Table */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">IP Activity</h2>
            <p className="text-sm text-gray-600 mt-1">Detailed view of the most active IPs (top 50)</p>
          </div>

          {stats.ips.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-600">No IP activity recorded yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      IP Address
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Requests (1h)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Active Sessions
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Violations
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {stats.ips.map((ip, index) => (
                    <tr key={index} className={ip.blocked ? 'bg-red-50' : ''}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                        {ip.ip}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className={`font-semibold ${ip.requestCount >= stats.config.maxRequestsPerHour ? 'text-red-600' : ''}`}>
                          {ip.requestCount}
                        </span>
                        <span className="text-gray-500"> / {stats.config.maxRequestsPerHour}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className={`font-semibold ${ip.sessionCount >= stats.config.maxSessionsPerIP ? 'text-orange-600' : ''}`}>
                          {ip.sessionCount}
                        </span>
                        <span className="text-gray-500"> / {stats.config.maxSessionsPerIP}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {ip.violations > 0 ? (
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            ip.violations >= stats.config.violationThreshold
                              ? 'bg-red-100 text-red-800 border border-red-200'
                              : 'bg-orange-100 text-orange-800 border border-orange-200'
                          }`}>
                            {ip.violations} violation{ip.violations !== 1 ? 's' : ''}
                          </span>
                        ) : (
                          <span className="text-gray-400">None</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {ip.blocked ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                            🚫 Blocked
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                            ✓ Active
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">How Protection Works</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• <strong>Honeypot</strong>: Hidden field catches simple bots</li>
            <li>• <strong>Rate Limiting</strong>: Max {stats.config.maxRequestsPerHour} requests per hour per IP</li>
            <li>• <strong>Progressive Delays</strong>: Responses slow down for repeated requests</li>
            <li>• <strong>Session Limits</strong>: Max {stats.config.maxSessionsPerIP} active conversations per IP</li>
            <li>• <strong>reCAPTCHA</strong>: Shown after 3 messages or on suspicious activity</li>
            <li>• <strong>Auto-Block</strong>: {stats.config.violationThreshold} violations = {stats.config.blockDurationMinutes}-minute block</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
