<script setup lang="ts">
import { PrimeIcons as icons } from '@primevue/core/api'
import type { MenuMethods } from 'primevue'
import type { MenuItem } from 'primevue/menuitem'
import { ref, watch } from 'vue'
import { type RouteLocationRaw } from 'vue-router'

import CustomButton from './CustomButton.vue'
import CustomCard from './CustomCard.vue'
import CustomSpinner from './CustomSpinner.vue'

interface Props {
  loading: boolean
  backRoute?: RouteLocationRaw
  deleted: boolean
}
const props = defineProps<Props>()
const emits = defineEmits(['on:new', 'on:delete', 'on:refresh'])

const menu = ref<MenuMethods | null>(null)
const items = ref<MenuItem[]>([
  { label: 'New', icon: icons.PLUS, command: () => emits('on:new') },
  {
    label: props.deleted ? 'Restore' : 'Delete',
    icon: props.deleted ? icons.REFRESH : icons.TRASH,
    command: () => emits('on:delete')
  },
  { label: 'Refresh', icon: icons.SYNC, command: () => emits('on:refresh') }
])

watch(
  () => props.deleted,
  (deleted) => {
    items.value[1].label = deleted ? 'Restore' : 'Delete'
    items.value[1].icon = deleted ? icons.REFRESH : icons.TRASH
  }
)
</script>

<template>
  <CustomCard :deleted="deleted" class="relative">
    <!-- Header -->
    <section class="flex items-center mb-6">
      <section class="flex justify-start flex-1 items-center">
        <CustomButton
          :icon="icons.CHEVRON_LEFT"
          label="Return"
          @click="backRoute ? $router.push(backRoute) : $router.back()"
          :disabled="loading"
        />
      </section>

      <section>
        <CustomButton
          v-tooltip.top="'More Options'"
          :icon="icons.ELLIPSIS_V"
          aria-haspopup="true"
          aria-controls="detail_page_menu"
          @click="menu?.toggle($event)"
          :disabled="loading"
        />
        <Menu ref="menu" id="detail_page_menu" :model="items" :popup="true" />
      </section>
    </section>

    <slot />

    <!-- Overlay and Loader -->
    <div v-if="loading" class="absolute inset-0 z-50 flex items-center justify-center bg-black/50">
      <CustomSpinner />
    </div>
  </CustomCard>
</template>

<style scoped></style>
