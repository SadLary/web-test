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
        type="date"
      />
      <FilterInput
        v-model="filters.to"
        placeholder="Дата по"
        type="date"
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

  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import FilterSelect from '@/components/SelectFilter.vue'
import FilterInput from '@/components/InputFilter.vue'
import {
  regionsOptions,
  weaponOptions,
  genderOptions,
  ageOptions,
  categoryOptions,
} from '@/constants/filter'
import { EventFilters } from '@/types/event'
import AppHeader from './components/AppHeader.vue'

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

</script>

<style scoped>
.calendar {
  padding: 15px;
  background: #04171C;
  min-height: 100vh;
  color: #c8cdd8;
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
  margin-bottom: 24px;
}

.calendar__search-wrapper {
  width: 71.4%;
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