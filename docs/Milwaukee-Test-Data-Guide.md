# Milwaukee Test Data Guide

## 📍 Overview

This guide explains the test data included in `seed-milwaukee-data.sql` - realistic mock data for testing all features of the RapidResponse Emergency App, especially the map and matching features.

All data is based in **Milwaukee, Wisconsin** with real addresses and accurate coordinates.

---

## 🗂️ What's Included

### Summary:
- **10 Businesses** - Local Milwaukee businesses offering various resources
- **15 Volunteers** - Individuals with diverse skills across the city
- **15 Emergencies** - Active situations spanning all urgency levels and types

---

## 🏢 Businesses (10 total)

### Geographic Distribution:

**Downtown Milwaukee:**
1. **Milwaukee Restaurant Group** - Food service for up to 100 people
2. **Bay View Hardware & Supply** - Emergency repair supplies and tools
3. **Riverwest Community Center** - 24/7 emergency shelter for 50 people

**East Side:**
4. **East Side Movers & Transport** - Moving trucks and storage
5. **UWM Medical Clinic** - Basic medical care and first aid

**South Side:**
6. **South Side Grocers** - Food and supplies donations
7. **Mitchell Street Clothing Depot** - Clothing and blankets

**West Side:**
8. **West Milwaukee Plumbing Services** - 24/7 emergency plumbing
9. **Capitol Drive Auto Center** - Vehicle repairs and towing

**North Side:**
10. **Northside Family Services** - Financial aid, food, housing, counseling

### Resources Available:
- 🍽️ Food & Meals (4 businesses)
- 🏠 Shelter (2 businesses)
- 🚗 Transportation (3 businesses)
- 🔧 Repairs (4 businesses)
- 👕 Clothing (2 businesses)
- 💰 Financial Aid (1 business)
- 🏥 Medical (2 businesses)

### All businesses have:
- Contact information (name, email, phone)
- Real Milwaukee addresses with lat/lng coordinates
- Detailed resource descriptions
- Availability hours
- `auto_match: true` (will appear in automatic matching)

---

## 🙋 Volunteers (15 total)

### Skills Distribution:

**Medical/Healthcare:**
- Emily Rodriguez - First aid, bilingual Spanish, childcare
- Rachel Thompson - Nursing, medical, childcare
- Daniel Rivera - Bilingual Spanish, medical, first aid

**Construction/Repairs:**
- Kevin Walsh - Handyman, electrical, plumbing
- Marcus Johnson - Heavy lifting, transportation, construction
- Robert Green - Construction, roofing, handyman
- Tyler Jackson - Automotive, transportation, handyman

**Social Services:**
- Angela Kowalski - Social work, counseling, elderly care
- Sofia Hernandez - Bilingual Spanish, cooking, childcare, elderly care
- Jasmine Davis - Social work, counseling, community organizing
- Lisa Martinez - Bilingual Spanish, legal aid, advocacy

**Support Services:**
- Samantha Lee - Cooking, organizing, transportation
- Chris Anderson - Technology, communication, organizing
- Nicole Smith - Teaching, tutoring, childcare
- Brandon Williams - Youth mentoring, sports, transportation

### Geographic Coverage:
- Downtown: 2 volunteers
- Bay View: 2 volunteers
- Riverwest: 2 volunteers
- East Side: 2 volunteers
- South Side: 2 volunteers
- West Side: 2 volunteers
- North Side: 3 volunteers

### Availability:
- Weekday evenings: 8 volunteers
- Weekends: 10 volunteers
- Flexible/quick response: 5 volunteers
- Business hours: 4 volunteers

### Experience Levels:
- Newcomers (0-5 missions): 3 volunteers
- Experienced (6-15 missions): 6 volunteers
- Veterans (16+ missions): 6 volunteers

### Max Distance:
- 8-12 miles: 5 volunteers
- 13-20 miles: 7 volunteers
- 21-30 miles: 3 volunteers

---

## 🚨 Emergencies (15 total)

### By Urgency:

**Critical (3 emergencies):**
1. **Flood** - Family of 4 trapped, water rising (2834 N 25th St, North Side)
2. **Fire** - Elderly couple lost home (1456 W Becher St, South Side)
3. **Medical** - Single mother, child needs urgent medication (3567 S 16th St, South Side)

**High (4 emergencies):**
4. **Flood** - Basement flooding, equipment at risk (4789 N Oakland Ave, East Side)
5. **Layoff** - Family of 5 out of food (2145 W National Ave, South Side)
6. **Medical** - Elderly man post-surgery needs care (5678 W Burleigh St, West Side)
7. **Hurricane** - Severe roof damage, elderly couple (1823 S 5th St, South Side)

