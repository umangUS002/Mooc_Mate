import React from 'react';
import { useNavigate } from 'react-router-dom';

function Hero() {
    const navigate = useNavigate();

    return (
        <>
            {/* <style>{`
        .button-wrapper::before {
          animation: spin-gradient 4s linear infinite;
        }
      
        @keyframes spin-gradient {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style> */}

            <div>
                <section className="relative max-sm:px-2 flex flex-col items-center text-white text-sm overflow-hidden min-h-screen">

                    {/* Navbar */}
                    {/* <nav className="z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-32 backdrop-blur">
                        <a>
                            <h1 className="text-4xl max-sm:text-2xl text-purple-700">MoocMate</h1>
                        </a>

                        <div className="hidden md:flex items-center gap-8 transition duration-500">
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
                    </nav> */}

                    {/* Hero Text */}
                    <div className="flex items-center mt-32 gap-2 border border-slate-600 text-gray-50 rounded-full px-4 py-2">
                        <div className="size-2.5 bg-purple-500 rounded-full"></div>
                        <span className="max-sm:text-xs text-md">Your Ultimate Quiz Companion!</span>
                    </div>

                    <h1 className="text-center text-2xl leading-[68px] md:text-6xl md:leading-[70px] mt-4 font-semibold max-w-2xl">
                        Master Learning with{' '}
                        <span className="max-sm:block text-6xl max-sm:text-purple-700 max-sm:mb-4">
                            MoocMate
                        </span>
                    </h1>

                    <p className="text-center text-base text-gray-300 max-w-lg mt-2">
                        Take quizzes, see scores, and boost your knowledge — all in one smart, interactive
                        platform designed for learners like you.
                    </p>

                    {/* Buttons */}
                    <div className="flex z-3 items-center gap-4 mt-8">
                        <div className="relative inline-block p-0.5 rounded-full overflow-hidden hover:scale-105 transition duration-300 active:scale-100 before:content-[''] before:absolute before:inset-0 before:bg-[conic-gradient(from_0deg,_#00F5FF,_#00F5FF30,_#00F5FF)] button-wrapper">
                            <button
                                onClick={() => navigate('/testPage')}
                                className="relative z-10 bg-purple-700 hover:bg-purple-950 text-white rounded-full px-8 py-3 font-medium text-sm"
                            >
                                Get Started
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default Hero;
