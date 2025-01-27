<script setup lang="ts">
import { PrimeIcons as icons } from '@primevue/core/api'
import { ref, watch } from 'vue'

import { useConfigStore } from '@shared/stores/config.store'

const configStore = useConfigStore()
const isDarkTheme = ref(configStore.darkTheme)
const toggleBtn = ref<HTMLDivElement | null>(null)
const options = ref([
  { label: 'Light', value: false },
  { label: 'Dark', value: true }
])

const handleToggle = async () => {
  if (
    !toggleBtn.value ||
    !document.startViewTransition ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    configStore.toggleTheme()
    return
  }

  await document.startViewTransition(() => configStore.toggleTheme()).ready

  document.documentElement.animate(
    { opacity: [0, 1] },
    { duration: 300, easing: 'ease', pseudoElement: '::view-transition-new(root)' }
  )
}

watch(isDarkTheme, (val) => {
  if (!val) {
    isDarkTheme.value = false
    configStore.setTheme('light')
    return
  }

  handleToggle()
})
</script>

<template>
  <div class="flex flex-col gap-2">
    <label for="theme_switch">Theme</label>

    <SelectButton
      v-model="isDarkTheme"
      :options="options"
      option-label="label"
      option-value="value"
      id="theme_switch"
      size="large"
      class="h-full"
    >
      <template #option="{ option }">
        <i :class="option.value ? icons.MOON : icons.SUN"></i>
      </template>
    </SelectButton>
  </div>
</template>

<style scoped></style>
