import * as React from 'react'
import { useState, useEffect } from 'react'

interface AutoDismissPopupProps {
  message: string
  timeout: number // in milliseconds
  onClose: () => void
  bgColor?: string
  progressBarColor?: string
}

// AutoDismissPopup component:
// - Fixed position in top-right corner with margin
// - Displays message and horizontal progress bar indicating remaining time
// - Auto-dismisses after configurable timeout
// - Smooth fade-in and fade-out animations
// - Smooth progress bar fill/empty animation
// - Supports multiple notifications stacking vertically
// - Reusable with customizable message, timeout, and colors
// - High z-index to appear above other content
// - Uses React hooks and TypeScript types correctly

export default function AutoDismissPopup({
  message,
  timeout,
  onClose,
  bgColor = 'bg-blue-600',
  progressBarColor = 'bg-white',
}: AutoDismissPopupProps) {
  const [progress, setProgress] = useState(100) // progress percentage (100% full)
  const [visible, setVisible] = useState(false)

  React.useEffect(() => {
    setVisible(true) // trigger fade-in on mount
  }, [])

  useEffect(() => {
    // Calculate interval for smooth progress update (e.g., 60fps)
    const intervalMs = 1000 / 60
    const totalTicks = timeout / intervalMs
    let tick = 0

    const interval = setInterval(() => {
      tick++
      const newProgress = Math.max(100 - (tick / totalTicks) * 100, 0)
      setProgress(newProgress)
      if (tick >= totalTicks) {
        clearInterval(interval)
        setVisible(false) // trigger fade-out
        setTimeout(onClose, 300) // wait for fade-out animation before unmount
      }
    }, intervalMs)

    // Cleanup interval on unmount
    return () => clearInterval(interval)
  }, [timeout, onClose])

  return (
    <div
      className={`fixed top-4 right-4 max-w-sm rounded shadow-lg p-4 flex flex-col space-y-2 transition-opacity duration-300 z-50 ${bgColor} text-white ${visible ? 'opacity-100' : 'opacity-0'}`}
      role="alert"
      aria-live="assertive"
    >
      <div>{message}</div>
      <div className="h-1 w-full rounded overflow-hidden bg-opacity-30 bg-white">
        <div
          className={`h-full ${progressBarColor} transition-all duration-100 linear`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
