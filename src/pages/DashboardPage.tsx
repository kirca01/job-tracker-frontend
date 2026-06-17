import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAll, remove } from '../api/applications'
import type { JobApplication } from '../types'

export default function DashboardPage() {
  const navigate = useNavigate()
  const [applications, setApplications] = useState<JobApplication[]>([])
  const [loading, setLoading] = useState(true)
  const email = localStorage.getItem('email')

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      const data = await getAll()
      setApplications(data)
    } catch {
      navigate('/login')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this application?')) return
    await remove(id)
    setApplications(prev => prev.filter(a => a.id !== id))
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    navigate('/login')
  }

  const statusColors: Record<string, string> = {
    Applied: '#3b82f6',
    Interview: '#f59e0b',
    Offer: '#10b981',
    Rejected: '#ef4444',
  }

  if (loading) return <p style={{ padding: 24 }}>Loading...</p>

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Job Tracker</h1>
        <div>
          <span style={{ marginRight: 16 }}>{email}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <button
        onClick={() => navigate('/add')}
        style={{ marginBottom: 24, padding: '10px 20px' }}
      >
        + Add Application
      </button>

      {applications.length === 0 ? (
        <p>No applications yet. Add your first one!</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #333' }}>Company</th>
              <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #333' }}>Position</th>
              <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #333' }}>Status</th>
              <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #333' }}>Date</th>
              <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #333' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(app => (
              <tr key={app.id}>
                <td style={{ padding: 8 }}>{app.company}</td>
                <td style={{ padding: 8 }}>{app.position}</td>
                <td style={{ padding: 8 }}>
                  <span style={{
                    background: statusColors[app.status],
                    color: 'white',
                    padding: '2px 8px',
                    borderRadius: 4,
                    fontSize: 12
                  }}>
                    {app.status}
                  </span>
                </td>
                <td style={{ padding: 8 }}>{new Date(app.appliedAt).toLocaleDateString()}</td>
                <td style={{ padding: 8 }}>
                  <button onClick={() => navigate(`/edit/${app.id}`)} style={{ marginRight: 8 }}>Edit</button>
                  <button onClick={() => handleDelete(app.id)} style={{ color: 'red' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}