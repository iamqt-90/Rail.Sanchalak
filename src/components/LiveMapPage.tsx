import * as React from 'react'

export default function LiveMapPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Live Map</h1>
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow h-96 flex items-center justify-center">
        <p className="text-gray-500">Interactive map would be displayed here</p>
        {/* In a real app, integrate with a map library like Leaflet or Google Maps */}
      </div>
    </div>
  )
}
