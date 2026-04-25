import { useAuthStore } from '@/context/authContext';

export const usePermissions = () => {
  const permissions = useAuthStore((state) => state.permissions);

  const can = (action: string, subject: string) => {
    const permission = `${action}_${subject}`;
    return permissions.includes(permission);
  };

  const hasPermission = (permission: string) => {
    return permissions.includes(permission);
  };

  return { can, hasPermission, permissions };
};
