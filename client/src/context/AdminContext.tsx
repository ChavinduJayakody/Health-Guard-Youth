"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import api from "@/lib/api"
import { useRouter } from "next/navigation"

interface Admin {
  _id: string
  name: string
  email: string
  phone: string
}

interface AdminContextType {
  admin: Admin | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  refreshAdmin: () => Promise<void>
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [admin, setAdmin] = useState<Admin | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    refreshAdmin().finally(() => setLoading(false))
  }, [])

  const refreshAdmin = async () => {
    try {
      const { data } = await api.get("/admin/profile") 
      setAdmin(data)
    } catch (err) {
      setAdmin(null)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      await api.post("/admin/login", { email, password })
      await refreshAdmin()
      router.push("/admin/dashboard")
    } catch (err) {
      throw err
    }
  }

  const logout = async () => {
    try {
      await api.post("/admin/logout")
      setAdmin(null)
      router.push("/admin/login")
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <AdminContext.Provider value={{ admin, loading, login, logout, refreshAdmin }}>
      {children}
    </AdminContext.Provider>
  )
}

export const useAdmin = () => {
  const context = useContext(AdminContext)
  if (!context) throw new Error("useAdmin must be used within AdminProvider")
  return context
}
