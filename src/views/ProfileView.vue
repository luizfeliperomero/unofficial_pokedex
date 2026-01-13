<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getEmail } from '@/services/userService'

const router = useRouter()
const email = ref<string>('')

onMounted(async () => {
  try {
    const response = await getEmail()
	email.value = response.data.email;
  } catch (err) {
    handleLogout()
  }
})

const handleLogout = () => {
  localStorage.clear()
  router.push('/auth')
}
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center
           bg-gray-50 dark:bg-[#1d1c1a]"
  >
    <div
      class="w-full max-w-sm rounded-xl p-6
             bg-white dark:bg-[#262523]
             border border-gray-200 dark:border-[#2f2e2c]
             shadow-sm"
    >
      <!-- Header -->
      <div class="text-center mb-6">
        <h1
          class="text-xl font-semibold
                 text-gray-800 dark:text-gray-100"
        >
          Profile
        </h1>
        <p
          class="text-sm
                 text-gray-500 dark:text-gray-400"
        >
          Trainer account
        </p>
      </div>

      <!-- Info -->
      <div class="space-y-4">
        <div>
          <label
            class="text-xs uppercase tracking-wide
                   text-gray-500 dark:text-gray-400"
          >
            Email
          </label>

          <p
            class="mt-1 font-medium break-all
                   text-gray-800 dark:text-gray-100"
          >
            {{ email || 'Loading…' }}
          </p>
        </div>
      </div>

      <!-- Actions -->
      <button
        @click="handleLogout"
        class="w-full mt-6 rounded-lg py-2 font-medium
               bg-red-500 hover:bg-red-600
               dark:bg-red-600 dark:hover:bg-red-700
               text-white transition-colors"
      >
        Log out
      </button>
    </div>
  </div>
</template>
