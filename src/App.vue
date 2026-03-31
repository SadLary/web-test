<template>
  <h1>You did it!</h1>
  <p>
    Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
    documentation
  </p>
</template>
<script setup>
import { onMounted } from 'vue'

const username = 'Webclient';
const password = 'Yogi543';


onMounted(async () => {


  const data = await fetch('/api/restapi/events', {
  method: 'GET',
  headers: {
    Authorization: 'Basic ' + btoa('Webclient:Yogi543'),
    'Content-Type': 'application/json',
  },
});
  console.log(data.json());
})
</script>

<style scoped></style>
