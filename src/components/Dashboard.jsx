import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

function StatCard({ label, value, accent = 'blue' }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
      <div className="text-slate-500 text-sm">{label}</div>
      <div className={`mt-2 text-2xl font-semibold text-${accent}-600`}>{value}</div>
    </div>
  )
}

export default function Dashboard() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [stats, setStats] = useState(null)
  const [timeline, setTimeline] = useState([])

  useEffect(() => {
    const load = async () => {
      try {
        const s = await fetch(`${baseUrl}/stats/summary`).then(r => r.json())
        setStats(s)
        const tl = await fetch(`${baseUrl}/activities?limit=20`).then(r => r.json())
        setTimeline(tl)
      } catch (e) {
        console.error(e)
      }
    }
    load()
  }, [])

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Contacts" value={stats?.total_contacts ?? '—'} />
        <StatCard label="Active Deals" value={stats?.active_deals ?? '—'} accent="emerald" />
        <StatCard label="Pipeline Value" value={`$${(stats?.pipeline_value ?? 0).toLocaleString()}`} accent="violet" />
        <StatCard label="Won Deals" value={stats?.won_deals ?? '—'} accent="amber" />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
        <div className="font-semibold text-slate-800 mb-3">Recent Activity</div>
        <div className="divide-y divide-slate-100">
          {timeline.length === 0 && <div className="text-slate-500 text-sm">No activity yet.</div>}
          {timeline.map((a) => (
            <div key={a.id} className="py-2 text-sm text-slate-700 flex items-center justify-between">
              <div>
                <span className="font-medium">{a.type}</span> — {a.message}
              </div>
              <span className="text-slate-400">{a.entity_type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
