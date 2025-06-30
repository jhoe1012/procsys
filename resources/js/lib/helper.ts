import { AuthUser } from '@/types';

/** Determine if the user  has the given permission. */
export function can(user: AuthUser, permission: string): boolean {
  return user.permissions.includes(permission);
}

/** Determine if the user has the given role  */ 
export function hasRole(user: AuthUser, role: string): boolean {
  return user.roles.includes(role);
}

/** Determine if the user has any of the given permission.  */ 
export function canAny(user: AuthUser, permissions: string[]): boolean {
  return permissions.some(permission => user.permissions.includes(permission));
}