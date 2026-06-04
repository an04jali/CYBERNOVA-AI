import React from 'react'
import logo from '../assets/logoo.png'

const Footer = () => {
  return (
    <footer style={{
      background: '#0a0e1a',
      borderTop: '1px solid rgba(0,198,255,0.1)',
      padding: '60px 48px 24px',
      position: 'relative',
      zIndex: 2,
      fontFamily: "'DM Sans', sans-serif",
    }}>

      {/* Top Grid */}
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 48,
        marginBottom: 48,
      }}>

        {/* Brand */}
        <div>
          <img
            src={logo}
            alt="CyberNova AI"
            style={{ width: 250, objectFit: 'contain', marginBottom: 16 }}
          />
          <p style={{
            color: 'rgba(200,220,255,0.45)',
            fontSize: '0.85rem', lineHeight: 1.7, maxWidth: 260,
          }}>
            Transform your content creation with our suite of premium AI tools.
            Write, generate, and optimize — all in one place.
          </p>
          {/* Social icons */}
          <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
            {[
              { icon: '𝕏', label: 'Twitter' },
              { icon: 'in', label: 'LinkedIn' },
              { icon: 'f', label: 'Facebook' },
              { icon: '▶', label: 'YouTube' },
            ].map((s, i) => (
              <a key={i} href="#" title={s.label} style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'rgba(0,198,255,0.07)',
                border: '1px solid rgba(0,198,255,0.18)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'rgba(200,220,255,0.6)',
                fontSize: '0.75rem', fontWeight: 700,
                textDecoration: 'none',
                transition: 'all 0.25s ease',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(0,198,255,0.15)'
                  e.currentTarget.style.borderColor = 'rgba(0,198,255,0.4)'
                  e.currentTarget.style.color = '#00C6FF'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(0,198,255,0.07)'
                  e.currentTarget.style.borderColor = 'rgba(0,198,255,0.18)'
                  e.currentTarget.style.color = 'rgba(200,220,255,0.6)'
                }}
              >{s.icon}</a>
            ))}
          </div>
        </div>

        {/* Product */}
        <div>
          <h4 style={{
            color: '#fff', fontSize: '0.9rem', fontWeight: 700,
            marginBottom: 20, letterSpacing: '0.5px',
          }}>Product</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {['AI Article Writer', 'Image Generator', 'Resume Scorer', 'Mock Interview', 'Job Assistant', 'History Saver'].map((item, i) => (
              <a key={i} href="#" style={{
                color: 'rgba(200,220,255,0.45)',
                fontSize: '0.85rem', textDecoration: 'none',
                transition: 'color 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.color = '#00C6FF'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(200,220,255,0.45)'}
              >{item}</a>
            ))}
          </div>
        </div>

        {/* Company */}
        <div>
          <h4 style={{
            color: '#fff', fontSize: '0.9rem', fontWeight: 700,
            marginBottom: 20, letterSpacing: '0.5px',
          }}>Company</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {['About Us', 'Careers', 'Blog', 'Press Kit', 'Contact Us'].map((item, i) => (
              <a key={i} href="#" style={{
                color: 'rgba(200,220,255,0.45)',
                fontSize: '0.85rem', textDecoration: 'none',
                transition: 'color 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.color = '#00C6FF'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(200,220,255,0.45)'}
              >{item}</a>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h4 style={{
            color: '#fff', fontSize: '0.9rem', fontWeight: 700,
            marginBottom: 8, letterSpacing: '0.5px',
          }}>Stay in the loop</h4>
          <p style={{
            color: 'rgba(200,220,255,0.45)',
            fontSize: '0.82rem', lineHeight: 1.6, marginBottom: 16,
          }}>
            Get the latest AI news, tips and product updates weekly.
          </p>
          <div style={{ display: 'flex' }}>
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                flex: 1,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(0,198,255,0.2)',
                borderRight: 'none',
                borderRadius: '50px 0 0 50px',
                padding: '10px 16px',
                color: '#fff',
                fontSize: '0.82rem',
                outline: 'none',
              }}
            />
            <button style={{
              background: 'linear-gradient(135deg, #00C6FF, #0072FF)',
              border: 'none',
              borderRadius: '0 50px 50px 0',
              padding: '10px 18px',
              color: '#fff',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}>
              Subscribe
            </button>
          </div>

          {/* Trust badges */}
          <div style={{ display: 'flex', gap: 16, marginTop: 24, flexWrap: 'wrap' }}>
            {['🔒 SSL Secured', '⚡ 99.9% Uptime', '🌍 10k+ Users'].map((badge, i) => (
              <span key={i} style={{
                fontSize: '0.72rem',
                color: 'rgba(200,220,255,0.35)',
              }}>{badge}</span>
            ))}
          </div>
        </div>

      </div>

      {/* Divider */}
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        borderTop: '1px solid rgba(0,198,255,0.08)',
        paddingTop: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12,
      }}>
        <p style={{ color: 'rgba(200,220,255,0.25)', fontSize: '0.78rem' }}>
          © 2026 CyberNova AI. All rights reserved.
        </p>
        <div style={{ display: 'flex', gap: 24 }}>
          {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item, i) => (
            <a key={i} href="#" style={{
              color: 'rgba(200,220,255,0.25)',
              fontSize: '0.78rem', textDecoration: 'none',
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.color = '#00C6FF'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(200,220,255,0.25)'}
            >{item}</a>
          ))}
        </div>
      </div>

    </footer>
  )
}

export default Footer