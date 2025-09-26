import * as React from 'react'
import { ReactNode } from 'react'
import Navigation from './Navigation'
import Header from './Header'
import { NotificationProvider } from '../contexts/NotificationContext'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <NotificationProvider>
  <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-brand-steel">
        {/* Sidebar navigation */}
        <Navigation />

        {/* Main content area */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Header */}
          <Header />

          {/* Content */}
          <main className="flex-1 overflow-auto text-brand-steel">
            {children}
          </main>
        </div>

      </div>
    </NotificationProvider>
  )
}
