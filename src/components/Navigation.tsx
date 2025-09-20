import * as React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore, useUIStore } from '../store/useStore'
import {
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  MapIcon,
  BellAlertIcon,
  BuildingLibraryIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline'

// Navigation component updated to match design image:
// - Sidebar width, colors, typography, and icons updated
// - Responsive and accessible dropdown for Stations
// - Dark/light mode toggle and logout button styled
// - Preserves existing functionality and routing

export default function Navigation() {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const darkMode = useUIStore((state) => state.darkMode)
  const toggleDarkMode = useUIStore((state) => state.toggleDarkMode)
  const navigate = useNavigate()
  const location = useLocation()

  const [stationsOpen, setStationsOpen] = React.useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const stations = [
    { name: 'Pune', id: 'pune' },
    { name: 'Delhi', id: 'delhi' },
    { name: 'Mumbai', id: 'mumbai' },
  ]

  const handleStationClick = (id: string) => {
    navigate(`/stations/${id}`)
    setStationsOpen(false)
  }

  // Helper to check if a route is active
  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <nav className="flex flex-col w-56 bg-[#1e293b] text-white min-h-screen">
      {/* Sidebar header */}
      <div className="p-6 text-2xl font-extrabold border-b border-gray-700 select-none">Rail संचालक</div>
      <ul className="flex-1 p-6 space-y-4">
        <li>
          <Link
            to="/"
            className={`flex items-center px-4 py-3 rounded-md transition-colors ${
              isActive('/') ? 'bg-primary-500' : 'hover:bg-[#334155]'
            }`}
          >
            <ChartBarIcon className="w-6 h-6 mr-3" />
            <span className="text-lg font-medium">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link
            to="/idss"
            className={`flex items-center px-4 py-3 rounded-md transition-colors ${
              isActive('/idss') ? 'bg-primary-500' : 'hover:bg-[#334155]'
            }`}
          >
            <ChatBubbleLeftRightIcon className="w-6 h-6 mr-3" />
            <span className="text-lg font-medium">IDSS</span>
          </Link>
        </li>
        <li>
          <Link
            to="/live-map"
            className={`flex items-center px-4 py-3 rounded-md transition-colors ${
              isActive('/live-map') ? 'bg-primary-500' : 'hover:bg-[#334155]'
            }`}
          >
            <MapIcon className="w-6 h-6 mr-3" />
            <span className="text-lg font-medium">Live Map</span>
          </Link>
        </li>
        <li>
          <Link
            to="/alerts"
            className={`flex items-center px-4 py-3 rounded-md transition-colors ${
              isActive('/alerts') ? 'bg-primary-500' : 'hover:bg-[#334155]'
            }`}
          >
            <BellAlertIcon className="w-6 h-6 mr-3" />
            <span className="text-lg font-medium">Alerts</span>
          </Link>
        </li>
        <li className="relative">
          <button
            className={`flex items-center justify-between w-full px-4 py-3 rounded-md transition-colors ${
              stationsOpen ? 'bg-primary-500' : 'hover:bg-[#334155]'
            }`}
            onClick={() => setStationsOpen(!stationsOpen)}
            aria-expanded={stationsOpen}
            aria-controls="stations-menu"
          >
            <span className="flex items-center">
              <BuildingLibraryIcon className="w-6 h-6 mr-3" />
              <span className="text-lg font-medium">Stations</span>
            </span>
            <svg
              className="w-5 h-5 ml-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stationsOpen ? "M19 15l-7-7-7 7" : "M19 9l-7 7-7-7"} />
            </svg>
          </button>
          {stationsOpen && (
            <ul
              id="stations-menu"
              className="absolute left-full top-0 mt-0 w-48 bg-[#1e293b] border border-gray-700 rounded shadow-lg z-10"
              role="menu"
              aria-label="Stations submenu"
            >
              {stations.map((station) => (
                <li key={station.id}>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-700 rounded"
                    onClick={() => handleStationClick(station.id)}
                    role="menuitem"
                  >
                    {station.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </li>
        <li>
          <Link
            to="/settings"
            className={`flex items-center px-4 py-3 rounded-md transition-colors ${
              isActive('/settings') ? 'bg-primary-500' : 'hover:bg-[#334155]'
            }`}
          >
            <Cog6ToothIcon className="w-6 h-6 mr-3" />
            <span className="text-lg font-medium">Settings</span>
          </Link>
        </li>
      </ul>
      <div className="p-6 border-t border-gray-700 flex items-center justify-between">
        {/* Dark mode toggle button */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded hover:bg-gray-700"
          aria-label="Toggle dark mode"
          title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? '🌞' : '🌙'}
        </button>
        {user && (
          <div className="flex items-center space-x-3">
            <img
              src={user.avatarUrl || 'https://i.pravatar.cc/150?img=3'}
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="px-4 py-1 bg-red-600 rounded hover:bg-red-500"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
