import { createContext, useContext, useState, useEffect, useCallback } from "react"

const AuthContext = createContext(null)

const TOKEN_KEY = "token"
const USER_KEY  = "user"


function getStoredSession() {
  try {
    const token = localStorage.getItem(TOKEN_KEY)
    const raw   = localStorage.getItem(USER_KEY)
    if (!token || !raw) return null
    return { user: JSON.parse(raw), token }
  } catch {
    return null
  }
}

function clearStoredSession() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}



export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const session = getStoredSession()
    if (session) setUser(session.user)
    setLoading(false)
  }, [])

  const login = useCallback((userData, token) => {
    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(USER_KEY, JSON.stringify(userData))
    setUser(userData)
  }, [])

  const logout = useCallback(() => {
    clearStoredSession()
    setUser(null)
  }, [])

  const value = { user, login, logout, loading, isAuthenticated: !!user }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}


export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within an AuthProvider")
  return context
}