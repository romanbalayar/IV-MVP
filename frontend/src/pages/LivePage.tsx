import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Clock,
  Users,
  DollarSign,
  Trophy,
  Plus,
  X,
  Loader2,
  Radio,
  Zap,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import type { ChallengeWithHost } from '../types'

const gradientPool = [
  'from-yellow-500/40 via-green-500/20 to-transparent',
  'from-pink-500/40 via-rose-500/20 to-transparent',
  'from-blue-500/40 via-indigo-500/20 to-transparent',
  'from-orange-500/40 via-amber-500/20 to-transparent',
  'from-purple-500/40 via-violet-500/20 to-transparent',
  'from-emerald-500/40 via-teal-500/20 to-transparent',
  'from-red-500/40 via-pink-500/20 to-transparent',
  'from-cyan-500/40 via-sky-500/20 to-transparent',
]

function getGradient(index: number) {
  return gradientPool[index % gradientPool.length]
}

function extractYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|live\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  )
  return match ? match[1] : null
}

function LiveBadge() {
  return (
    <div className="live-badge flex items-center gap-1 bg-red-500 rounded-full px-2 py-0.5">
      <div className="w-1.5 h-1.5 rounded-full bg-white" />
      <span className="text-white text-[10px] font-bold uppercase">Live</span>
    </div>
  )
}

function CreateChallengeModal({
  onClose,
  onCreated,
}: {
  onClose: () => void
  onCreated: () => void
}) {
  const { user } = useAuth()
  const [challengeText, setChallengeText] = useState('')
  const [coins, setCoins] = useState('100')
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function handleCreate() {
    if (!user) return
    if (!challengeText.trim()) {
      setError('Challenge description is required')
      return
    }

    setSaving(true)
    setError('')

    const { error: dbError } = await supabase.from('challenges').insert({
      host_id: user.id,
      challenge_text: challengeText.trim(),
      coins: parseInt(coins) || 100,
      youtube_url: youtubeUrl.trim() || null,
      is_live: true,
    })

    if (dbError) {
      setError(dbError.message)
      setSaving(false)
      return
    }

    onCreated()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-[430px] bg-iv-bg border-t border-iv-card-border rounded-t-3xl max-h-[85vh] overflow-y-auto">
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-white/20" />
        </div>

        <div className="flex items-center justify-between px-5 pb-4 pt-2">
          <h2 className="text-white text-xl font-bold">Go Live</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center btn-press">
            <X size={16} className="text-white" />
          </button>
        </div>

        <div className="px-5 pb-8 space-y-4">
          <div>
            <label className="text-iv-text-secondary text-xs font-medium mb-1.5 block">
              Challenge Description *
            </label>
            <textarea
              value={challengeText}
              onChange={(e) => setChallengeText(e.target.value)}
              placeholder="e.g. Make me laugh in 10 seconds"
              rows={2}
              className="w-full bg-iv-card border border-iv-card-border rounded-xl px-4 py-3 text-white text-sm placeholder:text-iv-text-muted focus:outline-none focus:border-iv-purple transition-colors resize-none"
            />
          </div>

          <div>
            <label className="text-iv-text-secondary text-xs font-medium mb-1.5 block">
              Prize Pool (coins)
            </label>
            <input
              type="number"
              value={coins}
              onChange={(e) => setCoins(e.target.value)}
              placeholder="100"
              min="0"
              className="w-full bg-iv-card border border-iv-card-border rounded-xl px-4 py-3 text-white text-sm placeholder:text-iv-text-muted focus:outline-none focus:border-iv-purple transition-colors"
            />
          </div>

          <div>
            <label className="text-iv-text-secondary text-xs font-medium mb-1.5 block">
              YouTube Stream URL (optional)
            </label>
            <input
              type="url"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="https://youtube.com/watch?v=... or /live/..."
              className="w-full bg-iv-card border border-iv-card-border rounded-xl px-4 py-3 text-white text-sm placeholder:text-iv-text-muted focus:outline-none focus:border-iv-purple transition-colors"
            />
            <p className="text-iv-text-muted text-[10px] mt-1">Paste your YouTube live stream link so viewers can watch</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <button
            onClick={handleCreate}
            disabled={saving || !challengeText.trim()}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-base btn-press hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Radio size={18} />}
            {saving ? 'Going Live...' : 'Go Live'}
          </button>
        </div>
      </div>
    </div>
  )
}

