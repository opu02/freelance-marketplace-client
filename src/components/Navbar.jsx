import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'
import { FiSun, FiMoon, FiLogOut } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/allJobs', label: 'All Jobs' },
  { to: '/addJob', label: 'Add a Job' },
  { to: '/my-accepted-tasks', label: 'My Accepted Tasks' },
]

export default function Navbar() {
  const { user, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  const handleLogout = async () => {
    try {
      await logout()
      toast.success('Logged out successfully')
      navigate('/')
    } catch {
      toast.error('Logout failed')
    }
  }

  const linkClass = ({ isActive }) =>
    `text-sm font-semibold transition-colors duration-200 px-3 py-1.5 rounded-lg ${
      isActive
        ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/20'
        : 'text-gray-600 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-gray-50 dark:hover:bg-dark-muted'
    }`

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-xl border-b border-gray-100 dark:border-dark-border transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center shadow-lg shadow-brand-500/30 group-hover:scale-110 transition-transform duration-200">
              <span className="text-white font-bold text-sm" style={{ fontFamily: 'Syne, sans-serif' }}>TF</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
              Task<span className="text-brand-500">Forge</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <NavLink key={link.to} to={link.to} className={linkClass} end={link.to === '/'}>
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right controls */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-muted transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>

            {user ? (
              <div className="flex items-center gap-3">
                {/* Avatar with tooltip */}
                <div
                  className="relative"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  <img
                    src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'U')}&background=22c55e&color=fff`}
                    alt={user.displayName}
                    className="w-9 h-9 rounded-full object-cover border-2 border-brand-300 cursor-pointer"
                  />
                  <AnimatePresence>
                    {showTooltip && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        className="absolute right-0 top-12 bg-dark-card border border-dark-border rounded-xl px-3 py-2 shadow-xl whitespace-nowrap z-50"
                      >
                        <p className="text-white text-sm font-semibold">{user.displayName || 'User'}</p>
                        <p className="text-gray-400 text-xs">{user.email}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button onClick={handleLogout} className="btn-danger text-sm py-2 px-4">
                  <FiLogOut size={14} /> Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="btn-secondary text-sm py-2 px-4">Login</Link>
                <Link to="/register" className="btn-primary text-sm py-2 px-4">Register</Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <button onClick={toggleTheme} className="p-2 rounded-lg text-gray-500 dark:text-gray-400">
              {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-muted"
            >
              {menuOpen ? <HiX size={22} /> : <HiMenu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-dark-bg border-t border-gray-100 dark:border-dark-border"
          >
            <div className="px-4 py-4 flex flex-col gap-2">
              {navLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={linkClass}
                  onClick={() => setMenuOpen(false)}
                  end={link.to === '/'}
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="pt-3 border-t border-gray-100 dark:border-dark-border">
                {user ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'U')}&background=22c55e&color=fff`}
                        alt={user.displayName}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{user.displayName}</span>
                    </div>
                    <button onClick={handleLogout} className="btn-danger text-xs py-1.5 px-3">
                      <FiLogOut size={12} /> Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Link to="/login" onClick={() => setMenuOpen(false)} className="btn-secondary text-sm py-2 px-4 flex-1 justify-center">Login</Link>
                    <Link to="/register" onClick={() => setMenuOpen(false)} className="btn-primary text-sm py-2 px-4 flex-1 justify-center">Register</Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
