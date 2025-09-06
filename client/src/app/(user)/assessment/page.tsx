// assessment/page.tsx (corrected)
"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Activity, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext"

interface FormData {
  [key: string]: any;
}

interface AssessmentStep {
  title: string;
  description: string;
  fields: string[];
}

interface SlideshowImage {
  src: string;
  alt: string;
  title: string;
  description: string;
}

const assessmentSteps: AssessmentStep[] = [
  {
    title: "Personal Information",
    description: "Let's start with basic details to personalize your assessment.",
    fields: ["name", "email", "age", "gender"],
  },
  {
    title: "Physical Measurements & Symptoms",
    description: "Provide measurements and any symptoms for a comprehensive risk assessment.",
    fields: ["height", "weight", "bloodPressure", "heartRate", "polydipsia", "polyuria", "fatigue", "family_history", "previous_heart_problems"],
  },
  {
    title: "Lifestyle Assessment",
    description: "Your daily habits play a crucial role in your health.",
    fields: ["smoking", "alcohol", "diet", "exercise_days", "sedentary_hours", "sleep", "stress"],
  },
];

const slideshowImages: SlideshowImage[] = [
  {
    src: "/early-detection.png",
    alt: "Young person using health assessment app",
    title: "Empower Your Health",
    description: "Take charge with a personalized health assessment",
  },
  {
    src: "/personalized-care.png",
    alt: "Healthy Sri Lankan traditional food",
    title: "Fuel Your Body",
    description: "Discover how nutrition impacts your wellness",
  },
  {
    src: "/progress-tracking.png",
    alt: "Health progress dashboard",
    title: "Track Your Journey",
    description: "Visualize your health progress with insights",
  },
  {
    src: "/diabetes.png",
    alt: "Diabetes prevention lifestyle",
    title: "Prevent Diabetes",
    description: "Early detection for a healthier future",
  },
  {
    src: "/heart.png",
    alt: "Heart health and exercise",
    title: "Heart Matters",
    description: "Protect your heart with proactive screening",
  },
];

