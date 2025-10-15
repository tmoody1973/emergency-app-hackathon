'use client';

import { useState } from 'react';
import ChatInterface from '@/components/chat/ChatInterface';
import type { ChatMessage, EmergencyIntakeData } from '@/types';

export default function IntakePage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        'Hello, I\'m here to help you. Can you tell me what kind of emergency assistance you need? Please describe your situation in your own words.',
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [extractedData, setExtractedData] = useState<EmergencyIntakeData | null>(null);
  const [sessionId] = useState(() => `session-${Date.now()}-${Math.random().toString(36).substring(7)}`);
  const [emergencyId, setEmergencyId] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  const handleSendMessage = async (message: string) => {
    // Add user message
    const userMessage: ChatMessage = {
      role: 'user',
      content: message,
      timestamp: new Date(),
    };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    // Call intake API
    setIsLoading(true);
    try {
      const response = await fetch('/api/intake', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: updatedMessages,
          sessionId,
        }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();

      // Add AI response
      const aiMessage: ChatMessage = {
        role: 'assistant',
        content: data.aiResponse,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);

      // Update extracted data
      if (data.extractedData) {
        setExtractedData(data.extractedData);
      }

      // Save emergency ID if available
      if (data.emergencyId) {
        setEmergencyId(data.emergencyId);
        console.log('Emergency saved with ID:', data.emergencyId);
      }

      // Check if intake is complete
      if (data.isComplete) {
        setIsComplete(true);
      }
    } catch (error) {
      console.error('Error calling intake API:', error);
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content:
          'I\'m sorry, I\'m having trouble processing your request right now. Please try again or call emergency services if this is life-threatening.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFindHelp = async () => {
    if (!emergencyId) return;

    setIsLoading(true);
    try {
      // Auto-match with volunteers and businesses
      const response = await fetch('/api/match', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emergencyId,
          action: 'auto',
        }),
      });

      const data = await response.json();

      if (data.success) {
        const successMessage: ChatMessage = {
          role: 'assistant',
          content: `Great news! ${data.message}. Someone will contact you shortly at the phone number you provided. Help is on the way!`,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, successMessage]);
      } else {
        const failMessage: ChatMessage = {
          role: 'assistant',
          content: `I'm having trouble finding available helpers right now. ${data.message}. Please try again in a few moments or contact emergency services directly if this is urgent.`,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, failMessage]);
      }
    } catch (error) {
      console.error('Error finding help:', error);
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content:
          'I\'m sorry, I\'m having trouble connecting you with help right now. Please call emergency services if this is urgent.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <header className="border-b border-border bg-white">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#3B82F6]">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-gray-900">RapidResponse AI</h1>
            </div>
            {isComplete && emergencyId && (
              <button
                onClick={handleFindHelp}
                disabled={isLoading}
                className="rounded-lg bg-[#3B82F6] px-6 py-2 text-sm font-semibold text-white hover:bg-[#2563EB] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Find Help Now
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Tell us what you need - we're here to help
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Describe your situation in your own words. Our AI will understand and connect you with help.
          </p>
        </div>

        {/* Chat Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Messages - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-[600px] overflow-hidden">
              <ChatInterface
                messages={messages}
                onSendMessage={handleSendMessage}
                isLoading={isLoading}
                extractedData={extractedData}
              />
            </div>
          </div>

          {/* Right Sidebar - Extracted Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-6">
              <div className="p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">What we've understood so far</h2>
              </div>

              <div className="px-6 pb-6 space-y-4">
                {/* Emergency Type */}
                {extractedData?.emergency_type && (
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                    <svg className="h-5 w-5 text-[#3B82F6] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">EMERGENCY TYPE</p>
                      <p className="text-sm font-semibold text-gray-900 mt-1 capitalize">{extractedData.emergency_type}</p>
                    </div>
                  </div>
                )}

                {/* Location */}
                {extractedData?.location_address && (
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                    <svg className="h-5 w-5 text-[#3B82F6] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">LOCATION</p>
                      <p className="text-sm font-semibold text-gray-900 mt-1">{extractedData.location_address}</p>
                    </div>
                  </div>
                )}

                {/* Urgency */}
                {extractedData?.urgency && (
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                    <svg className="h-5 w-5 text-[#3B82F6] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">URGENCY</p>
                      <span className={`inline-block mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        extractedData.urgency === 'critical' ? 'bg-red-100 text-red-800' :
                        extractedData.urgency === 'high' ? 'bg-orange-100 text-orange-800' :
                        extractedData.urgency === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {extractedData.urgency.charAt(0).toUpperCase() + extractedData.urgency.slice(1)}
                      </span>
                    </div>
                  </div>
                )}

                {/* People Affected */}
                {extractedData?.people_affected && extractedData.people_affected > 0 && (
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                    <svg className="h-5 w-5 text-[#3B82F6] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">PEOPLE AFFECTED</p>
                      <p className="text-sm font-semibold text-gray-900 mt-1">{extractedData.people_affected}</p>
                    </div>
                  </div>
                )}

                {/* Contact Information */}
                {extractedData?.requester_name && (
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                    <svg className="h-5 w-5 text-[#3B82F6] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">NAME</p>
                      <p className="text-sm font-semibold text-gray-900 mt-1">{extractedData.requester_name}</p>
                    </div>
                  </div>
                )}

                {extractedData?.requester_phone && (
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                    <svg className="h-5 w-5 text-[#3B82F6] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">PHONE</p>
                      <p className="text-sm font-semibold text-gray-900 mt-1">{extractedData.requester_phone}</p>
                    </div>
                  </div>
                )}

                {extractedData?.requester_email && (
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                    <svg className="h-5 w-5 text-[#3B82F6] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">EMAIL</p>
                      <p className="text-sm font-semibold text-gray-900 mt-1">{extractedData.requester_email}</p>
                    </div>
                  </div>
                )}

                {/* Needs */}
                {extractedData?.specific_needs && extractedData.specific_needs.length > 0 && (
                  <div className="p-3 rounded-lg bg-gray-50">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">NEEDS</p>
                    <div className="flex flex-wrap gap-2">
                      {extractedData.specific_needs.map((need, index) => (
                        <span key={index} className="inline-block px-2.5 py-0.5 rounded-full bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/20 text-xs font-medium capitalize">
                          {need}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Help Text */}
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Our AI is analyzing your situation in real-time. Continue the conversation to provide more details and we'll connect you with the right resources.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
