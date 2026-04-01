<template>
  <input
    class="input"
    :value="modelValue"
    :placeholder="placeholder"
    :type="type"
    @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
  <span v-if="$slots.icon" class="input__icon">
    <slot name="icon" />
  </span>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
  placeholder?: string
  type?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<style scoped>
.input {
  padding: 10px 14px;
  background: #00495a;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  color: #d0d5e0;
  outline: none;
  transition: background 0.12s;
}

.input::placeholder {
  color: #7eadb8;
  transition: 0.3s;
}

.input:focus::placeholder {
  color: transparent;
}
</style>