-- IKnowAG.ai Database Schema Setup
-- Run this in your Supabase SQL Editor

-- 1. Create Applications Table
CREATE TABLE IF NOT EXISTS applications_2xk9m7p1q8 (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  media_type TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  contact_title TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  company_size TEXT NOT NULL,
  location TEXT NOT NULL,
  challenge TEXT NOT NULL,
  partnership_type TEXT NOT NULL,
  competitors TEXT DEFAULT '',
  timeline TEXT DEFAULT '',
  interested_tools TEXT[] DEFAULT '{}',
  comments TEXT DEFAULT '',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'review', 'approved', 'rejected')),
  reviewed_at TIMESTAMP,
  reviewed_by TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 2. Create Partnerships Table
CREATE TABLE IF NOT EXISTS partnerships_8w3n5k7m2 (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  partnership_type TEXT NOT NULL CHECK (partnership_type IN ('individual', 'two-company', 'three-company')),
  total_value NUMERIC(10,2) NOT NULL,
  per_company_value NUMERIC(10,2) NOT NULL,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'active', 'completed', 'cancelled')),
  start_date DATE,
  onsite_date DATE,
  location TEXT,
  sessions_completed INTEGER DEFAULT 0,
  total_sessions INTEGER DEFAULT 10,
  frameworks TEXT[] DEFAULT '{}',
  notes TEXT DEFAULT '',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 3. Create Partnership Companies Junction Table
