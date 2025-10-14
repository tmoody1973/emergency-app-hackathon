# Product Requirements Document (PRD)
## RapidResponse AI - Emergency Response Matching Platform

**Version**: 1.0  
**Date**: October 14, 2025  
**Project Type**: Hackathon MVP (3-hour build)  
**Team**: Solo Developer  
**Tech Stack**: Next.js, Supabase, Google Gemini AI, Tailwind CSS

---

## 1. Executive Summary

### Problem Statement
Non-profit emergency response organizations face critical coordination bottlenecks when matching volunteers and business resources with community needs during crises. Current solutions rely on manual data entry, email chains, and phone calls, resulting in response delays that can cost lives.

### Solution
RapidResponse AI is an intelligent matching platform that uses conversational AI to eliminate manual coordination. People in need describe their situation in natural language, and the system automatically extracts structured data, matches them with nearby volunteers or businesses, and dispatches help—all within 60 seconds.

### Success Metrics (Hackathon Demo)
- **Intake Speed**: < 30 seconds from first message to structured data
- **Matching Speed**: < 10 seconds to identify top 3 matches
- **Response Time**: < 60 seconds total from need to volunteer notification
- **Automation Rate**: 100% (zero manual intervention in happy path)

---

## 2. User Personas

### Persona 1: Sarah - Person in Need
- **Age**: 35
- **Situation**: House flooded, family of 4 needs shelter
- **Tech Comfort**: Medium (uses smartphone daily)
- **Pain Points**: Stressed, overwhelmed, doesn't have time for complex forms
- **Needs**: Fast help, simple interface, reassurance

### Persona 2: Marcus - Volunteer
- **Age**: 28
- **Profile**: EMT with medical skills, available weekends
- **Tech Comfort**: High
- **Pain Points**: Gets too many irrelevant volunteer requests, wastes time on email coordination
- **Needs**: Relevant matches only, quick accept/decline, clear information

### Persona 3: Linda - Business Owner
- **Age**: 45
- **Profile**: Hotel manager, can offer 20 rooms for displaced families
- **Tech Comfort**: Medium
- **Pain Points**: Wants to help but doesn't know how to connect with organizations
- **Needs**: Easy way to offer resources, visibility into impact

### Persona 4: James - Non-Profit Coordinator
- **Age**: 52
- **Profile**: Emergency response coordinator, manages 200+ volunteers
- **Tech Comfort**: Low-Medium
- **Pain Points**: Spends 80% of time on manual coordination, can't scale
- **Needs**: Automated matching, real-time dashboard, minimal training required

---

## 3. Core Features & Requirements

### 3.1 AI Conversational Intake (Priority: P0)

**User Story**: As a person in need, I want to describe my emergency in my own words so that I can get help quickly without filling out forms.

**Functional Requirements**:
- Chat interface with message bubbles
- Real-time AI processing (< 5 second response time)
- Support for text input (voice optional for MVP)
- Conversational follow-up questions when information is incomplete
- Visual feedback showing what the AI has understood
- Mobile-responsive design (primary use case)

**Technical Requirements**:
- Next.js API route: `/api/intake`
- Google Gemini 2.5 Flash integration
- Structured prompt engineering for entity extraction
- JSON response parsing and validation
- Error handling for AI failures (fallback to simple form)

**Acceptance Criteria**:
- ✅ User can type natural language message
- ✅ AI extracts: emergency type, location, urgency, people affected, specific needs
- ✅ AI asks follow-up questions if critical data is missing
- ✅ Extracted data is displayed for user confirmation
- ✅ Complete intake process takes < 30 seconds

**Data Schema**:
```typescript
interface EmergencyIntake {
  emergency_type: 'flood' | 'fire' | 'earthquake' | 'hurricane' | 'layoff' | 'medical' | 'other';
  urgency: 'critical' | 'high' | 'medium' | 'low';
  location_address: string;
  location_city: string;
  location_state: string;
  location_lat: number | null;
  location_lng: number | null;
  people_affected: number;
  has_children: boolean;
  has_elderly: boolean;
  has_disabilities: boolean;
  specific_needs: string[]; // ['shelter', 'food', 'medical', etc.]
  additional_context: string;
  confidence: 'high' | 'medium' | 'low';
  is_complete: boolean;
}
```

---

