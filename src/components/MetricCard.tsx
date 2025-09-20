import * as React from 'react'

interface MetricCardProps {
  title: string
  value: string | number
  trend?: {
    value: string | number
    isPositive: boolean
  }
}

// MetricCard component updated to match screenshot design:
// - Added trend indicators with green/red colors matching screenshot
// - Updated styling to match card appearance in screenshot
// - Added proper spacing and typography
// - Made responsive and accessible
// - Preserves existing functionality while matching visual design

export default function MetricCard({ title, value, trend }: MetricCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer">
      {/* Card title */}
      <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
        {title}
      </h3>

      {/* Main value */}
      <div className="flex items-baseline justify-between">
        <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          {value}
        </p>

        {/* Trend indicator */}
        {trend && (
          <div className={`flex items-center space-x-1 px-2 py-1 rounded text-sm font-medium ${
            trend.isPositive
              ? 'text-green-600 bg-green-50 dark:bg-green-900/20'
              : 'text-red-600 bg-red-50 dark:bg-red-900/20'
          }`}>
            <span>{trend.isPositive ? '+' : ''}{trend.value}</span>
            <svg
              className={`w-4 h-4 ${trend.isPositive ? '' : 'rotate-180'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M5.293 7.707a1 1 0 011.414 0L10 11.086l3.293-3.379a1 1 0 111.414 1.414l-4 4.1a1 1 0 01-1.414 0l-4-4.1a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
    </div>
  )
}
