import { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Clock,
  Users,
  Ticket,
  Loader2,
  Play,
  CheckCircle2,
  AlertCircle,
  BadgeCheck,
  Globe,
  Lock,
} from 'lucide-react'
import { MOCK_SHOWS } from '../lib/mockData'
import { useAuth } from '../context/AuthContext'
import type { ShowWithHost } from '../types'

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}
function formatPrice(cents: number) {
  return (cents / 100).toFixed(2)
}
function extractYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|live\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  )
  return match ? match[1] : null
}

const BG_IMAGES: Record<string, string> = {
  Comedy: 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=600&h=400&fit=crop',
  Music: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop',
  Dance: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=600&h=400&fit=crop',
  Talent: 'https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?w=600&h=400&fit=crop',
  'Talk Show': 'https://images.unsplash.com/photo-1559163499-413811fb2344?w=600&h=400&fit=crop',
  Other: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=600&h=400&fit=crop',
}

// Circular progress arc
function TicketArc({ pct }: { pct: number }) {
  const r = 26
  const circ = 2 * Math.PI * r
  const offset = circ - (pct / 100) * circ
  return (
    <svg width={64} height={64} viewBox="0 0 64 64" className="-rotate-90">
      <circle cx={32} cy={32} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={5} />
      <circle
        cx={32} cy={32} r={r} fill="none"
        stroke="url(#ticketGrad)" strokeWidth={5}
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        style={{ transition: 'stroke-dashoffset 0.6s ease' }}
      />
      <defs>
        <linearGradient id="ticketGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default function ShowDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [show, setShow] = useState<ShowWithHost | null>(null)
  const [hasTicket, setHasTicket] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const [isHost] = useState(false)
  const [youtubeInput, setYoutubeInput] = useState('')
  const [updatingShow] = useState(false)

  const fetchData = useCallback(() => {
    if (!id) return
    const found = MOCK_SHOWS.find((s) => s.id === id) || null
    setShow(found)
    if (found) setYoutubeInput(found.youtube_url || '')
    setLoading(false)
  }, [id])

  useEffect(() => { fetchData() }, [fetchData])

  function handleBuyTicket() {
    if (!user) { navigate('/auth'); return }
    setHasTicket(true)
    setSuccessMsg('🎟 Ticket granted! You now have access to this show.')
  }

  function handleUpdateShow(updates: Partial<{ youtube_url: string; is_live: boolean }>) {
    if (!show || !isHost) return
    setShow({ ...show, ...updates })
  }

  if (loading) {
    return (
      <div className="page-content bg-[#07071a] flex items-center justify-center">
        <Loader2 size={32} className="text-purple-400 animate-spin" />
      </div>
    )
  }
  if (!show) {
    return (
      <div className="page-content bg-[#07071a] flex flex-col items-center justify-center px-6 text-center">
        <AlertCircle size={48} className="text-white/20 mb-4" />
        <p className="text-white text-lg font-bold mb-2">Show not found</p>
        <button onClick={() => navigate('/show')} className="text-purple-400 text-sm font-semibold">
          Back to Shows
        </button>
      </div>
    )
  }

  const videoId = show.youtube_url ? extractYouTubeId(show.youtube_url) : null
  const canWatch = hasTicket && show.is_live && videoId
  const soldPct = Math.round((show.tickets_sold / show.total_tickets) * 100)

  const heroImage = show.cover_image_url || BG_IMAGES[show.category] || BG_IMAGES.Other

  return (
    <div className="page-content bg-[#07071a] animate-fade-in">
      {/* ─── HERO ────────────────────────────────────────────────── */}
      <div className="relative w-full" style={{ height: 260 }}>
        <img src={heroImage} alt={show.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-[#07071a]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07071a] via-transparent to-transparent" />

        {/* Back button */}
        <button
          onClick={() => navigate('/show')}
          className="absolute top-4 left-4 w-10 h-10 rounded-full glass flex items-center justify-center btn-press z-10"
        >
          <ArrowLeft size={20} className="text-white" />
        </button>

        {/* Live badge */}
        {show.is_live && (
          <div className="absolute top-4 right-4 z-10">
            <span className="flex items-center gap-1 bg-red-500 rounded-full px-3 py-1 live-badge">
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
              <span className="text-white text-xs font-bold uppercase">Live Now</span>
            </span>
          </div>
        )}

        {canWatch ? (
          <div className="absolute inset-0">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
              title={show.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        ) : !show.is_live ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-full glass flex items-center justify-center">
                <Play size={24} className="text-white/50 ml-1" />
              </div>
              <span className="text-white/40 text-xs">Stream not started</span>
            </div>
          </div>
        ) : !hasTicket ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-full glass flex items-center justify-center">
                <Lock size={22} className="text-white/60" />
              </div>
              <span className="text-white text-xs font-semibold">Ticket required to watch</span>
            </div>
          </div>
        ) : null}
      </div>

      {/* ─── CONTENT ─────────────────────────────────────────────── */}
      <div className="px-4 pb-10 -mt-2">
        {/* Category + ticket status */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="text-[11px] font-semibold text-white/50 bg-white/5 px-2.5 py-1 rounded-full">
            {show.category}
          </span>
          <span className="text-[11px] font-semibold text-white/40 bg-white/5 px-2.5 py-1 rounded-full flex items-center gap-1">
            <Globe size={10} />
            Global
          </span>
          {hasTicket && (
            <span className="text-[11px] font-semibold text-green-400 bg-green-400/10 border border-green-400/20 px-2.5 py-1 rounded-full flex items-center gap-1">
              <CheckCircle2 size={10} />
              Ticket Owned
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-white font-black text-2xl mb-3 leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
          {show.title}
        </h1>

        {/* Host row */}
        <div className="flex items-center gap-3 mb-4 bg-[#0f0f28] border border-white/[0.07] rounded-xl p-3">
          <div className="w-11 h-11 rounded-full overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500 p-[2px]">
            <div className="w-full h-full rounded-full overflow-hidden bg-[#0f0f28]">
              <img
                src={show.host_avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${show.host_id}`}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div>
            <p className="text-white font-bold text-sm flex items-center gap-1">
              {show.host_display_name || show.host_username}
              <BadgeCheck size={14} className="text-purple-400" />
            </p>
            <p className="text-white/40 text-xs flex items-center gap-1">
              <Users size={10} />
              {show.tickets_sold} tickets sold
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-white/55 text-sm leading-relaxed mb-5">{show.description}</p>

        {/* Details + Ticket Arc grid */}
        <div className="flex items-start gap-3 mb-5">
          <div className="flex-1 space-y-2">
            <div className="bg-[#0f0f28] border border-white/[0.07] rounded-xl p-3">
              <p className="text-white/35 text-[10px] font-medium uppercase tracking-widest mb-1">Date & Time</p>
              <p className="text-white text-sm font-semibold">{formatDate(show.show_date)}</p>
              <p className="text-white/50 text-xs">{formatTime(show.show_date)}</p>
            </div>
            <div className="bg-[#0f0f28] border border-white/[0.07] rounded-xl p-3">
              <p className="text-white/35 text-[10px] font-medium uppercase tracking-widest mb-1">Ticket Price</p>
              <p className="text-yellow-400 text-lg font-black">${formatPrice(show.ticket_price)}</p>
            </div>
          </div>

          {/* Ticket arc */}
          <div className="bg-[#0f0f28] border border-white/[0.07] rounded-xl p-3 flex flex-col items-center justify-center" style={{ minWidth: 110 }}>
            <div className="relative flex items-center justify-center mb-1">
              <TicketArc pct={soldPct} />
              <div className="absolute flex flex-col items-center">
                <span className="text-white font-black text-sm">{soldPct}%</span>
              </div>
            </div>
            <p className="text-white/35 text-[10px] font-medium text-center">Sold</p>
            <p className="text-white/50 text-[10px] text-center">{show.tickets_sold}/{show.total_tickets}</p>
          </div>
        </div>

        {/* Messages */}
        {successMsg && (
          <div className="bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3 mb-4 flex items-center gap-2">
            <CheckCircle2 size={18} className="text-green-400 flex-shrink-0" />
            <p className="text-green-400 text-sm">{successMsg}</p>
          </div>
        )}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-4 flex items-center gap-2">
            <AlertCircle size={18} className="text-red-400 flex-shrink-0" />
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* CTA */}
        {!isHost && !hasTicket && (
          <button
            onClick={handleBuyTicket}
            className="w-full py-4 rounded-2xl text-white font-black text-base btn-press glow-gold flex items-center justify-center gap-2 mb-4 animate-slide-up"
            style={{
              background: 'linear-gradient(135deg, #EAB308 0%, #F97316 50%, #ec4899 100%)',
            }}
          >
            <Ticket size={20} />
            Get Ticket — ${formatPrice(show.ticket_price)}
          </button>
        )}

        {hasTicket && !show.is_live && (
          <div className="bg-[#0f0f28] border border-green-500/20 rounded-xl p-4 text-center mb-4">
            <CheckCircle2 size={22} className="text-green-400 mx-auto mb-2" />
            <p className="text-white text-sm font-bold">You're in! 🎉</p>
            <p className="text-white/40 text-xs mt-1">Show becomes available when the host goes live</p>
          </div>
        )}

        {hasTicket && show.is_live && !videoId && (
          <div className="bg-[#0f0f28] border border-purple-500/20 rounded-xl p-4 text-center mb-4">
            <Loader2 size={20} className="text-purple-400 mx-auto mb-2 animate-spin" />
            <p className="text-white text-sm font-bold">Stream starting soon...</p>
            <p className="text-white/40 text-xs mt-1">The host is setting up the stream</p>
          </div>
        )}

        {/* Host controls */}
        {isHost && (
          <div className="mt-4 bg-[#0f0f28] border border-white/[0.07] rounded-2xl p-4">
            <h3 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              <Users size={16} className="text-purple-400" />
              Host Controls
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-white/40 text-xs font-medium mb-1.5 block">YouTube Stream URL</label>
                <input
                  type="url"
                  value={youtubeInput}
                  onChange={(e) => setYoutubeInput(e.target.value)}
                  placeholder="https://youtube.com/watch?v=... or /live/..."
                  className="w-full bg-[#07071a] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-purple-500 transition-colors"
                />
                <button
                  onClick={() => handleUpdateShow({ youtube_url: youtubeInput.trim() || (null as any) })}
                  disabled={updatingShow}
                  className="mt-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs font-semibold btn-press disabled:opacity-50"
                >
                  {updatingShow ? 'Saving...' : 'Save URL'}
                </button>
              </div>
              <div className="flex items-center justify-between p-3 bg-[#07071a] rounded-xl">
                <div>
                  <p className="text-white text-sm font-semibold">{show.is_live ? 'Show is LIVE' : 'Go Live'}</p>
                  <p className="text-white/35 text-xs">{show.is_live ? 'Ticket holders can now watch' : 'Make show visible to ticket holders'}</p>
                </div>
                <button
                  onClick={() => handleUpdateShow({ is_live: !show.is_live })}
                  disabled={updatingShow}
                  className={`px-4 py-2 rounded-full text-xs font-black btn-press ${show.is_live ? 'bg-red-500 text-white' : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                    }`}
                >
                  {show.is_live ? 'End Show' : 'Go Live'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Clock icon row at bottom for extra context */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-white/[0.05]">
          <Clock size={12} className="text-white/25" />
          <span className="text-white/25 text-xs">{formatDate(show.show_date)} at {formatTime(show.show_date)}</span>
        </div>
      </div>
    </div>
  )
}
