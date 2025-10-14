-- Import Mock Data for RapidResponse AI (FIXED VERSION)
-- Run this in Supabase SQL Editor after creating the tables

-- ============================================
-- VOLUNTEERS
-- ============================================

INSERT INTO volunteers (id, name, email, phone, location_address, location_lat, location_lng, skills, availability, max_distance_miles, emergency_preferences, total_missions, rating, is_active) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Sarah Martinez', 'sarah.martinez@email.com', '555-0101', '123 Oak Street, Springfield, IL', 39.7817, -89.6501, '{"medical": true, "first_aid": true, "cpr": true, "languages": ["english", "spanish"]}', 'available_now', 15, '{"flood": true, "fire": true, "medical": true}', 12, 4.8, true),
('550e8400-e29b-41d4-a716-446655440002', 'Marcus Johnson', 'marcus.j@email.com', '555-0102', '456 Elm Avenue, Springfield, IL', 39.7892, -89.6445, '{"construction": true, "electrical": true, "plumbing": true, "heavy_lifting": true}', 'weekends', 25, '{"flood": true, "fire": true, "cleanup": true}', 8, 5.0, true),
('550e8400-e29b-41d4-a716-446655440003', 'Emily Chen', 'emily.chen@email.com', '555-0103', '789 Maple Drive, Springfield, IL', 39.7756, -89.6389, '{"counseling": true, "psychology": true, "crisis_intervention": true, "languages": ["english", "mandarin"]}', 'evenings', 20, '{"layoff": true, "medical": true, "other": true}', 15, 4.9, true),
('550e8400-e29b-41d4-a716-446655440004', 'David Thompson', 'david.t@email.com', '555-0104', '234 Pine Road, Springfield, IL', 39.7934, -89.6523, '{"transportation": true, "cdl_license": true, "logistics": true}', 'available_now', 30, '{"flood": true, "fire": true, "evacuation": true}', 6, 4.7, true),
('550e8400-e29b-41d4-a716-446655440005', 'Jessica Rodriguez', 'jess.rodriguez@email.com', '555-0105', '567 Birch Lane, Springfield, IL', 39.7689, -89.6612, '{"food_service": true, "cooking": true, "nutrition": true, "food_safety": true}', 'weekends', 15, '{"flood": true, "layoff": true}', 20, 5.0, true),
('550e8400-e29b-41d4-a716-446655440006', 'Michael Kim', 'michael.kim@email.com', '555-0106', '890 Cedar Court, Springfield, IL', 39.8012, -89.6478, '{"medical": true, "emt": true, "emergency_response": true}', 'available_now', 20, '{"fire": true, "medical": true, "critical": true}', 25, 4.9, true),
('550e8400-e29b-41d4-a716-446655440007', 'Amanda Foster', 'amanda.f@email.com', '555-0107', '123 Willow Way, Springfield, IL', 39.7845, -89.6334, '{"childcare": true, "teaching": true, "special_needs": true}', 'evenings', 10, '{"flood": true, "fire": true, "shelter": true}', 10, 4.8, true),
('550e8400-e29b-41d4-a716-446655440008', 'Robert Lee', 'robert.lee@email.com', '555-0108', '456 Spruce Street, Springfield, IL', 39.7723, -89.6556, '{"legal": true, "immigration": true, "housing_rights": true}', 'weekdays', 25, '{"layoff": true, "eviction": true, "other": true}', 5, 4.6, true),
('550e8400-e29b-41d4-a716-446655440009', 'Lisa Patel', 'lisa.patel@email.com', '555-0109', '789 Ash Boulevard, Springfield, IL', 39.7978, -89.6401, '{"medical": true, "nursing": true, "geriatric_care": true, "languages": ["english", "hindi"]}', 'available_now', 15, '{"medical": true, "elderly_care": true}', 18, 5.0, true),
('550e8400-e29b-41d4-a716-446655440010', 'James Wilson', 'james.wilson@email.com', '555-0110', '234 Hickory Place, Springfield, IL', 39.7801, -89.6589, '{"construction": true, "carpentry": true, "roofing": true, "cleanup": true}', 'weekends', 20, '{"flood": true, "fire": true, "tornado": true}', 14, 4.7, true),
('550e8400-e29b-41d4-a716-446655440011', 'Maria Gonzalez', 'maria.g@email.com', '555-0111', '567 Poplar Avenue, Springfield, IL', 39.7667, -89.6423, '{"social_work": true, "case_management": true, "resource_navigation": true, "languages": ["english", "spanish"]}', 'weekdays', 30, '{"layoff": true, "housing": true, "family_support": true}', 22, 4.9, true),
('550e8400-e29b-41d4-a716-446655440012', 'Christopher Davis', 'chris.davis@email.com', '555-0112', '890 Magnolia Drive, Springfield, IL', 39.7912, -89.6367, '{"it_support": true, "communications": true, "data_management": true}', 'evenings', 15, '{"coordination": true, "logistics": true}', 7, 4.5, true),
('550e8400-e29b-41d4-a716-446655440013', 'Jennifer Taylor', 'jen.taylor@email.com', '555-0113', '123 Dogwood Lane, Springfield, IL', 39.7734, -89.6501, '{"veterinary": true, "animal_care": true, "pet_rescue": true}', 'available_now', 25, '{"flood": true, "fire": true, "evacuation": true}', 9, 4.8, true),
('550e8400-e29b-41d4-a716-446655440014', 'Daniel Brown', 'dan.brown@email.com', '555-0114', '456 Sycamore Road, Springfield, IL', 39.7856, -89.6445, '{"firefighting": true, "hazmat": true, "rescue": true, "first_aid": true}', 'available_now', 30, '{"fire": true, "chemical": true, "rescue": true}', 30, 5.0, true),
('550e8400-e29b-41d4-a716-446655440015', 'Rachel Green', 'rachel.green@email.com', '555-0115', '789 Chestnut Street, Springfield, IL', 39.7689, -89.6578, '{"mental_health": true, "trauma_counseling": true, "grief_support": true}', 'evenings', 20, '{"disaster": true, "loss": true, "crisis": true}', 11, 4.9, true),
('550e8400-e29b-41d4-a716-446655440016', 'Kevin Anderson', 'kevin.a@email.com', '555-0116', '234 Walnut Avenue, Springfield, IL', 39.8023, -89.6512, '{"plumbing": true, "water_systems": true, "emergency_repairs": true}', 'weekends', 15, '{"flood": true, "water_damage": true}', 13, 4.7, true),
('550e8400-e29b-41d4-a716-446655440017', 'Nicole White', 'nicole.white@email.com', '555-0117', '567 Beech Court, Springfield, IL', 39.7778, -89.6389, '{"pharmacy": true, "medication_management": true, "health_education": true}', 'weekdays', 20, '{"medical": true, "elderly_care": true, "chronic_illness": true}', 16, 4.8, true),
('550e8400-e29b-41d4-a716-446655440018', 'Steven Harris', 'steven.h@email.com', '555-0118', '890 Redwood Place, Springfield, IL', 39.7945, -89.6434, '{"logistics": true, "warehouse": true, "inventory": true, "forklift": true}', 'available_now', 25, '{"distribution": true, "supplies": true}', 8, 4.6, true),
('550e8400-e29b-41d4-a716-446655440019', 'Michelle Clark', 'michelle.c@email.com', '555-0119', '123 Fir Lane, Springfield, IL', 39.7712, -89.6467, '{"interpretation": true, "translation": true, "languages": ["english", "french", "arabic"]}', 'evenings', 15, '{"refugee": true, "immigrant": true, "communication": true}', 6, 4.9, true),
('550e8400-e29b-41d4-a716-446655440020', 'Brian Lewis', 'brian.lewis@email.com', '555-0120', '456 Sequoia Drive, Springfield, IL', 39.7823, -89.6523, '{"security": true, "crowd_control": true, "safety_planning": true}', 'weekends', 20, '{"evacuation": true, "shelter": true, "event_safety": true}', 10, 4.7, true);

