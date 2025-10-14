'use client';

import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function BusinessContributePage() {
  const [formData, setFormData] = useState({
    name: '',
    business_type: 'hotel',
    email: '',
    phone: '',
    location_address: '',
    availability_duration: '30 days',
    resources: {
      rooms: 0,
      meals_per_day: 0,
      food_boxes: 0,
      vehicles: 0,
      blankets: 0,
      hygiene_kits: 0,
      water_bottles: 0,
      consultations: false,
      medical_supplies: false,
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleResourceChange = (resource: string, value: number | boolean) => {
    setFormData({
      ...formData,
      resources: {
        ...formData.resources,
        [resource]: value,
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const { error: insertError } = await supabase.from('businesses').insert({
        business_name: formData.name,
        contact_name: formData.name,
        email: formData.email,
        phone: formData.phone,
        location_address: formData.location_address,
        availability_duration: formData.availability_duration,
        resources: formData.resources,
        auto_match: true,
      });

      if (insertError) throw insertError;

      setIsSuccess(true);
    } catch (err: any) {
      console.error('Error creating business:', err);
      setError(err.message || 'Failed to register. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Thank You for Contributing!</h2>
          <p className="text-gray-600 mb-8">
            Your resources are now available for emergency matching. We'll notify you when someone needs your help.
          </p>
          <div className="flex flex-col gap-3">
            <Link
              href="/businesses"
              className="inline-block rounded-lg bg-[#3B82F6] px-6 py-3 text-sm font-semibold text-white hover:bg-[#2563EB] transition-colors"
            >
              View All Businesses
            </Link>
            <Link
              href="/"
              className="inline-block rounded-lg bg-transparent border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <header className="border-b border-border bg-white">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Contribute Resources</h1>
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
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-black mb-4">Business Resource Contribution</h1>
          <p className="text-lg text-gray-700">
            Register your business and the emergency resources you can provide. We'll auto-match with people in need.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 space-y-6">
          {/* Business Information */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Business Information</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Business Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                  placeholder="Acme Hotel & Suites"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Business Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.business_type}
                  onChange={(e) => setFormData({ ...formData, business_type: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                >
                  <option value="hotel">Hotel / Lodging</option>
                  <option value="restaurant">Restaurant / Food Service</option>
                  <option value="transportation">Transportation Service</option>
                  <option value="clinic">Medical Clinic</option>
                  <option value="grocery">Grocery Store</option>
                  <option value="construction">Construction Company</option>
                  <option value="legal">Legal Services</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                    placeholder="contact@business.com"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                    placeholder="(555) 987-6543"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Business Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.location_address}
                  onChange={(e) => setFormData({ ...formData, location_address: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                  placeholder="456 Business Blvd, Springfield, IL"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">How long can you provide these resources?</label>
                <select
                  value={formData.availability_duration}
                  onChange={(e) => setFormData({ ...formData, availability_duration: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                >
                  <option value="7 days">7 days</option>
                  <option value="14 days">14 days</option>
                  <option value="30 days">30 days</option>
                  <option value="60 days">60 days</option>
                  <option value="ongoing">Ongoing</option>
                </select>
              </div>
            </div>
          </div>

          {/* Available Resources */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Available Resources</h2>
            <p className="text-sm text-gray-600 mb-4">Enter the quantities you can provide (leave at 0 if not applicable)</p>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Hotel Rooms</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.resources.rooms}
                    onChange={(e) => handleResourceChange('rooms', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Meals Per Day</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.resources.meals_per_day}
                    onChange={(e) => handleResourceChange('meals_per_day', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Food Boxes</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.resources.food_boxes}
                    onChange={(e) => handleResourceChange('food_boxes', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Vehicles (Transportation)</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.resources.vehicles}
                    onChange={(e) => handleResourceChange('vehicles', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Blankets</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.resources.blankets}
                    onChange={(e) => handleResourceChange('blankets', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Hygiene Kits</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.resources.hygiene_kits}
                    onChange={(e) => handleResourceChange('hygiene_kits', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Water Bottles</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.resources.water_bottles}
                    onChange={(e) => handleResourceChange('water_bottles', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.resources.consultations}
                    onChange={(e) => handleResourceChange('consultations', e.target.checked)}
                    className="w-5 h-5 text-[#3B82F6] border-gray-300 rounded focus:ring-2 focus:ring-[#3B82F6]"
                  />
                  <span className="text-sm font-medium text-gray-700">Provide medical consultations</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.resources.medical_supplies}
                    onChange={(e) => handleResourceChange('medical_supplies', e.target.checked)}
                    className="w-5 h-5 text-[#3B82F6] border-gray-300 rounded focus:ring-2 focus:ring-[#3B82F6]"
                  />
                  <span className="text-sm font-medium text-gray-700">Provide medical supplies</span>
                </label>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-[#3B82F6] px-6 py-4 text-lg font-semibold text-white hover:bg-[#2563EB] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Registering...' : 'Submit Resources'}
            </button>
            <p className="text-xs text-gray-500 text-center mt-3">
              By submitting, you agree to be contacted when your resources match emergency needs
            </p>
          </div>
        </form>
      </main>
    </div>
  );
}
