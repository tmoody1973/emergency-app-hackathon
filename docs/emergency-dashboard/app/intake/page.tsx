"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bot, Send, Mic, MapPin, Users, AlertCircle, Clock } from "lucide-react"

interface Message {
  id: number
  type: "ai" | "user"
  content: string
  timestamp: string
}

interface ExtractedInfo {
  emergencyType?: string
  location?: string
  urgency?: string
  peopleAffected?: number
  needs?: string[]
}

export default function IntakePage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "ai",
      content:
        "Hello, I'm here to help you. Can you tell me what kind of emergency assistance you need? Please describe your situation in your own words.",
      timestamp: "Just now",
    },
    {
      id: 2,
      type: "user",
      content: "There's flooding in my area and we need shelter for my family",
      timestamp: "Just now",
    },
    {
      id: 3,
      type: "ai",
      content:
        "I understand you need emergency shelter due to flooding. Can you tell me your current location and how many people need shelter?",
      timestamp: "Just now",
    },
  ])

  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const extractedInfo: ExtractedInfo = {
    emergencyType: "Flood",
    location: "123 Main St",
    urgency: "High",
    peopleAffected: 4,
    needs: ["Shelter", "Food"],
  }

  const handleSend = () => {
    if (!inputValue.trim()) return

    const newMessage: Message = {
      id: messages.length + 1,
      type: "user",
      content: inputValue,
      timestamp: "Just now",
    }

    setMessages([...messages, newMessage])
    setInputValue("")

    // Simulate AI typing
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      const aiResponse: Message = {
        id: messages.length + 2,
        type: "ai",
        content: "Thank you for that information. I'm processing your request and will connect you with help shortly.",
        timestamp: "Just now",
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 2000)
  }

  const urgencyColors = {
    High: "bg-destructive/10 text-destructive border-destructive/20",
    Medium: "bg-warning/10 text-warning border-warning/20",
    Low: "bg-success/10 text-success border-success/20",
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <header className="border-b border-border bg-white">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#3B82F6]">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">RapidResponse AI</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-balance">
            Tell us what you need - we're here to help
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-pretty">
            Describe your situation in your own words. Our AI will understand and connect you with help.
          </p>
        </div>

        {/* Chat Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Messages - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <Card className="bg-white border-gray-200 shadow-sm">
              <CardContent className="p-6">
                {/* Messages Container */}
                <div className="space-y-6 mb-6 min-h-[500px] max-h-[600px] overflow-y-auto">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.type === "user" ? "flex-row-reverse" : "flex-row"}`}
                    >
                      {/* Avatar */}
                      {message.type === "ai" && (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3B82F6] shrink-0">
                          <Bot className="h-5 w-5 text-white" />
                        </div>
                      )}

                      {/* Message Bubble */}
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                          message.type === "user"
                            ? "bg-[#DBEAFE] text-gray-900"
                            : "bg-white border border-gray-200 shadow-sm text-gray-900"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        <p className="text-xs text-gray-500 mt-2">{message.timestamp}</p>
                      </div>

                      {/* User Avatar Placeholder */}
                      {message.type === "user" && (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 shrink-0">
                          <Users className="h-5 w-5 text-gray-600" />
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3B82F6] shrink-0">
                        <Bot className="h-5 w-5 text-white" />
                      </div>
                      <div className="bg-white border border-gray-200 shadow-sm rounded-2xl px-4 py-3">
                        <div className="flex gap-1">
                          <div
                            className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          />
                          <div
                            className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          />
                          <div
                            className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input Area */}
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSend()}
                      placeholder="Type your message here... or click the mic to speak"
                      className="pr-12 h-12 bg-gray-50 border-gray-200 focus:border-[#3B82F6] focus:ring-[#3B82F6]"
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 text-gray-500 hover:text-[#3B82F6] hover:bg-[#3B82F6]/10"
                    >
                      <Mic className="h-5 w-5" />
                    </Button>
                  </div>
                  <Button onClick={handleSend} className="h-12 px-6 bg-[#3B82F6] hover:bg-[#2563EB] text-white">
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar - Extracted Info */}
          <div className="lg:col-span-1">
            <Card className="bg-white border-gray-200 shadow-sm sticky top-6">
              <CardHeader>
                <CardTitle className="text-gray-900 text-lg">What we've understood so far</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Emergency Type */}
                {extractedInfo.emergencyType && (
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                    <AlertCircle className="h-5 w-5 text-[#3B82F6] shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Emergency Type</p>
                      <p className="text-sm font-semibold text-gray-900 mt-1">{extractedInfo.emergencyType}</p>
                    </div>
                  </div>
                )}

                {/* Location */}
                {extractedInfo.location && (
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                    <MapPin className="h-5 w-5 text-[#3B82F6] shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Location</p>
                      <p className="text-sm font-semibold text-gray-900 mt-1">{extractedInfo.location}</p>
                    </div>
                  </div>
                )}

                {/* Urgency */}
                {extractedInfo.urgency && (
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                    <Clock className="h-5 w-5 text-[#3B82F6] shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Urgency</p>
                      <Badge className={`mt-2 ${urgencyColors[extractedInfo.urgency as keyof typeof urgencyColors]}`}>
                        {extractedInfo.urgency}
                      </Badge>
                    </div>
                  </div>
                )}

                {/* People Affected */}
                {extractedInfo.peopleAffected && (
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                    <Users className="h-5 w-5 text-[#3B82F6] shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">People Affected</p>
                      <p className="text-sm font-semibold text-gray-900 mt-1">{extractedInfo.peopleAffected}</p>
                    </div>
                  </div>
                )}

                {/* Needs */}
                {extractedInfo.needs && extractedInfo.needs.length > 0 && (
                  <div className="p-3 rounded-lg bg-gray-50">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Needs</p>
                    <div className="flex flex-wrap gap-2">
                      {extractedInfo.needs.map((need, index) => (
                        <Badge key={index} className="bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/20">
                          {need}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Help Text */}
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Our AI is analyzing your situation in real-time. Continue the conversation to provide more details
                    and we'll connect you with the right resources.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
