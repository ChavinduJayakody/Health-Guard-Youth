"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { useRouter } from "next/navigation"

const assessmentSteps = [
  {
    title: "Basic Information",
    fields: ["age", "gender"],
  },
  {
    title: "Physical Measurements",
    fields: ["height", "weight", "waist", "bloodPressure", "heartRate"],
  },
  {
    title: "Symptoms Check",
    fields: [
      "thirst",
      "urination",
      "weightLoss",
      "tiredness",
      "hunger",
      "vision",
      "itching",
      "mood",
      "healing",
      "numbness",
      "cramps",
      "hairLoss",
      "infections",
    ],
  },
  {
    title: "Lifestyle Factors",
    fields: ["smoking", "alcohol", "diet", "exercise", "sitting", "sleep"],
  },
  {
    title: "Medical History",
    fields: ["diabetes", "familyHistory", "heartProblems", "medication", "stress"],
  },
]

export default function AssessmentPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<any>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const progress = ((currentStep + 1) / assessmentSteps.length) * 100

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < assessmentSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Calculate risk score (simplified algorithm)
    const riskScore = calculateRiskScore(formData)
    const riskLevel = riskScore < 30 ? "Low" : riskScore < 60 ? "Medium" : "High"

    const assessment = {
      date: new Date().toISOString(),
      riskScore,
      riskLevel,
      data: formData,
    }

    localStorage.setItem("lastAssessment", JSON.stringify(assessment))
    router.push("/results")
  }

  const calculateRiskScore = (data: any) => {
    let score = 0

    // Age factor
    if (data.age > 25) score += 10
    if (data.age > 30) score += 10

    // BMI factor
    if (data.height && data.weight) {
      const bmi = Number.parseFloat(data.weight) / Math.pow(Number.parseFloat(data.height) / 100, 2)
      if (bmi > 25) score += 15
      if (bmi > 30) score += 25
    }

    // Symptoms
    const symptoms = ["thirst", "urination", "weightLoss", "tiredness", "vision"]
    symptoms.forEach((symptom) => {
      if (data[symptom] === "yes") score += 8
    })

    // Lifestyle factors
    if (data.smoking === "yes") score += 20
    if (data.exercise < 2) score += 15
    if (data.sleep < 6) score += 10

    // Medical history
    if (data.diabetes === "yes") score += 30
    if (data.familyHistory === "yes") score += 15
    if (data.heartProblems === "yes") score += 25

    return Math.min(score, 100)
  }

  const renderStepContent = () => {
    const step = assessmentSteps[currentStep]

    switch (currentStep) {
      case 0: // Basic Information
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                placeholder="Enter your age"
                value={formData.age || ""}
                onChange={(e) => handleInputChange("age", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select value={formData.gender || ""} onValueChange={(value) => handleInputChange("gender", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case 1: // Physical Measurements
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="170"
                  value={formData.height || ""}
                  onChange={(e) => handleInputChange("height", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="65"
                  value={formData.weight || ""}
                  onChange={(e) => handleInputChange("weight", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="waist">Waist Circumference (cm)</Label>
              <Input
                id="waist"
                type="number"
                placeholder="85"
                value={formData.waist || ""}
                onChange={(e) => handleInputChange("waist", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bloodPressure">Blood Pressure (e.g., 120/80)</Label>
              <Input
                id="bloodPressure"
                placeholder="120/80"
                value={formData.bloodPressure || ""}
                onChange={(e) => handleInputChange("bloodPressure", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="heartRate">Heart Rate (bpm)</Label>
              <Input
                id="heartRate"
                type="number"
                placeholder="72"
                value={formData.heartRate || ""}
                onChange={(e) => handleInputChange("heartRate", e.target.value)}
              />
            </div>

            {formData.height && formData.weight && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">Your BMI</p>
                <p className="text-2xl font-bold text-blue-600">
                  {(Number.parseFloat(formData.weight) / Math.pow(Number.parseFloat(formData.height) / 100, 2)).toFixed(
                    1,
                  )}
                </p>
              </div>
            )}
          </div>
        )

      case 2: // Symptoms
        const symptoms = [
          { key: "thirst", label: "Excessive thirst" },
          { key: "urination", label: "Frequent urination" },
          { key: "weightLoss", label: "Unexplained weight loss" },
          { key: "tiredness", label: "Extreme tiredness" },
          { key: "hunger", label: "Increased hunger" },
          { key: "vision", label: "Blurred vision" },
          { key: "itching", label: "Skin itching" },
          { key: "mood", label: "Mood changes" },
          { key: "healing", label: "Slow wound healing" },
          { key: "numbness", label: "Numbness in hands/feet" },
          { key: "cramps", label: "Muscle cramps" },
          { key: "hairLoss", label: "Hair loss" },
          { key: "infections", label: "Frequent infections" },
        ]

        return (
          <div className="space-y-4">
            <p className="text-gray-600 mb-6">Have you experienced any of these symptoms recently?</p>
            {symptoms.map((symptom) => (
              <div key={symptom.key} className="flex items-center justify-between p-4 border rounded-lg">
                <Label htmlFor={symptom.key} className="flex-1">
                  {symptom.label}
                </Label>
                <RadioGroup
                  value={formData[symptom.key] || ""}
                  onValueChange={(value) => handleInputChange(symptom.key, value)}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id={`${symptom.key}-yes`} />
                    <Label htmlFor={`${symptom.key}-yes`}>Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id={`${symptom.key}-no`} />
                    <Label htmlFor={`${symptom.key}-no`}>No</Label>
                  </div>
                </RadioGroup>
              </div>
            ))}
          </div>
        )

      case 3: // Lifestyle
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label>Do you smoke?</Label>
              <RadioGroup
                value={formData.smoking || ""}
                onValueChange={(value) => handleInputChange("smoking", value)}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="smoking-yes" />
                  <Label htmlFor="smoking-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="smoking-no" />
                  <Label htmlFor="smoking-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <Label>Do you consume alcohol?</Label>
              <RadioGroup
                value={formData.alcohol || ""}
                onValueChange={(value) => handleInputChange("alcohol", value)}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="alcohol-yes" />
                  <Label htmlFor="alcohol-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="alcohol-no" />
                  <Label htmlFor="alcohol-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="diet">Diet Type</Label>
              <Select value={formData.diet || ""} onValueChange={(value) => handleInputChange("diet", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select diet type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="healthy">Healthy/Balanced</SelectItem>
                  <SelectItem value="fast-food">Fast Food/Processed</SelectItem>
                  <SelectItem value="vegetarian">Vegetarian</SelectItem>
                  <SelectItem value="mixed">Mixed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="exercise">Exercise (days per week)</Label>
              <Input
                id="exercise"
                type="number"
                placeholder="3"
                value={formData.exercise || ""}
                onChange={(e) => handleInputChange("exercise", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sitting">Sitting hours per day</Label>
              <Input
                id="sitting"
                type="number"
                placeholder="6"
                value={formData.sitting || ""}
                onChange={(e) => handleInputChange("sitting", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sleep">Sleep hours per night</Label>
              <Input
                id="sleep"
                type="number"
                placeholder="7"
                value={formData.sleep || ""}
                onChange={(e) => handleInputChange("sleep", e.target.value)}
              />
            </div>
          </div>
        )

      case 4: // Medical History
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label>Do you have diabetes?</Label>
              <RadioGroup
                value={formData.diabetes || ""}
                onValueChange={(value) => handleInputChange("diabetes", value)}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="diabetes-yes" />
                  <Label htmlFor="diabetes-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="diabetes-no" />
                  <Label htmlFor="diabetes-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <Label>Family history of diabetes or heart disease?</Label>
              <RadioGroup
                value={formData.familyHistory || ""}
                onValueChange={(value) => handleInputChange("familyHistory", value)}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="family-yes" />
                  <Label htmlFor="family-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="family-no" />
                  <Label htmlFor="family-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <Label>Any heart problems?</Label>
              <RadioGroup
                value={formData.heartProblems || ""}
                onValueChange={(value) => handleInputChange("heartProblems", value)}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="heart-yes" />
                  <Label htmlFor="heart-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="heart-no" />
                  <Label htmlFor="heart-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <Label>Currently taking any medication?</Label>
              <RadioGroup
                value={formData.medication || ""}
                onValueChange={(value) => handleInputChange("medication", value)}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="medication-yes" />
                  <Label htmlFor="medication-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="medication-no" />
                  <Label htmlFor="medication-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <Label>Stress Level</Label>
              <div className="px-4">
                <Slider
                  value={[formData.stress || 50]}
                  onValueChange={(value) => handleInputChange("stress", value[0])}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>Low</span>
                  <span>Medium</span>
                  <span>High</span>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (isSubmitting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Activity className="w-10 h-10 text-white" />
            </motion.div>
          </div>
          <h2 className="text-2xl font-bold mb-4">Analyzing Your Health Data</h2>
          <p className="text-gray-600 mb-6">Please wait while we calculate your risk assessment...</p>
          <div className="w-64 mx-auto">
            <Progress value={66} className="h-2" />
          </div>
        </motion.div>
      </div>
    )
  }

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
            <div className="text-sm text-gray-600">
              Step {currentStep + 1} of {assessmentSteps.length}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Assessment Card */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-sm font-bold">{currentStep + 1}</span>
                  </div>
                  {assessmentSteps[currentStep].title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {renderStepContent()}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6">
                  <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>

                  <Button
                    onClick={handleNext}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                  >
                    {currentStep === assessmentSteps.length - 1 ? "Complete Assessment" : "Next"}
                    {currentStep !== assessmentSteps.length - 1 && <ArrowRight className="w-4 h-4 ml-2" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
