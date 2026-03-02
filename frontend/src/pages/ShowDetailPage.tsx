import { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Clock,
  Users,
  Ticket,
  Loader2,
  Lock,
  Play,
  CalendarDays,
  CheckCircle2,
  AlertCircle,
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

export default function ShowDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [show, setShow] = useState<ShowWithHost | null>(null)
  const [hasTicket, setHasTicket] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  // Host management state
  const [isHost, setIsHost] = useState(false)
  const [youtubeInput, setYoutubeInput] = useState('')
  const [updatingShow, setUpdatingShow] = useState(false)

  const fetchData = useCallback(() => {
    if (!id) return
    const found = MOCK_SHOWS.find((s) => s.id === id) || null
    setShow(found)
    if (found) setYoutubeInput(found.youtube_url || '')
    setLoading(false)
  }, [id])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  // No Stripe redirect handling in demo mode

  function handleBuyTicket() {
    if (!user) {
      navigate('/auth')
      return
    }
    // Mock: instantly grant ticket
    setHasTicket(true)
    setSuccessMsg('Ticket granted! You now have access to this show.')
  }

  function handleUpdateShow(updates: Partial<{ youtube_url: string; is_live: boolean }>) {
    if (!show || !isHost) return
    setShow({ ...show, ...updates })
  }

  if (loading) {
    return (
      <div className="page-content bg-iv-bg flex items-center justify-center">
        <Loader2 size={32} className="text-iv-purple animate-spin" />
      </div>
    )
  }

  if (!show) {
    return (
      <div className="page-content bg-iv-bg flex flex-col items-center justify-center px-6 text-center">
        <AlertCircle size={48} className="text-iv-text-muted mb-4" />
        <p className="text-white text-lg font-bold mb-2">Show not found</p>
        <button onClick={() => navigate('/show')} className="text-iv-purple text-sm font-semibold">
          Back to Shows
        </button>
      </div>
    )
  }

  const videoId = show.youtube_url ? extractYouTubeId(show.youtube_url) : null
  const canWatch = hasTicket && show.is_live && videoId

  return (
    <div className="page-content bg-iv-bg">
      <div className="px-4 pt-4 pb-8">
        {/* Header */}
        <button onClick={() => navigate('/show')} className="mb-4 btn-press">
          <ArrowLeft size={24} className="text-white" />
        </button>

        {/* Video Player / Cover */}
        {canWatch ? (
          <div className="rounded-2xl overflow-hidden mb-5 aspect-video bg-black">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
              title={show.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        ) : (
          <div className="relative rounded-2xl overflow-hidden mb-5 aspect-video bg-iv-card border border-iv-card-border">
            {show.cover_image_url ? (
              <img src={show.cover_image_url} alt={show.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-900/40 to-pink-900/40" />
            )}
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
              {show.is_live ? (
                <>
                  <Lock size={32} className="text-white mb-2" />
                  <p className="text-white font-bold text-sm">Get a ticket to watch</p>
                </>
              ) : (
                <>
                  <Play size={32} className="text-white/50 mb-2" />
                  <p className="text-white/50 text-sm">Show hasn't started yet</p>
                </>
              )}
            </div>
            {show.is_live && (
              <div className="absolute top-3 left-3 live-badge flex items-center gap-1 bg-red-500 rounded-full px-2 py-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                <span className="text-white text-[10px] font-bold uppercase">Live</span>
              </div>
            )}
          </div>
        )}

        {/* Success/Error Messages */}
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


        {/* Show Info */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-semibold text-iv-text-secondary bg-white/5 px-2.5 py-1 rounded-full">
              {show.category}
            </span>
            {hasTicket && (
              <span className="text-[11px] font-semibold text-green-400 bg-green-400/10 px-2.5 py-1 rounded-full flex items-center gap-1">
                <Ticket size={10} />
                Ticket Owned
              </span>
            )}
          </div>
          <h1 className="text-white font-bold text-2xl mb-2 leading-tight">{show.title}</h1>
          <p className="text-iv-text-secondary text-sm leading-relaxed">{show.description}</p>
        </div>

        {/* Host */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500 p-[2px]">
            <div className="w-full h-full rounded-full overflow-hidden bg-iv-card">
              <img
                src={show.host_avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${show.host_id}`}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div>
            <p className="text-white font-semibold">{show.host_display_name || show.host_username}</p>
            <p className="text-iv-text-muted text-xs">Host</p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-iv-card border border-iv-card-border rounded-xl p-3">
            <CalendarDays size={16} className="text-iv-text-secondary mb-2" />
            <p className="text-white text-sm font-semibold">{formatDate(show.show_date)}</p>
            <p className="text-iv-text-muted text-xs">{formatTime(show.show_date)}</p>
          </div>
          <div className="bg-iv-card border border-iv-card-border rounded-xl p-3">
            <Ticket size={16} className="text-iv-gold mb-2" />
            <p className="text-white text-sm font-semibold">${formatPrice(show.ticket_price)}</p>
            <p className="text-iv-text-muted text-xs">{show.tickets_sold}/{show.total_tickets} sold</p>
          </div>
        </div>

        {/* Action Button */}
        {!isHost && !hasTicket && (
          <button
            onClick={handleBuyTicket}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-base btn-press hover:opacity-90 transition-opacity flex items-center justify-center gap-2 mb-4"
          >
            <Ticket size={20} />
            {`Get Ticket — $${formatPrice(show.ticket_price)}`}
          </button>
        )}

        {hasTicket && !show.is_live && (
          <div className="bg-iv-card border border-iv-card-border rounded-xl p-4 text-center mb-4">
            <Clock size={20} className="text-iv-text-secondary mx-auto mb-2" />
            <p className="text-white text-sm font-semibold">You're in!</p>
            <p className="text-iv-text-muted text-xs">The show will be available here once the host goes live.</p>
          </div>
        )}

        {hasTicket && show.is_live && !videoId && (
          <div className="bg-iv-card border border-iv-card-border rounded-xl p-4 text-center mb-4">
            <Loader2 size={20} className="text-iv-purple mx-auto mb-2 animate-spin" />
            <p className="text-white text-sm font-semibold">Stream starting soon...</p>
            <p className="text-iv-text-muted text-xs">The host is setting up the stream.</p>
          </div>
        )}

        {/* Host Controls */}
        {isHost && (
          <div className="mt-6 bg-iv-card border border-iv-card-border rounded-2xl p-4">
            <h3 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              <Users size={16} className="text-iv-purple" />
              Host Controls
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-iv-text-secondary text-xs font-medium mb-1.5 block">
                  YouTube Stream URL
                </label>
                <input
                  type="url"
                  value={youtubeInput}
                  onChange={(e) => setYoutubeInput(e.target.value)}
                  placeholder="https://youtube.com/watch?v=... or /live/..."
                  className="w-full bg-iv-bg border border-iv-card-border rounded-xl px-4 py-3 text-white text-sm placeholder:text-iv-text-muted focus:outline-none focus:border-iv-purple transition-colors"
                />
                <button
                  onClick={() => handleUpdateShow({ youtube_url: youtubeInput.trim() || null as any })}
                  disabled={updatingShow}
                  className="mt-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs font-semibold btn-press disabled:opacity-50"
                >
                  {updatingShow ? 'Saving...' : 'Save URL'}
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-iv-bg rounded-xl">
                <div>
                  <p className="text-white text-sm font-semibold">
                    {show.is_live ? 'Show is LIVE' : 'Go Live'}
                  </p>
                  <p className="text-iv-text-muted text-xs">
                    {show.is_live
                      ? 'Ticket holders can now watch'
                      : 'Make your show visible to ticket holders'}
                  </p>
                </div>
                <button
                  onClick={() => handleUpdateShow({ is_live: !show.is_live })}
                  disabled={updatingShow}
                  className={`px-4 py-2 rounded-full text-xs font-bold btn-press ${show.is_live
                    ? 'bg-red-500 text-white'
                    : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                    }`}
                >
                  {show.is_live ? 'End Show' : 'Go Live'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
