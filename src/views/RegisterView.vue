<template>
  <main class="register">
    <h1>Register</h1>
    <form @submit.prevent="handleSubmit">
      <input type="email" placeholder="Email address" v-model.trim="email">
      <input type="password" placeholder="Password" v-model.trim="password">
      <button type="submit" :disabled="authStore.loadingUser" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Create Account</button>
    </form>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from "../stores/authStore"

const authStore = useAuthStore()

const email = ref(null)
const password = ref('')

const handleSubmit = async() => {
  await authStore.registerUser(email.value, password.value)
}

</script>

<style>
.register {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;

  input {
    display: flex;
    margin: 1rem 0;
  }
}
</style>
