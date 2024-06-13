<template>
  <div v-if="errorMessage" class="mb-2 bg-red-50 p-2 text-sm text-red-800">
    <span class="font-medium">{{ errorMessage }}</span>
  </div>
</template>

<script setup>
const props = defineProps({
  errorMessage: String
})
</script>
