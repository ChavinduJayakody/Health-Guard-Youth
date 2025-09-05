"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Heart,
  Shield,
  TrendingUp,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Users,
  BarChart3,
  Clock,
  CheckCircle,
  Star,
  Quote,
  Activity,
  Brain,
  Smartphone,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function HomePage() {
  const [currentFeature, setCurrentFeature] = useState(0)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Early Detection",
      description: "AI-powered risk assessment specifically designed for Sri Lankan youth health patterns.",
      color: "from-emerald-500 to-teal-600",
      image: "/early-detection.png",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Personalized Care",
      description: "Culturally adapted health recommendations based on local dietary and lifestyle factors.",
      color: "from-rose-500 to-pink-500",
      image: "/personalized-care.png",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Progress Tracking",
      description: "Visual health journey tracking with comprehensive reports and trend analysis.",
      color: "from-blue-500 to-indigo-500",
      image: "/progress-tracking.png",
    },
  ]

  const stats = [
    { number: "15K+", label: "Sri Lankan Youth Served", icon: <Users className="w-5 h-5" /> },
    { number: "98%", label: "Accuracy Rate", icon: <BarChart3 className="w-5 h-5" /> },
    { number: "24/7", label: "Health Support", icon: <Clock className="w-5 h-5" /> },
    { number: "500+", label: "Healthcare Providers", icon: <Shield className="w-5 h-5" /> },
  ]

  const testimonials = [
    {
      name: "Kasun Perera",
      age: 24,
      location: "Colombo",
      text: "HealthGuard helped me identify my diabetes risk early. The personalized recommendations changed my lifestyle completely!",
      rating: 5,
      image: "/test1.png",
    },
    {
      name: "Nimali Silva",
      age: 22,
      location: "Kandy",
      text: "The assessment was so easy to complete, and the results were explained clearly. I feel more confident about my health now.",
      rating: 5,
      image: "/test2.png",
    },
    {
      name: "Tharindu Fernando",
      age: 26,
      location: "Galle",
      text: "As someone with a family history of heart disease, this platform gives me peace of mind with regular monitoring.",
      rating: 5,
      image: "/test3.png",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const nextFeature = () => {
    setCurrentFeature((prev) => (prev + 1) % features.length)
  }

  const prevFeature = () => {
    setCurrentFeature((prev) => (prev - 1 + features.length) % features.length)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50/50 via-white to-emerald-50/30">
        <div className="absolute inset-0">
          <img
            src="/modern-medical-technology-background-with-subtle-h.png"
            alt="Health technology background"
            className="w-full h-full object-cover opacity-5"
          />
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center justify-center p-4 bg-gradient-to-tr from-emerald-500 to-blue-600 rounded-2xl shadow-lg mb-8"
              >
                <Heart className="w-12 h-12 text-white" />
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                  HealthGuard
                </span>
                <br />
                <span className="text-slate-700">Sri Lanka Youth</span>
              </h1>

              <p className="text-xl text-slate-600 mb-10 leading-relaxed">
                Empowering Sri Lankan youth with AI-powered early detection for diabetes and cardiovascular diseases.
                Get personalized health insights tailored to local health patterns.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <Link href="/assessment">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
                  >
                    Start Health Assessment <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/articles">
                  <Button
                    variant="outline"
                    size="lg"
                    className="px-8 py-6 text-lg rounded-xl border-slate-300 hover:bg-slate-50 bg-transparent"
                  >
                    Learn About Health
                  </Button>
                </Link>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0">
                {stats.map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-slate-200"
                  >
                    <div className="flex items-center justify-center mb-2 text-emerald-600">{stat.icon}</div>
                    <div className="text-xl font-bold text-slate-900 mb-1">{stat.number}</div>
                    <div className="text-xs text-slate-600 font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right side - Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative"
            >
              <div className="relative">
                <img
                  src="/hero1.png"
                  alt="HealthGuard platform demonstration"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
                {/* Floating elements */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                  className="absolute -top-4 -right-4 bg-white p-4 rounded-xl shadow-lg"
                >
                  <Activity className="w-8 h-8 text-emerald-600" />
                </motion.div>
                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  className="absolute -bottom-4 -left-4 bg-white p-4 rounded-xl shadow-lg"
                >
                  <Brain className="w-8 h-8 text-blue-600" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Advanced Health Monitoring</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Comprehensive health assessment tools designed specifically for Sri Lankan youth health patterns
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto">
            <div className="hidden md:grid grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card
                    className={`h-full border-0 shadow-lg transition-all hover:shadow-xl ${
                      index === currentFeature ? "ring-2 ring-emerald-500" : ""
                    }`}
                  >
                    <CardContent className="p-8">
                      <div className="mb-6">
                        <img
                          src={feature.image || "/placeholder.svg"}
                          alt={feature.title}
                          className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                      </div>
                      <div className={`inline-flex p-4 rounded-xl mb-6 bg-gradient-to-r ${feature.color} text-white`}>
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-semibold mb-4 text-slate-900">{feature.title}</h3>
                      <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Mobile Carousel */}
            <div className="md:hidden relative">
              <button
                onClick={prevFeature}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white shadow-lg hover:bg-slate-50"
              >
                <ChevronLeft className="w-5 h-5 text-slate-600" />
              </button>

              <div className="overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentFeature}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="border-0 shadow-lg mx-8">
                      <CardContent className="p-8">
                        <img
                          src={features[currentFeature].image || "/placeholder.svg"}
                          alt={features[currentFeature].title}
                          className="w-full h-48 object-cover rounded-lg mb-6"
                        />
                        <div
                          className={`inline-flex p-4 rounded-xl mb-6 bg-gradient-to-r ${features[currentFeature].color} text-white`}
                        >
                          {features[currentFeature].icon}
                        </div>
                        <h3 className="text-xl font-semibold mb-4 text-slate-900">{features[currentFeature].title}</h3>
                        <p className="text-slate-600 leading-relaxed">{features[currentFeature].description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </AnimatePresence>
              </div>

              <button
                onClick={nextFeature}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white shadow-lg hover:bg-slate-50"
              >
                <ChevronRight className="w-5 h-5 text-slate-600" />
              </button>

              <div className="flex justify-center mt-6 gap-2">
                {features.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentFeature(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentFeature ? "bg-emerald-600" : "bg-slate-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">How HealthGuard Works</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Simple steps to take control of your health journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Complete Assessment",
                description: "Answer questions about your lifestyle, family history, and health habits",
                image: "/step1.png",
                icon: <Smartphone className="w-8 h-8" />,
              },
              {
                step: "02",
                title: "Get AI Analysis",
                description: "Our AI analyzes your data using Sri Lankan health patterns and risk factors",
                image: "/step2.png",
                icon: <Brain className="w-8 h-8" />,
              },
              {
                step: "03",
                title: "Receive Personalized Plan",
                description: "Get customized recommendations for diet, exercise, and lifestyle changes",
                image: "/step3.png",
                icon: <Heart className="w-8 h-8" />,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-48 object-cover rounded-xl shadow-lg"
                  />
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {item.step}
                  </div>
                </div>
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-xl text-white">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-900">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">What Our Users Say</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Real stories from Sri Lankan youth who transformed their health with HealthGuard
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
                  <CardContent className="p-8 text-center">
                    <Quote className="w-12 h-12 text-emerald-600 mx-auto mb-6" />
                    <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                      "{testimonials[currentTestimonial].text}"
                    </p>
                    <div className="flex items-center justify-center space-x-1 mb-4">
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <div className="flex items-center justify-center space-x-4">
                      <img
                        src={testimonials[currentTestimonial].image || "/placeholder.svg"}
                        alt={testimonials[currentTestimonial].name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="text-left">
                        <h4 className="font-semibold text-slate-900">{testimonials[currentTestimonial].name}</h4>
                        <p className="text-slate-600 text-sm">
                          Age {testimonials[currentTestimonial].age} • {testimonials[currentTestimonial].location}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center mt-6 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? "bg-emerald-600" : "bg-slate-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Health Conditions Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Early Detection Saves Lives</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Learn about the health conditions we help detect and prevent
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-blue-100 overflow-hidden">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2">
                  <div className="p-8">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                        <Activity className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900">Diabetes</h3>
                        <p className="text-blue-700">Type 2 Diabetes Prevention</p>
                      </div>
                    </div>
                    <p className="text-slate-700 mb-6">
                      Early detection of diabetes risk factors can prevent or delay the onset of Type 2 diabetes through
                      lifestyle modifications and proper medical care.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-sm text-slate-600">AI-powered risk assessment</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-sm text-slate-600">Personalized prevention plans</span>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <img
                      src="/diabetes.png"
                      alt="Diabetes prevention"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-gradient-to-br from-red-50 to-red-100 overflow-hidden">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2">
                  <div className="p-8">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                        <Heart className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900">Heart Disease</h3>
                        <p className="text-red-700">Cardiovascular Risk Assessment</p>
                      </div>
                    </div>
                    <p className="text-slate-700 mb-6">
                      Identify cardiovascular disease risk factors early to prevent heart attacks, strokes, and other
                      serious complications through proactive health management.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-sm text-slate-600">Comprehensive heart health screening</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-sm text-slate-600">Lifestyle intervention guidance</span>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <img src="/heart.png" alt="Heart health" className="w-full h-full object-cover" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto bg-white p-12 rounded-2xl shadow-xl"
          >
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Take Control of Your Health Today</h2>
            <p className="text-slate-600 mb-8 max-w-2xl mx-auto text-lg">
              Join thousands of Sri Lankan youth who are proactively managing their health with our AI-powered platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg"
                >
                  Start Free Assessment <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/articles">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-6 text-lg rounded-xl border-slate-300 hover:bg-slate-50 bg-transparent"
                >
                  Learn More About Health
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
