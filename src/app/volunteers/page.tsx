'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import type { Volunteer } from '@/types';

export default function VolunteersPage() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('all');

  useEffect(() => {
    loadVolunteers();
  }, []);

  const loadVolunteers = async () => {
    try {
      const { data, error } = await supabase
        .from('volunteers')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      setVolunteers(data || []);
    } catch (error) {
      console.error('Error loading volunteers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredVolunteers = volunteers.filter((volunteer) => {
    const matchesSearch =
      volunteer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      volunteer.location_address?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesAvailability =
      availabilityFilter === 'all' || volunteer.availability === availabilityFilter;

    return matchesSearch && matchesAvailability;
  });

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'immediate':
      case 'available_now':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'today':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'this_week':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'weekends':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'weekdays':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatAvailability = (availability: string) => {
    return availability.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <header className="border-b border-border bg-white">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Volunteer Directory</h1>
            </div>
            <Link
              href="/"
              className="rounded-lg bg-transparent border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black mb-4">Volunteer Network</h1>
          <p className="text-lg text-gray-700">
            Browse our community of {volunteers.length}+ skilled volunteers ready to help in emergencies
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Search</label>
              <input
                type="text"
                placeholder="Search by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              />
            </div>

            {/* Availability Filter */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Availability</label>
              <select
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              >
                <option value="all">All Availability</option>
                <option value="immediate">Immediate</option>
                <option value="available_now">Available Now</option>
                <option value="today">Today</option>
                <option value="this_week">This Week</option>
                <option value="weekends">Weekends</option>
                <option value="weekdays">Weekdays</option>
              </select>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredVolunteers.length} of {volunteers.length} volunteers
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#3B82F6] mx-auto mb-4"></div>
              <p className="text-gray-600">Loading volunteers...</p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredVolunteers.length === 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <svg className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No volunteers found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Volunteers Grid */}
        {!isLoading && filteredVolunteers.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVolunteers.map((volunteer) => (
              <div
                key={volunteer.id}
                className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-green-500 flex items-center justify-center text-white text-lg font-bold">
                      {volunteer.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{volunteer.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <svg className="h-4 w-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="font-semibold">{volunteer.rating.toFixed(1)}</span>
                        <span>({volunteer.total_missions} missions)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location */}
                {volunteer.location_address && (
                  <div className="flex items-start gap-2 mb-3">
                    <svg className="h-5 w-5 text-gray-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-sm text-gray-600">{volunteer.location_address}</p>
                  </div>
                )}

                {/* Availability */}
                <div className="mb-4">
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium border ${getAvailabilityColor(volunteer.availability)}`}>
                    {formatAvailability(volunteer.availability)}
                  </span>
                </div>

                {/* Skills */}
                {volunteer.skills && (
                  <div className="mb-4">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(volunteer.skills as Record<string, boolean>)
                        .filter(([_, value]) => value)
                        .slice(0, 4)
                        .map(([skill]) => (
                          <span
                            key={skill}
                            className="inline-block px-2.5 py-0.5 rounded-full bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/20 text-xs font-medium capitalize"
                          >
                            {skill.replace(/_/g, ' ')}
                          </span>
                        ))}
                      {Object.values(volunteer.skills as Record<string, boolean>).filter((v) => v).length > 4 && (
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
                          +{Object.values(volunteer.skills as Record<string, boolean>).filter((v) => v).length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Contact */}
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  {volunteer.phone && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>{volunteer.phone}</span>
                    </div>
                  )}
                  {volunteer.email && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="truncate">{volunteer.email}</span>
                    </div>
                  )}
                </div>

                {/* Max Distance */}
                {volunteer.max_distance_miles && (
                  <div className="mt-3 text-xs text-gray-500">
                    Will travel up to {volunteer.max_distance_miles} miles
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
