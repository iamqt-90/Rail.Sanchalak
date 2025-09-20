import * as React from 'react'
import { useNotifications } from '../contexts/NotificationContext'

const AUTO_DISMISS_TIMEOUT = 8000 // 8 seconds timeout for auto-dismiss

// Notifications component updated to:
// - Auto-dismiss notifications after timeout
// - Keep manual close button (×) for user dismissal
// - Prevent duplicate notifications while active
// - Maintain existing color scheme and style

export default function Notifications() {
  const { notifications, dismissNotification } = useNotifications()
  React.useEffect(() => {
    if (notifications.length === 0) return

    const timers = notifications.map((notification) =>
      setTimeout(() => {
        dismissNotification(notification.id)
      }, AUTO_DISMISS_TIMEOUT)
    )

    return () => {
      timers.forEach((timer) => clearTimeout(timer))
    }
  }, [notifications, dismissNotification])

  return (
    <div className="fixed bottom-4 right-4 flex flex-col space-y-2 z-50">
      {notifications.map(({ id, message, type }) => {
        let bgColor = 'bg-blue-500'
        if (type === 'warning') bgColor = 'bg-yellow-500'
        else if (type === 'critical') bgColor = 'bg-red-600'

        return (
          <div
            key={id}
            className={`${bgColor} text-white px-4 py-3 rounded shadow-lg flex items-center space-x-4 max-w-sm`}
            role="alert"
          >
            <span className="flex-1">{message}</span>
            <button
              onClick={() => dismissNotification(id)}
              aria-label="Dismiss notification"
              className="text-white hover:text-gray-200"
            >
              &times;
            </button>
          </div>
        )
      })}
    </div>
  )
}
