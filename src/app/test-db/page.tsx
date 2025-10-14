'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function TestDBPage() {
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [emergencies, setEmergencies] = useState<any[]>([]);
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    testDatabase();
  }, []);

  const testDatabase = async () => {
    const newErrors: any = {};

    // Test Volunteers
    try {
      const { data, error } = await supabase.from('volunteers').select('*');
      if (error) {
        newErrors.volunteers = error;
        console.error('Volunteers error:', error);
      } else {
        setVolunteers(data || []);
        console.log('Volunteers loaded:', data?.length);
      }
    } catch (err) {
      newErrors.volunteers = err;
      console.error('Volunteers catch:', err);
    }

    // Test Businesses
    try {
      const { data, error } = await supabase.from('businesses').select('*');
      if (error) {
        newErrors.businesses = error;
        console.error('Businesses error:', error);
      } else {
        setBusinesses(data || []);
        console.log('Businesses loaded:', data?.length);
      }
    } catch (err) {
      newErrors.businesses = err;
      console.error('Businesses catch:', err);
    }

    // Test Emergencies
    try {
      const { data, error } = await supabase.from('emergencies').select('*');
      if (error) {
        newErrors.emergencies = error;
        console.error('Emergencies error:', error);
      } else {
        setEmergencies(data || []);
        console.log('Emergencies loaded:', data?.length);
      }
    } catch (err) {
      newErrors.emergencies = err;
      console.error('Emergencies catch:', err);
    }

    setErrors(newErrors);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="text-[#3B82F6] hover:underline">
            ← Back to Home
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-black mb-8">Database Connection Test</h1>

        {loading ? (
          <div className="bg-white rounded-lg p-8 text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#3B82F6] mx-auto mb-4"></div>
            <p className="text-gray-600">Testing database connection...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Volunteers */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Volunteers Table
                {volunteers.length > 0 ? (
                  <span className="ml-3 text-sm font-normal text-green-600">
                    ✓ {volunteers.length} records found
                  </span>
                ) : (
                  <span className="ml-3 text-sm font-normal text-red-600">
                    ✗ No records found
                  </span>
                )}
              </h2>
              {errors.volunteers ? (
                <div className="bg-red-50 border border-red-200 rounded p-4">
                  <p className="text-red-800 text-sm font-semibold mb-2">Error:</p>
                  <pre className="text-xs text-red-700 overflow-auto">
                    {JSON.stringify(errors.volunteers, null, 2)}
                  </pre>
                </div>
              ) : volunteers.length > 0 ? (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Sample data:</p>
                  <div className="bg-gray-50 rounded p-3">
                    {volunteers.slice(0, 3).map((v) => (
                      <div key={v.id} className="text-sm text-gray-700 mb-1">
                        • {v.name} - {v.location_address}
                      </div>
                    ))}
                    {volunteers.length > 3 && (
                      <div className="text-sm text-gray-500 mt-2">
                        ... and {volunteers.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
                  <p className="text-yellow-800 text-sm">
                    ⚠️ Table exists but is empty. You need to import mock data.
                  </p>
                </div>
              )}
            </div>

            {/* Businesses */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Businesses Table
                {businesses.length > 0 ? (
                  <span className="ml-3 text-sm font-normal text-green-600">
                    ✓ {businesses.length} records found
                  </span>
                ) : (
                  <span className="ml-3 text-sm font-normal text-red-600">
                    ✗ No records found
                  </span>
                )}
              </h2>
              {errors.businesses ? (
                <div className="bg-red-50 border border-red-200 rounded p-4">
                  <p className="text-red-800 text-sm font-semibold mb-2">Error:</p>
                  <pre className="text-xs text-red-700 overflow-auto">
                    {JSON.stringify(errors.businesses, null, 2)}
                  </pre>
                </div>
              ) : businesses.length > 0 ? (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Sample data:</p>
                  <div className="bg-gray-50 rounded p-3">
                    {businesses.slice(0, 3).map((b) => (
                      <div key={b.id} className="text-sm text-gray-700 mb-1">
                        • {b.name} - {b.business_type}
                      </div>
                    ))}
                    {businesses.length > 3 && (
                      <div className="text-sm text-gray-500 mt-2">
                        ... and {businesses.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
                  <p className="text-yellow-800 text-sm">
                    ⚠️ Table exists but is empty. You need to import mock data.
                  </p>
                </div>
              )}
            </div>

            {/* Emergencies */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Emergencies Table
                {emergencies.length > 0 ? (
                  <span className="ml-3 text-sm font-normal text-green-600">
                    ✓ {emergencies.length} records found
                  </span>
                ) : (
                  <span className="ml-3 text-sm font-normal text-red-600">
                    ✗ No records found
                  </span>
                )}
              </h2>
              {errors.emergencies ? (
                <div className="bg-red-50 border border-red-200 rounded p-4">
                  <p className="text-red-800 text-sm font-semibold mb-2">Error:</p>
                  <pre className="text-xs text-red-700 overflow-auto">
                    {JSON.stringify(errors.emergencies, null, 2)}
                  </pre>
                </div>
              ) : emergencies.length > 0 ? (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Sample data:</p>
                  <div className="bg-gray-50 rounded p-3">
                    {emergencies.slice(0, 3).map((e) => (
                      <div key={e.id} className="text-sm text-gray-700 mb-1">
                        • {e.emergency_type} - {e.status}
                      </div>
                    ))}
                    {emergencies.length > 3 && (
                      <div className="text-sm text-gray-500 mt-2">
                        ... and {emergencies.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
                  <p className="text-yellow-800 text-sm">
                    ⚠️ Table exists but is empty. You need to import mock data.
                  </p>
                </div>
              )}
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-blue-900 mb-3">Next Steps:</h3>
              <div className="space-y-2 text-sm text-blue-800">
                {volunteers.length === 0 || businesses.length === 0 ? (
                  <>
                    <p className="font-semibold">To import mock data:</p>
                    <ol className="list-decimal list-inside space-y-1 ml-2">
                      <li>Go to your Supabase dashboard</li>
                      <li>Open SQL Editor</li>
                      <li>Copy and paste the contents of <code className="bg-blue-100 px-1 rounded">import_mock_data_fixed.sql</code></li>
                      <li>Run the query</li>
                      <li>Refresh this page to verify</li>
                    </ol>
                  </>
                ) : (
                  <>
                    <p className="font-semibold">✓ Database is working correctly!</p>
                    <p>You can now use:</p>
                    <ul className="list-disc list-inside ml-2 space-y-1">
                      <li>
                        <Link href="/volunteers" className="text-blue-600 underline">
                          Volunteers Directory
                        </Link>
                      </li>
                      <li>
                        <Link href="/businesses" className="text-blue-600 underline">
                          Business Directory
                        </Link>
                      </li>
                      <li>
                        <Link href="/dashboard" className="text-blue-600 underline">
                          Emergency Dashboard
                        </Link>
                      </li>
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
