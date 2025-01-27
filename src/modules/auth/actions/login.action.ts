import { isAxiosError } from 'axios'
import type { AuthResponse, LoginError, LoginSuccess } from '../interfaces'
import { api } from '@/api/api'
import { exceptionHandler } from '@/modules/shared'

export const loginAction = async (
  username: string,
  password: string
): Promise<LoginSuccess | LoginError> => {
  try {
    const { data } = await api.post<AuthResponse>('/auth/login', { username, password })

    return { ok: true, message: 'ok', user: data.user, token: data.token }
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401)
      return { ok: false, message: 'Credentials are invalid' }

    throw exceptionHandler(error, loginAction.name)
  }
}
