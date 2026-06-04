import React from 'react'
import { useClerk, useUser } from '@clerk/clerk-react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  PenLine, Hash, Image, ImageOff, Eraser,
  FileText, LogOut, User, LayoutDashboard, ChevronLeft,
} from 'lucide-react'

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard',          path: '/ai' },
  { icon: PenLine,         label: 'Write Article',       path: '/ai/write-article' },
  { icon: Hash,            label: 'Blog Titles',         path: '/ai/blog-titles' },
  { icon: Image,           label: 'Generate Images',     path: '/ai/generate-images' },
  { icon: ImageOff,        label: 'Remove Background',   path: '/ai/remove-background' },
  { icon: Eraser,          label: 'Remove Object',       path: '/ai/remove-object' },
  { icon: FileText,        label: 'Review Resume',       path: '/ai/review-resume' },
]

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser()
  const { signOut, openUserProfile } = useClerk()
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <>
      <style>{`
        .sidebar {
          width: 240px;
          flex-shrink: 0;
          height: 100%;
          background: rgba(255,255,255,0.02);
          border-right: 1px solid rgba(0,198,255,0.1);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform 0.3s ease;
        }
        @media (max-width: 640px) {
          .sidebar {
            position: absolute;
            top: 56px; bottom: 0;
            z-index: 40;
            transform: translateX(-100%);
          }
          .sidebar.open { transform: translateX(0); }
        }
      `}</style>

      <div className={`sidebar ${sidebar ? 'open' : ''}`}>
        <div>

          {/* User Info */}
          <div
            onClick={() => openUserProfile()}
            style={{
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 8,
              padding: '24px 16px 20px',
              borderBottom: '1px solid rgba(0,198,255,0.1)',
              cursor: 'pointer',
              textAlign: 'center',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,198,255,0.04)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            {user?.imageUrl ? (
              <img
                src={user.imageUrl}
                alt="avatar"
                style={{
                  width: 56, height: 56, borderRadius: '50%',
                  border: '2px solid rgba(0,198,255,0.4)',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: 'linear-gradient(135deg, #00C6FF, #0072FF)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 700, fontSize: '1.2rem',
              }}>
                {user?.firstName?.[0] || 'U'}
              </div>
            )}
            <div>
              <p style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 600 }}>
                {user?.fullName || 'User'}
              </p>
              <p style={{ color: 'rgba(0,198,255,0.6)', fontSize: '0.72rem', marginTop: 2 }}>
                {user?.primaryEmailAddress?.emailAddress || ''}
              </p>
            </div>
          </div>

          {/* Nav Items */}
          <div style={{ padding: '8px', marginTop: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {navItems.map((item, i) => {
              const isActive = location.pathname === item.path
              return (
                <div
                  key={i}
                  onClick={() => navigate(item.path)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '9px 14px', borderRadius: 10, cursor: 'pointer',
                    background: isActive
                      ? 'linear-gradient(135deg, rgba(0,198,255,0.15), rgba(0,114,255,0.08))'
                      : 'transparent',
                    border: isActive
                      ? '1px solid rgba(0,198,255,0.25)'
                      : '1px solid transparent',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(0,198,255,0.05)' }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
                >
                  <item.icon size={16} color={isActive ? '#00C6FF' : 'rgba(200,220,255,0.4)'} />
                  <span style={{
                    fontSize: '0.85rem',
                    color: isActive ? '#fff' : 'rgba(200,220,255,0.55)',
                    fontWeight: isActive ? 600 : 400,
                  }}>
                    {item.label}
                  </span>
                  {isActive && (
                    <div style={{
                      marginLeft: 'auto', width: 6, height: 6,
                      borderRadius: '50%', background: '#00C6FF',
                      boxShadow: '0 0 6px #00C6FF',
                    }} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          padding: '8px 8px 20px',
          borderTop: '1px solid rgba(0,198,255,0.1)',
          display: 'flex', flexDirection: 'column', gap: 2,
        }}>

          {/* Back to Home */}
          <div
            onClick={() => navigate('/')}
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '9px 14px', borderRadius: 10, cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,198,255,0.05)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <ChevronLeft size={16} color="rgba(200,220,255,0.4)" />
            <span style={{ fontSize: '0.85rem', color: 'rgba(200,220,255,0.5)' }}>
              Back to Home
            </span>
          </div>

          <div
            onClick={() => openUserProfile()}
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '9px 14px', borderRadius: 10, cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,198,255,0.05)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <User size={16} color="rgba(200,220,255,0.4)" />
            <span style={{ fontSize: '0.85rem', color: 'rgba(200,220,255,0.5)' }}>
              My Profile
            </span>
          </div>

          <div
            onClick={() => signOut()}
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '9px 14px', borderRadius: 10, cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,80,80,0.08)'
              e.currentTarget.querySelector('span').style.color = '#ff6b6b'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.querySelector('span').style.color = 'rgba(200,220,255,0.5)'
            }}
          >
            <LogOut size={16} color="rgba(200,220,255,0.4)" />
            <span style={{ fontSize: '0.85rem', color: 'rgba(200,220,255,0.5)', transition: 'color 0.2s' }}>
              Sign Out
            </span>
          </div>
        </div>

      </div>
    </>
  )
}

export default Sidebar