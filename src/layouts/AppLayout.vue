<script setup></script>

<template>
  <div>
    <slot name="header" />

    <main class="mx-auto w-full max-w-2xl p-4 sm:p-0">
      <slot name="content" />
    </main>
  </div>
</template>

<style scoped></style>
