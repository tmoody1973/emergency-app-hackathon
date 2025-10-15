-- ========================================
-- MILWAUKEE TEST DATA SEED SCRIPT
-- ========================================
-- This script populates the database with realistic test data
-- for businesses, volunteers, and emergencies in Milwaukee, WI
--
-- Run this in Supabase SQL Editor to test the map and matching features
-- ========================================

-- Clear existing test data (optional - comment out if you want to keep existing data)
-- DELETE FROM matches;
-- DELETE FROM emergencies;
-- DELETE FROM volunteers;
-- DELETE FROM businesses;

-- ========================================
-- 1. BUSINESSES (Local Milwaukee businesses offering help)
-- ========================================

INSERT INTO businesses (
  business_name,
  contact_name,
  email,
  phone,
  location_address,
  location_lat,
  location_lng,
  resources,
  resource_descriptions,
  availability_duration,
  auto_match
) VALUES
  -- Downtown Milwaukee
  (
    'Milwaukee Restaurant Group',
    'Sarah Johnson',
    'sarah@milwaukeerestaurants.com',
    '(414) 555-0101',
    '310 E Wisconsin Ave, Milwaukee, WI 53202',
    43.0389,
    -87.9065,
    '{"food": true, "shelter": false, "transportation": false, "supplies": true}',
    'Can provide hot meals for up to 100 people per day. Also have extra plates, utensils, and non-perishable food items.',
    'Available 7 days a week, 8am-10pm',
    true
  ),
  (
    'Bay View Hardware & Supply',
    'Mike Peterson',
    'mike@bayviewhardware.com',
    '(414) 555-0102',
    '2569 S Kinnickinnic Ave, Milwaukee, WI 53207',
    42.9989,
    -87.8896,
    '{"supplies": true, "tools": true, "repairs": true}',
    'Emergency repair supplies, generators, tarps, plywood, basic tools. Can assist with emergency repairs.',
    'Open daily 7am-7pm, emergency calls 24/7',
    true
  ),
  (
    'Riverwest Community Center',
    'Maria Garcia',
    'maria@riverwestcc.org',
    '(414) 555-0103',
    '820 E Locust St, Milwaukee, WI 53212',
    43.0548,
    -87.8989,
    '{"shelter": true, "food": true, "clothing": true}',
    'Can house 50 people overnight. Kitchen facilities, showers, clothing donations available. Social services on-site.',
    '24/7 emergency shelter',
    true
  ),

  -- East Side
  (
    'East Side Movers & Transport',
    'David Chen',
    'david@eastsidemovers.com',
    '(414) 555-0104',
    '2240 N Farwell Ave, Milwaukee, WI 53202',
    43.0534,
    -87.8834,
    '{"transportation": true, "supplies": true}',
    '3 moving trucks available, can transport people or supplies. Storage space available if needed.',
    'Available Mon-Sat 6am-8pm',
    true
  ),
  (
    'UWM Medical Clinic',
    'Dr. Jennifer Williams',
    'jwilliams@uwm.edu',
    '(414) 555-0105',
    '2200 E Kenwood Blvd, Milwaukee, WI 53211',
    43.0756,
    -87.8823,
    '{"medical": true, "first_aid": true}',
    'Basic medical care, first aid, prescription assistance. Nurse practitioners and doctors on staff.',
    'Weekdays 8am-6pm, emergency calls accepted',
    true
  ),

  -- South Side
  (
    'South Side Grocers',
    'Roberto Martinez',
    'roberto@southsidegrocers.com',
    '(414) 555-0106',
    '1234 W Lincoln Ave, Milwaukee, WI 53215',
    42.9889,
    -87.9378,
    '{"food": true, "supplies": true}',
    'Fresh produce, canned goods, water, basic hygiene supplies. Can donate up to $500 worth of goods per emergency.',
    'Daily 6am-10pm',
    true
  ),
  (
    'Mitchell Street Clothing Depot',
    'Linda Thompson',
    'linda@mitchellclothing.org',
    '(414) 555-0107',
    '824 W Mitchell St, Milwaukee, WI 53204',
    43.0167,
    -87.9212,
    '{"clothing": true, "supplies": true}',
    'New and gently used clothing for all ages. Coats, shoes, blankets, personal hygiene items.',
    'Tues-Sat 10am-6pm',
    true
  ),

  -- West Side
  (
    'West Milwaukee Plumbing Services',
    'Tom Anderson',
    'tom@westmkeplumbing.com',
    '(414) 555-0108',
    '5456 W National Ave, Milwaukee, WI 53214',
    43.0089,
    -87.9756,
    '{"repairs": true, "emergency_services": true}',
    'Emergency plumbing repairs for flood damage, burst pipes, water damage. Available 24/7 for critical situations.',
    '24/7 emergency service',
    true
  ),
  (
    'Capitol Drive Auto Center',
    'James Wilson',
    'james@capitolauto.com',
    '(414) 555-0109',
    '4650 N Capitol Dr, Milwaukee, WI 53216',
    43.0934,
    -87.9456,
    '{"transportation": true, "repairs": true}',
    'Vehicle repairs, towing, temporary transportation. Can assist with emergency vehicle needs.',
    'Mon-Fri 7am-7pm, Sat 8am-4pm',
    true
  ),

  -- North Side
  (
    'Northside Family Services',
    'Patricia Brown',
    'patricia@northsidefamily.org',
    '(414) 555-0110',
    '1845 N Dr Martin Luther King Jr Dr, Milwaukee, WI 53212',
    43.0512,
    -87.9067,
    '{"shelter": true, "food": true, "financial": true, "counseling": true}',
    'Emergency financial assistance, food pantry, temporary housing placement, crisis counseling.',
    'Mon-Fri 8am-5pm, emergency line 24/7',
    true
  );

