import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { FiEdit2, FiTrash2, FiPlus, FiImage, FiBriefcase } from 'react-icons/fi'
import axiosInstance from '../utils/axiosInstance'
import { useAuth } from '../context/AuthContext'
import LoadingSpinner from '../components/LoadingSpinner'

const CATEGORIES = ['Web Development', 'Digital Marketing', 'Graphics Designing', 'Content Writing', 'Video Editing', 'SEO', 'Data Entry', 'UI/UX Design']

function UpdateModal({ job, onClose, onUpdated }) {
  const [form, setForm] = useState({
    title: job.title || '',
    category: job.category || CATEGORIES[0],
    summary: job.summary || '',
    coverImage: job.coverImage || '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      await axiosInstance.put(`/jobs/${job._id}`, form)
      toast.success('Job updated successfully!')
      onUpdated()
      onClose()
    } catch {
      toast.error('Update failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={e => e.stopPropagation()}
        className="bg-white dark:bg-dark-card rounded-2xl shadow-2xl border border-gray-100 dark:border-dark-border w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: 'Syne, sans-serif' }}>Update Job</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Job Title</label>
            <input type="text" name="title" value={form.title} onChange={handleChange} required className="input-field" />
          </div>
          <div>
            <label className="label">Category</label>
            <select name="category" value={form.category} onChange={handleChange} className="input-field cursor-pointer">
              {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Description</label>
            <textarea name="summary" value={form.summary} onChange={handleChange} required rows={4} className="input-field resize-none" />
          </div>
          <div>
            <label className="label">Cover Image URL</label>
            <div className="relative">
              <FiImage className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="url" name="coverImage" value={form.coverImage} onChange={handleChange} className="input-field pl-10" />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary flex-1 justify-center">Cancel</button>
            <button type="submit" disabled={loading} className="btn-primary flex-1 justify-center disabled:opacity-60">
              {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Save Changes'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default function MyAddedJobs() {
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const [editingJob, setEditingJob] = useState(null)

  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ['myJobs', user?.email],
    queryFn: () => axiosInstance.get(`/jobs/user/${user.email}`).then(r => r.data),
    enabled: !!user?.email,
  })

  const handleDelete = async (id) => {
    if (!window.confirm) {
      toast('Confirm delete?')
    }
    try {
      await axiosInstance.delete(`/jobs/${id}`)
      queryClient.invalidateQueries(['myJobs'])
      toast.success('Job deleted.')
    } catch {
      toast.error('Failed to delete.')
    }
  }

  const handleUpdated = () => {
    queryClient.invalidateQueries(['myJobs'])
    queryClient.invalidateQueries(['allJobs'])
    queryClient.invalidateQueries(['latestJobs'])
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50 dark:bg-dark-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="section-title" style={{ fontFamily: 'Syne, sans-serif' }}>My Posted Jobs</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">{jobs.length} job{jobs.length !== 1 ? 's' : ''} posted by you</p>
          </div>
          <Link to="/addJob" className="btn-primary shrink-0">
            <FiPlus size={16} /> Post New Job
          </Link>
        </div>

        {isLoading ? (
          <LoadingSpinner fullPage={false} />
        ) : jobs.length === 0 ? (
          <div className="card p-16 text-center">
            <FiBriefcase size={48} className="text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>No jobs yet</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">You haven't posted any jobs. Start by posting your first one!</p>
            <Link to="/addJob" className="btn-primary inline-flex"><FiPlus size={16} /> Post a Job</Link>
          </div>
        ) : (
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-dark-border bg-gray-50 dark:bg-dark-muted">
                    <th className="text-left px-5 py-3.5 font-semibold text-gray-600 dark:text-gray-400">Job</th>
                    <th className="text-left px-5 py-3.5 font-semibold text-gray-600 dark:text-gray-400 hidden sm:table-cell">Category</th>
                    <th className="text-left px-5 py-3.5 font-semibold text-gray-600 dark:text-gray-400 hidden md:table-cell">Posted</th>
                    <th className="text-right px-5 py-3.5 font-semibold text-gray-600 dark:text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {jobs.map((job, i) => (
                      <motion.tr
                        key={job._id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ delay: i * 0.04 }}
                        className="border-b border-gray-50 dark:border-dark-border/50 hover:bg-gray-50 dark:hover:bg-dark-muted/50 transition-colors"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            {job.coverImage && (
                              <img src={job.coverImage} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0"
                                onError={e => e.target.style.display = 'none'} />
                            )}
                            <div className="min-w-0">
                              <p className="font-semibold text-gray-900 dark:text-white truncate max-w-[200px]">{job.title}</p>
                              <p className="text-xs text-gray-400 truncate max-w-[200px]">{job.summary}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 hidden sm:table-cell">
                          <span className="badge bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400">{job.category}</span>
                        </td>
                        <td className="px-5 py-4 hidden md:table-cell text-gray-500 dark:text-gray-400 text-xs">
                          {job.postedAt ? new Date(job.postedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setEditingJob(job)}
                              className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 transition-colors"
                              title="Edit"
                            >
                              <FiEdit2 size={14} />
                            </button>
                            <button
                              onClick={() => handleDelete(job._id)}
                              className="p-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 hover:bg-red-100 transition-colors"
                              title="Delete"
                            >
                              <FiTrash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Update Modal */}
      <AnimatePresence>
        {editingJob && (
          <UpdateModal
            job={editingJob}
            onClose={() => setEditingJob(null)}
            onUpdated={handleUpdated}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