-- ============================================
-- BUSINESSES
-- ============================================

INSERT INTO businesses (id, business_name, contact_name, email, phone, location_address, location_lat, location_lng, resources, resource_descriptions, availability_duration, auto_match) VALUES
('650e8400-e29b-41d4-a716-446655440001', 'Springfield Comfort Inn', 'Patricia Morrison', 'patricia.m@comfortinn.com', '555-0201', '1200 Hotel Plaza Drive, Springfield, IL', 39.7889, -89.6423, '{"hotel_rooms": 50, "capacity_per_room": 4, "pet_friendly": true, "accessibility": true}', '50 hotel rooms available for emergency shelter. Pet-friendly rooms available. ADA accessible. Can accommodate families of up to 4 per room. Includes basic amenities and continental breakfast.', 'ongoing', true),
('650e8400-e29b-41d4-a716-446655440002', 'Maria''s Family Restaurant', 'Maria Gonzalez', 'maria@mariasfamily.com', '555-0202', '456 Main Street, Springfield, IL', 39.7812, -89.6501, '{"meals_per_day": 200, "dietary_options": ["vegetarian", "gluten_free", "halal"], "delivery_available": true}', 'Can provide up to 200 hot meals daily. Offer vegetarian, gluten-free, and halal options. Free delivery to shelters and emergency sites within 10 miles. Meals include main course, side, and beverage.', '7_days', true),
('650e8400-e29b-41d4-a716-446655440003', 'SafeRide Transportation Services', 'John Mitchell', 'john@saferide.com', '555-0203', '789 Commerce Boulevard, Springfield, IL', 39.7945, -89.6378, '{"vehicles": 10, "wheelchair_accessible": 3, "capacity_total": 80, "drivers_available": 12}', 'Fleet of 10 vehicles including 3 wheelchair-accessible vans. Can transport up to 80 people simultaneously. 12 drivers on call 24/7. Available for evacuations, medical appointments, and supply transport.', '14_days', true),
('650e8400-e29b-41d4-a716-446655440004', 'Springfield Medical Clinic', 'Dr. Sarah Chen', 'dr.chen@springfieldmedical.com', '555-0204', '234 Healthcare Way, Springfield, IL', 39.7756, -89.6445, '{"medical_consultations": true, "medications": true, "first_aid_supplies": true, "mental_health": true}', 'Offering free medical consultations, basic medications, and first aid supplies for emergency situations. Mental health counseling available. Can see up to 50 patients per day. Bilingual staff (English/Spanish).', '30_days', true),
('650e8400-e29b-41d4-a716-446655440005', 'FreshMart Grocery', 'David Kumar', 'david.k@freshmart.com', '555-0205', '567 Shopping Center Drive, Springfield, IL', 39.7823, -89.6512, '{"food_boxes": 100, "hygiene_kits": 75, "baby_supplies": 30, "water_cases": 200}', '100 emergency food boxes (non-perishable, 3-day supply for family of 4). 75 hygiene kits with toiletries. 30 baby supply kits (diapers, formula, wipes). 200 cases of bottled water. Free delivery available.', '7_days', true),
('650e8400-e29b-41d4-a716-446655440006', 'BuildRight Construction', 'Michael Torres', 'mike@buildright.com', '555-0206', '890 Industrial Park Road, Springfield, IL', 39.8012, -89.6389, '{"cleanup_crews": 5, "equipment": true, "debris_removal": true, "emergency_repairs": true}', '5 cleanup crews with equipment available. Debris removal, emergency roof tarping, water extraction, and temporary repairs. Heavy machinery available (excavators, dump trucks). Can mobilize within 2 hours.', 'ongoing', true),
('650e8400-e29b-41d4-a716-446655440007', 'Cozy Blankets Warehouse', 'Jennifer Adams', 'jennifer@cozyblankets.com', '555-0207', '123 Warehouse Lane, Springfield, IL', 39.7689, -89.6578, '{"blankets": 500, "pillows": 300, "sleeping_bags": 150, "hygiene_kits": 200}', '500 new blankets, 300 pillows, 150 sleeping bags for emergency shelter use. 200 personal hygiene kits. All items are new and ready for immediate distribution. Can deliver to multiple locations.', '14_days', true),
('650e8400-e29b-41d4-a716-446655440008', 'TechConnect Solutions', 'Robert Chang', 'robert@techconnect.com', '555-0208', '456 Technology Drive, Springfield, IL', 39.7934, -89.6423, '{"laptops": 20, "phones": 30, "internet_hotspots": 15, "charging_stations": 10}', '20 laptops for job searching and applications (layoff support). 30 smartphones with prepaid service. 15 mobile internet hotspots. 10 multi-device charging stations. IT support volunteers available.', '30_days', true),
('650e8400-e29b-41d4-a716-446655440009', 'Paws & Claws Animal Shelter', 'Lisa Martinez', 'lisa@pawsandclaws.org', '555-0209', '789 Pet Care Avenue, Springfield, IL', 39.7778, -89.6467, '{"pet_boarding": 40, "pet_food": true, "veterinary_care": true, "foster_network": true}', 'Emergency boarding for up to 40 pets (dogs, cats, small animals). Pet food and supplies available. Basic veterinary care. Foster network for longer-term placement. No fees for disaster-displaced families.', 'ongoing', true),
('650e8400-e29b-41d4-a716-446655440010', 'Community Legal Aid', 'Attorney James Wilson', 'james@communitylegal.org', '555-0210', '234 Justice Street, Springfield, IL', 39.7867, -89.6501, '{"legal_consultations": true, "housing_assistance": true, "employment_law": true, "disaster_claims": true}', 'Free legal consultations for disaster-related issues. Housing rights, insurance claims, employment law (layoffs), FEMA applications. Bilingual attorneys. Virtual and in-person appointments available.', 'ongoing', true);

