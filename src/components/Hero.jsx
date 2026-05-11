import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useClerk, useUser } from "@clerk/clerk-react"
import userGroup from "../assets/user_group.png"
import { AiToolsData } from "../assets/assets"

const Hero = () => {
  const navigate = useNavigate()
  const { user } = useUser()
  const { openSignIn } = useClerk()
  const canvasRef = useRef(null)
  const [chatOpen, setChatOpen] = useState(false)
  const [chatClosed, setChatClosed] = useState(false)
  const [messages, setMessages] = useState([
    { from: 'bot', text: "👋 Hi! I'm Nova, your AI assistant. Welcome to CyberNova AI! I can help you write content, prep for interviews, score your resume, and more. What would you like to explore?" }
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (!chatClosed) {
      const timer = setTimeout(() => setChatOpen(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [chatClosed])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationId
    let particles = []
    let mouse = { x: null, y: null }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    })

    class Particle {
      constructor() { this.reset() }
      reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.z = Math.random() * 1000
        this.size = Math.random() * 2.5 + 0.5
        this.speedZ = Math.random() * 2 + 0.5
        this.color = Math.random() > 0.5 ? `rgba(0,198,255,` : `rgba(0,114,255,`
        this.opacity = Math.random() * 0.7 + 0.3
        this.vx = 0; this.vy = 0
      }
      update() {
        this.z -= this.speedZ
        if (this.z <= 0) this.reset()
        const scale = 1000 / (1000 + this.z)
        const cx = canvas.width / 2, cy = canvas.height / 2
        this.sx = cx + (this.x - cx) * scale
        this.sy = cy + (this.y - cy) * scale
        this.sr = this.size * scale
        if (mouse.x && mouse.y) {
          const dx = mouse.x - this.sx, dy = mouse.y - this.sy
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            const force = (120 - dist) / 120
            this.vx -= (dx / dist) * force * 2
            this.vy -= (dy / dist) * force * 2
          }
        }
        this.x += this.vx; this.y += this.vy
        this.vx *= 0.95; this.vy *= 0.95
      }
      draw() {
        const scale = 1000 / (1000 + this.z)
        ctx.beginPath()
        ctx.arc(this.sx, this.sy, Math.max(this.sr, 0.1), 0, Math.PI * 2)
        ctx.fillStyle = this.color + (this.opacity * scale) + ')'
        ctx.fill()
        ctx.beginPath()
        ctx.arc(this.sx, this.sy, Math.max(this.sr * 2.5, 0.1), 0, Math.PI * 2)
        ctx.fillStyle = this.color + (0.05 * scale) + ')'
        ctx.fill()
      }
    }

    for (let i = 0; i < 180; i++) particles.push(new Particle())

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].sx - particles[j].sx
          const dy = particles[i].sy - particles[j].sy
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(particles[i].sx, particles[i].sy)
            ctx.lineTo(particles[j].sx, particles[j].sy)
            ctx.strokeStyle = `rgba(0,198,255,${(1 - dist / 100) * 0.15})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => { p.update(); p.draw() })
      drawConnections()
      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  const sendMessage = async () => {
    if (!input.trim()) return
    const userMsg = input.trim()
    setMessages(prev => [...prev, { from: 'user', text: userMsg }])
    setInput('')
    setTyping(true)
    await new Promise(r => setTimeout(r, 1000))
    const lower = userMsg.toLowerCase()
    let reply = "I can help you with AI writing, image generation, interview prep, resume scoring, and job applications. What interests you?"
    if (lower.includes('write') || lower.includes('article') || lower.includes('blog'))
      reply = "✍️ Our AI Writing tool can generate blogs, articles, and copy in seconds! Click 'Start creating now' to try it."
    else if (lower.includes('image') || lower.includes('picture') || lower.includes('generate'))
      reply = "🎨 Our Image Generation tool creates stunning visuals from text prompts. Head to the dashboard to explore!"
    else if (lower.includes('interview') || lower.includes('mock'))
      reply = "🎤 Our AI Mock Interview feature simulates real interview scenarios and gives you feedback. Ready to practice?"
    else if (lower.includes('resume') || lower.includes('ats') || lower.includes('cv'))
      reply = "📄 Our ATS Resume Scorer analyzes your resume and gives you a detailed score with improvement tips!"
    else if (lower.includes('job') || lower.includes('cover letter') || lower.includes('apply'))
      reply = "💼 Our Job Application Assistant auto-generates cover letters, tailored resumes, and emails for each job!"
    else if (lower.includes('history') || lower.includes('saved') || lower.includes('past'))
      reply = "🕘 Your History section saves all your past AI generations so you can revisit and reuse them anytime!"
    else if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey'))
      reply = "👋 Hello! I'm Nova. I'm here to guide you through CyberNova AI. What can I help you with today?"
    else if (lower.includes('price') || lower.includes('cost') || lower.includes('free'))
      reply = "💡 CyberNova AI offers a free plan to get started. Premium plans unlock unlimited generations and more tools!"
    setMessages(prev => [...prev, { from: 'bot', text: reply }])
    setTyping(false)
  }

  // Extra cards without paths (no navigation)
  const extraFeatures = [
    { icon: '🕘', title: 'History Saver', desc: 'Every AI generation is saved automatically. Revisit, reuse, and build on your past work anytime.' },
    { icon: '🎤', title: 'AI Mock Interview', desc: 'Practice with AI-powered mock interviews. Get real-time feedback and ace your next interview.' },
    { icon: '📄', title: 'ATS Resume Scorer', desc: 'Upload your resume and get an instant ATS score with actionable tips to beat applicant filters.' },
    { icon: '💼', title: 'Job Application Assistant', desc: 'AI auto-generates tailored cover letters, emails, and resumes for every job you apply to.' },
  ]

  const brands = [
    { name: 'NETFLIX', color: '#e50914' },
    { name: 'Google', color: '#4285F4' },
    { name: 'LinkedIn', color: '#0077b5' },
    { name: 'Instagram', color: '#C13584' },
    { name: 'facebook', color: '#1877f2' },
    { name: 'slack', color: '#b39ddb' },
  ]

  const handleCardClick = (path) => {
    if (!user) {
      openSignIn()
    } else {
      navigate(path)
    }
  }

  return (
    <div style={{
      fontFamily: "'DM Sans', sans-serif",
      background: '#0a0e1a',
      color: '#f0f6ff',
      minHeight: '100vh',
      overflowX: 'hidden',
    }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        .bg-mesh { position: fixed; inset: 0; z-index: 0; pointer-events: none; background: radial-gradient(ellipse 80% 60% at 10% 20%, rgba(0,114,255,0.18) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 90% 80%, rgba(0,198,255,0.13) 0%, transparent 55%), #0a0e1a; }
        .bg-grid { position: fixed; inset: 0; z-index: 0; pointer-events: none; opacity: 0.04; background-image: linear-gradient(rgba(0,198,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,198,255,1) 1px, transparent 1px); background-size: 60px 60px; }
        .orb1 { position: fixed; width: 500px; height: 500px; border-radius: 50%; background: #0072FF; top: -100px; left: -100px; filter: blur(80px); opacity: 0.12; pointer-events: none; z-index: 0; }
        .orb2 { position: fixed; width: 400px; height: 400px; border-radius: 50%; background: #00C6FF; bottom: 0; right: -80px; filter: blur(80px); opacity: 0.12; pointer-events: none; z-index: 0; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @keyframes chatPop { from { opacity: 0; transform: scale(0.85) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes botPulse { 0%,100% { box-shadow: 0 0 0 0 rgba(0,198,255,0.4); } 70% { box-shadow: 0 0 0 10px rgba(0,198,255,0); } }
        .fade1 { animation: fadeUp 0.6s 0.0s ease both; }
        .fade2 { animation: fadeUp 0.6s 0.1s ease both; }
        .fade3 { animation: fadeUp 0.6s 0.2s ease both; }
        .fade4 { animation: fadeUp 0.6s 0.3s ease both; }
        .fade5 { animation: fadeUp 0.6s 0.4s ease both; }
        .fade6 { animation: fadeUp 0.6s 0.5s ease both; }
        .badge-dot { width: 6px; height: 6px; border-radius: 50%; background: #00C6FF; box-shadow: 0 0 8px #00C6FF; animation: pulse 2s infinite; flex-shrink: 0; }
        .btn-primary:hover { transform: translateY(-2px) scale(1.03) !important; box-shadow: 0 10px 36px rgba(0,198,255,0.5) !important; }
        .btn-secondary:hover { border-color: #00C6FF !important; color: #fff !important; background: rgba(0,198,255,0.07) !important; }
        .ai-card { transition: all 0.3s ease; cursor: pointer; }
        .ai-card:hover { transform: translateY(-6px) !important; box-shadow: 0 16px 48px rgba(0,114,255,0.2) !important; }
        .extra-card { transition: all 0.3s ease; }
        .extra-card:hover { border-color: rgba(0,198,255,0.35) !important; background: rgba(0,198,255,0.07) !important; transform: translateY(-4px) !important; box-shadow: 0 12px 40px rgba(0,114,255,0.15) !important; }
        .brand:hover { opacity: 0.8 !important; }
        .chat-window { animation: chatPop 0.3s ease both; }
        .bot-btn { animation: botPulse 2s infinite; }
        .chat-input:focus { outline: none; border-color: rgba(0,198,255,0.5) !important; }
        .chat-msg-user { background: linear-gradient(135deg, #00C6FF, #0072FF); color: #fff; border-radius: 16px 16px 4px 16px; align-self: flex-end; }
        .chat-msg-bot { background: rgba(255,255,255,0.06); border: 1px solid rgba(0,198,255,0.15); color: rgba(220,235,255,0.9); border-radius: 16px 16px 16px 4px; align-self: flex-start; }
        .send-btn:hover { background: rgba(0,198,255,0.2) !important; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(0,198,255,0.3); border-radius: 4px; }
      `}</style>

      <div className="bg-mesh" />
      <div className="bg-grid" />
      <div className="orb1" />
      <div className="orb2" />

      <canvas ref={canvasRef} style={{
        position: 'fixed', top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 0, pointerEvents: 'none',
      }} />

      {/* ── HERO ── */}
      <main style={{
        position: 'relative', zIndex: 1,
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '120px 24px 80px', textAlign: 'center',
      }}>
        <div className="fade1" style={{
          display: 'inline-flex', alignItems: 'center', gap: 7,
          background: 'rgba(0,198,255,0.08)', border: '1px solid rgba(0,198,255,0.25)',
          borderRadius: '50px', padding: '6px 16px',
          fontSize: '0.78rem', fontWeight: 500, color: '#00C6FF',
          marginBottom: 28, letterSpacing: '0.5px',
        }}>
          <span className="badge-dot" />
          AI at Your Fingertips
        </div>

        <h1 className="fade2" style={{
          fontFamily: 'Syne, sans-serif',
          fontSize: 'clamp(2.4rem, 5.5vw, 4.6rem)',
          fontWeight: 800, lineHeight: 1.1, color: '#fff', marginBottom: 16,
        }}>
          Create Stunning Content<br />
          with{' '}
          <span style={{ background: 'linear-gradient(90deg, #00C6FF, #0072FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            AI tools
          </span>
        </h1>

        <p className="fade3" style={{
          fontSize: 'clamp(0.92rem, 2vw, 1.1rem)',
          color: 'rgba(200,220,255,0.6)', maxWidth: 520, lineHeight: 1.7, marginBottom: 44,
        }}>
          Transform your content creation with our suite of premium AI tools.
          Write articles, generate images, prep for interviews, and enhance your workflow.
        </p>

        <div className="fade4" style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 52 }}>
          <button className="btn-primary" onClick={() => user ? navigate('/ai') : openSignIn()} style={{
            background: 'linear-gradient(135deg, #00C6FF 0%, #0072FF 100%)',
            color: '#fff', border: 'none', cursor: 'pointer',
            fontFamily: 'DM Sans, sans-serif', fontSize: '0.95rem', fontWeight: 600,
            padding: '14px 34px', borderRadius: '50px',
            boxShadow: '0 6px 28px rgba(0,114,255,0.4)', transition: 'all 0.25s ease',
          }}>
            Start creating now
          </button>

          <button className="btn-secondary" style={{
            background: 'transparent', color: 'rgba(200,220,255,0.85)',
            border: '1px solid rgba(0,198,255,0.25)', cursor: 'pointer',
            fontFamily: 'DM Sans, sans-serif', fontSize: '0.95rem', fontWeight: 500,
            padding: '14px 34px', borderRadius: '50px',
            display: 'flex', alignItems: 'center', gap: 10, transition: 'all 0.25s ease',
          }}>
            <span style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(0,198,255,0.15)', border: '1px solid rgba(0,198,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem' }}>▶</span>
            Watch demo
          </button>
        </div>

        <div className="fade5" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src={userGroup} alt="user group" style={{ width: 100, objectFit: 'contain' }} />
          <span style={{ fontSize: '0.83rem', color: 'rgba(200,220,255,0.55)' }}>
            Trusted by <strong style={{ color: 'rgba(200,220,255,0.85)' }}>10k+ people</strong>
          </span>
        </div>
      </main>

      {/* ── BRANDS ── */}
      <div className="fade6" style={{ position: 'relative', zIndex: 1, padding: '0 48px 64px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: 2, color: 'rgba(200,220,255,0.3)', marginBottom: 28 }}>
          Trusted by teams at
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 48, flexWrap: 'wrap' }}>
          {brands.map((b, i) => (
            <span key={i} className="brand" style={{ fontSize: '1.1rem', fontWeight: 700, color: b.color, opacity: 0.35, transition: 'opacity 0.3s', cursor: 'default' }}>{b.name}</span>
          ))}
        </div>
      </div>

      {/* ── AI TOOLS FROM ASSETS (clickable, navigate to page) ── */}
      <div style={{ position: 'relative', zIndex: 1, padding: '0 48px 20px', maxWidth: 1100, margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, color: '#fff', textAlign: 'center', marginBottom: 8 }}>
          Everything you need
        </h2>
        <p style={{ textAlign: 'center', color: 'rgba(200,220,255,0.5)', marginBottom: 40, fontSize: '0.95rem' }}>
          One platform. Infinite possibilities.
        </p>

        {/* ── AI Tools Cards — from AiToolsData, clickable ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 20, marginBottom: 20 }}>
          {AiToolsData.map((tool, i) => (
            <div
              key={i}
              className="ai-card"
              onClick={() => handleCardClick(tool.path)}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(0,198,255,0.15)',
                borderRadius: 20, padding: '28px 24px',
                backdropFilter: 'blur(10px)',
              }}
            >
              {/* Icon with tool's own gradient color */}
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: `linear-gradient(135deg, ${tool.bg.from}, ${tool.bg.to})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 16, boxShadow: `0 4px 16px ${tool.bg.from}44`,
              }}>
                <tool.Icon size={22} color="#fff" />
              </div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: 8 }}>
                {tool.title}
              </div>
              <div style={{ fontSize: '0.83rem', color: 'rgba(200,220,255,0.5)', lineHeight: 1.6, marginBottom: 16 }}>
                {tool.description}
              </div>
              {/* Try now label */}
              <div style={{ fontSize: '0.78rem', color: tool.bg.from, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                Try now →
              </div>
            </div>
          ))}
        </div>

        {/* ── Extra Feature Cards (no path yet) ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 20, marginBottom: 40 }}>
          {extraFeatures.map((f, i) => (
            <div key={i} className="extra-card" style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(0,198,255,0.15)',
              borderRadius: 20, padding: '28px 24px',
              backdropFilter: 'blur(10px)',
            }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg, rgba(0,198,255,0.15), rgba(0,114,255,0.25))', border: '1px solid rgba(0,198,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', marginBottom: 16 }}>{f.icon}</div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: 8 }}>{f.title}</div>
              <div style={{ fontSize: '0.83rem', color: 'rgba(200,220,255,0.5)', lineHeight: 1.6, marginBottom: 16 }}>{f.desc}</div>
              <div style={{ fontSize: '0.78rem', color: 'rgba(0,198,255,0.5)', fontWeight: 600 }}>Coming soon →</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CHATBOT ── */}
      {!chatOpen && (
        <button className="bot-btn" onClick={() => { setChatOpen(true); setChatClosed(false) }} style={{
          position: 'fixed', bottom: 28, right: 28, zIndex: 1000,
          width: 56, height: 56, borderRadius: '50%',
          background: 'linear-gradient(135deg, #00C6FF, #0072FF)',
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.4rem', boxShadow: '0 8px 24px rgba(0,114,255,0.5)',
        }} title="Chat with Nova">🤖</button>
      )}

      {chatOpen && (
        <div className="chat-window" style={{
          position: 'fixed', bottom: 28, right: 28, zIndex: 1000,
          width: 340, height: 480,
          background: 'rgba(10,14,26,0.97)',
          border: '1px solid rgba(0,198,255,0.25)',
          borderRadius: 20, display: 'flex', flexDirection: 'column',
          boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(0,114,255,0.15)',
          overflow: 'hidden', backdropFilter: 'blur(20px)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: 'linear-gradient(135deg, rgba(0,198,255,0.1), rgba(0,114,255,0.1))', borderBottom: '1px solid rgba(0,198,255,0.15)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #00C6FF, #0072FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>🤖</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#fff' }}>Nova</div>
                <div style={{ fontSize: '0.7rem', color: '#00C6FF' }}>● Online</div>
              </div>
            </div>
            <button onClick={() => { setChatOpen(false); setChatClosed(true) }} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'rgba(200,220,255,0.5)', fontSize: '1.1rem', padding: 4 }}>✕</button>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {messages.map((m, i) => (
              <div key={i} className={m.from === 'user' ? 'chat-msg-user' : 'chat-msg-bot'} style={{ padding: '10px 14px', fontSize: '0.83rem', lineHeight: 1.5, maxWidth: '85%' }}>
                {m.text}
              </div>
            ))}
            {typing && (
              <div className="chat-msg-bot" style={{ padding: '10px 14px', fontSize: '0.83rem' }}>Nova is typing...</div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div style={{ padding: '12px', borderTop: '1px solid rgba(0,198,255,0.1)', display: 'flex', gap: 8, alignItems: 'center' }}>
            <input className="chat-input" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} placeholder="Ask Nova anything..." style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(0,198,255,0.2)', borderRadius: 50, padding: '8px 14px', color: '#fff', fontSize: '0.82rem', transition: 'border-color 0.2s' }} />
            <button className="send-btn" onClick={sendMessage} style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(0,198,255,0.1)', border: '1px solid rgba(0,198,255,0.25)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00C6FF', fontSize: '0.9rem', transition: 'background 0.2s' }}>➤</button>
          </div>
        </div>
      )}

    </div>
  )
}

export default Hero