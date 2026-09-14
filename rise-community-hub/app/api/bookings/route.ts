import { createClient } from '../../../lib/supabase/client'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const { customer_name, customer_email, booking_type, booking_date, time_slot, message } = await request.json()

  if (!customer_name || !customer_email || !booking_date) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const supabase = createClient()
  const { error } = await supabase.from('bookings').insert({
    customer_name,
    customer_email,
    booking_type,
    booking_date,
    time_slot,
    message,
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  await resend.emails.send({
    from: 'The Hub <info@risecommunityhub.org>',
    to: process.env.ADMIN_EMAILS!,
    subject: `New booking request: ${customer_name}`,
    html: `<p>${customer_name} (${customer_email}) requested ${booking_type} on ${booking_date}.</p>`,
  })

  return NextResponse.json({ success: true })
}