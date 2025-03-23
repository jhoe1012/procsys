import { AuthUser } from '@/types';

export function can(user: AuthUser, permission: string): boolean {
  return user.permissions.includes(permission);
}

export function hasRole(user: AuthUser, role: string): boolean {
  return user.roles.includes(role);
}
