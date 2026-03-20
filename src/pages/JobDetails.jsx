import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { FiArrowLeft, FiCalendar, FiUser, FiTag, FiCheck } from 'react-icons/fi'
import axiosInstance from '../utils/axiosInstance'
import LoadingSpinner from '../components/LoadingSpinner'
import { useAuth } from '../context/AuthContext'

export default function JobDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const { data: job, isLoading, isError } = useQuery({
    queryKey: ['job', id],
    queryFn: () => axiosInstance.get(`/jobs/${id}`).then(r => r.data),
  })

  const handleAccept = async () => {
    if (!user) { toast.error('Please log in to accept tasks.'); return }
    if (job.userEmail === user.email) {
      toast.error("You can't accept your own job posting.")
      return
    }
    try {
      await axiosInstance.post('/accepted-tasks', {
        jobId: job._id,
        title: job.title,
        category: job.category,
        summary: job.summary,
        coverImage: job.coverImage,
        postedBy: job.postedBy,
        postedByEmail: job.userEmail,
        acceptedByEmail: user.email,
        acceptedBy: user.displayName,
      })
      toast.success('Task accepted! Check "My Accepted Tasks".')
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to accept task.'
      if (msg.includes('Already')) toast.error('You already accepted this task.')
      else toast.error(msg)
    }
  }

  if (isLoading) return <LoadingSpinner />
  if (isError || !job) return (
    <div className="min-h-screen pt-24 flex items-center justify-center">
      <div className="text-center">
        <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Job not found</p>
        <button onClick={() => navigate('/allJobs')} className="btn-primary mt-4">Back to Jobs</button>
      </div>
    </div>
  )

  const isOwner = user?.email === job.userEmail
  const postedDate = job.postedAt ? new Date(job.postedAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  }) : ''

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50 dark:bg-dark-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-brand-500 text-sm font-medium mb-6 transition-colors"
        >
          <FiArrowLeft size={16} /> Back
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Cover Image */}
          {job.coverImage && (
            <div className="w-full h-64 rounded-2xl overflow-hidden mb-6 bg-gray-100 dark:bg-dark-muted">
              <img
                src={job.coverImage}
                alt={job.title}
                className="w-full h-full object-cover"
                onError={e => { e.target.style.display = 'none' }}
              />
            </div>
          )}

          <div className="card p-8">
            {/* Category badge */}
            <span className="badge bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400 mb-4 inline-block">
              <FiTag size={11} className="mr-1 inline" />{job.category}
            </span>

            {/* Title */}
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
              {job.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6 pb-6 border-b border-gray-100 dark:border-dark-border">
              <span className="flex items-center gap-1.5">
                <FiUser size={14} className="text-brand-500" />
                Posted by <strong className="text-gray-700 dark:text-gray-300 ml-1">{job.postedBy}</strong>
              </span>
              {postedDate && (
                <span className="flex items-center gap-1.5">
                  <FiCalendar size={14} className="text-brand-500" />
                  {postedDate}
                </span>
              )}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="font-bold text-gray-900 dark:text-white mb-3" style={{ fontFamily: 'Syne, sans-serif' }}>Job Description</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">{job.summary}</p>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-3">
              {isOwner ? (
                <div className="px-5 py-3 rounded-xl bg-gray-100 dark:bg-dark-muted text-gray-500 dark:text-gray-400 text-sm font-medium">
                  This is your own job posting
                </div>
              ) : (
                <button onClick={handleAccept} className="btn-primary">
                  <FiCheck size={16} /> Accept This Job
                </button>
              )}
              <button onClick={() => navigate('/allJobs')} className="btn-secondary">
                Browse More Jobs
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
