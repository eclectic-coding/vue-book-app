<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore.js'

const authStore = useAuthStore()
const user = ref(authStore.userData)
</script>

<template>
  <div v-if="user">
    <h1 class="mb-2 text-3xl font-bold leading-tight text-gray-900 lg:text-4xl">Dashboard</h1>
    <div class="mb-4" id="nav">
      <router-link
        :to="{ name: 'DashboardDetails' }"
        active-class=""
        exact-active-class="font-bold"
      >
        Dashboard
      </router-link>
      |
      <router-link :to="{ name: 'DashboardEdit' }" exact-active-class="font-bold">
        Edit Profile
      </router-link>
    </div>
    <router-view :user="user" />
  </div>
</template>
