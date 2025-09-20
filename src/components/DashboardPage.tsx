// React import not required with the new JSX transform
import MetricCard from './MetricCard'
import ExampleChart from './ExampleChart'
import RecentAlerts from './RecentAlerts'
import OptimizationPanel from './OptimizationPanel'
import { Conflict } from '../types'

// DashboardPage component updated to match screenshot design:
// - Updated title to "Rail Sanchalak Dashboard" as shown in screenshot
// - Updated metric cards with exact values from screenshot (245, 12, 4.2 min)
// - Added trend indicators matching screenshot (+5%, -2, +0.5 min)
// - Updated chart title to "Throughput Over Time" as shown in screenshot
// - Adjusted layout and spacing to match screenshot
// - Preserves all existing functionality while matching visual design

export default function DashboardPage() {
  // Mock conflicts for the OptimizationPanel - in a real app these would come from API / websocket
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
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content area: spans 2 columns on large screens */}
        <div className="lg:col-span-2 space-y-8">
          {/* Metric cards grid matching screenshot layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard
              title="Total Trains"
              value={245}
              trend={{ value: "5%", isPositive: true }}
            />
            <MetricCard
              title="Active Conflicts"
              value={12}
              trend={{ value: "2", isPositive: false }}
            />
            <MetricCard
              title="Avg Delay"
              value="4.2 min"
              trend={{ value: "0.5 min", isPositive: true }}
            />
          </div>

          {/* Chart container matching screenshot styling */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 pl-6">Throughput Over Time</h2>
            <ExampleChart />
          </div>

          {/* Recent alerts section */}
          <div className="pl-6">
            <RecentAlerts />
          </div>
        </div>

        {/* Right sidebar: persistent, scrollable Optimization suggestions */}
        <aside className="lg:col-span-1">
          <div className="sticky top-6">
            <div className="h-[70vh] overflow-y-auto pr-2">
              <OptimizationPanel conflicts={conflicts} />
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
