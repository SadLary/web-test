<template>
  <div
    class="select"
    :class="{ 'select--open': isOpen, 'select--disabled': disabled }"
    ref="rootRef"
  >
    <div class="select__trigger" @click="toggle">
      <div class="select__texts">
        <span class="select__label">{{ label }}</span>
        <span class="select__value">{{ displayValue }}</span>
      </div>
      <!-- можно было нарисовать этот элемент при помощи ::before и свойства border, просто захотелось сделать через svg -->
      <svg class="select__arrow" width="9" height="5" viewBox="0 0 9 5" fill="none">
        <path d="M1 1L4.5 4L8 1" stroke="#95e3facc" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>

    <Transition name="select-dropdown">
      <div class="select__dropdown" v-if="isOpen">
        <div
          v-for="option in options"
          :key="String(option.value)"
          class="select__option"
          :class="{ 'select__option--selected': option.value === modelValue }"
          @click="select(option)"
        >
          {{ option.label }}
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface Option {
  label: string
  value: string | number
}

const props = defineProps<{
  modelValue: string | number
  options: Option[]
  label: string
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number ): void
}>()

const isOpen = ref(false)
const rootRef = ref<HTMLElement | null>(null)

const displayValue = computed(() => {
  return props.options.find(option => option.value === props.modelValue)?.label
})

function toggle() {
  if (props.disabled) return
  isOpen.value = !isOpen.value
}

function select(option: Option) {
  emit('update:modelValue', option.value)
  isOpen.value = false
}

function onClickOutside(e: MouseEvent) {
  if (!rootRef.value?.contains(e.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => document.addEventListener('mousedown', onClickOutside))
onUnmounted(() => document.removeEventListener('mousedown', onClickOutside))
</script>

<style scoped>
.select {
  position: relative;
  display: inline-block;
  min-width: 130px;
  font-family: sans-serif;
  user-select: none;
}

.select__trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 6px 10px;
  background: #00495a;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.12s;
}

.select__trigger:hover {
  background: #00495a;
}

.select--open .select__trigger {
  background: #00495a;
  border-radius: 4px 4px 0 0;
}

.select--disabled .select__trigger {
  opacity: 0.45;
  cursor: not-allowed;
}

.select__texts {
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-width: 0;
}

.select__label {
  font-size: 10px;
  color: #95e3facc;
  line-height: 1.2;
  white-space: nowrap;
}

.select__value {
  font-size: 15px;
  color: #d0d5e0;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.select__arrow {
  flex-shrink: 0;
  margin-top: 2px;
  transition: transform 0.18s ease;
}

.select--open .select__arrow {
  transform: rotate(180deg);
}

.select__dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 100;
  background: #00495a;
  border-radius: 0 0 4px 4px;
  overflow: hidden;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.45);
}

.select__option {
  padding: 8px 10px;
  font-size: 14px;
  color: #c4c9d4;
  cursor: pointer;
  transition: background 0.1s;
  white-space: nowrap;
}

.select__option:hover {
  background: #063541;
}

.select__option--selected {
  background: #063541;
  color: #fff;
}

.select-dropdown-enter-active,
.select-dropdown-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.select-dropdown-enter-from,
.select-dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
