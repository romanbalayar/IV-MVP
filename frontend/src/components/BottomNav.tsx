import { useLocation, useNavigate } from 'react-router-dom'
import { Home, Radio, Ticket, User } from 'lucide-react'

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/live', label: 'Live', icon: Radio },
  { path: '/show', label: 'Shows', icon: Ticket },
  { path: '/profile', label: 'Profile', icon: User },
]

const hiddenPaths = ['/auth', '/create-show']

export default function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const isShowDetail = location.pathname.startsWith('/show/') && location.pathname !== '/show'

  if (hiddenPaths.includes(location.pathname) || isShowDetail) return null

  const isHome = location.pathname === '/'

  return (
    <nav
      className={`absolute bottom-0 left-0 right-0 z-50 h-16 flex items-center justify-around px-3 ${isHome
          ? 'bg-black/50 backdrop-blur-xl border-t border-white/5'
          : 'bg-[#0d0d22] border-t border-white/[0.06]'
        }`}
    >
      {navItems.map(({ path, label, icon: Icon }) => {
        const isActive = location.pathname === path

        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            className="relative flex flex-col items-center justify-center gap-1 py-1.5 px-4 btn-press transition-all duration-200"
          >
            {/* Active pill background */}
            {isActive && (
              <span
                className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/10 border border-purple-500/20"
                style={{ transition: 'opacity 0.2s' }}
              />
            )}

            {/* Icon */}
            <span className="relative">
              {path === '/live' && isActive ? (
                <span className="relative flex items-center justify-center">
                  <Icon
                    size={22}
                    className="text-purple-400 drop-shadow-[0_0_6px_rgba(139,92,246,0.8)]"
                    strokeWidth={2}
                  />
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-red-500 live-badge">
                    <span className="absolute inset-0 rounded-full bg-red-500 live-ring" />
                  </span>
                </span>
              ) : (
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.2 : 1.7}
                  className={
                    isActive
                      ? 'text-purple-400 drop-shadow-[0_0_6px_rgba(139,92,246,0.7)]'
                      : 'text-white/35'
                  }
                />
              )}
            </span>

            {/* Label */}
            <span
              className={`text-[10px] font-semibold relative ${isActive ? 'text-purple-400' : 'text-white/30'
                }`}
            >
              {label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
