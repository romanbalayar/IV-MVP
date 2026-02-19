import {
  Clock,
  Users,
  DollarSign,
  Trophy,
} from 'lucide-react'

interface LiveChallenge {
  id: number
  host: string
  hostAvatar: string
  challenge: string
  viewers: string
  coins: number
  gradient: string
  cardBg: string
  thumbnailUrl: string
}

const challenges: LiveChallenge[] = [
  {
    id: 1,
    host: 'Alex Chen',
    hostAvatar: 'alex',
    challenge: 'Make me laugh in 10 seconds',
    viewers: '12,453',
    coins: 500,
    gradient: 'from-yellow-500/40 via-green-500/20 to-transparent',
    cardBg: 'bg-iv-card',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
  },
  {
    id: 2,
    host: 'Jordan Blake',
    hostAvatar: 'jordan',
    challenge: 'Best dance move wins!',
    viewers: '8,934',
    coins: 750,
    gradient: 'from-pink-500/40 via-rose-500/20 to-transparent',
    cardBg: 'bg-iv-card',
    thumbnailUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop&crop=face',
  },
  {
    id: 3,
    host: 'Maya Rodriguez',
    hostAvatar: 'maya',
    challenge: 'Sing this song better than me!',
    viewers: '15,201',
    coins: 1000,
    gradient: 'from-blue-500/40 via-indigo-500/20 to-transparent',
    cardBg: 'bg-iv-card',
    thumbnailUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
  },
  {
    id: 4,
    host: 'Tyler Swift',
    hostAvatar: 'tyler',
    challenge: 'Best impressions challenge',
    viewers: '6,721',
    coins: 300,
    gradient: 'from-orange-500/40 via-amber-500/20 to-transparent',
    cardBg: 'bg-iv-card',
    thumbnailUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
  },
]

const stats = [
  { icon: Clock, value: '24', label: 'Live Now', color: 'text-iv-purple' },
  { icon: Users, value: '50K+', label: 'Watching', color: 'text-iv-pink' },
  { icon: DollarSign, value: '$5K', label: 'In Prizes', color: 'text-iv-green' },
]

function LiveBadge() {
  return (
    <div className="live-badge flex items-center gap-1 bg-red-500 rounded-full px-2 py-0.5">
      <div className="w-1.5 h-1.5 rounded-full bg-white" />
      <span className="text-white text-[10px] font-bold uppercase">Live</span>
    </div>
  )
}

function ChallengeCard({ challenge }: { challenge: LiveChallenge }) {
  return (
    <div className="relative rounded-2xl overflow-hidden border border-iv-card-border bg-iv-card">
      {/* Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-b ${challenge.gradient} pointer-events-none`} />

      <div className="relative p-4">
        {/* Host Info */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${challenge.hostAvatar}`}
                alt={challenge.host}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-1 -left-1">
              <LiveBadge />
            </div>
          </div>
          <div>
            <p className="text-iv-text-secondary text-xs">Host</p>
            <p className="text-white font-semibold text-sm">{challenge.host}</p>
          </div>
        </div>

        {/* Challenge Text */}
        <h3 className="text-white font-bold text-xl mb-3 leading-tight">
          {challenge.challenge}
        </h3>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1.5">
            <Users size={14} className="text-iv-text-secondary" />
            <span className="text-iv-text-secondary text-sm">{challenge.viewers}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Trophy size={14} className="text-iv-gold" />
            <span className="text-iv-gold text-sm font-medium">{challenge.coins} coins</span>
          </div>
        </div>

        {/* Join Button */}
        <button className="w-full py-3.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-base tracking-wide btn-press hover:opacity-90 transition-opacity">
          JOIN LIVE
        </button>
      </div>
    </div>
  )
}

export default function LivePage() {
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
        <div className="grid grid-cols-3 gap-3 mb-6">
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

        {/* Challenge Cards */}
        <div className="space-y-4">
          {challenges.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>
      </div>
    </div>
  )
}
