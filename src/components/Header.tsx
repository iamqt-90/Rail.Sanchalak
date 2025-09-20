import * as React from 'react'
import { useAuthStore, useUIStore } from '../store/useStore'

// Header component updated to match screenshot design:
// - Layout: "Rail Sanchalak Dashboard" title on left, team info and user controls on right
// - Typography: Larger, bold title matching screenshot
// - Spacing and alignment updated to match design
// - User avatar and logout button positioned as shown in screenshot
// - Preserves existing functionality (dark mode toggle, logout)

export default function Header() {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const darkMode = useUIStore((state) => state.darkMode)
  const toggleDarkMode = useUIStore((state) => state.toggleDarkMode)

  return (
    <header className="flex items-center justify-between bg-white dark:bg-gray-900 p-6 shadow-sm border-b border-gray-200 dark:border-gray-700">
      {/* Left side - Title */}
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Rail Sanchalak Dashboard
        </h1>
      </div>

      {/* Right side - Team info and user controls */}
      <div className="flex items-center space-x-6">
        {/* Team info */}
        <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
          Team: Rail Operations
        </div>

        {/* Dark mode toggle */}
        <button
          onClick={toggleDarkMode}
          aria-label="Toggle dark mode"
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? '🌞' : '🌙'}
        </button>

        {/* User section */}
        {user && (
          <div className="flex items-center space-x-3">
            {/* User avatar */}
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm">
              {user.name.charAt(0).toUpperCase()}
            </div>

            {/* User name */}
            <span className="text-gray-900 dark:text-gray-100 font-medium">
              User
            </span>

            {/* Logout button */}
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
