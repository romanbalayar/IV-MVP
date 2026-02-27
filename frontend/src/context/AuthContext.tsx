import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Profile } from '../types'
import { MOCK_PROFILE, MOCK_USER_ID } from '../lib/mockData'

// Minimal mock User shape (mirrors what pages use from useAuth)
export interface MockUser {
  id: string
  email: string
}

interface AuthState {
  user: MockUser | null
  profile: Profile | null
  loading: boolean
  signUp: (email: string, password: string, username: string) => Promise<{ error: string | null; needsConfirmation: boolean }>
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthState | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)

  async function signIn(email: string, _password: string) {
    const mockUser: MockUser = { id: MOCK_USER_ID, email }
    setUser(mockUser)
    setProfile({ ...MOCK_PROFILE, id: MOCK_USER_ID })
    return { error: null }
  }

  async function signUp(email: string, _password: string, username: string) {
    const mockUser: MockUser = { id: MOCK_USER_ID, email }
    setUser(mockUser)
    setProfile({
      ...MOCK_PROFILE,
      id: MOCK_USER_ID,
      username,
      display_name: username,
    })
    return { error: null, needsConfirmation: false }
  }

  async function signOut() {
    setUser(null)
    setProfile(null)
  }

  async function refreshProfile() {
    // no-op in mock mode
  }

  return (
    <AuthContext.Provider value={{ user, profile, loading: false, signUp, signIn, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
