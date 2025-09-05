"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Users,
  TrendingUp,
  BarChart3,
  Shield,
  LogOut,
  Download,
  Filter,
  Search,
  Heart,
  Droplets,
  AlertTriangle,
  Activity,
  FileText,
  Calendar,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { useToast } from "@/hooks/use-toast"
// import { generateAdminReport } from "@/lib/pdf-generator"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAdmin } from "@/context/AdminContext"

const riskTrendData = [
  { month: "Jan", low: 45, medium: 30, high: 25 },
  { month: "Feb", low: 42, medium: 32, high: 26 },
  { month: "Mar", low: 40, medium: 35, high: 25 },
  { month: "Apr", low: 38, medium: 37, high: 25 },
  { month: "May", low: 35, medium: 40, high: 25 },
  { month: "Jun", low: 33, medium: 42, high: 25 },
]

const ageGroupData = [
  { age: "15-18", diabetes: 12, cardiovascular: 8, total: 20, male: 11, female: 9 },
  { age: "19-22", diabetes: 25, cardiovascular: 18, total: 43, male: 24, female: 19 },
  { age: "23-26", diabetes: 35, cardiovascular: 28, total: 63, male: 35, female: 28 },
  { age: "27-30", diabetes: 28, cardiovascular: 22, total: 50, male: 27, female: 23 },
]

const genderDistribution = [
  { name: "Male", value: 52, color: "#3b82f6" },
  { name: "Female", value: 48, color: "#ec4899" },
]

const usageStats = [
  { name: "Total Patients", value: 1247, change: "+12%", color: "#10b981", icon: Users },
  { name: "Assessments Today", value: 89, change: "+5%", color: "#3b82f6", icon: Activity },
  { name: "High Risk Cases", value: 156, change: "+8%", color: "#ef4444", icon: AlertTriangle },
  { name: "Reports Generated", value: 234, change: "+15%", color: "#8b5cf6", icon: FileText },
]

const recentAssessments = [
  {
    id: 1,
    name: "Kasun Perera",
    age: 24,
    gender: "Male",
    risk: "High",
    diabetesRisk: 78,
    cvdRisk: 65,
    date: "2024-01-15",
    location: "Colombo",
  },
  {
    id: 2,
    name: "Nimali Silva",
    age: 22,
    gender: "Female",
    risk: "Medium",
    diabetesRisk: 45,
    cvdRisk: 38,
    date: "2024-01-15",
    location: "Kandy",
  },
  {
    id: 3,
    name: "Tharindu Fernando",
    age: 26,
    gender: "Male",
    risk: "Low",
    diabetesRisk: 23,
    cvdRisk: 28,
    date: "2024-01-14",
    location: "Galle",
  },
  {
    id: 4,
    name: "Sachini Jayawardena",
    age: 21,
    gender: "Female",
    risk: "Medium",
    diabetesRisk: 52,
    cvdRisk: 41,
    date: "2024-01-14",
    location: "Negombo",
  },
  {
    id: 5,
    name: "Chamara Rathnayake",
    age: 28,
    gender: "Male",
    risk: "High",
    diabetesRisk: 71,
    cvdRisk: 69,
    date: "2024-01-13",
    location: "Matara",
  },
  {
    id: 6,
    name: "Priyanka Wickramasinghe",
    age: 25,
    gender: "Female",
    risk: "Medium",
    diabetesRisk: 48,
    cvdRisk: 35,
    date: "2024-01-13",
    location: "Colombo",
  },
]

export default function AdminDashboard() {
  const { admin, loading, logout } = useAdmin()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRisk, setFilterRisk] = useState("all")
  const [filterGender, setFilterGender] = useState("all")
  const router = useRouter()
  const { toast } = useToast()
