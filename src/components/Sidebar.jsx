import { useState } from 'react'
import { Menu, LayoutDashboard, Users, Building2, Landmark, Mail, BarChart3, Settings } from 'lucide-react'

export default function Sidebar({ current, onNavigate }) {
  const [open, setOpen] = useState(true)

  const items = [
    { key: 'Dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
    { key: 'Contacts', icon: <Users size={18} />, label: 'Contacts' },
    { key: 'Companies', icon: <Building2 size={18} />, label: 'Companies' },
    { key: 'Deals', icon: <Landmark size={18} />, label: 'Deals' },
    { key: 'Mailing', icon: <Mail size={18} />, label: 'Mailing' },
    { key: 'Statistics', icon: <BarChart3 size={18} />, label: 'Statistics' },
    { key: 'Settings', icon: <Settings size={18} />, label: 'Settings' },
  ]

  return (
    <aside className={`h-screen bg-white border-r border-slate-200 transition-all duration-200 ${open ? 'w-64' : 'w-16'} sticky top-0`}> 
      <div className="flex items-center justify-between p-4">
        <div className="font-semibold text-slate-800">SimpleCRM</div>
        <button className="p-2 rounded hover:bg-slate-100" onClick={() => setOpen(!open)}>
          <Menu size={18} />
        </button>
      </div>
      <nav className="px-2 space-y-1">
        {items.map((item) => (
          <button
            key={item.key}
            onClick={() => onNavigate(item.key)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-100 text-left ${current === item.key ? 'bg-blue-50 text-blue-600' : 'text-slate-700'}`}
          >
            <span className="shrink-0">{item.icon}</span>
            {open && <span className="truncate">{item.label}</span>}
          </button>
        ))}
      </nav>
    </aside>
  )
}
