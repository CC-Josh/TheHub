import type { Config } from '@netlify/functions'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

export default async () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  const resend = new Resend(process.env.RESEND_API_KEY)

  const { data: customers, error } = await supabase.rpc('get_todays_birthdays')
  if (error)
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  if (!customers || customers.length === 0)
    return new Response(JSON.stringify({ message: 'No birthdays today' }))

  const results = await Promise.allSettled(
    customers.map((c: any) =>
      resend.emails.send({
        from: 'The Hub <info@risecommunityhub.org>',
        to: c.email,
        subject: `Happy Birthday, ${c.first_name}! 🎉`,
        html: `<p>Happy Birthday, ${c.first_name}! From all of us at The Hub.</p>`,
      })
    )
  )

  return new Response(
    JSON.stringify({
      sent: results.filter((r) => r.status === 'fulfilled').length,
    })
  )
}

export const config: Config = {
  schedule: '0 8 * * *',
}