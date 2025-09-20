import { Train, Alert, Conflict } from '../types'

export async function loginApi(email: string, password: string): Promise<{ token: string; user: any } | null> {
  // Mock login API
  if (email === 'admin@example.com' && password === 'password') {
    return {
      token: 'mock-token',
      user: { id: '1', email, name: 'Admin User', avatarUrl: 'https://i.pravatar.cc/150?img=3' },
    }
  }
  return null
}

export async function fetchTrains(): Promise<Train[]> {
  return [
    { id: '123', status: 'on-time', delay: 0, eta: '10:30', schedule: [{ station: 'Station A', arrival: '10:00', departure: '10:05' }] },
    { id: '456', status: 'delayed', delay: 15, eta: '11:00', schedule: [{ station: 'Station B', arrival: '10:30', departure: '10:35' }] },
  ]
}

export async function fetchAlerts(): Promise<Alert[]> {
  return [
    { id: '1', message: 'Signal failure on track 3', severity: 'critical', timestamp: new Date().toISOString() },
    { id: '2', message: 'Maintenance scheduled', severity: 'info', timestamp: new Date().toISOString() },
  ]
}

export async function fetchConflicts(): Promise<Conflict[]> {
  return [
    { id: '1', description: 'Train 123 and 456 conflict at Station A', confidence: 0.85, recommendation: 'Delay Train 456 by 10 mins' },
  ]
}
