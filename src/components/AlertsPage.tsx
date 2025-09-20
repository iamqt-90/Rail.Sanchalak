
import * as React from 'react';
import RecentAlerts from './RecentAlerts';
import { Alert } from '../types';

export default function AlertsPage() {
  // Mock data
  const alerts: Alert[] = [
    { id: '1', message: 'Signal failure on track 3', severity: 'critical', timestamp: new Date().toISOString() },
    { id: '2', message: 'Maintenance scheduled', severity: 'info', timestamp: new Date().toISOString() },
    { id: '3', message: 'Train 456 delayed by 15 mins', severity: 'warning', timestamp: new Date().toISOString() },
  ];
  const [loading, setLoading] = React.useState(true);
  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Alerts</h1>
      {loading ? (
        <div className="text-center py-8 text-gray-500">Loading alerts...</div>
      ) : alerts.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No alerts</div>
      ) : (
        <RecentAlerts alerts={alerts} />
      )}
    </div>
  );
}
