import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Eye, EyeOff, ArrowLeft, Loader2, Mail, Lock, User } from 'lucide-react'

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
      setResetSent(true)
      setLoading(false)
      return
    }
    if (mode === 'login') {
      const { error } = await signIn(email, password)
      if (error) setError(error)
      else navigate('/profile')
    } else {
      if (!username.trim()) { setError('Username is required'); setLoading(false); return }
      const { error, needsConfirmation } = await signUp(email, password, username.trim())
      if (error) setError(error)
      else if (needsConfirmation) setSignupSuccess(true)
      else navigate('/profile')
    }
    setLoading(false)
  }

  function switchMode(newMode: 'login' | 'signup' | 'forgot') {
    setMode(newMode)
    setError('')
    setResetSent(false)
    setSignupSuccess(false)
  }

  // Success/Reset screens
  if (mode === 'newpassword') {
    return (
      <div className="page-content bg-[#07071a] flex items-center justify-center px-6">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-purple-500/20 border border-purple-500/20 flex items-center justify-center mx-auto mb-4">
            <Lock size={28} className="text-purple-400" />
          </div>
          <h2 className="text-white text-xl font-bold mb-2">Not available in demo</h2>
          <p className="text-white/40 text-sm mb-6">Password reset is disabled in demo mode</p>
          <button onClick={() => switchMode('login')} className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-sm btn-press">
            Back to Login
          </button>
        </div>
      </div>
    )
  }

  if (signupSuccess) {
    return (
      <div className="page-content bg-[#07071a] flex items-center justify-center px-6">
        <div className="text-center animate-scale-in">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: 'linear-gradient(135deg, #8B5CF6, #EC4899)' }}>
            <span className="text-3xl">✓</span>
          </div>
          <h2 className="text-white text-2xl font-black mb-2">Check your email</h2>
          <p className="text-white/40 text-sm mb-6">
            Confirmation link sent to <span className="text-white font-semibold">{email}</span>
          </p>
          <button onClick={() => switchMode('login')} className="text-purple-400 text-sm font-semibold">
            ← Back to Login
          </button>
        </div>
      </div>
    )
  }

  if (resetSent) {
    return (
      <div className="page-content bg-[#07071a] flex items-center justify-center px-6">
        <div className="text-center animate-scale-in">
          <div className="w-20 h-20 rounded-full bg-purple-500/15 border border-purple-500/20 flex items-center justify-center mx-auto mb-5">
            <Mail size={32} className="text-purple-400" />
          </div>
          <h2 className="text-white text-2xl font-black mb-2">Reset link sent</h2>
          <p className="text-white/40 text-sm mb-6">
            Check <span className="text-white font-semibold">{email}</span> for a password reset link
          </p>
          <button onClick={() => switchMode('login')} className="text-purple-400 text-sm font-semibold">
            ← Back to Login
          </button>
        </div>
      </div>
    )
  }

  const titles = {
    login: 'Welcome back',
    signup: 'Join IV',
    forgot: 'Reset password',
    newpassword: 'Set new password',
  }
  const subtitles = {
    login: 'Your global stage awaits',
    signup: 'Create, compete, perform worldwide',
    forgot: "Enter your email and we'll send a reset link",
    newpassword: 'Enter your new password',
  }

  return (
    <div
      className="page-content bg-[#07071a] relative overflow-hidden"
      style={{ height: '100dvh' }}
    >
      {/* Ambient orbs */}
      <div className="absolute -top-20 -left-16 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)' }}
      />
      <div className="absolute -bottom-10 -right-16 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.15) 0%, transparent 70%)' }}
      />

      <div className="relative px-6 pt-6 pb-8 h-full flex flex-col">
        {/* Back */}
        <button onClick={() => mode === 'forgot' ? switchMode('login') : navigate(-1)} className="mb-6 self-start btn-press">
          <ArrowLeft size={24} className="text-white/60" />
        </button>

        {/* Brand logo */}
        <div className="flex flex-col items-center mb-8">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3 glow-purple"
            style={{ background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)' }}
          >
            <span className="text-white font-black text-2xl" style={{ fontFamily: 'Outfit, sans-serif' }}>IV</span>
          </div>
          <h1 className="text-white text-2xl font-black mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
            {titles[mode]}
          </h1>
          <p className="text-white/40 text-sm">{subtitles[mode]}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 flex-1 animate-slide-up">
          {mode === 'signup' && (
            <div>
              <label className="text-white/40 text-xs font-semibold mb-1.5 block uppercase tracking-wider">Username</label>
              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="your_username"
                  className="w-full bg-[#0f0f28] border border-white/[0.08] rounded-xl pl-10 pr-4 py-3.5 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-white/40 text-xs font-semibold mb-1.5 block uppercase tracking-wider">Email</label>
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full bg-[#0f0f28] border border-white/[0.08] rounded-xl pl-10 pr-4 py-3.5 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
          </div>

          {mode !== 'forgot' && (
            <div>
              <label className="text-white/40 text-xs font-semibold mb-1.5 block uppercase tracking-wider">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="w-full bg-[#0f0f28] border border-white/[0.08] rounded-xl pl-10 pr-12 py-3.5 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-purple-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {mode === 'login' && (
                <button type="button" onClick={() => switchMode('forgot')} className="text-purple-400 text-xs font-semibold mt-2 block ml-auto">
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
            className="w-full py-4 rounded-xl text-white font-black text-base btn-press btn-glow disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
            style={{ background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)' }}
          >
            {loading && <Loader2 size={18} className="animate-spin" />}
            {mode === 'login' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Send Reset Link'}
          </button>

          {/* Social proof */}
          <p className="text-center text-white/20 text-xs pt-1">
            Join 10,000+ creators performing globally on IV
          </p>
        </form>

        {/* Switch mode */}
        <div className="mt-4 text-center">
          {mode === 'forgot' ? (
            <p className="text-white/40 text-sm">
              Remember your password?{' '}
              <button onClick={() => switchMode('login')} className="text-purple-400 font-semibold">Sign In</button>
            </p>
          ) : (
            <p className="text-white/40 text-sm">
              {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button onClick={() => switchMode(mode === 'login' ? 'signup' : 'login')} className="text-purple-400 font-semibold">
                {mode === 'login' ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
