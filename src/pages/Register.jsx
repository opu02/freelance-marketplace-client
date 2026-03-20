import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { FiMail, FiLock, FiUser, FiImage, FiEye, FiEyeOff, FiCheck, FiX } from 'react-icons/fi'
import { FcGoogle } from 'react-icons/fc'
import { useAuth } from '../context/AuthContext'

function PasswordRule({ met, text }) {
  return (
    <li className={`flex items-center gap-1.5 text-xs ${met ? 'text-brand-500' : 'text-gray-400 dark:text-gray-500'}`}>
      {met ? <FiCheck size={11} /> : <FiX size={11} />}
      {text}
    </li>
  )
}

export default function Register() {
  const { register, updateUserProfile, googleLogin } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ name: '', email: '', photoURL: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const rules = {
    upper: /[A-Z]/.test(form.password),
    lower: /[a-z]/.test(form.password),
    length: form.password.length >= 6,
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!rules.upper || !rules.lower || !rules.length) {
      toast.error('Please meet all password requirements.')
      return
    }
    setLoading(true)
    try {
      await register(form.email, form.password)
      await updateUserProfile(form.name, form.photoURL)
      toast.success('Account created! Welcome to TaskForge 🎉')
      navigate('/')
    } catch (err) {
      const msg = err.code === 'auth/email-already-in-use' ? 'Email already in use.' : err.message
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    try {
      await googleLogin()
      toast.success('Registered with Google!')
      navigate('/')
    } catch {
      toast.error('Google sign-up failed.')
    }
  }

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-50 dark:bg-dark-bg px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="card p-8">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-brand-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-brand-500/30">
              <span className="text-white font-extrabold text-xl" style={{ fontFamily: 'Syne, sans-serif' }}>TF</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: 'Syne, sans-serif' }}>Create account</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Join TaskForge for free today</p>
          </div>

          <button
            onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-200 dark:border-dark-border rounded-xl text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-50 dark:hover:bg-dark-muted transition-colors mb-6"
          >
            <FcGoogle size={20} />
            Continue with Google
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gray-200 dark:bg-dark-border" />
            <span className="text-xs text-gray-400 font-medium">or sign up with email</span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-dark-border" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Full Name</label>
              <div className="relative">
                <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input type="text" name="name" value={form.name} onChange={handleChange}
                  placeholder="John Doe" required className="input-field pl-10" />
              </div>
            </div>

            <div>
              <label className="label">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input type="email" name="email" value={form.email} onChange={handleChange}
                  placeholder="you@example.com" required className="input-field pl-10" />
              </div>
            </div>

            <div>
              <label className="label">Photo URL <span className="text-gray-400 font-normal">(optional)</span></label>
              <div className="relative">
                <FiImage className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input type="url" name="photoURL" value={form.photoURL} onChange={handleChange}
                  placeholder="https://example.com/photo.jpg" className="input-field pl-10" />
              </div>
            </div>

            <div>
              <label className="label">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required
                  className="input-field pl-10 pr-10"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
              {form.password && (
                <ul className="mt-2 space-y-1 pl-1">
                  <PasswordRule met={rules.upper} text="At least one uppercase letter" />
                  <PasswordRule met={rules.lower} text="At least one lowercase letter" />
                  <PasswordRule met={rules.length} text="At least 6 characters" />
                </ul>
              )}
            </div>

            <button type="submit" disabled={loading}
              className="btn-primary w-full justify-center mt-2 disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </span>
              ) : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-brand-500 hover:text-brand-600 font-semibold">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
