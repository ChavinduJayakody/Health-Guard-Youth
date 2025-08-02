"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Shield, TrendingUp, ArrowRight, ChevronRight, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Link from "next/link"

export default function HomePage() {
  const [currentFeature, setCurrentFeature] = useState(0)

  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Early Detection",
      description: "Instant risk assessments for youth-specific health concerns.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Personalized Plans",
      description: "Smart suggestions tailored to your lifestyle and goals.",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Track & Grow",
      description: "Visualize progress and stay motivated with powerful dashboards.",
      color: "from-purple-500 to-indigo-500"
    },
  ]

  const stats = [
    { number: "12K+", label: "Youth Empowered" },
    { number: "96%", label: "Prediction Accuracy" },
    { number: "24/7", label: "Smart Assistant" },
    { number: "100%", label: "Data Privacy" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const nextFeature = () => {
    setCurrentFeature((prev) => (prev + 1) % features.length)
  }

  const prevFeature = () => {
    setCurrentFeature((prev) => (prev - 1 + features.length) % features.length)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50"></div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 py-32 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center justify-center p-5 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl shadow-lg mb-8"
            >
              <Heart className="w-10 h-10 text-white" />
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                HealthGuard Youth
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              Empowering Sri Lanka's youth with AI-powered early detection and personalized health insights.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-xl shadow-md hover:shadow-lg transition-all">
                  Get Started <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="px-8 py-6 text-lg rounded-xl border-gray-300 hover:bg-gray-50">
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Health, Our Priority</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive health monitoring designed specifically for Sri Lankan youth
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="hidden md:grid grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className={`h-full border-0 shadow-sm transition-all ${index === currentFeature ? 'ring-2 ring-blue-500' : ''}`}>
                    <CardContent className="p-8">
                      <div className={`inline-flex p-3 rounded-lg mb-4 bg-gradient-to-r ${feature.color} text-white`}>
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Mobile/Tablet Carousel */}
            <div className="md:hidden relative">
              <button 
                onClick={prevFeature}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-md hover:bg-gray-100"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
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
                    <Card className="border-0 shadow-sm mx-8">
                      <CardContent className="p-8">
                        <div className={`inline-flex p-3 rounded-lg mb-4 bg-gradient-to-r ${features[currentFeature].color} text-white`}>
                          {features[currentFeature].icon}
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-gray-900">{features[currentFeature].title}</h3>
                        <p className="text-gray-600 leading-relaxed">{features[currentFeature].description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </AnimatePresence>
              </div>

              <button 
                onClick={nextFeature}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-md hover:bg-gray-100"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>

              <div className="flex justify-center mt-6 gap-2">
                {features.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentFeature(index)}
                    className={`w-2 h-2 rounded-full ${index === currentFeature ? 'bg-blue-600' : 'bg-gray-300'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx} 
                whileHover={{ scale: 1.05 }}
                className="bg-white p-8 rounded-xl shadow-sm text-center"
              >
                <div className="text-4xl font-bold text-purple-700 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto bg-gradient-to-r from-blue-50 to-purple-50 p-12 rounded-2xl"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to take control of your health?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of Sri Lankan youth who are proactively managing their health with our platform.
            </p>
            <Link href="/auth">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-xl shadow-md">
                Get Started Today <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}