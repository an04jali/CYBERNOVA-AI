import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import {
  PenLine,
  Hash,
  Image,
  ImageOff,
  Eraser,
  FileText,
  Clock,
  Mic,
  Briefcase,
  FileCheck,
  Zap
} from 'lucide-react'

import CreationItem from '../components/CreationItem'

const tools = [
  {
    icon: PenLine,
    label: 'AI Article Writer',
    desc: 'Generate high-quality articles instantly.',
    path: '/ai/write-article',
    from: '#22d3ee',
    to: '#2563eb',
    soon: false
  },
  {
    icon: Hash,
    label: 'Blog Title Generator',
    desc: 'Generate catchy blog titles.',
    path: '/ai/blog-titles',
    from: '#a855f7',
    to: '#6366f1',
    soon: false
  },
  {
    icon: Image,
    label: 'AI Image Generation',
    desc: 'Create AI generated visuals.',
    path: '/ai/generate-images',
    from: '#ec4899',
    to: '#f97316',
    soon: false
  },
  {
    icon: ImageOff,
    label: 'Background Removal',
    desc: 'Remove image backgrounds easily.',
    path: '/ai/remove-background',
    from: '#34d399',
    to: '#06b6d4',
    soon: false
  },
  {
    icon: Eraser,
    label: 'Object Removal',
    desc: 'Erase unwanted objects from images.',
    path: '/ai/remove-object',
    from: '#fbbf24',
    to: '#ef4444',
    soon: false
  },
  {
    icon: FileCheck,
    label: 'Resume Reviewer',
    desc: 'Review resumes with AI.',
    path: '/ai/review-resume',
    from: '#4ade80',
    to: '#059669',
    soon: false
  },
  {
    icon: Clock,
    label: 'History Saver',
    desc: 'Save all generations automatically.',
    path: null,
    from: '#64748b',
    to: '#475569',
    soon: true
  },
  {
    icon: Mic,
    label: 'AI Mock Interview',
    desc: 'Practice interviews using AI.',
    path: null,
    from: '#fb923c',
    to: '#ef4444',
    soon: true
  },
  {
    icon: FileText,
    label: 'ATS Resume Scorer',
    desc: 'Check ATS resume score instantly.',
    path: null,
    from: '#8b5cf6',
    to: '#6366f1',
    soon: true
  },
  {
    icon: Briefcase,
    label: 'Job Application Assistant',
    desc: 'Generate resumes and cover letters.',
    path: null,
    from: '#facc15',
    to: '#f97316',
    soon: true
  }
]

const Dashboard = () => {
  const { user } = useUser()
  const navigate = useNavigate()

  const [creations, setCreations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:5000/creations')
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

      {/* All Tools */}
      <div>
        <h2
          style={{
            color: '#fff',
            fontWeight: 700,
            fontSize: '18px',
            marginBottom: '16px'
          }}
        >
          All Tools
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px'
          }}
        >
          {tools.map((tool, i) => (
            <div
              key={i}
              onClick={() =>
                tool.path && navigate(tool.path)
              }
              style={{
                position: 'relative',
                borderRadius: '16px',
                padding: '20px',
                border:
                  '1px solid rgba(255,255,255,0.05)',
                background: 'rgba(255,255,255,0.03)',
                cursor: tool.path
                  ? 'pointer'
                  : 'default',
                opacity: tool.path ? 1 : 0.6
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: `linear-gradient(135deg,${tool.from},${tool.to})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px'
                }}
              >
                <tool.icon
                  size={20}
                  color="#fff"
                />
              </div>

              <h3
                style={{
                  color: '#fff',
                  fontSize: '14px'
                }}
              >
                {tool.label}
              </h3>

              <p
                style={{
                  color: '#64748b',
                  fontSize: '12px'
                }}
              >
                {tool.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard