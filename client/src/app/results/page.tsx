"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Heart, AlertTriangle, CheckCircle, ArrowRight, Download, Share } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// Risk Meter Component
const RiskMeter = ({ score, level }: { score: number; level: string }) => {
  const [animatedScore, setAnimatedScore] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score)
    }, 500)
    return () => clearTimeout(timer)
  }, [score])

  const getColor = () => {
    if (score < 30) return "from-green-400 to-green-600"
    if (score < 60) return "from-yellow-400 to-orange-500"
    return "from-red-400 to-red-600"
  }

  const getIcon = () => {
    if (score < 30) return <CheckCircle className="w-8 h-8 text-green-600" />
    if (score < 60) return <AlertTriangle className="w-8 h-8 text-orange-500" />
    return <AlertTriangle className="w-8 h-8 text-red-600" />
  }

  return (
    <div className="text-center">
      <div className="relative w-48 h-48 mx-auto mb-6">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="8" />
          {/* Progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 40}`}
            initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
            animate={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - animatedScore / 100) }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" className={`stop-color-${getColor().split("-")[1]}-400`} />
              <stop offset="100%" className={`stop-color-${getColor().split("-")[3]}-600`} />
            </linearGradient>
          </defs>
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {getIcon()}
          <div className="text-3xl font-bold mt-2">{animatedScore}%</div>
          <div className="text-sm text-gray-600">{level} Risk</div>
        </div>
      </div>
    </div>
  )
}

export default function ResultsPage() {
  const [assessment, setAssessment] = useState<any>(null)

  useEffect(() => {
    const assessmentData = localStorage.getItem("lastAssessment")
    if (assessmentData) {
      setAssessment(JSON.parse(assessmentData))
    }
  }, [])

  if (!assessment) {
    return <div>Loading...</div>
  }

  const getRecommendations = () => {
    const recommendations = []

    if (assessment.riskScore > 50) {
      recommendations.push({
        title: "Consult a Healthcare Professional",
        description: "Schedule an appointment with your doctor for a comprehensive health evaluation.",
        priority: "high",
      })
    }

    if (assessment.data.exercise < 3) {
      recommendations.push({
        title: "Increase Physical Activity",
        description: "Aim for at least 150 minutes of moderate exercise per week.",
        priority: "medium",
      })
    }

    if (assessment.data.sleep < 7) {
      recommendations.push({
        title: "Improve Sleep Habits",
        description: "Try to get 7-9 hours of quality sleep each night.",
        priority: "medium",
      })
    }

    if (assessment.data.smoking === "yes") {
      recommendations.push({
        title: "Quit Smoking",
        description: "Consider smoking cessation programs or nicotine replacement therapy.",
        priority: "high",
      })
    }

    recommendations.push({
      title: "Maintain a Balanced Diet",
      description: "Focus on whole foods, fruits, vegetables, and limit processed foods.",
      priority: "low",
    })

    recommendations.push({
      title: "Regular Health Monitoring",
      description: "Keep track of your blood pressure, weight, and other vital signs.",
      priority: "low",
    })

    return recommendations
  }

  const recommendations = getRecommendations()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Your Health Assessment Results</h1>
            <p className="text-gray-600">Based on your responses, here's your personalized health risk assessment</p>
          </motion.div>

          {/* Risk Score Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
              <CardContent className="p-8">
                <RiskMeter score={assessment.riskScore} level={assessment.riskLevel} />

                <div className="text-center mt-6">
                  <Badge
                    variant={assessment.riskLevel === "Low" ? "default" : "destructive"}
                    className="text-lg px-4 py-2"
                  >
                    {assessment.riskLevel} Risk Level
                  </Badge>

                  <p className="text-gray-600 mt-4 max-w-md mx-auto">
                    {assessment.riskLevel === "Low"
                      ? "Great news! Your risk level is low. Keep up the healthy habits!"
                      : assessment.riskLevel === "Medium"
                        ? "Your risk level is moderate. Following our recommendations can help improve your health."
                        : "Your risk level requires attention. Please consider consulting with a healthcare professional."}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recommendations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-red-500" />
                  Personalized Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendations.map((rec, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className={`p-4 rounded-lg border-l-4 ${
                        rec.priority === "high"
                          ? "border-red-500 bg-red-50"
                          : rec.priority === "medium"
                            ? "border-yellow-500 bg-yellow-50"
                            : "border-green-500 bg-green-50"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">{rec.title}</h4>
                          <p className="text-gray-600 text-sm">{rec.description}</p>
                        </div>
                        <Badge variant={rec.priority === "high" ? "destructive" : "secondary"} className="ml-4">
                          {rec.priority}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            <Link href="/dashboard">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                <ArrowRight className="w-4 h-4 mr-2" />
                Go to Dashboard
              </Button>
            </Link>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download Report
            </Button>
            <Button variant="outline">
              <Share className="w-4 h-4 mr-2" />
              Share Results
            </Button>
          </motion.div>

          {/* Next Steps */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
            <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">What's Next?</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Regular Monitoring</h4>
                    <p className="text-blue-100 text-sm">
                      Take assessments every 3-6 months to track your progress and health improvements.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Professional Consultation</h4>
                    <p className="text-blue-100 text-sm">
                      Share these results with your healthcare provider for personalized medical advice.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
