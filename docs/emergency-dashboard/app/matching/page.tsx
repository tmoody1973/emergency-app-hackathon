"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Activity,
  Flame,
  Droplets,
  Heart,
  Home,
  MapPin,
  Clock,
  Star,
  Navigation,
  CheckCircle2,
  Users,
  Sparkles,
} from "lucide-react"

export default function MatchingDashboard() {
  const [selectedRequest, setSelectedRequest] = useState(1)
  const [autoDispatch, setAutoDispatch] = useState(false)
  const [activeFilter, setActiveFilter] = useState("All")

  const requests = [
    {
      id: 1,
      urgency: "critical",
      type: "flood",
      icon: Droplets,
      description: "Family of 4 needs shelter - flood damage",
      location: "Downtown District",
      distance: "1.2 miles",
      timestamp: "2 minutes ago",
      matchStatus: "3 Matches Found",
      matchCount: 3,
    },
    {
      id: 2,
      urgency: "critical",
      type: "fire",
      icon: Flame,
      description: "Elderly couple needs evacuation assistance",
      location: "Riverside Area",
      distance: "0.8 miles",
      timestamp: "5 minutes ago",
      matchStatus: "AI Matching...",
      matchCount: 0,
    },
    {
      id: 3,
      urgency: "high",
      type: "medical",
      icon: Heart,
      description: "Medical supplies needed for diabetic patient",
      location: "Westside",
      distance: "2.1 miles",
      timestamp: "8 minutes ago",
      matchStatus: "5 Matches Found",
      matchCount: 5,
    },
    {
      id: 4,
      urgency: "high",
      type: "shelter",
      icon: Home,
      description: "Single parent with 2 children needs temporary housing",
      location: "North End",
      distance: "3.5 miles",
      timestamp: "12 minutes ago",
      matchStatus: "2 Matches Found",
      matchCount: 2,
    },
    {
      id: 5,
      urgency: "medium",
      type: "medical",
      icon: Heart,
      description: "Prescription medication delivery needed",
      location: "East Village",
      distance: "1.9 miles",
      timestamp: "15 minutes ago",
      matchStatus: "4 Matches Found",
      matchCount: 4,
    },
    {
      id: 6,
      urgency: "medium",
      type: "shelter",
      icon: Home,
      description: "Temporary shelter for displaced family",
      location: "South Bay",
      distance: "4.2 miles",
      timestamp: "18 minutes ago",
      matchStatus: "1 Match Found",
      matchCount: 1,
    },
  ]

  const matches = [
    {
      id: 1,
      name: "Sarah Martinez",
      role: "Medical Professional",
      avatar: "SM",
      matchScore: 95,
      skills: ["First Aid", "CPR", "Spanish-speaking"],
      availability: "Available Now",
      distance: "2.3 miles",
      reasoning: "AI selected based on: proximity, medical skills, immediate availability",
    },
    {
      id: 2,
      name: "James Chen",
      role: "Emergency Responder",
      avatar: "JC",
      matchScore: 92,
      skills: ["Water Rescue", "Heavy Lifting", "Crisis Management"],
      availability: "Available Now",
      distance: "1.8 miles",
      reasoning: "AI selected based on: flood response experience, physical capability, location",
    },
    {
      id: 3,
      name: "Maria Rodriguez",
      role: "Social Worker",
      avatar: "MR",
      matchScore: 88,
      skills: ["Family Support", "Bilingual", "Child Care"],
      availability: "Available Now",
      distance: "3.1 miles",
      reasoning: "AI selected based on: family crisis experience, language skills, availability",
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Logistics Coordinator",
      avatar: "DT",
      matchScore: 85,
      skills: ["Transportation", "Supply Management", "Communication"],
      availability: "Available in 15 min",
      distance: "2.7 miles",
      reasoning: "AI selected based on: resource coordination, vehicle access, response time",
    },
    {
      id: 5,
      name: "Lisa Park",
      role: "Nurse Practitioner",
      avatar: "LP",
      matchScore: 90,
      skills: ["Emergency Medicine", "Pediatrics", "Trauma Care"],
      availability: "Available Now",
      distance: "1.5 miles",
      reasoning: "AI selected based on: medical expertise, pediatric experience, immediate availability",
    },
    {
      id: 6,
      name: "Metro Supplies Co.",
      role: "Business Partner",
      avatar: "MS",
      matchScore: 87,
      skills: ["Emergency Supplies", "24/7 Service", "Bulk Delivery"],
      availability: "Available Now",
      distance: "0.9 miles",
      reasoning: "AI selected based on: inventory availability, delivery capability, proximity",
    },
  ]

  const urgencyColors = {
    critical: {
      bar: "bg-red-500",
      badge: "bg-red-500/10 text-red-600 border-red-500/20",
      text: "text-red-600",
    },
    high: {
      bar: "bg-orange-500",
      badge: "bg-orange-500/10 text-orange-600 border-orange-500/20",
      text: "text-orange-600",
    },
    medium: {
      bar: "bg-yellow-500",
      badge: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
      text: "text-yellow-600",
    },
  }

  const selectedRequestData = requests.find((r) => r.id === selectedRequest)

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                  <Activity className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-xl font-bold text-slate-900">RapidResponse AI</h1>
              </Link>

              <nav className="flex gap-1">
                <Link href="/">
                  <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors">
                    Dashboard
                  </button>
                </Link>
                <button className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md">
                  Coordinator View
                </button>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Split Screen */}
      <div className="flex h-[calc(100vh-73px)]">
        {/* Left Panel - Incoming Requests (40%) */}
        <div className="w-2/5 border-r bg-white flex flex-col">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Incoming Requests</h2>

            {/* Filter Buttons */}
            <div className="flex gap-2">
              {["All", "Critical", "High", "Medium"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeFilter === filter
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Scrollable Request List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {requests.map((request) => {
              const Icon = request.icon
              const colors = urgencyColors[request.urgency as keyof typeof urgencyColors]

              return (
                <div
                  key={request.id}
                  onClick={() => setSelectedRequest(request.id)}
                  className={`relative cursor-pointer rounded-lg border transition-all ${
                    selectedRequest === request.id
                      ? "border-blue-500 bg-blue-50 shadow-md"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                  }`}
                >
                  {/* Urgency Indicator Bar */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-lg ${colors.bar}`} />

                  <div className="p-4 pl-5">
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.badge} shrink-0`}>
                        <Icon className={`h-5 w-5 ${colors.text}`} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-900 mb-1">{request.description}</p>

                        <div className="flex items-center gap-4 text-xs text-slate-600 mb-2">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span>{request.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Navigation className="h-3 w-3" />
                            <span>{request.distance}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-xs text-slate-500">
                            <Clock className="h-3 w-3" />
                            <span>{request.timestamp}</span>
                          </div>

                          {request.matchCount > 0 ? (
                            <Badge className="bg-green-500/10 text-green-700 border-green-500/20 text-xs">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              {request.matchStatus}
                            </Badge>
                          ) : (
                            <Badge className="bg-blue-500/10 text-blue-700 border-blue-500/20 text-xs">
                              <Sparkles className="h-3 w-3 mr-1 animate-pulse" />
                              {request.matchStatus}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Panel - AI Suggested Matches (60%) */}
        <div className="flex-1 flex flex-col bg-slate-50">
          <div className="p-6 border-b bg-white">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold text-slate-900">AI-Suggested Matches</h2>
              <Badge className="bg-blue-500/10 text-blue-700 border-blue-500/20">
                <Sparkles className="h-3 w-3 mr-1" />
                AI Powered
              </Badge>
            </div>
            {selectedRequestData && (
              <p className="text-sm text-slate-600">
                Showing matches for: <span className="font-semibold">{selectedRequestData.description}</span>
              </p>
            )}
          </div>

          {/* Matches Grid */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-3 gap-4 mb-6">
              {matches.map((match) => (
                <Card key={match.id} className="bg-white border-slate-200 hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-3">
                      {/* Avatar */}
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white font-semibold shrink-0">
                        {match.avatar}
                      </div>

                      {/* Match Score */}
                      <Badge className="bg-green-500/10 text-green-700 border-green-500/20 font-semibold">
                        <Star className="h-3 w-3 mr-1 fill-green-600" />
                        {match.matchScore}% Match
                      </Badge>
                    </div>

                    <CardTitle className="text-base text-slate-900">{match.name}</CardTitle>
                    <p className="text-sm text-slate-600">{match.role}</p>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    {/* Skills */}
                    <div>
                      <p className="text-xs font-semibold text-slate-700 mb-2">Key Skills</p>
                      <div className="flex flex-wrap gap-1">
                        {match.skills.map((skill, idx) => (
                          <Badge key={idx} className="bg-slate-100 text-slate-700 border-slate-200 text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Availability & Distance */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                        <span className="text-xs text-slate-700 font-medium">{match.availability}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <Navigation className="h-3 w-3" />
                        <span>{match.distance}</span>
                      </div>
                    </div>

                    {/* AI Reasoning */}
                    <div className="pt-3 border-t border-slate-100">
                      <p className="text-xs text-slate-600 leading-relaxed">{match.reasoning}</p>
                    </div>

                    {/* Dispatch Button */}
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Dispatch</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="border-t bg-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Switch id="auto-dispatch" checked={autoDispatch} onCheckedChange={setAutoDispatch} />
                  <Label htmlFor="auto-dispatch" className="text-sm font-medium text-slate-700 cursor-pointer">
                    Auto-Dispatch Best Match
                  </Label>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent">
                  <Users className="h-4 w-4 mr-2" />
                  Request More Volunteers
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Dispatch Selected
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
