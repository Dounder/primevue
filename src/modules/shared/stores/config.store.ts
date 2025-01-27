import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

type Theme = 'light' | 'dark'
export type Lang = 'en' | 'es'

export const useConfigStore = defineStore('config', () => {
  const theme = ref(useLocalStorage<Theme | null>('theme', null))
  const selectedLang = ref(useLocalStorage<Lang>('lang', 'es'))
  const setAppTheme = () => {
    const element = document.querySelector('html')
    element?.classList.remove('dark')

    //? check system theme preference if no theme is set
    if (!theme.value) {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

      theme.value = systemPrefersDark ? 'dark' : 'light'
    }

    if (theme.value === 'dark') element?.classList.add('dark')
  }

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'

    setAppTheme()
  }

  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme

    setAppTheme()
  }

  const setLang = (lang: 'en' | 'es') => {
    selectedLang.value = lang
  }

  return {
    //? Props
    selectedLang,

    //* Getters
    darkTheme: computed(() => theme.value === 'dark'),
    isMobile: computed(() => {
      const isMobile = ref(window.innerWidth < 768)
      window.addEventListener('resize', () => {
        isMobile.value = window.innerWidth < 768
      })
      return isMobile.value
    }),

    //! Actions
    setAppTheme,
    toggleTheme,
    setTheme,
    setLang
  }
})
