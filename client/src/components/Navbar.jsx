import React from 'react'
import {useNavigate} from 'react-router-dom'

function Navbar() {
    const navigate = useNavigate();
  return (
    <div>
      {/* Navbar */}
                    <nav className="z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-32 backdrop-blur">
                        <a href='/' className='flex gap-2'>
                            <img className='h-10 max-sm:h-7 hover:scale-105' src="/graduation-cap.svg" alt="" />
                            <h1 className="hover:scale-105 font-bold text-4xl max-sm:text-2xl text-purple-700">MoocMate</h1>
                        </a>

                        <div className="cursor-pointer hidden text-white md:flex items-center gap-8 transition duration-500">
                            <a onClick={()=>navigate('/')} className="hover:text-slate-300 transition">
                                Home
                            </a>
                            <a onClick={()=>navigate('/testPage')} className="hover:text-slate-300 transition">
                                Practice
                            </a>
                            <a href="#footer" className="hover:text-slate-300 transition">
                                Contact Us
                            </a>
                        </div>

                        <div className="md:block space-x-3">
                            <button
                                onClick={() => navigate('/testPage')}
                                className="cursor-pointer px-6 max-sm:px-2 max-sm:text-xs py-2 z-3 bg-purple-700 hover:bg-purple-950 transition text-white rounded-md"
                            >
                                Get started
                            </button>
                        </div>
                    </nav>
    </div>
  )
}

export default Navbar
