type EventType = {
  id: number,
  avatar: string,
  name: string,
  description: string,
  startDate: string,
  endDate: string,
  status: string,
  membersCount: number
}

enum EventStatus {
  PLANNED = 'PLANNED',
  OPEN = 'OPEN',
  COMPLETED = 'COMPLETED'
}
