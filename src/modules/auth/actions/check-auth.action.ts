import axios from 'axios'

import { api } from '@/api/api'
import { exceptionHandler } from '@/modules/shared'
import type { AuthResponse } from '../interfaces'

interface CheckError {
  ok: false
  message: string
}

interface CheckSuccess {
  ok: true
  user: AuthResponse['user']
  token: string
}

type CheckAuthResult = CheckError | CheckSuccess

const ErrorMessages = {
  INVALID_TOKEN: 'Invalid token or token not found',
  SESSION_VERIFICATION_FAILED: 'The session could not be verified',
  UNEXPECTED_ERROR: 'An unexpected error occurred'
}

const validateToken = (token: string | null): boolean => {
  return !!token && token.length >= 10
}

export const checkAuthAction = async (): Promise<CheckAuthResult> => {
  const context = checkAuthAction.name
  const localToken = localStorage.getItem('token')

  if (!validateToken(localToken)) return { ok: false, message: ErrorMessages.INVALID_TOKEN }

  try {
    const { data } = await api.post<AuthResponse>('/auth/verify')
    return { ok: true, user: data.user, token: data.token }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401)
      return { ok: false, message: ErrorMessages.SESSION_VERIFICATION_FAILED }

    throw exceptionHandler(error, context)
  }
}