-- ========================================
-- 2. VOLUNTEERS (Individuals ready to help)
-- ========================================

INSERT INTO volunteers (
  name,
  email,
  phone,
  location_address,
  location_lat,
  location_lng,
  skills,
  availability,
  max_distance_miles,
  emergency_preferences,
  total_missions,
  rating,
  is_active
) VALUES
  -- Downtown area volunteers
  (
    'Emily Rodriguez',
    'emily.rodriguez@email.com',
    '(414) 555-1001',
    '789 N Water St, Milwaukee, WI 53202',
    43.0431,
    -87.9089,
    '{"first_aid": true, "bilingual_spanish": true, "childcare": true}',
    'Weekday evenings 5pm-10pm, weekends all day',
    15,
    '{"flood": true, "medical": true, "general": true}',
    12,
    4.8,
    true
  ),
  (
    'Kevin Walsh',
    'kevin.walsh@email.com',
    '(414) 555-1002',
    '456 E Brady St, Milwaukee, WI 53202',
    43.0423,
    -87.8945,
    '{"handyman": true, "electrical": true, "plumbing": true}',
    'Weekends and evenings after 6pm',
    10,
    '{"flood": true, "fire": true, "hurricane": true}',
    8,
    4.9,
    true
  ),

  -- Bay View area
  (
    'Samantha Lee',
    'samantha.lee@email.com',
    '(414) 555-1003',
    '2156 S Kinnickinnic Ave, Milwaukee, WI 53207',
    43.0023,
    -87.8912,
    '{"cooking": true, "organizing": true, "transportation": true}',
    'Flexible schedule, prefer advance notice',
    20,
    '{"flood": true, "layoff": true, "general": true}',
    15,
    5.0,
    true
  ),
  (
    'Marcus Johnson',
    'marcus.j@email.com',
    '(414) 555-1004',
    '2801 S Delaware Ave, Milwaukee, WI 53207',
    42.9912,
    -87.8823,
    '{"heavy_lifting": true, "transportation": true, "construction": true}',
    'Available most weekdays during the day',
    25,
    '{"flood": true, "fire": true, "earthquake": true, "hurricane": true}',
    23,
    4.7,
    true
  ),

  -- Riverwest area
  (
    'Angela Kowalski',
    'angela.k@email.com',
    '(414) 555-1005',
    '935 E Clarke St, Milwaukee, WI 53212',
    43.0589,
    -87.8956,
    '{"social_work": true, "counseling": true, "elderly_care": true}',
    'Mon-Fri 9am-5pm',
    15,
    '{"medical": true, "general": true, "layoff": true}',
    31,
    4.9,
    true
  ),
  (
    'Daniel Rivera',
    'daniel.rivera@email.com',
    '(414) 555-1006',
    '2745 N Humboldt Blvd, Milwaukee, WI 53212',
    43.0645,
    -87.8978,
    '{"bilingual_spanish": true, "medical": true, "first_aid": true}',
    'Weekends and Wednesday evenings',
    12,
    '{"medical": true, "flood": true, "fire": true}',
    6,
    4.6,
    true
  ),

  -- East Side
  (
    'Rachel Thompson',
    'rachel.thompson@email.com',
    '(414) 555-1007',
    '2134 E Newton Ave, Milwaukee, WI 53211',
    43.0812,
    -87.8856,
    '{"nursing": true, "medical": true, "childcare": true}',
    'Flexible, can respond quickly to emergencies',
    30,
    '{"medical": true, "general": true}',
    19,
    5.0,
    true
  ),
  (
    'Chris Anderson',
    'chris.a@email.com',
    '(414) 555-1008',
    '1978 N Prospect Ave, Milwaukee, WI 53202',
    43.0523,
    -87.8767,
    '{"technology": true, "communication": true, "organizing": true}',
    'Evenings and weekends',
    20,
    '{"general": true, "layoff": true}',
    9,
    4.5,
    true
  ),

  -- South Side
  (
    'Sofia Hernandez',
    'sofia.hernandez@email.com',
    '(414) 555-1009',
    '1645 W Historic Mitchell St, Milwaukee, WI 53204',
    43.0178,
    -87.9289,
    '{"bilingual_spanish": true, "cooking": true, "childcare": true, "elderly_care": true}',
    'Weekday mornings and afternoons',
    10,
    '{"general": true, "medical": true, "layoff": true}',
    14,
    4.8,
    true
  ),
  (
    'Tyler Jackson',
    'tyler.jackson@email.com',
    '(414) 555-1010',
    '2545 S 13th St, Milwaukee, WI 53215',
    42.9934,
    -87.9245,
    '{"automotive": true, "transportation": true, "handyman": true}',
    'Evenings after 5pm and weekends',
    15,
    '{"flood": true, "general": true}',
    7,
    4.4,
    true
  ),

  -- West Side
  (
    'Nicole Smith',
    'nicole.smith@email.com',
    '(414) 555-1011',
    '6234 W Greenfield Ave, Milwaukee, WI 53214',
    43.0134,
    -87.9923,
    '{"teaching": true, "tutoring": true, "childcare": true}',
    'After school hours and weekends',
    8,
    '{"general": true, "layoff": true}',
    5,
    4.7,
    true
  ),
  (
    'Robert Green',
    'robert.green@email.com',
    '(414) 555-1012',
    '4923 W Vliet St, Milwaukee, WI 53208',
    43.0545,
    -87.9823,
    '{"construction": true, "roofing": true, "handyman": true}',
    'Weekends, occasionally weekday evenings',
    18,
    '{"fire": true, "flood": true, "hurricane": true}',
    11,
    4.9,
    true
  ),

  -- North Side
  (
    'Jasmine Davis',
    'jasmine.davis@email.com',
    '(414) 555-1013',
    '3456 N Teutonia Ave, Milwaukee, WI 53206',
    43.0823,
    -87.9534,
    '{"social_work": true, "counseling": true, "community_organizing": true}',
    'Mon-Thu 9am-6pm',
    12,
    '{"layoff": true, "general": true, "medical": true}',
    28,
    5.0,
    true
  ),
  (
    'Brandon Williams',
    'brandon.w@email.com',
    '(414) 555-1014',
    '2789 N 35th St, Milwaukee, WI 53210',
    43.0712,
    -87.9612,
    '{"youth_mentoring": true, "sports": true, "transportation": true}',
    'Weekday evenings and Saturdays',
    15,
    '{"general": true}',
    4,
    4.3,
    true
  ),
  (
    'Lisa Martinez',
    'lisa.martinez@email.com',
    '(414) 555-1015',
    '4123 N 20th St, Milwaukee, WI 53209',
    43.0934,
    -87.9423,
    '{"bilingual_spanish": true, "legal_aid": true, "advocacy": true}',
    'Mon-Fri 10am-4pm',
    20,
    '{"layoff": true, "general": true}',
    17,
    4.8,
    true
  );

