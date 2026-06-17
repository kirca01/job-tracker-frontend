import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { getStats } from '../api/applications'
import type { Stats } from "../types"; 

const COLORS = {
  Applied: '#3b82f6',
  Interview: '#f59e0b',
  Offer: '#10b981',
  Rejected: '#ef4444',    
}

export default function StatsPage() {
    const navigate = useNavigate()
    const [stats, setStats] = useState<Stats | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await getStats()
                setStats(data)
            } catch {
                navigate('/login')
            } finally {
                setLoading(false)
            }
        }
        fetch()
    }, [])

    if (loading) return <p style={{ padding: 24 }}>Loading...</p>
    if (!stats) return null

    const pieData = [
        { name: 'Applied', value: stats.applied },
        { name: 'Interview', value: stats.interview },
        { name: 'Offer', value: stats.offer },
        { name: 'Rejected', value: stats.rejected },
    ].filter(d => d.value > 0)

    return (
        <div style={{ maxWidth: 800, margin: '0 auto', padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
            <h1>Statistics</h1>
            <button onClick={() => navigate('/dashboard')}>← Back</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 40 }}>
            {[
            { label: 'Total', value: stats.total, color: '#6366f1' },
            { label: 'Applied', value: stats.applied, color: COLORS.Applied },
            { label: 'Interview', value: stats.interview, color: COLORS.Interview },
            { label: 'Offer', value: stats.offer, color: COLORS.Offer },
            ].map(card => (
            <div key={card.label} style={{
                background: '#1e1e1e',
                borderRadius: 8,
                padding: 16,
                textAlign: 'center',
                borderTop: `3px solid ${card.color}`
            }}>
                <div style={{ fontSize: 32, fontWeight: 'bold', color: card.color }}>{card.value}</div>
                <div style={{ color: '#aaa', marginTop: 4 }}>{card.label}</div>
            </div>
            ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            <div>
            <h3>Applications by Status</h3>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
                    {pieData.map(entry => (
                    <Cell key={entry.name} fill={COLORS[entry.name as keyof typeof COLORS]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
                </PieChart>
            </ResponsiveContainer>
            </div>

            <div>
            <h3>Conversion Rates</h3>
            <div style={{ marginTop: 16 }}>
                <div style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span>Interview Rate</span>
                    <span>{stats.interviewRate}%</span>
                </div>
                <div style={{ background: '#333', borderRadius: 4, height: 8 }}>
                    <div style={{ background: COLORS.Interview, width: `${stats.interviewRate}%`, height: '100%', borderRadius: 4 }} />
                </div>
                </div>
                <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span>Offer Rate</span>
                    <span>{stats.offerRate}%</span>
                </div>
                <div style={{ background: '#333', borderRadius: 4, height: 8 }}>
                    <div style={{ background: COLORS.Offer, width: `${stats.offerRate}%`, height: '100%', borderRadius: 4 }} />
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    )
}