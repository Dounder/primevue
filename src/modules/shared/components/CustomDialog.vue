<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  title: string
}

defineProps<Props>()
const visible = ref(false)
</script>

<template>
  <Dialog v-model:visible="visible" modal :header="title">
    <slot />
  </Dialog>
</template>

<style scoped></style>
