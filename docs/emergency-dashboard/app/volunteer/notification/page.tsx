"use client"

import { MapPin, Clock, Users, CheckCircle2, X, Calendar, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function VolunteerNotificationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Alert Banner */}
      <div className="bg-orange-500 text-white px-4 py-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <AlertTriangle className="h-6 w-6" />
          <h1 className="text-2xl font-bold">New Emergency Match!</h1>
        </div>
        <Badge className="bg-red-600 hover:bg-red-600 text-white border-0 text-sm px-3 py-1">HIGH PRIORITY</Badge>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6 max-w-md mx-auto">
        {/* Emergency Card */}
        <Card className="p-6 mb-6 shadow-lg">
          {/* Emergency Type Icon */}
          <div className="flex items-center gap-3 mb-4">
            <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
              <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900">Flood Relief - Shelter Assistance Needed</h2>
            </div>
          </div>

          {/* Location & Distance */}
          <div className="mb-4">
            <div className="flex items-center gap-2 text-gray-700 mb-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              <span className="font-medium">Downtown Community Center</span>
            </div>
            <div className="h-32 bg-gray-200 rounded-lg mb-2 flex items-center justify-center">
              <span className="text-gray-500 text-sm">Map Preview</span>
            </div>
            <p className="text-blue-600 font-semibold">1.8 miles from you</p>
          </div>

          {/* Details Section */}
          <div className="space-y-3 mb-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-start gap-2">
              <Users className="h-5 w-5 text-gray-600 mt-0.5" />
              <p className="text-gray-900">Family of 4 needs temporary shelter</p>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="h-5 w-5 text-gray-600 mt-0.5" />
              <p className="text-gray-900">Estimated time: 2-3 hours</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-gray-600 mt-0.5" />
              <p className="text-gray-900">Skills needed: None - just compassion</p>
            </div>
          </div>

          {/* AI Explanation */}
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm font-semibold text-blue-900 mb-1">Why you?</p>
            <p className="text-sm text-blue-800">You're nearby, available now, and have helped with similar requests</p>
          </div>

          {/* Contact Info */}
          <div className="mb-4 p-4 bg-gray-100 rounded-lg">
            <p className="text-sm text-gray-600 italic">Contact details provided after acceptance</p>
          </div>

          {/* Supplies Needed */}
          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-900 mb-2">Supplies needed:</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-white">
                Blankets
              </Badge>
              <Badge variant="outline" className="bg-white">
                Water
              </Badge>
              <Badge variant="outline" className="bg-white">
                Basic first aid
              </Badge>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3 mb-6">
          <Button className="w-full h-14 text-lg font-semibold bg-green-600 hover:bg-green-700 text-white" size="lg">
            <CheckCircle2 className="h-5 w-5 mr-2" />
            Accept & Get Directions
          </Button>

          <Button variant="outline" className="w-full h-14 text-lg font-semibold bg-white hover:bg-gray-50" size="lg">
            <X className="h-5 w-5 mr-2" />
            Decline
          </Button>

          <Button
            variant="ghost"
            className="w-full h-14 text-lg font-semibold text-gray-600 hover:bg-gray-100"
            size="lg"
          >
            <Calendar className="h-5 w-5 mr-2" />
            Not Available - Suggest Another Time
          </Button>
        </div>

        {/* Bottom Info */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <Avatar className="h-8 w-8 border-2 border-white">
                  <AvatarFallback className="bg-blue-500 text-white text-xs">JD</AvatarFallback>
                </Avatar>
                <Avatar className="h-8 w-8 border-2 border-white">
                  <AvatarFallback className="bg-green-500 text-white text-xs">SM</AvatarFallback>
                </Avatar>
                <Avatar className="h-8 w-8 border-2 border-white">
                  <AvatarFallback className="bg-purple-500 text-white text-xs">AL</AvatarFallback>
                </Avatar>
                <Avatar className="h-8 w-8 border-2 border-white">
                  <AvatarFallback className="bg-orange-500 text-white text-xs">+9</AvatarFallback>
                </Avatar>
              </div>
              <span className="text-sm text-gray-600">12 other volunteers nearby</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Clock className="h-4 w-4 text-green-600" />
            <span>
              Help can arrive in <span className="font-semibold text-green-600">15 minutes</span>
            </span>
          </div>
        </Card>
      </div>
    </div>
  )
}
