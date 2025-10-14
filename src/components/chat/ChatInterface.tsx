'use client';

import { useEffect, useRef } from 'react';
import type { ChatMessage, EmergencyIntakeData } from '@/types';

interface ChatInterfaceProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  extractedData?: EmergencyIntakeData | null;
}

export default function ChatInterface({
  messages,
  onSendMessage,
  isLoading = false,
  extractedData = null,
}: ChatInterfaceProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const message = formData.get('message') as string;

    if (message.trim()) {
      onSendMessage(message.trim());
      e.currentTarget.reset();
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      e.currentTarget.form?.requestSubmit();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            {/* Avatar */}
            {message.role === 'assistant' && (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3B82F6] shrink-0">
                <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            )}

            {/* Message Bubble */}
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-[#DBEAFE] text-black'
                  : 'bg-white border border-gray-200 shadow-sm text-black'
              }`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
              {message.timestamp && (
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              )}
            </div>

            {/* User Avatar */}
            {message.role === 'user' && (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 shrink-0">
                <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            )}
          </div>
        ))}

        {/* Typing Indicator */}
        {isLoading && (
          <div className="flex gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3B82F6] shrink-0">
              <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="bg-white border border-gray-200 shadow-sm rounded-2xl px-4 py-3">
              <div className="flex gap-1">
                <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}

        {/* Extracted Data Card */}
        {extractedData && extractedData.is_complete && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-green-900 mb-2">
                  What I Understood
                </h3>
                <div className="space-y-2 text-sm text-green-800">
                  <div className="flex flex-wrap gap-2">
                    {extractedData.emergency_type && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-green-100 text-green-800 font-medium">
                        {extractedData.emergency_type}
                      </span>
                    )}
                    {extractedData.urgency && (
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-medium ${
                          extractedData.urgency === 'critical'
                            ? 'bg-red-100 text-red-800'
                            : extractedData.urgency === 'high'
                            ? 'bg-orange-100 text-orange-800'
                            : extractedData.urgency === 'medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {extractedData.urgency} urgency
                      </span>
                    )}
                  </div>
                  {extractedData.location_address && (
                    <p>
                      <span className="font-medium">Location:</span> {extractedData.location_address}
                    </p>
                  )}
                  {extractedData.people_affected > 0 && (
                    <p>
                      <span className="font-medium">People affected:</span> {extractedData.people_affected}
                    </p>
                  )}
                  {extractedData.specific_needs.length > 0 && (
                    <p>
                      <span className="font-medium">Needs:</span> {extractedData.specific_needs.join(', ')}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="border-t border-gray-200 bg-white px-4 py-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              name="message"
              placeholder="Type your message here... or click the mic to speak"
              disabled={isLoading}
              onKeyDown={handleKeyDown}
              className="w-full pr-12 h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] disabled:bg-gray-100 disabled:cursor-not-allowed text-black placeholder:text-gray-500"
              autoComplete="off"
              aria-label="Emergency message input"
            />
            <button
              type="button"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center text-gray-500 hover:text-[#3B82F6] hover:bg-[#3B82F6]/10 rounded-lg transition-colors"
              aria-label="Voice input (coming soon)"
              title="Voice input coming soon"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </button>
          </div>

          {/* Send Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="h-12 px-6 flex items-center justify-center rounded-lg bg-[#3B82F6] text-white hover:bg-[#2563EB] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            aria-label="Send message"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