**Medium (5 emergencies):**
8. **Layoff** - Recently unemployed with 2 teens (3421 N Holton St, Riverwest)
9. **Flood** - Minor basement flooding, mold concern (6234 W Capitol Dr, North Side)
10. **Other** - Car broke down, need transportation (4567 N 35th St, North Side)
11. **Medical** - Postpartum depression support needed (2789 S Delaware Ave, Bay View)
12. **Layoff** - Need job search help (1534 W Lincoln Ave, South Side)

**Low (3 emergencies):**
13. **Other** - Elderly companionship and shopping help (2156 E Park Pl, East Side)
14. **Other** - New to Milwaukee, need resources info (3821 W Vliet St, West Side)
15. **Other** - Organizing community cleanup (1945 N Bremen St, Riverwest)

### By Type:
- 🌊 Flood: 3 emergencies
- 🔥 Fire: 1 emergency
- 🏥 Medical: 3 emergencies
- 💼 Layoff: 3 emergencies
- 🌪️ Hurricane: 1 emergency
- 📋 Other: 4 emergencies

### Demographics:
- **Children involved:** 8 emergencies (53%)
- **Elderly involved:** 4 emergencies (27%)
- **Disabilities involved:** 2 emergencies (13%)
- **People affected:** 1-5 per emergency (avg: 2.5)

### Common Needs:
- Food: 8 emergencies
- Shelter: 2 emergencies
- Medical: 5 emergencies
- Financial: 5 emergencies
- Transportation: 5 emergencies
- Repairs: 4 emergencies
- Clothing: 4 emergencies
- Supplies: 6 emergencies

---

## 🗺️ Map Coverage

### Milwaukee Neighborhoods Represented:

**Downtown:**
- Businesses: 1
- Volunteers: 2
- Emergencies: 0

**East Side:**
- Businesses: 2
- Volunteers: 2
- Emergencies: 2

**Bay View:**
- Businesses: 1
- Volunteers: 2
- Emergencies: 1

**Riverwest:**
- Businesses: 1
- Volunteers: 2
- Emergencies: 2

**South Side:**
- Businesses: 2
- Volunteers: 2
- Emergencies: 4

**West Side:**
- Businesses: 2
- Volunteers: 2
- Emergencies: 2

**North Side:**
- Businesses: 1
- Volunteers: 3
- Emergencies: 4

### Coordinate Ranges:
- **Latitude:** 42.9867 to 43.0945 (Milwaukee metro area)
- **Longitude:** -87.8756 to -87.9956 (Milwaukee metro area)
- **Center point:** Approximately 43.0389, -87.9065 (Downtown Milwaukee)

---

## 🎯 How to Use This Data

### 1. Load the Data

**In Supabase SQL Editor:**
```sql
-- Open Supabase Dashboard → SQL Editor → New Query
-- Copy/paste the entire seed-milwaukee-data.sql file
-- Click "Run" or press Ctrl+Enter
```

**Expected output:**
```
✅ Milwaukee test data loaded successfully!
📊 10 Businesses, 15 Volunteers, 15 Emergencies
```

### 2. View on the Map

**Navigate to Dashboard:**
```
http://localhost:3002/dashboard
```

You should see:
- Interactive map with 15 colored pins (emergencies)
- Red pins = critical urgency
- Orange pins = high urgency
- Yellow pins = medium urgency
- Blue pins = low urgency

**Click any pin** to see:
- Emergency type and urgency
- Description
- Location address
- Who requested help
- When it was reported
- Current status

### 3. Test the Matching Feature

**Manual Testing via Dashboard:**
1. Go to `/dashboard`
2. Click on an emergency
3. Note the emergency ID
4. Use the matching API (see below)

**API Testing:**

Use your API client (Postman, curl, or browser) to test auto-matching:

```bash
# Test auto-match for a critical emergency
curl -X POST http://localhost:3002/api/match \
  -H "Content-Type: application/json" \
  -d '{
    "emergencyId": "YOUR_EMERGENCY_ID_HERE",
    "action": "auto"
  }'
```

**What should happen:**
- System finds nearby volunteers and businesses
- Calculates distance and match scores
- Creates match records in database
- Returns matched helpers with contact info

### 4. Test Different Scenarios

**Scenario A: Critical Emergency with Children**
- Emergency: "Family of 4 trapped in flood" (2834 N 25th St)
- Should match: Volunteers with childcare skills, businesses with shelter
- Expected matches: Riverwest Community Center, Emily Rodriguez, Sofia Hernandez

