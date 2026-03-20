import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { FiArrowRight, FiStar, FiShield, FiZap, FiUsers, FiCode, FiTrendingUp, FiPenTool, FiFileText, FiYoutube, FiSearch, FiDatabase } from 'react-icons/fi'
import axiosInstance from '../utils/axiosInstance'
import JobCard from '../components/JobCard'
import LoadingSpinner from '../components/LoadingSpinner'

const categories = [
  { name: 'Web Development', icon: FiCode, color: 'from-blue-500 to-blue-600', count: '2.4k+ jobs' },
  { name: 'Digital Marketing', icon: FiTrendingUp, color: 'from-purple-500 to-purple-600', count: '1.8k+ jobs' },
  { name: 'Graphics Designing', icon: FiPenTool, color: 'from-pink-500 to-pink-600', count: '3.1k+ jobs' },
  { name: 'Content Writing', icon: FiFileText, color: 'from-yellow-500 to-orange-500', count: '900+ jobs' },
  { name: 'Video Editing', icon: FiYoutube, color: 'from-red-500 to-red-600', count: '1.2k+ jobs' },
  { name: 'SEO', icon: FiSearch, color: 'from-green-500 to-green-600', count: '700+ jobs' },
  { name: 'Data Entry', icon: FiDatabase, color: 'from-orange-500 to-orange-600', count: '500+ jobs' },
  { name: 'UI/UX Design', icon: FiPenTool, color: 'from-indigo-500 to-indigo-600', count: '1.5k+ jobs' },
]

const stats = [
  { value: '50K+', label: 'Active Freelancers' },
  { value: '12K+', label: 'Jobs Posted' },
  { value: '98%', label: 'Satisfaction Rate' },
  { value: '180+', label: 'Countries' },
]

