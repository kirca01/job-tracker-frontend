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
            setError('Failed to add application')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{ maxWidth: 500, margin: '60px auto', padding: 24 }}>
        <h2>Add Application</h2>
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