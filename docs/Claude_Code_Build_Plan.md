# Claude Code Build Plan - RapidResponse AI
## 3-Hour Hackathon Implementation Guide

This document provides step-by-step prompts to use with Claude Code (formerly Claude Dev) to build the emergency response platform efficiently.

---

## Pre-Build Setup (5 minutes)

### 1. Create Supabase Project
1. Go to https://supabase.com
2. Create new project: "emergency-response"
3. Save your credentials:
   - Project URL: `https://xxxxx.supabase.co`
   - Anon Key: `eyJhbGc...`
   - Service Role Key: `eyJhbGc...` (for server-side)

### 2. Get Gemini API Key
1. Go to https://aistudio.google.com/app/apikey
2. Create API key
3. Save it: `AIzaSy...`

### 3. Install Claude Code
- VS Code Extension: Install "Claude Dev" or use Claude with Code capability
- Have your Anthropic API key ready

---

## Hour 1: Foundation (0:00 - 1:00)

### Prompt 1.1: Initialize Next.js Project (Minutes 0-5)

```
Create a new Next.js 14 project with the following specifications:

Project name: emergency-response-ai
Use TypeScript: Yes
Use Tailwind CSS: Yes
Use App Router: Yes
Use src/ directory: Yes
Import alias: @/*

After creation, install these additional dependencies:
- @supabase/supabase-js (latest)
- @google/generative-ai (latest)

Create a .env.local file with these variables (I'll provide the actual values):
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_KEY=
GEMINI_API_KEY=

Set up the basic folder structure:
/src
  /app
    /api
      /intake
      /match
      /notify
    /dashboard
    /intake
    /volunteer
    layout.tsx
    page.tsx
  /components
    /ui
    /chat
    /dashboard
  /lib
    supabase.ts
    gemini.ts
    utils.ts
  /types
    index.ts
```

### Prompt 1.2: Set Up Supabase Client (Minutes 5-10)

```
Create a Supabase client configuration in /src/lib/supabase.ts with:

1. A client-side Supabase client using the public anon key
2. A server-side Supabase client using the service role key (for API routes)
3. TypeScript types for our database schema

Also create /src/types/index.ts with these TypeScript interfaces:

- Emergency (id, created_at, emergency_type, description, location_lat, location_lng, location_address, urgency, people_affected, specific_needs, status, ai_extracted_data)
- Volunteer (id, user_id, name, email, phone, location_lat, location_lng, skills, availability, max_distance_miles, total_missions, rating, is_active)
- Business (id, user_id, business_name, contact_name, resources, location_lat, location_lng)
- Match (id, emergency_id, volunteer_id, business_id, match_score, match_reasoning, status, accepted_at, completed_at)

Use proper TypeScript types (string, number, boolean, Date, JSON objects).
```

### Prompt 1.3: Create Database Schema in Supabase (Minutes 10-15)

```
Generate SQL commands to create the following tables in Supabase:

1. emergencies table with columns:
   - id (uuid, primary key, default uuid_generate_v4())
   - created_at (timestamp, default now())
   - emergency_type (text, not null)
   - description (text)
   - location_lat (decimal)
   - location_lng (decimal)
   - location_address (text)
   - urgency (text, not null)
   - people_affected (integer)
   - specific_needs (jsonb)
   - status (text, default 'open')
   - requester_contact (text)
   - ai_extracted_data (jsonb)
   - has_children (boolean, default false)
   - has_elderly (boolean, default false)
   - has_disabilities (boolean, default false)

2. volunteers table with columns:
   - id (uuid, primary key)
   - user_id (uuid, references auth.users)
   - created_at (timestamp)
   - name (text, not null)
   - email (text)
   - phone (text)
   - location_lat (decimal)
   - location_lng (decimal)
   - location_address (text)
   - skills (jsonb)
   - availability (text)
   - max_distance_miles (integer, default 25)
   - emergency_preferences (jsonb)
   - total_missions (integer, default 0)
   - rating (decimal, default 5.0)
   - is_active (boolean, default true)

3. businesses table with columns:
   - id (uuid, primary key)
   - user_id (uuid, references auth.users)
   - created_at (timestamp)
   - business_name (text, not null)
   - contact_name (text)
   - email (text)
   - phone (text)
   - location_lat (decimal)
   - location_lng (decimal)
   - location_address (text)
   - resources (jsonb)
   - resource_descriptions (text)
   - availability_duration (text)
   - auto_match (boolean, default true)

4. matches table with columns:
   - id (uuid, primary key)
   - created_at (timestamp)
   - emergency_id (uuid, references emergencies)
   - volunteer_id (uuid, references volunteers, nullable)
   - business_id (uuid, references businesses, nullable)
   - match_score (decimal)
   - match_reasoning (text)
   - status (text, default 'pending')
   - accepted_at (timestamp, nullable)
   - completed_at (timestamp, nullable)
   - feedback_rating (integer)
   - feedback_notes (text)

Also create indexes on:
- emergencies(status, urgency, created_at)
- volunteers(is_active, location_lat, location_lng)
- matches(emergency_id, status)

Enable Row Level Security on all tables.
Enable Realtime on emergencies and matches tables.
```

