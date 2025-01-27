import { useLocalStorage, useSessionStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { useToast } from 'primevue/usetoast'
import { computed, ref } from 'vue'

import { checkAuthAction, loginAction } from '../actions'
import { AuthStatus, type User } from '../interfaces'

export const useAuthStore = defineStore('auth', () => {
  const toast = useToast()
  const authStatus = ref<AuthStatus>(AuthStatus.Checking)
  const user = ref<User | undefined>()
  const token = ref(useLocalStorage('token', ''))
  const sessionClosedNotified = ref(useSessionStorage('sessionClosedNotified', false))

  const login = async (username: string, password: string) => {
    try {
      const loginResp = await loginAction(username, password)

      if (!loginResp.ok) {
        logout(true)
        return false
      }

      user.value = loginResp.user
      token.value = loginResp.token
      authStatus.value = AuthStatus.Authenticated
      sessionClosedNotified.value = false

      return true
    } catch (error) {
      return logout(true)
    }
  }

  const logout = (closedManually = false): boolean => {
    localStorage.removeItem('token')

    authStatus.value = AuthStatus.Unauthenticated
    user.value = undefined
    token.value = ''

    if (!closedManually && !sessionClosedNotified.value) {
      toast.add({
        severity: 'error',
        summary: 'No Autorizado',
        detail: 'La sesión ha expirado, por favor inicie sesión nuevamente',
        life: 5000
      })
      sessionClosedNotified.value = true
    }

    return false
  }

  const checkAuthStatus = async (): Promise<boolean> => {
    try {
      const statusResp = await checkAuthAction()

      if (!statusResp.ok) {
        logout()
        return false
      }

      authStatus.value = AuthStatus.Authenticated
      user.value = statusResp.user
      token.value = statusResp.token
      sessionClosedNotified.value = false
      return true
    } catch (error) {
      logout()
      return false
    }
  }

  return {
    user,
    token,
    authStatus,

    // Getters
    isChecking: computed(() => authStatus.value === AuthStatus.Checking),
    isAuthenticated: computed(() => authStatus.value === AuthStatus.Authenticated),
    //! Replace this with your own logic
    isAdmin: computed(() => user.value?.roles.some((role) => role.name === 'Name') ?? false),
    username: computed(() => user.value?.username),
    userRoles: computed(() => user.value?.roles),

    // Actions
    login,
    logout,
    checkAuthStatus
  }
})
