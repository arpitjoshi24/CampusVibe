import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  // Check login status on mount
  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) setIsLoggedIn(true)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    setIsLoggedIn(false)
    navigate('/')
  }

  return (
    <nav className='flex items-center px-8 py-4 bg-slate-900/80 backdrop-blur-lg border-b border-white/10 justify-between sticky top-0 z-50'>
      {/* Logo/Brand */}
      <div className='flex items-center'>
        <Link
          to="/"
          className='text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent cursor-pointer hover:from-purple-300 hover:to-pink-300 transition-all duration-300'
        >
          CampusVibe
        </Link>
      </div>

      {/* Navigation Links */}
      <div className='flex items-center'>
        <ul className='flex gap-2 items-center bg-white/5 backdrop-blur-lg rounded-2xl p-1 border border-white/10'>
          {['Home', 'Events', 'Clubs', 'About'].map((item) => (
            <li key={item}>
              <NavLink
                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className={({ isActive }) =>
                  `font-medium py-3 px-6 rounded-xl transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {item}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* User Actions */}
      <div className='flex items-center gap-4'>
        {isLoggedIn ? (
          <>
            <Link
              to="/addevent"
              className='bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105'
            >
              Add Event
            </Link>
            <button
              onClick={handleLogout}
              className='text-gray-300 hover:text-white transition-all duration-200'
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/signin"
            className='bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105'
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  )
}
