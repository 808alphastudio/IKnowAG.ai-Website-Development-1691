-- IKnowAG.ai Complete Database Schema Setup
-- Run this in your Supabase SQL Editor to add all missing tables

-- 1. Email Captures Table
CREATE TABLE IF NOT EXISTS email_captures_9k2n7p4x (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  name TEXT,
  source TEXT NOT NULL CHECK (source IN ('popup', 'inline', 'partnership', 'newsletter')),
  page TEXT,
  company_type TEXT,
  interests TEXT[] DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 2. Visitors Table
CREATE TABLE IF NOT EXISTS visitors_9j2k8n4x (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id TEXT UNIQUE NOT NULL,
  email TEXT,
  name TEXT,
  designation TEXT DEFAULT 'visitor' CHECK (designation IN ('visitor', 'email', 'registered', 'subscriber')),
  lead_score INTEGER DEFAULT 0,
  original_source TEXT,
  ip_address TEXT,
  location TEXT,
  timezone TEXT,
  user_agent TEXT,
  visit_count INTEGER DEFAULT 1,
  first_seen TIMESTAMP DEFAULT NOW(),
  last_activity TIMESTAMP DEFAULT NOW(),
  identified_at TIMESTAMP,
  lead_score_updated TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 3. Visitor Sessions Table
CREATE TABLE IF NOT EXISTS visitor_sessions_4k9m2n7x (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id TEXT NOT NULL,
  session_id TEXT NOT NULL,
  page_path TEXT NOT NULL,
  page_title TEXT,
  referrer TEXT,
  user_agent TEXT,
  timestamp TIMESTAMP DEFAULT NOW()
);

-- 4. Visitor Events Table
CREATE TABLE IF NOT EXISTS visitor_events_8x3k7m2p (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id TEXT NOT NULL,
  session_id TEXT NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('external_click', 'form_submission', 'download', 'video_play')),
  event_data JSONB DEFAULT '{}',
  timestamp TIMESTAMP DEFAULT NOW()
);

-- 5. Email Settings Table
CREATE TABLE IF NOT EXISTS email_settings_5p2k9x4m (
  id INTEGER PRIMARY KEY DEFAULT 1,
  settings JSONB NOT NULL DEFAULT '{
    "providers": {
      "mailgun": {
        "domain": "",
        "apiKey": "",
        "baseUrl": "https://api.mailgun.net/v3",
        "enabled": false
      },
      "sendgrid": {
        "apiKey": "",
        "enabled": false
      },
      "amazonses": {
        "accessKeyId": "",
        "secretAccessKey": "",
        "region": "us-east-1",
        "enabled": false
      }
    },
    "templates": []
  }',
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 6. Site Settings Table
CREATE TABLE IF NOT EXISTS site_settings_8k3m7p9x (
  id INTEGER PRIMARY KEY DEFAULT 1,
  settings JSONB NOT NULL DEFAULT '{
    "general": {
      "siteName": "IKnowAG.ai",
      "businessName": "IKnowAG.ai",
      "tagline": "AI Enablement for Small Media Companies",
      "description": "Guy Tasaka teaches small media companies AI enablement frameworks. Simple solutions, not complex systems.",
      "logo": "",
      "favicon": "",
      "heroImage": ""
    },
    "branding": {
      "primaryColor": "#2C5282",
      "secondaryColor": "#319795",
      "accentColor": "#F56500",
      "fontFamily": "Inter",
      "fontHeadings": "Inter",
      "fontBody": "Open Sans"
    },
    "seo": {
      "metaTitle": "IKnowAG.ai - AI Enablement for Small Media Companies",
      "metaDescription": "Guy Tasaka teaches small media companies AI enablement frameworks. Simple solutions, not complex systems.",
      "ogImage": "",
      "ogDescription": "While enterprise media faces challenges, new AI-native entrepreneurs enter local markets. Learn practical frameworks and move faster than both.",
      "keywords": "small media AI, local newspaper AI tools, media AI consultant, Guy Tasaka, AI enablement training",
      "schemaType": "Organization"
    },
    "analytics": {
      "googleAnalytics": "GA-XXXXXXXXX",
      "facebookPixel": "",
      "linkedinPixel": "",
      "microsoftClarity": "",
      "customTrackingCode": ""
    }
  }',
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 7. System Settings Table (Updated)
DROP TABLE IF EXISTS settings_7m3k9p2w5;
CREATE TABLE IF NOT EXISTS settings_7m3k9p2w5 (
  id INTEGER PRIMARY KEY DEFAULT 1,
  settings JSONB NOT NULL DEFAULT '{
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
    "email": {
      "emailProvider": "mailgun",
      "mailgunDomain": "",
      "mailgunApiKey": "",
      "sendgridApiKey": "",
      "fromEmail": "guy@iknowag.ai",
      "fromName": "Guy Tasaka - IKnowAG.ai",
      "replyToEmail": "guy@iknowag.ai",
      "emailSignature": "Best regards,\\nGuy Tasaka\\nIKnowAG.ai\\nhttps://iknowag.ai",
      "enableEmailCapture": true,
      "popupDelay": 30,
      "popupScrollTrigger": 50
    },
    "notifications": {
      "newApplications": true,
      "partnershipUpdates": true,
      "systemAlerts": true,
      "weeklyReports": true,
      "emailNotifications": true,
      "slackIntegration": false,
      "slackWebhookUrl": ""
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
      "facebookPixel": "",
      "linkedinInsight": "",
      "supabaseUrl": "https://jpjoppwsmjjnfcutkfct.supabase.co",
      "supabaseKey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }',
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 8. Enable Row Level Security on all new tables
ALTER TABLE email_captures_9k2n7p4x ENABLE ROW LEVEL SECURITY;
ALTER TABLE visitors_9j2k8n4x ENABLE ROW LEVEL SECURITY;
ALTER TABLE visitor_sessions_4k9m2n7x ENABLE ROW LEVEL SECURITY;
ALTER TABLE visitor_events_8x3k7m2p ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_settings_5p2k9x4m ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings_8k3m7p9x ENABLE ROW LEVEL SECURITY;

-- 9. Create policies for all tables (Allow all operations for now)
CREATE POLICY "Allow all operations" ON email_captures_9k2n7p4x FOR ALL TO public WITH CHECK (true);
CREATE POLICY "Allow all operations" ON visitors_9j2k8n4x FOR ALL TO public WITH CHECK (true);
CREATE POLICY "Allow all operations" ON visitor_sessions_4k9m2n7x FOR ALL TO public WITH CHECK (true);
CREATE POLICY "Allow all operations" ON visitor_events_8x3k7m2p FOR ALL TO public WITH CHECK (true);
CREATE POLICY "Allow all operations" ON email_settings_5p2k9x4m FOR ALL TO public WITH CHECK (true);
CREATE POLICY "Allow all operations" ON site_settings_8k3m7p9x FOR ALL TO public WITH CHECK (true);

-- 10. Insert sample email captures
INSERT INTO email_captures_9k2n7p4x (email, source, company_type, interests, created_at) VALUES
('sarah@metroweekly.com', 'inline', 'local-newspaper', '["AI Proposal Tools", "Content Creation"]', '2024-01-15T10:30:00Z'),
('mike@vbj.com', 'popup', 'b2b-publication', '["Market Analysis", "Partnership Opportunities"]', '2024-01-14T14:22:00Z'),
('jennifer@cvradio.org', 'partnership', 'community-radio', '["Content Creation", "Newsletter Generation"]', '2024-01-13T09:15:00Z'),
('david@pbnews.com', 'inline', 'b2b-publication', '["Business Intelligence", "AI Tools"]', '2024-01-12T16:45:00Z'),
('lisa@hcmag.com', 'popup', 'regional-magazine', '["Content Creation", "Market Analysis"]', '2024-01-11T11:30:00Z');

-- 11. Insert sample visitors
INSERT INTO visitors_9j2k8n4x (
  visitor_id, email, name, designation, lead_score, original_source, 
  location, visit_count, first_seen, last_activity
) VALUES
('vis_001', 'sarah@metroweekly.com', 'Sarah Johnson', 'email', 85, 'google', 'Portland, OR', 12, '2024-01-10T08:15:00Z', '2024-01-15T10:30:00Z'),
('vis_002', 'mike@vbj.com', 'Mike Rodriguez', 'registered', 90, 'direct', 'Fresno, CA', 8, '2024-01-12T14:20:00Z', '2024-01-14T14:22:00Z'),
('vis_003', NULL, NULL, 'visitor', 25, 'social', 'Seattle, WA', 3, '2024-01-15T12:00:00Z', '2024-01-15T14:22:00Z'),
('vis_004', 'jennifer@cvradio.org', 'Jennifer Chen', 'subscriber', 95, 'referral', 'Austin, TX', 15, '2024-01-08T16:30:00Z', '2024-01-13T09:15:00Z'),
('vis_005', NULL, NULL, 'visitor', 15, 'google', 'Denver, CO', 1, '2024-01-15T17:45:00Z', '2024-01-15T17:45:00Z');

-- 12. Insert sample visitor sessions
INSERT INTO visitor_sessions_4k9m2n7x (visitor_id, session_id, page_path, page_title) VALUES
('vis_001', 'session_001', '/', 'IKnowAG.ai - AI Enablement for Small Media'),
('vis_001', 'session_001', '/partnership', 'Partnership Application'),
('vis_001', 'session_001', '/about', 'About Guy Tasaka'),
('vis_002', 'session_002', '/', 'IKnowAG.ai - AI Enablement for Small Media'),
('vis_002', 'session_002', '/partnership', 'Partnership Application'),
('vis_003', 'session_003', '/', 'IKnowAG.ai - AI Enablement for Small Media');

-- 13. Insert sample visitor events
INSERT INTO visitor_events_8x3k7m2p (visitor_id, session_id, event_type, event_data) VALUES
('vis_001', 'session_001', 'form_submission', '{"form_id": "email-capture", "fields": ["email"]}'),
('vis_002', 'session_002', 'form_submission', '{"form_id": "partnership-application", "fields": ["email", "company"]}'),
('vis_001', 'session_001', 'external_click', '{"url": "https://tasaka.digital"}');

-- 14. Initialize settings tables with default data
INSERT INTO email_settings_5p2k9x4m (settings) VALUES (
  '{
    "providers": {
      "mailgun": {
        "domain": "",
        "apiKey": "",
        "baseUrl": "https://api.mailgun.net/v3",
        "enabled": false
      },
      "sendgrid": {
        "apiKey": "",
        "enabled": false
      },
      "amazonses": {
        "accessKeyId": "",
        "secretAccessKey": "",
        "region": "us-east-1",
        "enabled": false
      }
    },
    "templates": [
      {
        "id": "1",
        "name": "Welcome Email",
        "type": "welcome",
        "subject": "Welcome to IKnowAG.ai",
        "htmlContent": "<h1>Welcome!</h1><p>Thanks for joining our AI enablement community.</p>",
        "textContent": "Welcome! Thanks for joining our AI enablement community.",
        "active": true
      },
      {
        "id": "2",
        "name": "Application Received",
        "type": "application_received",
        "subject": "Partnership Application Received",
        "htmlContent": "<h1>Application Received</h1><p>We have received your partnership application and will review it within 5 business days.</p>",
        "textContent": "Application Received. We have received your partnership application and will review it within 5 business days.",
        "active": true
      }
    ]
  }'
) ON CONFLICT (id) DO UPDATE SET settings = EXCLUDED.settings;

INSERT INTO site_settings_8k3m7p9x (settings) VALUES (
  '{
    "general": {
      "siteName": "IKnowAG.ai",
      "businessName": "IKnowAG.ai",
      "tagline": "AI Enablement for Small Media Companies",
      "description": "Guy Tasaka teaches small media companies AI enablement frameworks. Simple solutions, not complex systems.",
      "logo": "",
      "favicon": "",
      "heroImage": ""
    },
    "branding": {
      "primaryColor": "#2C5282",
      "secondaryColor": "#319795",
      "accentColor": "#F56500",
      "fontFamily": "Inter",
      "fontHeadings": "Inter",
      "fontBody": "Open Sans"
    },
    "seo": {
      "metaTitle": "IKnowAG.ai - AI Enablement for Small Media Companies",
      "metaDescription": "Guy Tasaka teaches small media companies AI enablement frameworks. Simple solutions, not complex systems.",
      "ogImage": "",
      "ogDescription": "While enterprise media faces challenges, new AI-native entrepreneurs enter local markets. Learn practical frameworks and move faster than both.",
      "keywords": "small media AI, local newspaper AI tools, media AI consultant, Guy Tasaka, AI enablement training",
      "schemaType": "Organization"
    },
    "analytics": {
      "googleAnalytics": "GA-XXXXXXXXX",
      "facebookPixel": "",
      "linkedinPixel": "",
      "microsoftClarity": "",
      "customTrackingCode": ""
    }
  }'
) ON CONFLICT (id) DO UPDATE SET settings = EXCLUDED.settings;

-- 15. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_email_captures_created_at ON email_captures_9k2n7p4x (created_at);
CREATE INDEX IF NOT EXISTS idx_email_captures_source ON email_captures_9k2n7p4x (source);
CREATE INDEX IF NOT EXISTS idx_visitors_email ON visitors_9j2k8n4x (email);
CREATE INDEX IF NOT EXISTS idx_visitors_designation ON visitors_9j2k8n4x (designation);
CREATE INDEX IF NOT EXISTS idx_visitors_lead_score ON visitors_9j2k8n4x (lead_score);
CREATE INDEX IF NOT EXISTS idx_visitor_sessions_visitor_id ON visitor_sessions_4k9m2n7x (visitor_id);
CREATE INDEX IF NOT EXISTS idx_visitor_events_visitor_id ON visitor_events_8x3k7m2p (visitor_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications_2xk9m7p1q8 (status);
CREATE INDEX IF NOT EXISTS idx_applications_created_at ON applications_2xk9m7p1q8 (created_at);
CREATE INDEX IF NOT EXISTS idx_partnerships_status ON partnerships_8w3n5k7m2 (status);

-- 16. Add triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply to all tables with updated_at column
CREATE TRIGGER update_email_captures_updated_at BEFORE UPDATE ON email_captures_9k2n7p4x FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_visitors_updated_at BEFORE UPDATE ON visitors_9j2k8n4x FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON applications_2xk9m7p1q8 FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_partnerships_updated_at BEFORE UPDATE ON partnerships_8w3n5k7m2 FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_email_settings_updated_at BEFORE UPDATE ON email_settings_5p2k9x4m FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings_8k3m7p9x FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON settings_7m3k9p2w5 FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();