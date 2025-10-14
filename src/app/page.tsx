import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <header className="border-b border-border bg-white">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#3B82F6]">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">RapidResponse AI</h1>
                <p className="text-xs text-gray-500">From Crisis to Help in Under 60 Seconds</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-black mb-6">
            Emergency Response,
            <br />
            <span className="text-[#3B82F6]">Powered by AI</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            Connect people in crisis with volunteers and businesses instantly using conversational AI and intelligent matching
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/intake"
              className="inline-block rounded-lg bg-[#3B82F6] px-8 py-4 text-lg font-semibold text-white hover:bg-[#2563EB] transition-colors shadow-lg"
            >
              🚨 Report Emergency
            </Link>
            <Link
              href="/dashboard"
              className="inline-block rounded-lg bg-white border-2 border-gray-200 px-8 py-4 text-lg font-semibold text-gray-900 hover:border-[#3B82F6] hover:text-[#3B82F6] transition-colors"
            >
              📊 View Dashboard
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center">
            <div className="text-4xl font-bold text-[#3B82F6] mb-2">{'<60s'}</div>
            <div className="text-sm text-gray-600 font-medium">Response Time</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center">
            <div className="text-4xl font-bold text-[#3B82F6] mb-2">100%</div>
            <div className="text-sm text-gray-600 font-medium">Automated Matching</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center">
            <div className="text-4xl font-bold text-[#3B82F6] mb-2">20+</div>
            <div className="text-sm text-gray-600 font-medium">Active Volunteers</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center">
            <div className="text-4xl font-bold text-[#3B82F6] mb-2">10+</div>
            <div className="text-sm text-gray-600 font-medium">Partner Businesses</div>
          </div>
        </div>

        {/* Main Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-black mb-8 text-center">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Emergency Intake Card */}
            <Link href="/intake">
              <div className="bg-white rounded-lg p-6 shadow-sm border-2 border-gray-200 hover:border-[#3B82F6] hover:shadow-lg transition-all cursor-pointer group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 group-hover:bg-red-500 transition-colors">
                    <svg className="h-6 w-6 text-red-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Report Emergency</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  AI-powered conversational intake. Describe your emergency in natural language and get matched with help instantly.
                </p>
                <div className="text-[#3B82F6] font-semibold group-hover:translate-x-1 transition-transform inline-block">
                  Start Chat →
                </div>
              </div>
            </Link>

            {/* Dashboard Card */}
            <Link href="/dashboard">
              <div className="bg-white rounded-lg p-6 shadow-sm border-2 border-gray-200 hover:border-[#3B82F6] hover:shadow-lg transition-all cursor-pointer group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 group-hover:bg-[#3B82F6] transition-colors">
                    <svg className="h-6 w-6 text-[#3B82F6] group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Emergency Dashboard</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Real-time view of all emergencies, matched volunteers, and status updates. Filter by pending, matched, or resolved.
                </p>
                <div className="text-[#3B82F6] font-semibold group-hover:translate-x-1 transition-transform inline-block">
                  View Dashboard →
                </div>
              </div>
            </Link>

            {/* Volunteers Card */}
            <Link href="/volunteers">
              <div className="bg-white rounded-lg p-6 shadow-sm border-2 border-gray-200 hover:border-[#3B82F6] hover:shadow-lg transition-all cursor-pointer group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 group-hover:bg-green-500 transition-colors">
                    <svg className="h-6 w-6 text-green-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Volunteer Directory</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Browse 20+ volunteers with diverse skills. Filter by availability, location, and expertise to find the right match.
                </p>
                <div className="text-[#3B82F6] font-semibold group-hover:translate-x-1 transition-transform inline-block">
                  View Volunteers →
                </div>
              </div>
            </Link>

            {/* Businesses Card */}
            <Link href="/businesses">
              <div className="bg-white rounded-lg p-6 shadow-sm border-2 border-gray-200 hover:border-[#3B82F6] hover:shadow-lg transition-all cursor-pointer group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 group-hover:bg-purple-500 transition-colors">
                    <svg className="h-6 w-6 text-purple-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Business Partners</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  View 10+ businesses offering resources. Hotels, restaurants, transportation, supplies, and more.
                </p>
                <div className="text-[#3B82F6] font-semibold group-hover:translate-x-1 transition-transform inline-block">
                  View Businesses →
                </div>
              </div>
            </Link>

            {/* Volunteer Onboard Card */}
            <Link href="/volunteer/onboard">
              <div className="bg-white rounded-lg p-6 shadow-sm border-2 border-gray-200 hover:border-[#3B82F6] hover:shadow-lg transition-all cursor-pointer group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100 group-hover:bg-yellow-500 transition-colors">
                    <svg className="h-6 w-6 text-yellow-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Become a Volunteer</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Join our network! AI-powered onboarding extracts your skills and preferences from a simple conversation.
                </p>
                <div className="text-[#3B82F6] font-semibold group-hover:translate-x-1 transition-transform inline-block">
                  Sign Up →
                </div>
              </div>
            </Link>

            {/* Business Contribute Card */}
            <Link href="/business/contribute">
              <div className="bg-white rounded-lg p-6 shadow-sm border-2 border-gray-200 hover:border-[#3B82F6] hover:shadow-lg transition-all cursor-pointer group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 group-hover:bg-orange-500 transition-colors">
                    <svg className="h-6 w-6 text-orange-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Contribute Resources</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Business owner? Offer rooms, meals, transportation, supplies, or services. AI auto-matches with needs.
                </p>
                <div className="text-[#3B82F6] font-semibold group-hover:translate-x-1 transition-transform inline-block">
                  Contribute →
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="bg-white rounded-lg p-12 shadow-sm border border-gray-200 mb-16">
          <h2 className="text-3xl font-bold text-black mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#3B82F6] text-white text-2xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Describe Your Emergency</h3>
              <p className="text-gray-600">
                Talk to our AI in your own words. No forms, no stress. Just tell us what you need.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#3B82F6] text-white text-2xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI Matches You</h3>
              <p className="text-gray-600">
                Our algorithm finds the best volunteers and businesses within miles based on skills, availability, and needs.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#3B82F6] text-white text-2xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Get Help Fast</h3>
              <p className="text-gray-600">
                Helpers are notified instantly. Average response time: under 60 seconds. Help is on the way.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#3B82F6] to-[#2563EB] rounded-lg p-12 text-center text-white shadow-lg">
          <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 opacity-90">
            Whether you need help or want to provide it, we're here 24/7
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/intake"
              className="inline-block rounded-lg bg-white px-8 py-4 text-lg font-semibold text-[#3B82F6] hover:bg-gray-100 transition-colors"
            >
              I Need Help
            </Link>
            <Link
              href="/volunteer/onboard"
              className="inline-block rounded-lg bg-transparent border-2 border-white px-8 py-4 text-lg font-semibold text-white hover:bg-white hover:text-[#3B82F6] transition-colors"
            >
              I Want to Help
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-gray-600 text-sm">
            <p className="mb-2">
              <strong className="text-gray-900">RapidResponse AI</strong> - Emergency Response Platform
            </p>
            <p>Built with Next.js, Supabase, and Google Gemini AI</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
