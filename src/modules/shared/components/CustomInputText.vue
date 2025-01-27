<script setup lang="ts">
interface Props {
  disabled?: boolean
  error?: string
  id: string
  label?: string
  modelValue?: string
  loading?: boolean
  invalid?: boolean
  autofocus?: boolean
}
defineProps<Props>()
defineEmits(['update:modelValue', 'blur', 'change', 'input'])
</script>

<template>
  <IftaLabel>
    <InputText
      :id="id"
      :model-value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value || '')"
      @blur="$emit('blur')"
      :invalid="invalid || Boolean(error)"
      :disabled="disabled"
      :loading="loading"
      :autofocus="autofocus"
      size="large"
      fluid
    />
    <label v-if="label" :for="id">{{ label }}</label>
    <transition name="p-message" tag="div" class="flex flex-col mt-2">
      <Message v-if="error" severity="error">{{ error }}</Message>
    </transition>
  </IftaLabel>
</template>

<style scoped>
.expand-enter-to,
.expand-leave-from {
  height: 1.5rem;
}
</style>
