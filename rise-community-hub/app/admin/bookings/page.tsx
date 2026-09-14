'use client'

import { useEffect, useState } from 'react'

type Booking = {
  id: string
  customer_name: string
  customer_email: string
  booking_type: string
  booking_date: string
  time_slot: string
  status: string
}

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([])

  useEffect(() => {
    fetch('/api/admin/bookings')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setBookings(data)
      })
  }, [])

  async function updateStatus(id: string, status: string) {
    await fetch('/api/admin/bookings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    })
    setBookings(bookings.map((b) => (b.id === id ? { ...b, status } : b)))
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Bookings</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '2px solid #ddd' }}>
            <th>Name</th>
            <th>Type</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id} style={{ borderTop: '1px solid #ddd' }}>
              <td style={{ padding: '0.5rem 0' }}>
                {b.customer_name}<br />
                <small>{b.customer_email}</small>
              </td>
              <td>{b.booking_type}</td>
              <td>{b.booking_date}</td>
              <td>{b.time_slot}</td>
              <td>{b.status}</td>
              <td>
                <button onClick={() => updateStatus(b.id, 'confirmed')} style={{ marginRight: '0.5rem' }}>
                  Confirm
                </button>
                <button onClick={() => updateStatus(b.id, 'cancelled')}>
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}