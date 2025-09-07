"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Calendar, TrendingUp, ArrowLeft, Eye, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { useUser } from "@/context/UserContext";
import { useToast } from "@/hooks/use-toast";

interface Assessment {
  _id: string;
  userId: string;
  date: string;
  riskScores: { diabetes: number; cvd: number; overall: number };
  riskLevels: { diabetes: string; cvd: string; overall: string };
  data: {
    age?: number;
    gender?: string;
    height?: number;
    weight?: number;
    exercise_days?: number;
    sleep?: number;
    diet?: string;
    smoking?: string;
    alcohol?: string;
    stress?: string;
    sedentary_hours?: number;
  };
}

export default function HistoryPage() {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, loading: userLoading, refreshUser } = useUser();
  const { toast } = useToast();
  const router = useRouter();
  const isFetching = useRef(false);

  const fetchAssessments = useCallback(async () => {
    if (isFetching.current || userLoading) {
      console.log("Fetch skipped: in progress or user loading");
      return;
    }
    if (!user?._id) {
      console.log("User not authenticated:", user);
      toast({
        title: "Error",
        description: "Please sign in to view your assessment history.",
        variant: "destructive",
      });
      router.push("/auth");
      return;
    }

    isFetching.current = true;
    try {
      console.log("Fetching assessments for user:", user._id);
      const { data } = await api.get(`/assessments/user/${user._id}`);
      if (!Array.isArray(data)) {
        console.error("Expected array of assessments, received:", data);
        throw new Error("Invalid response format from server");
      }
      if (data.length === 0) {
        console.log("No assessments found in API, checking localStorage");
        const assessmentData = localStorage.getItem("lastAssessment");
        if (assessmentData) {
          try {
            const parsedAssessment = JSON.parse(assessmentData);
            console.log("Parsed Assessment from localStorage:", parsedAssessment);
            if (parsedAssessment.userId === user._id) {
              setAssessments([parsedAssessment]);
            } else {
              console.warn("LocalStorage assessment does not match user:", user._id);
              throw new Error("No valid assessments found");
            }
          } catch (error) {
            console.error("Error parsing localStorage assessment:", error);
            throw new Error("Invalid localStorage assessment data");
          }
        } else {
          console.log("No assessment data found in localStorage");
          setAssessments([]);
        }
      } else {
        setAssessments(data); // Backend sorts by date
        console.log(`Fetched ${data.length} assessments for user: ${user._id}`);
      }
    } catch (err: any) {
      console.error("Error fetching assessments:", err);
      let errorMessage =
        err.response?.data?.error || "Failed to load assessment history.";
      if (err.response?.status === 401) {
        errorMessage = "Session expired. Please sign in again.";
        localStorage.removeItem("token");
        await refreshUser();
        router.push("/auth");
      } else if (err.response?.status === 404) {
        errorMessage = "Assessment endpoint not found.";
      } else if (err.message.includes("localStorage")) {
        errorMessage = "No valid assessment data found.";
      }
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      setAssessments([]);
    } finally {
      isFetching.current = false;
      setLoading(false);
    }
  }, [user, userLoading, toast, router, refreshUser]);

  useEffect(() => {
    if (!userLoading) {
      fetchAssessments();
    }
  }, [userLoading, fetchAssessments]);

  const getRiskColor = (level: string) => {
    switch (level) {
      case "Low":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "High":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading || userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <p className="text-gray-500 ml-2">Loading your assessment history...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
          <CardContent className="p-12 text-center">
            <h3 className="text-xl font-semibold mb-2">Authentication Required</h3>
            <p className="text-gray-600 mb-6">
              Please sign in to view your assessment history.
            </p>
            <Link href="/auth">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                Sign In
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* User Details Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold text-blue-600">
                      {user.name}'s Health Journey
                    </h2>
                    <p className="text-gray-600">{user.email}</p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={async () => {
                      await refreshUser();
                      toast({
                        title: "Refreshed",
                        description: "User data refreshed successfully.",
                      });
                    }}
                  >
                    Refresh Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="flex items-center justify-between mb-8">
            <Link
              href="/dashboard"
              className="flex items-center text-blue-600 hover:text-blue-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
            <Button
              variant="outline"
              onClick={() => {
                toast({
                  title: "Export",
                  description: "Export functionality coming soon!",
                });
              }}
            >
              <Download className="w-4 h-4 mr-2" />
              Export History
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold mb-4">Assessment History</h1>
            <p className="text-gray-600">
              Track your health journey and see how your risk profile changes over time
            </p>
          </motion.div>

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
              assessments.map((assessment, index) => {
                if (!assessment.riskScores || !assessment.riskLevels) {
                  console.warn("Invalid assessment data:", assessment);
                  return (
                    <motion.div
                      key={assessment._id || index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                        <CardContent className="p-6 text-center text-red-600">
                          <p>
                            Error: Invalid assessment data for{" "}
                            {new Date(assessment.date).toLocaleDateString()}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                }
                const overallScore = assessment.riskScores.overall || 0;
                const overallLevel = assessment.riskLevels.overall || "Unknown";
                const bmi =
                  assessment.data.height && assessment.data.weight
                    ? (
                        Number(assessment.data.weight) /
                        Math.pow(Number(assessment.data.height) / 100, 2)
                      ).toFixed(1)
                    : "N/A";
                return (
                  <motion.div
                    key={assessment._id || index}
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
                          <Badge className={getRiskColor(overallLevel)}>
                            {overallLevel} Risk
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-3 gap-6">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600 mb-2">
                              {overallScore.toFixed(1)}%
                            </div>
                            <p className="text-sm text-gray-600">Overall Risk Score</p>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">BMI:</span>
                              <span className="font-medium">{bmi}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Exercise:</span>
                              <span className="font-medium">
                                {assessment.data.exercise_days || 0} days/week
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Sleep:</span>
                              <span className="font-medium">
                                {assessment.data.sleep || 0} hours/night
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col space-y-2">
                            <Link href={`/results/${assessment._id}`}>
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </Button>
                            </Link>
                            {index === 0 && (
                              <Badge variant="secondary" className="text-center">
                                Latest
                              </Badge>
                            )}
                          </div>
                        </div>
                        {index > 0 && (
                          <div className="mt-4 pt-4 border-t">
                            <div className="flex items-center justify-center space-x-2">
                              <TrendingUp
                                className={`w-4 h-4 ${
                                  assessments[index - 1].riskScores.overall <
                                  assessment.riskScores.overall
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                              />
                              <span
                                className={`text-sm font-medium ${
                                  assessments[index - 1].riskScores.overall <
                                  assessment.riskScores.overall
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                              >
                                {assessments[index - 1].riskScores.overall <
                                assessment.riskScores.overall
                                  ? `Improved by ${Math.abs(
                                      assessment.riskScores.overall -
                                        assessments[index - 1].riskScores.overall
                                    ).toFixed(1)}%`
                                  : `Increased by ${Math.abs(
                                      assessments[index - 1].riskScores.overall -
                                        assessment.riskScores.overall
                                    ).toFixed(1)}%`}
                              </span>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })
            )}
          </div>
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
                    <Button variant="secondary" size="lg">Take New Assessment</Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}