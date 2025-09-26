import * as React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
  MapIcon,
  BellAlertIcon,
  BuildingLibraryIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'

// Reusable link style
const linkClasses = (active: boolean) =>
  `flex items-center px-4 py-3 rounded-md transition-transform duration-200 transform ${
    active
      ? 'text-orange-200 font-semibold scale-105' // Active link
      : 'hover:text-orange-200 hover:scale-105'
  }`

export default function Sidebar() {
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="flex flex-col w-56 bg-[#282142] text-white min-h-screen">
      {/* Sidebar header */}
      <div className="p-6 text-2xl font-extrabold border-b border-gray-800 select-none">
        Rail संचालक
      </div>

      <ul className="flex-1 p-6 space-y-4">
        <li>
          <Link to="/" className={linkClasses(isActive('/'))}>
            <ChartBarIcon className="w-6 h-6 mr-3" />
            <span className="text-lg font-medium">Dashboard</span>
          </Link>
        </li>

        <li>
          <Link to="/idss" className={linkClasses(isActive('/idss'))}>
            <ChatBubbleLeftRightIcon className="w-6 h-6 mr-3" />
            <span className="text-lg font-medium">IDSS</span>
          </Link>
        </li>

        <li>
          <Link to="/live-map" className={linkClasses(isActive('/live-map'))}>
            <MapIcon className="w-6 h-6 mr-3" />
            <span className="text-lg font-medium">Live Map</span>
          </Link>
        </li>

        <li>
          <Link to="/alerts" className={linkClasses(isActive('/alerts'))}>
            <BellAlertIcon className="w-6 h-6 mr-3" />
            <span className="text-lg font-medium">Alerts</span>
          </Link>
        </li>

        <li>
          <Link
            to="/stations/pune"
            className={linkClasses(isActive('/stations/pune'))}
          >
            <BuildingLibraryIcon className="w-6 h-6 mr-3" />
            <span className="text-lg font-medium">Stations</span>
          </Link>
        </li>

        <li>
          <Link to="/search" className={linkClasses(isActive('/search'))}>
            <MagnifyingGlassIcon className="w-6 h-6 mr-3" />
            <span className="text-lg font-medium">Search Trains</span>
          </Link>
        </li>

        <li>
          <Link to="/rules" className={linkClasses(isActive('/rules'))}>
            <DocumentTextIcon className="w-6 h-6 mr-3" />
            <span className="text-lg font-medium">Rules</span>
          </Link>
        </li>

        <li>
          <Link to="/settings" className={linkClasses(isActive('/settings'))}>
            <Cog6ToothIcon className="w-6 h-6 mr-3" />
            <span className="text-lg font-medium">Settings</span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
