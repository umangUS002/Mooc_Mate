import React from 'react'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

function Home() {

    return (
        <div style={{
            background: "radial-gradient(circle at center, rgba(91, 28, 154, 0.37) 0%, #000000 100%)"
        }}>
            <Navbar />
            <Hero />
            <Features />
            <Footer />
        </div>

    )
}

export default Home
