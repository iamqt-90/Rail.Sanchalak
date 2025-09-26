import * as React from 'react';
import { useState } from 'react';
import { useUIStore } from '../store/useStore';
import { Train } from '../types';

export default function SearchTrainPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [query, setQuery] = useState('');
  const selectTrain = useUIStore((state) => state.selectTrain);

  // No trains shown by default; only show details if a search matches
  const allTrains: Train[] = [
    {
      id: '123',
      status: 'on-time',
      delay: 0,
      eta: '10:30',
      schedule: [
        { station: 'Pune', arrival: '10:00', departure: '10:05' },
        { station: 'Lonavala', arrival: '10:45', departure: '10:47' },
        { station: 'Mumbai', arrival: '12:00', departure: '—' },
      ],
    },
    {
      id: '456',
      status: 'delayed',
      delay: 15,
      eta: '11:00',
      schedule: [
        { station: 'Delhi', arrival: '09:00', departure: '09:10' },
        { station: 'Agra', arrival: '10:30', departure: '10:35' },
        { station: 'Kanpur', arrival: '12:00', departure: '—' },
      ],
    },
    {
      id: '789',
      status: 'on-time',
      delay: 0,
      eta: '13:45',
      schedule: [
        { station: 'Chennai', arrival: '12:00', departure: '12:10' },
        { station: 'Vellore', arrival: '13:00', departure: '13:05' },
        { station: 'Bangalore', arrival: '13:45', departure: '—' },
      ],
    },
    {
      id: '101',
      status: 'delayed',
      delay: 25,
      eta: '15:20',
      schedule: [
        { station: 'Kolkata', arrival: '13:00', departure: '13:10' },
        { station: 'Dhanbad', arrival: '14:30', departure: '14:35' },
        { station: 'Patna', arrival: '15:20', departure: '—' },
      ],
    },
    {
      id: '202',
      status: 'on-time',
      delay: 0,
      eta: '16:00',
      schedule: [
        { station: 'Ahmedabad', arrival: '14:00', departure: '14:10' },
        { station: 'Vadodara', arrival: '15:00', departure: '15:05' },
        { station: 'Surat', arrival: '16:00', departure: '—' },
      ],
    },
  ];
  const filteredTrains = query.trim() ? allTrains.filter(train => train.id === query.trim()) : [];

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900">

      <div className="w-full flex flex-col items-center mt-16">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6">Search Train</h1>
        <form
          className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center"
          onSubmit={e => {
            e.preventDefault();
            setQuery(searchTerm);
          }}
        >
          <input
            type="text"
            placeholder="Enter train ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-96 md:w-[32rem] p-4 text-xl rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-400 outline-none mb-8"
          />
          <button
            type="submit"
            className="px-8 py-4 mb-8 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition text-xl"
          >
            Search
          </button>
        </form>
      </div>

      <div className="grid gap-4">
        {searchTerm.trim() && filteredTrains.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400">No trains found.</p>
        )}
        {filteredTrains.map((train) => (
          <div
            key={train.id}
            onClick={() => selectTrain(train)}
            className="bg-white dark:bg-secondary-800 shadow-lg rounded-3xl w-full max-w-2xl mx-auto p-8 md:p-10 transition-transform hover:scale-[1.01] duration-300 cursor-pointer"
          >
            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-white text-center">
              Train {train.id} Details
            </h1>
            <div className="space-y-4 text-gray-700 dark:text-gray-300 text-lg">
              <p><strong>Train ID:</strong> {train.id}</p>
              <p><strong>Status:</strong> <span className={train.status === 'delayed' ? 'text-red-500 font-medium' : 'text-green-500 font-medium'}>{train.status}</span></p>
              <p><strong>ETA:</strong> {train.eta}</p>
              {train.delay > 0 && <p><strong>Delay:</strong> <span className="text-red-500 font-medium">{train.delay} min</span></p>}
              <p><strong>Schedule:</strong></p>
              <ul className="list-disc pl-8">
                {train.schedule.map((stop, idx) => (
                  <li key={idx}>
                    <span className="font-semibold">{stop.station}</span>: Arrival {stop.arrival}, Departure {stop.departure}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
