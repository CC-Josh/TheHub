'use client'

import { useEffect, useState } from 'react'

export default function AdminSettings() {
  const [links, setLinks] = useState<Record<string, string>>({ facebook: '', instagram: '', phone: '', email: '' })
  const [hours, setHours] = useState<Record<string, string>>({ mon: '', tue: '', wed: '', thu: '', fri: '', sat: '', sun: '' })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((r) => r.json())
      .then((rows) => {
        if (Array.isArray(rows)) {
          const socialRow = rows.find((r: any) => r.key === 'social_links')
          const hoursRow = rows.find((r: any) => r.key === 'booking_hours')
          if (socialRow) setLinks(socialRow.value)
          if (hoursRow) setHours(hoursRow.value)
        }
      })
  }, [])

  async function save() {
    await fetch('/api/admin/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: 'social_links', value: links }),
    })
    await fetch('/api/admin/settings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: 'booking_hours', value: hours }),
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div style={{ padding: '2rem', maxWidth: 480 }}>
      <h1>Site Settings</h1>
      <h3>Links</h3>
      {Object.keys(links).map((k) => (
        <input
          key={k}
          placeholder={k}
          value={links[k]}
          onChange={(e) => setLinks({ ...links, [k]: e.target.value })}
          style={{ display: 'block', width: '100%', marginBottom: 8, padding: '0.5rem' }}
        />
      ))}
      <h3>Booking Hours</h3>
      {Object.keys(hours).map((k) => (
        <input
          key={k}
          placeholder={k}
          value={hours[k]}
          onChange={(e) => setHours({ ...hours, [k]: e.target.value })}
          style={{ display: 'block', width: '100%', marginBottom: 8, padding: '0.5rem' }}
        />
      ))}
      <button onClick={save} style={{ padding: '0.5rem 1rem', marginTop: '1rem' }}>
        Save
      </button>
      {saved && <p style={{ color: 'green' }}>Saved!</p>}
    </div>
  )
}