<script setup lang="ts">
import { useTheme } from '@/common'
import { UserMenu } from './'
import { cn } from '@/common/utils'

const { toggle, isDarkMode } = useTheme()
</script>

<template>
  <Toolbar>
    <template #start>
      <Button text icon="pi pi-bars" severity="contrast" aria-label="Menu" size="small" />
    </template>

    <template #end>
      <section class="flex items-center gap-2">
        <Button
          text
          :icon="cn('pi', isDarkMode ? 'pi-moon' : 'pi-sun')"
          size="small"
          severity="contrast"
          aria-label="Menu"
          @click="toggle"
        />
        <UserMenu />
      </section>
    </template>
  </Toolbar>
</template>
