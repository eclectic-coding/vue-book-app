<template>
  <main class="mx-auto w-full p-4 sm:w-2/3 sm:p-0 md:w-1/4">
    <h1 class="mb-4">Login</h1>
    <form @submit.prevent="onSubmit">
      <div class="mb-6">
        <InputText name="email" placeholder="Email address" label="Email address" />
      </div>

      <div class="mb-8">
        <InputText name="password" type="password" placeholder="Password" label="Password" />
      </div>
      <button type="submit" :disabled="authStore.loadingUser" class="btn btn-primary">Login</button>
    </form>
  </main>
</template>

<script setup>
import { useAuthStore } from '../stores/authStore'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import InputText from '@/components/forms/InputText.vue'

const authStore = useAuthStore()

const { handleSubmit } = useForm({
  validationSchema: yup.object({
    email: yup.string().email().required(),
    password: yup.string().required()
  })
})

const onSubmit = handleSubmit(async values => {
  await authStore.loginUser(values.email, values.password)
})
</script>

<style></style>
