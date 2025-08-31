"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Heart, Droplets, ArrowRight, /* Download, */ Share, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
// import { generateHealthReport } from "@/lib/pdf-generator" // Commented out until backend is configured
import Link from "next/link"

// Risk Meter Component
const RiskMeter = ({
  score,
  level,
  type,
  icon: Icon,
  color,
}: {
  score: number
  level: string
  type: string
  icon: any
  color: string
}) => {
  const [animatedScore, setAnimatedScore] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score)
    }, 500)
    return () => clearTimeout(timer)
  }, [score])

  const strokeColor = score < 30 ? "#10b981" : score < 60 ? "#f59e0b" : "#ef4444"

  return (
    <div className="text-center">
      <div className="relative w-40 h-40 mx-auto mb-4">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle cx="50" cy="50" r="35" fill="none" stroke="#e5e7eb" strokeWidth="6" />
          {/* Progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="35"
            fill="none"
            stroke={strokeColor}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 35}`}
            initial={{ strokeDashoffset: 2 * Math.PI * 35 }}
            animate={{ strokeDashoffset: 2 * Math.PI * 35 * (1 - animatedScore / 100) }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Icon className={`w-6 h-6 mb-1 ${color}`} />
          <div className="text-2xl font-bold">{animatedScore.toFixed(1)}%</div>
          <div className="text-xs text-slate-600">{level} Risk</div>
        </div>
      </div>
      <h3 className="font-semibold text-slate-900">{type}</h3>
    </div>
  )
}

export default function ResultsPage() {
  const [assessment, setAssessment] = useState<any>(null)
  const { toast } = useToast()

  useEffect(() => {
    const assessmentData = localStorage.getItem("lastAssessment")
    if (assessmentData) {
      const parsedAssessment = JSON.parse(assessmentData)
      console.log("Parsed Assessment:", parsedAssessment) // Debug log to check data structure
      setAssessment(parsedAssessment)
    } else {
      console.log("No assessment data found in localStorage") // Debug log
    }
  }, [])

  // Commented out until backend is configured
  /*
  const generateReport = () => {
    if (!assessment) return

    try {
      const doc = generateHealthReport(assessment)
      doc.save(`health-assessment-report-${new Date().toISOString().split("T")[0]}.pdf`)

      toast({
        title: "Report Generated Successfully",
        description: "Your comprehensive health assessment report has been downloaded.",
      })
    } catch (error) {
      toast({
        title: "Error Generating Report",
        description: "There was an issue creating your PDF report. Please try again.",
        variant: "destructive",
      })
    }
  }
  */

  const shareResults = () => {
    if (navigator.share) {
      navigator.share({
        title: "My Health Assessment Results - HealthGuard Youth",
        text: `I completed a health assessment on HealthGuard Youth. My overall risk level is ${assessment?.riskLevels?.overall || 'Unknown'}.`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link Copied",
        description: "Assessment link copied to clipboard.",
      })
    }
  }

  const getRecommendations = () => {
    if (!assessment) return []

    const recommendations = []

    if (assessment.riskLevels?.overall === "High") {
      recommendations.push({
        title: "Urgent: Consult a Healthcare Professional",
        description:
          "Your risk assessment indicates high risk. Please schedule an appointment with your doctor immediately for comprehensive evaluation.",
        priority: "high",
        icon: "🏥",
      })
    }

    if (assessment.riskScores?.diabetes > 50) {
      recommendations.push({
        title: "Diabetes Prevention Program",
        description: "Consider joining a diabetes prevention program and monitor your blood sugar levels regularly.",
        priority: "high",
        icon: "🩺",
      })
    }

    if (assessment.riskScores?.cvd > 50) {
      recommendations.push({
        title: "Cardiovascular Health Check",
        description: "Schedule a cardiovascular screening including ECG and lipid profile tests.",
        priority: "high",
        icon: "❤️",
      })
    }

    if (assessment.data?.exercise_days < 3) {
      recommendations.push({
        title: "Increase Physical Activity",
        description: "Aim for at least 150 minutes of moderate exercise per week. Start with walking 30 minutes daily.",
        priority: "medium",
        icon: "🏃‍♂️",
      })
    }

    if (assessment.data?.smoking === "yes") {
      recommendations.push({
        title: "Quit Smoking Program",
        description:
          "Contact the National Authority on Tobacco and Alcohol (NATA) helpline: 1929 for smoking cessation support.",
        priority: "high",
        icon: "🚭",
      })
    }

    if (assessment.data?.sleep < 7) {
      recommendations.push({
        title: "Improve Sleep Quality",
        description: "Establish a regular sleep schedule and aim for 7-9 hours of quality sleep each night.",
        priority: "medium",
        icon: "😴",
      })
    }

    recommendations.push({
      title: "Regular Health Monitoring",
      description: "Monitor your blood pressure, weight, and blood sugar levels regularly. Keep a health diary.",
      priority: "low",
      icon: "📊",
    })

    recommendations.push({
      title: "Healthy Sri Lankan Diet",
      description:
        "Focus on traditional healthy foods like green leafy vegetables, fish, and limit processed foods and excessive rice consumption.",
      priority: "medium",
      icon: "🥗",
    })

    return recommendations
  }

  if (!assessment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">No Assessment Found</h2>
            <p className="text-slate-600 mb-6">Please complete an assessment first to view your results.</p>
            <Link href="/assessment">
              <Button className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white">
                Take Assessment
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const recommendations = getRecommendations()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4 text-slate-900">Your Health Assessment Results</h1>
            <p className="text-slate-600">Comprehensive analysis of your diabetes and cardiovascular disease risk</p>
            <p className="text-sm text-slate-500 mt-2">
              Assessment completed on{" "}
              {new Date(assessment.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }) || 'Unknown Date'}
            </p>
          </motion.div>

          {/* Risk Meters */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-xl text-slate-900">Risk Assessment Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-8 items-center">
                  {/* Diabetes Risk */}
                  <RiskMeter
                    score={assessment.riskScores?.diabetes || 0}
                    level={assessment.riskLevels?.diabetes || 'Unknown'}
                    type="Diabetes Risk"
                    icon={Droplets}
                    color="text-blue-600"
                  />

                  {/* Overall Risk */}
                  <div className="text-center">
                    <div className="w-48 h-48 mx-auto mb-4 relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full opacity-10"></div>
                      <div className="absolute inset-4 bg-white rounded-full shadow-lg flex flex-col items-center justify-center">
                        <div className="text-4xl font-bold text-slate-900 mb-2">{(assessment.riskScores?.overall || 0).toFixed(1)}%</div>
                        <Badge
                          variant={assessment.riskLevels?.overall === "Low" ? "default" : "destructive"}
                          className="text-sm px-3 py-1"
                        >
                          {assessment.riskLevels?.overall || 'Unknown'} Risk
                        </Badge>
                        <p className="text-xs text-slate-600 mt-2">Overall Risk</p>
                      </div>
                    </div>
                    <h3 className="font-semibold text-slate-900">Combined Assessment</h3>
                  </div>

                  {/* CVD Risk */}
                  <RiskMeter
                    score={assessment.riskScores?.cvd || 0}
                    level={assessment.riskLevels?.cvd || 'Unknown'}
                    type="Heart Disease Risk"
                    icon={Heart}
                    color="text-red-600"
                  />
                </div>

                <div className="text-center mt-8 p-4 bg-slate-50 rounded-lg">
                  <p className="text-slate-700">
                    {assessment.riskLevels?.overall === "Low"
                      ? "Excellent! Your risk level is low. Continue maintaining your healthy lifestyle."
                      : assessment.riskLevels?.overall === "Medium"
                        ? "Your risk level is moderate. Following our recommendations can help improve your health significantly."
                        : "Your risk level requires immediate attention. Please consult with a healthcare professional as soon as possible."}
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
            <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-slate-900">
                  <FileText className="w-5 h-5 mr-2 text-emerald-600" />
                  Personalized Health Recommendations
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
                        <div className="flex items-start space-x-3 flex-1">
                          <span className="text-2xl">{rec.icon}</span>
                          <div>
                            <h4 className="font-semibold mb-2 text-slate-900">{rec.title}</h4>
                            <p className="text-slate-700 text-sm">{rec.description}</p>
                          </div>
                        </div>
                        <Badge
                          variant={rec.priority === "high" ? "destructive" : "secondary"}
                          className="ml-4 shrink-0"
                        >
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
              <Button className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white px-6">
                <ArrowRight className="w-4 h-4 mr-2" />
                Go to Dashboard
              </Button>
            </Link>
            {/* Commented out until backend is configured
            <Button variant="outline" onClick={generateReport} className="px-6 bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Generate PDF Report
            </Button>
            */}
            <Button variant="outline" onClick={shareResults} className="px-6 bg-transparent">
              <Share className="w-4 h-4 mr-2" />
              Share Results
            </Button>
          </motion.div>

          {/* Next Steps */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
            <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-500 to-emerald-500 text-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">What's Next?</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">🔄 Regular Monitoring</h4>
                    <p className="text-blue-100 text-sm">
                      Take assessments every 3-6 months to track your progress and health improvements.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">👨‍⚕️ Professional Consultation</h4>
                    <p className="text-blue-100 text-sm">
                      Share these results with your healthcare provider for personalized medical advice.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">📱 Stay Connected</h4>
                    <p className="text-blue-100 text-sm">
                      Use our platform to track your health journey and access educational resources.
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