"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import api from "@/lib/api"
import { useRouter } from "next/navigation"

interface User {
  _id: string
  name: string
  email: string
  age: number
  gender: string
  height: number
  weight: number
}

interface UserContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    refreshUser().finally(() => setLoading(false))
  }, [])

  const refreshUser = async () => {
    try {
      const { data } = await api.get("/auth/user")
      setUser(data)
    } catch (err) {
      setUser(null)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      await api.post("/auth/signin", { email, password })
      await refreshUser()
      router.push("/dashboard")
    } catch (err) {
      throw err
    }
  }

  const logout = async () => {
    try {
      await api.post("/auth/logout")
      setUser(null)
      router.push("/auth")
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <UserContext.Provider value={{ user, loading, login, logout, refreshUser }}>
      {children}
    </UserContext.Provider>
  )
}


export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) throw new Error("useUser must be used within UserProvider")
  return context
}
