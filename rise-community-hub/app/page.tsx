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
    <main className="min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-gray-900 border border-gray-800 rounded-2xl shadow-xl p-8 space-y-8">
        
        {/* Header Section */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-white">
            Welcome to The Hub
          </h1>
          <p className="text-gray-400 text-sm">
            Phone: <span className="text-gray-200 font-medium">{links.phone}</span> &bull; Email: <span className="text-gray-200 font-medium">{links.email}</span>
          </p>
        </div>

        {/* Opening Hours Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-200 border-b border-gray-800 pb-2">
            Opening Hours
          </h3>
          <ul className="divide-y divide-gray-800/60">
            {Object.entries(hours).map(([day, time]) => (
              <li key={day} className="py-3 flex justify-between items-center text-sm">
                <span className="capitalize font-medium text-gray-400">{day}</span>
                <span className="font-semibold text-gray-200">{time as string}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </main>
  )
}