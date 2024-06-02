import React from 'react'
import { Link } from 'react-router-dom'
import { HOME } from '../../routes/Paths'

export const NavBarSoloLogo = ({Url}) => {
    return (
        <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-300 ">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4 px-6">
                <div className="w-[80px]">
                    <Link to={Url} className="flex text-sm items-center" href="index.html">    <svg className="w-6 h-6 text-negro" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7" />
                    </svg>
                    Volver</Link>
                </div>
                <Link to={HOME}  className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="/img/cost_estimator-favicon.png" className="h-8" alt="logo-vortex" />
                </Link>
                <div className="w-[80px]">
                </div>
            </div>
        </nav>
    )
}
