import { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Clock,
  Users,
  Ticket,
  Crown,
  Globe,
  Radio,
  BadgeCheck,
} from 'lucide-react'
import { MOCK_SHOWS } from '../lib/mockData'
import { useAuth } from '../context/AuthContext'
import type { ShowWithHost } from '../types'

// ─── Helpers ─────────────────────────────────────────────────────────────────
function formatPrice(cents: number) {
  return (cents / 100).toFixed(2)
}

function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}

function useCountdown(targetDateStr: string) {
  const [timeLeft, setTimeLeft] = useState('')
  useEffect(() => {
    function calc() {
      const diff = new Date(targetDateStr).getTime() - Date.now()
      if (diff <= 0) return setTimeLeft('Live Now')
      const d = Math.floor(diff / 86400000)
      const h = Math.floor((diff % 86400000) / 3600000)
      const m = Math.floor((diff % 3600000) / 60000)
      if (d > 0) setTimeLeft(`${d}d ${h}h ${m}m`)
      else if (h > 0) setTimeLeft(`${h}h ${m}m`)
      else setTimeLeft(`${m}m`)
    }
    calc()
    const id = setInterval(calc, 30000)
    return () => clearInterval(id)
  }, [targetDateStr])
  return timeLeft
}

// Category emoji map
const CATEGORY_EMOJI: Record<string, string> = {
  Music: '🎵',
  Comedy: '😂',
  Dance: '💃',
  Talent: '⭐',
  'Talk Show': '🎙',
  Other: '🎭',
}

// Category colors
const CATEGORY_GRADIENT: Record<string, string> = {
  Music: 'from-blue-600/30 via-indigo-600/15 to-transparent',
  Comedy: 'from-yellow-600/30 via-orange-600/15 to-transparent',
  Dance: 'from-pink-600/30 via-rose-600/15 to-transparent',
  Talent: 'from-emerald-600/30 via-teal-600/15 to-transparent',
  'Talk Show': 'from-purple-600/30 via-violet-600/15 to-transparent',
  Other: 'from-gray-600/20 via-slate-600/10 to-transparent',
}

