<template>
  <label :for="name" class="form-label">{{ label }}</label>
  <input
    v-model.trim="value"
    :type="type || 'text'"
    :placeholder="placeholder"
    class="form-control required"
  />
  <div v-if="errorMessage" class="mb-2 bg-red-50 p-2 text-sm text-red-800">
    <span class="font-medium">{{ errorMessage }}</span>
  </div>
</template>

<script setup>
import { useField } from 'vee-validate'

const props = defineProps({
  name: String,
  type: String,
  placeholder: String,
  label: String
})

const { value, errorMessage } = useField(props.name)
</script>

<style scoped></style>
