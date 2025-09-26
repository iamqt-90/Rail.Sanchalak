import React from 'react'
import MetricCard from './MetricCard'
import ExampleChart from './ExampleChart'
import RecentAlerts from './RecentAlerts'
import { useNotifications } from '../contexts/NotificationContext'

import { DropdownArrow } from './RecentAlerts'

export default function DashboardPage() {
  const { notifications } = useNotifications();
  // Map notifications to Alert type for RecentAlerts
  const alerts = notifications.map(n => ({
    id: n.id,
    message: n.message,
    severity: n.type,
    timestamp: new Date().toISOString(), // Optionally add real timestamps if available
  }));
  const [recentAlertsExpanded, setRecentAlertsExpanded] = React.useState(false);
  return (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-0 sm:p-4">
      {/* Animation keyframes */}
      <style>{`
        @keyframes fadein {
          0% { opacity: 0; transform: translateY(30px) scale(0.96); }
          80% { opacity: 1; transform: translateY(-4px) scale(1.03); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fadein { animation: fadein 0.7s cubic-bezier(.68,-0.55,.27,1.55) both; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-500 { animation-delay: 0.5s; }
      `}</style>

      {/* Header */}

      {/* Dashboard action buttons moved to IDSSPage */}

      {/* Main content layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
        {/* Main section: metrics and chart */}
        <div className="xl:col-span-2 flex flex-col gap-8">
          {/* Metric cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="transition-transform hover:scale-105 hover:shadow-xl animate-fadein delay-100 h-full" style={{animationDelay: '0.1s'}}>
              <MetricCard
                title="Total Trains"
                value={245}
                trend={{ value: "5%", isPositive: true }}
              />
            </div>
            <div className="transition-transform hover:scale-105 hover:shadow-xl animate-fadein delay-300 h-full" style={{animationDelay: '0.3s'}}>
              <MetricCard
                title="Active Conflicts"
                value={12}
                trend={{ value: "2", isPositive: false }}
              />
            </div>
            <div className="transition-transform hover:scale-105 hover:shadow-xl animate-fadein delay-500 h-full" style={{animationDelay: '0.5s'}}>
              <MetricCard
                title="Avg Delay"
                value="4.2 min"
                trend={{ value: "0.5 min", isPositive: true }}
              />
            </div>
          </div>

          {/* Chart container */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 animate-fadein delay-500 transition-transform hover:scale-102 hover:shadow-xl">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 pl-2 border-l-4 border-indigo-500">
              Throughput Over Time
            </h2>
            <ExampleChart />
          </div>
        </div>

        {/* Sidebar section: informative cards */}
        <div className="flex flex-col gap-6 w-full xl:w-auto">
          {/* System Status Panel */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-4 animate-fadein delay-500">
            <ul className="text-sm text-gray-700 dark:text-gray-200 space-y-1">
              <li><b>API:</b> <span className="text-green-600">Online</span></li>
              <li><b>Database:</b> <span className="text-green-600">Connected</span></li>
              <li><b>Last Sync:</b> 2 min ago</li>
              <li><b>Server Load:</b> Normal</li>
            </ul>
          </div>

          {/* Quick Stats Panel */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-4 animate-fadein delay-300">
            <h3 className="text-md font-semibold text-indigo-700 dark:text-indigo-300 mb-3 flex items-center gap-2">
              <span>📊</span> Quick Stats
            </h3>
            <ul className="text-sm text-gray-700 dark:text-gray-200 space-y-1">
            
              <li><b>Trains in Transit:</b> 42</li>
              <li><b>Alerts Today:</b> 7</li>
              <li><b>Resolved Conflicts:</b> 5</li>
            </ul>
          </div>

          {/* Recent alerts */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-4 animate-fadein delay-500">
            <div className="flex items-center mb-3 select-none cursor-pointer group" onClick={() => setRecentAlertsExpanded((e) => !e)}>
              <h3 className="text-md font-semibold text-gray-700 dark:text-gray-200 mr-2">Recent Alerts</h3>
              <DropdownArrow expanded={recentAlertsExpanded} />
            </div>
            {recentAlertsExpanded && (
              <RecentAlerts alerts={alerts} showDropdown={true} expanded={recentAlertsExpanded} setExpanded={setRecentAlertsExpanded} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
