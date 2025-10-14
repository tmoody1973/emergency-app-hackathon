'use client';

import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function VolunteerOnboardPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location_address: '',
    availability: 'weekends',
    max_distance: 15,
    skills: {
      medical: false,
      first_aid: false,
      construction: false,
      counseling: false,
      transportation: false,
      food_service: false,
      childcare: false,
      elderly_care: false,
      translation: false,
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSkillToggle = (skill: string) => {
    setFormData({
      ...formData,
      skills: {
        ...formData.skills,
        [skill]: !formData.skills[skill as keyof typeof formData.skills],
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const { error: insertError } = await supabase.from('volunteers').insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        location_address: formData.location_address,
        availability: formData.availability,
        max_distance_miles: formData.max_distance,
        skills: formData.skills,
        rating: 5.0,
        total_missions: 0,
        is_active: true,
      });

      if (insertError) throw insertError;

      setIsSuccess(true);
    } catch (err: any) {
      console.error('Error creating volunteer:', err);
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to the Team!</h2>
          <p className="text-gray-600 mb-8">
            You're now registered as a volunteer. We'll notify you when there's an emergency that matches your skills and location.
          </p>
          <div className="flex flex-col gap-3">
            <Link
              href="/volunteers"
              className="inline-block rounded-lg bg-[#3B82F6] px-6 py-3 text-sm font-semibold text-white hover:bg-[#2563EB] transition-colors"
            >
              View All Volunteers
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
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Become a Volunteer</h1>
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
          <h1 className="text-4xl font-bold text-black mb-4">Join Our Emergency Response Network</h1>
          <p className="text-lg text-gray-700">
            Fill out this form to register as a volunteer. We'll match you with emergencies based on your skills and location.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 space-y-6">
          {/* Personal Information */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Personal Information</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                  placeholder="John Doe"
                />
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
                    placeholder="john@example.com"
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
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Location Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.location_address}
                  onChange={(e) => setFormData({ ...formData, location_address: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                  placeholder="123 Main St, Springfield, IL"
                />
              </div>
            </div>
          </div>

          {/* Availability & Preferences */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Availability & Preferences</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">When are you available?</label>
                <select
                  value={formData.availability}
                  onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                >
                  <option value="immediate">Immediate / Available Now</option>
                  <option value="today">Today</option>
                  <option value="this_week">This Week</option>
                  <option value="weekends">Weekends</option>
                  <option value="weekdays">Weekdays</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Maximum travel distance: {formData.max_distance} miles
                </label>
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="5"
                  value={formData.max_distance}
                  onChange={(e) => setFormData({ ...formData, max_distance: parseInt(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#3B82F6]"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>5 miles</span>
                  <span>50 miles</span>
                </div>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Skills & Expertise</h2>
            <p className="text-sm text-gray-600 mb-4">Select all skills that apply to you</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Object.keys(formData.skills).map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => handleSkillToggle(skill)}
                  className={`px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all ${
                    formData.skills[skill as keyof typeof formData.skills]
                      ? 'border-[#3B82F6] bg-[#3B82F6]/10 text-[#3B82F6]'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {skill.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-[#3B82F6] px-6 py-4 text-lg font-semibold text-white hover:bg-[#2563EB] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Registering...' : 'Complete Registration'}
            </button>
            <p className="text-xs text-gray-500 text-center mt-3">
              By registering, you agree to be contacted for emergency response opportunities
            </p>
          </div>
        </form>
      </main>
    </div>
  );
}
