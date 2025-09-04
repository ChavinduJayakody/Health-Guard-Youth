"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { User, Edit, Save, X, Trash2, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Link from "next/link"
import { useRouter } from "next/navigation"
import api from "@/lib/api"
import { useUser } from "@/context/UserContext"
import { Eye, EyeOff, Lock } from "lucide-react"

export default function ProfilePage() {
  const { user, refreshUser, logout } = useUser()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<any>({})
  const [showPassword, setShowPassword] = useState(false)
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const router = useRouter()

  useEffect(() => {
    if (user) setFormData(user)
  }, [user])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    try {
      await api.put(`/auth/userupdate/`, formData, { withCredentials: true })

      await refreshUser() 
      setIsEditing(false)
    } catch (err) {
      console.error("Failed to update profile:", err)
    }
  }

  const handleCancel = () => {
    setFormData(user)
    setIsEditing(false)
  }

    const handlePasswordChange = async () => {
  if (passwordData.newPassword !== passwordData.confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    // Only send required fields
    const payload = {
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword,
    };

    await api.put(`/auth/user/password`, passwordData, { withCredentials: true })


    alert("Password changed successfully!");
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
  } catch (err) {
    console.error("Failed to change password:", err.response?.data || err.message);
    alert(err.response?.data?.message || "Failed to change password");
  }
};


  const handleDeleteAccount = async () => {
    try {
      await api.delete(`/auth/user/delete`, { withCredentials: true })
      await logout()
      router.push("/")
    } catch (err) {
      console.error("Failed to delete account:", err)
    }
  }

  const calculateBMI = () => {
    if (formData?.height && formData?.weight) {
      const heightM = Number.parseFloat(formData.height) / 100
      const weightKg = Number.parseFloat(formData.weight)
      return (weightKg / (heightM * heightM)).toFixed(1)
    }
    return "N/A"
  }

  if (!user) return <div>Loading...</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Link href="/dashboard" className="flex items-center text-blue-600 hover:text-blue-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
            <div className="flex items-center space-x-2">
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)} variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex space-x-2">
                  <Button onClick={handleSave} size="sm">
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button onClick={handleCancel} variant="outline" size="sm">
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Profile Card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {["name", "email", "age", "gender", "height", "weight"].map((field) => (
                    <div className="space-y-2" key={field}>
                      <Label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                      {isEditing ? (
                        field === "gender" ? (
                          <Select
                            value={formData.gender || ""}
                            onValueChange={(value) => handleInputChange("gender", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <Input
                            id={field}
                            type={field === "email" ? "email" : "text"}
                            value={formData[field] || ""}
                            onChange={(e) => handleInputChange(field, e.target.value)}
                          />
                        )
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-md">{formData[field] || "Not provided"}</div>
                      )}
                    </div>
                  ))}
                </div>

                {/* BMI */}
                {formData.height && formData.weight && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">Body Mass Index (BMI)</h4>
                        <p className="text-sm text-gray-600">Based on your height and weight</p>
                      </div>
                      <div className="text-2xl font-bold text-blue-600">{calculateBMI()}</div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Change Password */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm mb-8">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lock className="w-5 h-5 text-blue-600" />
                  <span>Change Password</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {["currentPassword", "newPassword", "confirmPassword"].map((field, idx) => (
                  <div key={field}>
                    <Label htmlFor={field}>
                      {field === "currentPassword"
                        ? "Current Password"
                        : field === "newPassword"
                        ? "New Password"
                        : "Confirm Password"}
                    </Label>
                    <div className="relative">
                      <Input
                        id={field}
                        type={showPassword ? "text" : "password"}
                        value={(passwordData as any)[field]}
                        onChange={(e) => setPasswordData({ ...passwordData, [field]: e.target.value })}
                      />
                      <button
                        type="button"
                        className="absolute right-2 top-2 text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                ))}
                <Button onClick={handlePasswordChange} className="w-full">
                  Update Password
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Danger Zone */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-red-600">Danger Zone</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                  <h4 className="font-semibold text-red-800 mb-2">Delete Account</h4>
                  <p className="text-red-600 text-sm mb-4">
                    This action cannot be undone. This will permanently delete your account and remove all your data
                    from our servers.
                  </p>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Account
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your account and remove all your
                          data including assessment history.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteAccount} className="bg-red-600 hover:bg-red-700">
                          Delete Account
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
