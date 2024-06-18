<script setup>
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/authStore.js'
import slugify from '@/utils/slugify.js'

const authStore = useAuthStore()

const logout = async () => {
  await authStore.logoutUser()
}
</script>

<template>
  <nav
    class="start-0 top-0 mb-8 w-full border-b border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-900"
  >
    <div class="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
      <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <span class="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
          Reading App
        </span>
      </a>
      <div class="flex space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
        <button
          data-collapse-toggle="navbar-sticky"
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
          aria-controls="navbar-sticky"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="h-5 w-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>
      <div
        class="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto"
        id="navbar-sticky"
      >
        <ul
          class="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900 rtl:space-x-reverse"
        >
          <li>
            <RouterLink :to="{ name: 'home' }" class="nav-link" aria-current="page">
              Home
            </RouterLink>
          </li>
          <li v-if="!authStore.userData">
            <RouterLink :to="{ name: 'register' }" class="nav-link">Register</RouterLink>
          </li>
          <li v-if="!authStore.userData">
            <RouterLink :to="{ name: 'signin' }" class="nav-link">Sign In</RouterLink>
          </li>
          <li v-if="authStore.userData">
            <RouterLink
              :to="{ name: 'DashboardDetails', params: { id: slugify(authStore.userData.name) } }"
              class="nav-link"
            >
              Dashboard
            </RouterLink>
          </li>
          <li v-if="authStore.userData">
            <a href="#" @click="logout" class="nav-link">Log out</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
