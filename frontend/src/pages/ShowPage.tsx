import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Clock,
  Users,
  Star,
  Ticket,
  Crown,
  CalendarDays,
  Lock,
  Loader2,
  Radio,
} from 'lucide-react'
import { MOCK_SHOWS } from '../lib/mockData'
import { useAuth } from '../context/AuthContext'
import type { ShowWithHost } from '../types'

function formatShowDate(dateStr: string) {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = date.getTime() - now.getTime()
  const diffHours = diffMs / (1000 * 60 * 60)

  if (diffHours < 0 && diffHours > -3) return 'Live Now'
  if (diffHours >= 0 && diffHours < 24) return 'Today'
  if (diffHours >= 24 && diffHours < 48) return 'Tomorrow'
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}

function formatPrice(cents: number) {
  return (cents / 100).toFixed(2)
}

function FeaturedShowCard({ show, onClick }: { show: ShowWithHost; onClick: () => void }) {
  return (
    <div className="relative rounded-2xl overflow-hidden border border-iv-gold/30 cursor-pointer" onClick={onClick}>
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/20 via-orange-500/10 to-purple-600/20" />
      {show.cover_image_url && (
        <div className="absolute inset-0">
          <img src={show.cover_image_url} alt="" className="w-full h-full object-cover opacity-30" />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-iv-bg via-iv-bg/60 to-transparent" />

      <div className="relative p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {show.is_featured && (
              <div className="flex items-center gap-1.5 bg-iv-gold/20 border border-iv-gold/30 rounded-full px-2.5 py-1">
                <Crown size={12} className="text-iv-gold" />
                <span className="text-iv-gold text-[10px] font-bold uppercase tracking-wider">Featured</span>
              </div>
            )}
            {show.is_live && (
              <div className="live-badge flex items-center gap-1 bg-red-500 rounded-full px-2 py-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                <span className="text-white text-[10px] font-bold uppercase">Live Now</span>
              </div>
            )}
          </div>
          <span className="text-iv-text-secondary text-xs">{show.category}</span>
        </div>

        <div className="flex items-center gap-3 mb-3">
          <div className="w-11 h-11 rounded-full overflow-hidden bg-gradient-to-br from-yellow-400 to-orange-500 p-[2px]">
            <div className="w-full h-full rounded-full overflow-hidden bg-iv-card">
              <img
                src={show.host_avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${show.host_id}`}
                alt={show.host_display_name || ''}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div>
            <p className="text-white font-bold text-base">{show.host_display_name || show.host_username}</p>
            <div className="flex items-center gap-1">
              <Users size={11} className="text-iv-text-secondary" />
              <span className="text-iv-text-secondary text-xs">{show.tickets_sold} tickets sold</span>
            </div>
          </div>
        </div>

        <h2 className="text-white font-bold text-2xl mb-1.5 leading-tight">{show.title}</h2>
        <p className="text-iv-text-secondary text-sm mb-4 leading-relaxed">{show.description}</p>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-1.5 bg-white/5 rounded-lg px-2.5 py-1.5">
            <Clock size={13} className="text-iv-text-secondary" />
            <span className="text-white text-xs font-medium">{formatShowDate(show.show_date)} {formatTime(show.show_date)}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-iv-gold/10 rounded-lg px-2.5 py-1.5">
            <Ticket size={13} className="text-iv-gold" />
            <span className="text-iv-gold text-xs font-bold">${formatPrice(show.ticket_price)}</span>
          </div>
        </div>

        <button className="w-full py-3.5 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold text-base tracking-wide btn-press hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
          <Ticket size={18} />
          {show.is_live ? 'Watch Now' : 'Get Ticket'}
        </button>
      </div>
    </div>
  )
}

function ShowCard({ show, onClick }: { show: ShowWithHost; onClick: () => void }) {
  const gradients: Record<string, string> = {
    Music: 'from-blue-500/30 via-indigo-500/20 to-transparent',
    Comedy: 'from-yellow-500/30 via-orange-500/20 to-transparent',
    Dance: 'from-pink-500/30 via-rose-500/20 to-transparent',
    Talent: 'from-emerald-500/30 via-teal-500/20 to-transparent',
    'Talk Show': 'from-purple-500/30 via-violet-500/20 to-transparent',
    Other: 'from-gray-500/30 via-slate-500/20 to-transparent',
  }

  return (
    <div className="relative rounded-2xl overflow-hidden border border-iv-card-border bg-iv-card cursor-pointer" onClick={onClick}>
      <div className={`absolute inset-0 bg-gradient-to-b ${gradients[show.category] || gradients.Other} pointer-events-none`} />

      <div className="relative p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-iv-text-secondary text-xs bg-white/5 px-2 py-0.5 rounded-full">{show.category}</span>
            {show.is_live && (
              <div className="live-badge flex items-center gap-1 bg-red-500 rounded-full px-1.5 py-0.5">
                <div className="w-1 h-1 rounded-full bg-white" />
                <span className="text-white text-[9px] font-bold uppercase">Live</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Ticket size={12} className="text-iv-gold" />
            <span className="text-iv-gold text-sm font-bold">${formatPrice(show.ticket_price)}</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500">
            <img
              src={show.host_avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${show.host_id}`}
              alt={show.host_display_name || ''}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">{show.host_display_name || show.host_username}</p>
            <div className="flex items-center gap-1">
              <Users size={11} className="text-iv-text-muted" />
              <span className="text-iv-text-muted text-xs">{show.tickets_sold} sold</span>
            </div>
          </div>
        </div>

        <h3 className="text-white font-bold text-lg mb-1.5 leading-tight">{show.title}</h3>
        <p className="text-iv-text-secondary text-xs mb-3 leading-relaxed line-clamp-2">{show.description}</p>

        <div className="flex items-center gap-1.5 mb-4">
          <CalendarDays size={13} className="text-iv-text-secondary" />
          <span className="text-iv-text-secondary text-xs">{formatShowDate(show.show_date)} {formatTime(show.show_date)}</span>
        </div>

        <button className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-sm tracking-wide btn-press hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
          <Lock size={14} />
          Get Ticket
        </button>
      </div>
    </div>
  )
}

