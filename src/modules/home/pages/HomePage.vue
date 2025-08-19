<script setup lang="ts">
import { useTheme } from '@/common'

const { toggle } = useTheme()
</script>

<template>
  <section class="max-w-5xl h-screen m-auto flex flex-col justify-center items-center gap-4">
    <h1 class="text-3xl font-bold underline">App</h1>

    <Card class="w-xl">
      <template #header>
        <img
          alt="user header"
          src="https://primefaces.org/cdn/primevue/images/usercard.png"
          class="w-full object-cover"
        />
      </template>
      <template #title>Advanced Card</template>
      <template #content>
        <p class="m-0">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error
          repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa
          ratione quam perferendis esse, cupiditate neque quas!
        </p>
      </template>
      <template #footer>
        <div class="flex gap-4 mt-1">
          <Button label="Toggle theme" class="w-full" @click="toggle" />
        </div>
      </template>
    </Card>
  </section>
</template>

<style scoped></style>
