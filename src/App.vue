<template>
  <NavBar />

  <router-view></router-view>
</template>

<script setup>
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
</script>

<style scoped>
.user-data {
  display: flex;
  justify-content: center;
}
</style>
