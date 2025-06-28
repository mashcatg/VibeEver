import { useState, useEffect } from "react";
import UserCard from "../../components/ui/UserCard";
import useAxios from "../../Hooks/useAxios";
import toast from "react-hot-toast";

const RecentUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const axios = useAxios();

  useEffect(() => {
    const fetchRecentUsers = async () => {
      try {
        const response = await axios.get('/auth/users?limit=6');
        setUsers(response.data.data);

        console.log(response.data.data);
      } catch (error) {
        toast.error('Failed to load recent users');
      } finally {
        setLoading(false);
      }
    };

    fetchRecentUsers();
  }, [axios]);

  if (loading) {
    return (
      <div className="py-4 px-4 sm:px-8 rounded-xl bg-neutral-subtle">
        <h5 className="text-text-body text-headline leading-headline">Recent Users</h5>
        <div className="mt-5 space-y-3">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex-1 h-20 bg-white/50 rounded-xl animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="py-4 px-4 sm:px-8 rounded-xl bg-neutral-subtle">
      <h5 className="text-text-body text-headline leading-headline">Recent Users</h5>

      <div className="mt-5 space-y-3">
        {users.map((user, index) => (
          <div key={user._id} className="flex gap-4">
            <UserCard
              className="bg-white w-full"
               
                 
              name={user.fullName}
              mail={user.email}
              image={user.image}
              
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentUsers;