**Action**: Copy the generated SQL and run it in Supabase SQL Editor.

### Prompt 1.4: Build Chat UI Component (Minutes 15-30)

```
Create a chat interface component for emergency intake at /src/components/chat/ChatInterface.tsx

Requirements:
- Clean, mobile-first design using Tailwind CSS
- Message bubbles (AI on left, user on right)
- Text input at bottom with send button
- Microphone icon button (non-functional for MVP, just visual)
- Typing indicator when AI is processing
- Auto-scroll to latest message
- Display "What AI understood" card showing extracted data
- Calming color scheme (soft blues, whites)

The component should:
- Accept messages array as prop
- Have onSendMessage callback
- Show loading state
- Be fully responsive

Use modern React patterns (hooks, TypeScript).
Include proper accessibility (ARIA labels, keyboard navigation).
```

### Prompt 1.5: Create Gemini AI Integration (Minutes 30-45)

```
Create a Gemini AI helper function in /src/lib/gemini.ts

The function should:
1. Initialize Gemini 2.0 Flash model
2. Accept a user message and conversation history
3. Use a structured prompt to extract emergency data
4. Return parsed JSON with this structure:
   {
     emergency_type: string,
     urgency: string,
     location_address: string,
     location_city: string,
     location_state: string,
     people_affected: number,
     has_children: boolean,
     has_elderly: boolean,
     has_disabilities: boolean,
     specific_needs: string[],
     additional_context: string,
     confidence: string,
     missing_info: string[],
     follow_up_question: string | null,
     is_complete: boolean
   }

The prompt should instruct Gemini to:
- Extract structured emergency information
- Identify urgency level (critical, high, medium, low)
- Detect special circumstances (children, elderly, disabilities)
- Ask follow-up questions if critical info is missing
- Return ONLY valid JSON, no markdown

Include error handling for:
- Invalid JSON responses
- API failures
- Rate limiting

Use TypeScript with proper types.
```

### Prompt 1.6: Build Intake API Route (Minutes 45-60)

```
Create the emergency intake API route at /src/app/api/intake/route.ts

This route should:
1. Accept POST requests with { message, conversationHistory }
2. Call the Gemini extraction function
3. If data is incomplete, return { type: 'follow_up', question: string }
4. If data is complete:
   - Geocode the address using Nominatim API (https://nominatim.openstreetmap.org/search)
   - Store the emergency in Supabase emergencies table
   - Return { type: 'success', emergency: object }
5. Handle errors gracefully

Include:
- TypeScript types
- Input validation
- Error handling
- Logging for debugging

The geocoding function should:
- Take an address string
- Call Nominatim API
- Return { lat, lng } or { lat: null, lng: null }
- Handle API failures

Use Next.js 14 App Router API route format.
```

---

## Hour 2: Core Logic (1:00 - 2:00)

### Prompt 2.1: Create Matching Algorithm (Minutes 60-75)

