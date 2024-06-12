<template>
  <main class="mx-auto p-4 sm:p-0 w-full sm:w-2/3 md:w-1/4">
    <h1 class="mb-4">Register</h1>
    <form @submit.prevent="handleSubmit">
      <div class="mb-6">
        <label for="email">Email address</label>
        <input type="email" placeholder="Email address" v-model.trim="email" class="form-control" />
      </div>

      <div class="mb-8">
        <label for="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          v-model.trim="password"
          class="form-control"
        />
      </div>

      <div class="flex justify-between">
        <button type="submit" :disabled="authStore.loadingUser" class="btn btn-primary">
          Create Account
        </button>
        <button type="reset" class="btn btn-outline-primary">Reset</button>
      </div>
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
  await authStore.registerUser(email.value, password.value)
}
</script>

<style></style>
