// Returns a mock rail track (array of [lat, lng]) between two stations
export async function fetchRailTrack(source: string, destination: string): Promise<[number, number][]> {
  // For demo, return a curved path between Pune and Patna
  // In real use, this would be fetched from a backend or GIS service
  const stationCoords: Record<string, [number, number]> = {
    'Pune Junction': [18.5286, 73.8745],
    'Patna Junction': [25.5941, 85.1376],
    'Shivajinagar': [18.5328, 73.8769],
    'Khadki': [18.5513, 73.8416],
    'Hadapsar': [18.5012, 73.9336],
    'Pimpri': [18.6298, 73.7997],
    'Rajendra Nagar Terminal': [25.5877, 85.0985],
    'Danapur': [25.6009, 85.0111],
    'Patliputra Junction': [25.5736, 85.09],
    'Gulzarbagh': [25.6045, 85.1539],
  };
  const src = stationCoords[source] || [18.5286, 73.8745];
  const dst = stationCoords[destination] || [25.5941, 85.1376];
  // Generate a simple curved path (quadratic bezier) for demo
  const mid: [number, number] = [
    (src[0] + dst[0]) / 2 + 2, // curve north
    (src[1] + dst[1]) / 2
  ];
  const points: [number, number][] = [];
  for (let t = 0; t <= 1; t += 0.05) {
    const lat = (1 - t) * (1 - t) * src[0] + 2 * (1 - t) * t * mid[0] + t * t * dst[0];
    const lng = (1 - t) * (1 - t) * src[1] + 2 * (1 - t) * t * mid[1] + t * t * dst[1];
    points.push([lat, lng]);
  }
  return points;
}
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
