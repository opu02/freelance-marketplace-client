import { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiSearch, FiFilter } from 'react-icons/fi'
import axiosInstance from '../utils/axiosInstance'
import JobCard from '../components/JobCard'
import LoadingSpinner from '../components/LoadingSpinner'

const CATEGORIES = ['All', 'Web Development', 'Digital Marketing', 'Graphics Designing', 'Content Writing', 'Video Editing', 'SEO', 'Data Entry', 'UI/UX Design']

export default function AllJobs() {
  const [searchParams] = useSearchParams()
  const initialCategory = searchParams.get('category') || 'All'

  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('newest')
  const [activeCategory, setActiveCategory] = useState(initialCategory)

  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ['allJobs', sort],
    queryFn: () => axiosInstance.get(`/jobs?sort=${sort}`).then(r => r.data),
  })

  const filtered = useMemo(() => {
    return jobs.filter(job => {
      const matchSearch = job.title?.toLowerCase().includes(search.toLowerCase()) ||
        job.postedBy?.toLowerCase().includes(search.toLowerCase()) ||
        job.summary?.toLowerCase().includes(search.toLowerCase())
      const matchCat = activeCategory === 'All' || job.category === activeCategory
      return matchSearch && matchCat
    })
  }, [jobs, search, activeCategory])

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50 dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-title mb-2"
          >
            Browse All Jobs
          </motion.h1>
          <p className="text-gray-500 dark:text-gray-400">
            {isLoading ? 'Loading...' : `${filtered.length} jobs found`}
          </p>
        </div>

        {/* Filters bar */}
        <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-4 mb-6 flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search jobs, skills, or people..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          {/* Sort */}
          <div className="flex items-center gap-2 shrink-0">
            <FiFilter size={16} className="text-gray-400" />
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="input-field w-auto cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-8 overflow-x-auto pb-1">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20'
                  : 'bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border text-gray-600 dark:text-gray-300 hover:border-brand-400 hover:text-brand-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Jobs grid */}
        {isLoading ? (
          <LoadingSpinner fullPage={false} />
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>No jobs found</h3>
            <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((job, i) => (
              <JobCard key={job._id} job={job} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
