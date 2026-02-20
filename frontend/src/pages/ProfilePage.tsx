import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Users,
  Coins,
  Trophy,
  TrendingUp,
  Zap,
  ChevronRight,
  Settings,
  Edit3,
  LogOut,
  Star,
  Gift,
  CreditCard,
  CalendarDays,
  Clock,
  Ticket,
  Plus,
  BadgeCheck,
  Loader2,
  X,
  Check,
  Camera,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import type { ShowWithHost } from '../types'

interface StatCard {
  icon: React.ElementType
  value: string
  label: string
  iconColor: string
  iconBg: string
}

const statCards: StatCard[] = [
  { icon: Coins, value: '0', label: 'Total Coins', iconColor: 'text-yellow-400', iconBg: 'bg-yellow-400/10' },
  { icon: Trophy, value: '0', label: 'Wins', iconColor: 'text-purple-400', iconBg: 'bg-purple-400/10' },
  { icon: TrendingUp, value: '--', label: 'Rank', iconColor: 'text-teal-400', iconBg: 'bg-teal-400/10' },
  { icon: Zap, value: '0 days', label: 'Streak', iconColor: 'text-orange-400', iconBg: 'bg-orange-400/10' },
]

const menuItems = [
  { icon: Star, label: 'My Achievements', color: 'text-yellow-400' },
  { icon: Gift, label: 'Rewards & Bonuses', color: 'text-pink-400' },
  { icon: CreditCard, label: 'Payment Methods', color: 'text-blue-400' },
  { icon: Settings, label: 'Settings', color: 'text-gray-400' },
]

function formatShowDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}

function formatPrice(cents: number) {
  return (cents / 100).toFixed(2)
}

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
    if (!displayName.trim()) {
      setError('Display name is required')
      return
    }
    if (!username.trim()) {
      setError('Username is required')
      return
    }
    setSaving(true)
    setError('')
    try {
      await onSave({
        display_name: displayName.trim(),
        username: username.trim(),
        avatar_url: avatarUrl.trim(),
      })
    } catch (err: any) {
      setError(err.message || 'Failed to update profile')
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-[430px] bg-iv-bg border-t border-iv-card-border rounded-t-3xl max-h-[85vh] overflow-y-auto">
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-white/20" />
        </div>

        <div className="flex items-center justify-between px-5 pb-4 pt-2">
          <h2 className="text-white text-xl font-bold">Edit Profile</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center btn-press">
            <X size={16} className="text-white" />
          </button>
        </div>

        <div className="px-5 pb-8 space-y-5">
          {/* Avatar Preview */}
          <div className="flex flex-col items-center">
            <div className="relative mb-3">
              <div className="w-24 h-24 rounded-full p-[3px] bg-gradient-to-br from-purple-500 via-purple-600 to-violet-700">
                <div className="w-full h-full rounded-full overflow-hidden bg-iv-card border-2 border-iv-bg">
                  <img src={avatarUrl} alt="" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-iv-purple flex items-center justify-center border-2 border-iv-bg">
                <Camera size={12} className="text-white" />
              </div>
            </div>
          </div>

          {/* Avatar URL */}
          <div>
            <label className="text-iv-text-secondary text-xs font-medium mb-1.5 block">
              Avatar URL
            </label>
            <input
              type="url"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              placeholder="https://example.com/avatar.jpg"
              className="w-full bg-iv-card border border-iv-card-border rounded-xl px-4 py-3 text-white text-sm placeholder:text-iv-text-muted focus:outline-none focus:border-iv-purple transition-colors"
            />
          </div>

          {/* Display Name */}
          <div>
            <label className="text-iv-text-secondary text-xs font-medium mb-1.5 block">
              Display Name *
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your Name"
              className="w-full bg-iv-card border border-iv-card-border rounded-xl px-4 py-3 text-white text-sm placeholder:text-iv-text-muted focus:outline-none focus:border-iv-purple transition-colors"
            />
          </div>

          {/* Username */}
          <div>
            <label className="text-iv-text-secondary text-xs font-medium mb-1.5 block">
              Username *
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-iv-text-muted text-sm">@</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                placeholder="username"
                className="w-full bg-iv-card border border-iv-card-border rounded-xl pl-8 pr-4 py-3 text-white text-sm placeholder:text-iv-text-muted focus:outline-none focus:border-iv-purple transition-colors"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-base btn-press hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} />}
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}

