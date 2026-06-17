import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { X, Menu } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import logo from '../assets/logoo.png'

const Layout = () => {
  const navigate = useNavigate()
  const [sidebar, setSidebar] = useState(true)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#0a0e1a' }}>

      {/* Navbar */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px', minHeight: 56,
        borderBottom: '1px solid rgba(0,198,255,0.1)',
        background: '#0a0e1a',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <img
          src={logo}
          alt="CyberNova AI"
          onClick={() => navigate('/')}
          style={{ width: 250, objectFit: 'contain', cursor: 'pointer' }}
        />
        <button
          onClick={() => setSidebar(!sidebar)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#00C6FF', display: 'none' }}
          className="mobile-toggle"
        >
          {sidebar ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <style>{`
        @media (max-width: 640px) {
          .mobile-toggle { display: block !important; }
        }
      `}</style>

      {/* Body */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        <div style={{ flex: 1, padding: 24, overflowY: 'hidden', background: '#0a0e1a' }}>
          <Outlet />
        </div>
      </div>

    </div>
  )
}

export default Layout