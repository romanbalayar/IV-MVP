import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Radio,
  Users,
  Trophy,
  Zap,
  X,
  Eye,
  ChevronRight,
  Flame,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import type { ChallengeWithHost } from '../types'

// ─── Mock Data ───────────────────────────────────────────────────────────────
const MOCK_CHALLENGES: (ChallengeWithHost & { viewers: number; inQueue: number; category: string })[] = [
  {
    id: 'ch-001',
    host_id: 'host-001',
    challenge_text: 'Make me laugh in 10 seconds',
    coins: 500,
    youtube_url: null,
    is_live: true,
    created_at: new Date().toISOString(),
    host_username: 'ComedyKing',
    host_display_name: 'ComedyKing',
    host_avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ComedyKing',
    viewers: 12500,
    inQueue: 7,
    category: '😂 Comedy',
  },
  {
    id: 'ch-002',
    host_id: 'host-002',
    challenge_text: 'Show me your best dance move',
    coins: 300,
    youtube_url: null,
    is_live: true,
    created_at: new Date().toISOString(),
    host_username: 'DanceMaster',
    host_display_name: 'DanceMaster',
    host_avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DanceMaster',
    viewers: 8200,
    inQueue: 3,
    category: '💃 Dance',
  },
  {
    id: 'ch-003',
    host_id: 'host-003',
    challenge_text: 'Sing a 5-second high note',
    coins: 750,
    youtube_url: null,
    is_live: true,
    created_at: new Date().toISOString(),
    host_username: 'VoiceOfAngel',
    host_display_name: 'VoiceOfAngel',
    host_avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=VoiceOfAngel',
    viewers: 15100,
    inQueue: 12,
    category: '🎤 Music',
  },
  {
    id: 'ch-004',
    host_id: 'host-004',
    challenge_text: 'Do your best celebrity impression',
    coins: 1000,
    youtube_url: null,
    is_live: true,
    created_at: new Date().toISOString(),
    host_username: 'ImpressionPro',
    host_display_name: 'ImpressionPro',
    host_avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ImpressionPro',
    viewers: 22400,
    inQueue: 18,
    category: '⭐ Talent',
  },
]

function formatViewers(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`
  return String(n)
}

// ─── Watch Modal ─────────────────────────────────────────────────────────────
function WatchModal({
  challenge,
  onClose,
}: {
  challenge: ChallengeWithHost & { viewers: number }
  onClose: () => void
}) {
  const bars = [0.4, 0.7, 1, 0.6, 0.85, 0.5, 0.9, 0.65, 0.75, 0.45]

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-[#07071a] animate-fade-in">
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-purple-600/10 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-56 h-56 rounded-full bg-pink-600/10 blur-3xl" />
      </div>

      {/* Header */}
      <div className="relative flex items-center justify-between px-4 py-3 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-purple-500/50 live-ring">
              <img
                src={challenge.host_avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${challenge.host_id}`}
                alt={challenge.host_display_name || ''}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-tight">{challenge.host_display_name}</p>
            <p className="text-white/40 text-xs">Host</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-red-500/90 rounded-full px-3 py-1 live-badge">
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
            <span className="text-white text-xs font-bold">LIVE</span>
          </div>
          <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-2.5 py-1">
            <span className="text-base leading-none">🪙</span>
            <span className="text-yellow-400 text-sm font-bold">{challenge.coins}</span>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center btn-press">
            <X size={16} className="text-white" />
          </button>
        </div>
      </div>

      {/* Stream area */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Waveform animation */}
        <div className="flex items-end gap-1 h-16 mb-6">
          {bars.map((h, i) => (
            <span
              key={i}
              className="wave-bar bg-gradient-to-t from-purple-500 to-pink-400"
              style={{
                height: `${h * 100}%`,
                animationDelay: `${i * 0.09}s`,
              }}
            />
          ))}
        </div>
        <p className="text-white text-xl font-bold mb-2">Waiting for host</p>
        <p className="text-white/40 text-sm text-center">
          The stream will start when {challenge.host_display_name} goes live
        </p>

        {/* Viewer count */}
        <div className="flex items-center gap-2 mt-6 bg-white/5 rounded-full px-4 py-2">
          <Eye size={14} className="text-purple-400" />
          <span className="text-white text-sm font-medium">{formatViewers(challenge.viewers)} watching</span>
        </div>
      </div>

      {/* Bottom info */}
      <div className="relative px-4 pt-4 pb-6 border-t border-white/5">
        <h3 className="text-white font-bold text-lg mb-1">{challenge.challenge_text}</h3>
        <div className="flex items-center gap-1.5">
          <Trophy size={13} className="text-yellow-400" />
          <span className="text-yellow-400 text-sm font-semibold">{challenge.coins} coin prize</span>
        </div>
        <div className="mt-3 h-0.5 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-violet-600" />
      </div>
    </div>
  )
}