export default function Home() {
  const { data: latestJobs = [], isLoading } = useQuery({
    queryKey: ['latestJobs'],
    queryFn: () => axiosInstance.get('/jobs/latest').then(r => r.data),
  })

  return (
    <div className="min-h-screen">
      {/* ── HERO BANNER ───────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-white via-brand-50/40 to-white dark:from-dark-bg dark:via-dark-card dark:to-dark-bg">
        {/* Decorative blobs */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-brand-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

        {/* Floating dots grid */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(circle, #22c55e 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left text */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400 text-sm font-semibold mb-6">
                <FiShield size={14} />
                Trusted by 50,000+ professionals
              </div>

              <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-[1.1] mb-6"
                style={{ fontFamily: 'Syne, sans-serif' }}>
                Find & Post{' '}
                <span className="text-brand-500 relative">
                  Freelance
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                    <path d="M1 9C50 3 100 1 150 5C200 9 250 7 299 3" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </span>{' '}
                Jobs Easily
              </h1>

              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8 max-w-lg">
                TaskForge connects skilled freelancers with quality clients. Browse thousands of jobs or post your project and find the perfect talent today.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link to="/allJobs" className="btn-primary">
                  Explore Jobs <FiArrowRight size={16} />
                </Link>
                <Link to="/addJob" className="btn-secondary">
                  Post a Job
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-4 mt-8">
                {[
                  { icon: FiShield, text: 'Secure Payments' },
                  { icon: FiStar, text: 'Top Talent' },
                  { icon: FiZap, text: 'Fast Delivery' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                    <Icon size={14} className="text-brand-500" />
                    {text}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative hidden lg:flex items-center justify-center"
            >
              <div className="animate-float relative">
                {/* Main card */}
                <div className="bg-white dark:bg-dark-card rounded-2xl shadow-2xl p-6 w-80 border border-gray-100 dark:border-dark-border">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center">
                      <FiCode className="text-brand-600 dark:text-brand-400" size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white text-sm" style={{ fontFamily: 'Syne, sans-serif' }}>Senior React Developer</p>
                      <p className="text-xs text-gray-400">Web Development</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Build scalable web applications with modern React patterns and TypeScript...</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 px-2 py-1 rounded-full font-medium">Remote</span>
                    <span className="text-brand-500 font-bold text-sm">$85/hr</span>
                  </div>
                </div>

                {/* Floating mini cards */}
                <div className="absolute -top-6 -right-8 bg-white dark:bg-dark-card rounded-xl shadow-lg px-4 py-3 border border-gray-100 dark:border-dark-border">
                  <div className="flex items-center gap-2">
                    <FiUsers className="text-purple-500" size={16} />
                    <div>
                      <p className="text-xs font-semibold text-gray-900 dark:text-white">50K+ Freelancers</p>
                      <p className="text-[10px] text-gray-400">Ready to work</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-6 -left-8 bg-white dark:bg-dark-card rounded-xl shadow-lg px-4 py-3 border border-gray-100 dark:border-dark-border">
                  <div className="flex items-center gap-2">
                    <FiStar className="text-yellow-400" size={16} />
                    <div>
                      <p className="text-xs font-semibold text-gray-900 dark:text-white">4.9/5 Rating</p>
                      <p className="text-[10px] text-gray-400">12K+ reviews</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-10 border-t border-gray-100 dark:border-dark-border"
          >
            {stats.map(stat => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-extrabold text-brand-500" style={{ fontFamily: 'Syne, sans-serif' }}>{stat.value}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── LATEST JOBS ──────────────────────────────────────────────────── */}
      <section className="py-20 bg-white dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-brand-500 font-semibold text-sm mb-2 uppercase tracking-wider">Fresh Opportunities</p>
              <h2 className="section-title">Latest Jobs</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Explore the most recently posted freelance opportunities</p>
            </div>
            <Link to="/allJobs" className="btn-secondary shrink-0">
              View All Jobs <FiArrowRight size={14} />
            </Link>
          </div>

          {isLoading ? (
            <LoadingSpinner fullPage={false} />
          ) : latestJobs.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 dark:text-gray-500 text-lg">No jobs posted yet. Be the first!</p>
              <Link to="/addJob" className="btn-primary mt-4 inline-flex">Post a Job</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestJobs.map((job, i) => (
                <JobCard key={job._id} job={job} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── TOP CATEGORIES ──────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50 dark:bg-dark-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-brand-500 font-semibold text-sm mb-2 uppercase tracking-wider">Explore by Field</p>
            <h2 className="section-title">Top Categories</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-xl mx-auto">
              Find work in the most in-demand fields on TaskForge
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((cat, i) => {
              const Icon = cat.icon
              return (
                <motion.div
                  key={cat.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    to={`/allJobs?category=${encodeURIComponent(cat.name)}`}
                    className="card p-5 flex flex-col items-center text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                      <Icon className="text-white" size={22} />
                    </div>
                    <p className="font-bold text-gray-900 dark:text-white text-sm mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>{cat.name}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">{cat.count}</p>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── ABOUT PLATFORM ──────────────────────────────────────────────── */}
      <section className="py-20 bg-white dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-brand-500 font-semibold text-sm mb-2 uppercase tracking-wider">Why TaskForge</p>
              <h2 className="section-title mb-6">
                A Platform Built for<br />
                <span className="text-brand-500">Real Work</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                TaskForge is designed from the ground up to make freelancing frictionless. Whether you're a client with a vision or a freelancer with the skills, our platform brings you together seamlessly.
              </p>

              <div className="space-y-4">
                {[
                  { icon: FiShield, title: 'Verified Professionals', desc: 'Every freelancer is screened to ensure quality.' },
                  { icon: FiZap, title: 'Fast Matching', desc: 'Our smart system connects you with the right talent instantly.' },
                  { icon: FiStar, title: 'Quality Guaranteed', desc: 'Only the best work gets delivered on TaskForge.' },
                ].map(item => {
                  const Icon = item.icon
                  return (
                    <div key={item.title} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-900/20 flex items-center justify-center shrink-0">
                        <Icon className="text-brand-600 dark:text-brand-400" size={18} />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white text-sm mb-0.5" style={{ fontFamily: 'Syne, sans-serif' }}>{item.title}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-brand-500 to-brand-700 rounded-2xl p-8 text-white shadow-2xl shadow-brand-500/30">
                <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>Ready to get started?</h3>
                <p className="text-brand-100 mb-6 text-sm leading-relaxed">
                  Join thousands of professionals already using TaskForge. Post your first job in under 2 minutes.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { value: '2 min', label: 'To post a job' },
                    { value: 'Free', label: 'Registration' },
                    { value: '24/7', label: 'Support' },
                    { value: '100%', label: 'Secure' },
                  ].map(s => (
                    <div key={s.label} className="bg-white/10 rounded-xl p-3 text-center">
                      <p className="text-xl font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>{s.value}</p>
                      <p className="text-xs text-brand-100 mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
                <Link to="/register" className="inline-flex items-center gap-2 bg-white text-brand-600 font-bold px-6 py-3 rounded-xl hover:bg-brand-50 transition-colors">
                  Get Started Free <FiArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
