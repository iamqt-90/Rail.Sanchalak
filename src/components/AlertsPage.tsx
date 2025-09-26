import * as React from 'react';
import RecentAlerts from './RecentAlerts';
import { Alert } from '../types';

export default function AlertsPage() {
  // Use the same conflicts as in IDSSPage
  const conflicts = [
    { id: '1', train_id: '12951', description: 'Train 12951 is delayed due to maintenance.', confidence: 0.9, recommendation: 'Delay by 15 minutes', action: 'delay' },
    { id: '2', train_id: '12009', description: 'Train 12009 needs to be redirected due to track issues.', confidence: 0.8, recommendation: 'Redirect to alternate route', action: 'redirect' },
    { id: '3', train_id: '22945', description: 'Fog detected on route for Train 22945.', confidence: 0.7, recommendation: 'Reduce speed to 40 km/h between Station X and Y.', action: 'speed-reduction' },
    { id: '4', train_id: '19316', description: 'Scheduled maintenance required at Station Z for Train 19316.', confidence: 0.85, recommendation: 'Schedule maintenance stop at Station Z.', action: 'maintenance' },
    { id: '5', train_id: '11058', description: 'Platform congestion detected for Train 11058.', confidence: 0.6, recommendation: 'Move arrival to Platform 2.', action: 'platform-change' },
    { id: '6', train_id: '22177', description: 'Heavy rain on route for Train 22177.', confidence: 0.75, recommendation: 'Delay by 30 minutes due to weather.', action: 'weather-delay' },
    { id: '7', train_id: '14701', description: 'Crew shift ending soon for Train 14701.', confidence: 0.8, recommendation: 'Assign new crew at Station Q.', action: 'crew-change' },
    { id: '8', train_id: '16587', description: 'Track obstruction detected for Train 16587.', confidence: 0.95, recommendation: 'Stop immediately and await clearance.', action: 'emergency-stop' },
    { id: '9', train_id: '18477', description: 'High-priority cargo on board Train 18477.', confidence: 0.9, recommendation: 'Reroute via alternate track to avoid delay.', action: 'priority-reroute' },
    { id: '10', train_id: '20801', description: 'Random cargo inspection required for Train 20801.', confidence: 0.5, recommendation: 'Inspect cargo at next station.', action: 'cargo-inspection' },
    { id: '11', train_id: '19038', description: 'High passenger demand detected for Train 19038.', confidence: 0.65, recommendation: 'Attach 2 extra coaches at Station M.', action: 'add-coaches' },
    { id: '12', train_id: '12627', description: 'Train 12627 is running behind schedule.', confidence: 0.55, recommendation: 'Skip Station N to recover lost time.', action: 'cancel-stop' },
  ];

  // Map conflicts to Alert type
  const alerts: Alert[] = conflicts.map((c) => ({
    id: c.id,
    message: c.description,
    severity:
      c.action === 'emergency-stop' ? 'critical'
      : c.action === 'delay' || c.action === 'weather-delay' || c.action === 'cancel-stop' ? 'warning'
      : 'info',
    timestamp: new Date().toISOString(),
  }));
  
  const [loading, setLoading] = React.useState(true);

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="px-6 md:px-10 lg:px-16 py-8 space-y-8 min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">Alerts</h1>
      
      {loading ? (
        <div className="text-center py-16 text-gray-500 text-lg">Loading alerts...</div>
      ) : alerts.length === 0 ? (
        <div className="text-center py-16 text-gray-500 text-lg">No alerts</div>
      ) : (
        <RecentAlerts alerts={alerts} />
      )}
    </div>
  );
}
