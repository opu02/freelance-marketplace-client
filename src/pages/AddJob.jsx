import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { FiBriefcase, FiImage } from 'react-icons/fi'
import axiosInstance from '../utils/axiosInstance'
import { useAuth } from '../context/AuthContext'

const CATEGORIES = ['Web Development', 'Digital Marketing', 'Graphics Designing', 'Content Writing', 'Video Editing', 'SEO', 'Data Entry', 'UI/UX Design']

export default function AddJob() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: '',
    category: CATEGORIES[0],
    summary: '',
    coverImage: '',
  })

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      await axiosInstance.post('/jobs', {
        ...form,
        postedBy: user.displayName || 'Anonymous',
        userEmail: user.email,
      })
      toast.success('Job posted successfully! 🚀')
      navigate('/myAddedJobs')
    } catch {
      toast.error('Failed to post job. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50 dark:bg-dark-bg">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-brand-500 flex items-center justify-center shadow-lg shadow-brand-500/30">
              <FiBriefcase className="text-white" size={22} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: 'Syne, sans-serif' }}>Post a New Job</h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Fill in the details below</p>
            </div>
          </div>

          <div className="card p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Posted By (readonly) */}
              <div>
                <label className="label">Posted By</label>
                <input type="text" value={user?.displayName || ''} readOnly
                  className="input-field bg-gray-50 dark:bg-dark-muted cursor-not-allowed text-gray-500" />
              </div>

              {/* Email (readonly) */}
              <div>
                <label className="label">Your Email</label>
                <input type="email" value={user?.email || ''} readOnly
                  className="input-field bg-gray-50 dark:bg-dark-muted cursor-not-allowed text-gray-500" />
              </div>

              {/* Title */}
              <div>
                <label className="label">Job Title <span className="text-red-400">*</span></label>
                <input type="text" name="title" value={form.title} onChange={handleChange}
                  placeholder="e.g. Senior React Developer Needed" required className="input-field" />
              </div>

              {/* Category */}
              <div>
                <label className="label">Category <span className="text-red-400">*</span></label>
                <select name="category" value={form.category} onChange={handleChange} className="input-field cursor-pointer">
                  {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>

              {/* Summary */}
              <div>
                <label className="label">Job Description <span className="text-red-400">*</span></label>
                <textarea
                  name="summary"
                  value={form.summary}
                  onChange={handleChange}
                  placeholder="Describe the job requirements, responsibilities, and expectations..."
                  required
                  rows={5}
                  className="input-field resize-none"
                />
              </div>

              {/* Cover Image */}
              <div>
                <label className="label">Cover Image URL</label>
                <div className="relative">
                  <FiImage className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input type="url" name="coverImage" value={form.coverImage} onChange={handleChange}
                    placeholder="https://i.ibb.co/your-image.jpg" className="input-field pl-10" />
                </div>
                {form.coverImage && (
                  <div className="mt-2 rounded-xl overflow-hidden h-32 bg-gray-100 dark:bg-dark-muted">
                    <img src={form.coverImage} alt="Preview"
                      className="w-full h-full object-cover"
                      onError={e => { e.target.style.display = 'none' }} />
                  </div>
                )}
              </div>

              <button type="submit" disabled={loading}
                className="btn-primary w-full justify-center py-3 disabled:opacity-60 disabled:cursor-not-allowed mt-2">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Posting Job...
                  </span>
                ) : 'Post Job'}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
