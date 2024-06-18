<script setup>
import { defineProps } from 'vue'

defineProps(['user'])
</script>
<template>
  <div>edit {{ user }}</div>
</template>
