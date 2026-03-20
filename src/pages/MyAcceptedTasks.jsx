import { useQuery, useQueryClient } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { FiCheckCircle, FiXCircle, FiClipboard } from 'react-icons/fi'
import axiosInstance from '../utils/axiosInstance'
import { useAuth } from '../context/AuthContext'
import LoadingSpinner from '../components/LoadingSpinner'
import { Link } from 'react-router-dom'

export default function MyAcceptedTasks() {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ['acceptedTasks', user?.email],
    queryFn: () => axiosInstance.get(`/accepted-tasks/${user.email}`).then(r => r.data),
    enabled: !!user?.email,
  })

  const handleRemove = async (id, action) => {
    try {
      await axiosInstance.delete(`/accepted-tasks/${id}`)
      queryClient.invalidateQueries(['acceptedTasks'])
      toast.success(action === 'done' ? 'Task marked as done! ✅' : 'Task cancelled.')
    } catch {
      toast.error('Failed to remove task.')
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50 dark:bg-dark-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="section-title">My Accepted Tasks</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {tasks.length} task{tasks.length !== 1 ? 's' : ''} in your queue
          </p>
        </div>

        {isLoading ? (
          <LoadingSpinner fullPage={false} />
        ) : tasks.length === 0 ? (
          <div className="card p-16 text-center">
            <FiClipboard size={48} className="text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>No accepted tasks yet</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Browse jobs and accept ones that match your skills.</p>
            <Link to="/allJobs" className="btn-primary inline-flex">Browse Jobs</Link>
          </div>
        ) : (
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-dark-border bg-gray-50 dark:bg-dark-muted">
                    <th className="text-left px-5 py-3.5 font-semibold text-gray-600 dark:text-gray-400">Task</th>
                    <th className="text-left px-5 py-3.5 font-semibold text-gray-600 dark:text-gray-400 hidden sm:table-cell">Category</th>
                    <th className="text-left px-5 py-3.5 font-semibold text-gray-600 dark:text-gray-400 hidden md:table-cell">Posted By</th>
                    <th className="text-left px-5 py-3.5 font-semibold text-gray-600 dark:text-gray-400 hidden lg:table-cell">Accepted On</th>
                    <th className="text-right px-5 py-3.5 font-semibold text-gray-600 dark:text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {tasks.map((task, i) => (
                      <motion.tr
                        key={task._id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                        transition={{ delay: i * 0.04 }}
                        className="border-b border-gray-50 dark:border-dark-border/50 hover:bg-gray-50 dark:hover:bg-dark-muted/50 transition-colors"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            {task.coverImage && (
                              <img src={task.coverImage} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0"
                                onError={e => e.target.style.display = 'none'} />
                            )}
                            <div>
                              <p className="font-semibold text-gray-900 dark:text-white max-w-[180px] truncate">{task.title}</p>
                              <p className="text-xs text-gray-400 max-w-[180px] truncate">{task.summary}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 hidden sm:table-cell">
                          <span className="badge bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400">{task.category}</span>
                        </td>
                        <td className="px-5 py-4 hidden md:table-cell text-gray-600 dark:text-gray-400">{task.postedBy}</td>
                        <td className="px-5 py-4 hidden lg:table-cell text-gray-400 text-xs">
                          {task.acceptedAt ? new Date(task.acceptedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleRemove(task._id, 'done')}
                              title="Mark as Done"
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100 font-medium text-xs transition-colors"
                            >
                              <FiCheckCircle size={14} /> Done
                            </button>
                            <button
                              onClick={() => handleRemove(task._id, 'cancel')}
                              title="Cancel Task"
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 hover:bg-red-100 font-medium text-xs transition-colors"
                            >
                              <FiXCircle size={14} /> Cancel
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
    </div>
  )
}
