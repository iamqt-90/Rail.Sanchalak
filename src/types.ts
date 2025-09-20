export interface User {
  id: string
  email: string
  name: string
  avatarUrl?: string
}

export interface Train {
  id: string
  status: 'on-time' | 'delayed' | 'cancelled'
  delay: number
  eta: string
  schedule: ScheduleItem[]
}

export interface ScheduleItem {
  station: string
  arrival: string
  departure: string
}

export interface Alert {
  id: string
  message: string
  severity: 'critical' | 'warning' | 'info'
  timestamp: string
}

export interface Conflict {
  id: string
  description: string
  confidence: number
  recommendation: string
  train_id?: string
  action?: string
  timestamp?: string
  station?: string
  severity?: 'low' | 'medium' | 'high'
}