// ─── Challenge Card ───────────────────────────────────────────────────────────
function ChallengeCard({
  challenge,
  onJoin,
}: {
  challenge: typeof MOCK_CHALLENGES[0]
  onJoin: () => void
}) {
  return (
    <div className="bg-[#0f0f28] border border-white/[0.07] rounded-2xl overflow-hidden card-hover animate-slide-up">
      {/* Subtle gradient top accent */}
      <div className="h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-transparent" />

      <div className="p-4">
        {/* Host row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {/* Story-ring avatar */}
            <div className="relative">
              <div className="w-14 h-14 rounded-full p-[2.5px] bg-gradient-to-br from-red-500 via-pink-500 to-purple-600 live-ring">
                <div className="w-full h-full rounded-full overflow-hidden bg-[#07071a]">
                  <img
                    src={challenge.host_avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${challenge.host_id}`}
                    alt={challenge.host_display_name || ''}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* LIVE chip on avatar */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-red-500 rounded-full px-1.5 py-0.5 flex items-center gap-0.5 live-badge whitespace-nowrap">
                <div className="w-1 h-1 rounded-full bg-white" />
                <span className="text-white text-[8px] font-black uppercase">LIVE</span>
              </div>
            </div>

            <div>
              <span className="text-white/40 text-[11px] font-medium">Host</span>
              <p className="text-white font-bold text-base leading-tight">
                {challenge.host_display_name}
              </p>
              <span className="text-[10px] font-semibold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full">
                {challenge.category}
              </span>
            </div>
          </div>

          {/* Viewers + Queue */}
          <div className="flex flex-col items-end gap-1.5">
            <div className="flex items-center gap-1 text-white/50">
              <Eye size={12} />
              <span className="text-xs font-medium">{formatViewers(challenge.viewers)}</span>
            </div>
            <div className="flex items-center gap-1 bg-orange-500/10 border border-orange-500/20 rounded-full px-2 py-0.5">
              <Users size={10} className="text-orange-400" />
              <span className="text-orange-400 text-[10px] font-bold">{challenge.inQueue} in queue</span>
            </div>
          </div>
        </div>

        {/* Challenge prompt */}
        <div className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-3 mb-4">
          <p className="text-white/40 text-[10px] font-semibold uppercase tracking-widest mb-1">Challenge Prompt</p>
          <h3 className="text-white font-bold text-lg leading-snug">"{challenge.challenge_text}"</h3>
        </div>

        {/* Prize + Join row */}
        <div className="flex items-center gap-3">
          {/* Prize */}
          <div className="flex items-center gap-1.5 bg-yellow-400/10 border border-yellow-400/20 rounded-xl px-3 py-2.5">
            <Trophy size={15} className="text-yellow-400" />
            <div>
              <p className="text-yellow-400 font-black text-base leading-none">{challenge.coins}</p>
              <p className="text-yellow-400/60 text-[9px] font-medium">COINS</p>
            </div>
          </div>

          {/* Join button */}
          <button
            onClick={onJoin}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black text-sm tracking-wider btn-press btn-glow flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
          >
            <Zap size={16} />
            JOIN LIVE
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function LivePage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [watching, setWatching] = useState<typeof MOCK_CHALLENGES[0] | null>(null)
  const [showCreate, setShowCreate] = useState(false)

  const totalViewers = MOCK_CHALLENGES.reduce((s, c) => s + c.viewers, 0)

  function handleJoin(c: typeof MOCK_CHALLENGES[0]) {
    if (!user) { navigate('/auth'); return }
    setWatching(c)
  }

  function handleCreate() {
    if (!user) { navigate('/auth'); return }
    setShowCreate(true)
  }

  const stats = [
    { icon: Radio, value: `${MOCK_CHALLENGES.length}`, label: 'Live Now', color: 'text-purple-400', bg: 'bg-purple-500/15', glow: 'rgba(139,92,246,0.3)' },
    { icon: Users, value: `${Math.round(totalViewers / 1000)}K+`, label: 'Watching', color: 'text-pink-400', bg: 'bg-pink-500/15', glow: 'rgba(236,72,153,0.3)' },
    { icon: Flame, value: `$5K`, label: 'In Prizes', color: 'text-yellow-400', bg: 'bg-yellow-500/15', glow: 'rgba(234,179,8,0.3)' },
  ]

  return (
    <div className="page-content bg-[#07071a]">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-purple-700/8 blur-3xl" />
        <div className="absolute bottom-20 right-0 w-60 h-60 rounded-full bg-pink-700/8 blur-3xl" />
      </div>

      <div className="relative px-4 pt-6 pb-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-red-500 live-badge" />
            <h1 className="text-3xl font-black uppercase tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
              <span className="gradient-text-gold">Live</span>{' '}
              <span className="text-white">Challenges</span>
            </h1>
          </div>
          <p className="text-white/40 text-sm">Watch, compete, and win coins globally</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {stats.map(({ icon: Icon, value, label, color, bg, glow }) => (
            <div
              key={label}
              className="bg-[#0f0f28] border border-white/[0.07] rounded-2xl p-3.5 flex flex-col card-hover"
              style={{ boxShadow: `0 0 0 0 ${glow}` }}
            >
              <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center mb-3`}>
                <Icon size={18} className={color} />
              </div>
              <p className={`font-black text-xl leading-none stat-number ${color}`}>{value}</p>
              <p className="text-white/30 text-[10px] mt-1 font-medium">{label}</p>
            </div>
          ))}
        </div>

        {/* Create button */}
        <button
          onClick={handleCreate}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-violet-600 text-white font-black text-sm tracking-widest btn-press btn-glow hover:opacity-90 transition-opacity flex items-center justify-center gap-2.5 mb-6 uppercase"
        >
          <Zap size={18} />
          Host a Live Challenge
        </button>

        {/* Challenge feed */}
        <div className="space-y-4">
          {MOCK_CHALLENGES.map((c) => (
            <ChallengeCard key={c.id} challenge={c} onJoin={() => handleJoin(c)} />
          ))}
        </div>
      </div>

      {/* Watch modal */}
      {watching && (
        <WatchModal challenge={watching} onClose={() => setWatching(null)} />
      )}

      {/* Create modal */}
      {showCreate && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center animate-fade-in">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowCreate(false)} />
          <div className="relative w-full max-w-[430px] bg-[#0f0f28] border-t border-white/[0.08] rounded-t-3xl p-6">
            <div className="flex justify-center mb-5">
              <div className="w-10 h-1 rounded-full bg-white/15" />
            </div>
            <h2 className="text-white text-xl font-black mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Host a Live Challenge
            </h2>
            <p className="text-white/40 text-sm mb-6">
              🚧 Challenge creation coming soon — full launch dropping next sprint!
            </p>
            {/* Preview steps */}
            {['Set your challenge prompt', 'Add a coin prize pool', 'Go live and pick winners'].map((step, i) => (
              <div key={step} className="flex items-center gap-3 mb-3">
                <div className="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 text-xs font-bold flex-shrink-0">{i + 1}</div>
                <span className="text-white/60 text-sm">{step}</span>
              </div>
            ))}
            <button
              onClick={() => setShowCreate(false)}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-base btn-press mt-4"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
