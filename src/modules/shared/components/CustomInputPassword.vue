<script setup lang="ts">
interface Props {
  disabled?: boolean
  error?: string
  id: string
  label?: string
  modelValue?: string
  placeholder?: string
  loading?: boolean
  toggleMask?: boolean
  invalid?: boolean
  autofocus?: boolean
}
withDefaults(defineProps<Props>(), { toggleMask: true })
defineEmits(['update:modelValue', 'blur', 'change', 'input'])
</script>

<template>
  <article>
    <FloatLabel variant="in">
      <Password
        :id="id"
        :model-value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value || '')"
        @blur="$emit('blur')"
        :aria-describedby="`${id}-help`"
        :invalid="invalid || Boolean(error)"
        :placeholder="placeholder"
        fluid
        :disabled="disabled"
        :loading="loading"
        :feedback="false"
        :toggle-mask="toggleMask"
        :autofocus="autofocus"
      />
      <label v-if="label" :for="id">{{ label }}</label>
    </FloatLabel>
    <transition name="p-message" tag="div" class="flex flex-col mt-2">
      <Message v-if="error" severity="error">{{ error }}</Message>
    </transition>
  </article>
</template>

<style scoped>
.expand-enter-to,
.expand-leave-from {
  height: 1.5rem;
}
</style>