-- ============================================
-- SAMPLE EMERGENCIES (for demo)
-- ============================================

INSERT INTO emergencies (id, emergency_type, description, location_lat, location_lng, location_address, urgency, people_affected, specific_needs, status, has_children, has_elderly, has_disabilities, ai_extracted_data) VALUES
('750e8400-e29b-41d4-a716-446655440001', 'flood', 'House flooded from severe storm. Family of 4 with two young children needs emergency shelter tonight. Lost most belongings including food.', 39.7834, -89.6489, '345 River Road, Springfield, IL', 'high', 4, '{"shelter": true, "food": true, "clothing": true}', 'open', true, false, false, '{"emergency_type": "flood", "urgency": "high", "people_affected": 4, "has_children": true}'),
('750e8400-e29b-41d4-a716-446655440002', 'fire', 'Apartment building fire. Elderly couple (both 70+) displaced. Need temporary housing and medical attention for smoke inhalation.', 39.7756, -89.6512, '678 Apartment Complex, Springfield, IL', 'critical', 2, '{"shelter": true, "medical": true, "clothing": true}', 'open', false, true, false, '{"emergency_type": "fire", "urgency": "critical", "people_affected": 2, "has_elderly": true}'),
('750e8400-e29b-41d4-a716-446655440003', 'layoff', 'Recently laid off, single parent with 3 kids. Cannot afford groceries this week. Need food assistance and job search help.', 39.7912, -89.6434, '123 Oak Street, Springfield, IL', 'medium', 4, '{"food": true, "financial": true}', 'open', true, false, false, '{"emergency_type": "layoff", "urgency": "medium", "people_affected": 4, "has_children": true}'),
('750e8400-e29b-41d4-a716-446655440004', 'flood', 'Basement flooded, water damage throughout first floor. Need cleanup crew and emergency repairs. Family of 5 staying with relatives but need help with property.', 39.7689, -89.6556, '890 Maple Avenue, Springfield, IL', 'medium', 5, '{"cleanup": true, "repairs": true}', 'open', true, false, false, '{"emergency_type": "flood", "urgency": "medium", "people_affected": 5}'),
('750e8400-e29b-41d4-a716-446655440005', 'medical', 'Diabetic patient ran out of insulin due to pharmacy closure from storm. Urgent medical need.', 39.7845, -89.6401, '234 Pine Street, Springfield, IL', 'critical', 1, '{"medical": true}', 'open', false, false, true, '{"emergency_type": "medical", "urgency": "critical", "people_affected": 1, "has_disabilities": true}');

