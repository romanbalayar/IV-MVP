import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

import { Eye, EyeOff, ArrowLeft, Loader2, Mail, Lock } from 'lucide-react'

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot' | 'newpassword'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [signupSuccess, setSignupSuccess] = useState(false)
  const [resetSent, setResetSent] = useState(false)


  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()





  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (mode === 'forgot') {
      // Mock: simulate reset email sent
      setResetSent(true)
      setLoading(false)
      return
    }

    if (mode === 'login') {
      const { error } = await signIn(email, password)
      if (error) {
        setError(error)
      } else {
        navigate('/profile')
      }
    } else {
      if (!username.trim()) {
        setError('Username is required')
        setLoading(false)
        return
      }
      const { error, needsConfirmation } = await signUp(email, password, username.trim())
      if (error) {
        setError(error)
      } else if (needsConfirmation) {
        setSignupSuccess(true)
      } else {
        navigate('/profile')
      }
    }
    setLoading(false)
  }

  function switchMode(newMode: 'login' | 'signup' | 'forgot') {
    setMode(newMode)
    setError('')
    setResetSent(false)
    setSignupSuccess(false)
  }

  // Set new password form — not available in demo mode
  if (mode === 'newpassword') {
    return (
      <div className="page-content bg-iv-bg flex items-center justify-center px-6">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-iv-purple/20 flex items-center justify-center mx-auto mb-4">
            <Lock size={28} className="text-iv-purple" />
          </div>
          <h2 className="text-white text-xl font-bold mb-2">Not available in demo</h2>
          <p className="text-iv-text-secondary text-sm mb-6">Password reset is disabled in demo mode</p>
          <button
            onClick={() => switchMode('login')}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-sm btn-press"
          >
            Back to Login
          </button>
        </div>
      </div>
    )
  }



  if (signupSuccess) {
    return (
      <div className="page-content bg-iv-bg flex items-center justify-center px-6">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-iv-green/20 flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">✓</span>
          </div>
          <h2 className="text-white text-xl font-bold mb-2">Check your email</h2>
          <p className="text-iv-text-secondary text-sm mb-6">
            We sent a confirmation link to <span className="text-white">{email}</span>
          </p>
          <button
            onClick={() => switchMode('login')}
            className="text-iv-purple text-sm font-semibold"
          >
            Back to Login
          </button>
        </div>
      </div>
    )
  }

  if (resetSent) {
    return (
      <div className="page-content bg-iv-bg flex items-center justify-center px-6">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-iv-purple/20 flex items-center justify-center mx-auto mb-4">
            <Mail size={28} className="text-iv-purple" />
          </div>
          <h2 className="text-white text-xl font-bold mb-2">Reset link sent</h2>
          <p className="text-iv-text-secondary text-sm mb-6">
            Check <span className="text-white">{email}</span> for a password reset link
          </p>
          <button
            onClick={() => switchMode('login')}
            className="text-iv-purple text-sm font-semibold"
          >
            Back to Login
          </button>
        </div>
      </div>
    )
  }

  const titles = {
    login: 'Welcome back',
    signup: 'Create account',
    forgot: 'Reset password',
    newpassword: 'Set new password',
  }

  const subtitles = {
    login: 'Sign in to access premium shows',
    signup: 'Join IV to watch exclusive live events',
    forgot: "Enter your email and we'll send a reset link",
    newpassword: 'Enter your new password',
  }

  return (
    <div className="page-content bg-iv-bg">
      <div className="px-6 pt-8 pb-8 h-full flex flex-col">
        <button onClick={() => mode === 'forgot' ? switchMode('login') : navigate(-1)} className="mb-8 self-start btn-press">
          <ArrowLeft size={24} className="text-white" />
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-black text-white mb-2">{titles[mode]}</h1>
          <p className="text-iv-text-secondary text-sm">{subtitles[mode]}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 flex-1">
          {mode === 'signup' && (
            <div>
              <label className="text-iv-text-secondary text-xs font-medium mb-1.5 block">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="your_username"
                className="w-full bg-iv-card border border-iv-card-border rounded-xl px-4 py-3.5 text-white text-sm placeholder:text-iv-text-muted focus:outline-none focus:border-iv-purple transition-colors"
              />
            </div>
          )}

          <div>
            <label className="text-iv-text-secondary text-xs font-medium mb-1.5 block">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full bg-iv-card border border-iv-card-border rounded-xl px-4 py-3.5 text-white text-sm placeholder:text-iv-text-muted focus:outline-none focus:border-iv-purple transition-colors"
            />
          </div>

          {mode !== 'forgot' && (
            <div>
              <label className="text-iv-text-secondary text-xs font-medium mb-1.5 block">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="w-full bg-iv-card border border-iv-card-border rounded-xl px-4 py-3.5 text-white text-sm placeholder:text-iv-text-muted focus:outline-none focus:border-iv-purple transition-colors pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-iv-text-muted"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {mode === 'login' && (
                <button
                  type="button"
                  onClick={() => switchMode('forgot')}
                  className="text-iv-purple text-xs font-medium mt-2 block ml-auto"
                >
                  Forgot password?
                </button>
              )}
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-base btn-press hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
          >
            {loading && <Loader2 size={18} className="animate-spin" />}
            {mode === 'login' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Send Reset Link'}
          </button>
        </form>

        <div className="mt-6 text-center">
          {mode === 'forgot' ? (
            <p className="text-iv-text-secondary text-sm">
              Remember your password?{' '}
              <button onClick={() => switchMode('login')} className="text-iv-purple font-semibold">
                Sign In
              </button>
            </p>
          ) : (
            <p className="text-iv-text-secondary text-sm">
              {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button
                onClick={() => switchMode(mode === 'login' ? 'signup' : 'login')}
                className="text-iv-purple font-semibold"
              >
                {mode === 'login' ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
