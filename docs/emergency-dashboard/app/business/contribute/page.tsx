"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Building2, Sparkles, MapPin, Calendar, Users, Edit, TrendingUp, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function BusinessContribute() {
  const [description, setDescription] = useState("")
  const [autoMatch, setAutoMatch] = useState(true)
  const [showSuggestions, setShowSuggestions] = useState(false)

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
    setShowSuggestions(e.target.value.length > 20)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-slate-900">RapidResponse AI</h1>
                <p className="text-sm text-slate-500">Business Portal</p>
              </div>
            </Link>
            <Button variant="outline" asChild>
              <Link href="/">Back to Dashboard</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Contribute Resources</h2>
          <p className="text-lg text-slate-600">Tell us what you can offer - AI will match with needs automatically</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Form - Left Column (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Conversational Input */}
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-blue-900" />
                  <Label className="text-base font-semibold text-slate-900">Describe Your Resources</Label>
                </div>
                <Textarea
                  value={description}
                  onChange={handleDescriptionChange}
                  placeholder="Describe what resources you can provide... (e.g., 'We have 50 hotel rooms available for displaced families' or 'Our restaurant can provide 200 meals daily')"
                  className="min-h-[160px] text-base resize-none"
                />

                {/* AI Suggestions */}
                {showSuggestions && (
                  <div className="space-y-3 pt-2">
                    <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <Sparkles className="w-5 h-5 text-blue-900 mt-0.5 flex-shrink-0" />
                      <div className="space-y-2 flex-1">
                        <p className="text-sm text-slate-700">
                          <span className="font-semibold">I detected:</span> 50 hotel rooms, duration not specified. How
                          long can you provide these?
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary" className="bg-blue-100 text-blue-900 hover:bg-blue-200">
                            Shelter
                          </Badge>
                          <Badge variant="secondary" className="bg-blue-100 text-blue-900 hover:bg-blue-200">
                            Temporary Housing
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* AI-Generated Resource Cards */}
            {showSuggestions && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900">Parsed Resources</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Hotel Rooms Card */}
                  <Card className="p-5 hover:shadow-md transition-shadow">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-1">Hotel Rooms</h4>
                          <Badge variant="secondary" className="bg-blue-100 text-blue-900">
                            Shelter
                          </Badge>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-slate-600">
                          <Users className="w-4 h-4" />
                          <span>
                            <span className="font-semibold text-slate-900">Quantity:</span> 50 rooms
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                          <Calendar className="w-4 h-4" />
                          <span>
                            <span className="font-semibold text-slate-900">Duration:</span> 7 days
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                          <MapPin className="w-4 h-4" />
                          <span>
                            <span className="font-semibold text-slate-900">Location:</span> Auto-detected
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Meals Card */}
                  <Card className="p-5 hover:shadow-md transition-shadow">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-1">Meals</h4>
                          <Badge variant="secondary" className="bg-emerald-100 text-emerald-900">
                            Food
                          </Badge>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-slate-600">
                          <Users className="w-4 h-4" />
                          <span>
                            <span className="font-semibold text-slate-900">Quantity:</span> 200/day
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                          <Calendar className="w-4 h-4" />
                          <span>
                            <span className="font-semibold text-slate-900">Duration:</span> 14 days
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>
                            <span className="font-semibold text-slate-900">Options:</span> Standard
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar (1/3) */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-900" />
                Current Needs Matching Your Offer
              </h3>

              <div className="space-y-4">
                {/* Match 1 */}
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-medium text-slate-900">15 families need shelter</p>
                    <Badge className="bg-emerald-100 text-emerald-900 border-emerald-200">92% match</Badge>
                  </div>
                  <Badge variant="outline" className="mb-3">
                    <Sparkles className="w-3 h-3 mr-1" />
                    AI will automatically notify them
                  </Badge>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Users className="w-4 h-4" />
                    <span className="font-semibold text-slate-900">Estimated impact:</span> 60 people housed
                  </div>
                </div>

                {/* Match 2 */}
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-medium text-slate-900">8 shelters need meals</p>
                    <Badge className="bg-emerald-100 text-emerald-900 border-emerald-200">88% match</Badge>
                  </div>
                  <Badge variant="outline" className="mb-3">
                    <Sparkles className="w-3 h-3 mr-1" />
                    AI will automatically notify them
                  </Badge>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Users className="w-4 h-4" />
                    <span className="font-semibold text-slate-900">Estimated impact:</span> 400 people fed daily
                  </div>
                </div>

                {/* Match 3 */}
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-medium text-slate-900">Community center needs supplies</p>
                    <Badge className="bg-blue-100 text-blue-900 border-blue-200">75% match</Badge>
                  </div>
                  <Badge variant="outline" className="mb-3">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Pending review
                  </Badge>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <MapPin className="w-4 h-4" />
                    <span className="font-semibold text-slate-900">Distance:</span> 2.3 miles away
                  </div>
                </div>
              </div>
            </Card>

            {/* Impact Summary */}
            <Card className="p-6 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
              <h4 className="font-semibold mb-3">Potential Impact</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-100">People helped:</span>
                  <span className="font-semibold">460+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-100">Active matches:</span>
                  <span className="font-semibold">23</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-100">Response time:</span>
                  <span className="font-semibold">Instant</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Bottom Actions */}
        <Card className="mt-6 p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Switch id="auto-match" checked={autoMatch} onCheckedChange={setAutoMatch} />
              <Label htmlFor="auto-match" className="text-sm font-medium text-slate-700 cursor-pointer">
                Auto-match with future needs
              </Label>
            </div>

            <div className="flex gap-3 w-full sm:w-auto">
              <Button variant="outline" className="flex-1 sm:flex-none bg-transparent">
                Save as Draft
              </Button>
              <Button
                className="flex-1 sm:flex-none bg-blue-900 hover:bg-blue-800 text-white"
                disabled={!showSuggestions}
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Confirm & Publish Resources
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
