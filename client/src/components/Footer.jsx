import React from 'react'

function Footer() {
  return (
    <div>
      <footer id='footer' className="flex border-t-1 border-purple-600 flex-col md:flex-row gap-3 items-center justify-around w-full py-4 text-sm text-white/70">
        <p>Copyright © 2025 MoocMate. All rights reservered.</p>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-white transition-all">
            Contact Us
          </a>
          <div className="h-8 w-px bg-white/20"></div>
          <a href="#" className="hover:text-white transition-all">
            Umang Srivastava
          </a>
          <div className="h-8 w-px bg-white/20"></div>
          <a href="#" className="hover:text-white transition-all">
            Zaid Alam
          </a>
        </div>
      </footer>
    </div>
  )
}

export default Footer
