import { useState } from 'react'
import Spline from '@splinetool/react-spline'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import Contacts from './components/Contacts'

function App() {
  const [section, setSection] = useState('Dashboard')

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Layout */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar current={section} onNavigate={setSection} />

        {/* Main content */}
        <div className="flex-1 min-h-screen flex flex-col">
          <Header title={section} />

          {/* Hero with Spline on Dashboard only */}
          {section === 'Dashboard' && (
            <div className="relative h-64 bg-gradient-to-br from-blue-50 to-indigo-50 border-b border-slate-200 overflow-hidden">
              <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
            </div>
          )}

          {/* Section content */}
          {section === 'Dashboard' && <Dashboard />}
          {section === 'Contacts' && <Contacts />}

          {/* Placeholders for upcoming sections */}
          {section === 'Companies' && (
            <div className="p-8">Companies management coming next.</div>
          )}
          {section === 'Deals' && (
            <div className="p-8">Kanban pipeline coming next.</div>
          )}
          {section === 'Mailing' && (
            <div className="p-8">Bulk mailing with segments coming next.</div>
          )}
          {section === 'Statistics' && (
            <div className="p-8">Interactive charts coming next.</div>
          )}
          {section === 'Settings' && (
            <div className="p-8">Workspace settings coming next.</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