-- ========================================
-- 3. EMERGENCIES (Active emergency situations)
-- ========================================

INSERT INTO emergencies (
  emergency_type,
  urgency,
  description,
  location_address,
  location_lat,
  location_lng,
  requester_name,
  requester_phone,
  requester_email,
  people_affected,
  has_children,
  has_elderly,
  has_disabilities,
  specific_needs,
  status
) VALUES
  -- Critical urgency
  (
    'flood',
    'critical',
    'Basement completely flooded after water main break. Family of 4 including 2 young children trapped on second floor. Water rising quickly. Need immediate evacuation and temporary shelter.',
    '2834 N 25th St, Milwaukee, WI 53206',
    43.0689,
    -87.9489,
    'Jennifer Williams',
    '(414) 555-2001',
    'jennifer.w@email.com',
    4,
    true,
    false,
    false,
    '["shelter", "food", "clothing", "transportation"]',
    'pending'
  ),
  (
    'fire',
    'critical',
    'House fire last night destroyed entire home. Elderly couple lost everything. Currently staying with neighbor but need long-term housing and immediate necessities.',
    '1456 W Becher St, Milwaukee, WI 53215',
    42.9978,
    -87.9312,
    'Robert Thompson',
    '(414) 555-2002',
    'robert.t@email.com',
    2,
    false,
    true,
    true,
    '["shelter", "clothing", "food", "medical", "financial"]',
    'pending'
  ),
  (
    'medical',
    'critical',
    'Single mother with 3 kids, lost job and health insurance. Youngest child needs prescription medication urgently. Running out in 2 days. Also behind on rent and at risk of eviction.',
    '3567 S 16th St, Milwaukee, WI 53215',
    42.9867,
    -87.9267,
    'Maria Gonzalez',
    '(414) 555-2003',
    'maria.g@email.com',
    4,
    true,
    false,
    false,
    '["medical", "financial", "food"]',
    'pending'
  ),

  -- High urgency
  (
    'flood',
    'high',
    'Sump pump failed during heavy rain. Finished basement has 6 inches of standing water. Furnace and water heater at risk. Need emergency plumbing help and cleanup assistance.',
    '4789 N Oakland Ave, Milwaukee, WI 53211',
    43.0923,
    -87.8912,
    'David Chen',
    '(414) 555-2004',
    'david.c@email.com',
    3,
    true,
    false,
    false,
    '["repairs", "cleanup", "supplies"]',
    'pending'
  ),
  (
    'layoff',
    'high',
    'Lost job 3 weeks ago. Unemployment benefits delayed. Family of 5 running out of food. Car broke down so cannot get to food pantry. Need groceries and transportation help urgently.',
    '2145 W National Ave, Milwaukee, WI 53204',
    43.0089,
    -87.9345,
    'Carlos Rodriguez',
    '(414) 555-2005',
    'carlos.r@email.com',
    5,
    true,
    false,
    false,
    '["food", "transportation", "financial"]',
    'pending'
  ),
  (
    'medical',
    'high',
    'Elderly man recovering from surgery. Living alone, needs help with daily activities. Meals, medication management, and transportation to follow-up appointments needed this week.',
    '5678 W Burleigh St, Milwaukee, WI 53210',
    43.0678,
    -87.9912,
    'William Johnson',
    '(414) 555-2006',
    'william.j@email.com',
    1,
    false,
    true,
    true,
    '["medical", "food", "transportation"]',
    'pending'
  ),
  (
    'hurricane',
    'high',
    'Severe storm damage to roof - large section missing. Rain coming in, damaging interior. Elderly couple cannot afford immediate repairs. Need emergency tarping and roof repair assistance.',
    '1823 S 5th St, Milwaukee, WI 53204',
    43.0123,
    -87.9089,
    'Patricia Anderson',
    '(414) 555-2007',
    'patricia.a@email.com',
    2,
    false,
    true,
    false,
    '["repairs", "financial", "supplies"]',
    'pending'
  ),

  -- Medium urgency
  (
    'layoff',
    'medium',
    'Recently unemployed, struggling to make ends meet. Need help with groceries and utility bills. Have 2 teenagers to support. Looking for job leads and financial counseling.',
    '3421 N Holton St, Milwaukee, WI 53212',
    43.0812,
    -87.9067,
    'Angela Martinez',
    '(414) 555-2008',
    'angela.m@email.com',
    3,
    true,
    false,
    false,
    '["food", "financial", "clothing"]',
    'pending'
  ),
  (
    'flood',
    'medium',
    'Minor basement flooding after recent rain. Carpets wet, concerned about mold. Need dehumidifiers and advice on proper cleanup to prevent damage.',
    '6234 W Capitol Dr, Milwaukee, WI 53216',
    43.0934,
    -87.9956,
    'Michael Brown',
    '(414) 555-2009',
    'michael.b@email.com',
    2,
    false,
    false,
    false,
    '["cleanup", "supplies"]',
    'pending'
  ),
  (
    'other',
    'medium',
    'Single parent, car broke down. Cannot afford repairs. Need help getting kids to school and getting to work. Live on North side, work downtown. Temporary transportation needed.',
    '4567 N 35th St, Milwaukee, WI 53209',
    43.0945,
    -87.9623,
    'Tiffany Davis',
    '(414) 555-2010',
    'tiffany.d@email.com',
    3,
    true,
    false,
    false,
    '["transportation", "repairs"]',
    'pending'
  ),
  (
    'medical',
    'medium',
    'Mother with young baby, struggling with postpartum depression. Need mental health resources, support groups, and occasional childcare assistance. Also running low on baby supplies.',
    '2789 S Delaware Ave, Milwaukee, WI 53207',
    42.9923,
    -87.8834,
    'Sarah Miller',
    '(414) 555-2011',
    'sarah.m@email.com',
    2,
    true,
    false,
    false,
    '["medical", "supplies", "childcare"]',
    'pending'
  ),
  (
    'layoff',
    'medium',
    'Lost job last month. Unemployment running out. Need help with resume writing, job search, and interview clothing. Also need referrals to job training programs.',
    '1534 W Lincoln Ave, Milwaukee, WI 53215',
    42.9889,
    -87.9323,
    'James Wilson',
    '(414) 555-2012',
    'james.w@email.com',
    1,
    false,
    false,
    false,
    '["financial", "clothing", "other"]',
    'pending'
  ),

  -- Low urgency
  (
    'other',
    'low',
    'Elderly woman living alone, would appreciate companionship and help with grocery shopping once a week. Also need someone to help with minor home maintenance tasks.',
    '2156 E Park Pl, Milwaukee, WI 53211',
    43.0789,
    -87.8756,
    'Dorothy Schmidt',
    '(414) 555-2013',
    'dorothy.s@email.com',
    1,
    false,
    true,
    false,
    '["companionship", "transportation", "supplies"]',
    'pending'
  ),
  (
    'other',
    'low',
    'New to Milwaukee, struggling to find community resources. Single mother with school-age child. Need information about after-school programs, food assistance, and community support.',
    '3821 W Vliet St, Milwaukee, WI 53208',
    43.0545,
    -87.9712,
    'Michelle Taylor',
    '(414) 555-2014',
    'michelle.t@email.com',
    2,
    true,
    false,
    false,
    '["information", "childcare"]',
    'pending'
  ),
  (
    'other',
    'low',
    'Family needs help organizing community cleanup day in our neighborhood after recent storm. Looking for volunteers and supplies donation for next weekend.',
    '1945 N Bremen St, Milwaukee, WI 53212',
    43.0534,
    -87.8945,
    'Kevin Garcia',
    '(414) 555-2015',
    'kevin.g@email.com',
    1,
    false,
    false,
    false,
    '["volunteers", "cleanup"]',
    'pending'
  );

