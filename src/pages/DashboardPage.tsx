import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAll, remove } from '../api/applications'
import type { JobApplication } from '../types'

const STATUS_COLORS: Record<string, string> = {
  Applied: 'bg-blue-500',
  Interview: 'bg-yellow-500',
  Offer: 'bg-green-500',
  Rejected: 'bg-red-500',
}

const STATUSES = ['All', 'Applied', 'Interview', 'Offer', 'Rejected']

export default function DashboardPage() {
  const navigate = useNavigate()
  const [applications, setApplications] = useState<JobApplication[]>([])
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
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

  const filtered = applications
    .filter(a => filter === 'All' || a.status === filter)
    .filter(a =>
      a.company.toLowerCase().includes(search.toLowerCase()) ||
      a.position.toLowerCase().includes(search.toLowerCase())
    )

  if (loading) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <p className="text-gray-400">Loading...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Job Tracker</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-sm">{email}</span>
            <button
              onClick={() => navigate('/stats')}
              className="text-sm bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-lg transition"
            >
              📊 Stats
            </button>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-400 hover:text-white transition"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Applications</h2>
          <button
            onClick={() => navigate('/add')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            + Add Application
          </button>
        </div>

        <div className="flex gap-3 mb-6">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by company or position..."
            className="flex-1 bg-gray-900 text-white rounded-lg px-4 py-2 border border-gray-800 focus:outline-none focus:border-blue-500"
          />
          <div className="flex gap-2">
            {STATUSES.map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-3 py-2 rounded-lg text-sm transition ${
                  filter === s
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-900 text-gray-400 hover:text-white border border-gray-800'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg">No applications found.</p>
          </div>
        ) : (
          <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left px-6 py-4 text-gray-400 font-medium text-sm">Company</th>
                  <th className="text-left px-6 py-4 text-gray-400 font-medium text-sm">Position</th>
                  <th className="text-left px-6 py-4 text-gray-400 font-medium text-sm">Status</th>
                  <th className="text-left px-6 py-4 text-gray-400 font-medium text-sm">Date</th>
                  <th className="text-left px-6 py-4 text-gray-400 font-medium text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((app, index) => (
                  <tr key={app.id} className={index !== filtered.length - 1 ? 'border-b border-gray-800' : ''}>
                    <td className="px-6 py-4 font-medium">{app.company}</td>
                    <td className="px-6 py-4 text-gray-300">{app.position}</td>
                    <td className="px-6 py-4">
                      <span className={`${STATUS_COLORS[app.status]} text-white text-xs px-2 py-1 rounded-full`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-sm">
                      {new Date(app.appliedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => navigate(`/edit/${app.id}`)}
                        className="text-blue-400 hover:text-blue-300 text-sm mr-4 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(app.id)}
                        className="text-red-400 hover:text-red-300 text-sm transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}