"use client"

import { useState, useEffect } from "react"
import LoginPage from "./components/LoginPage"
import DashboardPage from "./components/DashboardPage"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Check if user is authenticated on app load
  useEffect(() => {
    const token = localStorage.getItem("jwt_token")
    if (token) {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const handleLogin = (token) => {
    localStorage.setItem("jwt_token", token)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem("jwt_token")
    setIsAuthenticated(false)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {isAuthenticated ? <DashboardPage onLogout={handleLogout} /> : <LoginPage onLogin={handleLogin} />}
    </div>
  )
}

export default App
