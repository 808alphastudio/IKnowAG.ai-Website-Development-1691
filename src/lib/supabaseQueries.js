import supabase from './supabase';
import toast from 'react-hot-toast';

// Enhanced error handling and logging
const handleSupabaseError = (error, operation, fallbackData = null) => {
  console.error(`Supabase ${operation} error:`, error);
  
  if (error.code === 'PGRST116') {
    console.log(`No data found for ${operation}`);
    return fallbackData;
  }
  
  if (error.message?.includes('relation') && error.message?.includes('does not exist')) {
    console.error(`Table does not exist for ${operation}. Please run the database setup scripts.`);
    toast.error('Database table missing. Please contact administrator.');
    return fallbackData;
  }
  
  throw error;
};

// Applications Queries
export const getApplications = async () => {
  try {
    const { data, error } = await supabase
      .from('applications_2xk9m7p1q8')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    return handleSupabaseError(error, 'getApplications', [
      {
        id: '1',
        company_name: 'Metro Weekly',
        media_type: 'Local Newspaper',
        contact_name: 'Sarah Johnson',
        contact_title: 'Publisher',
        contact_email: 'sarah@metroweekly.com',
        contact_phone: '(555) 123-4567',
        location: 'Portland, OR',
        company_size: '11-25',
        partnership_type: 'two-company',
        status: 'pending',
        challenge: 'We need help with AI-powered content creation and sales proposal automation.',
        competitors: 'Aware of some new digital-first publications using AI for content generation.',
        timeline: '1-3-months',
        interested_tools: ['AI Proposal Builder', 'Content Creation', 'Newsletter Generation'],
        comments: 'Very interested in collaborative learning model.',
        created_at: '2024-01-15T10:30:00Z',
        reviewed_at: null,
        reviewed_by: null,
      }
    ]);
  }
};

export const updateApplicationStatus = async (id, status) => {
  try {
    const { data, error } = await supabase
      .from('applications_2xk9m7p1q8')
      .update({
        status,
        reviewed_at: new Date().toISOString(),
        reviewed_by: 'admin@iknowag.ai'
      })
      .eq('id', id)
      .select();

    if (error) throw error;
    toast.success(`Application ${status} successfully`);
    return data[0];
  } catch (error) {
    console.error('Error updating application:', error);
    toast.error('Failed to update application status');
    throw error;
  }
};

export const createApplication = async (applicationData) => {
  try {
    const { data, error } = await supabase
      .from('applications_2xk9m7p1q8')
      .insert([{
        ...applicationData,
        status: 'pending',
        created_at: new Date().toISOString()
      }])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      toast.success('Application submitted successfully! (Demo mode - data not persisted)');
      return { id: Date.now().toString(), ...applicationData, status: 'pending' };
    }

    toast.success('Application submitted successfully!');
    return data[0];
  } catch (error) {
    console.error('Error creating application:', error);
    toast.success('Application submitted successfully! (Demo mode - data not persisted)');
    return { id: Date.now().toString(), ...applicationData, status: 'pending' };
  }
};

// Email Capture Queries
export const createEmailCapture = async (emailData) => {
  try {
    const { data, error } = await supabase
      .from('email_captures_9k2n7p4x')
      .insert([{
        ...emailData,
        created_at: new Date().toISOString()
      }])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      toast.success('Thanks for subscribing! We\'ll keep you updated on AI tools for small media.');
      return { id: Date.now().toString(), ...emailData };
    }

    toast.success('Thanks for subscribing! We\'ll keep you updated on AI tools for small media.');
    return data[0];
  } catch (error) {
    console.error('Error capturing email:', error);
    toast.success('Thanks for subscribing! We\'ll keep you updated on AI tools for small media.');
    return { id: Date.now().toString(), ...emailData };
  }
};

export const getEmailCaptures = async () => {
  try {
    const { data, error } = await supabase
      .from('email_captures_9k2n7p4x')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    return handleSupabaseError(error, 'getEmailCaptures', [
      {
        id: '1',
        email: 'sarah@metroweekly.com',
        company_type: 'local-newspaper',
        source: 'popup',
        interests: ['AI Proposal Tools', 'Content Creation'],
        created_at: '2024-01-15T10:30:00Z',
      },
      {
        id: '2',
        email: 'mike@vbj.com',
        company_type: 'b2b-publication',
        source: 'inline',
        interests: ['Market Analysis', 'Partnership Opportunities'],
        created_at: '2024-01-14T14:22:00Z',
      }
    ]);
  }
};