-- ============================================
-- SAMPLE MATCHES (for demo)
-- ============================================

INSERT INTO matches (emergency_id, volunteer_id, match_score, match_reasoning, status) VALUES
('750e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 92.5, 'Sarah Martinez is an excellent match: she is only 1.2 miles away, has medical skills which may be helpful with children, speaks Spanish, and is available now. She has completed 12 missions with a 4.8 rating.', 'pending'),
('750e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440007', 88.3, 'Amanda Foster is a strong match: she specializes in childcare and is 2.8 miles away. Her experience with special needs children and teaching background make her ideal for helping families with young children.', 'pending'),
('750e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440006', 95.7, 'Michael Kim is the top match: EMT with emergency response experience, only 1.5 miles from the fire location, and available now. Perfect for medical assessment and critical situations.', 'accepted'),
('750e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440009', 91.2, 'Lisa Patel is highly qualified: nursing background with geriatric care specialization, ideal for elderly patients. Located 2.1 miles away and available now.', 'pending'),
('750e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440011', 89.8, 'Maria Gonzalez is an excellent match: social worker with case management and resource navigation skills. Bilingual (English/Spanish). Specializes in layoff and family support.', 'pending');

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check volunteer count
SELECT COUNT(*) as volunteer_count FROM volunteers;

-- Check business count
SELECT COUNT(*) as business_count FROM businesses;

-- Check emergency count
SELECT COUNT(*) as emergency_count FROM emergencies;

-- Check match count
SELECT COUNT(*) as match_count FROM matches;

-- View sample data
SELECT name, skills->>'medical' as has_medical, availability, is_active FROM volunteers LIMIT 5;
SELECT business_name, resources->>'hotel_rooms' as rooms FROM businesses LIMIT 3;
SELECT emergency_type, urgency, status FROM emergencies;
