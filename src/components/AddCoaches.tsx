import * as React from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const coachTypes = ['AC', 'Sleeper', 'General']

export default function AddCoaches() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [coachType, setCoachType] = React.useState(coachTypes[0])
  const [numSeats, setNumSeats] = React.useState(0)
  const [availability, setAvailability] = React.useState(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Integrate with backend API to update train data
    alert(`Added ${numSeats} seats of type ${coachType} to train at station ${id}`)
    navigate(`/stations/${id}`)
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-secondary-800 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Add Coaches to Train at Station {id}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Coach Type</label>
          <select
            value={coachType}
            onChange={(e) => setCoachType(e.target.value)}
            className="w-full p-2 border rounded"
          >
            {coachTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-semibold">Number of Seats</label>
          <input
            type="number"
            value={numSeats}
            onChange={(e) => setNumSeats(Number(e.target.value))}
            className="w-full p-2 border rounded"
            min={0}
          />
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={availability}
            onChange={(e) => setAvailability(e.target.checked)}
            id="availability"
          />
          <label htmlFor="availability" className="font-semibold">Available</label>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Add Coaches
        </button>
      </form>
    </div>
  )
}
