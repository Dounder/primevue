import type { Role } from '@/modules/auth'
import { filterMenuItems } from '@/modules/shared'
import { PrimeIcons as icons } from '@primevue/core/api'

export const getMenuOptions = (userRoles: Role[]) => {
  const menuItems = [{ icon: icons.HOME, mobile: 'Home', route: { name: 'home' } }]

  return filterMenuItems(menuItems, userRoles)
}
