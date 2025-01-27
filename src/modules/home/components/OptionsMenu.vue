<script setup lang="ts">
import { PrimeIcons as icons } from '@primevue/core/api'
import type { MenuMethods } from 'primevue/menu'
import type { MenuItem } from 'primevue/menuitem'
import { ref } from 'vue'

import { useAuthStore } from '@/modules/auth/store/auth.store'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const menu = ref<MenuMethods | null>(null)
const toggle = (evt: MouseEvent) => menu.value?.toggle(evt)

const items = ref<MenuItem[]>([
  { separator: true },
  {
    label: 'Sign out',
    icon: icons.SIGN_OUT,
    command: () => authStore.logout(true)
  }
])
</script>

<template>
  <Button :icon="icons.COG" @click="toggle" text plain />
  <Menu ref="menu" id="overlay_menu" :model="items" :popup="true">
    <template #start>
      <div class="tile">
        <span class="font-bold">{{ user?.username }}</span>
        <span class="text-sm">{{ user?.roles.map((role) => role.name).join(', ') }}</span>
      </div>
    </template>
    <template #item="{ item, props }">
      <router-link
        v-if="item.route"
        v-ripple
        class="flex items-center"
        v-bind="props.action"
        :to="item.route"
      >
        <span :class="item.icon" />
        <span>{{ item.label }}</span>
        <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
        <span
          v-if="item.shortcut"
          class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1"
          >{{ item.shortcut }}</span
        >
      </router-link>
      <a v-ripple class="flex items-center" v-bind="props.action" v-else>
        <span :class="item.icon" />
        <span>{{ item.label }}</span>
        <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
        <span
          v-if="item.shortcut"
          class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1"
          >{{ item.shortcut }}</span
        >
      </a>
    </template>
  </Menu>
</template>

<style scoped>
.tile {
  @apply relative overflow-hidden w-full border-0 bg-transparent flex flex-col items-start justify-between p-4 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-none cursor-pointer transition-colors duration-200;
}
</style>
