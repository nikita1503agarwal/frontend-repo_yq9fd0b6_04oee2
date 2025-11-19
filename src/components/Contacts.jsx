import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'

export default function Contacts() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [items, setItems] = useState([])
  const [query, setQuery] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState({ first_name: '', last_name: '', email: '', phone: '', tags: [], source: '', notes: '' })

  const load = async () => {
    const url = query ? `${baseUrl}/contacts?stage=${encodeURIComponent(query)}` : `${baseUrl}/contacts`
    const data = await fetch(url).then(r => r.json())
    setItems(data)
  }

  useEffect(() => { load() }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch(`${baseUrl}/contacts`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    if (res.ok) {
      setModalOpen(false)
      setForm({ first_name: '', last_name: '', email: '', phone: '', tags: [], source: '', notes: '' })
      load()
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <input className="border bg-white border-slate-200 rounded-md px-3 py-2 w-64" placeholder="Filter by stage..." value={query} onChange={(e)=>setQuery(e.target.value)} />
        <button onClick={() => setModalOpen(true)} className="inline-flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-md shadow hover:bg-blue-700">
          <Plus size={16} /> Add Contact
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-200">
        <table className="min-w-full">
          <thead>
            <tr className="text-left text-slate-500 text-sm">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Stage</th>
            </tr>
          </thead>
          <tbody>
            {items.map((c)=> (
              <tr key={c.id} className="border-t border-slate-100 text-sm hover:bg-slate-50">
                <td className="p-3">{c.first_name} {c.last_name}</td>
                <td className="p-3">{c.email || '—'}</td>
                <td className="p-3">{c.phone || '—'}</td>
                <td className="p-3">{c.funnel_stage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-6">
          <form onSubmit={onSubmit} className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 space-y-3">
            <div className="text-lg font-semibold text-slate-800">Add Contact</div>
            <div className="grid grid-cols-2 gap-3">
              <input className="border border-slate-200 rounded-md px-3 py-2" placeholder="First name" value={form.first_name} onChange={(e)=>setForm({...form, first_name: e.target.value})} required />
              <input className="border border-slate-200 rounded-md px-3 py-2" placeholder="Last name" value={form.last_name} onChange={(e)=>setForm({...form, last_name: e.target.value})} required />
              <input className="border border-slate-200 rounded-md px-3 py-2 col-span-2" placeholder="Email" value={form.email} onChange={(e)=>setForm({...form, email: e.target.value})} />
              <input className="border border-slate-200 rounded-md px-3 py-2 col-span-2" placeholder="Phone" value={form.phone} onChange={(e)=>setForm({...form, phone: e.target.value})} />
              <select className="border border-slate-200 rounded-md px-3 py-2 col-span-2" value={form.funnel_stage || 'New'} onChange={(e)=>setForm({...form, funnel_stage: e.target.value})}>
                {['New','Contacted','Qualified','Proposal Sent','Negotiation','Won','Lost'].map(s=> <option key={s} value={s}>{s}</option>)}
              </select>
              <textarea className="border border-slate-200 rounded-md px-3 py-2 col-span-2" placeholder="Notes" value={form.notes} onChange={(e)=>setForm({...form, notes: e.target.value})} />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={()=>setModalOpen(false)} className="px-3 py-2 rounded-md border border-slate-200">Cancel</button>
              <button type="submit" className="px-3 py-2 rounded-md bg-blue-600 text-white">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
