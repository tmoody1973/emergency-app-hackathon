"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Heart,
  Send,
  Check,
  Edit2,
  MapPin,
  Stethoscope,
  Home,
  Utensils,
  Hammer,
  Users,
  Truck,
  AlertCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react"
import Link from "next/link"

export default function VolunteerOnboarding() {
  const [step, setStep] = useState(1)
  const [userMessage, setUserMessage] = useState("")
  const [chatMessages, setChatMessages] = useState<Array<{ role: "ai" | "user"; content: string }>>([])
  const [showAiResponse, setShowAiResponse] = useState(false)
  const [profile, setProfile] = useState({
    skills: ["Nursing", "First Aid", "CPR"],
    languages: ["English", "Spanish"],
    availability: "Weekends",
    certifications: ["RN"],
  })
  const [radius, setRadius] = useState([15])
  const [selectedEmergencies, setSelectedEmergencies] = useState<string[]>(["medical"])

  const emergencyTypes = [
    { id: "medical", label: "Medical", icon: Stethoscope },
    { id: "shelter", label: "Shelter", icon: Home },
    { id: "food", label: "Food Distribution", icon: Utensils },
    { id: "cleanup", label: "Cleanup", icon: Hammer },
    { id: "rescue", label: "Rescue", icon: Users },
    { id: "transport", label: "Transport", icon: Truck },
  ]

  const handleSendMessage = () => {
    if (!userMessage.trim()) return

    setChatMessages([...chatMessages, { role: "user", content: userMessage }])
    setUserMessage("")

    setTimeout(() => {
      setShowAiResponse(true)
      setChatMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: "Perfect! I've created your profile based on what you shared. Let me confirm what I understood...",
        },
      ])

      setTimeout(() => {
        setStep(3)
      }, 2000)
    }, 1000)
  }

  const toggleEmergency = (id: string) => {
    setSelectedEmergencies((prev) => (prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]))
  }

  const progressPercentage = (step / 5) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
        <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${progressPercentage}%` }} />
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8 mt-4">
          {[1, 2, 3, 4, 5].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  s === step
                    ? "bg-blue-500 text-white"
                    : s < step
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-500"
                }`}
              >
                {s < step ? <Check className="w-4 h-4" /> : s}
              </div>
              {s < 5 && <div className={`w-8 h-0.5 ${s < step ? "bg-green-500" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>

        {/* Step 1: Welcome */}
        {step === 1 && (
          <div className="text-center space-y-8 py-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 mb-4">
              <Heart className="w-10 h-10 text-blue-500" />
            </div>
            <div className="space-y-4">
              <h1 className="text-5xl font-bold text-gray-900 text-balance">Join Our Emergency Response Network</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto text-pretty">
                No lengthy forms. Just tell us about yourself in your own words.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4 pt-8">
              <Button
                size="lg"
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-lg"
                onClick={() => setStep(2)}
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <p className="text-sm text-gray-500">Takes less than 3 minutes</p>
            </div>
          </div>
        )}

        {/* Step 2: AI Conversation */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Tell Us About Yourself</h2>
              <p className="text-gray-600">Share your skills, experience, and availability in your own words</p>
            </div>

            <Card className="p-6 bg-white shadow-lg">
              <div className="space-y-4 mb-6 min-h-[300px]">
                {/* AI Initial Message */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                    <p className="text-gray-900">
                      Great! Tell me about your skills, experience, and how you'd like to help. Feel free to write
                      naturally - I'll extract the important details.
                    </p>
                  </div>
                </div>

                {/* Chat Messages */}
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
                    {msg.role === "ai" && (
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div
                      className={`rounded-2xl px-4 py-3 max-w-[80%] ${
                        msg.role === "user"
                          ? "bg-blue-500 text-white rounded-tr-sm"
                          : "bg-gray-100 text-gray-900 rounded-tl-sm"
                      }`}
                    >
                      <p>{msg.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Area */}
              <div className="flex gap-2">
                <Textarea
                  placeholder="e.g., I'm a nurse with 5 years experience, speak Spanish, and I'm available weekends..."
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  className="min-h-[100px] resize-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                />
                <Button size="icon" className="bg-blue-500 hover:bg-blue-600 h-auto" onClick={handleSendMessage}>
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Step 3: AI-Generated Profile Review */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Review Your Profile</h2>
              <p className="text-gray-600">I've extracted this information from what you shared</p>
            </div>

            <Card className="p-6 bg-white shadow-lg space-y-6">
              {/* Skills */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">Skills & Expertise</h3>
                  <Button variant="ghost" size="sm">
                    <Edit2 className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-blue-100 text-blue-700 px-3 py-1">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">Languages</h3>
                  <Button variant="ghost" size="sm">
                    <Edit2 className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profile.languages.map((lang) => (
                    <Badge key={lang} variant="secondary" className="bg-purple-100 text-purple-700 px-3 py-1">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">Availability</h3>
                  <Button variant="ghost" size="sm">
                    <Edit2 className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-700 px-3 py-1">
                  {profile.availability}
                </Badge>
              </div>

              {/* Certifications */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">Certifications (Detected)</h3>
                  <Button variant="ghost" size="sm">
                    <Edit2 className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profile.certifications.map((cert) => (
                    <Badge key={cert} variant="secondary" className="bg-amber-100 text-amber-700 px-3 py-1">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setStep(2)}>
                Let me edit
              </Button>
              <Button className="flex-1 bg-blue-500 hover:bg-blue-600" onClick={() => setStep(4)}>
                Looks good!
                <Check className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Location & Preferences */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Location & Preferences</h2>
              <p className="text-gray-600">Help us match you with nearby emergencies</p>
            </div>

            <Card className="p-6 bg-white shadow-lg space-y-6">
              {/* Location */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-500" />
                  Where are you based?
                </h3>
                <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 opacity-50" />
                  <MapPin className="w-12 h-12 text-blue-500 relative z-10" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <Input placeholder="Enter your address or zip code" className="bg-white shadow-lg" />
                  </div>
                </div>
              </div>

              {/* Travel Radius */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">How far can you travel?</h3>
                <div className="space-y-4">
                  <Slider value={radius} onValueChange={setRadius} min={5} max={50} step={5} className="w-full" />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>5 miles</span>
                    <span className="font-semibold text-blue-600">{radius[0]} miles</span>
                    <span>50 miles</span>
                  </div>
                </div>
              </div>

              {/* Emergency Types */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">What emergencies interest you?</h3>
                <div className="grid grid-cols-2 gap-3">
                  {emergencyTypes.map((type) => {
                    const Icon = type.icon
                    const isSelected = selectedEmergencies.includes(type.id)
                    return (
                      <button
                        key={type.id}
                        onClick={() => toggleEmergency(type.id)}
                        className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                          isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white hover:border-gray-300"
                        }`}
                      >
                        <Checkbox checked={isSelected} />
                        <Icon className={`w-5 h-5 ${isSelected ? "text-blue-500" : "text-gray-400"}`} />
                        <span className={`text-sm font-medium ${isSelected ? "text-blue-900" : "text-gray-700"}`}>
                          {type.label}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </Card>

            <Button className="w-full bg-blue-500 hover:bg-blue-600" onClick={() => setStep(5)}>
              Continue
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Step 5: Confirmation */}
        {step === 5 && (
          <div className="space-y-6 text-center py-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
              <Check className="w-10 h-10 text-green-600" />
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-gray-900">You're All Set!</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                We'll notify you when there's a match based on your skills and location.
              </p>
            </div>

            {/* Preview Notification */}
            <div className="max-w-md mx-auto mt-8">
              <p className="text-sm text-gray-500 mb-4">Here's what you'll see when we need you:</p>
              <Card className="p-4 bg-white shadow-lg border-2 border-orange-200">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-semibold text-gray-900 mb-1">Emergency Match Found</h4>
                    <p className="text-sm text-gray-600 mb-2">Medical assistance needed • 2.3 miles away</p>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-green-500 hover:bg-green-600">
                        Accept
                      </Button>
                      <Button size="sm" variant="outline">
                        Decline
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="flex flex-col items-center gap-4 pt-8">
              <Link href="/">
                <Button size="lg" className="bg-blue-500 hover:bg-blue-600 px-8">
                  Go to Dashboard
                </Button>
              </Link>
              <Link href="/volunteer/notification">
                <Button variant="link" className="text-blue-600">
                  View sample notification
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
