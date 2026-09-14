import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function Home() {
  const { data } = await supabase.from('site_settings').select('*')
  const links = data?.find((r) => r.key === 'social_links')?.value ?? {}
  const hours = data?.find((r) => r.key === 'booking_hours')?.value ?? {}

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Welcome to The Hub</h1>
      <p>
        Phone: {links.phone} · Email: {links.email}
      </p>
      <h3>Opening Hours</h3>
      <ul>
        {Object.entries(hours).map(([day, time]) => (
          <li key={day}>
            {day}: {time as string}
          </li>
        ))}
      </ul>
    </main>
  )
}