### 3.2 Intelligent Matching Engine (Priority: P0)

**User Story**: As a coordinator, I want the system to automatically match emergencies with the best volunteers/businesses so that I don't have to manually review every request.

**Functional Requirements**:
- Automatic matching triggered on new emergency creation
- Multi-factor scoring algorithm
- Real-time matching (< 10 seconds)
- Top 3-5 matches returned per emergency
- Match reasoning explanation (why this volunteer was selected)

**Matching Algorithm Factors**:
1. **Geographic Proximity** (40% weight)
   - Calculate distance between emergency and volunteer
   - Volunteers must be within their specified max distance
   - Closer = higher score

2. **Skill/Resource Alignment** (30% weight)
   - Match specific needs with volunteer skills
   - Example: Medical emergency → volunteers with medical skills
   - Exact match > partial match > no match

3. **Availability** (20% weight)
   - "Available now" > "Weekends" > "Evenings"
   - Check if volunteer is already assigned to active emergency

4. **Historical Performance** (10% weight)
   - Volunteers with completed missions score higher
   - High ratings boost score
   - New volunteers get neutral score (not penalized)

**Technical Requirements**:
- Next.js API route: `/api/match`
- Haversine formula for distance calculation
- Supabase query optimization (indexes on location, skills)
- Background job processing (don't block intake)

**Acceptance Criteria**:
- ✅ Matching completes in < 10 seconds
- ✅ Returns 3-5 ranked matches with scores
- ✅ Includes match reasoning for each volunteer
- ✅ Handles edge cases (no matches found, all volunteers busy)
- ✅ Logs matching decisions for analytics

---

### 3.3 Automated Dispatch & Notifications (Priority: P0)

**User Story**: As a volunteer, I want to receive notifications only for relevant emergencies with a simple accept/decline option so that I can respond quickly.

**Functional Requirements**:
- Push notifications to matched volunteers (web push for MVP)
- Clear emergency summary in notification
- One-click accept/decline buttons
- Automatic status updates when volunteer responds
- Notify person in need when volunteer accepts

**Notification Content**:
- Emergency type with icon
- Urgency badge (color-coded)
- Distance from volunteer
- Brief description
- Estimated time commitment
- "Why you?" AI reasoning

**Technical Requirements**:
- Supabase Realtime for live updates
- Web Push API (browser notifications)
- Notification preferences (don't spam)
- Rate limiting (max 3 notifications per hour per volunteer)

**Acceptance Criteria**:
- ✅ Volunteers receive notification within 5 seconds of match
- ✅ Accept/decline updates database immediately
- ✅ Person in need sees "Help is on the way" message
- ✅ If volunteer declines, next best match is notified
- ✅ No duplicate notifications

---

### 3.4 Real-Time Dashboard (Priority: P1)

**User Story**: As a coordinator, I want to see all active emergencies and their status at a glance so that I can monitor the system and intervene if needed.

**Functional Requirements**:
- Live map showing active emergencies (color-coded by urgency)
- List of recent emergencies with status badges
- Volunteer availability overview
- Recent matches feed
- AI insights panel (predictive analytics)

**Dashboard Sections**:
1. **Top Metrics Bar**: Active requests, available volunteers, businesses ready
2. **Emergency Map**: Interactive pins with click-to-details
3. **Recent Matches**: Status tracking (pending, accepted, en route, completed)
4. **Activity Feed**: Real-time updates stream

**Technical Requirements**:
- Supabase Realtime subscriptions
- Map integration (Mapbox or Leaflet)
- Auto-refresh every 10 seconds
- Responsive layout (desktop primary, mobile secondary)

**Acceptance Criteria**:
- ✅ Dashboard updates in real-time without refresh
- ✅ Shows accurate volunteer availability count
- ✅ Map pins are clickable and show emergency details
- ✅ Activity feed shows last 20 events

---

### 3.5 Volunteer Profile & Onboarding (Priority: P1)

**User Story**: As a volunteer, I want to quickly create my profile with minimal effort so that I can start helping immediately.

**Functional Requirements**:
- AI-assisted profile creation (conversational, not forms)
- Skill extraction from natural language description
- Location selection (address or map pin)
- Availability preferences
- Emergency type preferences
- Import from existing volunteer database

**Onboarding Flow**:
1. Welcome screen
2. AI conversation: "Tell me about yourself and how you'd like to help"
3. AI-generated profile review
4. Location & radius selection
5. Confirmation & dashboard

**Technical Requirements**:
- Supabase Auth integration
- CSV import for existing volunteer database
- AI skill extraction using Gemini
- Geocoding for addresses

**Acceptance Criteria**:
- ✅ New volunteer can complete signup in < 2 minutes
- ✅ AI extracts skills accurately (90%+ precision)
- ✅ Existing database can be imported via CSV
- ✅ Profile can be edited later

---

### 3.6 Business Resource Offering (Priority: P2)

**User Story**: As a business owner, I want to easily offer my resources (rooms, meals, supplies) so that they can be matched with needs automatically.

**Functional Requirements**:
- Conversational resource description
- AI extraction of resource types and quantities
- Auto-matching with current needs
- Impact visibility (how many people helped)
- Resource expiration dates

**Resource Types**:
- Shelter (hotel rooms, spare rooms)
- Food (meals, groceries)
- Transportation (vehicles, rides)
- Supplies (clothing, blankets, tools)
- Services (medical, legal, counseling)
- Financial (donations, bill assistance)

**Technical Requirements**:
- Similar AI extraction as emergency intake
- Separate Supabase table for businesses
- Matching algorithm extension for business resources
- Admin approval workflow (optional for MVP)

**Acceptance Criteria**:
- ✅ Business can describe resources in natural language
- ✅ AI extracts resource type, quantity, duration
- ✅ Resources are automatically matched with needs
- ✅ Business sees impact metrics

---

## 4. Non-Functional Requirements

### Performance
- **Page Load**: < 2 seconds on 4G connection
- **AI Response**: < 5 seconds for intake processing
- **Matching Speed**: < 10 seconds for top 5 matches
- **Database Queries**: < 500ms for most operations

### Scalability
- **Concurrent Users**: Support 100+ simultaneous users (hackathon demo)
- **Database**: Supabase free tier (500MB, 50,000 monthly active users)
- **API Rate Limits**: Respect Gemini API limits (60 requests/minute)

### Security
- **Authentication**: Supabase Auth with email/password
- **Authorization**: Row-level security policies
- **Data Privacy**: Location data stored at address level, not exact coordinates (for privacy)
- **API Keys**: Environment variables, never exposed to client

### Accessibility
- **WCAG 2.1 AA**: Minimum contrast ratios, keyboard navigation
- **Screen Readers**: Semantic HTML, ARIA labels
- **Mobile**: Touch targets ≥ 44px, readable text sizes

### Browser Support
- **Primary**: Chrome, Safari (latest 2 versions)
- **Secondary**: Firefox, Edge
- **Mobile**: iOS Safari, Chrome Android

---

## 5. Technical Architecture

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend (Next.js)                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Chat Intake  │  │  Dashboard   │  │ Volunteer UI │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    API Routes (Next.js)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ /api/intake  │  │  /api/match  │  │ /api/notify  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
           │                    │                    │
           ▼                    ▼                    ▼
┌──────────────────┐  ┌──────────────────┐  ┌──────────────┐
│   Gemini AI      │  │    Supabase      │  │  Geocoding   │
│  (Extraction)    │  │   (Database)     │  │     API      │
└──────────────────┘  └──────────────────┘  └──────────────┘
```

### Data Flow: Emergency Intake

```
User Input → Chat UI → /api/intake → Gemini AI → Parse JSON
                                         ↓
                              Validate & Geocode
                                         ↓
                              Store in Supabase
                                         ↓
                              Trigger /api/match
                                         ↓
                              Find Best Matches
                                         ↓
                              Store Matches
                                         ↓
                              Send Notifications
```

### Database Schema (Supabase)

**Tables**:
1. `emergencies` - Active emergency requests
2. `volunteers` - Volunteer profiles
3. `businesses` - Business resource offerings
4. `matches` - Emergency-to-volunteer/business matches
5. `notifications` - Notification log
6. `feedback` - Post-mission ratings and feedback

**Relationships**:
- `emergencies` 1:N `matches`
- `volunteers` 1:N `matches`
- `businesses` 1:N `matches`
- `matches` 1:N `notifications`

---

## 6. User Flows

### Flow 1: Person in Need Requests Help

1. User visits site → Clicks "I Need Help"
2. Chat interface opens with AI greeting
3. User types: "My house flooded, need shelter for 4 people"
4. AI extracts data, asks: "Where are you located?"
5. User provides address
6. AI confirms: "Got it! Looking for help nearby..."
7. System matches → Notifies volunteers
8. User sees: "Sarah M. has been notified and will respond soon"
9. Volunteer accepts → User receives contact info
10. Mission completed → User rates experience

### Flow 2: Volunteer Receives and Accepts Request

1. Volunteer is logged in and marked "Available Now"
2. New emergency is created nearby
3. Matching algorithm identifies volunteer as top match
4. Volunteer receives browser notification
5. Clicks notification → Opens emergency details
6. Reviews: Type, location, distance, needs
7. Clicks "Accept & Get Directions"
8. Person in need is notified
9. Volunteer completes mission
10. Marks as complete → Provides feedback

### Flow 3: Business Offers Resources

1. Business owner visits site → "I Want to Help"
2. AI asks: "What resources can you provide?"
3. Owner types: "We have 20 hotel rooms available for 7 days"
4. AI extracts: Resource type (shelter), quantity (20), duration (7 days)
5. System checks current shelter needs
6. Shows: "15 families currently need shelter - your rooms can help!"
7. Owner confirms offer
8. System auto-matches with highest priority shelter requests
9. Families are notified of available rooms
10. Business sees impact dashboard

---

## 7. Success Criteria

### Hackathon Demo Success
- ✅ Complete intake-to-match flow works end-to-end
- ✅ Live demo shows < 60 second response time
- ✅ AI extraction accuracy > 85% on test cases
- ✅ Dashboard displays real-time updates
- ✅ Mobile-responsive UI works on phone
- ✅ Deployed to public URL (Vercel)

### Judge Evaluation Criteria
- **Innovation** (30%): AI-first design, zero-touch automation
- **Impact** (25%): Addresses real problem, scalable solution
- **Technical Execution** (25%): Clean code, working demo, proper architecture
- **User Experience** (20%): Intuitive UI, fast performance, accessible

### Post-Hackathon Goals (Optional)
- 10+ volunteers signed up
- 5+ test emergencies processed
- Partner with 1 local non-profit for pilot
- 95%+ AI extraction accuracy
- < 5 minute average response time (real-world)

---

## 8. Out of Scope (For MVP)

### Features NOT Included in 3-Hour Build
- ❌ SMS notifications (use web push only)
- ❌ Mobile native apps (web-only)
- ❌ Payment processing for donations
- ❌ Multi-language support (English only)
- ❌ Advanced analytics dashboard
- ❌ Volunteer training modules
- ❌ Integration with external emergency systems (FEMA, etc.)
- ❌ Video chat for remote assistance
- ❌ Volunteer background checks
- ❌ Insurance/liability management

### Future Enhancements (Post-Hackathon)
- Machine learning for improved matching
- Predictive needs forecasting based on weather data
- Integration with social media for viral emergency alerts
- Blockchain for transparent donation tracking
- AR/VR for remote disaster assessment
- IoT sensor integration for automatic emergency detection

---

## 9. Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| AI extraction fails | Medium | High | Fallback to simple form |
| No volunteers nearby | Medium | High | Show "expanding search radius" message |
| Gemini API rate limit | Low | High | Implement request queuing, caching |
| Geocoding API fails | Low | Medium | Allow manual pin drop on map |
| Supabase downtime | Very Low | Critical | Use Vercel Edge Functions as backup |
| Time overrun (>3 hours) | High | Medium | Prioritize P0 features only, cut P2 |

---

## 10. Appendix

### Glossary
- **Emergency**: A crisis situation requiring immediate volunteer/business assistance
- **Match**: A pairing between an emergency and a volunteer/business
- **Dispatch**: The act of notifying a volunteer about a matched emergency
- **Intake**: The process of collecting information about an emergency
- **Urgency Levels**: Critical (life-threatening), High (hours), Medium (days), Low (ongoing)

### References
- Gemini API Documentation: https://ai.google.dev/docs
- Supabase Documentation: https://supabase.com/docs
- Next.js App Router: https://nextjs.org/docs/app
- Haversine Distance Formula: https://en.wikipedia.org/wiki/Haversine_formula

### Version History
- v1.0 (Oct 14, 2025): Initial PRD for hackathon MVP

