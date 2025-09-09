import type { MenuItem } from 'primevue/menuitem'

export const homeMenuItems: MenuItem[] = [
  {
    label: 'Profile',
    items: [
      { label: 'Settings', icon: 'pi pi-cog' },
      { label: 'Messages', icon: 'pi pi-inbox' },
      { label: 'Logout', icon: 'pi pi-sign-out' },
    ],
  },
  {
    separator: true,
  },
]
