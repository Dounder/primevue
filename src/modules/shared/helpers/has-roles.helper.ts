import type { Role } from '@/modules/auth/interfaces'

//! Replace the following code with the actual implementation

/**
 * Checks if a user has any of the specified roles
 * @param userRoles - Array of Role objects representing the user's roles
 * @param validRolesIds - Array of role IDs to check against (defaults to empty array)
 * @returns {boolean} True if user has at least one of the valid roles or if no valid roles are specified
 */
export const hasRoles = (userRoles: Role[], validRolesIds: string[] = []) => {
  if (validRolesIds.length === 0) return true

  return userRoles.some((role) => validRolesIds.includes(role.id))
}
