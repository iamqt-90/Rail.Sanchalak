// React import not required with the new JSX transform
import { Alert } from '../types'
import { motion, AnimatePresence } from 'framer-motion'

interface RecentAlertsProps {
  alerts?: Alert[]
}

// RecentAlerts component updated to match screenshot design:
// - Updated styling to match colored alert backgrounds from screenshot
// - Added timestamp formatting to match screenshot format (10/1/2023, 4:00:00 PM)
// - Updated layout and spacing to match screenshot
// - Color coding: red for critical, yellow for warning, blue for info
// - Preserves existing functionality and animations

const severityStyles = {
  critical: 'bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 text-red-800 dark:text-red-200',
  warning: 'bg-yellow-100 dark:bg-yellow-900/30 border-l-4 border-yellow-500 text-yellow-800 dark:text-yellow-200',
  info: 'bg-blue-100 dark:bg-blue-900/30 border-l-4 border-blue-500 text-blue-800 dark:text-blue-200',
}

const formatTimestamp = (timestamp: string): string => {
  try {
    const date = new Date(timestamp);
    
    // Check if date is invalid
    if (isNaN(date.getTime())) {
      console.warn(`Invalid timestamp received: ${timestamp}`);
      return 'Invalid date';
    }

    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  } catch (error) {
    console.error('Error formatting timestamp:', error);
    return 'Invalid date';
  }
}

export default function RecentAlerts({ alerts = [] }: RecentAlertsProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      {/* Section title */}
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Recent Alerts
      </h2>

      {/* Alerts list */}
      <div className="space-y-3">
        <AnimatePresence>
          {alerts.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className={`p-4 rounded-lg ${severityStyles[alert.severity]}`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="font-medium">{alert.message}</p>
                </div>
                <div className="text-xs opacity-75 ml-4">
                  {alert.timestamp ? formatTimestamp(alert.timestamp) : 'No date'}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
