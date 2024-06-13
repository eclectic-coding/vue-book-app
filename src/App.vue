<script setup>
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import AppLayout from '@/layouts/AppLayout.vue'
</script>

<template>
  <AppLayout>
    <template v-slot:header>
      <NavBar />
    </template>
    <template v-slot:content>
      <Suspense>
        <RouterView />
        <template v-slot:fallback>
          <p>Content not found. Contact your developer for more info.</p>
        </template>
      </Suspense>
    </template>
  </AppLayout>
</template>

<style scoped>
.user-data {
  display: flex;
  justify-content: center;
}
</style>
