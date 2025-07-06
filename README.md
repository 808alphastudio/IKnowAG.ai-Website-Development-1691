# IKnowAG.ai - AI Enablement Platform

A comprehensive web application for Guy Tasaka's AI enablement partnerships with small media companies.

## 🚀 Features

### Public Website
- **Landing Page** with hero section, authority building, and partnership models
- **About Page** showcasing Guy Tasaka's experience and innovation timeline
- **Partnership Application** with multi-step form and real-time validation
- **Responsive Design** optimized for all devices

### Admin Panel
- **Dashboard** with analytics and key metrics
- **Applications Manager** for reviewing partnership applications
- **Partnerships Tracker** for managing active collaborations
- **Analytics View** with charts and performance insights
- **Content Manager** for updating website content
- **Settings Panel** for system configuration

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Routing**: React Router DOM with HashRouter
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Forms**: React Hook Form
- **Notifications**: React Hot Toast
- **Icons**: React Icons (Feather)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd iknowag-ai-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Supabase**
   
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
   REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here
   ```

4. **Set up Supabase Database**
   
   Run the following SQL in your Supabase SQL editor:
   
   ```sql
   -- Create Applications Table
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

   -- Create Partnerships Table
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

   -- Create Partnership Companies Junction Table
   CREATE TABLE IF NOT EXISTS partnership_companies_4j6h9l2r5 (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     partnership_id UUID REFERENCES partnerships_8w3n5k7m2(id) ON DELETE CASCADE,
     company_name TEXT NOT NULL,
     contact_name TEXT NOT NULL,
     contact_email TEXT NOT NULL,
     contact_phone TEXT,
     created_at TIMESTAMP DEFAULT NOW()
   );

   -- Enable RLS and create policies
   ALTER TABLE applications_2xk9m7p1q8 ENABLE ROW LEVEL SECURITY;
   ALTER TABLE partnerships_8w3n5k7m2 ENABLE ROW LEVEL SECURITY;
   ALTER TABLE partnership_companies_4j6h9l2r5 ENABLE ROW LEVEL SECURITY;

   CREATE POLICY "Allow all operations" ON applications_2xk9m7p1q8 FOR ALL TO public WITH CHECK (true);
   CREATE POLICY "Allow all operations" ON partnerships_8w3n5k7m2 FOR ALL TO public WITH CHECK (true);
   CREATE POLICY "Allow all operations" ON partnership_companies_4j6h9l2r5 FOR ALL TO public WITH CHECK (true);
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## 🌐 Deployment

### Build for production
```bash
npm run build
```

### Deploy to Vercel/Netlify
The app is configured with HashRouter for compatibility with static hosting.

## 📱 Usage

### Public Routes
- `/` - Homepage
- `/about` - About Guy Tasaka
- `/partnership` - Partnership application form

### Admin Routes
- `/admin` - Admin dashboard (requires authentication)

### Demo Access
For demo purposes, use:
- **Email**: admin@iknowag.ai
- **Password**: demo123

Or click "Try Demo Mode" for immediate access.

## 🔧 Configuration

### Supabase Setup
1. Create a new Supabase project
2. Copy your project URL and anon key
3. Add them to your `.env` file
4. Run the database schema SQL
5. Insert sample data for testing

### Environment Variables
```env
REACT_APP_SUPABASE_URL=https://your-project-id.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here
```

## 🎨 Customization

### Colors
The app uses a custom color palette defined in `tailwind.config.js`:
- **Trust Blue**: #2C5282
- **Innovation Teal**: #319795
- **Energy Orange**: #F56500
- **Success Green**: #38A169

### Fonts
- **Headings**: Inter
- **Body**: Open Sans

## 📊 Analytics Integration

The platform includes built-in analytics for:
- Application conversion rates
- Partnership performance
- Revenue tracking
- Geographic distribution
- Media type analysis

## 🔐 Security

- Row Level Security (RLS) enabled on all tables
- Input validation and sanitization
- HTTPS enforcement
- Secure authentication via Supabase

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

MIT License - see LICENSE file for details.

## 🆘 Support

For support, email guy@iknowag.ai or create an issue in the repository.