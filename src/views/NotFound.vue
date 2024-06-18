<script setup>
defineProps({
  resource: {
    type: String,
    required: true,
    default: 'page'
  }
})
</script>

<template>
  <div class="text-center">
    <h1 class="mb-3">Oops!</h1>
    <h3 class="mb-3">The {{ resource }} you're looking for is not here.</h3>
    <router-link :to="{ name: 'home' }">Go to home</router-link>
  </div>
</template>

<style scoped></style>
