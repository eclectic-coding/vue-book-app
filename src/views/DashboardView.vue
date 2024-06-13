<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/authStore'

const authStore = useAuthStore()
const user = ref(authStore.userData)
</script>

<template>
  <h1 class="mb-4 text-3xl font-bold leading-tight text-gray-900 lg:mb-6 lg:text-4xl">Dashboard</h1>
  <p>{{ user }}</p>
</template>
