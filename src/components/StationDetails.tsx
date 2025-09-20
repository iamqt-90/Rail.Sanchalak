import * as React from 'react'
import { useParams, useNavigate } from 'react-router-dom'

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
}

export default function StationDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
const station = id && id in stationData ? stationData[id as keyof typeof stationData] : null

  if (!station) {
    return <div className="p-4">Station not found.</div>
  }

  return (
    <div className="p-6 bg-white dark:bg-secondary-800 rounded shadow max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{station.name} Station Details</h1>
      <p><strong>Number of Platforms:</strong> {station.platforms}</p>
      <p><strong>Platform Availability:</strong> {station.platformAvailability}</p>
      <p><strong>Facilities:</strong> {station.facilities.join(', ')}</p>
      <div className="flex space-x-4 mt-6">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => navigate(`/search?station=${id}`)}
        >
          View Linked Trains
        </button>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={() => navigate(`/stations/${id}/add-coaches`)}
        >
          Add Coaches
        </button>
      </div>
    </div>
  )
}
