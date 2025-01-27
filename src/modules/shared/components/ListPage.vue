<script setup lang="ts">
import { PrimeIcons as icons } from '@primevue/core/api'
import { storeToRefs } from 'pinia'

import { useConfigStore } from '../stores'
import CustomSpinner from './CustomSpinner.vue'

interface Props {
  title: string
  visible?: boolean
  canExport?: boolean
}

const props = withDefaults(defineProps<Props>(), { canExport: true })
defineEmits(['on:refresh', 'on:new', 'on:export', 'update:visible'])

const configStore = useConfigStore()
const { darkTheme, isMobile } = storeToRefs(configStore)
</script>

<template>
  <Toolbar class="dark:bg-dark-950 mb-3">
    <template #start>
      <h1 class="text-2xl capitalize">{{ title }}</h1>
    </template>

    <template #end>
      <section class="flex justify-end gap-2">
        <Button
          size="small"
          v-tooltip.top="!isMobile ? '' : 'New'"
          :label="!isMobile ? 'New' : ''"
          :icon="icons.PLUS"
          @click="$emit('on:new')"
          :text="darkTheme"
          :outlined="!darkTheme"
          :rounded="isMobile"
        />
        <Button
          size="small"
          v-tooltip.top="!isMobile ? '' : 'Refresh'"
          :label="!isMobile ? 'Refresh' : ''"
          :icon="icons.REFRESH"
          @click="$emit('on:refresh')"
          :text="darkTheme"
          :outlined="!darkTheme"
          :rounded="isMobile"
        />
        <Button
          size="small"
          v-tooltip.top="!isMobile ? '' : 'Export'"
          :label="!isMobile ? 'Export' : ''"
          :icon="icons.DOWNLOAD"
          @click="$emit('on:export')"
          :text="darkTheme"
          :outlined="!darkTheme"
          :rounded="isMobile"
          v-if="canExport"
        />
      </section>
    </template>
  </Toolbar>

  <slot />

  <!-- Use v-bind and v-on instead of v-model -->
  <Dialog
    :visible="props.visible"
    @update:visible="$emit('update:visible', $event)"
    modal
    :closable="false"
    class="w-1/2"
  >
    <div class="flex flex-col items-center gap-4 p-10">
      <span class="text-2xl">Exporting Data...</span>
      <CustomSpinner />
    </div>
  </Dialog>
</template>
