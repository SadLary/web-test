<template>
  <div>
    <SelectFilter
      v-model="selectedRegion"
      label="Регион"
      placeholder="Все"
      :options="regions"
    />
    <InputFilter
      v-model="serie"
      placeholder="Введите регион"
    />
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import SelectFilter from './shared/SelectFilter.vue';
import InputFilter from './shared/InputFilter.vue';

const regions = [
  { label: 'Все', value: '' },
  { label: 'СПБ',  value: 'СПБ' },
  { label: 'МОО',   value: 'МОО' },
]

const selectedRegion = ref(regions[0].value)
const serie = ref('')

onMounted(async () => {


  const data = await fetch('/api/restapi/events', {
  method: 'GET',
  headers: {
    Authorization: 'Basic ' + btoa('Webclient:Yogi543'),
    'Content-Type': 'application/json',
  },
});
  const jsonData = await data.json();

  console.log(jsonData);
})
</script>

<style scoped></style>