```
Create a matching algorithm in /src/lib/matching.ts

The algorithm should:
1. Accept an emergency ID
2. Query all active volunteers from Supabase
3. Calculate a match score (0-100) for each volunteer based on:
   - Distance (40% weight): Use Haversine formula
   - Skill match (30% weight): Compare emergency needs with volunteer skills
   - Availability (20% weight): "available_now" scores highest
   - Experience (10% weight): Based on total_missions and rating
4. Return top 5 matches sorted by score
5. Generate match reasoning text for each match

Include these helper functions:
- calculateDistance(lat1, lng1, lat2, lng2): Haversine formula
- calculateSkillMatch(needs, skills): Returns 0-1 score
- generateMatchReasoning(volunteer, emergency, score): Returns explanation string

Store matches in the matches table with:
- emergency_id
- volunteer_id
- match_score
- match_reasoning
- status: 'pending'

Use TypeScript with proper types.
Return empty array if no matches found (don't throw error).
```

### Prompt 2.2: Build Match API Route (Minutes 75-85)

```
Create the matching API route at /src/app/api/match/route.ts

This route should:
1. Accept POST requests with { emergency_id }
2. Call the matching algorithm
3. Store matches in Supabase matches table
4. Trigger notifications (for now, just log - we'll implement later)
5. Return the matches array

Include:
- Input validation (emergency_id must exist)
- Error handling
- TypeScript types
- Background processing (don't block response)

Use Next.js 14 App Router format.
```

### Prompt 2.3: Create Intake Page (Minutes 85-100)

```
Create the emergency intake page at /src/app/intake/page.tsx

This page should:
1. Display the ChatInterface component
2. Manage conversation state (messages array)
3. Call /api/intake when user sends message
4. Handle AI responses:
   - If follow_up, add AI question to messages
   - If success, show success message and redirect to confirmation
5. Display "What we understood" card when data is extracted
6. Show loading states

Include:
- Welcoming header: "Tell us what you need - we're here to help"
- Subheading explaining the conversational approach
- Mobile-responsive layout
- Error handling with user-friendly messages

Use React hooks (useState, useEffect).
Use Tailwind CSS for styling.
```

### Prompt 2.4: Build Dashboard Page (Minutes 100-120)

```
Create the admin dashboard at /src/app/dashboard/page.tsx

The dashboard should display:
1. Top metrics bar:
   - Active emergencies count
   - Available volunteers count
   - Total matches today
2. Emergency list (real-time):
   - Card for each emergency
   - Color-coded urgency (red=critical, orange=high, yellow=medium)
   - Status badge (open, matched, in_progress, resolved)
   - Location and time ago
   - Click to expand details
3. Recent matches section:
   - Match cards showing volunteer → emergency
   - Match score and reasoning
   - Status (pending, accepted, declined)

Use Supabase Realtime to subscribe to emergencies and matches tables.
Auto-update when new data arrives.

Include:
- Loading states
- Empty states ("No active emergencies")
- Responsive grid layout
- Tailwind CSS styling

Use TypeScript and React hooks.
```

---

## Hour 3: Polish & Demo (2:00 - 3:00)

### Prompt 3.1: Create Volunteer View (Minutes 120-135)

```
Create the volunteer notification view at /src/app/volunteer/page.tsx

This page should:
1. Display pending matches for the logged-in volunteer
2. Show emergency details:
   - Emergency type with icon
   - Urgency badge
   - Distance from volunteer
   - Description
   - People affected
   - "Why you?" reasoning
3. Large "Accept" and "Decline" buttons
4. Update match status when clicked
5. Show "No pending matches" when empty

Include:
- Mock volunteer ID for demo (hardcoded)
- Real-time updates using Supabase subscriptions
- Success/error messages
- Mobile-optimized design
- Tailwind CSS styling

When Accept is clicked:
- Update match status to 'accepted'
- Update match accepted_at timestamp
- Show success message
- Optionally show contact info

Use TypeScript and React hooks.
```

### Prompt 3.2: Add Business Resource Page (Minutes 135-145)