function ChallengeCard({
  challenge,
  index,
  onJoin,
}: {
  challenge: ChallengeWithHost
  index: number
  onJoin: (c: ChallengeWithHost) => void
}) {
  return (
    <div className="relative rounded-2xl overflow-hidden border border-iv-card-border bg-iv-card">
      <div className={`absolute inset-0 bg-gradient-to-b ${getGradient(index)} pointer-events-none`} />

      <div className="relative p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500">
              <img
                src={challenge.host_avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${challenge.host_id}`}
                alt={challenge.host_display_name || ''}
                className="w-full h-full object-cover"
              />
            </div>
            {challenge.is_live && (
              <div className="absolute -top-1 -left-1">
                <LiveBadge />
              </div>
            )}
          </div>
          <div>
            <p className="text-iv-text-secondary text-xs">Host</p>
            <p className="text-white font-semibold text-sm">{challenge.host_display_name || challenge.host_username || 'Anonymous'}</p>
          </div>
        </div>

        <h3 className="text-white font-bold text-xl mb-3 leading-tight">
          {challenge.challenge_text}
        </h3>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1.5">
            <Trophy size={14} className="text-iv-gold" />
            <span className="text-iv-gold text-sm font-medium">{challenge.coins} coins</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={14} className="text-iv-text-secondary" />
            <span className="text-iv-text-secondary text-sm">
              {new Date(challenge.created_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
            </span>
          </div>
        </div>

        <button
          onClick={() => onJoin(challenge)}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-base tracking-wide btn-press hover:opacity-90 transition-opacity"
        >
          JOIN LIVE
        </button>
      </div>
    </div>
  )
}

function WatchChallengeModal({
  challenge,
  onClose,
  isHost,
  onEndLive,
}: {
  challenge: ChallengeWithHost
  onClose: () => void
  isHost: boolean
  onEndLive: () => void
}) {
  const videoId = challenge.youtube_url ? extractYouTubeId(challenge.youtube_url) : null
  const [ending, setEnding] = useState(false)

  async function handleEnd() {
    setEnding(true)
    await supabase.from('challenges').update({ is_live: false }).eq('id', challenge.id)
    onEndLive()
  }

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-iv-bg">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-iv-card-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500">
            <img
              src={challenge.host_avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${challenge.host_id}`}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-white text-sm font-semibold">{challenge.host_display_name || challenge.host_username}</p>
            <div className="flex items-center gap-2">
              {challenge.is_live && <LiveBadge />}
              <span className="text-iv-gold text-xs font-medium">{challenge.coins} coins</span>
            </div>
          </div>
        </div>
        <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center btn-press">
          <X size={16} className="text-white" />
        </button>
      </div>

      {/* Video */}
      <div className="flex-1 bg-black flex items-center justify-center">
        {videoId ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={challenge.challenge_text}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        ) : (
          <div className="text-center px-6">
            <Radio size={48} className="text-iv-text-muted mx-auto mb-3" />
            <p className="text-white font-bold text-lg mb-1">{challenge.challenge_text}</p>
            <p className="text-iv-text-secondary text-sm">
              {isHost ? 'Add a YouTube stream URL to broadcast' : 'Waiting for host to start streaming...'}
            </p>
          </div>
        )}
      </div>

      {/* Bottom Bar */}
      <div className="px-4 py-3 border-t border-iv-card-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-iv-gold/10 rounded-full px-3 py-1.5">
              <Trophy size={14} className="text-iv-gold" />
              <span className="text-iv-gold text-sm font-bold">{challenge.coins} coins</span>
            </div>
          </div>
          {isHost && (
            <button
              onClick={handleEnd}
              disabled={ending}
              className="px-4 py-2 rounded-full bg-red-500 text-white text-xs font-bold btn-press disabled:opacity-50"
            >
              {ending ? 'Ending...' : 'End Live'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default function LivePage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [challenges, setChallenges] = useState<ChallengeWithHost[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [watchingChallenge, setWatchingChallenge] = useState<ChallengeWithHost | null>(null)

  useEffect(() => {
    fetchChallenges()
  }, [])

  async function fetchChallenges() {
    const { data } = await supabase
      .from('challenges_with_host')
      .select('*')
      .eq('is_live', true)
      .order('created_at', { ascending: false })

    setChallenges((data as ChallengeWithHost[]) || [])
    setLoading(false)
  }

  function handleJoin(challenge: ChallengeWithHost) {
    if (!user) {
      navigate('/auth')
      return
    }
    setWatchingChallenge(challenge)
  }

  function handleCreateClick() {
    if (!user) {
      navigate('/auth')
      return
    }
    setShowCreateModal(true)
  }

  const totalCoins = challenges.reduce((sum, c) => sum + c.coins, 0)

  const stats = [
    { icon: Clock, value: String(challenges.length), label: 'Live Now', color: 'text-iv-purple' },
    { icon: Users, value: challenges.length > 0 ? `${challenges.length * 3}K+` : '0', label: 'Watching', color: 'text-iv-pink' },
    { icon: DollarSign, value: totalCoins > 0 ? `${totalCoins.toLocaleString()}` : '0', label: 'Coins in Play', color: 'text-iv-green' },
  ]

  return (
    <div className="page-content bg-iv-bg">
      <div className="px-4 pt-6 pb-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-black uppercase gradient-text-gold mb-1 tracking-tight">
            Live Challenges
          </h1>
          <p className="text-iv-text-secondary text-sm">
            Watch, compete, and win rewards
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {stats.map(({ icon: Icon, value, label, color }) => (
            <div
              key={label}
              className="bg-iv-card border border-iv-card-border rounded-xl p-3 flex flex-col items-start"
            >
              <Icon size={16} className={`${color} mb-2`} />
              <p className="text-white font-bold text-lg leading-none">{value}</p>
              <p className="text-iv-text-muted text-[11px] mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Create Live Button */}
        <button
          onClick={handleCreateClick}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-base btn-press hover:opacity-90 transition-opacity flex items-center justify-center gap-2 mb-6"
        >
          <Zap size={18} />
          Create Live Challenge
        </button>

        {/* Challenge Cards */}
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 size={32} className="text-iv-purple animate-spin" />
          </div>
        ) : challenges.length === 0 ? (
          <div className="bg-iv-card border border-iv-card-border rounded-2xl p-8 flex flex-col items-center text-center">
            <Radio size={32} className="text-iv-text-muted mb-3" />
            <p className="text-white font-bold text-lg mb-1">No live challenges</p>
            <p className="text-iv-text-muted text-sm">Be the first to go live!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {challenges.map((challenge, i) => (
              <ChallengeCard
                key={challenge.id}
                challenge={challenge}
                index={i}
                onJoin={handleJoin}
              />
            ))}
          </div>
        )}
      </div>

      {/* Create Challenge Modal */}
      {showCreateModal && (
        <CreateChallengeModal
          onClose={() => setShowCreateModal(false)}
          onCreated={fetchChallenges}
        />
      )}

      {/* Watch Challenge Modal */}
      {watchingChallenge && (
        <WatchChallengeModal
          challenge={watchingChallenge}
          onClose={() => { setWatchingChallenge(null); fetchChallenges() }}
          isHost={user?.id === watchingChallenge.host_id}
          onEndLive={() => { setWatchingChallenge(null); fetchChallenges() }}
        />
      )}
    </div>
  )
}
