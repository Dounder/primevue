import type { MenuItem } from 'primevue/menuitem'

import type { Role } from '@/modules/auth'
import { hasRoles } from '../helpers'

export const filterMenuItems = (items: MenuItem[], userRoles: Role[]) => {
  return items
    .filter((item) => hasRoles(userRoles, item.roles))
    .map((item) => {
      const newItem = { ...item }
      if (item.items) newItem.items = filterMenuItems(item.items, userRoles)
      return newItem
    })
}
