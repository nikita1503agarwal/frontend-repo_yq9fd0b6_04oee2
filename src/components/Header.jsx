import { Search } from 'lucide-react'

export default function Header({ title, onSearch }) {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center px-6 sticky top-0 z-10">
      <div className="flex-1 text-slate-800 font-semibold text-lg">{title}</div>
      <div className="relative w-80 max-w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          type="text"
          placeholder="Search contacts, deals, companies..."
          onChange={(e) => onSearch?.(e.target.value)}
          className="w-full pl-9 pr-3 py-2 rounded-md border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </header>
  )
}
