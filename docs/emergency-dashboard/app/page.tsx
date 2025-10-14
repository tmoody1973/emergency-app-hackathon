"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, MapPin, TrendingUp, Users, Building2, Activity, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function EmergencyDashboard() {
  const activeTab = "Active Emergencies"

  const emergencyPins = [
    { id: 1, lat: 40.7128, lng: -74.006, urgency: "critical", type: "Water Rescue", location: "Downtown" },
    { id: 2, lat: 40.758, lng: -73.9855, urgency: "high", type: "Medical Emergency", location: "Midtown" },
    { id: 3, lat: 40.7489, lng: -73.968, urgency: "high", type: "Shelter Request", location: "Queens" },
    { id: 4, lat: 40.6782, lng: -73.9442, urgency: "medium", type: "Food Distribution", location: "Brooklyn" },
    { id: 5, lat: 40.7614, lng: -73.9776, urgency: "critical", type: "Fire Rescue", location: "Upper East" },
    { id: 6, lat: 40.7282, lng: -73.7949, urgency: "medium", type: "Transport Needed", location: "Jamaica" },
  ]

  const recentMatches = [
    {
      id: 1,
      volunteer: "Sarah M.",
      need: "Water rescue request",
      status: "En Route",
      time: "2 min ago",
      statusColor: "warning",
    },
    {
      id: 2,
      volunteer: "John D.",
      need: "Medical supplies delivery",
      status: "Completed",
      time: "5 min ago",
      statusColor: "success",
    },
    {
      id: 3,
      volunteer: "Maria G.",
      need: "Shelter setup assistance",
      status: "Matched",
      time: "8 min ago",
      statusColor: "primary",
    },
    {
      id: 4,
      volunteer: "David L.",
      need: "Food distribution",
      status: "En Route",
      time: "12 min ago",
      statusColor: "warning",
    },
  ]

  const activityFeed = [
    { id: 1, text: "Sarah M. accepted water rescue request", time: "Just now", icon: "user" },
    { id: 2, text: "AI matched 3 volunteers to food distribution", time: "1 min ago", icon: "ai" },
    { id: 3, text: "New shelter request in Downtown area", time: "3 min ago", icon: "alert" },
    { id: 4, text: "Business 'Metro Supplies' marked as Ready", time: "5 min ago", icon: "business" },
    { id: 5, text: "Emergency response team deployed to Midtown", time: "7 min ago", icon: "activity" },
    { id: 6, text: "AI predicted surge in medical supply requests", time: "10 min ago", icon: "ai" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                  <Activity className="h-6 w-6 text-primary-foreground" />
                </div>
                <h1 className="text-xl font-bold text-foreground">RapidResponse AI</h1>
              </div>

              <nav className="flex gap-1">
                {["Active Emergencies", "Volunteers", "Businesses", "Analytics"].map((tab) => (
                  <button
                    key={tab}
                    className={`px-4 py-2 text-sm font-medium transition-colors rounded-md ${
                      activeTab === tab
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            {/* Report Emergency Button */}
            <div className="flex items-center gap-3">
              <Link href="/volunteer/onboard">
                <Button
                  variant="outline"
                  className="gap-2 bg-transparent border-success text-success hover:bg-success/10"
                >
                  <Users className="h-4 w-4" />
                  Join as Volunteer
                </Button>
              </Link>
              <Link href="/matching">
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Users className="h-4 w-4" />
                  Coordinator View
                </Button>
              </Link>
              <Link href="/business/contribute">
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Building2 className="h-4 w-4" />
                  Contribute Resources
                </Button>
              </Link>
              <Link href="/intake">
                <Button className="bg-destructive hover:bg-destructive/90 text-destructive-foreground gap-2">
                  <Plus className="h-4 w-4" />
                  Report Emergency
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Status Bar */}
      <div className="border-b border-border bg-secondary">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-destructive" />
                <span className="font-semibold text-foreground">12 Active Requests</span>
              </div>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-success" />
                <span className="font-semibold text-foreground">45 Volunteers Available</span>
              </div>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-accent" />
                <span className="font-semibold text-foreground">8 Businesses Ready</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
              <span className="text-muted-foreground">Live</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-6">
        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Large Map Card - 60% width on desktop */}
          <Card className="lg:col-span-2 bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Live Emergency Map</CardTitle>
              <CardDescription className="text-muted-foreground">
                Real-time emergency locations and urgency levels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative h-[500px] bg-secondary rounded-lg overflow-hidden">
                {/* Map Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-secondary via-muted to-secondary opacity-50" />

                {/* Emergency Pins */}
                <div className="absolute inset-0">
                  {emergencyPins.map((pin, index) => {
                    const colors = {
                      critical: "bg-destructive",
                      high: "bg-accent",
                      medium: "bg-warning",
                    }
                    const positions = [
                      { top: "15%", left: "25%" },
                      { top: "35%", left: "60%" },
                      { top: "45%", left: "70%" },
                      { top: "60%", left: "40%" },
                      { top: "25%", left: "75%" },
                      { top: "70%", left: "55%" },
                    ]

                    return (
                      <div
                        key={pin.id}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                        style={positions[index]}
                      >
                        <div
                          className={`${colors[pin.urgency as keyof typeof colors]} h-4 w-4 rounded-full animate-pulse`}
                        />
                        <div
                          className={`${colors[pin.urgency as keyof typeof colors]} h-8 w-8 rounded-full opacity-30 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-ping`}
                        />

                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block">
                          <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-lg whitespace-nowrap">
                            <p className="text-sm font-semibold text-foreground">{pin.type}</p>
                            <p className="text-xs text-muted-foreground">{pin.location}</p>
                            <Badge className={`mt-1 text-xs ${colors[pin.urgency as keyof typeof colors]}`}>
                              {pin.urgency}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm border border-border rounded-lg p-3">
                  <p className="text-xs font-semibold text-foreground mb-2">Urgency Levels</p>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-destructive" />
                      <span className="text-xs text-muted-foreground">Critical</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-accent" />
                      <span className="text-xs text-muted-foreground">High</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-warning" />
                      <span className="text-xs text-muted-foreground">Medium</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Column - 40% width */}
          <div className="flex flex-col gap-6">
            {/* Recent Matches Card */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Recent Matches</CardTitle>
                <CardDescription className="text-muted-foreground">Volunteer assignments and status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentMatches.map((match) => {
                    const statusColors = {
                      success: "bg-success/10 text-success border-success/20",
                      warning: "bg-warning/10 text-warning border-warning/20",
                      primary: "bg-primary/10 text-primary-foreground border-primary/20",
                    }

                    return (
                      <div
                        key={match.id}
                        className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50 border border-border"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-foreground truncate">{match.volunteer}</p>
                          <p className="text-xs text-muted-foreground mt-1">{match.need}</p>
                          <p className="text-xs text-muted-foreground mt-1">{match.time}</p>
                        </div>
                        <Badge
                          className={`${statusColors[match.statusColor as keyof typeof statusColors]} text-xs shrink-0`}
                        >
                          {match.status}
                        </Badge>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* AI Insights Card */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  AI Insights
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Predictive analytics and recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Surge Prediction</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Based on flood patterns, expect{" "}
                          <span className="font-semibold text-accent">15 more shelter requests</span> in next 2 hours
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                    <div className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-success shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Resource Optimization</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          <span className="font-semibold text-success">12 volunteers</span> available in high-demand
                          zones
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Hotspot Alert</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Downtown area showing <span className="font-semibold text-primary">3x normal activity</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Activity Feed */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Activity Feed</CardTitle>
            <CardDescription className="text-muted-foreground">Real-time updates and system events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activityFeed.map((activity) => {
                const icons = {
                  user: <Users className="h-4 w-4" />,
                  ai: <TrendingUp className="h-4 w-4" />,
                  alert: <AlertCircle className="h-4 w-4" />,
                  business: <Building2 className="h-4 w-4" />,
                  activity: <Activity className="h-4 w-4" />,
                }

                return (
                  <div
                    key={activity.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 border border-border hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
                      {icons[activity.icon as keyof typeof icons]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">{activity.text}</p>
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0">{activity.time}</span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