if (loading) return <p>Loading...</p>
  const handleLogout = async () => {
  try {
    await logout(); // calls AdminContext logout
    toast({
      title: "Logged Out Successfully",
      description: "You have been safely logged out of the admin panel.",
    });
  } catch (err: any) {
    toast({
      title: "Logout Failed",
      description: err?.message || "Something went wrong",
      variant: "destructive",
    });
  }
};


  const exportData = () => {
    try {
      const doc = generateAdminReport({
        stats: usageStats,
        assessments: recentAssessments,
        trends: riskTrendData,
        ageGroups: ageGroupData,
      })
      doc.save(`healthguard-admin-report-${new Date().toISOString().split("T")[0]}.pdf`)

      toast({
        title: "Report Generated Successfully",
        description: "Administrative report has been downloaded.",
      })
    } catch (error) {
      toast({
        title: "Export Error",
        description: "There was an issue generating the report. Please try again.",
        variant: "destructive",
      })
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const filteredAssessments = recentAssessments.filter((assessment) => {
    const matchesSearch =
      assessment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assessment.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRisk = filterRisk === "all" || assessment.risk === filterRisk
    const matchesGender = filterGender === "all" || assessment.gender.toLowerCase() === filterGender
    return matchesSearch && matchesRisk && matchesGender
  })

  if (!admin) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">HealthGuard Administrative Dashboard</h1>
              <p className="text-slate-600">Healthcare Provider Management Portal</p>
              <p className="text-sm text-slate-500">Welcome back, {admin.name || "Administrator"}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/admin/articles">
              <Button variant="outline" size="sm">
                <FileText className="w-4 h-4 mr-2" />
                Manage Articles
              </Button>
            </Link>
            <Button variant="outline" size="sm" onClick={exportData}>
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {usageStats.map((stat, index) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">{stat.name}</p>
                      <p className="text-2xl font-bold text-slate-900">{stat.value.toLocaleString()}</p>
                      <p className="text-sm text-green-600 font-medium">{stat.change} from last month</p>
                    </div>
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${stat.color}20` }}
                    >
                      <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Risk Trends Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                  Patient Risk Level Trends Over Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    low: { label: "Low Risk", color: "#10b981" },
                    medium: { label: "Medium Risk", color: "#f59e0b" },
                    high: { label: "High Risk", color: "#ef4444" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={riskTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="low" stroke="#10b981" strokeWidth={3} />
                      <Line type="monotone" dataKey="medium" stroke="#f59e0b" strokeWidth={3} />
                      <Line type="monotone" dataKey="high" stroke="#ef4444" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Gender Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-purple-600" />
                  Patient Gender Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    male: { label: "Male", color: "#3b82f6" },
                    female: { label: "Female", color: "#ec4899" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={genderDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {genderDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
                <div className="flex justify-center space-x-4 mt-4">
                  {genderDistribution.map((item) => (
                    <div key={item.name} className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm text-slate-600">
                        {item.name}: {item.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Age Group Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-8"
        >
          <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-emerald-600" />
                Disease Risk Analysis by Age Group and Gender
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  diabetes: { label: "Diabetes Risk", color: "#3b82f6" },
                  cardiovascular: { label: "Cardiovascular Risk", color: "#ef4444" },
                  male: { label: "Male", color: "#8b5cf6" },
                  female: { label: "Female", color: "#ec4899" },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ageGroupData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="age" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="diabetes" fill="#3b82f6" name="Diabetes Risk" />
                    <Bar dataKey="cardiovascular" fill="#ef4444" name="Cardiovascular Risk" />
                    <Bar dataKey="male" fill="#8b5cf6" name="Male" />
                    <Bar dataKey="female" fill="#ec4899" name="Female" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Assessments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-emerald-600" />
                  Recent Patient Assessments
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      placeholder="Search patients..."
                      className="pl-10 w-64"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={filterRisk} onValueChange={setFilterRisk}>
                    <SelectTrigger className="w-32">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Risks</SelectItem>
                      <SelectItem value="High">High Risk</SelectItem>
                      <SelectItem value="Medium">Medium Risk</SelectItem>
                      <SelectItem value="Low">Low Risk</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterGender} onValueChange={setFilterGender}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Genders</SelectItem>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredAssessments.map((assessment, index) => (
                  <motion.div
                    key={assessment.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {assessment.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">{assessment.name}</h4>
                        <p className="text-sm text-slate-600">
                          {assessment.gender}, Age: {assessment.age} • {assessment.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <div className="flex items-center space-x-1 mb-1">
                          <Droplets className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-medium text-blue-600">{assessment.diabetesRisk}%</span>
                        </div>
                        <p className="text-xs text-slate-500">Diabetes</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center space-x-1 mb-1">
                          <Heart className="w-4 h-4 text-red-600" />
                          <span className="text-sm font-medium text-red-600">{assessment.cvdRisk}%</span>
                        </div>
                        <p className="text-xs text-slate-500">CVD</p>
                      </div>
                      <Badge className={getRiskColor(assessment.risk)}>
                        {assessment.risk === "High" && <AlertTriangle className="w-3 h-3 mr-1" />}
                        {assessment.risk} Risk
                      </Badge>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 text-sm text-slate-600">
                          <Calendar className="w-3 h-3" />
                          <span>{assessment.date}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
