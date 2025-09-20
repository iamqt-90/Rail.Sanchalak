import * as React from 'react'
import { Conflict } from '../types'
import { motion } from 'framer-motion'
import { useNotifications } from '../contexts/NotificationContext'
import axios from '../api/axios'

interface OptimizationPanelProps {
  conflicts?: Conflict[]
}

export default function OptimizationPanel({ conflicts = [] }: OptimizationPanelProps) {
  const { addNotification } = useNotifications()
  const [loadingStates, setLoadingStates] = React.useState<Record<string, boolean>>({})

  const applySuggestion = async (conflict: Conflict) => {
    const conflictId = conflict.id
    setLoadingStates(prev => ({ ...prev, [conflictId]: true }))

    try {
      // Send POST request to /api/idss/apply with the conflict data
      const response = await axios.post('/api/idss/apply', {
        train_id: conflict.train_id,
        action: conflict.action,
        timestamp: conflict.timestamp,
        station: conflict.station,
        recommendation: conflict.recommendation,
        confidence: conflict.confidence,
        description: conflict.description
      })

      // Show success notification
      addNotification('✅ Suggestion Applied Successfully', 'info')

      // Update frontend state to reflect the change
      console.log('Suggestion applied successfully:', response.data)

    } catch (error) {
      // Show error notification
      addNotification('❌ Failed to Apply Suggestion', 'critical')
      console.error('Error applying suggestion:', error)
    } finally {
      // Re-enable the button
      setLoadingStates(prev => ({ ...prev, [conflictId]: false }))
    }
  }

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-2xl px-4">
        {/* Optimization panel with white background in light mode, secondary dark in dark mode */}
        <h2 className="text-xl font-semibold mb-4 pl-6">Optimization Suggestions</h2>

        {conflicts.map((conflict) => (
          <motion.div
            key={conflict.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 mb-4 bg-[#f8fafc] dark:bg-gray-800 rounded-2xl shadow-md mx-auto w-full"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              {/* Left side - Content */}
              <div className="flex-1">
                <p className="font-semibold text-gray-800 dark:text-gray-200">{conflict.description}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Confidence: {(conflict.confidence * 100).toFixed(1)}%</p>
                <p className="text-sm text-green-600 dark:text-green-400">{conflict.recommendation}</p>
              </div>

              {/* Right side - Button */}
              <div className="flex-shrink-0">
                <button
                  onClick={() => applySuggestion(conflict)}
                  disabled={loadingStates[conflict.id]}
                  className={`
                    px-4 py-2 rounded-xl text-sm font-bold text-white
                    transition-all duration-200 cursor-pointer
                    ${loadingStates[conflict.id]
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-[#0ea5e9] hover:bg-[#0284c7] active:bg-[#0369a1]'
                    }
                  `}
                >
                  {loadingStates[conflict.id] ? 'Applying...' : 'Apply Suggestion'}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
