import { motion } from 'framer-motion';
import OptimizationPanel from './OptimizationPanel'; 
import { useState } from 'react';

const IDSSPage = () => {
  const [conflicts, setConflicts] = useState([
    { 
      id: '1', 
      action: 'delay', 
      train_id: '12951', 
      description: 'Train 12951 is delayed due to maintenance.', 
      confidence: 0.9, 
      recommendation: 'Delay by 15 minutes' 
    },
    { 
      id: '2', 
      action: 'redirect', 
      train_id: '12009', 
      description: 'Train 12009 needs to be redirected due to track issues.', 
      confidence: 0.8, 
      recommendation: 'Redirect to alternate route' 
    },
    {
      id: '3',
      action: 'speed-reduction',
      train_id: '22945',
      description: 'Fog detected on route for Train 22945.',
      confidence: 0.7,
      recommendation: 'Reduce speed to 40 km/h between Station X and Y.'
    },
    {
      id: '4',
      action: 'maintenance',
      train_id: '19316',
      description: 'Scheduled maintenance required at Station Z for Train 19316.',
      confidence: 0.85,
      recommendation: 'Schedule maintenance stop at Station Z.'
    },
    {
      id: '5',
      action: 'platform-change',
      train_id: '11058',
      description: 'Platform congestion detected for Train 11058.',
      confidence: 0.6,
      recommendation: 'Move arrival to Platform 2.'
    },
    {
      id: '6',
      action: 'weather-delay',
      train_id: '22177',
      description: 'Heavy rain on route for Train 22177.',
      confidence: 0.75,
      recommendation: 'Delay by 30 minutes due to weather.'
    },
    {
      id: '7',
      action: 'crew-change',
      train_id: '14701',
      description: 'Crew shift ending soon for Train 14701.',
      confidence: 0.8,
      recommendation: 'Assign new crew at Station Q.'
    },
    {
      id: '8',
      action: 'emergency-stop',
      train_id: '16587',
      description: 'Track obstruction detected for Train 16587.',
      confidence: 0.95,
      recommendation: 'Stop immediately and await clearance.'
    },
    {
      id: '9',
      action: 'priority-reroute',
      train_id: '18477',
      description: 'High-priority cargo on board Train 18477.',
      confidence: 0.9,
      recommendation: 'Reroute via alternate track to avoid delay.'
    },
    {
      id: '10',
      action: 'cargo-inspection',
      train_id: '20801',
      description: 'Random cargo inspection required for Train 20801.',
      confidence: 0.5,
      recommendation: 'Inspect cargo at next station.'
    },
    {
      id: '11',
      action: 'add-coaches',
      train_id: '19038',
      description: 'High passenger demand detected for Train 19038.',
      confidence: 0.65,
      recommendation: 'Attach 2 extra coaches at Station M.'
    },
    {
      id: '12',
      action: 'cancel-stop',
      train_id: '12627',
      description: 'Train 12627 is running behind schedule.',
      confidence: 0.55,
      recommendation: 'Skip Station N to recover lost time.'
    },
  ]);

  const handleManualOverride = (trainId: string) => {
    alert(`Manual override triggered for ${trainId}`);
    // Add actual override logic here
  };

  const handleWhatIfSimulation = (trainId: string) => {
    alert(`What-If Simulation started for ${trainId}`);
    // Add logic for simulating scenarios without affecting real data
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25, duration: 0.4 }}
      className="mt-4"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Optimization Suggestions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {conflicts.map((conflict) => (
          <div
            key={conflict.id}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6 flex flex-col justify-between transition-transform duration-200 hover:scale-102 hover:shadow-lg"
          >
            {/* Conflict info as plain text */}
            <div className="mb-4">
              <div className="font-semibold text-lg text-blue-700 dark:text-blue-300">{conflict.train_id}</div>
              <div className="text-gray-700 dark:text-gray-300 mb-1">{conflict.description}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Suggestion: <span className="font-medium text-green-700 dark:text-green-400">{conflict.recommendation}</span></div>
              <div className="text-xs text-gray-400 dark:text-gray-500">Confidence: {(conflict.confidence * 100).toFixed(0)}%</div>
            </div>
            {/* Buttons */}
            <div className="mt-4 flex gap-3">
              <button
                className="flex-1 px-4 py-2 rounded-lg bg-red-600 text-white font-semibold shadow hover:bg-red-700 transition"
                onClick={() => handleManualOverride(conflict.train_id)}
              >
                Manual Override
              </button>
              <button
                className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
                onClick={() => handleWhatIfSimulation(conflict.train_id)}
              >
                What-If Simulation
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default IDSSPage;
