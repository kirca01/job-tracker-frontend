import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { getStats } from '../api/applications'
import type { Stats } from '../types'

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

  if (loading) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <p className="text-gray-400">Loading...</p>
    </div>
  )

  if (!stats) return null

  const pieData = [
    { name: 'Applied', value: stats.applied },
    { name: 'Interview', value: stats.interview },
    { name: 'Offer', value: stats.offer },
    { name: 'Rejected', value: stats.rejected },
  ].filter(d => d.value > 0)

  const cards = [
    { label: 'Total', value: stats.total, color: 'border-indigo-500', textColor: 'text-indigo-400' },
    { label: 'Applied', value: stats.applied, color: 'border-blue-500', textColor: 'text-blue-400' },
    { label: 'Interview', value: stats.interview, color: 'border-yellow-500', textColor: 'text-yellow-400' },
    { label: 'Offer', value: stats.offer, color: 'border-green-500', textColor: 'text-green-400' },
  ]

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Job Tracker</h1>
          <button
            onClick={() => navigate('/dashboard')}
            className="text-sm text-gray-400 hover:text-white transition"
          >
            ← Back
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-semibold mb-8">Statistics</h2>

        <div className="grid grid-cols-4 gap-4 mb-10">
          {cards.map(card => (
            <div key={card.label} className={`bg-gray-900 border-t-2 ${card.color} border border-gray-800 rounded-2xl p-6 text-center`}>
              <div className={`text-4xl font-bold ${card.textColor}`}>{card.value}</div>
              <div className="text-gray-400 text-sm mt-2">{card.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-4">Applications by Status</h3>
            <ResponsiveContainer width="100%" height={280}>
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

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-6">Conversion Rates</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Interview Rate</span>
                  <span className="text-yellow-400 font-semibold">{stats.interviewRate}%</span>
                </div>
                <div className="bg-gray-800 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full transition-all"
                    style={{ width: `${stats.interviewRate}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Offer Rate</span>
                  <span className="text-green-400 font-semibold">{stats.offerRate}%</span>
                </div>
                <div className="bg-gray-800 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all"
                    style={{ width: `${stats.offerRate}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}