'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { supabase } from '@/lib/supabase';
import type { Emergency, Match } from '@/types';

// Import map dynamically to avoid SSR issues with Leaflet
const EmergencyMap = dynamic(() => import('@/components/map/EmergencyMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] bg-gray-100 animate-pulse rounded-lg flex items-center justify-center">
      <p className="text-gray-500">Loading map...</p>
    </div>
  ),
});

export default function DashboardPage() {
  const [emergencies, setEmergencies] = useState<Emergency[]>([]);
  const [matches, setMatches] = useState<Record<string, Match[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'matched' | 'resolved'>('all');

  useEffect(() => {
    loadEmergencies();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('emergencies-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'emergencies' }, () => {
        loadEmergencies();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [filter]);

  const loadEmergencies = async () => {
    try {
      let query = supabase
        .from('emergencies')
        .select('*')
        .order('created_at', { ascending: false });

      if (filter !== 'all') {
        query = query.eq('status', filter);
      }

      const { data, error } = await query;

      if (error) throw error;

      setEmergencies(data || []);

      // Load matches for each emergency
      if (data && data.length > 0) {
        const matchesData: Record<string, Match[]> = {};

        for (const emergency of data) {
          const { data: emergencyMatches } = await supabase
            .from('matches')
            .select('*, volunteers(*), businesses(*)')
            .eq('emergency_id', emergency.id);

          if (emergencyMatches) {
            matchesData[emergency.id] = emergencyMatches as any;
          }
        }

        setMatches(matchesData);
      }
    } catch (error) {
      console.error('Error loading emergencies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'matched': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <header className="border-b border-border bg-white">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#3B82F6]">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                  </svg>
                </div>
                <h1 className="text-xl font-bold text-gray-900">Emergency Dashboard</h1>
              </div>

              {/* Navigation Links */}
              <nav className="hidden md:flex items-center gap-4">
                <a
                  href="/volunteers"
                  className="text-sm font-medium text-gray-700 hover:text-[#3B82F6] transition-colors flex items-center gap-1"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Volunteers
                </a>
                <a
                  href="/businesses"
                  className="text-sm font-medium text-gray-700 hover:text-[#3B82F6] transition-colors flex items-center gap-1"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Businesses
                </a>
              </nav>
            </div>

            <a
              href="/intake"
              className="rounded-lg bg-[#3B82F6] px-6 py-2 text-sm font-semibold text-white hover:bg-[#2563EB] transition-colors"
            >
              + New Emergency
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Map Section */}
        {!isLoading && emergencies.length > 0 && (
          <div className="mb-8">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-gray-900">Emergency Locations</h2>
              <p className="text-sm text-gray-600">
                Showing {emergencies.filter((e) => e.location_lat && e.location_lng).length} of {emergencies.length} emergencies on the map
              </p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <EmergencyMap
                emergencies={emergencies.map((e) => ({
                  id: e.id,
                  location_lat: e.location_lat || 0,
                  location_lng: e.location_lng || 0,
                  emergency_type: e.emergency_type,
                  urgency: e.urgency,
                  description: e.description,
                  location_address: e.location_address,
                  requester_name: e.requester_name,
                  status: e.status,
                  created_at: e.created_at,
                }))}
                height="500px"
              />
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="mb-6 flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'bg-[#3B82F6] text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'pending'
                ? 'bg-[#3B82F6] text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter('matched')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'matched'
                ? 'bg-[#3B82F6] text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            Matched
          </button>
          <button
            onClick={() => setFilter('resolved')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'resolved'
                ? 'bg-[#3B82F6] text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            Resolved
          </button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#3B82F6] mx-auto mb-4"></div>
              <p className="text-gray-600">Loading emergencies...</p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && emergencies.length === 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <svg className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No emergencies found</h3>
            <p className="text-gray-600 mb-4">
              {filter === 'all'
                ? 'There are no emergencies in the system yet.'
                : `There are no ${filter} emergencies.`}
            </p>
            <a
              href="/intake"
              className="inline-block rounded-lg bg-[#3B82F6] px-6 py-2 text-sm font-semibold text-white hover:bg-[#2563EB] transition-colors"
            >
              Create First Emergency
            </a>
          </div>
        )}

        {/* Emergencies List */}
        {!isLoading && emergencies.length > 0 && (
          <div className="space-y-4">
            {emergencies.map((emergency) => (
              <div key={emergency.id} className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 capitalize">
                        {emergency.emergency_type} Emergency
                      </h3>
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium border ${getUrgencyColor(emergency.urgency)}`}>
                        {emergency.urgency}
                      </span>
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(emergency.status)}`}>
                        {emergency.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{emergency.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {/* Location */}
                  <div className="flex items-start gap-2">
                    <svg className="h-5 w-5 text-gray-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-medium">Location</p>
                      <p className="text-sm text-gray-900">{emergency.location_address || 'Not specified'}</p>
                    </div>
                  </div>

                  {/* People Affected */}
                  <div className="flex items-start gap-2">
                    <svg className="h-5 w-5 text-gray-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-medium">People Affected</p>
                      <p className="text-sm text-gray-900">{emergency.people_affected || 'Unknown'}</p>
                    </div>
                  </div>

                  {/* Time */}
                  <div className="flex items-start gap-2">
                    <svg className="h-5 w-5 text-gray-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-medium">Created</p>
                      <p className="text-sm text-gray-900">
                        {new Date(emergency.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Needs */}
                {emergency.specific_needs && emergency.specific_needs.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 uppercase font-medium mb-2">Needs</p>
                    <div className="flex flex-wrap gap-2">
                      {emergency.specific_needs.map((need: string, index: number) => (
                        <span key={index} className="inline-block px-2.5 py-0.5 rounded-full bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/20 text-xs font-medium capitalize">
                          {need}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Matches */}
                {matches[emergency.id] && matches[emergency.id].length > 0 && (
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-500 uppercase font-medium mb-2">
                      Matched Helpers ({matches[emergency.id].length})
                    </p>
                    <div className="space-y-2">
                      {matches[emergency.id].map((match) => (
                        <div key={match.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-[#3B82F6] flex items-center justify-center">
                              <span className="text-white text-xs font-medium">
                                {match.volunteer_id ? 'V' : 'B'}
                              </span>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {match.volunteer_id
                                  ? (match as any).volunteers?.name
                                  : (match as any).businesses?.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {match.volunteer_id ? 'Volunteer' : 'Business'}
                              </p>
                            </div>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            match.status === 'accepted' ? 'bg-green-100 text-green-800' :
                            match.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {match.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
