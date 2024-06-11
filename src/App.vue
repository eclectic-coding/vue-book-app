<template>
  <div style="margin: 0 0 2rem 0">
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/register" v-if="!authStore.userData">Register</RouterLink>
      <RouterLink to="/signin" v-if="!authStore.userData">Sign In</RouterLink>
      <RouterLink to="/dashboard" v-if="authStore.userData">Dashboard</RouterLink>
      <a href="#" v-if="authStore.userData" @click="logout">Log out</a>
    </nav>
    <p class="user-data">{{ authStore.userData?.email }}</p>
  </div>

  <router-view></router-view>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from './stores/authStore'

const authStore = useAuthStore()

const logout = async() => {
  await authStore.logoutUser()
}
</script>

<style scoped>
nav {
  display: flex;
  justify-content: center;

  a {
    text-decoration: none;
    padding: 0.5rem;
  }
}

.user-data {
  display: flex;
  justify-content: center;
}
</style>
