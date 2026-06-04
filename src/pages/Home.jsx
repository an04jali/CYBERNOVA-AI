import React from 'react'
import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import AiTools from "../components/AiTools"
import Testimonials from "../components/Testimonials"
import Plan from "../components/Plan"
import Footer from "../components/Footer"

const Home = () => {
  return (
    <div style={{ background: '#0a0e1a', position: 'relative' }}>
      <Navbar />
      <Hero />
      {/* These sections sit above the fixed canvas from Hero */}
      <div style={{ position: 'relative', zIndex: 2, background: '#0a0e1a' }}>
        <AiTools />
        <Testimonials />
        <Plan />
        <Footer />
      </div>
    </div>
  )
}

export default Home