// ─── Featured Card ────────────────────────────────────────────────────────────
function FeaturedCard({ show, onClick }: { show: ShowWithHost; onClick: () => void }) {
  const countdown = useCountdown(show.show_date)
  const soldPct = Math.round((show.tickets_sold / show.total_tickets) * 100)

  const bgImages: Record<string, string> = {
    Comedy: 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=600&h=400&fit=crop',
    Music: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop',
    Dance: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=600&h=400&fit=crop',
    Talent: 'https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?w=600&h=400&fit=crop',
    'Talk Show': 'https://images.unsplash.com/photo-1559163499-413811fb2344?w=600&h=400&fit=crop',
    Other: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=600&h=400&fit=crop',
  }

  const bg = show.cover_image_url || bgImages[show.category] || bgImages.Other

  return (
    <div
      onClick={onClick}
      className="relative rounded-3xl overflow-hidden cursor-pointer border border-yellow-500/20 card-hover"
      style={{ minHeight: 280 }}
    >
      {/* Full-bleed image */}
      <img src={bg} alt="" className="absolute inset-0 w-full h-full object-cover" />
      {/* Cinematic overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/20 via-transparent to-purple-900/30" />

      <div className="relative p-5 flex flex-col h-full" style={{ minHeight: 280 }}>
        {/* Top badges */}
        <div className="flex items-center justify-between mb-auto">
          <div className="flex items-center gap-2">
            {show.is_featured && (
              <span className="flex items-center gap-1 bg-yellow-500/90 rounded-full px-2.5 py-1">
                <Crown size={10} className="text-black" />
                <span className="text-black text-[10px] font-black uppercase tracking-wider">Featured</span>
              </span>
            )}
            {show.is_live && (
              <span className="flex items-center gap-1 bg-red-500 rounded-full px-2 py-0.5 live-badge">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                <span className="text-white text-[10px] font-bold uppercase">Live</span>
              </span>
            )}
          </div>
          <span className="flex items-center gap-1 glass rounded-full px-2 py-1">
            <Globe size={10} className="text-white/60" />
            <span className="text-white/60 text-[10px] font-medium">Global</span>
          </span>
        </div>

        {/* Content at bottom */}
        <div className="mt-4">
          {/* Host */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-yellow-400/60">
              <img
                src={show.host_avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${show.host_id}`}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center gap-1">
              <span className="text-white font-semibold text-sm">{show.host_display_name}</span>
              <BadgeCheck size={14} className="text-purple-400" />
            </div>
            <span className="ml-auto flex items-center gap-1 text-white/50">
              <Users size={11} />
              <span className="text-xs">{show.tickets_sold} sold</span>
            </span>
          </div>

          <h2 className="text-white font-black text-2xl mb-1 leading-tight">{show.title}</h2>
          <p className="text-white/55 text-xs mb-3 line-clamp-2 leading-relaxed">{show.description}</p>

          {/* Ticket progress */}
          <div className="mb-3.5">
            <div className="flex justify-between mb-1">
              <span className="text-white/40 text-[10px]">{show.tickets_sold}/{show.total_tickets} tickets</span>
              <span className="text-white/40 text-[10px]">{soldPct}% sold</span>
            </div>
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-orange-400"
                style={{ width: `${soldPct}%`, transition: 'width 0.5s ease' }}
              />
            </div>
          </div>

          {/* Bottom row */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-white/10 rounded-lg px-2.5 py-1.5">
              <Clock size={12} className="text-white/60" />
              <span className="text-white text-xs font-semibold">
                {countdown === 'Live Now' ? 'Live Now' : `In ${countdown}`}
              </span>
            </div>
            <div className="flex items-center gap-1.5 bg-yellow-400/15 rounded-lg px-2.5 py-1.5">
              <Ticket size={12} className="text-yellow-400" />
              <span className="text-yellow-400 text-xs font-bold">${formatPrice(show.ticket_price)}</span>
            </div>
            <button className="ml-auto px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-black text-xs btn-press glow-gold">
              {show.is_live ? 'Watch Now' : 'Get Ticket'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Show Card ────────────────────────────────────────────────────────────────
function ShowCard({ show, onClick }: { show: ShowWithHost; onClick: () => void }) {
  const countdown = useCountdown(show.show_date)
  const soldPct = Math.round((show.tickets_sold / show.total_tickets) * 100)
  const emoji = CATEGORY_EMOJI[show.category] || '🎭'
  const gradient = CATEGORY_GRADIENT[show.category] || CATEGORY_GRADIENT.Other

  return (
    <div
      onClick={onClick}
      className="relative bg-[#0f0f28] border border-white/[0.07] rounded-2xl overflow-hidden cursor-pointer card-hover"
    >
      <div className={`absolute inset-0 bg-gradient-to-b ${gradient} pointer-events-none`} />
      {/* Top accent */}
      <div className="h-0.5 bg-gradient-to-r from-purple-500/50 via-pink-500/30 to-transparent" />

      <div className="relative p-4">
        {/* Row: category + price + live */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <span className="text-white/50 text-xs bg-white/5 px-2 py-0.5 rounded-full">
              {emoji} {show.category}
            </span>
            {show.is_live && (
              <span className="flex items-center gap-0.5 bg-red-500 rounded-full px-1.5 py-0.5 live-badge">
                <div className="w-1 h-1 rounded-full bg-white" />
                <span className="text-white text-[8px] font-bold uppercase">Live</span>
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Ticket size={12} className="text-yellow-400" />
            <span className="text-yellow-400 text-sm font-bold">${formatPrice(show.ticket_price)}</span>
          </div>
        </div>

        {/* Host */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-9 h-9 rounded-full overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500">
            <img
              src={show.host_avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${show.host_id}`}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-white font-semibold text-sm leading-tight flex items-center gap-1">
              {show.host_display_name}
              <BadgeCheck size={12} className="text-purple-400" />
            </p>
            <p className="text-white/35 text-[10px]">{show.tickets_sold} tickets sold</p>
          </div>
          <div className="ml-auto flex items-center gap-1 text-white/40">
            <Globe size={11} />
            <span className="text-[10px]">Global</span>
          </div>
        </div>

        {/* Title + desc */}
        <h3 className="text-white font-bold text-base mb-1 leading-snug">{show.title}</h3>
        <p className="text-white/40 text-xs mb-3 line-clamp-2 leading-relaxed">{show.description}</p>

        {/* Countdown */}
        <div className="flex items-center gap-1.5 mb-3">
          <Clock size={11} className="text-purple-400" />
          <span className="text-purple-400 text-xs font-semibold">
            {countdown === 'Live Now' ? '🔴 Live Now' : `Starts in ${countdown}`}
          </span>
          <span className="text-white/25 text-xs">• {formatTime(show.show_date)}</span>
        </div>

        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex justify-between mb-1">
            <span className="text-white/30 text-[10px]">Tickets sold</span>
            <span className="text-white/50 text-[10px] font-semibold">{soldPct}%</span>
          </div>
          <div className="h-1 bg-white/8 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
              style={{ width: `${soldPct}%` }}
            />
          </div>
        </div>

        <button className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-sm btn-press hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
          <Ticket size={14} />
          Get Ticket
        </button>
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
const ALL_CATEGORIES = ['All', 'Comedy', 'Music', 'Dance', 'Talent', 'Talk Show']

export default function ShowPage() {
  const [shows, setShows] = useState<ShowWithHost[]>([])
  const [activeCategory, setActiveCategory] = useState('All')
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    setShows(MOCK_SHOWS)
  }, [])

  const featured = shows.find((s) => s.is_featured || s.is_live) || shows[0]

  const filtered = useMemo(() => {
    const rest = shows.filter((s) => s.id !== featured?.id)
    if (activeCategory === 'All') return rest
    return rest.filter((s) => s.category === activeCategory)
  }, [shows, featured, activeCategory])

  return (
    <div className="page-content bg-[#07071a]">
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-yellow-700/6 blur-3xl" />
        <div className="absolute bottom-20 left-0 w-56 h-56 rounded-full bg-purple-700/8 blur-3xl" />
      </div>

      <div className="relative px-4 pt-6 pb-8">
        {/* Header */}
        <div className="mb-5">
          <h1 className="text-3xl font-black uppercase tracking-tight mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
            <span className="gradient-text-gold">Premium</span>{' '}
            <span className="text-white">Shows</span>
          </h1>
          <p className="text-white/40 text-sm">Exclusive global performances — anywhere in the world</p>
        </div>

        {/* Stats strip */}
        <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1">
          {[
            { icon: '🎟', label: `${shows.length} Shows` },
            { icon: '🔴', label: `${shows.filter(s => s.is_live).length} Live` },
            shows.length > 0
              ? { icon: '💰', label: `From $${formatPrice(Math.min(...shows.map(s => s.ticket_price)))}` }
              : null,
            { icon: '🌍', label: 'Global Access' },
          ].filter(Boolean).map((item) => (
            <div key={item!.label} className="flex items-center gap-1.5 bg-[#0f0f28] border border-white/[0.07] rounded-full px-3 py-1.5 whitespace-nowrap flex-shrink-0">
              <span className="text-sm leading-none">{item!.icon}</span>
              <span className="text-white/70 text-xs font-semibold">{item!.label}</span>
            </div>
          ))}
        </div>

        {/* Featured */}
        {featured && (
          <div className="mb-6">
            <FeaturedCard show={featured} onClick={() => navigate(`/show/${featured.id}`)} />
          </div>
        )}

        {/* Category Filters */}
        <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold whitespace-nowrap flex-shrink-0 btn-press transition-all ${activeCategory === cat
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white glow-purple'
                  : 'bg-[#0f0f28] border border-white/[0.07] text-white/50 hover:text-white/70'
                }`}
            >
              {cat !== 'All' && <span>{CATEGORY_EMOJI[cat]}</span>}
              {cat}
            </button>
          ))}
        </div>

        {/* Show cards */}
        {filtered.length === 0 ? (
          <div className="bg-[#0f0f28] border border-white/[0.07] rounded-2xl p-8 flex flex-col items-center text-center">
            <span className="text-4xl mb-3">🎭</span>
            <p className="text-white/50 text-sm mb-1">No {activeCategory !== 'All' ? activeCategory : ''} shows yet</p>
            <p className="text-white/25 text-xs">Check back soon for exclusive events</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((show) => (
              <ShowCard key={show.id} show={show} onClick={() => navigate(`/show/${show.id}`)} />
            ))}
          </div>
        )}

        {/* My Tickets */}
        <div className="mt-8">
          <h2 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
            <Ticket size={16} className="text-purple-400" />
            My Tickets
          </h2>
          {!user ? (
            <div className="bg-[#0f0f28] border border-white/[0.07] rounded-2xl p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-purple-500/15 flex items-center justify-center mb-3">
                <Ticket size={22} className="text-purple-400" />
              </div>
              <p className="text-white/50 text-sm mb-3">Sign in to see your tickets</p>
              <button
                onClick={() => navigate('/auth')}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold btn-press"
              >
                Sign In
              </button>
            </div>
          ) : (
            <div className="bg-[#0f0f28] border border-white/[0.07] rounded-2xl p-6 flex flex-col items-center text-center">
              <Ticket size={22} className="text-white/20 mb-3" />
              <p className="text-white/40 text-sm">No tickets yet</p>
              <p className="text-white/20 text-xs mt-1">Purchase a ticket to access premium shows</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
