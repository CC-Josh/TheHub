'use client'

import { useState } from 'react'

export default function BookPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const form = new FormData(e.currentTarget)
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(form)),
    })
    setStatus(res.ok ? 'sent' : 'error')
  }

  if (status === 'sent') return <p>Thanks — we'll be in touch to confirm your booking!</p>

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 480, margin: '2rem auto' }}>
      <h1>Book a Room</h1>
      <input name="customer_name" placeholder="Your name" required style={{ display: 'block', width: '100%', marginBottom: '1rem', padding: '0.5rem' }} />
      <input name="customer_email" type="email" placeholder="Your email" required style={{ display: 'block', width: '100%', marginBottom: '1rem', padding: '0.5rem' }} />
      <input name="booking_type" placeholder="What is this booking for?" required style={{ display: 'block', width: '100%', marginBottom: '1rem', padding: '0.5rem' }} />
      <input name="booking_date" type="date" required style={{ display: 'block', width: '100%', marginBottom: '1rem', padding: '0.5rem' }} />
      <input name="time_slot" placeholder="Preferred time" style={{ display: 'block', width: '100%', marginBottom: '1rem', padding: '0.5rem' }} />
      <textarea name="message" placeholder="Anything else we should know?" style={{ display: 'block', width: '100%', marginBottom: '1rem', padding: '0.5rem' }} />
      <button type="submit" disabled={status === 'sending'} style={{ padding: '0.5rem 1rem' }}>
        {status === 'sending' ? 'Sending...' : 'Submit Request'}
      </button>
      {status === 'error' && <p style={{ color: 'red' }}>Something went wrong — please try again.</p>}
    </form>
  )
}