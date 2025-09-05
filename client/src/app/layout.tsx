import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "HealthGuard Youth - AI-Powered Health Assessment Platform",
  description: "Early detection and prevention of diabetes and cardiovascular diseases for Sri Lankan youth"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          
          <div className="min-h-screen flex flex-col">
            
            
            <main className="flex-1">{children}</main>
            
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
