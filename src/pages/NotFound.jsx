import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiHome, FiBriefcase } from 'react-icons/fi'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-dark-bg px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        {/* Big 404 */}
        <div className="relative mb-6">
          <p className="text-[120px] font-extrabold text-gray-100 dark:text-dark-card leading-none select-none"
            style={{ fontFamily: 'Syne, sans-serif' }}>404</p>
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-5xl font-extrabold text-brand-500" style={{ fontFamily: 'Syne, sans-serif' }}>Oops!</p>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>
          Page Not Found
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn-primary">
            <FiHome size={16} /> Go Home
          </Link>
          <Link to="/allJobs" className="btn-secondary">
            <FiBriefcase size={16} /> Browse Jobs
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
