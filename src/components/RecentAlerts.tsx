// Export a dropdown arrow component for use next to the heading
export function DropdownArrow({ expanded = false, onClick }: { expanded?: boolean, onClick?: () => void }) {
  return (
    <svg
      onClick={onClick}
      className={`w-5 h-5 cursor-pointer transform transition-transform duration-200 ${expanded ? '' : '-rotate-90'} group-hover:text-indigo-500`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-expanded={expanded}
      tabIndex={0}
      role="button"
    >
      <title>Toggle Recent Alerts</title>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}
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

import React from 'react'

interface RecentAlertsProps {
  alerts?: Alert[];
  showDropdown?: boolean;
  expanded?: boolean;
  setExpanded?: (expanded: boolean) => void;
}

export default function RecentAlerts({ alerts = [], showDropdown = false, expanded, setExpanded }: RecentAlertsProps) {
  const [internalExpanded, internalSetExpanded] = React.useState(showDropdown ? false : true);
  const isControlled = typeof expanded === 'boolean' && typeof setExpanded === 'function';
  const actualExpanded = isControlled ? expanded : internalExpanded;
  const handleToggle = () => {
    if (isControlled) setExpanded && setExpanded(!expanded);
    else internalSetExpanded((e) => !e);
  };
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      {showDropdown && false /* arrow handled in DashboardPage */}
      <div
        id="recent-alerts-list"
        className={`space-y-3 transition-all duration-300 ease-in-out overflow-hidden ${showDropdown ? (actualExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0') : ''}`}
        aria-hidden={showDropdown ? !actualExpanded : false}
      >
        <AnimatePresence>
          {(!showDropdown || actualExpanded) && alerts.map((alert) => (
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
