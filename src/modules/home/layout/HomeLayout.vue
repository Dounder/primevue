<script setup lang="ts">
import MainNavbar from '../components/MainNavbar.vue'
</script>

<template>
  <div class="flex w-screen h-screen">
    <div class="flex flex-col flex-grow min-h-0 min-w-0">
      <MainNavbar />

      <div class="flex-grow overflow-auto dark:bg-dark-800 min-w-0">
        <div class="max-w-[1700px] w-full mx-auto p-6">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>
