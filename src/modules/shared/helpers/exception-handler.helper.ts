import axios from 'axios'

/**
 * Handles different types of errors and provides standardized error logging and throwing.
 *
 * @param error - The error to be handled. Can be an Axios error, standard Error, or unknown type
 * @param context - A string describing where the error occurred for better error tracking
 * @throws {Error}
 * - For Axios errors: includes status code, response message and context
 * - For standard Errors: includes error message and context
 * - For unknown errors: includes context only
 *
 * @remarks
 * This helper standardizes error handling across the application by:
 * - Detecting and handling Axios errors specifically
 * - Processing standard Error instances
 * - Catching any other unknown error types
 * - Providing consistent error logging
 * - Converting all error types into standard Error instances
 *
 * @returns never - Function always throws an error
 */
export const exceptionHandler = (error: unknown, context: string): never => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status
    const msg = error.response?.data?.message || error.message
    console.error(`Error de Axios en ${context}:`, {
      status,
      message: msg,
      data: error.response?.data
    })
    throw new Error(`Error en ${context}: ${msg} (Estado: ${status})`)
  }

  if (error instanceof Error) {
    console.error(`Error inesperado en ${context}:`, error.message)
    throw new Error(`Error inesperado en ${context}: ${error.message}`)
  }

  console.error(`Error desconocido en ${context}:`, error)
  throw new Error(`Error desconocido en ${context}`)
}
