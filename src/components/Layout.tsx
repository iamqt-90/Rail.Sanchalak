import * as React from 'react'
import { ReactNode } from 'react'
import Navigation from './Navigation'
import Header from './Header'
import Notifications from './Notifications'
import { NotificationProvider } from '../contexts/NotificationContext'

interface LayoutProps {
  children: ReactNode
}

// Layout component updated to match screenshot design:
// - Updated main content background to match screenshot (light gray)
// - Adjusted spacing and padding to match design
// - Ensured proper responsive behavior
// - Preserves all existing functionality while matching visual design
// - Updated notification data to match screenshot alerts

export default function Layout({ children }: LayoutProps) {
  return (
    <NotificationProvider>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {/* Sidebar navigation */}
        <Navigation />

        {/* Main content area */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Header */}
          <Header />

          {/* Content */}
          <main className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900">
            {children}
          </main>
        </div>

        {/* Notifications popup */}
        <Notifications />
      </div>
    </NotificationProvider>
  )
}
