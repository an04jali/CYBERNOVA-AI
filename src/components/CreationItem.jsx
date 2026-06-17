import React, { useState } from 'react'

const typeGradients = {
  'AI Image':           ['#ec4899', '#f97316'],
  'Article':            ['#22d3ee', '#2563eb'],
  'Resume Review':      ['#4ade80', '#059669'],
  'Background Removal': ['#34d399', '#06b6d4'],
}

const CreationItem = ({ item }) => {
  const [showModal, setShowModal] = useState(false)
  const date = new Date(item.createdAt).toLocaleDateString()
  const [from, to] = typeGradients[item.type] || ['#22d3ee', '#2563eb']

  const getImageSrc = (result) => {
    if (!result) return null
    return result.startsWith('data:') ? result : `data:image/png;base64,${result}`
  }

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'16px 20px', borderRadius:'16px', border:'1px solid rgba(255,255,255,0.05)', background:'rgba(255,255,255,0.02)', transition:'all 0.2s', cursor:'pointer' }}
        onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(0,198,255,0.2)'; e.currentTarget.style.background='rgba(0,198,255,0.05)' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.05)'; e.currentTarget.style.background='rgba(255,255,255,0.02)' }}
      >
        <div style={{ display:'flex', alignItems:'center', gap:'16px' }}>
          <div style={{ width:'40px', height:'40px', borderRadius:'12px', background:`linear-gradient(135deg, ${from}, ${to})`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <span style={{ color:'#fff', fontSize:'14px', fontWeight:700 }}>
              {item.type?.[0] || 'A'}
            </span>
          </div>
          <div>
            <p style={{ color:'#fff', fontSize:'14px', fontWeight:600, margin:0 }}>{item.prompt}</p>
            <p style={{ color:'#64748b', fontSize:'12px', margin:'2px 0 0 0' }}>{item.type} • {date}</p>
          </div>
        </div>
        <span style={{ color:'#475569', fontSize:'12px', fontWeight:500 }}>View →</span>
      </div>

      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#0f1420',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '16px',
              padding: '28px',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '80vh',
              overflowY: 'auto',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width:'36px', height:'36px', borderRadius:'10px', background:`linear-gradient(135deg, ${from}, ${to})`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <span style={{ color:'#fff', fontSize:'13px', fontWeight:700 }}>
                    {item.type?.[0] || 'A'}
                  </span>
                </div>
                <div>
                  <p style={{ color:'#fff', fontSize:'15px', fontWeight:700, margin:0 }}>{item.prompt}</p>
                  <p style={{ color:'#64748b', fontSize:'12px', margin:'2px 0 0 0' }}>{item.type} • {date}</p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#64748b',
                  fontSize: '20px',
                  cursor: 'pointer',
                  lineHeight: 1,
                  padding: '4px',
                }}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px' }}>
              {item.type === 'AI Image' || item.type === 'Background Removal' ? (
                item.result ? (
                  <img
                    src={getImageSrc(item.result)}
                    alt={item.prompt}
                    style={{ width: '100%', borderRadius: '12px', display: 'block' }}
                  />
                ) : (
                  <p style={{ color: '#94a3b8', fontSize: '14px' }}>No image available for this creation.</p>
                )
              ) : item.result ? (
                <p style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: 1.7, whiteSpace: 'pre-wrap', margin: 0 }}>
                  {item.result}
                </p>
              ) : (
                <p style={{ color: '#94a3b8', fontSize: '14px' }}>No content available for this creation.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CreationItem