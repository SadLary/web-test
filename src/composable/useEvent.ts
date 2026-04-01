import { ref } from 'vue'
import type { Event, EventFilters } from '@/types/event'

export function useEvents(filters: EventFilters) {
  const events = ref<Event[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchEvents() {
    loading.value = true
    error.value = null

    try {
      const params = new URLSearchParams()

      Object.entries(filters).forEach(([key, value]) => {
        if (value !== null && value !== '') {
            params.set(key, String(value))
        }
      })

      const response = await fetch(`/api/restapi/events?${params.toString()}`, {
        method: 'GET',
        headers: {
            Authorization:  'Basic ' + btoa('Webclient:Yogi543')
        }
      })

      if (!response.ok) {
        error.value = `Ошибка ${response.status}`
        throw new Error(`Ошибка ${response.status}`)
      }

      events.value = await response.json()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Неизвестная ошибка'
    } finally {
      loading.value = false
    }
  }

  return { events, loading, error, fetchEvents }
}