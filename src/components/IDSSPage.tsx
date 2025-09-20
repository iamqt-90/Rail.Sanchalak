import OptimizationPanel from './OptimizationPanel'
import { Conflict } from '../types'
import { motion } from 'framer-motion'

export default function IDSSPage() {

  // Mock data
  const conflicts: Conflict[] = [
    {
      id: '1',
      description: 'Train 123 and 456 conflict at Station A',
      confidence: 0.85,
      recommendation: 'Delay Train 456 by 10 mins',
      train_id: 'TRN-456',
      action: 'delay',
      timestamp: new Date().toISOString(),
      station: 'Station A',
      severity: 'high'
    },
    {
      id: '2',
      description: 'Platform congestion at Station B',
      confidence: 0.72,
      recommendation: 'Redirect to alternative platform',
      train_id: 'TRN-789',
      action: 'redirect',
      timestamp: new Date().toISOString(),
      station: 'Station B',
      severity: 'medium'
    },
  ]

  return (
    <div className="relative h-full">
      {/* Main page content */}
      <div className="space-y-6">
        <h1 className="text-3xl font-bold pl-6">Intelligent Decision Support System</h1>
        <p className="text-gray-600 dark:text-gray-400 pl-6 mb-4">
          Real-time optimization suggestions for train scheduling conflicts.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 250, damping: 25, duration: 0.4 }}
        className="relative mx-auto w-full max-w-2xl px-6 pointer-events-auto mb-10"
      >
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 mb-4">
          <OptimizationPanel conflicts={conflicts} />
        </div>
      </motion.div>
    </div>
  )
}
