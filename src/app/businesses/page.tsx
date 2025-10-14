'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import type { Business } from '@/types';

export default function BusinessesPage() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [resourceFilter, setResourceFilter] = useState<string>('all');

  useEffect(() => {
    loadBusinesses();
  }, []);

  const loadBusinesses = async () => {
    try {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .order('business_name', { ascending: true });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      setBusinesses(data || []);
    } catch (error: any) {
      console.error('Error loading businesses:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  const filteredBusinesses = businesses.filter((business) => {
    const matchesSearch =
      business.business_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.location_address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.contact_name?.toLowerCase().includes(searchTerm.toLowerCase());

    if (resourceFilter === 'all') return matchesSearch;

    // Filter by specific resource type
    const resources = business.resources as Record<string, any> | null;
    if (!resources) return false;

    switch (resourceFilter) {
      case 'shelter':
        return matchesSearch && (resources.hotel_rooms > 0 || resources.beds > 0);
      case 'food':
        return matchesSearch && (resources.meals_per_day > 0 || resources.food_boxes > 0);
      case 'transportation':
        return matchesSearch && resources.vehicles > 0;
      case 'medical':
        return matchesSearch && (resources.medical_consultations || resources.medications);
      case 'supplies':
        return matchesSearch && (resources.blankets || resources.hygiene_kits || resources.water_cases);
      default:
        return matchesSearch;
    }
  });

  const getBusinessIcon = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'hotel':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        );
      case 'restaurant':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        );
      case 'transportation':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        );
      case 'clinic':
      case 'medical':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        );
      case 'grocery':
      case 'store':
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        );
      default:
        return (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <header className="border-b border-border bg-white">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Business Partners</h1>
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
          <h1 className="text-4xl font-bold text-black mb-4">Business Resource Directory</h1>
          <p className="text-lg text-gray-700">
            {businesses.length}+ local businesses offering emergency resources and support
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
                placeholder="Search by name, type, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              />
            </div>

            {/* Resource Filter */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Resource Type</label>
              <select
                value={resourceFilter}
                onChange={(e) => setResourceFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              >
                <option value="all">All Resources</option>
                <option value="shelter">Shelter / Lodging</option>
                <option value="food">Food / Meals</option>
                <option value="transportation">Transportation</option>
                <option value="medical">Medical Services</option>
                <option value="supplies">Supplies / Equipment</option>
              </select>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredBusinesses.length} of {businesses.length} businesses
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#3B82F6] mx-auto mb-4"></div>
              <p className="text-gray-600">Loading businesses...</p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredBusinesses.length === 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <svg className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No businesses found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Businesses Grid */}
        {!isLoading && filteredBusinesses.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredBusinesses.map((business) => {
              const resources = business.resources as Record<string, any> | null;

              return (
                <div
                  key={business.id}
                  className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6"
                >
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="h-14 w-14 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <svg className="h-7 w-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {getBusinessIcon(business.business_name || '')}
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{business.business_name}</h3>
                      {business.contact_name && (
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-700 text-xs font-medium">
                          Contact: {business.contact_name}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Location */}
                  {business.location_address && (
                    <div className="flex items-start gap-2 mb-4">
                      <svg className="h-5 w-5 text-gray-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <p className="text-sm text-gray-600">{business.location_address}</p>
                    </div>
                  )}

                  {/* Resources */}
                  {resources && Object.keys(resources).length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">Available Resources</p>
                      <div className="space-y-2">
                        {resources.hotel_rooms && resources.hotel_rooms > 0 && (
                          <div className="flex items-center gap-2 text-sm">
                            <svg className="h-4 w-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            <span className="text-gray-900 font-medium">{resources.hotel_rooms} rooms available</span>
                          </div>
                        )}
                        {resources.meals_per_day && resources.meals_per_day > 0 && (
                          <div className="flex items-center gap-2 text-sm">
                            <svg className="h-4 w-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span className="text-gray-900 font-medium">{resources.meals_per_day} meals per day</span>
                          </div>
                        )}
                        {resources.food_boxes && resources.food_boxes > 0 && (
                          <div className="flex items-center gap-2 text-sm">
                            <svg className="h-4 w-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                            <span className="text-gray-900 font-medium">{resources.food_boxes} food boxes</span>
                          </div>
                        )}
                        {resources.vehicles && resources.vehicles > 0 && (
                          <div className="flex items-center gap-2 text-sm">
                            <svg className="h-4 w-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                            </svg>
                            <span className="text-gray-900 font-medium">{resources.vehicles} vehicles</span>
                          </div>
                        )}
                        {resources.blankets && resources.blankets > 0 && (
                          <div className="flex items-center gap-2 text-sm">
                            <svg className="h-4 w-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                            <span className="text-gray-900 font-medium">{resources.blankets} blankets</span>
                          </div>
                        )}
                        {resources.hygiene_kits && resources.hygiene_kits > 0 && (
                          <div className="flex items-center gap-2 text-sm">
                            <svg className="h-4 w-4 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                            <span className="text-gray-900 font-medium">{resources.hygiene_kits} hygiene kits</span>
                          </div>
                        )}
                        {resources.medical_consultations && (
                          <div className="flex items-center gap-2 text-sm">
                            <svg className="h-4 w-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span className="text-gray-900 font-medium">Medical consultations</span>
                          </div>
                        )}
                        {resources.water_cases && resources.water_cases > 0 && (
                          <div className="flex items-center gap-2 text-sm">
                            <svg className="h-4 w-4 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                            <span className="text-gray-900 font-medium">{resources.water_cases} cases of water</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Availability Duration */}
                  {business.availability_duration && (
                    <div className="mb-4">
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-green-100 text-green-800 border border-green-200 text-xs font-medium">
                        Available for {business.availability_duration}
                      </span>
                    </div>
                  )}

                  {/* Contact */}
                  <div className="pt-4 border-t border-gray-200 space-y-2">
                    {business.phone && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span>{business.phone}</span>
                      </div>
                    )}
                    {business.email && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="truncate">{business.email}</span>
                      </div>
                    )}
                  </div>

                  {/* Resource Description */}
                  {business.resource_descriptions && (
                    <div className="mt-3 text-xs text-gray-500 line-clamp-2">
                      {business.resource_descriptions}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
