<script setup>
import { useAuthStore } from '../stores/authStore'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import InputText from '@/components/forms/InputText.vue'
import ErrorMessage from '@/components/forms/ErrorMessage.vue'

const authStore = useAuthStore()

const { handleSubmit } = useForm({
  validationSchema: yup.object({
    name: yup.string().required(),
    userName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
    passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
  })
})

const onSubmit = handleSubmit(async values => {
  await authStore.registerUser(values.name, values.userName, values.email, values.password)
})
</script>

<template>
  <h1 class="mb-4">Register</h1>
  <form @submit.prevent="onSubmit">
    <div class="mb-6">
      <InputText name="name" placeholder="Name" label="Name" />
    </div>

    <div class="mb-6">
      <InputText name="userName" placeholder="Display name" label="Display name" />
    </div>

    <div class="mb-6">
      <InputText name="email" placeholder="Email address" label="Email address" />
      <ErrorMessage :errorMessage="authStore.registerError" />
    </div>

    <div class="mb-8">
      <InputText name="password" type="password" placeholder="Password" label="Password" />
    </div>

    <div class="mb-8">
      <InputText
        name="passwordConfirm"
        type="password"
        placeholder="Confirm password"
        label="Confirm password"
      />
    </div>

    <div class="flex justify-between">
      <button type="submit" :disabled="authStore.loadingUser" class="btn btn-primary">
        Create Account
      </button>
      <button type="reset" class="btn btn-outline-primary">Reset</button>
    </div>
  </form>
</template>

<style></style>
