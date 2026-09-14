export const dynamic = 'force-dynamic';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function Home() {
  const { data } = await supabase.from('site_settings').select('*');
  const links = data?.find((r) => r.key === 'social_links')?.value ?? {};
  const hours = data?.find((r) => r.key === 'booking_hours')?.value ?? {};

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Header Navigation */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-bold text-lg text-indigo-600 tracking-tight">Rise Community Hub</span>
          <div className="text-sm font-medium text-slate-600 hidden sm:flex items-center gap-6">
            {links.phone && <span>📞 {links.phone}</span>}
            {links.email && <span>✉️ {links.email}</span>}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-12 grid gap-12 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <div className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold tracking-wide uppercase">
            Welcome to the Community
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Connecting and Empowering Our Community Together.
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Explore our schedule, connect with our networks, and get in touch. Everything you need is right here in one place.
          </p>
          
          {/* Social Links Row */}
          <div className="flex flex-wrap gap-4 pt-4">
            {links.instagram && (
              <a 
                href={`https://instagram.com/${links.instagram}`} 
                target="_blank" 
                rel="noreferrer" 
                className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 shadow-sm hover:border-indigo-300 hover:text-indigo-600 transition"
              >
                Instagram: @{links.instagram}
              </a>
            )}
            {links.facebook && (
              <a 
                href={`https://facebook.com/${links.facebook}`} 
                target="_blank" 
                rel="noreferrer" 
                className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 shadow-sm hover:border-indigo-300 hover:text-indigo-600 transition"
              >
                Facebook: {links.facebook}
              </a>
            )}
          </div>
        </div>

        {/* Opening Hours Sidebar Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4 mb-4">Opening Hours</h2>
            <ul className="space-y-3">
              {Object.keys(hours).length > 0 ? (
                Object.entries(hours).map(([day, time]) => (
                  <li key={day} className="flex justify-between text-sm capitalize">
                    <span className="font-medium text-slate-700">{day}</span>
                    <span className="text-slate-500">{time as string}</span>
                  </li>
                ))
              ) : (
                <p className="text-sm text-slate-400">No hours available.</p>
              )}
            </ul>
          </div>
          <div className="mt-8 pt-4 border-t border-slate-100 text-xs text-slate-400 text-center">
            Rise Community Hub &copy; {new Date().getFullYear()}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        Built with excellence for the community.
      </footer>
    </div>
  );
}