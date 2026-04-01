export interface EventFilters {
  region: string | null
  weapon: string | null
  gender: string | null
  age: string | null
  serie: string
  from: string
  to: string
  category: boolean | null
}

export interface Event {
  age: 'K' | 'J' | 'U23' | 'A' | 'V'
  category: boolean
  region: string | null
  event_id: string
  event_name: string
  gender: 'M' | 'F'
  is_international: boolean
  org_user_id: string
  serie: string[]
  start: string
  status: string
  type: string
  weapon: 'E' | 'S' | 'F'
}