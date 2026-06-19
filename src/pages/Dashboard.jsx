import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import { Zap } from 'lucide-react'

import CreationItem from '../components/CreationItem'

const Dashboard = () => {
  const { user } = useUser()
  const navigate = useNavigate()

  const [creations, setCreations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/creations`)
      .then((res) => res.json())
      .then((data) => {
        setCreations(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error fetching creations:', err)
        setLoading(false)
      })
  }, [])

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '1152px',
        margin: '0 auto'
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1
          style={{
            fontSize: '30px',
            fontWeight: 700,
            color: '#fff',
            fontFamily: 'Syne, sans-serif',
            margin: 0
          }}
        >
          Welcome back, {user?.firstName || 'User'} 👋
        </h1>

        <p
          style={{
            color: '#64748b',
            marginTop: '6px',
            fontSize: '14px'
          }}
        >
          Create powerful AI content with CyberNova AI
        </p>
      </div>

      {/* Stats */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          marginBottom: '32px'
        }}
      >
        <div
          style={{
            borderRadius: '16px',
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            border: '1px solid rgba(255,255,255,0.05)',
            background: 'rgba(255,255,255,0.03)'
          }}
        >
          <div>
            <p
              style={{
                color: '#64748b',
                fontSize: '12px',
                marginBottom: '8px'
              }}
            >
              Total Creations
            </p>

            <p
              style={{
                color: '#fff',
                fontSize: '30px',
                fontWeight: 700,
                margin: 0
              }}
            >
              {creations.length}
            </p>
          </div>

          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background:
                'linear-gradient(135deg,#22d3ee,#2563eb)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}
          >
            ✨
          </div>
        </div>

        <div
          style={{
            borderRadius: '16px',
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            border: '1px solid rgba(255,255,255,0.05)',
            background: 'rgba(255,255,255,0.03)'
          }}
        >
          <div>
            <p
              style={{
                color: '#64748b',
                fontSize: '12px'
              }}
            >
              Current Plan
            </p>

            <p
              style={{
                color: '#fff',
                fontSize: '24px',
                fontWeight: 700
              }}
            >
              Free
            </p>
          </div>

          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background:
                'linear-gradient(135deg,#a855f7,#4f46e5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ⚡
          </div>
        </div>

        <div
          style={{
            borderRadius: '16px',
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            border: '1px solid rgba(6,182,212,0.2)',
            background:
              'linear-gradient(135deg,rgba(0,198,255,0.08),rgba(0,114,255,0.08))'
          }}
        >
          <div>
            <p
              style={{
                color: '#22d3ee',
                fontSize: '12px',
                fontWeight: 600
              }}
            >
              🚀 Go Premium
            </p>

            <p
              style={{
                color: '#fff',
                fontWeight: 600
              }}
            >
              Unlock all tools
            </p>

            <p
              style={{
                color: '#64748b',
                fontSize: '12px'
              }}
            >
              28-day free trial
            </p>
          </div>

          <button
            onClick={() => navigate('/')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background:
                'linear-gradient(90deg,#22d3ee,#2563eb)',
              color: '#fff',
              border: 'none',
              padding: '8px 12px',
              borderRadius: '12px',
              cursor: 'pointer'
            }}
          >
            <Zap size={14} />
            Upgrade
          </button>
        </div>
      </div>

      {/* Recent Creations */}
      <div style={{ marginBottom: '40px' }}>
        <h2
          style={{
            color: '#fff',
            fontWeight: 700,
            fontSize: '18px',
            marginBottom: '16px'
          }}
        >
          Recent Creations
        </h2>

        {loading ? (
          <p style={{ color: '#94a3b8' }}>Loading...</p>
        ) : creations.length === 0 ? (
          <p style={{ color: '#94a3b8' }}>
            No creations found
          </p>
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}
          >
            {creations.map((item) => (
              <CreationItem
                key={item._id}
                item={item}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard