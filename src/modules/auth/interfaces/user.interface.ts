export interface User {
  id: string
  username: string
  email: string
  roles: Role[]
  createdAt: Date
  updatedAt: Date
  deletedAt: null | Date
  createdBy: null | User
}

export interface Role {
  id: string
  name: string
}
