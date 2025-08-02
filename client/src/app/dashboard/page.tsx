"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Heart, Activity, TrendingUp, Calendar, User, Settings, History, LogOut, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [lastAssessment, setLastAssessment] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    const assessmentData = localStorage.getItem("lastAssessment")

    if (userData) {
      setUser(JSON.parse(userData))
    }

    if (assessmentData) {
      setLastAssessment(JSON.parse(assessmentData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("lastAssessment")
    router.push("/")
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">HealthGuard Youth</h1>
                <p className="text-sm text-gray-600">Welcome back, {user.name}!</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Palette className="w-4 h-4 mr-2" />
                Themes
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Link href="/profile">
                    <Button variant="ghost" className="w-full justify-start">
                      <User className="w-4 h-4 mr-3" />
                      Profile
                    </Button>
                  </Link>
                  <Link href="/history">
                    <Button variant="ghost" className="w-full justify-start">
                      <History className="w-4 h-4 mr-3" />
                      History
                    </Button>
                  </Link>
                  <Link href="/settings">
                    <Button variant="ghost" className="w-full justify-start">
                      <Settings className="w-4 h-4 mr-3" />
                      Settings
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Welcome Card */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">Health Dashboard</h2>
                      <p className="text-blue-100">
                        {lastAssessment
                          ? "Your last assessment shows you're on the right track!"
                          : "Ready to start your health journey? Take your first assessment!"}
                      </p>
                    </div>
                    <div className="hidden md:block">
                      <Activity className="w-16 h-16 text-blue-200" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Risk Level</h3>
                    <div className="text-2xl font-bold text-green-600">
                      {lastAssessment ? `${lastAssessment.riskScore}%` : "Not Assessed"}
                    </div>
                    {lastAssessment && (
                      <Badge variant="secondary" className="mt-2">
                        {lastAssessment.riskLevel}
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold mb-2">BMI</h3>
                    <div className="text-2xl font-bold text-blue-600">
                      {user.height && user.weight
                        ? (Number.parseFloat(user.weight) / Math.pow(Number.parseFloat(user.height) / 100, 2)).toFixed(
                            1,
                          )
                        : "N/A"}
                    </div>
                    <Badge variant="outline" className="mt-2">
                      Normal Range
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold mb-2">Last Check</h3>
                    <div className="text-2xl font-bold text-purple-600">
                      {lastAssessment ? new Date(lastAssessment.date).toLocaleDateString() : "Never"}
                    </div>
                    <Badge variant="outline" className="mt-2">
                      {lastAssessment ? "Recent" : "Pending"}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Action Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Activity className="w-5 h-5 mr-2 text-blue-600" />
                      Health Assessment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      {lastAssessment
                        ? "Take a new assessment to track your progress and get updated recommendations."
                        : "Start your health journey with our comprehensive risk assessment."}
                    </p>
                    <Link href="/assessment">
                      <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                        {lastAssessment ? "Take New Assessment" : "Start Assessment"}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Heart className="w-5 h-5 mr-2 text-red-600" />
                      Personalized Advice
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      {lastAssessment
                        ? "View your personalized recommendations based on your latest assessment."
                        : "Get tailored health advice after completing your first assessment."}
                    </p>
                    <Button variant="outline" className="w-full bg-transparent" disabled={!lastAssessment}>
                      View Recommendations
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Recent Activity */}
            {lastAssessment && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Recent Assessment Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-semibold">Risk Assessment</h4>
                          <p className="text-sm text-gray-600">
                            Completed on {new Date(lastAssessment.date).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant={lastAssessment.riskLevel === "Low" ? "default" : "destructive"}>
                          {lastAssessment.riskLevel} Risk
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
