export interface ApiListResponse<T> {
  meta: ApiListMeta
  data: T[]
}

interface ApiListMeta {
  total: number
  lastPage: number
}

export interface DeletionToggle {
  id: string
  isDeleted: boolean
}
