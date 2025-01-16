import { Role, User } from '../types/auth';

type Permission = 'read' | 'write' | 'delete' | 'approve';
type Resource = 'schools' | 'users' | 'reports' | 'support' | 'analytics';

const rolePermissions: Record<Role, Record<Resource, Permission[]>> = {
  NORMAL: {
    schools: ['read'],
    users: ['read'],
    reports: ['read'],
    support: ['read', 'write'],
    analytics: [],
  },
  SCHOOL_ADMIN: {
    schools: ['read', 'write'],
    users: ['read'],
    reports: ['read', 'write'],
    support: ['read', 'write'],
    analytics: ['read'],
  },
  SUPER_ADMIN: {
    schools: ['read', 'write', 'delete', 'approve'],
    users: ['read', 'write', 'delete', 'approve'],
    reports: ['read', 'write', 'delete'],
    support: ['read', 'write', 'delete'],
    analytics: ['read', 'write'],
  },
  POLICY_MAKER: {
    schools: ['read'],
    users: [],
    reports: ['read'],
    support: ['read'],
    analytics: ['read'],
  },
  SUPPORT_STAFF: {
    schools: ['read'],
    users: ['read'],
    reports: ['read'],
    support: ['read', 'write'],
    analytics: ['read'],
  },
  AUDITOR: {
    schools: ['read', 'approve'],
    users: ['read'],
    reports: ['read', 'write'],
    support: ['read'],
    analytics: ['read'],
  },
};

export function hasPermission(
  user: User | null,
  resource: Resource,
  permission: Permission
): boolean {
  if (!user) return false;
  return rolePermissions[user.role][resource].includes(permission);
}

export function withPermission(
  WrappedComponent: React.ComponentType<any>,
  resource: Resource,
  permission: Permission
) {
  return function PermissionWrapper(props: any) {
    const user = null; // TODO: Get user from auth context
    
    if (!hasPermission(user, resource, permission)) {
      return <div>Access Denied</div>;
    }
    
    return <WrappedComponent {...props} />;
  };
}