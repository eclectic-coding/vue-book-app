<template>
  <main class="mx-auto p-4 sm:p-0 w-full sm:w-2/3 md:w-1/4">
    <h1 class="mb-4">Login</h1>
    <form @submit.prevent="handleSubmit">
      <div class="mb-6">
        <label for="email" class="form-label">Email address</label>
        <input type="email" placeholder="Email address" v-model.trim="email" class="form-control" />
      </div>

      <div class="mb-8">
        <label for="password" class="form-label">Password</label>
        <input
          type="password"
          placeholder="Password"
          v-model.trim="password"
          class="form-control"
        />
      </div>
      <button type="submit" :disabled="authStore.loadingUser" class="btn btn-primary">Login</button>
    </form>
  </main>
</template>

<script setup>
import {ref} from 'vue'
import {useAuthStore} from '../stores/authStore'

const authStore = useAuthStore()

const email = ref(null)
const password = ref('')

const handleSubmit = async () => {
  await authStore.loginUser(email.value, password.value)
}
</script>

<style></style>
