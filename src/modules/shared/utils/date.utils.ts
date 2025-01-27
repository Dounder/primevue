import { formatRelative } from 'date-fns'
import { enUS, es } from 'date-fns/locale'

import { useConfigStore } from '../stores'

export class DateUtils {
  static convertDate(date: string | Date | null): string | null {
    if (!date) return null

    const configStore = useConfigStore()

    return formatRelative(new Date(date), new Date(), {
      locale: configStore.selectedLang === 'es' ? es : enUS
    })
  }

  static convertToMonthYear(date: string | Date | null): string | null {
    if (!date) return null

    return new Date(date).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })
  }
}
