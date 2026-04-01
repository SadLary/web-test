<template>
  <div class="input-wrapper">
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
  </div>
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
.input-wrapper {
  position: relative;
  display: flex;
  width: 100%;
}
.input {
  width: 100%;
  min-height: 46px;
  padding: 10px 15px;
  background: #00495a;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  color: #d0d5e0;
  outline: none;
}

.input::placeholder {
  color: #7eadb8;
  transition: 0.3s;
}

.input:focus::placeholder {
  color: transparent;
}
.input__icon {
  position: absolute;
  top: 11px;
  right: 12px;
  pointer-events: none;
}
</style>