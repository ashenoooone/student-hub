export type EventType = {
  id: number,
  avatar: string,
  name: string,
  description: string,
  startDate: string,
  endDate: string,
  status: string,
  membersCount: number
}

export type EventStatus = 'PLANNED' | 'OPEN' | 'COMPLETED';
