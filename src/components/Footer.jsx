import { Link } from 'react-router-dom'
import { FiTwitter, FiGithub, FiLinkedin } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-dark-card border-t border-gray-100 dark:border-dark-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm" style={{ fontFamily: 'Syne, sans-serif' }}>TF</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
                Task<span className="text-brand-500">Forge</span>
              </span>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-sm">
              The most reliable freelance marketplace connecting talented professionals with great opportunities worldwide.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a href="https://x.com" target="_blank" rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-gray-200 dark:bg-dark-muted flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-brand-500 hover:text-white transition-all duration-200">
                {/* X (Twitter) new logo */}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.742-8.884L2.25 2.25h6.988l4.26 5.636zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-gray-200 dark:bg-dark-muted flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-brand-500 hover:text-white transition-all duration-200">
                <FiGithub size={14} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-gray-200 dark:bg-dark-muted flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-brand-500 hover:text-white transition-all duration-200">
                <FiLinkedin size={14} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-4 text-sm uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2">
              {[
                { to: '/allJobs', label: 'Browse Jobs' },
                { to: '/addJob', label: 'Post a Job' },
                { to: '/my-accepted-tasks', label: 'My Tasks' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-gray-500 dark:text-gray-400 hover:text-brand-500 transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-4 text-sm uppercase tracking-wider">Categories</h4>
            <ul className="space-y-2">
              {['Web Development', 'Digital Marketing', 'Graphics Design', 'Content Writing', 'Video Editing'].map(cat => (
                <li key={cat}>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{cat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-dark-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} TaskForge. All rights reserved.
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            Built with ❤️ using React, Node.js & MongoDB
          </p>
        </div>
      </div>
    </footer>
  )
}