export default function AssessmentPage() {
  const { user, loading } = useUser();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const router = useRouter();
  const { toast } = useToast();

  const progress = ((currentStep + 1) / assessmentSteps.length) * 100;

  useEffect(() => {
    if (!loading && !user) {
      toast({
        title: "Not Logged In",
        description: "Redirecting to login...",
        variant: "destructive",
      });
      router.push("/auth");
    } else if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
        age: user.age || prev.age,
        gender: user.gender || prev.gender,
      }));
      toast({
        title: "User Data Loaded",
        description: "Your profile details have been prefilled.",
      });
    }

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [user, loading, router, toast]);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateCurrentStep = (): boolean => {
    const currentFields = assessmentSteps[currentStep].fields;
    const requiredFields = ["name", "email", "age", "gender", "height", "weight", "bloodPressure", "heartRate", "diet", "exercise_days", "sedentary_hours", "sleep", "stress"];
    const stringFields = ["name", "email", "gender", "bloodPressure", "polydipsia", "polyuria", "fatigue", "family_history", "previous_heart_problems", "smoking", "alcohol", "diet"];
    const numericFields = ["age", "height", "weight", "heartRate", "exercise_days", "sedentary_hours", "sleep", "stress"];

    for (const field of currentFields) {
      if (requiredFields.includes(field)) {
        // Check for empty or invalid values
        if (formData[field] === undefined || formData[field] === null || formData[field] === "") {
          toast({
            title: "Missing Information",
            description: `Please fill in ${field} to proceed.`,
            variant: "destructive",
          });
          return false;
        }

        // String field validation
        if (stringFields.includes(field)) {
          const value = String(formData[field]);
          if (value.trim() === "") {
            toast({
              title: "Invalid Input",
              description: `Please provide a valid value for ${field}.`,
              variant: "destructive",
            });
            return false;
          }
          if (field === "bloodPressure") {
            const bpPattern = /^\d{2,3}\/\d{2,3}$/;
            if (!bpPattern.test(value)) {
              toast({
                title: "Invalid Blood Pressure",
                description: "Please enter blood pressure in the format '120/80'.",
                variant: "destructive",
              });
              return false;
            }
            const [systolic, diastolic] = value.split('/').map(Number);
            if (systolic < 50 || systolic > 250 || diastolic < 30 || diastolic > 150) {
              toast({
                title: "Invalid Blood Pressure",
                description: "Blood pressure values are out of realistic range.",
                variant: "destructive",
              });
              return false;
            }
          }
          if (field === "email") {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(value)) {
              toast({
                title: "Invalid Email",
                description: "Please enter a valid email address.",
                variant: "destructive",
              });
              return false;
            }
          }
        }

        // Numeric field validation
        if (numericFields.includes(field)) {
          const value = Number(formData[field]);
          if (isNaN(value) || value <= 0) {
            toast({
              title: "Invalid Input",
              description: `Please enter a positive number for ${field}.`,
              variant: "destructive",
            });
            return false;
          }
          // Range checks for specific fields
          if (field === "age" && (value < 18 || value > 120)) {
            toast({
              title: "Invalid Age",
              description: "Age must be between 18 and 120.",
              variant: "destructive",
            });
            return false;
          }
          if (field === "height" && (value < 100 || value > 250)) {
            toast({
              title: "Invalid Height",
              description: "Height must be between 100 and 250 cm.",
              variant: "destructive",
            });
            return false;
          }
          if (field === "weight" && (value < 30 || value > 300)) {
            toast({
              title: "Invalid Weight",
              description: "Weight must be between 30 and 300 kg.",
              variant: "destructive",
            });
            return false;
          }
          if (field === "heartRate" && (value < 30 || value > 200)) {
            toast({
              title: "Invalid Heart Rate",
              description: "Heart rate must be between 30 and 200 bpm.",
              variant: "destructive",
            });
            return false;
          }
          if (field === "exercise_days" && (value < 0 || value > 7)) {
            toast({
              title: "Invalid Exercise Days",
              description: "Exercise days must be between 0 and 7.",
              variant: "destructive",
            });
            return false;
          }
          if (field === "sedentary_hours" && (value < 0 || value > 24)) {
            toast({
              title: "Invalid Sedentary Hours",
              description: "Sedentary hours must be between 0 and 24.",
              variant: "destructive",
            });
            return false;
          }
          if (field === "sleep" && (value < 0 || value > 12)) {
            toast({
              title: "Invalid Sleep Hours",
              description: "Sleep hours must be between 0 and 12.",
              variant: "destructive",
            });
            return false;
          }
          if (field === "stress" && (value < 1 || value > 10)) {
            toast({
              title: "Invalid Stress Level",
              description: "Stress level must be between 1 and 10.",
              variant: "destructive",
            });
            return false;
          }
        }
      }
    }
    return true;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) return;
    if (currentStep < assessmentSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      toast({
        title: "Step Completed",
        description: `Progress saved for step ${currentStep + 1}.`,
      });
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
  try {
      // Validate all required fields before submission
      const requiredKeys = [
        "age",
        "gender",
        "height",
        "weight",
        "bloodPressure",
        "heartRate",
        "polydipsia",
        "polyuria",
        "fatigue",
        "family_history",
        "previous_heart_problems",
        "smoking",
        "alcohol",
        "diet",
        "exercise_days",
        "sedentary_hours",
        "sleep",
        "stress",
      ];

      for (const key of requiredKeys) {
        if (formData[key] === undefined || formData[key] === null || formData[key] === "") {
          throw new Error(`Missing required field: ${key}`);
        }
      }

      // Validate blood pressure format
    const [systolic, diastolic] = formData.bloodPressure.split("/").map(Number);
    if (isNaN(systolic) || isNaN(diastolic)) {
      throw new Error("Invalid blood pressure format. Please use '120/80' format.");
    }

    const payload = {
          age: Number(formData.age),
          gender: formData.gender, 
          height: Number(formData.height),
          weight: Number(formData.weight),
          bloodPressure: formData.bloodPressure, 
          heartRate: Number(formData.heartRate),
          polydipsia: formData.polydipsia, 
          polyuria: formData.polyuria,
          fatigue: formData.fatigue,
          family_history: formData.family_history,
          previous_heart_problems: formData.previous_heart_problems,
          smoking: formData.smoking,
          alcohol: formData.alcohol,
          diet: formData.diet,
          exercise_days: Number(formData.exercise_days),
          sedentary_hours: Number(formData.sedentary_hours),
          sleep: Number(formData.sleep),
          stress: Number(formData.stress),
        };

      console.log('Submitting payload:', JSON.stringify(payload, null, 2)); 

      const response = await fetch("http://localhost:5000/api/predict/both", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let errorMessage = `API error: ${response.statusText}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
          console.error('API error details:', errorData);
        } catch (e) {
          console.error('Failed to parse error response:', e);
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log('API response:', result); 

      const diabetesScore = (result.diabetes_risk || 0) * 100;
      const heartScore = (result.heart_risk || 0) * 100;
      const overallScore = (diabetesScore + heartScore) / 2;

      const getLevel = (score: number) => {
        if (score < 30) return "Low";
        if (score < 60) return "Medium";
        return "High";
      };

      const assessmentData = {
        riskScores: {
          diabetes: diabetesScore,
          cvd: heartScore,
          overall: overallScore,
        },
        riskLevels: {
          diabetes: getLevel(diabetesScore),
          cvd: getLevel(heartScore),
          overall: getLevel(overallScore),
        },
        data: formData,
        apiResult: result,
        date: new Date().toISOString(),
      };

      useEffect(() => {
        if (assessmentData) {
          localStorage.setItem("lastAssessment", JSON.stringify(assessmentData));
        }
      }, [assessmentData]);

      toast({
        title: "Assessment Complete!",
        description: (
          <div>
            <p>Your health assessment has been successfully processed.</p>
            <p className="mt-2">
              <strong>Diabetes Risk:</strong> {diabetesScore.toFixed(1)}% ({getLevel(diabetesScore)})
            </p>
            <p>
              <strong>Heart Disease Risk:</strong> {heartScore.toFixed(1)}% ({getLevel(heartScore)})
            </p>
            <p>
              <strong>Overall Risk:</strong> {overallScore.toFixed(1)}% ({getLevel(overallScore)})
            </p>
          </div>
        ),
      });
      router.push("/results");
    } catch (error) {
      const errorMessage = (error as Error).message || 'An unexpected error occurred';
      console.error('Submission error:', error);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideshowImages.length) % slideshowImages.length);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Personal Information
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name || ""}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email || ""}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age *</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  value={formData.age || ""}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender *</Label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
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
          </div>
        );
      case 1: // Physical Measurements & Symptoms
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="height" className="text-lg font-semibold text-slate-800">Height (cm) *</Label>
                <p className="text-sm text-slate-600">Used to calculate BMI.</p>
                <Input
                  id="height"
                  type="number"
                  placeholder="170"
                  value={formData.height || ""}
                  onChange={(e) => handleInputChange("height", e.target.value)}
                  className="text-lg border-2 border-slate-200 focus:border-indigo-500 rounded-lg transition-all"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight" className="text-lg font-semibold text-slate-800">Weight (kg) *</Label>
                <p className="text-sm text-slate-600">Used to calculate BMI.</p>
                <Input
                  id="weight"
                  type="number"
                  placeholder="65"
                  value={formData.weight || ""}
                  onChange={(e) => handleInputChange("weight", e.target.value)}
                  className="text-lg border-2 border-slate-200 focus:border-indigo-500 rounded-lg transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bloodPressure" className="text-lg font-semibold text-slate-800">Blood Pressure (e.g., 120/80) *</Label>
              <p className="text-sm text-slate-600">Enter your recent blood pressure reading.</p>
              <Input
                id="bloodPressure"
                placeholder="120/80"
                value={formData.bloodPressure || ""}
                onChange={(e) => handleInputChange("bloodPressure", e.target.value)}
                className="text-lg border-2 border-slate-200 focus:border-indigo-500 rounded-lg transition-all"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="heartRate" className="text-lg font-semibold text-slate-800">Resting Heart Rate (bpm) *</Label>
              <p className="text-sm text-slate-600">Your typical resting heart rate.</p>
              <Input
                id="heartRate"
                type="number"
                placeholder="72"
                value={formData.heartRate || ""}
                onChange={(e) => handleInputChange("heartRate", e.target.value)}
                className="text-lg border-2 border-slate-200 focus:border-indigo-500 rounded-lg transition-all"
              />
            </div>
            <div className="space-y-4">
              <Label className="text-lg font-semibold text-slate-800">Symptoms</Label>
              <p className="text-sm text-slate-600">Select any symptoms you’ve experienced recently.</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-slate-800">Excessive Thirst (Polydipsia)</Label>
                  <RadioGroup
                    value={formData.polydipsia || "no"}
                    onValueChange={(value) => handleInputChange("polydipsia", value)}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="polydipsia-yes" />
                      <Label htmlFor="polydipsia-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="polydipsia-no" />
                      <Label htmlFor="polydipsia-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-slate-800">Frequent Urination (Polyuria)</Label>
                  <RadioGroup
                    value={formData.polyuria || "no"}
                    onValueChange={(value) => handleInputChange("polyuria", value)}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="polyuria-yes" />
                      <Label htmlFor="polyuria-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="polyuria-no" />
                      <Label htmlFor="polyuria-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-slate-800">Unusual Fatigue</Label>
                  <RadioGroup
                    value={formData.fatigue || "no"}
                    onValueChange={(value) => handleInputChange("fatigue", value)}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="fatigue-yes" />
                      <Label htmlFor="fatigue-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="fatigue-no" />
                      <Label htmlFor="fatigue-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <Label className="text-lg font-semibold text-slate-800">Family History of Diabetes or Heart Disease</Label>
              <p className="text-sm text-slate-600">Do any close relatives have diabetes or heart disease?</p>
              <RadioGroup
                value={formData.family_history || "no"}
                onValueChange={(value) => handleInputChange("family_history", value)}
                className="flex space-x-6"
              >
                <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="family_history-yes" />
                  <Label htmlFor="family_history-yes">Yes</Label>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="family_history-no" />
                  <Label htmlFor="family_history-no">No</Label>
                </motion.div>
              </RadioGroup>
            </div>
            <div className="space-y-4">
              <Label className="text-lg font-semibold text-slate-800">Previous Heart Problems</Label>
              <p className="text-sm text-slate-600">Have you ever been diagnosed with heart-related issues?</p>
              <RadioGroup
                value={formData.previous_heart_problems || "no"}
                onValueChange={(value) => handleInputChange("previous_heart_problems", value)}
                className="flex space-x-6"
              >
                <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="previous_heart_problems-yes" />
                  <Label htmlFor="previous_heart_problems-yes">Yes</Label>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="previous_heart_problems-no" />
                  <Label htmlFor="previous_heart_problems-no">No</Label>
                </motion.div>
              </RadioGroup>
            </div>
            {formData.height && formData.weight && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-indigo-50 rounded-lg border border-indigo-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-indigo-900">Your BMI</p>
                    <p className="text-xs text-indigo-700">Body Mass Index</p>
                  </div>
                  <p className="text-2xl font-bold text-indigo-600">
                    {(parseFloat(formData.weight) / Math.pow(parseFloat(formData.height) / 100, 2)).toFixed(1)}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        );
      case 2: // Lifestyle Assessment
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label className="text-lg font-semibold text-slate-800">Do you smoke?</Label>
              <p className="text-sm text-slate-600">Smoking is a major risk factor for heart disease.</p>
              <RadioGroup
                value={formData.smoking || "no"}
                onValueChange={(value) => handleInputChange("smoking", value)}
                className="flex space-x-6"
              >
                <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="smoking-yes" />
                  <Label htmlFor="smoking-yes">Yes</Label>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="smoking-no" />
                  <Label htmlFor="smoking-no">No</Label>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2">
                  <RadioGroupItem value="former" id="smoking-former" />
                  <Label htmlFor="smoking-former">Former smoker</Label>
                </motion.div>
              </RadioGroup>
            </div>
            <div className="space-y-4">
              <Label className="text-lg font-semibold text-slate-800">Do you consume alcohol?</Label>
              <p className="text-sm text-slate-600">Alcohol consumption can affect heart health.</p>
              <RadioGroup
                value={formData.alcohol || "never"}
                onValueChange={(value) => handleInputChange("alcohol", value)}
                className="flex space-x-6"
              >
                <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2">
                  <RadioGroupItem value="never" id="alcohol-never" />
                  <Label htmlFor="alcohol-never">Never</Label>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2">
                  <RadioGroupItem value="occasionally" id="alcohol-occasionally" />
                  <Label htmlFor="alcohol-occasionally">Occasionally</Label>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2">
                  <RadioGroupItem value="regularly" id="alcohol-regularly" />
                  <Label htmlFor="alcohol-regularly">Regularly</Label>
                </motion.div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="diet" className="text-lg font-semibold text-slate-800">Diet Type *</Label>
              <p className="text-sm text-slate-600">Your diet plays a key role in diabetes and heart risk.</p>
              <Select value={formData.diet || ""} onValueChange={(value) => handleInputChange("diet", value)}>
                <SelectTrigger className="text-lg border-2 border-slate-200 focus:border-indigo-500 rounded-lg">
                  <SelectValue placeholder="Select diet type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="healthy">Healthy/Balanced</SelectItem>
                  <SelectItem value="vegetarian">Vegetarian</SelectItem>
                  <SelectItem value="traditional">Traditional Sri Lankan</SelectItem>
                  <SelectItem value="mixed">Mixed</SelectItem>
                  <SelectItem value="fast-food">Fast Food/Processed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="exercise_days" className="text-lg font-semibold text-slate-800">Exercise days per week *</Label>
              <p className="text-sm text-slate-600">How many days do you engage in physical activity?</p>
              <Input
                id="exercise_days"
                type="number"
                placeholder="3"
                min="0"
                max="7"
                value={formData.exercise_days || ""}
                onChange={(e) => handleInputChange("exercise_days", e.target.value)}
                className="text-lg border-2 border-slate-200 focus:border-indigo-500 rounded-lg transition-all"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sedentary_hours" className="text-lg font-semibold text-slate-800">Sedentary hours per day *</Label>
              <p className="text-sm text-slate-600">Hours spent sitting or lying down (excluding sleep).</p>
              <Input
                id="sedentary_hours"
                type="number"
                placeholder="6"
                min="0"
                max="24"
                value={formData.sedentary_hours || ""}
                onChange={(e) => handleInputChange("sedentary_hours", e.target.value)}
                className="text-lg border-2 border-slate-200 focus:border-indigo-500 rounded-lg transition-all"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sleep" className="text-lg font-semibold text-slate-800">Sleep hours per night *</Label>
              <p className="text-sm text-slate-600">Average hours of sleep per night.</p>
              <Input
                id="sleep"
                type="number"
                placeholder="7"
                min="0"
                max="12"
                value={formData.sleep || ""}
                onChange={(e) => handleInputChange("sleep", e.target.value)}
                className="text-lg border-2 border-slate-200 focus:border-indigo-500 rounded-lg transition-all"
              />
            </div>
            <div className="space-y-4">
              <Label className="text-lg font-semibold text-slate-800">Stress Level (1-10) *</Label>
              <p className="text-sm text-slate-600">Rate your average stress level.</p>
              <div className="px-4">
                <Slider
                  value={[formData.stress || 5]}
                  onValueChange={(value) => handleInputChange("stress", value[0])}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-slate-500 mt-2">
                  <span>Low (1)</span>
                  <span className="font-medium">Current: {formData.stress || 5}</span>
                  <span>High (10)</span>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (isSubmitting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-teal-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-r from-indigo-600 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
              <Activity className="w-16 h-16 text-white" />
            </motion.div>
          </div>
          <h2 className="text-3xl font-bold mb-4 text-slate-900">Processing Your Health Profile</h2>
          <p className="text-lg text-slate-600 mb-6">We're analyzing your data for personalized insights...</p>
          <div className="w-96 mx-auto">
            <Progress value={66} className="h-4 bg-indigo-100" />
          </div>
          <p className="text-sm text-slate-500 mt-4">This will take just a moment</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-teal-50 font-sans">
      <header className="bg-gradient-to-r from-indigo-600 to-teal-500 text-white py-6 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Your Health Assessment</h1>
          <p className="text-lg mt-2">Take the first step towards a healthier you</p>
          <div className="mt-4 flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center text-white hover:text-indigo-100 transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Link>
            <div className="text-sm bg-white text-indigo-600 px-4 py-2 rounded-full shadow-md">
              Step {currentStep + 1} of {assessmentSteps.length}
            </div>
          </div>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-2 gap-8 relative">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 z-10"
          >
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between text-sm text-slate-600 mb-3">
                <span className="font-semibold">Your Progress</span>
                <span className="font-bold text-indigo-600">{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-3 bg-indigo-100" />
            </div>
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-md rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-indigo-500 to-teal-400 text-white p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">{currentStep + 1}</span>
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{assessmentSteps[currentStep].title}</CardTitle>
                    <p className="text-sm mt-1 opacity-90">{assessmentSteps[currentStep].description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {renderStepContent()}
                <div className="flex justify-between pt-6 border-t border-slate-200">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 0}
                    className="px-6 py-2 text-indigo-600 border-indigo-300 hover:bg-indigo-50 transition-all rounded-lg"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Previous
                  </Button>
                  <Button
                    onClick={handleNext}
                    className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-teal-500 hover:from-indigo-600 hover:to-teal-600 text-white rounded-lg transition-all"
                  >
                    {currentStep === assessmentSteps.length - 1 ? "Complete Assessment" : "Next Step"}
                    {currentStep !== assessmentSteps.length - 1 && <ArrowRight className="w-5 h-5 ml-2" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:sticky lg:top-24 h-fit z-0"
          >
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-md rounded-2xl overflow-hidden">
              <div className="relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6 }}
                    className="relative"
                  >
                    <img
                      src={slideshowImages[currentSlide].src || "/placeholder.svg"}
                      alt={slideshowImages[currentSlide].alt}
                      className="w-full h-96 object-cover rounded-t-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">{slideshowImages[currentSlide].title}</h3>
                      <p className="text-base opacity-90 mb-4">{slideshowImages[currentSlide].description}</p>
                      <Button
                        onClick={() => setCurrentSlide((prev) => (prev + 1) % slideshowImages.length)}
                        className="bg-white text-indigo-600 hover:bg-indigo-100 transition-all"
                      >
                        Explore More
                      </Button>
                    </div>
                  </motion.div>
                </AnimatePresence>
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/50 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/50 transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-3">
                  {slideshowImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentSlide ? "bg-white scale-125" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <CardContent className="p-6">
                <h4 className="font-semibold text-xl text-slate-900 mb-4">Health Insights</h4>
                <div className="space-y-4">
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start space-x-3">
                    <div className="w-3 h-3 bg-indigo-500 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-base text-slate-600">Regular assessments help you stay ahead of health risks</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start space-x-3">
                    <div className="w-3 h-3 bg-teal-500 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-base text-slate-600">Honest answers ensure accurate results</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start space-x-3">
                    <div className="w-3 h-3 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-base text-slate-600">Consult a doctor for personalized medical advice</p>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}