<template>
  <table class="events-table">
    <thead>
      <tr>
        <th>Регион</th>
        <th>Название</th>
        <th>Пол</th>
        <th>Оружие</th>
        <th>Возраст или год рождения</th>
        <th>Тип</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="(group, date) in groupedEvents" :key="date">
        <tr class="events-table__date-row">
          <td colspan="6">{{ formatDate(date as string) }}</td>
        </tr>
        <tr
          v-for="event in group"
          :key="event.event_id"
          class="events-table__row"
        >
          <td class="events-table__refion-cell">{{ event.region }}</td>
          <td>{{ event.event_name }}</td>
          <td>{{ GENDER_LABELS[event.gender] ?? event.gender }}</td>
          <td>{{ WEAPON_LABELS[event.weapon] ?? event.weapon }}</td>
          <td>{{ AGE_LABELS[event.age] ?? event.age }}</td>
          <td>{{ event.category ? 'Командные' : 'Личные' }}</td>
        </tr>
      </template>
    </tbody>
  </table>

  <div v-if="!events.length" class="events-table__empty">
    Ничего не найдено
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Event } from '@/types/event'
import { WEAPON_LABELS, GENDER_LABELS, AGE_LABELS } from '@/constants/filter'

const props = defineProps<{
  events: Event[]
}>()

const groupedEvents = computed(() => {
  return props.events.reduce((acc, event) => {
    const date = event.start.slice(0, 10)
    if (!acc[date]) acc[date] = []
    acc[date].push(event)
    return acc
  }, {} as Record<string, Event[]>)
})

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
</script>

<style scoped>
.events-table {
  width: 100%;
  border-collapse: collapse;
}

.events-table th {
  text-align: left;
  font-size: 12px;
  padding: 8px 12px;
  color: #95E3FACC;
  font-weight: 400;
}

.events-table__date-row td {
  padding: 20px 12px 8px;
  font-size: 18px;
  color: #fff;
  font-weight: 500;
}

.events-table__row td {
  padding: 20px;
  font-size: 16px;
  border-bottom: 1px solid #7FDDFF33;
  color: #fff;
}

.events-table__row:hover td {
  background: #00495a;
}
.events-table__refion-cell {
  color: #95E3FACC;
  font-size: 16px;
}
.events-table__empty {
  text-align: center;
  padding: 40px;
  color: #95E3FACC;
  font-size: 16px;
}
</style>