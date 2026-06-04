
import React, { useState } from 'react'

const typeGradients = {
  'AI Image':           ['#ec4899', '#f97316'],
  'Article':            ['#22d3ee', '#2563eb'],
  'Resume Review':      ['#4ade80', '#059669'],
  'Blog Title':         ['#a855f7', '#6366f1'],
  'Background Removal': ['#34d399', '#06b6d4'],
  'Object Removal':     ['#fbbf24', '#ef4444'],
}

const CreationItem = ({ item }) => {
  const date = new Date(item.createdAt).toLocaleDateString()
  const [from, to] = typeGradients[item.type] || ['#22d3ee', '#2563eb']

  return (
    <div
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
  )
}

export default CreationItem