```
Create the business resource offering page at /src/app/business/page.tsx

This page should:
1. Have a conversational text area: "Describe what resources you can provide..."
2. AI extraction button
3. Display extracted resources as cards:
   - Resource type
   - Quantity
   - Duration
   - Edit button
4. Show current needs that match the offer
5. "Confirm & Publish" button to store in database

For MVP, use a simplified version:
- Text area for resource description
- Simple parsing (can be basic, not full AI)
- Store in businesses table
- Display confirmation

Use Tailwind CSS for clean, professional design.
Include TypeScript types.
```

### Prompt 3.3: Improve Home Page (Minutes 145-155)

```
Create an engaging home page at /src/app/page.tsx

The page should have:
1. Hero section:
   - Headline: "Emergency Response, Powered by AI"
   - Subheadline: "Connecting people in need with volunteers and businesses in under 60 seconds"
   - Two CTA buttons: "I Need Help" and "I Want to Volunteer"
2. How It Works section (3 steps):
   - Step 1: Describe your emergency
   - Step 2: AI matches you instantly
   - Step 3: Help arrives
3. Stats section:
   - Mock stats: "1,247 people helped", "342 volunteers", "8 min avg response time"
4. Footer with links

Use:
- Modern, clean design
- Tailwind CSS
- Responsive layout
- Engaging visuals (can use emoji icons for MVP)
- Professional color scheme (blues, greens)

Link buttons to /intake and /volunteer routes.
```

### Prompt 3.4: Create Mock Data Seeder (Minutes 155-165)

```
Create a data seeding script at /scripts/seed-data.ts

This script should insert realistic mock data into Supabase:

1. 15-20 volunteers with:
   - Diverse names
   - Various skills (medical, construction, food service, transportation, counseling)
   - Different locations (spread across a city)
   - Availability statuses
   - Realistic ratings and mission counts

2. 5-8 businesses with:
   - Hotel (50 rooms)
   - Restaurant (200 meals/day)
   - Transportation company (10 vehicles)
   - Medical clinic
   - Grocery store

3. 5-10 sample emergencies with:
   - Different types (flood, fire, layoff)
   - Various urgency levels
   - Realistic descriptions
   - Different locations

4. Some matches (showing different statuses)

The script should:
- Use the Supabase service key
- Insert data in correct order (respecting foreign keys)
- Log progress
- Be runnable with: node scripts/seed-data.ts

Include TypeScript types and error handling.
```

**Action**: Run the seeder script to populate your database.

### Prompt 3.5: Add Real-Time Features (Minutes 165-175)

```
Enhance the dashboard and volunteer pages with Supabase Realtime subscriptions.

For /src/app/dashboard/page.tsx:
- Subscribe to emergencies table changes
- Subscribe to matches table changes
- Auto-update the UI when new data arrives
- Show toast notification for new emergencies

For /src/app/volunteer/page.tsx:
- Subscribe to matches where volunteer_id = current user
- Show browser notification when new match arrives (if permission granted)
- Auto-update match list

Include:
- Cleanup on component unmount
- Error handling for subscription failures
- Loading states during initial fetch

Use React useEffect for subscriptions.
Request notification permission on page load.
```

### Prompt 3.6: Final Polish & Deployment Prep (Minutes 175-180)

```
Perform final polish and prepare for deployment:

1. Update /src/app/layout.tsx:
   - Add proper meta tags (title, description)
   - Add favicon
   - Set up Google Fonts (Inter)
   - Add global styles

2. Create a README.md with:
   - Project description
   - Setup instructions
   - Environment variables needed
   - How to run locally
   - Demo credentials

3. Add loading.tsx and error.tsx files for better UX

4. Verify all environment variables are set

5. Test the complete flow:
   - Intake → Match → Accept
   - Dashboard updates in real-time
   - Mobile responsiveness

6. Prepare for Vercel deployment:
   - Ensure all env vars are documented
   - Check build succeeds: npm run build
   - Create vercel.json if needed

Generate a deployment checklist.
```

---

## Deployment (After 3 Hours)

### Prompt D.1: Deploy to Vercel

