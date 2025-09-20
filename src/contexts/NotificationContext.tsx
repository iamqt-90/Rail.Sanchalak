import React, { createContext, useContext, useState, ReactNode } from 'react'

interface Notification {
  id: string
  message: string
  type: 'info' | 'warning' | 'critical'
}

interface NotificationContextType {
  notifications: Notification[]
  addNotification: (message: string, type: 'info' | 'warning' | 'critical') => void
  dismissNotification: (id: string) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export const useNotifications = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}

interface NotificationProviderProps {
  children: ReactNode
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: '1', message: 'Signal failure at Station A', type: 'critical' },
    { id: '2', message: 'Train 123 delayed by 10 minutes', type: 'warning' },
    { id: '3', message: 'Maintenance completed on Track B', type: 'info' },
  ])

  const addNotification = (message: string, type: 'info' | 'warning' | 'critical') => {
    const id = Date.now().toString()
    setNotifications(prev => [...prev, { id, message, type }])
  }

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, dismissNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}
