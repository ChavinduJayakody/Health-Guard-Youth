"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Heart,
  Activity,
  TrendingUp,
  Calendar,
  User,
  BarChart3,
  FileText,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useUser } from "@/context/UserContext"

export default function DashboardPage() {
  const { user, loading, logout } = useUser()
  const [lastAssessment, setLastAssessment] = useState<any>(null)
  const [assessmentHistory, setAssessmentHistory] = useState<any[]>([])
  const { toast } = useToast()
  const router = useRouter()

  if (loading) return <p>Loading...</p>

  // useEffect(() => {

  //   const lastAssessmentData = localStorage.getItem("lastAssessment")
  //   if (lastAssessmentData) {
  //     setLastAssessment(JSON.parse(lastAssessmentData))
  //   }

  //   const historyData = localStorage.getItem("assessments")
  //   if (historyData) {
  //     setAssessmentHistory(JSON.parse(historyData))
  //   }
  // }, [router])

  const getHealthStatus = () => {
    if (!lastAssessment) return { status: "Unknown", color: "bg-gray-500", message: "Take your first assessment" }

    if (lastAssessment.riskLevel === "Low") {
      return { status: "Excellent", color: "bg-green-500", message: "Your health is on track!" }
    } else if (lastAssessment.riskLevel === "Medium") {
      return { status: "Good", color: "bg-yellow-500", message: "Some areas need attention" }
    } else {
      return { status: "Needs Attention", color: "bg-red-500", message: "Please consult a healthcare provider" }
    }
  }

  const healthStatus = getHealthStatus()

  const quickStats = [
    {
      title: "Overall Health Score",
      value: lastAssessment ? `${100 - lastAssessment.overallRisk}%` : "N/A",
      icon: <Heart className="w-5 h-5" />,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "Diabetes Risk",
      value: lastAssessment ? `${lastAssessment.riskScores?.diabetes || 0}%` : "N/A",
      icon: <Activity className="w-5 h-5" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "CVD Risk",
      value: lastAssessment ? `${lastAssessment.riskScores?.cvd || 0}%` : "N/A",
      icon: <TrendingUp className="w-5 h-5" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Assessments Taken",
      value: assessmentHistory.length.toString(),
      icon: <BarChart3 className="w-5 h-5" />,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
  ]

  const actionCards = [
    {
      title: "Take Health Assessment",
      description: "Complete a comprehensive health risk assessment",
      icon: <FileText className="w-6 h-6" />,
      href: "/assessment",
      color: "from-blue-500 to-emerald-500",
      buttonText: "Start Assessment",
    },
    {
      title: "View History",
      description: "Track your health progress over time",
      icon: <Calendar className="w-6 h-6" />,
      href: "/history",
      color: "from-purple-500 to-pink-500",
      buttonText: "View History",
    },
    {
      title: "Health Articles",
      description: "Learn about diabetes and heart disease prevention",
      icon: <Heart className="w-6 h-6" />,
      href: "/articles",
      color: "from-emerald-500 to-teal-500",
      buttonText: "Read Articles",
    },
    {
      title: "Update Profile",
      description: "Keep your health information up to date",
      icon: <User className="w-6 h-6" />,
      href: "/profile",
      color: "from-orange-500 to-red-500",
      buttonText: "Edit Profile",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Welcome back, {user?.name?.split(" ")[0] || "User"}! 👋
              </h1>
              <p className="text-slate-600">
                Here's your health overview for today,{" "}
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="text-right">
              <div
                className={`inline-flex items-center px-3 py-1 rounded-full text-white text-sm font-medium ${healthStatus.color}`}
              >
                {healthStatus.status === "Excellent" && <CheckCircle className="w-4 h-4 mr-1" />}
                {healthStatus.status === "Needs Attention" && <AlertTriangle className="w-4 h-4 mr-1" />}
                {healthStatus.status}
              </div>
              <p className="text-sm text-slate-600 mt-1">{healthStatus.message}</p>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                      <div className={stat.color}>{stat.icon}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Last Assessment Summary */}
        {lastAssessment && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-blue-600" />
                  Latest Assessment Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xl font-bold">{lastAssessment.overallRisk}%</span>
                    </div>
                    <h3 className="font-semibold text-slate-900">Overall Risk</h3>
                    <Badge
                      className={
                        lastAssessment.riskLevel === "Low"
                          ? "bg-green-100 text-green-800"
                          : lastAssessment.riskLevel === "Medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }
                    >
                      {lastAssessment.riskLevel} Risk
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-600">Diabetes Risk</span>
                        <span className="font-medium">{lastAssessment.riskScores?.diabetes || 0}%</span>
                      </div>
                      <Progress value={lastAssessment.riskScores?.diabetes || 0} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-600">Heart Disease Risk</span>
                        <span className="font-medium">{lastAssessment.riskScores?.cvd || 0}%</span>
                      </div>
                      <Progress value={lastAssessment.riskScores?.cvd || 0} className="h-2" />
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-slate-600 mb-2">Assessment Date</p>
                    <p className="font-semibold text-slate-900">{new Date(lastAssessment.date).toLocaleDateString()}</p>
                    <Link href="/results">
                      <Button variant="outline" size="sm" className="mt-4 bg-transparent">
                        View Full Results
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {actionCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ y: -5 }}
            >
              <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm hover:shadow-xl transition-all h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${card.color} flex items-center justify-center text-white mb-4`}
                  >
                    {card.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{card.title}</h3>
                  <p className="text-slate-600 text-sm mb-4 flex-1">{card.description}</p>
                  <Link href={card.href}>
                    <Button className={`w-full bg-gradient-to-r ${card.color} hover:opacity-90 text-white`}>
                      {card.buttonText}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Health Tips */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <Card className="shadow-lg border-0 bg-gradient-to-r from-emerald-500 to-blue-600 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">💡 Daily Health Tips</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">🥗 Nutrition</h4>
                  <p className="text-emerald-100 text-sm">
                    Include more leafy greens and reduce processed foods in your Sri Lankan diet for better health.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">🏃‍♂️ Exercise</h4>
                  <p className="text-emerald-100 text-sm">
                    Aim for 30 minutes of walking daily. Even climbing stairs counts as exercise!
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">😴 Sleep</h4>
                  <p className="text-emerald-100 text-sm">
                    Get 7-9 hours of quality sleep each night to support your body's natural healing processes.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
