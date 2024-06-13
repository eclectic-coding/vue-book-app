<template>
  <main class="mx-auto w-full p-4 sm:w-2/3 sm:p-0 md:w-1/4">
    <h1 class="mb-4">Login</h1>
    <ErrorMessage :errorMessage="authStore.loginError" />
    <form @submit.prevent="onSubmit">
      <div class="mb-6">
        <InputText name="email" placeholder="Email address" label="Email address" />
      </div>

      <div class="mb-8">
        <InputText name="password" type="password" placeholder="Password" label="Password" />
      </div>
      <button type="submit" :disabled="authStore.loadingUser" class="btn btn-primary">Login</button>
    </form>

    <div class="mt-8">
      <p>Forgot password?</p>
      <button
        @click="showRestPassword = !showRestPassword"
        v-if="!showRestPassword"
        class="btn btn-outline-primary my-3"
      >
        Click to reset
      </button>
      <form v-if="showRestPassword" @submit.prevent="resetPassword" class="my-3">
        <div class="mb-2">
          <label for="resetEmail">Email address</label>
          <input
            type="email"
            required
            placeholder="name@example.com"
            name="resetEmail"
            v-model.trim="resetEmail"
            class="form-control required"
            id="resetEmail"
          />
        </div>
        <button type="submit" class="btn btn-primary">Reset password</button>
      </form>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import InputText from '@/components/forms/InputText.vue'
import ErrorMessage from '@/components/forms/ErrorMessage.vue'

const authStore = useAuthStore()

const showRestPassword = ref(false)
const resetEmail = ref('')

const { handleSubmit } = useForm({
  validationSchema: yup.object({
    email: yup.string().email().required(),
    password: yup.string().required()
  })
})

const onSubmit = handleSubmit(async values => {
  await authStore.loginUser(values.email, values.password)
})

const resetPassword = async () => {
  await authStore.resetPassword(resetEmail.value)
}
</script>

<style></style>
