<script setup lang="ts">
import { PrimeIcons as icons } from '@primevue/core/api'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

import { usePaginationStore } from '../stores'
import { useConfigStore } from '../stores/config.store'
import CustomButton from './CustomButton.vue'

const paginationStore = usePaginationStore()
const { page, lastPage } = storeToRefs(paginationStore)
const configStore = useConfigStore()
const { isMobile } = storeToRefs(configStore)

const visiblePages = computed(() => {
  const visible = []
  const startPage = Math.max(1, page.value - 2)
  const endPage = Math.min(lastPage.value, page.value + 2)

  for (let i = startPage; i <= endPage; i++) visible.push(i)

  return visible
})
</script>

<template>
  <article class="flex justify-center items-center gap-2" v-if="lastPage > 1">
    <CustomButton
      text
      :icon="icons.ANGLE_DOUBLE_LEFT"
      :disabled="page === 1"
      @click="$router.push({ query: { page: 1 } })"
    />

    <CustomButton
      text
      :icon="icons.ANGLE_LEFT"
      :disabled="page === 1"
      @click="$router.push({ query: { page: page - 1 } })"
    />

    <span v-if="isMobile" class="mx-4 dark:text-muted-color">{{ page }} de {{ lastPage }}</span>

    <Button
      v-else
      v-for="p in visiblePages"
      :key="p"
      :text="page !== p"
      class="w-10"
      @click="$router.push({ query: { page: p } })"
      :label="p.toString()"
    />

    <CustomButton
      text
      :icon="icons.ANGLE_RIGHT"
      :disabled="page === lastPage"
      @click="$router.push({ query: { page: page + 1 } })"
    />
    <CustomButton
      text
      :icon="icons.ANGLE_DOUBLE_RIGHT"
      :disabled="page === lastPage"
      @click="$router.push({ query: { page: lastPage } })"
    />
  </article>
</template>
