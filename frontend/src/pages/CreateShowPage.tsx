import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Loader2, Image } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'

const categories = ['Music', 'Comedy', 'Dance', 'Talent', 'Talk Show', 'Other']

export default function CreateShowPage() {
  const { user, loading: authLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth')
    }
  }, [user, authLoading, navigate])

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [coverUrl, setCoverUrl] = useState('')
  const [category, setCategory] = useState('Music')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [price, setPrice] = useState('')
  const [totalTickets, setTotalTickets] = useState('100')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!user) return

    if (!title.trim() || !date || !time) {
      setError('Title, date, and time are required')
      return
    }

    setLoading(true)
    setError('')

    const showDate = new Date(`${date}T${time}`)
    const priceInCents = Math.round((parseFloat(price) || 0) * 100)

    const { error: dbError } = await supabase.from('shows').insert({
      host_id: user.id,
      title: title.trim(),
      description: description.trim() || null,
      cover_image_url: coverUrl.trim() || null,
      category,
      show_date: showDate.toISOString(),
      ticket_price: priceInCents,
      total_tickets: parseInt(totalTickets) || 100,
    })

    if (dbError) {
      setError(dbError.message)
      setLoading(false)
      return
    }

    navigate('/profile')
  }

  return (
    <div className="page-content bg-iv-bg">
      <div className="px-4 pt-6 pb-8">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)} className="btn-press">
            <ArrowLeft size={24} className="text-white" />
          </button>
          <h1 className="text-2xl font-bold text-white">Schedule Show</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Cover Image URL */}
          <div>
            <label className="text-iv-text-secondary text-xs font-medium mb-1.5 block">
              Cover Image URL
            </label>
            <div className="relative">
              <input
                type="url"
                value={coverUrl}
                onChange={(e) => setCoverUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full bg-iv-card border border-iv-card-border rounded-xl px-4 py-3 text-white text-sm placeholder:text-iv-text-muted focus:outline-none focus:border-iv-purple transition-colors pl-10"
              />
              <Image size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-iv-text-muted" />
            </div>
            {coverUrl && (
              <div className="mt-2 rounded-xl overflow-hidden h-32 bg-iv-card border border-iv-card-border">
                <img src={coverUrl} alt="Cover preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
              </div>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="text-iv-text-secondary text-xs font-medium mb-1.5 block">
              Show Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Friday Night Freestyle"
              required
              className="w-full bg-iv-card border border-iv-card-border rounded-xl px-4 py-3 text-white text-sm placeholder:text-iv-text-muted focus:outline-none focus:border-iv-purple transition-colors"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-iv-text-secondary text-xs font-medium mb-1.5 block">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell viewers what to expect..."
              rows={3}
              className="w-full bg-iv-card border border-iv-card-border rounded-xl px-4 py-3 text-white text-sm placeholder:text-iv-text-muted focus:outline-none focus:border-iv-purple transition-colors resize-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-iv-text-secondary text-xs font-medium mb-1.5 block">
              Category
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all btn-press ${
                    category === cat
                      ? 'bg-iv-purple text-white'
                      : 'bg-iv-card border border-iv-card-border text-iv-text-secondary'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-iv-text-secondary text-xs font-medium mb-1.5 block">
                Date *
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full bg-iv-card border border-iv-card-border rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-iv-purple transition-colors [color-scheme:dark]"
              />
            </div>
            <div>
              <label className="text-iv-text-secondary text-xs font-medium mb-1.5 block">
                Time *
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                className="w-full bg-iv-card border border-iv-card-border rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-iv-purple transition-colors [color-scheme:dark]"
              />
            </div>
          </div>

          {/* Price & Tickets */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-iv-text-secondary text-xs font-medium mb-1.5 block">
                Ticket Price ($)
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                min="0"
                step="0.01"
                className="w-full bg-iv-card border border-iv-card-border rounded-xl px-4 py-3 text-white text-sm placeholder:text-iv-text-muted focus:outline-none focus:border-iv-purple transition-colors"
              />
            </div>
            <div>
              <label className="text-iv-text-secondary text-xs font-medium mb-1.5 block">
                Total Tickets
              </label>
              <input
                type="number"
                value={totalTickets}
                onChange={(e) => setTotalTickets(e.target.value)}
                placeholder="100"
                min="1"
                className="w-full bg-iv-card border border-iv-card-border rounded-xl px-4 py-3 text-white text-sm placeholder:text-iv-text-muted focus:outline-none focus:border-iv-purple transition-colors"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !title.trim() || !date || !time}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-base btn-press hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading && <Loader2 size={18} className="animate-spin" />}
            Schedule Show
          </button>
        </form>
      </div>
    </div>
  )
}
