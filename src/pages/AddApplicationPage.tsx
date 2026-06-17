import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { create } from '../api/applications'

export default function AddApplicationPage() {
  const navigate = useNavigate()
  const [company, setCompany] = useState('')
  const [position, setPosition] = useState('')
  const [notes, setNotes] = useState('')
  const [jobUrl, setJobUrl] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await create({
        company,
        position,
        notes: notes || undefined,
        jobUrl: jobUrl || undefined
      })
      navigate('/dashboard')
    } catch {
      setError('Failed to add application.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-xl font-bold">Job Tracker</h1>
        </div>
      </nav>

      <div className="max-w-xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-semibold mb-8">Add Application</h2>

        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Company *</label>
              <input
                value={company}
                onChange={e => setCompany(e.target.value)}
                className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 border border-gray-700 focus:outline-none focus:border-blue-500"
                placeholder="Google"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Position *</label>
              <input
                value={position}
                onChange={e => setPosition(e.target.value)}
                className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 border border-gray-700 focus:outline-none focus:border-blue-500"
                placeholder="Backend Developer"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Job URL</label>
              <input
                value={jobUrl}
                onChange={e => setJobUrl(e.target.value)}
                className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 border border-gray-700 focus:outline-none focus:border-blue-500"
                placeholder="https://careers.google.com/jobs/123"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Notes</label>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 border border-gray-700 focus:outline-none focus:border-blue-500"
                placeholder="Applied via LinkedIn..."
                rows={3}
              />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}