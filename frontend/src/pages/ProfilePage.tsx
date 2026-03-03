import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Coins,
  Trophy,
  TrendingUp,
  Zap,
  ChevronRight,
  Edit3,
  LogOut,
  Star,
  Gift,
  CreditCard,
  Settings,
  CalendarDays,
  Clock,
  Ticket,
  Plus,
  BadgeCheck,
  Loader2,
  X,
  Check,
  Camera,
  Users,
  Globe,
  Radio,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import type { ShowWithHost } from '../types'

// ─── Animated counter ─────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 800) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (target === 0) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setValue(target); clearInterval(timer) }
      else setValue(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration])
  return value
}

function formatShowDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}
function formatPrice(cents: number) {
  return (cents / 100).toFixed(2)
}

// ─── Edit Profile Modal ───────────────────────────────────────────────────────
function EditProfileModal({
  currentName,
  currentUsername,
  currentAvatar,
  onClose,
  onSave,
}: {
  currentName: string
  currentUsername: string
  currentAvatar: string
  onClose: () => void
  onSave: (data: { display_name: string; username: string; avatar_url: string }) => Promise<void>
}) {
  const [displayName, setDisplayName] = useState(currentName)
  const [username, setUsername] = useState(currentUsername)
  const [avatarUrl, setAvatarUrl] = useState(currentAvatar)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function handleSave() {
    if (!displayName.trim()) { setError('Display name is required'); return }
    if (!username.trim()) { setError('Username is required'); return }
    setSaving(true); setError('')
    try {
      await onSave({ display_name: displayName.trim(), username: username.trim(), avatar_url: avatarUrl.trim() })
    } catch (err: any) {
      setError(err.message || 'Failed to update profile')
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center animate-fade-in">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-[430px] bg-[#0d0d22] border-t border-white/[0.08] rounded-t-3xl max-h-[85vh] overflow-y-auto">
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-white/15" />
        </div>
        <div className="flex items-center justify-between px-5 pb-4 pt-2">
          <h2 className="text-white text-xl font-black" style={{ fontFamily: 'Outfit, sans-serif' }}>Edit Profile</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/8 flex items-center justify-center btn-press">
            <X size={16} className="text-white" />
          </button>
        </div>

        <div className="px-5 pb-8 space-y-5">
          {/* Avatar */}
          <div className="flex flex-col items-center">
            <div className="relative mb-3">
              <div className="w-24 h-24 rounded-full p-[3px] bg-gradient-to-br from-purple-500 to-pink-500">
                <div className="w-full h-full rounded-full overflow-hidden bg-[#0d0d22]">
                  <img src={avatarUrl} alt="" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-purple-500 flex items-center justify-center border-2 border-[#0d0d22]">
                <Camera size={12} className="text-white" />
              </div>
            </div>
          </div>

          <div>
            <label className="text-white/40 text-xs font-semibold mb-1.5 block uppercase tracking-wider">Avatar URL</label>
            <input type="url" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} placeholder="https://example.com/avatar.jpg"
              className="w-full bg-[#07071a] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-purple-500 transition-colors" />
          </div>

          <div>
            <label className="text-white/40 text-xs font-semibold mb-1.5 block uppercase tracking-wider">Display Name *</label>
            <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Your Name"
              className="w-full bg-[#07071a] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-purple-500 transition-colors" />
          </div>

          <div>
            <label className="text-white/40 text-xs font-semibold mb-1.5 block uppercase tracking-wider">Username *</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-sm">@</span>
              <input type="text" value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                placeholder="username"
                className="w-full bg-[#07071a] border border-white/[0.08] rounded-xl pl-8 pr-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-purple-500 transition-colors" />
            </div>
          </div>

          {error && <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3"><p className="text-red-400 text-sm">{error}</p></div>}

          <button onClick={handleSave} disabled={saving}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-base btn-press disabled:opacity-50 flex items-center justify-center gap-2">
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} />}
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Event Card ───────────────────────────────────────────────────────────────
function EventCard({ show, onClick }: { show: ShowWithHost; onClick: () => void }) {
  const soldPct = show.total_tickets > 0 ? Math.round((show.tickets_sold / show.total_tickets) * 100) : 0

  return (
    <div className="relative bg-[#0f0f28] border border-white/[0.07] rounded-2xl overflow-hidden cursor-pointer card-hover" onClick={onClick}>
      <div className="h-0.5 bg-gradient-to-r from-purple-500/50 to-pink-500/30" />
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white/40 text-xs bg-white/5 px-2 py-0.5 rounded-full">{show.category}</span>
          <div className="flex items-center gap-1">
            <Ticket size={12} className="text-yellow-400" />
            <span className="text-yellow-400 text-sm font-bold">${formatPrice(show.ticket_price)}</span>
          </div>
        </div>
        <h3 className="text-white font-bold text-base mb-1">{show.title}</h3>
        <div className="flex items-center gap-3 mb-3 text-white/35 text-xs">
          <div className="flex items-center gap-1"><CalendarDays size={11} />{formatShowDate(show.show_date)}</div>
          <div className="flex items-center gap-1"><Clock size={11} />{formatTime(show.show_date)}</div>
        </div>
        <div className="mb-3">
          <div className="flex justify-between mb-1">
            <span className="text-white/25 text-[10px]">Tickets sold</span>
            <span className="text-white/40 text-[10px] font-semibold">{show.tickets_sold}/{show.total_tickets}</span>
          </div>
          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500" style={{ width: `${soldPct}%` }} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button className="py-2 rounded-xl bg-white/5 border border-white/[0.08] text-white text-xs font-semibold btn-press">Edit Event</button>
          <button className="py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold btn-press">Manage</button>
        </div>
      </div>
    </div>
  )
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ icon: Icon, rawValue, label, color, bg }: { icon: React.ElementType; rawValue: number; label: string; color: string; bg: string }) {
  const animated = useCountUp(rawValue)
  const display = rawValue === 0 ? '0' : rawValue < 0 ? '--' : animated
  return (
    <div className="bg-[#0f0f28] border border-white/[0.07] rounded-2xl p-4 flex flex-col card-hover">
      <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center mb-3`}>
        <Icon size={18} className={color} />
      </div>
      <p className={`font-black text-2xl leading-none stat-number ${color}`}>{display}</p>
      <p className="text-white/30 text-xs mt-1 font-medium">{label}</p>
    </div>
  )
}

const menuItems = [
  { icon: Star, label: 'My Achievements', color: 'text-yellow-400' },
  { icon: Gift, label: 'Rewards & Bonuses', color: 'text-pink-400' },
  { icon: CreditCard, label: 'Payment Methods', color: 'text-blue-400' },
  { icon: Globe, label: 'Global Access', color: 'text-teal-400' },
  { icon: Settings, label: 'Settings', color: 'text-white/40' },
]

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ProfilePage() {
  const { user, profile, signOut, refreshProfile, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [myShows, setMyShows] = useState<ShowWithHost[]>([])
  const [myTicketShows, setMyTicketShows] = useState<ShowWithHost[]>([])
  const [loadingData, setLoadingData] = useState(true)
  const [becomingHost, setBecomingHost] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)

  useEffect(() => {
    if (user) { setMyShows([]); setMyTicketShows([]); setLoadingData(false) }
    else setLoadingData(false)
  }, [user])

  async function handleSaveProfile(data: { display_name: string; username: string; avatar_url: string }) {
    await refreshProfile()
    setShowEditModal(false)
  }

  async function handleBecomeHost() {
    if (!user) return
    setBecomingHost(true)
    await refreshProfile()
    setBecomingHost(false)
  }

  async function handleLogout() {
    setLoggingOut(true)
    await signOut()
    navigate('/')
  }

  if (authLoading) {
    return (
      <div className="page-content bg-[#07071a] flex items-center justify-center">
        <Loader2 size={32} className="text-purple-400 animate-spin" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="page-content bg-[#07071a] flex flex-col items-center justify-center px-6 text-center">
        <div className="w-24 h-24 rounded-full flex items-center justify-center mb-5 glow-purple"
          style={{ background: 'linear-gradient(135deg, #8B5CF6, #EC4899)' }}>
          <Users size={36} className="text-white" />
        </div>
        <h2 className="text-white text-2xl font-black mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>Join IV</h2>
        <p className="text-white/40 text-sm mb-2">Your global stage awaits</p>
        <p className="text-white/20 text-xs mb-6">Manage your shows, tickets, and earnings</p>
        <button onClick={() => navigate('/auth')}
          className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black text-base btn-press btn-glow">
          Sign In / Sign Up
        </button>
      </div>
    )
  }

  const displayName = profile?.display_name || profile?.username || 'User'
  const username = profile?.username || ''
  const avatarUrl = profile?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`
  const isHost = profile?.is_host || false

  return (
    <div className="page-content bg-[#07071a] animate-fade-in">
      {/* ─── HERO BANNER ─────────────────────── */}
      <div className="relative" style={{ height: 160 }}>
        {/* Gradient banner */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(135deg, #1a0a30 0%, #0f0a22 40%, #200820 100%)'
        }} />
        <div className="absolute inset-0 opacity-40"
          style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(139,92,246,0.35) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(236,72,153,0.25) 0%, transparent 60%)' }}
        />
        {/* Bottom fade to page bg */}
        <div className="absolute bottom-0 left-0 right-0 h-16" style={{ background: 'linear-gradient(to bottom, transparent, #07071a)' }} />

        {/* Top bar */}
        <div className="relative flex justify-between items-center px-4 pt-4">
          <button onClick={() => setShowEditModal(true)}
            className="w-9 h-9 rounded-full glass flex items-center justify-center btn-press">
            <Edit3 size={15} className="text-white" />
          </button>

          {/* Coin balance pill */}
          <div className="flex items-center gap-1.5 glass rounded-full px-3 py-1.5">
            <span className="text-base leading-none">🪙</span>
            <span className="text-yellow-400 text-sm font-black">0</span>
            <span className="text-white/30 text-xs">coins</span>
          </div>

          <button onClick={handleLogout} disabled={loggingOut}
            className="flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 rounded-full px-3 py-1.5 btn-press">
            <LogOut size={13} className="text-red-400" />
            <span className="text-red-400 text-xs font-semibold">{loggingOut ? 'Logging out...' : 'Logout'}</span>
          </button>
        </div>
      </div>

      {/* ─── AVATAR overlapping banner ─────────── */}
      <div className="relative flex flex-col items-center -mt-14 pb-5">
        <div className="relative mb-3">
          <div className="w-28 h-28 rounded-full p-[3px]" style={{ background: 'linear-gradient(135deg, #8B5CF6, #EC4899)' }}>
            <div className="w-full h-full rounded-full overflow-hidden bg-[#0f0f28] border-2 border-[#07071a]">
              <img src={avatarUrl} alt={displayName} className="w-full h-full object-cover" />
            </div>
          </div>
          <button onClick={() => setShowEditModal(true)}
            className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center border-2 border-[#07071a] btn-press glow-purple">
            <Camera size={14} className="text-white" />
          </button>
        </div>

        {/* Name + badge */}
        <div className="flex items-center gap-1.5 mb-1">
          <h1 className="text-white text-xl font-black" style={{ fontFamily: 'Outfit, sans-serif' }}>{displayName}</h1>
          {isHost && <BadgeCheck size={20} className="text-purple-400" />}
        </div>
        {username && <p className="text-white/40 text-sm mb-1.5">@{username}</p>}
        <div className="flex items-center gap-2">
          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${isHost ? 'text-purple-400 bg-purple-500/10 border border-purple-500/20' : 'text-white/30 bg-white/5'
            }`}>
            {isHost ? '🎙 Host' : '👁 Viewer'}
          </span>
          <span className="text-white/20 text-[11px] bg-white/5 px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <Globe size={9} />Global
          </span>
        </div>
        <p className="text-white/20 text-xs mt-1">{user.email}</p>
      </div>

      {/* ─── STATS GRID ──────────────────────── */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-2 gap-3">
          <StatCard icon={Coins} rawValue={0} label="Total Coins" color="text-yellow-400" bg="bg-yellow-400/10" />
          <StatCard icon={Trophy} rawValue={0} label="Wins" color="text-purple-400" bg="bg-purple-400/10" />
          <StatCard icon={TrendingUp} rawValue={0} label="Rank" color="text-teal-400" bg="bg-teal-400/10" />
          <StatCard icon={Zap} rawValue={0} label="Streak (days)" color="text-orange-400" bg="bg-orange-400/10" />
        </div>
      </div>

      {/* ─── BECOME HOST CTA ─────────────────── */}
      {!isHost && (
        <div className="px-4 mb-6">
          <div className="relative rounded-2xl overflow-hidden border border-purple-500/20 p-5"
            style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.12) 0%, rgba(236,72,153,0.08) 100%)' }}>
            <div className="flex items-center gap-2 mb-2">
              <Radio size={16} className="text-purple-400" />
              <h3 className="text-white font-black text-base" style={{ fontFamily: 'Outfit, sans-serif' }}>Want to perform for the world?</h3>
            </div>
            <div className="space-y-1.5 mb-4">
              {['Create ticketed shows for global fans', 'Run live challenges & win coin rewards', 'Track earnings with a creator dashboard'].map((b) => (
                <div key={b} className="flex items-center gap-2 text-white/50 text-xs">
                  <span className="w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                  {b}
                </div>
              ))}
            </div>
            <button onClick={handleBecomeHost} disabled={becomingHost}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black text-sm btn-press btn-glow disabled:opacity-50">
              {becomingHost ? 'Setting up...' : '🚀 Become a Host'}
            </button>
          </div>
        </div>
      )}

      {/* ─── MY SHOWS (host only) ────────────── */}
      {isHost && (
        <div className="px-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-white text-lg font-bold">My Shows</h2>
              <span className="bg-purple-500/15 text-purple-400 text-[11px] font-bold px-2 py-0.5 rounded-full">{myShows.length}</span>
            </div>
            <button onClick={() => navigate('/create-show')}
              className="flex items-center gap-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full px-3 py-1.5 btn-press">
              <Plus size={13} className="text-white" />
              <span className="text-white text-xs font-bold">New Show</span>
            </button>
          </div>
          {loadingData ? (
            <div className="flex justify-center py-8"><Loader2 size={24} className="text-purple-400 animate-spin" /></div>
          ) : myShows.length > 0 ? (
            <div className="space-y-4">{myShows.map((show) => <EventCard key={show.id} show={show} onClick={() => navigate(`/show/${show.id}`)} />)}</div>
          ) : (
            <div className="bg-[#0f0f28] border border-white/[0.07] rounded-2xl p-6 flex flex-col items-center text-center">
              <CalendarDays size={24} className="text-white/20 mb-3" />
              <p className="text-white/40 text-sm mb-1">No shows yet</p>
              <p className="text-white/20 text-xs">Create your first show to start selling tickets globally</p>
            </div>
          )}
        </div>
      )}

      {/* ─── MY TICKETS ──────────────────────── */}
      <div className="px-4 mb-6">
        <h2 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
          <Ticket size={16} className="text-purple-400" />
          My Tickets
        </h2>
        {loadingData ? (
          <div className="flex justify-center py-8"><Loader2 size={24} className="text-purple-400 animate-spin" /></div>
        ) : myTicketShows.length > 0 ? (
          <div className="space-y-3">
            {myTicketShows.map((show) => (
              <button key={show.id} onClick={() => navigate(`/show/${show.id}`)}
                className="w-full bg-[#0f0f28] border border-white/[0.07] rounded-xl p-4 flex items-center gap-3 text-left btn-press card-hover">
                <div className="w-11 h-11 rounded-xl bg-purple-500/15 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <Ticket size={18} className="text-purple-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-semibold truncate">{show.title}</p>
                  <p className="text-white/30 text-xs">{formatShowDate(show.show_date)} • {formatTime(show.show_date)}</p>
                </div>
                {show.is_live && (
                  <span className="flex items-center gap-1 bg-red-500 rounded-full px-2 py-0.5 live-badge">
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    <span className="text-white text-[10px] font-bold">LIVE</span>
                  </span>
                )}
              </button>
            ))}
          </div>
        ) : (
          <div className="bg-[#0f0f28] border border-white/[0.07] rounded-2xl p-6 flex flex-col items-center text-center">
            <Ticket size={24} className="text-white/20 mb-3" />
            <p className="text-white/40 text-sm mb-1">No tickets yet</p>
            <p className="text-white/20 text-xs">Purchase a ticket to access premium global shows</p>
          </div>
        )}
      </div>

      {/* ─── MENU ────────────────────────────── */}
      <div className="px-4 mb-10">
        <div className="bg-[#0f0f28] border border-white/[0.07] rounded-2xl overflow-hidden divide-y divide-white/[0.04]">
          {menuItems.map(({ icon: Icon, label, color }) => (
            <button key={label} className="w-full flex items-center justify-between p-4 hover:bg-white/3 transition-colors btn-press">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center`}>
                  <Icon size={17} className={color} />
                </div>
                <span className="text-white text-sm font-medium">{label}</span>
              </div>
              <ChevronRight size={15} className="text-white/20" />
            </button>
          ))}
        </div>
      </div>

      <div className="h-6" />

      {/* Edit Modal */}
      {showEditModal && (
        <EditProfileModal
          currentName={displayName}
          currentUsername={username}
          currentAvatar={avatarUrl}
          onClose={() => setShowEditModal(false)}
          onSave={handleSaveProfile}
        />
      )}
    </div>
  )
}
