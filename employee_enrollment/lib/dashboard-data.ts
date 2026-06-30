export type TimelinePoint = {
  label: string
  inside: number
  entries: number
  exits: number
}

// Seed presence data across the working day.
export const presenceSeed: TimelinePoint[] = [
  { label: '8AM', inside: 41, entries: 41, exits: 0 },
  { label: '9AM', inside: 47, entries: 9, exits: 3 },
  { label: '10AM', inside: 53, entries: 8, exits: 2 },
  { label: '11AM', inside: 61, entries: 12, exits: 4 },
  { label: '12PM', inside: 58, entries: 5, exits: 8 },
  { label: '1PM', inside: 64, entries: 11, exits: 5 },
  { label: '2PM', inside: 71, entries: 10, exits: 3 },
  { label: '3PM', inside: 68, entries: 4, exits: 7 },
]

export type Employee = {
  id: string
  name: string
  role: string
  direction: 'entered' | 'exited'
  time: string
  initials: string
}

export const liveActivity: Employee[] = [
  {
    id: '1',
    name: 'Aarav Sharma',
    role: 'Engineering',
    direction: 'entered',
    time: 'just now',
    initials: 'AS',
  },
  {
    id: '2',
    name: 'Priya Nair',
    role: 'Design',
    direction: 'entered',
    time: '2 min ago',
    initials: 'PN',
  },
  {
    id: '3',
    name: 'Rohan Mehta',
    role: 'Finance',
    direction: 'exited',
    time: '6 min ago',
    initials: 'RM',
  },
  {
    id: '4',
    name: 'Ishita Verma',
    role: 'Operations',
    direction: 'entered',
    time: '11 min ago',
    initials: 'IV',
  },
  {
    id: '5',
    name: 'Karan Gupta',
    role: 'Security',
    direction: 'exited',
    time: '18 min ago',
    initials: 'KG',
  },
]

export type Alert = {
  id: string
  title: string
  detail: string
  time: string
  level: 'critical' | 'warning' | 'info'
}

export const recentAlerts: Alert[] = [
  {
    id: 'a1',
    title: 'Unrecognized face detected',
    detail: 'Main Entrance · Camera 02',
    time: '1 min ago',
    level: 'critical',
  },
  {
    id: 'a2',
    title: 'Tailgating suspected',
    detail: 'East Wing · Camera 05',
    time: '14 min ago',
    level: 'warning',
  },
  {
    id: 'a3',
    title: 'After-hours access',
    detail: 'Server Room · Camera 09',
    time: '32 min ago',
    level: 'info',
  },
]

export type HealthItem = {
  id: string
  label: string
  status: string
  state: 'online' | 'healthy' | 'connected' | 'degraded'
  metric: string
}

export const systemHealth: HealthItem[] = [
  {
    id: 'h1',
    label: 'Face Detection',
    status: 'Online',
    state: 'online',
    metric: '99.9% uptime',
  },
  {
    id: 'h2',
    label: 'Camera Status',
    status: 'Healthy',
    state: 'healthy',
    metric: '12 / 12 active',
  },
  {
    id: 'h3',
    label: 'Database',
    status: 'Connected',
    state: 'connected',
    metric: '24ms latency',
  },
  {
    id: 'h4',
    label: 'Edge Sync',
    status: 'Degraded',
    state: 'degraded',
    metric: 'retrying · 1 node',
  },
]
