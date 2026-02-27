import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Radio,
  Users,
  Trophy,
  DollarSign,
  Zap,
  X,
  Eye,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import type { ChallengeWithHost } from '../types'

// ─── Mock Data ───────────────────────────────────────────────────────────────
const MOCK_CHALLENGES: (ChallengeWithHost & { viewers: number })[] = [
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
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────
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
  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-[#0d0f1a]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-white/20">
            <img
              src={challenge.host_avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${challenge.host_id}`}
              alt={challenge.host_display_name || ''}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-tight">{challenge.host_display_name}</p>
            <p className="text-iv-text-secondary text-xs">Host</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-red-500 rounded-full px-3 py-1">
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="text-white text-xs font-bold">LIVE</span>
          </div>
          <div className="flex items-center gap-1.5 bg-iv-card border border-iv-card-border rounded-full px-3 py-1">
            <span className="text-base">🪙</span>
            <span className="text-iv-gold text-sm font-bold">{challenge.coins}</span>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-iv-card border border-iv-card-border flex items-center justify-center btn-press"
          >
            <X size={16} className="text-white" />
          </button>
        </div>
      </div>

      {/* Video / Waiting area */}
      <div className="flex-1 bg-[#080a14] flex flex-col items-center justify-center px-6">
        <div className="w-24 h-24 rounded-full bg-iv-purple/20 flex items-center justify-center mb-5">
          <Radio size={44} className="text-iv-purple" />
        </div>
        <p className="text-white text-xl font-bold mb-2">Waiting for host</p>
        <p className="text-iv-text-secondary text-sm text-center">
          The stream will start when {challenge.host_display_name} goes live
        </p>
      </div>

      {/* Bottom info */}
      <div className="px-4 pt-4 pb-6 border-t border-white/5">
        <h3 className="text-white font-bold text-xl mb-2">{challenge.challenge_text}</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Eye size={15} className="text-iv-text-secondary" />
            <span className="text-white text-sm">{formatViewers(challenge.viewers)} watching</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-base">🪙</span>
            <span className="text-iv-gold text-sm font-semibold">{challenge.coins} prize</span>
          </div>
        </div>

        {/* Progress bar decoration */}
        <div className="mt-4 h-1 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-iv-purple" />
      </div>
    </div>
  )
}

// ─── Challenge Card ───────────────────────────────────────────────────────────
function ChallengeCard({
  challenge,
  onJoin,
}: {
  challenge: ChallengeWithHost & { viewers: number }
  onJoin: () => void
}) {
  return (
    <div className="bg-iv-card border border-iv-card-border rounded-2xl overflow-hidden">
      <div className="p-4">
        {/* Host row */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-shrink-0">
            <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-white/15">
              <img
                src={challenge.host_avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${challenge.host_id}`}
                alt={challenge.host_display_name || ''}
                className="w-full h-full object-cover"
              />
            </div>
            {/* LIVE badge on avatar */}
            <div className="absolute -top-1 -left-1 bg-red-500 rounded-full px-1.5 py-0.5 flex items-center gap-0.5">
              <div className="w-1 h-1 rounded-full bg-white animate-pulse" />
              <span className="text-white text-[9px] font-bold uppercase leading-none">LIVE</span>
            </div>
          </div>
          <div>
            <p className="text-iv-text-secondary text-xs">Host</p>
            <p className="text-white font-bold text-base leading-tight">
              {challenge.host_display_name || challenge.host_username}
            </p>
          </div>
        </div>

        {/* Challenge text */}
        <h3 className="text-white font-bold text-xl mb-3 leading-tight">{challenge.challenge_text}</h3>

        {/* Stats */}
        <div className="flex items-center gap-5 mb-4">
          <div className="flex items-center gap-1.5">
            <Eye size={15} className="text-iv-text-secondary" />
            <span className="text-white text-sm font-medium">{formatViewers(challenge.viewers)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Trophy size={15} className="text-iv-gold" />
            <span className="text-iv-gold text-sm font-bold">{challenge.coins} coins</span>
          </div>
        </div>

        {/* Join button */}
        <button
          onClick={onJoin}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-base tracking-widest btn-press hover:opacity-90 transition-opacity"
        >
          JOIN LIVE
        </button>
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function LivePage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [watching, setWatching] = useState<(ChallengeWithHost & { viewers: number }) | null>(null)
  const [showCreate, setShowCreate] = useState(false)

  const totalCoins = MOCK_CHALLENGES.reduce((s, c) => s + c.coins, 0)
  const totalViewers = MOCK_CHALLENGES.reduce((s, c) => s + c.viewers, 0)

  function handleJoin(c: (typeof MOCK_CHALLENGES)[0]) {
    if (!user) { navigate('/auth'); return }
    setWatching(c)
  }

  function handleCreate() {
    if (!user) { navigate('/auth'); return }
    setShowCreate(true)
  }

  const stats = [
    { icon: Radio, value: `${MOCK_CHALLENGES.length}`, label: 'Live Now', color: 'text-iv-purple', bg: 'bg-iv-purple/15' },
    { icon: Users, value: `${Math.round(totalViewers / 1000)}K+`, label: 'Watching', color: 'text-pink-400', bg: 'bg-pink-500/15' },
    { icon: DollarSign, value: `$5K`, label: 'In Prizes', color: 'text-emerald-400', bg: 'bg-emerald-500/15' },
  ]

  return (
    <div className="page-content bg-iv-bg">
      <div className="px-4 pt-6 pb-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-black uppercase gradient-text-gold mb-1 tracking-tight">
            Live Challenges
          </h1>
          <p className="text-iv-text-secondary text-sm">Watch, compete, and win rewards</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {stats.map(({ icon: Icon, value, label, color, bg }) => (
            <div key={label} className="bg-iv-card border border-iv-card-border rounded-2xl p-3.5 flex flex-col">
              <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center mb-3`}>
                <Icon size={18} className={color} />
              </div>
              <p className="text-white font-bold text-xl leading-none">{value}</p>
              <p className="text-iv-text-muted text-[11px] mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Create button */}
        <button
          onClick={handleCreate}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-base btn-press hover:opacity-90 transition-opacity flex items-center justify-center gap-2.5 mb-6"
        >
          <Zap size={18} />
          Create Live Challenge
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
        <WatchModal
          challenge={watching}
          onClose={() => setWatching(null)}
        />
      )}

      {/* Create modal (simple placeholder) */}
      {showCreate && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowCreate(false)} />
          <div className="relative w-full max-w-[430px] bg-iv-bg border-t border-iv-card-border rounded-t-3xl p-6">
            <div className="flex justify-center mb-4">
              <div className="w-10 h-1 rounded-full bg-white/20" />
            </div>
            <h2 className="text-white text-xl font-bold mb-4">Create Live Challenge</h2>
            <p className="text-iv-text-secondary text-sm mb-6">
              🚧 Challenge creation coming soon. Stay tuned!
            </p>
            <button
              onClick={() => setShowCreate(false)}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-base btn-press"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