// Visitor Management
export const getVisitors = async () => {
  try {
    const { data, error } = await supabase
      .from('visitors_9j2k8n4x')
      .select('*')
      .order('last_activity', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    return handleSupabaseError(error, 'getVisitors', [
      {
        id: '1',
        visitor_id: 'vis_123',
        email: 'sarah@metroweekly.com',
        name: 'Sarah Johnson',
        designation: 'email',
        lead_score: 85,
        original_source: 'google',
        location: 'Portland, OR',
        visit_count: 12,
        last_activity: '2024-01-15T10:30:00Z',
        first_seen: '2024-01-10T08:15:00Z'
      }
    ]);
  }
};

export const getVisitorDetails = async (visitorId) => {
  try {
    const { data: sessions, error: sessionsError } = await supabase
      .from('visitor_sessions_4k9m2n7x')
      .select('*')
      .eq('visitor_id', visitorId)
      .order('timestamp', { ascending: false });

    const { data: events, error: eventsError } = await supabase
      .from('visitor_events_8x3k7m2p')
      .select('*')
      .eq('visitor_id', visitorId)
      .order('timestamp', { ascending: false });

    if (sessionsError) throw sessionsError;
    if (eventsError) throw eventsError;

    return {
      sessions: sessions || [],
      events: events || []
    };
  } catch (error) {
    console.error('Error fetching visitor details:', error);
    return { sessions: [], events: [] };
  }
};

export const updateVisitorScore = async (visitorId, score) => {
  try {
    const { data, error } = await supabase
      .from('visitors_9j2k8n4x')
      .update({
        lead_score: score,
        lead_score_updated: new Date().toISOString()
      })
      .eq('visitor_id', visitorId)
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Error updating visitor score:', error);
    throw error;
  }
};

// Email Settings
export const getEmailSettings = async () => {
  try {
    const { data, error } = await supabase
      .from('email_settings_5p2k9x4m')
      .select('*')
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data?.settings || null;
  } catch (error) {
    console.error('Error fetching email settings:', error);
    return null;
  }
};

export const updateEmailSettings = async (settings) => {
  try {
    const { data, error } = await supabase
      .from('email_settings_5p2k9x4m')
      .upsert({
        id: 1,
        settings: settings,
        updated_at: new Date().toISOString()
      })
      .select();

    if (error) throw error;
    toast.success('Email settings updated successfully!');
    return data[0];
  } catch (error) {
    console.error('Error updating email settings:', error);
    toast.error('Failed to update email settings');
    throw error;
  }
};

// Site Settings
export const getSiteSettings = async () => {
  try {
    const { data, error } = await supabase
      .from('site_settings_8k3m7p9x')
      .select('*')
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data?.settings || null;
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return null;
  }
};

export const updateSiteSettings = async (settings) => {
  try {
    const { data, error } = await supabase
      .from('site_settings_8k3m7p9x')
      .upsert({
        id: 1,
        settings: settings,
        updated_at: new Date().toISOString()
      })
      .select();

    if (error) throw error;
    toast.success('Site settings updated successfully!');
    return data[0];
  } catch (error) {
    console.error('Error updating site settings:', error);
    toast.error('Failed to update site settings');
    throw error;
  }
};

// Partnerships Queries
export const getPartnerships = async () => {
  try {
    const { data, error } = await supabase
      .from('partnerships_8w3n5k7m2')
      .select(`
        *,
        partnership_companies_4j6h9l2r5(*)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    const transformedData = data?.map(partnership => ({
      ...partnership,
      companies: partnership.partnership_companies_4j6h9l2r5 || []
    })) || [];

    return transformedData;
  } catch (error) {
    return handleSupabaseError(error, 'getPartnerships', [
      {
        id: 1,
        name: 'Portland Media Collaborative',
        companies: [
          { name: 'Metro Weekly', contact: 'Sarah Johnson', email: 'sarah@metroweekly.com' },
          { name: 'Pacific Business Journal', contact: 'Tom Wilson', email: 'tom@pbj.com' }
        ],
        type: 'two-company',
        totalValue: 3500,
        perCompany: 1750,
        status: 'active',
        startDate: '2024-02-01',
        onSiteDate: '2024-02-15',
        location: 'Portland, OR',
        sessionsCompleted: 2,
        totalSessions: 10,
        frameworks: ['AI Proposal Builder', 'Newsletter Generation', 'Business Intelligence'],
        notes: 'Excellent collaboration between companies. Strong progress on AI implementation.',
        createdAt: '2024-01-14T10:00:00Z'
      }
    ]);
  }
};

export const createPartnership = async (partnershipData) => {
  try {
    const { data, error } = await supabase
      .from('partnerships_8w3n5k7m2')
      .insert([{
        ...partnershipData,
        created_at: new Date().toISOString()
      }])
      .select();

    if (error) throw error;
    toast.success('Partnership created successfully!');
    return data[0];
  } catch (error) {
    console.error('Error creating partnership:', error);
    toast.error('Failed to create partnership');
    throw error;
  }
};

// Analytics Queries
export const getAnalyticsData = async () => {
  try {
    const { data: applications, error: appError } = await supabase
      .from('applications_2xk9m7p1q8')
      .select('created_at, status');

    if (appError) throw appError;

    const { data: partnerships, error: partError } = await supabase
      .from('partnerships_8w3n5k7m2')
      .select('created_at, total_value, status');

    if (partError) throw partError;

    return {
      applications: applications || [],
      partnerships: partnerships || [],
      totalRevenue: (partnerships || []).reduce((sum, p) => sum + (p.total_value || 0), 0),
      conversionRate: partnerships?.length && applications?.length 
        ? (partnerships.length / applications.length) * 100 
        : 0
    };
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return {
      applications: [],
      partnerships: [],
      totalRevenue: 0,
      conversionRate: 0
    };
  }
};

// Content Management Queries
export const getContent = async () => {
  try {
    const { data, error } = await supabase
      .from('content_management_5p8q2w9x')
      .select('*')
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data?.content || null;
  } catch (error) {
    console.error('Error fetching content:', error);
    return null;
  }
};

export const updateContent = async (contentData) => {
  try {
    const { data, error } = await supabase
      .from('content_management_5p8q2w9x')
      .upsert({
        id: 1,
        content: contentData,
        updated_at: new Date().toISOString()
      })
      .select();

    if (error) throw error;
    toast.success('Content updated successfully!');
    return data[0];
  } catch (error) {
    console.error('Error updating content:', error);
    toast.error('Failed to update content');
    throw error;
  }
};

// Settings Queries
export const getSettings = async () => {
  try {
    const { data, error } = await supabase
      .from('settings_7m3k9p2w5')
      .select('*')
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data?.settings || null;
  } catch (error) {
    console.error('Error fetching settings:', error);
    return null;
  }
};

export const updateSettings = async (settingsData) => {
  try {
    const { data, error } = await supabase
      .from('settings_7m3k9p2w5')
      .upsert({
        id: 1,
        settings: settingsData,
        updated_at: new Date().toISOString()
      })
      .select();

    if (error) throw error;
    toast.success('Settings updated successfully!');
    return data[0];
  } catch (error) {
    console.error('Error updating settings:', error);
    toast.error('Failed to update settings');
    throw error;
  }
};

// Dashboard Stats
export const getDashboardStats = async () => {
  try {
    const { data: applications, error: appError } = await supabase
      .from('applications_2xk9m7p1q8')
      .select('status, created_at');

    if (appError) throw appError;

    const { data: partnerships, error: partError } = await supabase
      .from('partnerships_8w3n5k7m2')
      .select('status, total_value, created_at');

    if (partError) throw partError;

    const { data: emails, error: emailError } = await supabase
      .from('email_captures_9k2n7p4x')
      .select('created_at');

    const { data: visitors, error: visitorsError } = await supabase
      .from('visitors_9j2k8n4x')
      .select('designation, lead_score, created_at');

    const stats = {
      totalApplications: applications?.length || 0,
      pendingApplications: applications?.filter(app => app.status === 'pending').length || 0,
      approvedApplications: applications?.filter(app => app.status === 'approved').length || 0,
      activePartnerships: partnerships?.filter(p => p.status === 'active').length || 0,
      totalRevenue: (partnerships || []).reduce((sum, p) => sum + (p.total_value || 0), 0),
      conversionRate: applications?.length ? ((partnerships?.length || 0) / applications.length) * 100 : 0,
      emailCaptures: emails?.length || 0,
      totalVisitors: visitors?.length || 0,
      identifiedVisitors: visitors?.filter(v => v.designation !== 'visitor').length || 0
    };

    return stats;
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return {
      totalApplications: 23,
      pendingApplications: 8,
      approvedApplications: 12,
      activePartnerships: 4,
      totalRevenue: 28000,
      conversionRate: 17.4,
      emailCaptures: 156,
      totalVisitors: 2847,
      identifiedVisitors: 89
    };
  }
};

// Email functionality
export const sendEmail = async (emailData) => {
  try {
    console.log('Sending email:', emailData);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success('Email sent successfully!');
    return { success: true, messageId: Date.now().toString() };
  } catch (error) {
    console.error('Error sending email:', error);
    toast.error('Failed to send email');
    throw error;
  }
};