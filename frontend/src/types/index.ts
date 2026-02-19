export interface Profile {
  id: string
  username: string | null
  display_name: string | null
  avatar_url: string | null
  is_host: boolean
  created_at: string
}

export interface Show {
  id: string
  host_id: string
  title: string
  description: string | null
  cover_image_url: string | null
  category: string
  show_date: string
  ticket_price: number
  total_tickets: number
  youtube_url: string | null
  is_live: boolean
  is_featured: boolean
  created_at: string
}

export interface ShowWithHost extends Show {
  host_username: string | null
  host_display_name: string | null
  host_avatar_url: string | null
  tickets_sold: number
}

export interface Ticket {
  id: string
  user_id: string
  show_id: string
  stripe_session_id: string | null
  stripe_payment_intent: string | null
  amount_paid: number
  purchased_at: string
}
