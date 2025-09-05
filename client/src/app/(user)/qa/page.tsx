"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, ChevronDown, ChevronUp, HelpCircle, Heart, Droplets, Activity, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const qaData = [
  {
    id: 1,
    category: "Diabetes",
    question: "What are the early signs of Type 2 diabetes?",
    answer:
      "Early signs of Type 2 diabetes include increased thirst, frequent urination, unexplained weight loss, extreme fatigue, blurred vision, slow-healing cuts or bruises, and frequent infections. However, many people with Type 2 diabetes have no symptoms initially, which is why regular screening is important, especially if you have risk factors.",
    tags: ["symptoms", "early detection", "type 2 diabetes"],
  },
  {
    id: 2,
    category: "Diabetes",
    question: "Can young people get Type 2 diabetes?",
    answer:
      "Yes, Type 2 diabetes is increasingly common in young people, including teenagers and young adults. Risk factors include obesity, family history, sedentary lifestyle, and certain ethnic backgrounds. Sri Lankan youth may be at higher risk due to genetic factors and dietary patterns. The good news is that Type 2 diabetes is largely preventable through healthy lifestyle choices.",
    tags: ["youth", "risk factors", "prevention"],
  },
  {
    id: 3,
    category: "Heart Health",
    question: "How can I prevent heart disease in my 20s?",
    answer:
      "Prevention in your 20s is crucial and includes: maintaining a healthy weight, exercising regularly (at least 150 minutes of moderate activity per week), eating a balanced diet rich in fruits and vegetables, not smoking, limiting alcohol consumption, managing stress, getting adequate sleep (7-9 hours), and having regular health check-ups to monitor blood pressure and cholesterol levels.",
    tags: ["prevention", "lifestyle", "young adults"],
  },
  {
    id: 4,
    category: "Heart Health",
    question: "What is considered high blood pressure for young adults?",
    answer:
      "For adults, including young adults, blood pressure categories are: Normal (less than 120/80 mmHg), Elevated (120-129 systolic and less than 80 diastolic), Stage 1 High Blood Pressure (130-139 systolic or 80-89 diastolic), and Stage 2 High Blood Pressure (140/90 mmHg or higher). Young adults should have their blood pressure checked at least once every two years.",
    tags: ["blood pressure", "diagnosis", "monitoring"],
  },
  {
    id: 5,
    category: "Nutrition",
    question: "How can I maintain a healthy Sri Lankan diet?",
    answer:
      "A healthy Sri Lankan diet can include: brown rice instead of white rice, plenty of vegetables and leafy greens, fish and lean proteins, coconut in moderation, traditional spices (which have health benefits), fresh fruits, and limiting processed foods, sugary drinks, and excessive oil. Traditional foods like jackfruit, bitter gourd, and drumstick leaves are excellent choices.",
    tags: ["sri lankan diet", "traditional foods", "healthy eating"],
  },
  {
    id: 6,
    category: "Nutrition",
    question: "How much sugar is too much per day?",
    answer:
      "The American Heart Association recommends limiting added sugars to no more than 6 teaspoons (25 grams) per day for women and 9 teaspoons (36 grams) for men. This doesn't include natural sugars found in fruits and milk. Be aware that many processed foods and drinks contain hidden sugars. Reading nutrition labels is important.",
    tags: ["sugar intake", "daily limits", "nutrition labels"],
  },
  {
    id: 7,
    category: "Exercise",
    question: "How much exercise do I need to prevent diabetes and heart disease?",
    answer:
      "The recommended amount is at least 150 minutes of moderate-intensity aerobic activity per week (like brisk walking) or 75 minutes of vigorous activity (like running), plus muscle-strengthening activities at least 2 days per week. Even small amounts of physical activity are beneficial, and you can break it into shorter sessions throughout the day.",
    tags: ["exercise guidelines", "prevention", "physical activity"],
  },
  {
    id: 8,
    category: "Exercise",
    question: "What are good exercises for busy students?",
    answer:
      "Time-efficient exercises for students include: 10-minute morning workouts, taking stairs instead of elevators, walking or cycling to class, bodyweight exercises (push-ups, squats, planks) that can be done in dorm rooms, yoga or stretching during study breaks, and high-intensity interval training (HIIT) which can be effective in just 15-20 minutes.",
    tags: ["student life", "time management", "quick workouts"],
  },
  {
    id: 9,
    category: "Mental Health",
    question: "How does stress affect my risk for diabetes and heart disease?",
    answer:
      "Chronic stress can increase your risk for both diabetes and heart disease by: raising blood sugar levels, increasing blood pressure, promoting unhealthy behaviors (overeating, smoking, drinking), disrupting sleep, and causing inflammation in the body. Managing stress through relaxation techniques, exercise, adequate sleep, and social support is crucial for overall health.",
    tags: ["stress management", "chronic stress", "health impact"],
  },
  {
    id: 10,
    category: "Mental Health",
    question: "What are healthy ways to manage stress as a young adult?",
    answer:
      "Healthy stress management techniques include: regular exercise, deep breathing exercises, meditation or mindfulness practices, maintaining social connections, getting adequate sleep, time management and organization, engaging in hobbies you enjoy, limiting caffeine and alcohol, talking to friends, family, or a counselor, and setting realistic goals and expectations.",
    tags: ["stress relief", "coping strategies", "mental wellness"],
  },
  {
    id: 11,
    category: "Family History",
    question: "My family has a history of diabetes. What should I do?",
    answer:
      "Having a family history of diabetes increases your risk, but it doesn't mean you'll definitely develop it. Take proactive steps: maintain a healthy weight, exercise regularly, eat a balanced diet, get regular health screenings (including blood sugar tests), know the warning signs, consider genetic counseling if multiple family members are affected, and work with your healthcare provider to create a prevention plan.",
    tags: ["family history", "genetic risk", "prevention planning"],
  },
  {
    id: 12,
    category: "Testing",
    question: "How often should I get tested for diabetes and heart disease?",
    answer:
      "For diabetes: Adults should be screened every 3 years starting at age 35, or earlier if overweight with additional risk factors. For heart disease: Blood pressure should be checked at least every 2 years, cholesterol every 4-6 years starting at age 20 (more frequently if you have risk factors). Your healthcare provider may recommend more frequent testing based on your individual risk profile.",
    tags: ["screening", "testing frequency", "health monitoring"],
  },
]

