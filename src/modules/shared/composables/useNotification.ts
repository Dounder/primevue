import type { ToastMessageOptions } from 'primevue/toast'
import { useToast } from 'primevue/usetoast'

type Severity = 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast' | undefined

export const useNotification = () => {
  const toast = useToast()

  // Default messages for each severity level
  const defaultMessages: Record<string, Partial<ToastMessageOptions>> = {
    success: { summary: 'Success', detail: 'Operation completed successfully', life: 1000 },
    info: { summary: 'Information', detail: 'Here is some information', life: 1000 },
    warn: { summary: 'Warning', detail: 'Please be careful', life: 2000 },
    error: { summary: 'Error', detail: 'An error has occurred', life: 3000 },
    secondary: { summary: 'Note', detail: 'Additional information', life: 1000 },
    contrast: { summary: 'Notice', detail: 'Important message', life: 1000 }
  }

  const showNotification = (
    severity: keyof typeof defaultMessages,
    options: Partial<ToastMessageOptions> = {}
  ) => {
    const messageOptions = {
      ...defaultMessages[severity],
      ...options,
      severity: severity as Severity
    }

    toast.add(messageOptions)
  }

  return {
    showSuccess: (options?: Partial<ToastMessageOptions>) => showNotification('success', options),
    showInfo: (options?: Partial<ToastMessageOptions>) => showNotification('info', options),
    showWarn: (options?: Partial<ToastMessageOptions>) => showNotification('warn', options),
    showError: (options?: Partial<ToastMessageOptions>) => showNotification('error', options),
    showSecondary: (options?: Partial<ToastMessageOptions>) =>
      showNotification('secondary', options),
    showContrast: (options?: Partial<ToastMessageOptions>) => showNotification('contrast', options)
  }
}
