<script setup lang="ts">
import { useAuthStore } from '@/modules/auth/store/auth.store'

const authStore = useAuthStore()
</script>

<template>
  <h1 className="text-center text-3xl font-bold underline">Welcome {{ authStore.username }}</h1>
  <div class="grid grid-cols-10 gap-4 p-4">
    <div
      v-for="n in 1000"
      :key="n"
      class="border border-gray-300 p-4 rounded-md shadow-sm flex items-center justify-center"
    >
      {{ n }}
    </div>
  </div>
</template>