**Scenario B: Elderly Medical Emergency**
- Emergency: "Elderly man post-surgery" (5678 W Burleigh St)
- Should match: Medical volunteers, businesses with healthcare resources
- Expected matches: Rachel Thompson, Angela Kowalski, UWM Medical Clinic

**Scenario C: Job Loss Financial Crisis**
- Emergency: "Lost job, family out of food" (2145 W National Ave)
- Should match: Food providers, volunteers with social work skills
- Expected matches: South Side Grocers, Northside Family Services

### 5. Verify Geographic Distribution

**Check the map shows good spread:**
- Pins across North, South, East, West sides
- No clustering in one area
- Easy to distinguish individual emergencies
- Zoom in/out works smoothly

### 6. Test Filtering (if implemented)

**Filter by urgency:**
- Critical: Should show 3 red pins
- High: Should show 4 orange pins
- Medium: Should show 5 yellow pins
- Low: Should show 3 blue pins

**Filter by type:**
- Flood: 3 emergencies
- Medical: 3 emergencies
- Layoff: 3 emergencies
- etc.

---

## 🧪 Testing Checklist

### Map Functionality:
- [ ] Map loads with all 15 emergency pins
- [ ] Pins are color-coded correctly
- [ ] Clicking pins shows popup with details
- [ ] Popup shows all emergency information
- [ ] Map can zoom in/out smoothly
- [ ] Map can pan across Milwaukee
- [ ] All coordinates are in Milwaukee area

### Data Accuracy:
- [ ] All businesses have valid Milwaukee addresses
- [ ] All volunteers have valid Milwaukee addresses
- [ ] All emergencies have valid Milwaukee addresses
- [ ] Coordinates match the addresses
- [ ] Contact information looks realistic
- [ ] Skills and resources are appropriate

### Matching System:
- [ ] Auto-match finds nearby volunteers
- [ ] Auto-match finds relevant businesses
- [ ] Distance calculations are reasonable
- [ ] Match scores make sense
- [ ] Contact information is included in results
- [ ] Multiple matches returned for each emergency

### Edge Cases:
- [ ] Emergencies with children match childcare volunteers
- [ ] Medical emergencies match medical professionals
- [ ] Spanish-speaking needs match bilingual volunteers
- [ ] Urgent emergencies prioritize quick-response volunteers
- [ ] Distance limits are respected (volunteers max_distance_miles)

---

## 📊 Data Statistics

### Realistic Ratios:

**Urgency Distribution:**
- Critical: 20% (3/15)
- High: 27% (4/15)
- Medium: 33% (5/15)
- Low: 20% (3/15)

**Volunteer-to-Emergency Ratio:** 1:1 (ideal for testing)
**Business-to-Emergency Ratio:** 1:1.5 (realistic scarcity)

**Skills Coverage:**
- Medical: 4 volunteers, 2 businesses
- Construction/Repair: 4 volunteers, 4 businesses
- Food/Shelter: 3 volunteers, 6 businesses
- Transportation: 4 volunteers, 3 businesses
- Social Services: 4 volunteers, 2 businesses

**Bilingual Support:**
- Spanish speakers: 4 volunteers (27%)
- Hispanic names: 6 people (20%)

---

## 🔄 Resetting Test Data

### To clear and reload:

```sql
-- Clear existing data
DELETE FROM matches;
DELETE FROM emergencies;
DELETE FROM volunteers;
DELETE FROM businesses;

-- Then run the seed script again
```

### To add more data:

Simply run the seed script multiple times with different values. The script doesn't delete by default.

---

## 🎨 Customization Ideas

### Modify for Your Area:

1. **Change Location:**
   - Replace Milwaukee addresses with your city
   - Update lat/lng coordinates
   - Update center point in map component

2. **Add More Emergencies:**
   - Copy an existing emergency INSERT
   - Change address, name, phone, description
   - Update coordinates using geocoding service
   - Vary urgency and types

3. **Add More Volunteers:**
   - Copy volunteer INSERT
   - Diversify skills and availability
   - Spread across different neighborhoods
   - Adjust experience levels

4. **Add More Businesses:**
   - Research local businesses in your area
   - Include variety of resources
   - Add contact information
   - Set appropriate availability

### Add Demographic Diversity:

- **Names:** Include diverse cultural backgrounds
- **Languages:** Add more bilingual volunteers
- **Ages:** Include young adults, middle-aged, seniors
- **Skills:** Add specialized skills (veterinary, IT, legal, etc.)
- **Availability:** Mix of day, night, weekend, 24/7

---

## 💡 Pro Tips

### For Demo/Presentation:

