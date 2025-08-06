"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar, TrendingUp, ArrowLeft, Eye, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function HistoryPage() {
  const [assessments, setAssessments] = useState<any[]>([])

  useEffect(() => {
    // In a real app, this would fetch from an API
    const lastAssessment = localStorage.getItem("lastAssessment")
    if (lastAssessment) {
      // For demo purposes, create some mock historical data
      const assessment = JSON.parse(lastAssessment)
      const mockHistory = [
        assessment,
        {
          ...assessment,
          date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          riskScore: assessment.riskScore + 5,
          riskLevel: "Medium",
        },
        {
          ...assessment,
          date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
          riskScore: assessment.riskScore + 10,
          riskLevel: "Medium",
        },
      ]
      setAssessments(mockHistory)
    }
  }, [])

  const getRiskColor = (level: string) => {
    switch (level) {
      case "Low":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "High":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Link href="/dashboard" className="flex items-center text-blue-600 hover:text-blue-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export History
            </Button>
          </div>

          {/* Page Title */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Assessment History</h1>
            <p className="text-gray-600">Track your health journey and see how your risk profile changes over time</p>
          </motion.div>

          {/* History Cards */}
          <div className="space-y-6">
            {assessments.length === 0 ? (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                  <CardContent className="p-12 text-center">
                    <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No Assessments Yet</h3>
                    <p className="text-gray-600 mb-6">
                      You haven't completed any health assessments yet. Start your health journey today!
                    </p>
                    <Link href="/assessment">
                      <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                        Take Your First Assessment
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              assessments.map((assessment, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm hover:shadow-xl transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center">
                          <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                          {new Date(assessment.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </CardTitle>
                        <Badge className={getRiskColor(assessment.riskLevel)}>{assessment.riskLevel} Risk</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-6">
                        {/* Risk Score */}
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-600 mb-2">{assessment.riskScore}%</div>
                          <p className="text-sm text-gray-600">Risk Score</p>
                        </div>

                        {/* Key Metrics */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">BMI:</span>
                            <span className="font-medium">
                              {assessment.data.height && assessment.data.weight
                                ? (
                                    Number.parseFloat(assessment.data.weight) /
                                    Math.pow(Number.parseFloat(assessment.data.height) / 100, 2)
                                  ).toFixed(1)
                                : "N/A"}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Exercise:</span>
                            <span className="font-medium">{assessment.data.exercise || 0} days/week</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Sleep:</span>
                            <span className="font-medium">{assessment.data.sleep || 0} hours/night</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col space-y-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                          {index === 0 && (
                            <Badge variant="secondary" className="text-center">
                              Latest
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Trend Indicator */}
                      {index > 0 && (
                        <div className="mt-4 pt-4 border-t">
                          <div className="flex items-center justify-center space-x-2">
                            <TrendingUp
                              className={`w-4 h-4 ${
                                assessment.riskScore < assessments[index - 1].riskScore
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            />
                            <span
                              className={`text-sm font-medium ${
                                assessment.riskScore < assessments[index - 1].riskScore
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {assessment.riskScore < assessments[index - 1].riskScore
                                ? `Improved by ${assessments[index - 1].riskScore - assessment.riskScore}%`
                                : `Increased by ${assessment.riskScore - assessments[index - 1].riskScore}%`}
                            </span>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>

          {/* Take New Assessment */}
          {assessments.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-center"
            >
              <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Ready for Another Assessment?</h3>
                  <p className="text-blue-100 mb-4">
                    Regular assessments help track your progress and maintain optimal health
                  </p>
                  <Link href="/assessment">
                    <Button variant="secondary" size="lg">
                      Take New Assessment
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
