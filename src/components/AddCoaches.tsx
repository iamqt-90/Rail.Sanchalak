import * as React from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const coachTypes = ['AC', 'Sleeper', 'General']


export default function AddCoaches() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [coachType, setCoachType] = React.useState(coachTypes[0])
  const [numSeats, setNumSeats] = React.useState(0)
  const [availability, setAvailability] = React.useState(true)
  const [shake, setShake] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShake(true)
    setTimeout(() => setShake(false), 500)
    // TODO: Integrate with backend API to update train data
    setTimeout(() => {
      alert(`Added ${numSeats} seats of type ${coachType} to train at station ${id}`)
      navigate(`/stations/${id}`)
    }, 500)
  }

  return (
    <>
      <style>{`
        @keyframes fadeInUp { 0% { opacity: 0; transform: translateY(40px) scale(0.96); } 80% { opacity: 1; transform: translateY(-4px) scale(1.03); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
        .animate-fadeInUp { animation: fadeInUp 0.7s cubic-bezier(.68,-0.55,.27,1.55) both; }
        @keyframes shake { 0%,100%{transform:translateX(0);} 20%,60%{transform:translateX(-8px);} 40%,80%{transform:translateX(8px);} }
        .animate-shake { animation: shake 0.5s cubic-bezier(.68,-0.55,.27,1.55); }
      `}</style>
      <div className={`max-w-md mx-auto p-6 bg-white dark:bg-secondary-800 rounded shadow animate-fadeInUp ${shake ? 'animate-shake' : ''}`}>
      <h1 className="text-2xl font-bold mb-4">Add Coaches to Train at Station {id}</h1>
  <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Coach Type</label>
          <select
            value={coachType}
            onChange={(e) => setCoachType(e.target.value)}
            className="w-full p-2 border rounded transition focus:ring-2 focus:ring-blue-400 focus:border-blue-400 hover:shadow-lg"
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
            className="w-full p-2 border rounded transition focus:ring-2 focus:ring-blue-400 focus:border-blue-400 hover:shadow-lg"
            min={0}
          />
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={availability}
            onChange={(e) => setAvailability(e.target.checked)}
            id="availability"
            className="transition focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          />
          <label htmlFor="availability" className="font-semibold">Available</label>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 hover:bg-blue-100 active:scale-95 transition focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 shadow-md hover:shadow-xl"
          style={{ animation: shake ? 'shake 0.5s cubic-bezier(.68,-0.55,.27,1.55)' : undefined }}
        >
          Add Coaches
        </button>
      </form>
      </div>
    </>
  )
}
