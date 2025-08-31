"use client"

import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function Footer() {
  const { toast } = useToast()

  const handleNewsletterSignup = () => {
    toast({
      title: "Newsletter Subscription",
      description: "Thank you for subscribing to our health newsletter!",
    })
  }

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">HealthGuard</h3>
                <p className="text-sm text-slate-400">Youth Health Platform</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm">
              Empowering Sri Lankan youth with AI-powered early detection for diabetes and cardiovascular diseases.
            </p>
            <div className="flex space-x-4">
              <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                <Linkedin className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/assessment" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Health Assessment
                </Link>
              </li>
              <li>
                <Link href="/articles" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Health Articles
                </Link>
              </li>
              <li>
                <Link href="/qa" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Q&A Section
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-400 hover:text-white transition-colors text-sm">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Healthcare Providers */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Healthcare Providers</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/admin/login" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Provider Login
                </Link>
              </li>
              <li>
                <Link href="/admin/register" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Provider Registration
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Clinical Resources
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Technical Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Stay Connected</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-slate-400">
                <Mail className="w-4 h-4" />
                <span>info@healthguard.lk</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-400">
                <Phone className="w-4 h-4" />
                <span>+94 11 234 5678</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-400">
                <MapPin className="w-4 h-4" />
                <span>Colombo, Sri Lanka</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-red-400">
                <Phone className="w-4 h-4" />
                <span>Emergency SuwaSariya: 1990</span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-slate-400">Subscribe to our newsletter</p>
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter your email"
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
                />
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
                  onClick={handleNewsletterSignup}
                >
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">© 2024 HealthGuard Youth. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-slate-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-slate-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-slate-400 hover:text-white text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