CREATE TABLE IF NOT EXISTS partnership_companies_4j6h9l2r5 (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partnership_id UUID REFERENCES partnerships_8w3n5k7m2(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 4. Create Content Management Table
CREATE TABLE IF NOT EXISTS content_management_5p8q2w9x (
  id INTEGER PRIMARY KEY DEFAULT 1,
  content JSONB NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 5. Create Settings Table
CREATE TABLE IF NOT EXISTS settings_7m3k9p2w5 (
  id INTEGER PRIMARY KEY DEFAULT 1,
  settings JSONB NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 6. Enable Row Level Security
ALTER TABLE applications_2xk9m7p1q8 ENABLE ROW LEVEL SECURITY;
ALTER TABLE partnerships_8w3n5k7m2 ENABLE ROW LEVEL SECURITY;
ALTER TABLE partnership_companies_4j6h9l2r5 ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_management_5p8q2w9x ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings_7m3k9p2w5 ENABLE ROW LEVEL SECURITY;

-- 7. Create Policies (Allow all operations for now)
CREATE POLICY "Allow all operations" ON applications_2xk9m7p1q8 FOR ALL TO public WITH CHECK (true);
CREATE POLICY "Allow all operations" ON partnerships_8w3n5k7m2 FOR ALL TO public WITH CHECK (true);
CREATE POLICY "Allow all operations" ON partnership_companies_4j6h9l2r5 FOR ALL TO public WITH CHECK (true);
CREATE POLICY "Allow all operations" ON content_management_5p8q2w9x FOR ALL TO public WITH CHECK (true);
CREATE POLICY "Allow all operations" ON settings_7m3k9p2w5 FOR ALL TO public WITH CHECK (true);

-- 8. Insert Sample Applications Data
INSERT INTO applications_2xk9m7p1q8 (
  company_name, media_type, contact_name, contact_title, contact_email, contact_phone,
  company_size, location, challenge, partnership_type, competitors, timeline,
  interested_tools, comments, status, created_at
) VALUES
(
  'Metro Weekly Portland',
  'Local Newspaper',
  'Sarah Johnson',
  'Publisher',
  'sarah@metroweekly.com',
  '(503) 555-0123',
  '11-25',
  'Portland, OR',
  'We need help with AI-powered content creation and sales proposal automation. Our current manual process takes too long and we''re losing deals to faster competitors.',
  'two-company',
  'Aware of some new digital-first publications using AI for content generation in the Pacific Northwest.',
  '1-3-months',
  '["AI Proposal Builder", "Content Creation", "Newsletter Generation"]',
  'Very interested in collaborative learning model. Would love to partner with another similar-sized publication.',
  'pending',
  '2024-01-15T10:30:00Z'
),
(
  'Valley Business Journal',
  'B2B Publication',
  'Mike Rodriguez',
  'Owner',
  'mike@vbj.com',
  '(559) 555-0456',
  '5-10',
  'Fresno, CA',
  'Need AI tools for market analysis and business intelligence. We cover the Central Valley business scene but lack resources for deep analytical reporting.',
  'individual',
  'Not aware of direct AI competitors yet, but seeing more sophisticated reporting from larger publications.',
  'immediate',
  '["Business Intelligence", "Market Analysis", "AI Proposal Builder"]',
  'Ready to implement immediately. Have budget approved.',
  'approved',
  '2024-01-14T14:22:00Z'
),
(
  'Community Voice Radio',
  'Community Radio',
  'Jennifer Chen',
  'Program Director',
  'jen@cvradio.org',
  '(512) 555-0789',
  '5-10',
  'Austin, TX',
  'Looking to enhance our news gathering and content creation with AI. Want to compete with larger media outlets in Austin market.',
  'three-company',
  'Seeing AI-powered podcasting startups entering our market.',
  '3-6-months',
  '["Content Creation", "Newsletter Generation", "Business Intelligence"]',
  'Interested in learning from other community media organizations.',
  'review',
  '2024-01-13T09:15:00Z'
),
(
  'Hill Country Magazine',
  'Regional Magazine',
  'Lisa Turner',
  'Editor-in-Chief',
  'lisa@hcmag.com',
  '(830) 555-0321',
  '11-25',
  'San Antonio, TX',
  'Want to modernize our editorial workflow and improve our digital presence with AI tools.',
  'two-company',
  'Competition from lifestyle blogs and digital-first publications is increasing.',
  '1-3-months',
  '["Content Creation", "AI Proposal Builder", "Newsletter Generation"]',
  'Looking for partnership with similar regional publication.',
  'pending',
  '2024-01-12T16:45:00Z'
),
(
  'Pacific Business News',
  'B2B Publication',
  'David Park',
  'CEO',
  'david@pbnews.com',
  '(503) 555-0654',
  '26-50',
  'Seattle, WA',
  'Need to scale our content production and improve sales proposal process. Growing fast but processes haven''t kept up.',
  'individual',
  'Seeing AI-native business publications launching in Seattle.',
  'immediate',
  '["AI Proposal Builder", "Business Intelligence", "Content Creation"]',
  'Have dedicated budget for AI implementation.',
  'approved',
  '2024-01-10T11:30:00Z'
);

-- 9. Insert Sample Partnerships Data
INSERT INTO partnerships_8w3n5k7m2 (
  name, partnership_type, total_value, per_company_value, status,
  start_date, onsite_date, location, sessions_completed, total_sessions,
  frameworks, notes, created_at
) VALUES
(
  'Portland Media Collective',
  'two-company',
  3500.00,
  1750.00,
  'active',
  '2024-02-01',
  '2024-02-15',
  'Portland, OR',
  3,
  10,
  '["AI Proposal Builder", "Newsletter Generation", "Business Intelligence"]',
  'Excellent collaboration between Metro Weekly and Pacific Business Journal. Strong progress on AI implementation.',
  '2024-01-20T10:00:00Z'
),
(
  'Valley Business Focus',
  'individual',
  3500.00,
  3500.00,
  'scheduled',
  '2024-02-20',
  '2024-02-20',
  'Fresno, CA',
  0,
  10,
  '["Business Intelligence", "Market Analysis", "AI Proposal Builder"]',
  'Individual partnership focused on B2B market analysis and competitive intelligence.',
  '2024-01-15T14:30:00Z'
),
(
  'Texas Media Innovation Hub',
  'three-company',
  3500.00,
  1167.00,
  'completed',
  '2023-11-01',
  '2023-11-15',
  'Austin, TX',
  10,
  10,
  '["Content Creation", "Business Intelligence", "Newsletter Generation", "Fact Checking Tool"]',
  'Highly successful three-company collaboration. All companies implementing AI tools effectively.',
  '2023-10-20T09:15:00Z'
),
(
  'Seattle Business Intelligence',
  'individual',
  3500.00,
  3500.00,
  'active',
  '2024-01-15',
  '2024-01-25',
  'Seattle, WA',
  5,
  10,
  '["AI Proposal Builder", "Business Intelligence", "Content Creation"]',
  'Fast-moving implementation with Pacific Business News. Seeing immediate ROI.',
  '2024-01-05T12:00:00Z'
);

-- 10. Insert Partnership Companies Data
INSERT INTO partnership_companies_4j6h9l2r5 (
  partnership_id, company_name, contact_name, contact_email, contact_phone
) VALUES
(
  (SELECT id FROM partnerships_8w3n5k7m2 WHERE name = 'Portland Media Collective'),
  'Metro Weekly Portland',
  'Sarah Johnson',
  'sarah@metroweekly.com',
  '(503) 555-0123'
),
(
  (SELECT id FROM partnerships_8w3n5k7m2 WHERE name = 'Portland Media Collective'),
  'Oregon Business Report',
  'Tom Wilson',
  'tom@orbusiness.com',
  '(503) 555-0987'
),
(
  (SELECT id FROM partnerships_8w3n5k7m2 WHERE name = 'Valley Business Focus'),
  'Valley Business Journal',
  'Mike Rodriguez',
  'mike@vbj.com',
  '(559) 555-0456'
),
(
  (SELECT id FROM partnerships_8w3n5k7m2 WHERE name = 'Texas Media Innovation Hub'),
  'Community Voice Radio',
  'Jennifer Chen',
  'jen@cvradio.org',
  '(512) 555-0789'
),
(
  (SELECT id FROM partnerships_8w3n5k7m2 WHERE name = 'Texas Media Innovation Hub'),
  'Austin Weekly',
  'Carlos Martinez',
  'carlos@austinweekly.com',
  '(512) 555-0234'
),
(
  (SELECT id FROM partnerships_8w3n5k7m2 WHERE name = 'Texas Media Innovation Hub'),
  'Hill Country Magazine',
  'Lisa Turner',
  'lisa@hcmag.com',
  '(830) 555-0321'
),
(
  (SELECT id FROM partnerships_8w3n5k7m2 WHERE name = 'Seattle Business Intelligence'),
  'Pacific Business News',
  'David Park',
  'david@pbnews.com',
  '(503) 555-0654'
);

-- 11. Insert Default Content
INSERT INTO content_management_5p8q2w9x (content) VALUES (
  '{
    "hero": {
      "title": "AI Enablement for Small Media Companies Who Want to Control Their Own Destiny",
      "subtitle": "Simple AI frameworks, not complex systems. Guy Tasaka teaches small media companies to harness their biggest advantage: speed. While enterprise media faces implementation challenges, new AI-native entrepreneurs are entering local markets. You can move faster than both.",
      "ctaPrimary": "Watch 15-Minute Demo",
      "ctaSecondary": "Apply for Partnership",
      "availabilityText": "2 Partnership Spots Available",
      "urgencyText": "Up to 3 companies share $3,500 training • Only 5 partnerships at a time"
    },
    "authority": {
      "title": "The Media Executive Who''s Always Been Ahead of the Curve",
      "subtitle": "Guy Tasaka''s track record of innovation spans enterprise media challenges and small media advantages",
      "innovations": [
        {"year": "2011", "achievement": "First local paywall"},
        {"year": "2014", "achievement": "First local FAST channel"},
        {"year": "2024", "achievement": "AI enablement tools"}
      ]
    },
    "pricing": {
      "individual": {
        "price": "$3,500",
        "title": "Individual Focus",
        "features": ["Complete customization", "Exclusive attention", "Proprietary implementation", "Premium experience"]
      },
      "twoCompany": {
        "price": "$1,750 each",
        "title": "Collaborative Learning",
        "features": ["Cost sharing benefits", "Peer learning", "Shared insights", "Networking opportunities"]
      },
      "threeCompany": {
        "price": "$1,167 each",
        "title": "Maximum Learning",
        "features": ["Maximum cost efficiency", "Diverse perspectives", "Community building", "Cross-pollination"]
      }
    },
    "contact": {
      "email": "guy@iknowag.ai",
      "phone": "Available for partnerships",
      "location": "US Travel Included"
    }
  }'
);

-- 12. Insert Default Settings
INSERT INTO settings_7m3k9p2w5 (settings) VALUES (
  '{
    "general": {
      "siteName": "IKnowAG.ai",
      "tagline": "AI Enablement for Small Media Companies",
      "adminEmail": "admin@iknowag.ai",
      "supportEmail": "support@iknowag.ai",
      "timezone": "America/New_York",
      "maintenanceMode": false
    },
    "partnerships": {
      "maxPartnerships": 5,
      "applicationReviewDays": 5,
      "partnershipDuration": 12,
      "maxCompaniesPerPartnership": 3,
      "autoApprovalEnabled": false,
      "requireManualReview": true
    },
    "notifications": {
      "newApplications": true,
      "partnershipUpdates": true,
      "systemAlerts": true,
      "weeklyReports": true,
      "emailNotifications": true,
      "slackIntegration": false
    },
    "security": {
      "twoFactorAuth": false,
      "sessionTimeout": 60,
      "passwordExpiration": 90,
      "loginAttempts": 5,
      "ipWhitelisting": false,
      "auditLogging": true
    },
    "integrations": {
      "googleAnalytics": "GA-XXXXXXXXX",
      "mailgunApiKey": "",
      "stripePublishable": "",
      "supabaseUrl": "https://jpjoppwsmjjnfcutkfct.supabase.co",
      "supabaseKey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impwam9wcHdzbWpqbmZjdXRrZmN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4MTAwNzIsImV4cCI6MjA2NzM4NjA3Mn0.RSRdP5hHQJb3w_qc5zASZf95WP_zDy3SgNxoXtf-IpE"
    }
  }'
);