import * as React from 'react'
import { useUIStore } from '../store/useStore'

export default function SettingsPage() {
  const darkMode = useUIStore((state) => state.darkMode)
  const toggleDarkMode = useUIStore((state) => state.toggleDarkMode)

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      <div className="bg-white dark:bg-secondary-800 p-4 rounded shadow">
        {/* Settings card with white background in light mode, secondary dark in dark mode */}
        <h2 className="text-xl font-semibold mb-4">Appearance</h2>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={toggleDarkMode}
            className="mr-2"
          />
          Dark Mode
        </label>
      </div>
    </div>
  )
}
