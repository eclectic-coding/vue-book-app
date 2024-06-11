<template>
  <main class="login">
    <h1>Login</h1>
    <form @submit.prevent="handleSubmit">
      <input type="email" placeholder="Email address" v-model.trim="email">
      <input type="password" placeholder="Password" v-model.trim="password">
      <button type="submit" :disabled="authStore.loadingUser">Login</button>
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
  await authStore.loginUser(email.value, password.value)
}

</script>

<style>
.login {
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
