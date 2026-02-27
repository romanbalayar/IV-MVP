import type { ShowWithHost, Profile } from '../types'

export const MOCK_USER_ID = 'mock-user-001'

export const MOCK_PROFILE: Profile = {
    id: MOCK_USER_ID,
    username: 'demo_user',
    display_name: 'Demo User',
    avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=demo_user`,
    is_host: false,
    created_at: new Date().toISOString(),
}

const now = new Date()
const inOneHour = new Date(now.getTime() + 1 * 60 * 60 * 1000).toISOString()
const inTwoDays = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString()
const inFiveDays = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString()
const inOneWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString()

export const MOCK_SHOWS: ShowWithHost[] = [
    {
        id: 'show-001',
        host_id: 'host-001',
        title: 'Underground Comedy Night',
        description:
            'A high-energy comedy showcase featuring the funniest up-and-coming comedians. Expect unfiltered laughs, crowd interaction, and surprise guest sets.',
        cover_image_url: null,
        category: 'Comedy',
        show_date: inOneHour,
        ticket_price: 1200,
        total_tickets: 200,
        tickets_sold: 147,
        youtube_url: null,
        is_live: false,
        is_featured: true,
        created_at: new Date().toISOString(),
        host_username: 'jokester_jay',
        host_display_name: 'Jay Martinez',
        host_avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=jay`,
    },
    {
        id: 'show-002',
        host_id: 'host-002',
        title: 'Acoustic Sessions Live',
        description:
            'An intimate acoustic performance featuring original songs and fan favorites. Bring your friends and enjoy a mellow night of soulful music.',
        cover_image_url: null,
        category: 'Music',
        show_date: inTwoDays,
        ticket_price: 800,
        total_tickets: 150,
        tickets_sold: 90,
        youtube_url: null,
        is_live: false,
        is_featured: false,
        created_at: new Date().toISOString(),
        host_username: 'melody_wave',
        host_display_name: 'Sarah Kim',
        host_avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=sarah`,
    },
    {
        id: 'show-003',
        host_id: 'host-003',
        title: 'Street Dance Battle',
        description:
            'Watch elite dancers battle it out in an electrifying street dance competition. Breakdance, popping, and freestyle — vote for your favorites live!',
        cover_image_url: null,
        category: 'Dance',
        show_date: inFiveDays,
        ticket_price: 1500,
        total_tickets: 300,
        tickets_sold: 212,
        youtube_url: null,
        is_live: false,
        is_featured: false,
        created_at: new Date().toISOString(),
        host_username: 'crew_battles',
        host_display_name: 'Marcus Lee',
        host_avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=marcus`,
    },
    {
        id: 'show-004',
        host_id: 'host-004',
        title: 'Talent Unlocked: Season 2',
        description:
            'The most diverse talent show on IV returns! Singers, magicians, comedians, and wild card acts compete for a fan-voted grand prize.',
        cover_image_url: null,
        category: 'Talent',
        show_date: inOneWeek,
        ticket_price: 1000,
        total_tickets: 500,
        tickets_sold: 388,
        youtube_url: null,
        is_live: false,
        is_featured: false,
        created_at: new Date().toISOString(),
        host_username: 'talent_hub',
        host_display_name: 'Taylor Brooks',
        host_avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=taylor`,
    },
]
