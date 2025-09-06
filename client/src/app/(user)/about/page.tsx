"use client"

import { motion } from "framer-motion"
import { Heart, Shield, Brain, Users, Activity, Globe2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 to-blue-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-bold text-slate-900 mb-6"
          >
            About <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">HealthGuard</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-3xl mx-auto text-lg text-slate-600 leading-relaxed"
          >
            HealthGuard is a next-generation AI-powered health platform built for Sri Lankan youth. 
            Our mission is to empower young people with early detection of diabetes and cardiovascular 
            risks, while promoting healthier lifestyles tailored to local cultural and dietary habits.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 max-w-5xl">
          <Card className="shadow-lg border-0">
            <CardContent className="p-8 text-center">
              <Shield className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h2>
              <p className="text-slate-600 leading-relaxed">
                To provide accessible, AI-powered preventive healthcare solutions 
                that help Sri Lankan youth take control of their health early, 
                reducing the long-term impact of chronic diseases.
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-0">
            <CardContent className="p-8 text-center">
              <Brain className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h2>
              <p className="text-slate-600 leading-relaxed">
                A healthier Sri Lanka where youth are empowered with knowledge, 
                technology, and personalized care to prevent diabetes and heart 
                diseases before they start.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-12">Why Choose HealthGuard?</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { icon: <Activity className="w-10 h-10 text-emerald-600" />, title: "AI-Powered Detection", text: "Cutting-edge analysis trained on Sri Lankan youth health data." },
              { icon: <Users className="w-10 h-10 text-blue-600" />, title: "Youth-Centered", text: "Focused on empowering the next generation with healthy lifestyles." },
              { icon: <Globe2 className="w-10 h-10 text-indigo-600" />, title: "Culturally Adapted", text: "Personalized insights based on local diets, habits, and patterns." },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="shadow-md border-0 hover:shadow-xl transition-all">
                  <CardContent className="p-8 text-center">
                    <div className="flex justify-center mb-4">{item.icon}</div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-3">{item.title}</h3>
                    <p className="text-slate-600">{item.text}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { name: " Anjana Perera", role: "Medical Advisor", img: "/team2.jpg" },
              { name: "Kasun Jayasuriya", role: "AI Engineer", img: "/team1.jpg" },
              { name: "Ishan Silva", role: "Public Health Specialist", img: "/team3.jpg" },
            ].map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="shadow-md border-0">
                  <CardContent className="p-6 flex flex-col items-center">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-28 h-28 rounded-full object-cover mb-4 shadow-lg"
                    />
                    <h3 className="text-lg font-semibold text-slate-900">{member.name}</h3>
                    <p className="text-sm text-slate-600">{member.role}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto bg-white p-12 rounded-2xl shadow-xl"
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Join the Movement</h2>
            <p className="text-slate-600 mb-8">
              Be part of Sri Lanka’s first youth-focused AI health platform. 
              Start your free assessment today.
            </p>
            <Link href="/assessment">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl"
              >
                Start Assessment
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
