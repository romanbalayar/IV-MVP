import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Loader2, Image, CalendarDays, DollarSign, CheckCircle2 } from 'lucide-react'

const categories = ['Music', 'Comedy', 'Dance', 'Talent', 'Talk Show', 'Other']

const CATEGORY_EMOJI: Record<string, string> = {
  Music: '🎵', Comedy: '😂', Dance: '💃', Talent: '⭐', 'Talk Show': '🎙', Other: '🎭',
}

const STEPS = [
  { label: 'Details', icon: Image },
  { label: 'Schedule', icon: CalendarDays },
  { label: 'Pricing', icon: DollarSign },
]

export default function CreateShowPage() {
  const navigate = useNavigate()

  const [step, setStep] = useState(0) // 0, 1, 2
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

  function nextStep() {
    if (step === 0 && !title.trim()) { setError('Show title is required'); return }
    setError('')
    setStep((s) => Math.min(s + 1, 2))
  }

  function prevStep() {
    setError('')
    setStep((s) => Math.max(s - 1, 0))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!date || !time) { setError('Date and time are required'); return }
    setLoading(true)
    setError('')
    await new Promise((r) => setTimeout(r, 600))
    navigate('/profile')
  }

  return (
    <div className="page-content bg-[#07071a] relative overflow-hidden animate-fade-in">
      {/* Ambient */}
      <div className="absolute top-0 right-0 w-56 h-56 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)' }}
      />

      <div className="relative px-4 pt-6 pb-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full glass flex items-center justify-center btn-press">
            <ArrowLeft size={20} className="text-white" />
          </button>
          <div>
            <h1 className="text-xl font-black text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>Create Show</h1>
            <p className="text-white/35 text-xs">Schedule a global live event</p>
          </div>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-7">
          {STEPS.map((s, i) => {
            const done = i < step
            const active = i === step
            return (
              <div key={s.label} className="flex items-center gap-2 flex-1">
                <div className="flex flex-col items-center gap-1 flex-shrink-0">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${done
                        ? 'bg-green-500 glow-purple'
                        : active
                          ? 'bg-gradient-to-br from-purple-500 to-pink-500 glow-purple'
                          : 'bg-white/5 border border-white/10'
                      }`}
                  >
                    {done
                      ? <CheckCircle2 size={14} className="text-white" />
                      : <span className={`text-xs font-bold ${active ? 'text-white' : 'text-white/30'}`}>{i + 1}</span>
                    }
                  </div>
                  <span className={`text-[9px] font-semibold ${active ? 'text-purple-400' : done ? 'text-green-400' : 'text-white/25'}`}>
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="flex-1 h-0.5 mb-3 rounded-full overflow-hidden bg-white/5">
                    <div className={`h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500 ${i < step ? 'w-full' : 'w-0'}`} />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* ─── STEP 0: Details ───────────────────────────────────── */}
        {step === 0 && (
          <div className="space-y-5 animate-slide-up">
            {/* Cover image upload area */}
            <div>
              <label className="text-white/40 text-xs font-semibold mb-2 block uppercase tracking-wider">Cover Image</label>
              <div className="relative rounded-2xl overflow-hidden border-2 border-dashed border-white/10 bg-[#0f0f28] transition-colors hover:border-purple-500/30">
                {coverUrl ? (
                  <div className="relative" style={{ height: 160 }}>
                    <img
                      src={coverUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-end p-3">
                      <span className="text-white/70 text-xs">Tap URL below to change</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-10 gap-2">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                      <Image size={22} className="text-purple-400" />
                    </div>
                    <p className="text-white/40 text-sm font-medium">Cover Image</p>
                    <p className="text-white/20 text-xs">Paste image URL below</p>
                  </div>
                )}
              </div>
              <input
                type="url"
                value={coverUrl}
                onChange={(e) => setCoverUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full mt-2 bg-[#0f0f28] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            {/* Title */}
            <div>
              <label className="text-white/40 text-xs font-semibold mb-1.5 block uppercase tracking-wider">Show Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Friday Night Comedy Showcase"
                className="w-full bg-[#0f0f28] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-white/40 text-xs font-semibold mb-1.5 block uppercase tracking-wider">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell your global audience what to expect..."
                rows={3}
                className="w-full bg-[#0f0f28] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-purple-500 transition-colors resize-none"
              />
            </div>

            {/* Category */}
            <div>
              <label className="text-white/40 text-xs font-semibold mb-2 block uppercase tracking-wider">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition-all btn-press ${category === cat
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white glow-purple'
                        : 'bg-[#0f0f28] border border-white/[0.08] text-white/50 hover:text-white/70'
                      }`}
                  >
                    <span>{CATEGORY_EMOJI[cat]}</span>
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─── STEP 1: Schedule ──────────────────────────────────── */}
        {step === 1 && (
          <div className="space-y-5 animate-slide-up">
            <div className="bg-[#0f0f28] border border-white/[0.07] rounded-2xl p-4 mb-2">
              <p className="text-white/40 text-xs mb-1">You're scheduling</p>
              <p className="text-white font-bold text-lg leading-snug">{title || 'Your Show'}</p>
              <span className="text-purple-400 text-xs">{CATEGORY_EMOJI[category]} {category}</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-white/40 text-xs font-semibold mb-1.5 block uppercase tracking-wider">Date *</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full bg-[#0f0f28] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors [color-scheme:dark]"
                />
              </div>
              <div>
                <label className="text-white/40 text-xs font-semibold mb-1.5 block uppercase tracking-wider">Time *</label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                  className="w-full bg-[#0f0f28] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors [color-scheme:dark]"
                />
              </div>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
              <p className="text-purple-400 text-xs font-semibold mb-1">💡 Global Timezone</p>
              <p className="text-white/40 text-xs leading-relaxed">
                Your show will be accessible to fans worldwide, regardless of timezone.
                Attendees see it in their local time.
              </p>
            </div>
          </div>
        )}

        {/* ─── STEP 2: Pricing ───────────────────────────────────── */}
        {step === 2 && (
          <form onSubmit={handleSubmit} id="pricing-form">
            <div className="space-y-5 animate-slide-up">
              <div className="bg-[#0f0f28] border border-white/[0.07] rounded-2xl p-4 mb-2">
                <p className="text-white/40 text-xs mb-1">{CATEGORY_EMOJI[category]} {category}</p>
                <p className="text-white font-bold text-lg">{title}</p>
                {date && time && <p className="text-white/40 text-xs mt-1">📅 {date} at {time}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-white/40 text-xs font-semibold mb-1.5 block uppercase tracking-wider">Ticket Price ($)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-sm font-bold">$</span>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      className="w-full bg-[#0f0f28] border border-white/[0.08] rounded-xl pl-8 pr-4 py-3.5 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-white/40 text-xs font-semibold mb-1.5 block uppercase tracking-wider">Total Tickets</label>
                  <input
                    type="number"
                    value={totalTickets}
                    onChange={(e) => setTotalTickets(e.target.value)}
                    placeholder="100"
                    min="1"
                    className="w-full bg-[#0f0f28] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
              </div>

              {/* Revenue preview */}
              {price && totalTickets && (
                <div className="bg-yellow-400/5 border border-yellow-400/15 rounded-xl p-4">
                  <p className="text-yellow-400/70 text-xs font-semibold mb-2 uppercase tracking-wider">Revenue Estimate</p>
                  <div className="flex items-center justify-between">
                    <span className="text-white/50 text-sm">Gross (if sold out)</span>
                    <span className="text-yellow-400 font-black text-lg">
                      ${(parseFloat(price || '0') * parseInt(totalTickets || '0')).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-white/30 text-xs">Platform fee (~10%)</span>
                    <span className="text-white/30 text-xs">
                      -${(parseFloat(price || '0') * parseInt(totalTickets || '0') * 0.1).toFixed(2)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </form>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mt-4">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex gap-3 mt-7">
          {step > 0 && (
            <button
              type="button"
              onClick={prevStep}
              className="flex-1 py-3.5 rounded-xl bg-white/5 border border-white/[0.08] text-white font-semibold text-sm btn-press"
            >
              Back
            </button>
          )}
          {step < 2 ? (
            <button
              type="button"
              onClick={nextStep}
              className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-sm btn-press glow-purple"
            >
              Continue →
            </button>
          ) : (
            <button
              type="submit"
              form="pricing-form"
              disabled={loading || !title.trim() || !date || !time}
              className="flex-1 py-3.5 rounded-xl text-white font-black text-sm btn-press btn-glow disabled:opacity-40 flex items-center justify-center gap-2"
              style={{ background: 'linear-gradient(135deg, #8B5CF6, #EC4899)' }}
            >
              {loading && <Loader2 size={18} className="animate-spin" />}
              {loading ? 'Creating...' : '🎉 Schedule Show'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
