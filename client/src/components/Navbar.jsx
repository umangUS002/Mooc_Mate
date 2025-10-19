import React from 'react'

function Navbar() {
  return (
    <div>
      {/* Navbar */}
                    <nav className="z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-32 backdrop-blur">
                        <a href='/'>
                            <h1 className="hover:scale-105 font-bold text-4xl max-sm:text-2xl text-purple-700">MoocMate</h1>
                        </a>

                        <div className="hidden text-white md:flex items-center gap-8 transition duration-500">
                            <a href="#products" className="hover:text-slate-300 transition">
                                Practice
                            </a>
                            <a href="#resources" className="hover:text-slate-300 transition">
                                Resources
                            </a>
                            <a href="#stories" className="hover:text-slate-300 transition">
                                Connect Here
                            </a>
                        </div>

                        <div className="md:block space-x-3">
                            <button
                                onClick={() => navigate('/testPage')}
                                className="cursor-pointer px-6 py-2 z-3 bg-purple-700 hover:bg-purple-950 transition text-white rounded-md"
                            >
                                Get started
                            </button>
                        </div>
                    </nav>
    </div>
  )
}

export default Navbar
