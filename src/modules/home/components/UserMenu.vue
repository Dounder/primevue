<script setup lang="ts">
import type { MenuMethods } from 'primevue/menu';
import { ref } from 'vue';
import { homeMenuItems } from '../data';

const menu = ref<MenuMethods | null>(null);

const toggle = (event: MouseEvent) => {
	console.log('Menu toggled', event);
	menu.value?.toggle(event);
};

defineExpose({ toggle });
</script>

<template>
  <Button
    text
    icon="pi pi-user"
    severity="contrast"
    aria-label="User"
    size="small"
    @click="menu?.toggle"
  />

  <Menu ref="menu" id="overlay_menu" :popup="true" :model="homeMenuItems">
    <template #submenuheader="{ item }">
      <span class="font-bold">{{ item.label }}</span>
    </template>
    <template #item="{ item, props }">
      <a v-ripple class="flex items-center" v-bind="props.action">
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
    <template #end>
      <Button text class="w-full" severity="contrast">
        <Avatar
          image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
          class="mr-2"
          shape="circle"
        />
        <span class="inline-flex flex-col items-start">
          <span class="font-bold">Amy Elsner</span>
          <span class="text-sm">Admin</span>
        </span>
      </Button>
    </template>
  </Menu>
</template>