-- ========================================
-- VERIFICATION QUERIES
-- ========================================
-- Run these to verify the data was inserted correctly

-- Count records
SELECT 'Businesses' as table_name, COUNT(*) as count FROM businesses
UNION ALL
SELECT 'Volunteers', COUNT(*) FROM volunteers
UNION ALL
SELECT 'Emergencies', COUNT(*) FROM emergencies;

-- Check Milwaukee coordinates are correct (should all be around 43.0 lat, -87.9 lng)
SELECT
  'Businesses' as type,
  business_name as name,
  location_lat,
  location_lng
FROM businesses
WHERE location_lat IS NOT NULL
LIMIT 3;

-- Show emergency distribution by urgency
SELECT urgency, COUNT(*) as count
FROM emergencies
GROUP BY urgency
ORDER BY
  CASE urgency
    WHEN 'critical' THEN 1
    WHEN 'high' THEN 2
    WHEN 'medium' THEN 3
    WHEN 'low' THEN 4
  END;

-- Show emergency distribution by type
SELECT emergency_type, COUNT(*) as count
FROM emergencies
GROUP BY emergency_type
ORDER BY count DESC;

-- ========================================
-- SUCCESS MESSAGE
-- ========================================
DO $$
BEGIN
  RAISE NOTICE '========================================';
  RAISE NOTICE '✅ Milwaukee test data loaded successfully!';
  RAISE NOTICE '========================================';
  RAISE NOTICE 'Data Summary:';
  RAISE NOTICE '  - 10 Businesses (restaurants, hardware stores, shelters, etc.)';
  RAISE NOTICE '  - 15 Volunteers (diverse skills and availability)';
  RAISE NOTICE '  - 15 Emergencies (3 critical, 4 high, 5 medium, 3 low)';
  RAISE NOTICE '';
  RAISE NOTICE '📍 All locations are in Milwaukee, WI';
  RAISE NOTICE '🗺️  Check your dashboard at /dashboard to see the map!';
  RAISE NOTICE '';
  RAISE NOTICE 'Test the matching feature:';
  RAISE NOTICE '  POST /api/match with {"emergencyId": "...", "action": "auto"}';
  RAISE NOTICE '========================================';
END $$;
