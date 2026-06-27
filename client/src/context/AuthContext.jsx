import { createContext, useContext, useState, useEffect } from 'react'
import { apiFetch } from '../utils/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)
  const [slowServer, setSlowServer] = useState(false)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      apiFetch('/api/v1/auth/current_user', {
        headers: { 'Authorization': `Bearer ${storedToken}` }
      })
        .then(res => res.json())
        .then(data => {
          if (data.user) {
            setUser(data.user)
            setToken(storedToken)
          } else {
            localStorage.removeItem('token')
          }
        })
        .catch(() => localStorage.removeItem('token'))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!loading) return
    const timer = setTimeout(() => {
      setSlowServer(true)
    }, 5000)
    return () => clearTimeout(timer)
  }, [loading])

  const login = (userData, jwtToken) => {
    setUser(userData)
    setToken(jwtToken)
    localStorage.setItem('token', jwtToken)
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
  }

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: '16px',
        background: '#141414',
        color: '#ffffff'
      }}>
        <div style={{ fontSize: '32px', fontWeight: '700', color: '#e50914' }}>
          AniStream
        </div>
        {slowServer ? (
          <p style={{
            fontSize: '14px',
            textAlign: 'center',
            maxWidth: '320px',
            color: '#b3b3b3',
            lineHeight: '1.6'
          }}>
            Waking up the server... this can take up to 30 seconds on the free tier.
          </p>
        ) : (
          <p style={{ fontSize: '14px', color: '#b3b3b3' }}>Loading...</p>
        )}
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}