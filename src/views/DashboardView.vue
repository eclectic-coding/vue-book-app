<template>
  <main class="mx-auto w-full max-w-2xl p-4 sm:p-0">
    <h1 class="mb-4 text-3xl font-bold leading-tight text-gray-900 lg:mb-6 lg:text-4xl">
      Dashboard
    </h1>
    <p>{{ user }}</p>
  </main>
</template>

<script setup>
import {ref} from 'vue'
import {useAuthStore} from '../stores/authStore'

const authStore = useAuthStore()
const user = ref(authStore.userData)
</script>
