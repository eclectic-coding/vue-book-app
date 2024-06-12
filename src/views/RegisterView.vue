<template>
  <main class="mx-auto w-full p-4 sm:w-2/3 sm:p-0 md:w-1/4">
    <h1 class="mb-4">Register</h1>
    <form @submit.prevent="handleSubmit">
      <div class="mb-6">
        <label for="name">Name</label>
        <input type="text" placeholder="Name" v-model.trim="name" class="form-control required" />
      </div>

      <div class="mb-6">
        <label for="email">Username</label>
        <input
          type="text"
          placeholder="Name"
          v-model.trim="username"
          class="form-control required"
        />
      </div>

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

const name = ref(null)
const username = ref(null)
const email = ref(null)
const password = ref('')

const handleSubmit = async () => {
  await authStore.registerUser(name.value, username.value, email.value, password.value)
}
</script>

<style></style>
