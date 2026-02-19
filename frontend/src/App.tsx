import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import HomePage from './pages/HomePage'
import LivePage from './pages/LivePage'
import ShowPage from './pages/ShowPage'
import ShowDetailPage from './pages/ShowDetailPage'
import CreateShowPage from './pages/CreateShowPage'
import ProfilePage from './pages/ProfilePage'
import AuthPage from './pages/AuthPage'
import BottomNav from './components/BottomNav'

function App() {
  return (
    <AuthProvider>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/live" element={<LivePage />} />
          <Route path="/show" element={<ShowPage />} />
          <Route path="/show/:id" element={<ShowDetailPage />} />
          <Route path="/create-show" element={<CreateShowPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <BottomNav />
      </div>
    </AuthProvider>
  )
}

export default App
