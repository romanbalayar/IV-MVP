import { useState } from 'react'
import {
  Heart,
  MessageCircle,
  Share2,
  Volume2,
  VolumeX,
  Music,
  Repeat2,
  Radio,
} from 'lucide-react'

interface VideoData {
  id: number
  username: string
  caption: string
  hashtags: string
  sound: string
  likes: string
  comments: string
  shares: string
  avatar: string
  bgImage: string
  isLive?: boolean
}

const videos: VideoData[] = [
  {
    id: 1,
    username: 'emma_dance',
    caption: 'My best dance move for the challenge! 🌸',
    hashtags: '#dancechallenge #viral #iv',
    sound: 'emma_dance • Original Sound',
    likes: '12.5K',
    comments: '234',
    shares: '89',
    avatar: '',
    bgImage: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=400&h=800&fit=crop&crop=center',
    isLive: true,
  },
  {
    id: 2,
    username: 'alex_music',
    caption: 'This beat goes hard 🔥🎵',
    hashtags: '#music #producer #beats',
    sound: 'alex_music • Studio Session',
    likes: '45.2K',
    comments: '1.2K',
    shares: '567',
    avatar: '',
    bgImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=800&fit=crop&crop=center',
  },
  {
    id: 3,
    username: 'comedy_king',
    caption: 'POV: When the challenge prompt says "make me laugh" 😂',
    hashtags: '#comedy #challenge #funny',
    sound: 'comedy_king • Kitchen Vibes',
    likes: '89.1K',
    comments: '3.4K',
    shares: '2.1K',
    avatar: '',
    bgImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=800&fit=crop&crop=center',
    isLive: true,
  },
  {
    id: 4,
    username: 'fitness_jay',
    caption: 'Day 30 transformation 💪',
    hashtags: '#fitness #gym #transformation',
    sound: 'fitness_jay • Workout Mix',
    likes: '156K',
    comments: '8.9K',
    shares: '4.5K',
    avatar: '',
    bgImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=800&fit=crop&crop=center',
  },
]

function VideoCard({ video }: { video: VideoData }) {
  const [liked, setLiked] = useState(false)
  const [muted, setMuted] = useState(true)
  const [followed, setFollowed] = useState(false)

  return (
    <div className="video-card relative w-full h-full flex-shrink-0 bg-black overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={video.bgImage}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Cinematic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent via-50% to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
      </div>

      {/* Top Controls */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
        {/* For You / Following tabs */}
        <div className="glass rounded-full px-1 py-1 flex items-center gap-0.5">
          <button className="px-3 py-1 rounded-full bg-white text-black text-[11px] font-bold">
            For You
          </button>
          <button className="px-3 py-1 rounded-full text-white/70 text-[11px] font-medium">
            Following
          </button>
        </div>

        {/* Mute */}
        <button
          onClick={() => setMuted(!muted)}
          className="w-9 h-9 rounded-full glass flex items-center justify-center btn-press"
        >
          {muted
            ? <VolumeX size={17} className="text-white" />
            : <Volume2 size={17} className="text-white" />
          }
        </button>
      </div>

      {/* LIVE NOW banner — shown if creator has live challenge */}
      {video.isLive && (
        <div
          className="absolute top-16 left-0 right-0 flex justify-center z-10 pointer-events-none"
          style={{ paddingTop: 8 }}
        >
          <div className="flex items-center gap-1.5 glass-dark rounded-full px-3 py-1 live-badge">
            <Radio size={11} className="text-red-400" />
            <span className="text-white text-[10px] font-bold uppercase tracking-widest">
              Live Challenge Running
            </span>
          </div>
        </div>
      )}

      {/* Right Action Bar */}
      <div className="absolute right-3 bottom-36 flex flex-col items-center gap-5 z-10">
        {/* Profile Avatar */}
        <div className="relative mb-1">
          <div
            className={`w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500 p-[2px] ${video.isLive ? 'live-ring' : ''
              }`}
          >
            <div className="w-full h-full rounded-full overflow-hidden bg-gray-900">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${video.username}`}
                alt={video.username}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          {/* Follow button under avatar */}
          <button
            onClick={() => setFollowed(!followed)}
            className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-black transition-all ${followed
                ? 'bg-gray-600'
                : 'bg-gradient-to-br from-purple-500 to-pink-500'
              }`}
          >
            {followed ? '✓' : '+'}
          </button>
        </div>

        {/* Like */}
        <button
          onClick={() => setLiked(!liked)}
          className="flex flex-col items-center gap-1 btn-press"
        >
          <Heart
            size={28}
            className={liked ? 'text-red-500 fill-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]' : 'text-white drop-shadow-md'}
            strokeWidth={2}
          />
          <span className="text-white text-xs font-semibold drop-shadow-md">{video.likes}</span>
        </button>

        {/* Comments */}
        <button className="flex flex-col items-center gap-1 btn-press">
          <MessageCircle size={28} className="text-white drop-shadow-md" strokeWidth={2} />
          <span className="text-white text-xs font-semibold drop-shadow-md">{video.comments}</span>
        </button>

        {/* Repost */}
        <button className="flex flex-col items-center gap-1 btn-press">
          <Repeat2 size={28} className="text-white drop-shadow-md" strokeWidth={2} />
          <span className="text-white text-[10px] font-semibold drop-shadow-md">Repost</span>
        </button>

        {/* Share */}
        <button className="flex flex-col items-center gap-1 btn-press">
          <Share2 size={28} className="text-white drop-shadow-md" strokeWidth={2} />
          <span className="text-white text-xs font-semibold drop-shadow-md">{video.shares}</span>
        </button>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-20 left-4 right-20 z-10">
        {/* Creator nameplate */}
        <div className="flex items-center gap-2 mb-2.5">
          <span className="text-white font-bold text-[15px] drop-shadow-md">
            @{video.username}
          </span>
          {!followed && (
            <button
              onClick={() => setFollowed(true)}
              className="px-3 py-0.5 rounded-full border border-white/60 text-white text-[11px] font-semibold btn-press"
            >
              Follow
            </button>
          )}
        </div>

        {/* Caption */}
        <p className="text-white text-sm mb-1 leading-snug drop-shadow-md">
          {video.caption}{' '}
          <span className="text-purple-300 font-medium">{video.hashtags}</span>
        </p>

        {/* Sound row */}
        <div className="flex items-center gap-2 mt-2">
          <Music size={12} className="text-white/80 flex-shrink-0" />
          <div className="overflow-hidden max-w-[190px]">
            <p className="text-white/80 text-xs whitespace-nowrap drop-shadow-md">
              {video.sound}
            </p>
          </div>
        </div>
      </div>

      {/* Floating Music Disc */}
      <div className="absolute bottom-20 right-3 z-10">
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-600 via-violet-600 to-pink-500 animate-spin-slow flex items-center justify-center glow-purple">
          <div className="w-4 h-4 rounded-full bg-[#07071a]" />
        </div>
      </div>

      {/* Swipe up hint */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 pointer-events-none">
        <div className="flex flex-col items-center gap-0.5 opacity-50">
          <span className="text-white text-[9px] font-medium tracking-widest uppercase">Swipe</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2 L7 12 M3 8 L7 12 L11 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="video-feed h-full">
      {videos.map((video) => (
        <div key={video.id} className="video-card w-full h-full">
          <VideoCard video={video} />
        </div>
      ))}
    </div>
  )
}
