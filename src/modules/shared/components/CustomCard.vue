<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

interface Props {
  deleted?: boolean
  bodyClass?: HTMLAttributes['class']
}

withDefaults(defineProps<Props>(), { bodyClass: '', deleted: false })
</script>

<template>
  <Card
    :class="[
      'dark:bg-dark-950 border',
      { 'dark:border-gray-700 border-primary-400': !deleted },
      { 'border-red-500': deleted }
    ]"
  >
    <template #content>
      <div :class="bodyClass">
        <slot />
      </div>
    </template>
  </Card>
</template>