export default function ShowPage() {
  const [shows, setShows] = useState<ShowWithHost[]>([])
  const [myTickets, setMyTickets] = useState<{ show_id: string }[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    setShows(MOCK_SHOWS)
    setMyTickets([])
    setLoading(false)
  }, [])

  const featured = shows.find((s) => s.is_featured || s.is_live) || shows[0]
  const upcoming = shows.filter((s) => s.id !== featured?.id)
  const ticketShowIds = new Set(myTickets.map((t) => t.show_id))
  const ticketedShows = shows.filter((s) => ticketShowIds.has(s.id))

  if (loading) {
    return (
      <div className="page-content bg-iv-bg flex items-center justify-center">
        <Loader2 size={32} className="text-iv-purple animate-spin" />
      </div>
    )
  }

  return (
    <div className="page-content bg-iv-bg">
      <div className="px-4 pt-6 pb-8">
        <div className="mb-6">
          <h1 className="text-3xl font-black uppercase gradient-text-gold mb-1 tracking-tight">
            Premium Shows
          </h1>
          <p className="text-iv-text-secondary text-sm">
            Exclusive live events, comedy, talent & more
          </p>
        </div>

        <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-1">
          <div className="flex items-center gap-1.5 bg-iv-card border border-iv-card-border rounded-full px-3 py-2 whitespace-nowrap">
            <Star size={14} className="text-iv-gold" />
            <span className="text-white text-xs font-semibold">{shows.length} Shows</span>
          </div>
          <div className="flex items-center gap-1.5 bg-iv-card border border-iv-card-border rounded-full px-3 py-2 whitespace-nowrap">
            <Radio size={14} className="text-red-400" />
            <span className="text-white text-xs font-semibold">{shows.filter(s => s.is_live).length} Live</span>
          </div>
          {shows.length > 0 && (
            <div className="flex items-center gap-1.5 bg-iv-card border border-iv-card-border rounded-full px-3 py-2 whitespace-nowrap">
              <Ticket size={14} className="text-iv-green" />
              <span className="text-white text-xs font-semibold">
                From ${formatPrice(Math.min(...shows.map(s => s.ticket_price)))}
              </span>
            </div>
          )}
        </div>

        {shows.length === 0 ? (
          <div className="bg-iv-card border border-iv-card-border rounded-2xl p-8 flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-3">
              <Star size={28} className="text-iv-text-muted" />
            </div>
            <p className="text-iv-text-secondary text-sm mb-1">No shows yet</p>
            <p className="text-iv-text-muted text-xs">Check back soon for exclusive events</p>
          </div>
        ) : (
          <>
            {featured && (
              <div className="mb-6">
                <FeaturedShowCard show={featured} onClick={() => navigate(`/show/${featured.id}`)} />
              </div>
            )}

            {upcoming.length > 0 && (
              <>
                <h2 className="text-white text-lg font-bold mb-4">Upcoming Shows</h2>
                <div className="space-y-4">
                  {upcoming.map((show) => (
                    <ShowCard key={show.id} show={show} onClick={() => navigate(`/show/${show.id}`)} />
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {/* My Tickets */}
        <div className="mt-8">
          <h2 className="text-white text-lg font-bold mb-4">My Tickets</h2>
          {!user ? (
            <div className="bg-iv-card border border-iv-card-border rounded-2xl p-6 flex flex-col items-center text-center">
              <Ticket size={24} className="text-iv-text-muted mb-3" />
              <p className="text-iv-text-secondary text-sm mb-3">Sign in to see your tickets</p>
              <button
                onClick={() => navigate('/auth')}
                className="px-6 py-2 rounded-xl bg-iv-purple text-white text-sm font-semibold btn-press"
              >
                Sign In
              </button>
            </div>
          ) : ticketedShows.length === 0 ? (
            <div className="bg-iv-card border border-iv-card-border rounded-2xl p-6 flex flex-col items-center text-center">
              <Ticket size={24} className="text-iv-text-muted mb-3" />
              <p className="text-iv-text-secondary text-sm mb-1">No tickets yet</p>
              <p className="text-iv-text-muted text-xs">Purchase a ticket to access premium shows</p>
            </div>
          ) : (
            <div className="space-y-3">
              {ticketedShows.map((show) => (
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
          )}
        </div>
      </div>
    </div>
  )
}
