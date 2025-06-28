import { useEffect, useState } from "react";
import useAxios from "../../../Hooks/useAxios";
import toast from "react-hot-toast";
import SectionHead from "../../../components/ui/SectionHead";
import Input from "../../../components/ui/Input";
import { CircularButton } from "../../../components/ui/Button";

const UserManage = () => {
  const axios = useAxios();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page,
        limit,
        search,
      }).toString();
      const res = await axios.get(`/auth/users?${params}`);
      setUsers(res.data.data);
      setTotal(res.data.total);
    } catch (err) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, [page, search]);

  return (
    <div className="py-8 px-4 mx-auto">
       
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 mt-8">
        <Input
          name="search"
          id="user_search"
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full sm:w-80"
        />
        <div className="flex gap-2 mt-2 sm:mt-0">
          <CircularButton
            size="2.5rem"
            bg_color="primary"
            text_color="white"
            onClick={() => setPage(1)}
            title="Search"
          >
            <svg className="w-4 h-4" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.2824 13.833L13.1666 10.7177C13.0259 10.5771 12.8353 10.499 12.6353 10.499H12.1259C12.9884 9.39596 13.501 8.00859 13.501 6.49937C13.501 2.90909 10.5914 0 7.00048 0C3.40959 0 0.5 2.90909 0.5 6.49937C0.5 10.0896 3.40959 12.9987 7.00048 12.9987C8.50996 12.9987 9.89756 12.4863 11.0008 11.6239V12.1332C11.0008 12.3332 11.0789 12.5238 11.2195 12.6644L14.3354 15.7797C14.6292 16.0734 15.1042 16.0734 15.3948 15.7797L16.2793 14.8954C16.5731 14.6017 16.5731 14.1267 16.2824 13.833ZM7.00048 10.499C4.79094 10.499 3.00018 8.71165 3.00018 6.49937C3.00018 4.29021 4.78781 2.49976 7.00048 2.49976C9.21001 2.49976 11.0008 4.28708 11.0008 6.49937C11.0008 8.70852 9.21314 10.499 7.00048 10.499Z" fill="#fff" />
            </svg>
          </CircularButton>
        </div>
      </div>
      <div className="overflow-x-auto rounded-2xl shadow bg-white">
        <table className="min-w-full divide-y divide-neutral-default">
          <thead className="bg-neutral-subtle">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-neutral-caption uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-neutral-caption uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-neutral-caption uppercase tracking-wider">Created At</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-neutral-caption uppercase tracking-wider">Total Order Amount</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-neutral-default">
            {loading ? (
              <tr>
                <td colSpan={4} className="text-center py-8 text-lg text-neutral-caption">Loading...</td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-8 text-lg text-neutral-caption">No users found.</td>
              </tr>
            ) : (
              users.map(user => (
                <tr key={user._id} className="hover:bg-neutral-subtle transition">
                  <td className="px-6 py-4 whitespace-nowrap font-semibold text-text-body">{user.fullName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-neutral-caption">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-neutral-caption">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-primary font-bold">${user.totalOrderAmount}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-8 flex flex-wrap gap-2 justify-center">
        {[...Array(Math.ceil(total / limit))].map((_, idx) => (
          <button
            key={idx}
            className={`px-4 py-2 rounded-lg border text-sm font-semibold transition-all duration-200 ${page === idx + 1 ? "bg-primary text-white border-primary" : "bg-white text-primary border-neutral-default hover:bg-primary/10"}`}
            onClick={() => setPage(idx + 1)}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserManage;