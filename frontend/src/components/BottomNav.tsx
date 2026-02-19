import { useLocation, useNavigate } from 'react-router-dom'
import { Home, Play, User, Star } from 'lucide-react'

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/live', label: 'Live', icon: Play },
  { path: '/show', label: 'Show', icon: Star },
  { path: '/profile', label: 'Profile', icon: User },
]

// Hide bottom nav on these routes
const hiddenPaths = ['/auth', '/create-show']

export default function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const isHomePage = location.pathname === '/'

  const isShowDetail = location.pathname.startsWith('/show/') && location.pathname !== '/show'
  if (hiddenPaths.includes(location.pathname) || isShowDetail) return null

  return (
    <nav
      className={`absolute bottom-0 left-0 right-0 z-50 flex items-center justify-around px-2 h-16 ${
        isHomePage
          ? 'bg-black/60 backdrop-blur-lg border-t border-white/5'
          : 'bg-iv-nav-bg border-t border-iv-card-border'
      }`}
    >
      {navItems.map(({ path, label, icon: Icon }) => {
        const isActive = location.pathname === path

        let activeColor = ''
        if (isActive) {
          switch (path) {
            case '/':
              activeColor = 'text-indigo-400'
              break
            case '/live':
              activeColor = 'text-white'
              break
            case '/show':
              activeColor = 'text-yellow-400'
              break
            case '/profile':
              activeColor = 'text-rose-500'
              break
          }
        }

        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={`flex flex-col items-center justify-center gap-1 py-2 px-3 transition-all duration-200 btn-press ${
              isActive ? activeColor : 'text-iv-text-muted'
            }`}
          >
            {path === '/profile' && isActive ? (
              <div className="relative">
                <div className="w-7 h-7 rounded-full border-2 border-rose-500 flex items-center justify-center">
                  <Icon size={16} strokeWidth={2.5} />
                </div>
              </div>
            ) : path === '/live' ? (
              <div className={`${isActive ? 'text-white' : ''}`}>
                <svg width={24} height={24} viewBox="0 0 24 24" fill={isActive ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="6 3 20 12 6 21 6 3" />
                </svg>
              </div>
            ) : (
              <Icon
                size={24}
                strokeWidth={isActive ? 2.5 : 1.8}
                fill={isActive && (path === '/' || path === '/show') ? 'currentColor' : 'none'}
              />
            )}
            <span className={`text-[10px] font-medium ${isActive ? '' : 'text-iv-text-muted'}`}>
              {label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
