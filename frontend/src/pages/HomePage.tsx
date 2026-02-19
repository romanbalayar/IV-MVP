import { useState } from 'react'
import {
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Volume2,
  Music,
  Repeat2,
} from 'lucide-react'

interface VideoData {
  id: number
  username: string
  caption: string
  hashtags: string
  sound: string
  likes: string
  comments: string
  reposts: string
  shares: string
  avatar: string
  bgColor: string
  bgImage: string
}

const videos: VideoData[] = [
  {
    id: 1,
    username: 'emma_dance',
    caption: 'My best dance move for the challenge! 🌸',
    hashtags: '#dancechallenge #viral',
    sound: 'emma_dance • Original Sound - emma_dance',
    likes: '12.5K',
    comments: '234',
    reposts: 'Repost',
    shares: '89',
    avatar: '',
    bgColor: 'from-teal-900 via-slate-800 to-slate-900',
    bgImage: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=400&h=800&fit=crop&crop=center',
  },
  {
    id: 2,
    username: 'alex_music',
    caption: 'This beat goes hard 🔥🎵',
    hashtags: '#music #producer #beats',
    sound: 'alex_music • Studio Session',
    likes: '45.2K',
    comments: '1.2K',
    reposts: 'Repost',
    shares: '567',
    avatar: '',
    bgColor: 'from-purple-900 via-indigo-900 to-slate-900',
    bgImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=800&fit=crop&crop=center',
  },
  {
    id: 3,
    username: 'cook_master',
    caption: 'Wait for it... 😱🍳',
    hashtags: '#cooking #foodie #recipe',
    sound: 'cook_master • Kitchen Vibes',
    likes: '89.1K',
    comments: '3.4K',
    reposts: 'Repost',
    shares: '2.1K',
    avatar: '',
    bgColor: 'from-amber-900 via-orange-900 to-slate-900',
    bgImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=800&fit=crop&crop=center',
  },
  {
    id: 4,
    username: 'fitness_jay',
    caption: 'Day 30 transformation 💪',
    hashtags: '#fitness #gym #transformation',
    sound: 'fitness_jay • Workout Mix',
    likes: '156K',
    comments: '8.9K',
    reposts: 'Repost',
    shares: '4.5K',
    avatar: '',
    bgColor: 'from-red-900 via-rose-900 to-slate-900',
    bgImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=800&fit=crop&crop=center',
  },
]

function VideoCard({ video }: { video: VideoData }) {
  const [liked, setLiked] = useState(false)

  return (
    <div className="video-card relative w-full h-full flex-shrink-0 bg-black">
      {/* Background Image / Video Placeholder */}
      <div className="absolute inset-0">
        <img
          src={video.bgImage}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
      </div>

      {/* Top Controls */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
        <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center btn-press">
          <MoreHorizontal size={20} className="text-white" />
        </button>
        <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center btn-press">
          <Volume2 size={20} className="text-white" />
        </button>
      </div>

      {/* Right Action Bar */}
      <div className="absolute right-3 bottom-44 flex flex-col items-center gap-5 z-10">
        {/* Profile Avatar */}
        <div className="relative mb-2">
          <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500">
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${video.username}`}
              alt={video.username}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
            <span className="text-white text-xs font-bold leading-none">+</span>
          </div>
        </div>

        {/* Like */}
        <button
          onClick={() => setLiked(!liked)}
          className="flex flex-col items-center gap-1 btn-press"
        >
          <Heart
            size={28}
            className={liked ? 'text-red-500 fill-red-500' : 'text-white'}
            strokeWidth={2}
          />
          <span className="text-white text-xs font-medium">{video.likes}</span>
        </button>

        {/* Comments */}
        <button className="flex flex-col items-center gap-1 btn-press">
          <MessageCircle size={28} className="text-white" strokeWidth={2} />
          <span className="text-white text-xs font-medium">{video.comments}</span>
        </button>

        {/* Repost */}
        <button className="flex flex-col items-center gap-1 btn-press">
          <Repeat2 size={28} className="text-white" strokeWidth={2} />
          <span className="text-white text-[10px] font-medium">{video.reposts}</span>
        </button>

        {/* Share */}
        <button className="flex flex-col items-center gap-1 btn-press">
          <Share2 size={28} className="text-white" strokeWidth={2} />
          <span className="text-white text-xs font-medium">{video.shares}</span>
        </button>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-20 left-4 right-20 z-10">
        {/* Username & Follow */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-white font-bold text-[15px]">@{video.username}</span>
          <button className="px-3 py-1 rounded-full bg-iv-purple/90 text-white text-xs font-semibold btn-press">
            Follow
          </button>
        </div>

        {/* Caption */}
        <p className="text-white text-sm mb-1 leading-snug">
          {video.caption}{' '}
          <span className="text-white/70">{video.hashtags}</span>
        </p>

        {/* Sound */}
        <div className="flex items-center gap-2 mt-2">
          <Music size={12} className="text-white" />
          <div className="overflow-hidden max-w-[200px]">
            <p className="text-white text-xs whitespace-nowrap">
              sound - {video.sound}
            </p>
          </div>
        </div>
      </div>

      {/* Floating Music Disc */}
      <div className="absolute bottom-20 right-3 z-10">
        <div className="w-11 h-11 rounded-full border-2 border-iv-purple bg-gradient-to-br from-purple-600 to-pink-500 animate-spin-slow flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-iv-bg" />
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
