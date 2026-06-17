import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getById, update } from '../api/applications'

export default function EditApplicationPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [company, setCompany] = useState('')
  const [position, setPosition] = useState('')
  const [notes, setNotes] = useState('')
  const [jobUrl, setJobUrl] = useState('')
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      const app = await getById(Number(id))
      setCompany(app.company)
      setPosition(app.position)
      setNotes(app.notes || '')
      setJobUrl(app.jobUrl || '')
      setStatus(app.status)
    }
    fetch()
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await update(Number(id), {
        company,
        position,
        notes: notes || undefined,
        jobUrl: jobUrl || undefined,
        status
      })
      navigate('/dashboard')
    } catch {
      setError('Failed to update application.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 500, margin: '60px auto', padding: 24 }}>
      <h2>Edit Application</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label>Company *</label>
          <input
            value={company}
            onChange={e => setCompany(e.target.value)}
            style={{ display: 'block', width: '100%', padding: 8, marginTop: 4 }}
            required
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Position *</label>
          <input
            value={position}
            onChange={e => setPosition(e.target.value)}
            style={{ display: 'block', width: '100%', padding: 8, marginTop: 4 }}
            required
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Status</label>
          <select
            value={status}
            onChange={e => setStatus(e.target.value)}
            style={{ display: 'block', width: '100%', padding: 8, marginTop: 4 }}
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Job URL</label>
          <input
            value={jobUrl}
            onChange={e => setJobUrl(e.target.value)}
            style={{ display: 'block', width: '100%', padding: 8, marginTop: 4 }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Notes</label>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            style={{ display: 'block', width: '100%', padding: 8, marginTop: 4 }}
            rows={3}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div style={{ display: 'flex', gap: 8 }}>
          <button type="submit" disabled={loading} style={{ padding: '10px 20px' }}>
            {loading ? 'Saving...' : 'Save'}
          </button>
          <button type="button" onClick={() => navigate('/dashboard')} style={{ padding: '10px 20px' }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}