```
I need to deploy this Next.js app to Vercel. Provide:

1. Step-by-step deployment instructions
2. Environment variables to set in Vercel dashboard
3. Any build configuration needed
4. How to test the deployed app
5. Troubleshooting common deployment issues

Also create a vercel.json file if any special configuration is needed.
```

**Manual Steps**:
1. Push code to GitHub
2. Connect GitHub repo to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy
5. Test live URL

---

## Demo Preparation

### Prompt Demo.1: Create Demo Script

```
Create a demo script for the hackathon presentation that showcases:

1. The problem (current manual process)
2. Our solution (AI-powered automation)
3. Live demo flow:
   - Show home page
   - Go to intake, type emergency
   - Show AI extraction
   - Switch to dashboard, show match
   - Switch to volunteer view, accept
   - Back to dashboard, show status update
4. Impact metrics
5. Future vision

Include:
- What to say at each step
- Which screens to show
- Timing (aim for 3 minutes)
- Backup plan if live demo fails

Also suggest 3-5 demo scenarios to prepare:
- Flood emergency
- Fire evacuation
- Layoff support
```

---

## Troubleshooting Prompts

### If AI Extraction Fails:

```
The Gemini AI is not returning valid JSON. Help me debug:

1. Show me how to log the raw AI response
2. Improve the prompt to be more explicit about JSON format
3. Add better error handling to parse markdown-wrapped JSON
4. Create a fallback simple form if AI fails repeatedly

Provide updated code for /src/lib/gemini.ts
```

### If Matching Returns No Results:

```
The matching algorithm is returning empty arrays. Help me debug:

1. Add logging to see which volunteers are being queried
2. Check if distance calculation is working correctly
3. Verify Supabase query is correct
4. Add a "expand search radius" fallback
5. Create better empty state handling

Provide updated code for /src/lib/matching.ts
```

### If Real-Time Subscriptions Don't Work:

```
Supabase Realtime subscriptions are not updating the UI. Help me:

1. Verify Realtime is enabled on the tables
2. Check the subscription code for errors
3. Add console logging to debug
4. Ensure proper cleanup on unmount
5. Test with manual database updates

Provide updated code for the dashboard component.
```

---

## Quick Reference: Claude Code Best Practices

### How to Use These Prompts:

1. **Copy-paste entire prompt** into Claude Code chat
2. **Review generated code** before accepting
3. **Test immediately** after each prompt
4. **Ask follow-up questions** if something doesn't work
5. **Iterate quickly** - don't get stuck on perfection

### Effective Follow-Up Prompts:

- "This code has an error: [paste error]. How do I fix it?"
- "Can you add [feature] to this component?"
- "Make this mobile-responsive"
- "Add TypeScript types to this function"
- "Improve the styling of this component"

### Time-Saving Tips:

- Use Claude to generate boilerplate (types, schemas, configs)
- Ask for "complete, production-ready code" to avoid placeholders
- Request "with error handling and TypeScript" upfront
- Ask for "mobile-first, Tailwind CSS" for styling
- Use "create tests for this function" if time permits

---

## Success Checklist

Before the demo, verify:

- [ ] Database is seeded with realistic data
- [ ] All environment variables are set
- [ ] App is deployed to Vercel with working URL
- [ ] Intake flow works end-to-end
- [ ] Matching algorithm returns results
- [ ] Dashboard shows real-time updates
- [ ] Volunteer view displays pending matches
- [ ] Mobile layout works on phone
- [ ] Demo script is rehearsed
- [ ] Backup screenshots/video ready

---

## Emergency Shortcuts (If Running Out of Time)

### Cut These Features First:
1. Business resource page (focus on volunteers only)
2. Real-time subscriptions (use manual refresh)
3. Geocoding (use hardcoded coordinates)
4. Notification system (just show in UI)

### Minimum Viable Demo:
1. Intake chat with AI extraction ✅
2. Dashboard showing emergencies ✅
3. Matching algorithm working ✅
4. Volunteer accept/decline ✅

**Focus on ONE complete user flow rather than many half-finished features.**

---

Good luck with your build! 🚀

