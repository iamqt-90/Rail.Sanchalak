import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const stationData = {
  pune: {
    name: 'Pune',
    platforms: 7,
    platformAvailability: 'Mostly available',
    facilities: ['Restrooms', 'Waiting halls', 'Food stalls'],
  },
  delhi: {
    name: 'Delhi',
    platforms: 16,
    platformAvailability: 'Busy',
    facilities: ['Restrooms', 'Waiting halls', 'Food stalls', 'WiFi'],
  },
  mumbai: {
    name: 'Mumbai',
    platforms: 12,
    platformAvailability: 'Moderate',
    facilities: ['Restrooms', 'Waiting halls', 'Food stalls', 'Parking'],
  },
};

export default function StationDetails() {
  const navigate = useNavigate();
  const [search, setSearch] = React.useState('');
  const [selected, setSelected] = React.useState<string | null>(null);
  const [error, setError] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const key = search.trim().toLowerCase();
    if (key in stationData) {
      setSelected(key);
      setError('');
    } else {
      setSelected(null);
      setError('Station not found. Try pune, delhi, or mumbai.');
    }
  };

  const station = selected ? stationData[selected as keyof typeof stationData] : null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-10 px-4 bg-gray-50 dark:bg-gray-900">
      <form onSubmit={handleSearch} className="w-full max-w-md mb-8 flex flex-col md:flex-row gap-3 items-center">
        <input
          type="text"
          placeholder="Search station name (e.g. pune, delhi, mumbai)"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-300"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>
      {error && <div className="mb-6 text-red-500 font-semibold">{error}</div>}
      {station && (
        <div className="bg-white dark:bg-secondary-800 shadow-lg rounded-3xl w-full max-w-3xl p-8 md:p-12 transition-transform hover:scale-[1.01] duration-300">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-white text-center">
            {station.name} Station Details
          </h1>
          <div className="space-y-4 text-gray-700 dark:text-gray-300 text-lg">
            <p>
              <strong>Number of Platforms:</strong> {station.platforms}
            </p>
            <p>
              <strong>Platform Availability:</strong> {station.platformAvailability}
            </p>
            <p>
              <strong>Facilities:</strong> {station.facilities.join(', ')}
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6 mt-8">
            <button
              className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 active:scale-95 transition focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              onClick={() => navigate(`/search?station=${selected}`)}
            >
              View Linked Trains
            </button>
            <button
              className="w-full md:w-auto px-6 py-3 bg-green-600 text-white font-semibold rounded-xl shadow-md hover:bg-green-700 active:scale-95 transition focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
              onClick={() => navigate(`/stations/${selected}/add-coaches`)}
            >
              Add Coaches
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