1. **Start with map view** - Visual impact
2. **Click critical emergencies first** - Show urgency
3. **Demonstrate matching** - Show the AI at work
4. **Show multiple neighborhoods** - Zoom around map
5. **Highlight success stories** - "Matched in under 1 minute"

### For Testing Matching Algorithm:

1. **Test distance limits:**
   - Volunteer at North Side, Emergency at South Side
   - Should NOT match if distance > max_distance_miles

2. **Test skill matching:**
   - Medical emergency should prioritize medical volunteers
   - Flood should prioritize those with flood experience

3. **Test availability:**
   - Weekday evening emergency should match weekday evening volunteers
   - Critical emergencies should match flexible/24-7 volunteers

4. **Test scarcity:**
   - With 15 volunteers and 15 emergencies, some won't match
   - Tests prioritization algorithm

### For Real-World Preparation:

1. **Identify actual local resources:**
   - Food banks
   - Shelters
   - Medical clinics
   - Community centers

2. **Recruit real volunteers:**
   - Use this data structure as template
   - Collect skills and availability accurately
   - Verify contact information

3. **Partner with local businesses:**
   - Share the app
   - Explain auto-matching benefits
   - Get commitment for emergency response

---

## 📝 Data Fields Reference

### Businesses:
- `business_name` - Company or organization name
- `contact_name` - Primary contact person
- `email` - Contact email
- `phone` - Phone in format (414) 555-XXXX
- `location_address` - Full street address
- `location_lat` - Latitude (decimal)
- `location_lng` - Longitude (decimal)
- `resources` - JSON object of capabilities
- `resource_descriptions` - Text description of what they offer
- `availability_duration` - When they can help
- `auto_match` - Boolean, include in automatic matching

### Volunteers:
- `name` - Full name
- `email` - Contact email
- `phone` - Phone in format (414) 555-XXXX
- `location_address` - Full street address
- `location_lat` - Latitude (decimal)
- `location_lng` - Longitude (decimal)
- `skills` - JSON object of capabilities
- `availability` - Text description of when available
- `max_distance_miles` - How far they'll travel
- `emergency_preferences` - JSON of preferred emergency types
- `total_missions` - Number of past helps
- `rating` - 1-5 stars (decimal)
- `is_active` - Boolean, currently available

### Emergencies:
- `emergency_type` - flood, fire, medical, layoff, hurricane, earthquake, other
- `urgency` - critical, high, medium, low
- `description` - Detailed situation description
- `location_address` - Full street address
- `location_lat` - Latitude (decimal)
- `location_lng` - Longitude (decimal)
- `requester_name` - Person requesting help
- `requester_phone` - Contact phone
- `requester_email` - Contact email (optional)
- `people_affected` - Number of people
- `has_children` - Boolean
- `has_elderly` - Boolean
- `has_disabilities` - Boolean
- `specific_needs` - JSON array of needs
- `status` - pending, matched, in_progress, resolved, closed

---

## 🐛 Troubleshooting

### "No pins showing on map"
- Check coordinates are set (not NULL)
- Verify coordinates are in Milwaukee range
- Check browser console for JavaScript errors
- Ensure Leaflet CSS is loaded

### "Pins in wrong locations"
- Verify lat/lng are correct format (decimal, not degrees/minutes/seconds)
- Check lat/lng are not swapped
- Use geocoding service to verify coordinates

### "Matching returns no results"
- Check volunteers have `is_active = true`
- Check businesses have `auto_match = true`
- Verify `max_distance_miles` is reasonable
- Ensure emergency has valid coordinates

### "SQL script errors"
- Check you ran the contact fields migration first
- Verify JSON syntax in resources/skills fields
- Ensure no duplicate IDs
- Check phone format is consistent

---

## 🚀 Next Steps

After loading and testing this data:

1. **Verify everything works** - Run through testing checklist
2. **Customize for your area** - Adapt addresses and resources
3. **Recruit real participants** - Replace test data with real volunteers/businesses
4. **Enhance matching algorithm** - Use learnings from test scenarios
5. **Add more features** - Real-time updates, notifications, etc.

---

## 📞 Support

If you have questions about this test data:

1. Check the **Map Implementation Journal** (`docs/Map-Implementation-Journal.md`)
2. Review the **Map API Quick Guide** (`docs/Map API Quick Guide for Hackathon.md`)
3. Check the main README.md for project overview

---

**Last Updated:** October 15, 2025
**Data Version:** 1.0
**Location:** Milwaukee, Wisconsin
**Total Records:** 40 (10 businesses + 15 volunteers + 15 emergencies)