function EventCard({ show, onClick }: { show: ShowWithHost; onClick: () => void }) {
  const soldPercent = show.total_tickets > 0
    ? Math.round((show.tickets_sold / show.total_tickets) * 100)
    : 0

  const gradients: Record<string, string> = {
    Music: 'from-purple-500/30 via-indigo-500/15 to-transparent',
    Comedy: 'from-orange-500/30 via-yellow-500/15 to-transparent',
    Dance: 'from-pink-500/30 via-rose-500/15 to-transparent',
    Talent: 'from-emerald-500/30 via-teal-500/15 to-transparent',
    'Talk Show': 'from-blue-500/30 via-cyan-500/15 to-transparent',
    Other: 'from-gray-500/30 via-slate-500/15 to-transparent',
  }

  return (
    <div className="relative rounded-2xl overflow-hidden border border-iv-card-border bg-iv-card cursor-pointer" onClick={onClick}>
      <div className={`absolute inset-0 bg-gradient-to-b ${gradients[show.category] || gradients.Other} pointer-events-none`} />
      <div className="relative p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-iv-text-secondary bg-white/5 px-2.5 py-1 rounded-full">
              {show.category}
            </span>
            {show.is_live && (
              <div className="live-badge flex items-center gap-1 bg-red-500 rounded-full px-1.5 py-0.5">
                <div className="w-1 h-1 rounded-full bg-white" />
                <span className="text-white text-[9px] font-bold uppercase">Live</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Ticket size={13} className="text-iv-gold" />
            <span className="text-iv-gold text-sm font-bold">${formatPrice(show.ticket_price)}</span>
          </div>
        </div>

        <h3 className="text-white font-bold text-lg mb-1 leading-tight">{show.title}</h3>
        <p className="text-iv-text-secondary text-xs leading-relaxed mb-3 line-clamp-2">{show.description}</p>

        <div className="flex flex-wrap items-center gap-2 mb-4">
          <div className="flex items-center gap-1.5 bg-white/5 rounded-lg px-2 py-1">
            <CalendarDays size={12} className="text-iv-text-secondary" />
            <span className="text-white text-[11px] font-medium">{formatShowDate(show.show_date)}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/5 rounded-lg px-2 py-1">
            <Clock size={12} className="text-iv-text-secondary" />
            <span className="text-white text-[11px] font-medium">{formatTime(show.show_date)}</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-iv-text-muted text-[11px]">Tickets sold</span>
            <span className="text-white text-[11px] font-semibold">
              {show.tickets_sold}/{show.total_tickets}
            </span>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
              style={{ width: `${soldPercent}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button className="py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-semibold btn-press">
            Edit Event
          </button>
          <button className="py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold btn-press">
            Manage
          </button>
        </div>
      </div>
    </div>
  )
}

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
    if (user) {
      fetchMyData()
    } else {
      setLoadingData(false)
    }
  }, [user])

  async function fetchMyData() {
    const [{ data: shows }, { data: tickets }] = await Promise.all([
      supabase
        .from('shows_with_host')
        .select('*')
        .eq('host_id', user!.id)
        .order('show_date', { ascending: true }),
      supabase
        .from('tickets')
        .select('show_id')
        .eq('user_id', user!.id),
    ])

    setMyShows((shows as ShowWithHost[]) || [])

    if (tickets && tickets.length > 0) {
      const showIds = tickets.map((t) => t.show_id)
      const { data: ticketShows } = await supabase
        .from('shows_with_host')
        .select('*')
        .in('id', showIds)
      setMyTicketShows((ticketShows as ShowWithHost[]) || [])
    }

    setLoadingData(false)
  }

  async function handleSaveProfile(data: { display_name: string; username: string; avatar_url: string }) {
    if (!user) return

    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        display_name: data.display_name,
        username: data.username,
        avatar_url: data.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.username}`,
      })

    if (error) {
      if (error.message.includes('unique') || error.code === '23505') {
        throw new Error('Username is already taken')
      }
      throw new Error(error.message)
    }

    await refreshProfile()
    setShowEditModal(false)
  }

  async function handleBecomeHost() {
    if (!user) return
    setBecomingHost(true)
    await supabase.from('profiles').update({ is_host: true }).eq('id', user.id)
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
      <div className="page-content bg-iv-bg flex items-center justify-center">
        <Loader2 size={32} className="text-iv-purple animate-spin" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="page-content bg-iv-bg flex flex-col items-center justify-center px-6 text-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
          <Users size={36} className="text-white" />
        </div>
        <h2 className="text-white text-xl font-bold mb-2">Join IV</h2>
        <p className="text-iv-text-secondary text-sm mb-6">Sign in to manage your shows and tickets</p>
        <button
          onClick={() => navigate('/auth')}
          className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-base btn-press"
        >
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
    <div className="page-content bg-iv-bg">
      <div className="relative">
        <div className="absolute inset-0 h-64 bg-gradient-to-b from-purple-900/40 via-iv-bg/80 to-iv-bg pointer-events-none" />

        {/* Top Bar: Edit + Logout */}
        <div className="relative flex justify-between items-center px-4 pt-4">
          <button
            onClick={() => setShowEditModal(true)}
            className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center btn-press"
          >
            <Edit3 size={16} className="text-white" />
          </button>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 btn-press"
          >
            <LogOut size={14} className="text-red-400" />
            <span className="text-red-400 text-xs font-semibold">
              {loggingOut ? 'Logging out...' : 'Logout'}
            </span>
          </button>
        </div>

        {/* Profile Section */}
        <div className="relative flex flex-col items-center pt-4 pb-6">
          <div className="relative mb-4">
            <div className="w-28 h-28 rounded-full p-[3px] bg-gradient-to-br from-purple-500 via-purple-600 to-violet-700">
              <div className="w-full h-full rounded-full overflow-hidden bg-iv-card border-2 border-iv-bg">
                <img src={avatarUrl} alt={displayName} className="w-full h-full object-cover" />
              </div>
            </div>
            <button
              onClick={() => setShowEditModal(true)}
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-iv-purple flex items-center justify-center border-2 border-iv-bg btn-press"
            >
              <Camera size={14} className="text-white" />
            </button>
          </div>

          <div className="flex items-center gap-1.5 mb-1">
            <h1 className="text-white text-2xl font-bold">{displayName}</h1>
            {isHost && <BadgeCheck size={22} className="text-iv-purple fill-iv-purple/20" />}
          </div>

          {username && (
            <p className="text-iv-text-secondary text-sm mb-1">@{username}</p>
          )}

          <div className="flex items-center gap-2 mb-2">
            <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
              isHost
                ? 'text-iv-purple bg-iv-purple/10 border border-iv-purple/20'
                : 'text-iv-text-secondary bg-white/5'
            }`}>
              {isHost ? 'Host' : 'Viewer'}
            </span>
          </div>

          <p className="text-iv-text-muted text-xs">{user.email}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-2 gap-3">
          {statCards.map(({ icon: Icon, value, label, iconColor, iconBg }) => (
            <div key={label} className="bg-iv-card border border-iv-card-border rounded-2xl p-4">
              <div className={`w-8 h-8 rounded-lg ${iconBg} flex items-center justify-center mb-3`}>
                <Icon size={18} className={iconColor} />
              </div>
              <p className="text-white font-bold text-2xl leading-none mb-1">{value}</p>
              <p className="text-iv-text-muted text-xs">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Become Host CTA */}
      {!isHost && (
        <div className="px-4 mb-6">
          <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 border border-iv-purple/20 rounded-2xl p-5 text-center">
            <h3 className="text-white font-bold text-lg mb-1">Want to host shows?</h3>
            <p className="text-iv-text-secondary text-sm mb-4">Create and sell tickets for your own live events</p>
            <button
              onClick={handleBecomeHost}
              disabled={becomingHost}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-sm btn-press disabled:opacity-50"
            >
              {becomingHost ? 'Setting up...' : 'Become a Host'}
            </button>
          </div>
        </div>
      )}

      {/* My Shows (Hosts only) */}
      {isHost && (
        <div className="px-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-white text-lg font-bold">My Shows</h2>
              <span className="bg-iv-purple/20 text-iv-purple text-[11px] font-bold px-2 py-0.5 rounded-full">
                {myShows.length}
              </span>
            </div>
            <button
              onClick={() => navigate('/create-show')}
              className="flex items-center gap-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full px-3 py-1.5 btn-press"
            >
              <Plus size={14} className="text-white" />
              <span className="text-white text-xs font-semibold">New Show</span>
            </button>
          </div>

          {loadingData ? (
            <div className="flex justify-center py-8">
              <Loader2 size={24} className="text-iv-purple animate-spin" />
            </div>
          ) : myShows.length > 0 ? (
            <div className="space-y-4">
              {myShows.map((show) => (
                <EventCard key={show.id} show={show} onClick={() => navigate(`/show/${show.id}`)} />
              ))}
            </div>
          ) : (
            <div className="bg-iv-card border border-iv-card-border rounded-2xl p-6 flex flex-col items-center text-center">
              <CalendarDays size={24} className="text-iv-text-muted mb-3" />
              <p className="text-iv-text-secondary text-sm mb-1">No shows yet</p>
              <p className="text-iv-text-muted text-xs">Create your first show to start selling tickets</p>
            </div>
          )}
        </div>
      )}

      {/* My Tickets */}
      <div className="px-4 mb-6">
        <h2 className="text-white text-lg font-bold mb-4">My Tickets</h2>
        {loadingData ? (
          <div className="flex justify-center py-8">
            <Loader2 size={24} className="text-iv-purple animate-spin" />
          </div>
        ) : myTicketShows.length > 0 ? (
          <div className="space-y-3">
            {myTicketShows.map((show) => (
              <button
                key={show.id}
                onClick={() => navigate(`/show/${show.id}`)}
                className="w-full bg-iv-card border border-iv-card-border rounded-xl p-4 flex items-center gap-3 text-left btn-press"
              >
                <div className="w-10 h-10 rounded-lg bg-iv-purple/20 flex items-center justify-center flex-shrink-0">
                  <Ticket size={18} className="text-iv-purple" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-semibold truncate">{show.title}</p>
                  <p className="text-iv-text-muted text-xs">{formatShowDate(show.show_date)} {formatTime(show.show_date)}</p>
                </div>
                {show.is_live && (
                  <div className="live-badge flex items-center gap-1 bg-red-500 rounded-full px-2 py-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    <span className="text-white text-[10px] font-bold">LIVE</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        ) : (
          <div className="bg-iv-card border border-iv-card-border rounded-2xl p-6 flex flex-col items-center text-center">
            <Ticket size={24} className="text-iv-text-muted mb-3" />
            <p className="text-iv-text-secondary text-sm mb-1">No tickets yet</p>
            <p className="text-iv-text-muted text-xs">Purchase a ticket to access premium shows</p>
          </div>
        )}
      </div>

      {/* Menu Items */}
      <div className="px-4 mb-8">
        <div className="bg-iv-card border border-iv-card-border rounded-2xl overflow-hidden divide-y divide-iv-card-border">
          {menuItems.map(({ icon: Icon, label, color }) => (
            <button
              key={label}
              className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors btn-press"
            >
              <div className="flex items-center gap-3">
                <Icon size={20} className={color} />
                <span className="text-white text-sm font-medium">{label}</span>
              </div>
              <ChevronRight size={16} className="text-iv-text-muted" />
            </button>
          ))}
        </div>
      </div>

      <div className="h-8" />

      {/* Edit Profile Modal */}
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
