"use client"

import type React from "react"
import { Toaster } from "@/components/ui/toaster"
import { UserProvider } from "@/context/UserContext"
import Header from "./layout/header"
import Footer from "./layout/footer"

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <UserProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </UserProvider>
      </body>
    </html>
  )
}
