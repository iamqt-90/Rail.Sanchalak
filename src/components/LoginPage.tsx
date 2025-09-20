import * as React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useStore'

export default function LoginPage() {
  const login = useAuthStore((state) => state.login)
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Basic form validation: ID and password must not be empty
    if (!id.trim()) {
      setError('Please enter your ID.')
      return
    }
    if (!password.trim()) {
      setError('Please enter your password.')
      return
    }

    // Attempt login via auth store (temporary bypass for development)
    const success = await login(id.trim(), password.trim())
    if (success) {
      // Redirect to dashboard on successful login
      navigate('/')
    } else {
      // This should not happen with current bypass, but kept for future backend integration
      setError('Login failed. Please try again.')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-primary-800 to-secondary-900">
      {/* Login form with primary blue background for dark theme, white for light */}
      <form
        onSubmit={handleSubmit}
        className="bg-primary-700 dark:bg-primary-800 p-8 rounded shadow-md w-96 text-white"
      >
        <h2 className="text-2xl mb-6 text-center font-semibold">Sign In</h2>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <label className="block mb-2">
          ID
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="w-full mt-1 p-2 rounded bg-secondary-700 border border-secondary-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
            required
          />
        </label>
        <label className="block mb-4">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 p-2 rounded bg-secondary-700 border border-secondary-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
            required
          />
        </label>
        {/* Submit button with primary blue color */}
        <button
          type="submit"
          className="w-full bg-primary-600 hover:bg-primary-700 py-2 rounded font-semibold"
        >
          Sign In
        </button>
      </form>
    </div>
  )
}
