// Visitor tracking and identification system
import { createClient } from '@supabase/supabase-js';
import supabase from './supabase';

class VisitorTracker {
  constructor() {
    this.visitorId = this.getOrCreateVisitorId();
    this.sessionId = this.generateSessionId();
    this.initializeTracking();
  }

  getOrCreateVisitorId() {
    let visitorId = localStorage.getItem('visitor_id');
    if (!visitorId) {
      visitorId = this.generateUUID();
      localStorage.setItem('visitor_id', visitorId);
    }
    return visitorId;
  }

  generateSessionId() {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  async initializeTracking() {
    // Track initial page load
    await this.trackPageView(window.location.pathname);
    
    // Set up event listeners
    this.setupEventListeners();
    
    // Update visitor info
    await this.updateVisitorInfo();
  }

  setupEventListeners() {
    // Track page changes in SPA
    let lastUrl = location.href;
    new MutationObserver(() => {
      const url = location.href;
      if (url !== lastUrl) {
        lastUrl = url;
        this.trackPageView(new URL(url).pathname);
      }
    }).observe(document, { subtree: true, childList: true });

    // Track clicks on external links
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link && link.href && !link.href.startsWith(window.location.origin)) {
        this.trackExternalClick(link.href);
      }
    });

    // Track form submissions
    document.addEventListener('submit', (e) => {
      const form = e.target;
      if (form.tagName === 'FORM') {
        this.trackFormSubmission(form);
      }
    });
  }

  async trackPageView(path) {
    try {
      await supabase.from('visitor_sessions_4k9m2n7x').insert({
        visitor_id: this.visitorId,
        session_id: this.sessionId,
        page_path: path,
        page_title: document.title,
        referrer: document.referrer,
        user_agent: navigator.userAgent,
        timestamp: new Date().toISOString()
      });

      // Update visitor's last activity
      await this.updateLastActivity();
    } catch (error) {
      console.error('Error tracking page view:', error);
    }
  }

  async trackExternalClick(url) {
    try {
      await supabase.from('visitor_events_8x3k7m2p').insert({
        visitor_id: this.visitorId,
        session_id: this.sessionId,
        event_type: 'external_click',
        event_data: { url },
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error tracking external click:', error);
    }
  }

  async trackFormSubmission(form) {
    try {
      const formData = new FormData(form);
      const data = {};
      for (let [key, value] of formData.entries()) {
        data[key] = value;
      }

      await supabase.from('visitor_events_8x3k7m2p').insert({
        visitor_id: this.visitorId,
        session_id: this.sessionId,
        event_type: 'form_submission',
        event_data: { form_id: form.id, form_action: form.action, fields: Object.keys(data) },
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error tracking form submission:', error);
    }
  }

  async identifyVisitor(email, name = null, source = 'unknown') {
    try {
      // Check if visitor already exists
      const { data: existingVisitor } = await supabase
        .from('visitors_9j2k8n4x')
        .select('*')
        .eq('visitor_id', this.visitorId)
        .single();

      if (existingVisitor) {
        // Update existing visitor
        await supabase
          .from('visitors_9j2k8n4x')
          .update({
            email,
            name,
            designation: email ? 'email' : 'visitor',
            identified_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .eq('visitor_id', this.visitorId);
      } else {
        // Create new visitor record
        await supabase.from('visitors_9j2k8n4x').insert({
          visitor_id: this.visitorId,
          email,
          name,
          designation: email ? 'email' : 'visitor',
          original_source: source,
          ip_address: await this.getIPAddress(),
          user_agent: navigator.userAgent,
          first_seen: new Date().toISOString(),
          identified_at: email ? new Date().toISOString() : null,
          created_at: new Date().toISOString()
        });
      }

      // Calculate and update lead score
      await this.updateLeadScore();
    } catch (error) {
      console.error('Error identifying visitor:', error);
    }
  }

  async updateVisitorInfo() {
    try {
      const ipInfo = await this.getIPInfo();
      
      await supabase
        .from('visitors_9j2k8n4x')
        .upsert({
          visitor_id: this.visitorId,
          ip_address: ipInfo.ip,
          location: ipInfo.location,
          timezone: ipInfo.timezone,
          last_activity: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
    } catch (error) {
      console.error('Error updating visitor info:', error);
    }
  }

  async updateLastActivity() {
    try {
      await supabase
        .from('visitors_9j2k8n4x')
        .update({
          last_activity: new Date().toISOString(),
          visit_count: supabase.raw('COALESCE(visit_count, 0) + 1')
        })
        .eq('visitor_id', this.visitorId);
    } catch (error) {
      console.error('Error updating last activity:', error);
    }
  }

  async updateLeadScore() {
    try {
      // Get visitor's page views and events
      const { data: sessions } = await supabase
        .from('visitor_sessions_4k9m2n7x')
        .select('*')
        .eq('visitor_id', this.visitorId);

      const { data: events } = await supabase
        .from('visitor_events_8x3k7m2p')
        .select('*')
        .eq('visitor_id', this.visitorId);

      // Calculate lead score based on activity
      let score = 0;
      
      // Page views scoring
      const pageViews = sessions?.length || 0;
      score += Math.min(pageViews * 2, 50); // Max 50 points for page views
      
      // High-value page visits
      const highValuePages = ['/partnership', '/about', '/admin'];
      const highValueVisits = sessions?.filter(s => 
        highValuePages.some(page => s.page_path.includes(page))
      ).length || 0;
      score += highValueVisits * 10;
      
      // Form submissions
      const formSubmissions = events?.filter(e => e.event_type === 'form_submission').length || 0;
      score += formSubmissions * 25;
      
      // External clicks (showing interest)
      const externalClicks = events?.filter(e => e.event_type === 'external_click').length || 0;
      score += externalClicks * 5;

      // Update lead score
      await supabase
        .from('visitors_9j2k8n4x')
        .update({
          lead_score: score,
          lead_score_updated: new Date().toISOString()
        })
        .eq('visitor_id', this.visitorId);
    } catch (error) {
      console.error('Error updating lead score:', error);
    }
  }

  async getIPAddress() {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      return 'unknown';
    }
  }

  async getIPInfo() {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      return {
        ip: data.ip,
        location: `${data.city}, ${data.region}, ${data.country_name}`,
        timezone: data.timezone
      };
    } catch (error) {
      return {
        ip: 'unknown',
        location: 'unknown',
        timezone: 'unknown'
      };
    }
  }

  // Public methods for external use
  async trackEmailSignup(email, source = 'unknown') {
    await this.identifyVisitor(email, null, source);
  }

  async trackRegistration(email, name, source = 'unknown') {
    await this.identifyVisitor(email, name, source);
    await supabase
      .from('visitors_9j2k8n4x')
      .update({ designation: 'registered' })
      .eq('visitor_id', this.visitorId);
  }

  async trackSubscription(email, name, plan, source = 'unknown') {
    await this.identifyVisitor(email, name, source);
    await supabase
      .from('visitors_9j2k8n4x')
      .update({ designation: 'subscriber' })
      .eq('visitor_id', this.visitorId);
  }
}

// Initialize visitor tracking
let visitorTracker;
if (typeof window !== 'undefined') {
  visitorTracker = new VisitorTracker();
}

export default visitorTracker;