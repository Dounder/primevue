<script setup lang="ts">
import CustomButton from '@/modules/shared/components/CustomButton.vue'
import CustomCard from '@/modules/shared/components/CustomCard.vue'
import CustomSpinner from '@/modules/shared/components/CustomSpinner.vue'
import CustomInputPassword from '@shared/components/CustomInputPassword.vue'
import CustomInputText from '@shared/components/CustomInputText.vue'
import { useLogin } from '../composables/useLogin'

const { onSubmit, form, error, errors, loading } = useLogin()
</script>

<template>
  <div class="max-w-[30rem] h-full mx-auto flex items-center flex-col justify-center">
    <h1 class="font-bold text-center text-2xl mb-5">Logo</h1>
    <CustomCard class="w-full relative">
      <h4 class="text-center text-2xl mb-6">Sign in</h4>
      <form @submit="onSubmit" class="flex flex-col gap-6" v-focustrap>
        <CustomInputText
          id="username"
          label="Username"
          v-model="form.username"
          v-bind="form.usernameAttrs"
          :error="errors.username"
          autofocus
        />
        <CustomInputPassword
          id="password"
          label="Password"
          v-model="form.password"
          v-bind="form.passwordAttrs"
          :error="errors.password"
        />
        <CustomButton type="submit" label="Sign in" class="mt-4" fluid />
        <transition name="p-message" tag="div" class="flex flex-col">
          <Message v-if="error" severity="error">{{ error }}</Message>
        </transition>
      </form>
      <div
        v-if="loading"
        class="absolute inset-0 z-50 flex items-center justify-center bg-black/50"
      >
        <CustomSpinner />
      </div>
    </CustomCard>
  </div>
</template>
