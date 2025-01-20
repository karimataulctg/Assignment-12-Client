import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useAdmin = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: isAdmin, error } = useQuery({
    queryKey: ['isAdmin', user?.email],
    queryFn: async () => {
      if (!user?.email) return false; // Prevent request if no user
      try {
        const res = await axiosSecure.get(`/users/admin/${user.email}`);
        return res.data?.admin || false;
      } catch (err) {
        console.error('Error fetching admin status:', err);
        return false;
      }
    },
    enabled: !!user?.email, // Only run query if email exists
  });

  return [isAdmin, error];
};

export default useAdmin;
