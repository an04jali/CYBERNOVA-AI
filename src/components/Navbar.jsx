import React from 'react'
import logo from "../assets/logoo.png";
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useClerk, UserButton, useUser } from "@clerk/clerk-react"

const Navbar = () => {
  const navigate = useNavigate()
  const { user } = useUser()
  const { openSignIn } = useClerk()

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '1px 0px',
      background: 'rgba(10,14,26,0.6)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(0,198,255,0.15)',
    }}>

      {/* Logo */}
      <img
        src={logo}
        alt="logo"
        onClick={() => navigate('/')}
        style={{ cursor: "pointer" }}
        className='w-14 sm:w-20 object-contain'
      />

      {/* Auth */}
{user ? (
  <div style={{ marginRight: '16px' }}>
    <UserButton appearance={{
      elements: {
        avatarBox: {
          width: '38px',
          height: '38px',
        }
      }
    }} />
  </div>
) : (
  <button
    onClick={() => openSignIn()}
    style={{
      background: 'linear-gradient(135deg, #00C6FF 0%, #0072FF 100%)',
      color: '#fff', border: 'none', cursor: 'pointer',
      fontSize: '0.82rem', fontWeight: 600,
      padding: '9px 26px', borderRadius: '50px',
      display: 'flex', alignItems: 'center', gap: 7,
      boxShadow: '0 4px 20px rgba(0,114,255,0.35)',
      transition: 'all 0.25s ease',
      marginRight: '16px',
    }}
  >
    Get started <ArrowRight size={14} />
  </button>
)}

    </nav>
  )
}

export default Navbar