const categories = [
  "All",
  "Diabetes",
  "Heart Health",
  "Nutrition",
  "Exercise",
  "Mental Health",
  "Family History",
  "Testing",
]

export default function QAPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [openItems, setOpenItems] = useState<number[]>([])

  const filteredQA = qaData.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleItem = (id: number) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Diabetes":
        return <Droplets className="w-4 h-4" />
      case "Heart Health":
        return <Heart className="w-4 h-4" />
      case "Exercise":
        return <Activity className="w-4 h-4" />
      case "Mental Health":
        return <Brain className="w-4 h-4" />
      default:
        return <HelpCircle className="w-4 h-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Diabetes":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Heart Health":
        return "bg-red-100 text-red-800 border-red-200"
      case "Nutrition":
        return "bg-green-100 text-green-800 border-green-200"
      case "Exercise":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "Mental Health":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Family History":
        return "bg-indigo-100 text-indigo-800 border-indigo-200"
      case "Testing":
        return "bg-pink-100 text-pink-800 border-pink-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Health Q&A</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Find answers to common questions about diabetes prevention, heart health, and wellness for Sri Lankan youth
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="Search questions, answers, or topics..."
                    className="pl-10 text-lg"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className={
                        selectedCategory === category
                          ? "bg-gradient-to-r from-emerald-600 to-blue-600 text-white"
                          : "bg-transparent"
                      }
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Q&A Items */}
        <div className="space-y-4">
          {filteredQA.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Collapsible open={openItems.includes(item.id)} onOpenChange={() => toggleItem(item.id)}>
                <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm hover:shadow-xl transition-all">
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-slate-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <div className="flex items-center space-x-2">
                            <Badge className={`${getCategoryColor(item.category)} flex items-center space-x-1`}>
                              {getCategoryIcon(item.category)}
                              <span>{item.category}</span>
                            </Badge>
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-left text-lg text-slate-900 leading-relaxed">
                              {item.question}
                            </CardTitle>
                          </div>
                        </div>
                        <div className="ml-4">
                          {openItems.includes(item.id) ? (
                            <ChevronUp className="w-5 h-5 text-slate-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-slate-400" />
                          )}
                        </div>
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent className="pt-0 pb-6">
                      <div className="pl-4 border-l-4 border-emerald-200">
                        <p className="text-slate-700 leading-relaxed mb-4">{item.answer}</p>
                        <div className="flex flex-wrap gap-2">
                          {item.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            </motion.div>
          ))}
        </div>

        {filteredQA.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <HelpCircle className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No Questions Found</h3>
            <p className="text-slate-600">Try adjusting your search terms or category filter.</p>
          </motion.div>
        )}

        {/* Ask a Question CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16"
        >
          <Card className="shadow-lg border-0 bg-gradient-to-r from-emerald-500 to-blue-600 text-white">
            <CardContent className="p-8 text-center">
              <HelpCircle className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Didn't Find Your Answer?</h3>
              <p className="text-emerald-100 mb-6">
                Our healthcare experts are here to help. Submit your question and get personalized advice.
              </p>
              <Button variant="secondary" className="bg-white text-emerald-600 hover:bg-emerald-50">
                Ask a Question
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
