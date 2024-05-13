export type Status = "PLANNED" | "OPEN" | "COMPLETED"

export const PROJECT_STATUS: Record<Status, string> = {
  PLANNED: 'На этапе проектирования',
  OPEN: 'В разработке',
  COMPLETED: 'Выполнен'
}