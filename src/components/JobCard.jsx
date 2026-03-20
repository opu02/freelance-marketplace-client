import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight, FiCalendar, FiUser } from 'react-icons/fi'

const categoryColors = {
  'Web Development': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  'Digital Marketing': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  'Graphics Designing': 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
  'Content Writing': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  'Video Editing': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  'SEO': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  'Data Entry': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  'UI/UX Design': 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
}

export default function JobCard({ job, index = 0 }) {
  const colorClass = categoryColors[job.category] || 'bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400'
  const postedDate = job.postedAt ? new Date(job.postedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      className="card group hover:shadow-lg hover:shadow-brand-500/10 hover:-translate-y-1 transition-all duration-300"
    >
      {/* Cover image */}
      <div className="relative h-44 overflow-hidden bg-gray-100 dark:bg-dark-muted">
        {job.coverImage ? (
          <img
            src={job.coverImage}
            alt={job.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(job.title)}&background=22c55e&color=fff&size=400` }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-100 to-brand-200 dark:from-brand-900/20 dark:to-brand-800/20">
            <span className="text-brand-500 text-4xl font-bold opacity-30" style={{ fontFamily: 'Syne, sans-serif' }}>
              {job.title?.charAt(0)}
            </span>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className={`badge ${colorClass} text-xs`}>{job.category}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-gray-900 dark:text-white text-lg leading-snug mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-2" style={{ fontFamily: 'Syne, sans-serif' }}>
          {job.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2 mb-4">
          {job.summary}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500 mb-4">
          <span className="flex items-center gap-1.5">
            <FiUser size={12} />
            {job.postedBy}
          </span>
          {postedDate && (
            <span className="flex items-center gap-1.5">
              <FiCalendar size={12} />
              {postedDate}
            </span>
          )}
        </div>

        <Link
          to={`/allJobs/${job._id}`}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-50 dark:bg-brand-900/20 hover:bg-brand-500 text-brand-600 dark:text-brand-400 hover:text-white rounded-xl font-semibold text-sm transition-all duration-200 group/btn"
        >
          View Details
          <FiArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  )
}
