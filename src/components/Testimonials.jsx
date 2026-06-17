import React from 'react'
import akhil from "../assets/Akhil.jpeg";
import akarsh from "../assets/Akarsh.jpeg";
import diksha from "../assets/Diksha.jpeg";
import aanshi from "../assets/Aanshi.jpeg";
import garima from "../assets/Garima.jpeg";
import ranjans from "../assets/Ranjana.jpeg";
import aditi from "../assets/Aditi.jpeg";
import suraj from "../assets/Suraj.jpeg";
import yashasvi from "../assets/Yashasvi.jpeg";
const Testimonials = () => {

  const testimonials = [
  {
    id: 1,
    description: "CyberNova AI helped us reduce build time drastically. The tools feel production ready and consistent across the product.",
    image: akhil,
    name: "Akhil Shukla",
  },
  {
    id: 2,
    description: "We shipped our MVP weeks earlier than planned. CyberNova AI removed a huge amount of repetitive work.",
    image: akarsh,
    name: "Akarsh Goel",
  },
  {
    id: 3,
    description: "CyberNova AI strikes the right balance between flexibility and consistency. It feels like a system built by real product teams.",
    image: diksha,
    name: "Diksha Jaiswal",
  },
  {
    id: 4,
    description: "The AI tools make scaling content incredibly easy. Highly recommended for any product team.",
    image: ranjans,
    name: "Ranjana",
  },
  {
    id: 5,
    description: "CyberNova AI allows me to focus on building features instead of fighting repetitive tasks. Everything looks premium right out of the box.",
    image: aanshi,
    name: "Aanshi Gahlot",
  },
  {
    id: 6,
    description: "If you're building fast, CyberNova AI is a must-have. It dramatically speeds up development while keeping quality high.",
    image: yashasvi,
    name: "Yashasvi",
  },
  {
    id: 7,
    description: "CyberNova AI strikes the right balance between power and ease of use. Feels like it was built by people who ship real products.",
    image: suraj,
    name: "Suraj Singh",
  },
  {
    id: 8,
    description: "The AI writing tools alone saved us weeks. Consistency and quality across every output is outstanding.",
    image: aditi,
    name: "Aditi Gupta",
  },
];

  const columns = [
    { start: 0, end: 3, duration: '25s' },
    { start: 3, end: 6, duration: '30s' },
    { start: 6, end: 8, duration: '20s' },
  ]

  const renderCard = (testimonial, index) => (
    <div
      key={`${testimonial.id}-${index}`}
      style={{
        background: 'linear-gradient(to bottom, rgba(2,2,4,0.9), rgba(15,8,40,0.9))',
        border: '1px solid rgba(0,198,255,0.12)',
        borderRadius: 16,
        padding: '24px 20px',
        marginBottom: 16,
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(0,198,255,0.4)';
        e.currentTarget.style.transform = 'translateY(-5px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(0,198,255,0.12)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div style={{ marginBottom: 16 }}>
        <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g stroke="#00C6FF" strokeOpacity=".7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 13.056c.464 0 .91-.131 1.237-.364.329-.234.513-.55.513-.88v-3.73c0-.33-.184-.647-.513-.88C7.91 6.97 7.464 6.838 7 6.838c-.232 0-.455-.066-.619-.182-.164-.117-.256-.275-.256-.44v-.622c0-.33.184-.646.513-.879.328-.233.773-.364 1.237-.364.232 0 .455-.066.619-.182.164-.117.256-.275.256-.44V2.485c0-.165-.092-.323-.256-.44a1.1 1.1 0 0 0-.619-.181c-1.392 0-2.728.393-3.712 1.092-.985.7-1.538 1.649-1.538 2.638v6.218c0 .33.184.646.513.88.328.233.773.364 1.237.364zm9.83 0c.465 0 .91-.131 1.238-.364.328-.234.513-.55.513-.88v-3.73c0-.33-.184-.647-.513-.88-.328-.233-.773-.364-1.237-.364-.232 0-.455-.066-.619-.182-.164-.117-.256-.275-.256-.44v-.622c0-.33.184-.646.512-.879.329-.233.774-.364 1.238-.364.232 0 .454-.066.619-.182.164-.117.256-.275.256-.44V2.485c0-.165-.092-.323-.256-.44a1.1 1.1 0 0 0-.62-.181c-1.391 0-2.727.393-3.711 1.092-.985.7-1.538 1.649-1.538 2.638v6.218c0 .33.184.646.512.88.329.233.774.364 1.238.364z" />
          </g>
        </svg>
      </div>

      <p style={{ fontSize: '0.85rem', color: 'rgba(200,220,255,0.65)', lineHeight: 1.7, marginBottom: 16 }}>
        {testimonial.description}
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <img
          src={testimonial.image}
          alt={testimonial.name}
          style={{ width: 48, height: 48, borderRadius: '50%', border: '1px solid rgba(0,198,255,0.25)', objectFit: 'cover', flexShrink: 0 }}
        />
        <div>
          <p
            style={{
              fontSize: '0.9rem',
              color: 'rgba(220,235,255,0.95)',
              fontWeight: 600
            }}
          >
            {testimonial.name}
          </p>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <style>{`
        @keyframes scroll-up {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .scroll-col { animation: scroll-up linear infinite; }
        .scroll-col:hover { animation-play-state: paused; }
        .fade-top {
          position: absolute; top: 0; left: 0; right: 0; height: 120px;
          background: linear-gradient(to bottom, #0a0e1a, transparent);
          z-index: 2; pointer-events: none;
        }
        .fade-bottom {
          position: absolute; bottom: 0; left: 0; right: 0; height: 120px;
          background: linear-gradient(to top, #0a0e1a, transparent);
          z-index: 2; pointer-events: none;
        }
      `}</style>

      <div style={{
        background: '#0a0e1a',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px',
        position: 'relative',
        zIndex: 1,
      }}>

        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            color: '#fff',
            marginBottom: 12,
          }}>
            What Our Beta Users Say
          </h2>
          <p style={{
            fontSize: '0.95rem',
            color: 'rgba(200,220,255,0.5)',
            maxWidth: 480,
            margin: '0 auto',
            lineHeight: 1.6,
          }}>
           Feedback from early users who explored CyberNova AI and shared their experience.
          </p>
        </div>

        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: 1100,
          height: 600,
          minHeight: 600,
          overflow: 'hidden',
        }}>
          <div className="fade-top" />
          <div className="fade-bottom" />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, height: '100%' }}>
            {columns.map((col, colIndex) => (
              <div key={colIndex} style={{ overflow: 'hidden', height: '100%' }}>
                <div className="scroll-col" style={{ animationDuration: col.duration }}>
                  {[
                    ...testimonials.slice(col.start, col.end),
                    ...testimonials.slice(col.start, col.end),
                  ].map((t, i) => renderCard(t, i))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  )
}

export default Testimonials