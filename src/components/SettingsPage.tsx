import * as React from 'react';
import { useUIStore, useAuthStore } from '../store/useStore';

export default function SettingsPage() {
  const darkMode = useUIStore((state) => state.darkMode);
  const toggleDarkMode = useUIStore((state) => state.toggleDarkMode);
  const logout = useAuthStore((state) => state.logout);

  const [notifSound, setNotifSound] = React.useState(true);
  const [maintenanceMode, setMaintenanceMode] = React.useState(false);
  const [showStatusBanner, setShowStatusBanner] = React.useState(true);
  const [customLayout, setCustomLayout] = React.useState('default');
  const [autoRefresh, setAutoRefresh] = React.useState(true);
  const [showTrainNumbers, setShowTrainNumbers] = React.useState(true);
  const [enableBulkActions, setEnableBulkActions] = React.useState(false);
  const [showAuditLog, setShowAuditLog] = React.useState(false);
  const [allowManualOverride, setAllowManualOverride] = React.useState(false);
  const [showWeatherWidget, setShowWeatherWidget] = React.useState(true);
  const [enableIncidentAlerts, setEnableIncidentAlerts] = React.useState(true);
  const [showPerformanceStats, setShowPerformanceStats] = React.useState(true);
  const [enableSMSAlerts, setEnableSMSAlerts] = React.useState(false);
  const [showHelpTips, setShowHelpTips] = React.useState(true);
  const [enableExperimental, setEnableExperimental] = React.useState(false);
  const [language, setLanguage] = React.useState('en');
  const [dataExport, setDataExport] = React.useState(false);
  const [userRole, setUserRole] = React.useState('controller');
  const [sessionTimeout, setSessionTimeout] = React.useState(30);

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  // Reusable card component
  const Card: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white/80 dark:bg-secondary-900/80 rounded-2xl shadow-md p-6 flex flex-col gap-3">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );

  return (
    <div className="w-full min-h-[calc(100vh-64px)] px-4 py-8 flex flex-col items-center gap-8">
      <h1 className="text-4xl font-bold text-black dark:text-white px-4 py-2">Settings</h1>

      <div className="w-full max-w-5xl flex flex-col gap-6">
        {/* Appearance Card */}
        <Card title="Appearance">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
            Dark Mode
          </label>
          <label className="flex items-center gap-2">
            Language:
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="p-2 rounded border border-gray-300 dark:bg-secondary-900 dark:text-white"
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="bn">Bengali</option>
              <option value="ta">Tamil</option>
              <option value="te">Telugu</option>
            </select>
          </label>
        </Card>

        {/* Notifications Card */}
        <Card title="Notifications">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={notifSound} onChange={() => setNotifSound((v) => !v)} />
            Enable Notification Sound
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={enableSMSAlerts} onChange={() => setEnableSMSAlerts((v) => !v)} />
            Enable SMS Alerts
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={enableIncidentAlerts}
              onChange={() => setEnableIncidentAlerts((v) => !v)}
            />
            Enable Incident Alerts
          </label>
        </Card>

        {/* System Controls Card */}
        <Card title="System Controls">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={maintenanceMode}
              onChange={() => setMaintenanceMode((v) => !v)}
            />
            Enable Maintenance Mode
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={autoRefresh} onChange={() => setAutoRefresh((v) => !v)} />
            Auto Refresh Dashboard
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={enableBulkActions}
              onChange={() => setEnableBulkActions((v) => !v)}
            />
            Enable Bulk Actions
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={allowManualOverride}
              onChange={() => setAllowManualOverride((v) => !v)}
            />
            Allow Manual Override
          </label>
          <label className="flex items-center gap-2">
            Session Timeout:
            <input
              type="number"
              min={5}
              max={120}
              value={sessionTimeout}
              onChange={(e) => setSessionTimeout(Number(e.target.value))}
              className="w-20 p-1 rounded border border-gray-300 dark:bg-secondary-900 dark:text-white ml-2"
            />
            min
          </label>
        </Card>

        {/* Display Options Card */}
        <Card title="Display Options">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showStatusBanner}
              onChange={() => setShowStatusBanner((v) => !v)}
            />
            Show System Status Banner
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showTrainNumbers}
              onChange={() => setShowTrainNumbers((v) => !v)}
            />
            Show Train Numbers
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showWeatherWidget}
              onChange={() => setShowWeatherWidget((v) => !v)}
            />
            Show Weather Widget
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showPerformanceStats}
              onChange={() => setShowPerformanceStats((v) => !v)}
            />
            Show Performance Stats
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={showAuditLog} onChange={() => setShowAuditLog((v) => !v)} />
            Show Audit Log
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={showHelpTips} onChange={() => setShowHelpTips((v) => !v)} />
            Show Help Tips
          </label>
        </Card>

        {/* Dashboard Layout Card */}
        <Card title="Dashboard Layout">
          <select
            className="p-3 rounded-xl border border-gray-300 dark:bg-secondary-900 dark:text-white text-lg"
            value={customLayout}
            onChange={(e) => setCustomLayout(e.target.value)}
          >
            <option value="default">Default Layout</option>
            <option value="compact">Compact Layout</option>
            <option value="wide">Wide Layout</option>
            <option value="controller">Controller View</option>
            <option value="minimal">Minimal</option>
          </select>
        </Card>

        {/* Data Export/Import Card */}
        <Card title="Data Management">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={dataExport} onChange={() => setDataExport((v) => !v)} />
            Enable Data Export/Import
          </label>
        </Card>

        {/* User Role Card */}
        <Card title="User Role">
          <select
            className="p-2 rounded border border-gray-300 dark:bg-secondary-900 dark:text-white"
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
          >
            <option value="controller">Chief Controller</option>
            <option value="operator">Operator</option>
            <option value="admin">Admin</option>
            <option value="viewer">Viewer</option>
          </select>
        </Card>

        {/* Experimental Features Card */}
        <Card title="Experimental Features">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={enableExperimental}
              onChange={() => setEnableExperimental((v) => !v)}
            />
            Enable Experimental Features
          </label>
        </Card>

        {/* Logout Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={handleLogout}
            className="px-6 py-3 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
