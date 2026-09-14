'use client'

import { useEffect, useState } from 'react'

type Customer = {
  id: string
  first_name: string
  last_name: string
  email: string
  date_of_birth: string
  is_flagged: boolean
}

export default function AdminCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([])

  useEffect(() => {
    fetch('/api/admin/customers')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setCustomers(data)
      })
  }, [])

  async function toggleFlag(id: string, is_flagged: boolean) {
    await fetch('/api/admin/customers', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, is_flagged: !is_flagged }),
    })
    setCustomers(
      customers.map((c) => (c.id === id ? { ...c, is_flagged: !is_flagged } : c))
    )
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Customers</h1>
      <p>Flagged customers are excluded from birthday emails.</p>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '2px solid #ddd' }}>
            <th>Name</th>
            <th>Email</th>
            <th>Birthday</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id} style={{ borderTop: '1px solid #ddd' }}>
              <td style={{ padding: '0.5rem 0' }}>
                {c.first_name} {c.last_name}
              </td>
              <td>{c.email}</td>
              <td>{c.date_of_birth}</td>
              <td>{c.is_flagged ? 'Flagged (excluded)' : 'Active'}</td>
              <td>
                <button onClick={() => toggleFlag(c.id, c.is_flagged)}>
                  {c.is_flagged ? 'Unflag' : 'Flag'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}