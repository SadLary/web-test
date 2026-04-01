<template>
  <AppHeader/>
  <div class="calendar">
    <div class="calendar__filters">
      <FilterSelect
        v-model="filters.region"
        label="Регион"
        :options="regionsOptions"
      />
      <FilterSelect
        v-model="filters.weapon"
        label="Оружие"
        :options="weaponOptions"
      />
      <FilterSelect
        v-model="filters.gender"
        label="Пол"
        :options="genderOptions"
      />
      <FilterSelect
        v-model="filters.age"
        label="Возраст"
        :options="ageOptions"
      />
      <FilterSelect
        v-model="filters.category"
        label="Платно/бесплатно"
        :options="categoryOptions"
      />
      <FilterInput
        v-model="filters.serie"
        placeholder="Серия"
      />
      <FilterInput
        v-model="filters.from"
        placeholder="Дата с"
      />
      <FilterInput
        v-model="filters.to"
        placeholder="Дата по"
      />
    </div>

    <div class="calendar__search-row">
      <div class="calendar__search-wrapper">
        <FilterInput
          v-model="searchQuery"
          placeholder="Название"
          class="calendar__search-input"
        >
          <template #icon>
            <img src="./assets/icons/search1.png" alt="">
          </template>
        </FilterInput>
      </div>

      <button
        class="calendar__reset"
        @click="resetFilters"
      >
        <span>×</span> Сбросить фильтр
      </button>
    </div>

    <div v-if="loading" class="calendar__state">Загрузка...</div>
    <div v-else-if="error" class="calendar__state calendar__state--error">{{ error }}</div>
 
    <template v-else>
      <EventTable :events="filteredEvents" />
 
      <div v-if="!filteredEvents.length" class="calendar__state">
        Ничего не найдено
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted} from 'vue'
import FilterSelect from '@/components/SelectFilter.vue'
import FilterInput from '@/components/InputFilter.vue'
import AppHeader from './components/AppHeader.vue'
import EventTable from '@/components/EventTable.vue'
import { useEvents } from '@/composable/useEvent'
import {
  regionsOptions,
  weaponOptions,
  genderOptions,
  ageOptions,
  categoryOptions,
} from '@/constants/filter'
import { EventFilters } from '@/types/event'


const filters = reactive<EventFilters>({
  region: '',
  weapon: '',
  gender: '',
  age: '',
  serie: '',
  from: '',
  to: '',
  category: null,
})

const searchQuery = ref('')
const { events, loading, error, fetchEvents } = useEvents(filters)

function resetFilters() {
  filters.region = ''
  filters.weapon = ''
  filters.gender = ''
  filters.age = ''
  filters.serie = ''
  filters.from = ''
  filters.to = ''
  filters.category = null
  searchQuery.value = ''
}

const filteredEvents = computed(() => {
  if (!searchQuery.value) return events.value
  const q = searchQuery.value.toLowerCase()
  return events.value.filter(e => e.event_name.toLowerCase().includes(q))
})

watch(filters, fetchEvents, { deep: true })
 
onMounted(fetchEvents)
</script>

<style scoped>
.calendar {
  padding: 15px;
  background: #04171C;
  min-height: 100vh;
  color: #fff;
  font-family: sans-serif;
}

.calendar__filters {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
}

.calendar__filters > * {
  flex: 1;
}

.calendar__search-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 45px;
}

.calendar__search-wrapper {
  width: 75%;
}

.calendar__search-input {
  width: 100%;
}

.calendar__reset {
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  color: #95E3FA;
  font-size: 18px;
  cursor: pointer;
  white-space: nowrap;
  transition: color 0.3s;
  padding: 0;
}
</style>