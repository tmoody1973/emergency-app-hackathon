'use client';

import { useState } from 'react';
import ChatInterface from '@/components/chat/ChatInterface';
import type { ChatMessage, EmergencyIntakeData } from '@/types';

export default function TestPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m here to help you. Can you describe your emergency situation?',
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [extractedData, setExtractedData] = useState<EmergencyIntakeData | null>(null);
  const [sessionId] = useState(() => `session-${Date.now()}-${Math.random().toString(36).substring(7)}`);

  const handleSendMessage = async (message: string) => {
    // Add user message
    const userMessage: ChatMessage = {
      role: 'user',
      content: message,
      timestamp: new Date(),
    };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    // Call real API
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

      // Log emergency ID if saved
      if (data.emergencyId) {
        console.log('Emergency saved with ID:', data.emergencyId);
      }
    } catch (error) {
      console.error('Error calling intake API:', error);
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: 'I\'m sorry, I\'m having trouble processing your request. Please try again.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 p-6">
            <h1 className="text-2xl font-bold text-black mb-2">
              ChatInterface Test Page
            </h1>
            <p className="text-black">
              Testing the chat interface component with real Gemini AI
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-[600px] overflow-hidden">
            <ChatInterface
              messages={messages}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
              extractedData={extractedData}
            />
          </div>

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h2 className="font-semibold text-black mb-2">Test Instructions:</h2>
            <ul className="text-sm text-black space-y-1">
              <li>• Type a message describing an emergency situation and press Enter or click Send</li>
              <li>• The AI will process your message using Gemini 2.5 Flash (real AI, not simulated)</li>
              <li>• The "What AI Understood" card will appear when enough information is collected</li>
              <li>• Complete emergency records are automatically saved to the database</li>
              <li>• Check the browser console for emergency IDs and API responses</li>
              <li>• Test the microphone button (visual only for now)</li>
            </ul>
          </div>

          <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
            <h2 className="font-semibold text-black mb-2">Example Test Scenario:</h2>
            <ol className="text-sm text-black space-y-1">
              <li>1. "My house is flooding and we need help"</li>
              <li>2. "I'm at 456 Elm Street in Chicago, Illinois"</li>
              <li>3. "There are 3 of us including my elderly mother"</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
