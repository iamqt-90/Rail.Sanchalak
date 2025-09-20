import * as React from 'react'
import { useState } from 'react'
import { useUIStore } from '../store/useStore'
import { Train } from '../types'

export default function SearchTrainPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const selectTrain = useUIStore((state) => state.selectTrain)

  // Mock data
  const trains: Train[] = [
    { id: '123', status: 'on-time', delay: 0, eta: '10:30', schedule: [{ station: 'Station A', arrival: '10:00', departure: '10:05' }] },
    { id: '456', status: 'delayed', delay: 15, eta: '11:00', schedule: [{ station: 'Station B', arrival: '10:30', departure: '10:35' }] },
  ]

  const filteredTrains = trains.filter(train => train.id.includes(searchTerm))

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Search Train</h1>
      <input
        type="text"
        placeholder="Enter train ID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
      />
      <div className="grid gap-4">
        {filteredTrains.map((train) => (
          <div
            key={train.id}
            onClick={() => selectTrain(train)}
            className="bg-white dark:bg-secondary-800 p-4 rounded shadow cursor-pointer hover:shadow-lg"
          >
            {/* Train card with white background in light mode, secondary dark in dark mode */}
            <h3 className="text-lg font-semibold">Train {train.id}</h3>
            <p>Status: {train.status}</p>
            <p>ETA: {train.eta}</p>
            {train.delay > 0 && <p className="text-red-500">Delay: {train.delay} min</p>}
          </div>
        ))}
      </div>
    </div>
  )
}
