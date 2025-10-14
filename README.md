# RapidResponse AI - Emergency Management Platform

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat&logo=vercel)](https://emergency-fz6ap5lud-tmoody1973s-projects.vercel.app)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js%2015-black?style=flat&logo=next.js)](https://nextjs.org/)
[![Powered by Supabase](https://img.shields.io/badge/Powered%20by-Supabase-green?style=flat&logo=supabase)](https://supabase.com/)
[![AI by Gemini](https://img.shields.io/badge/AI%20by-Gemini-blue?style=flat&logo=google)](https://deepmind.google/technologies/gemini/)

An AI-powered emergency response coordination platform that instantly connects people in crisis with volunteers and businesses ready to help. Built for rapid deployment during natural disasters, medical emergencies, and community crises.

## 🌟 Live Demo

**Production:** [https://emergency-fz6ap5lud-tmoody1973s-projects.vercel.app](https://emergency-fz6ap5lud-tmoody1973s-projects.vercel.app)

## 🚀 Features

### For Emergency Responders
- **AI-Powered Intake System**: Conversational interface extracts emergency details automatically
- **Real-Time Dashboard**: Monitor all emergencies with filtering by status and urgency
- **Instant Matching**: AI automatically matches emergencies with best available helpers
- **Live Updates**: Real-time synchronization using Supabase subscriptions

### For Volunteers
- **Quick Onboarding**: Simple registration with skills and availability
- **Smart Matching**: Get matched with emergencies based on location, skills, and availability
- **Directory**: Browse all registered volunteers in the network
- **Rating System**: Track mission history and community impact

### For Businesses
- **Resource Contribution**: Easily list available resources (rooms, meals, supplies)
- **Auto-Matching**: Resources automatically matched with people in need
- **Impact Tracking**: Monitor how many people your business has helped
- **Flexible Availability**: Set duration and capacity for resource offerings

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **AI**: Google Gemini API
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Deployment**: Vercel
- **Real-time**: Supabase Realtime

## 📋 Prerequisites

- Node.js 18+ and npm
- Supabase account
- Google Gemini API key

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tmoody1973/emergency-app-hackathon.git
   cd emergency-app-hackathon
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_KEY=your_supabase_service_role_key

   # Gemini AI Configuration
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Set up the database**

   Run the schema in your Supabase SQL Editor:
   ```bash
   # Copy contents of supabase-schema.sql to Supabase SQL Editor
   # Then run import_mock_data_fixed.sql for test data
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3002](http://localhost:3002)

## 📂 Project Structure

```
emergency-app/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Landing page
│   │   ├── intake/            # Emergency intake flow
│   │   ├── dashboard/         # Emergency dashboard
│   │   ├── volunteers/        # Volunteer directory
│   │   ├── businesses/        # Business directory
│   │   ├── volunteer/onboard/ # Volunteer registration
│   │   ├── business/contribute/# Business registration
│   │   └── api/               # API routes
│   ├── components/            # React components
│   ├── lib/                   # Utility functions
│   │   ├── supabase.ts       # Database client
│   │   ├── gemini.ts         # AI integration
│   │   └── matching.ts       # Matching algorithm
│   └── types/                 # TypeScript types
├── docs/                      # Documentation
│   ├── PRD_Emergency_Response_Platform.md
│   ├── PITCH_DECK_OUTLINE.md
│   └── Claude_Code_Build_Plan.md
├── supabase-schema.sql        # Database schema
├── import_mock_data_fixed.sql # Sample data
└── README.md
```

## 🗄️ Database Schema

The platform uses 4 main tables:

- **emergencies**: Stores emergency records with location, urgency, and needs
- **volunteers**: Registered volunteers with skills and availability
- **businesses**: Businesses offering resources and services
- **matches**: Tracks connections between emergencies and helpers

See `supabase-schema.sql` for full schema details.

## 🤖 AI Integration

### Gemini AI Powers:
1. **Natural Language Processing**: Extracts structured data from conversational emergency reports
2. **Smart Matching**: Analyzes emergency needs and available resources to find best matches
3. **Real-time Analysis**: Processes emergency severity and urgency automatically

### Matching Algorithm:
The platform uses a sophisticated scoring system considering:
- Geographic distance (50 points max)
- Skills/resources match (40 points max)
- Availability/urgency alignment (10 points max)
- Active status and capacity (10 points max)

## 🚢 Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   ```bash
   vercel --prod
   ```

3. **Add environment variables**
   ```bash
   vercel env add NEXT_PUBLIC_SUPABASE_URL production
   vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
   vercel env add SUPABASE_SERVICE_KEY production
   vercel env add GEMINI_API_KEY production
   ```

4. **Deploy**
   ```bash
   vercel --prod
   ```

## 📖 Usage Examples

### Reporting an Emergency
1. Visit `/intake`
2. Describe your emergency in natural language
3. AI extracts details (location, urgency, needs)
4. Review and submit
5. Get instantly matched with helpers

### Registering as a Volunteer
1. Visit `/volunteer/onboard`
2. Enter your details and skills
3. Set availability and travel distance
4. Get matched with emergencies automatically

### Contributing Business Resources
1. Visit `/business/contribute`
2. Describe available resources
3. Set availability duration
4. Enable auto-matching
5. Help people in need automatically

## 🔐 Security

- Environment variables for sensitive keys
- Supabase Row Level Security (RLS) enabled
- Server-side API routes for sensitive operations
- Input validation and sanitization

## 🧪 Testing

The project includes mock data for testing:

```bash
# Import test data (20 volunteers, 10 businesses, sample emergencies)
# Run import_mock_data_fixed.sql in Supabase SQL Editor
```

## 📊 Key Metrics

Current platform capacity (with mock data):
- 20 registered volunteers
- 10 participating businesses
- Coverage across multiple skill categories
- Instant matching capability

## 🤝 Contributing

This is a hackathon project, but contributions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project was created for educational and hackathon purposes.

## 🙏 Acknowledgments

- Built with [Claude Code](https://claude.com/claude-code)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Database by [Supabase](https://supabase.com/)
- AI powered by [Google Gemini](https://deepmind.google/technologies/gemini/)
- Deployed on [Vercel](https://vercel.com/)

## 📞 Contact

**Project Link**: [https://github.com/tmoody1973/emergency-app-hackathon](https://github.com/tmoody1973/emergency-app-hackathon)

**Live Demo**: [https://emergency-fz6ap5lud-tmoody1973s-projects.vercel.app](https://emergency-fz6ap5lud-tmoody1973s-projects.vercel.app)

---

**⚡ Built for rapid emergency response. Every second counts.**

🤖 Generated with [Claude Code](https://claude.com/claude-code)
