import { useEffect, useState } from "react";
import {
  FaEnvelope,
  FaUser,
  FaCalendarAlt,
} from "react-icons/fa";
import useAxios from "../../../Hooks/useAxios";

const AdminMessages = () => {
  const axios = useAxios();
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("");

  // Fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get("/hello");
        setMessages(res.data);
        setFilteredMessages(res.data);
      } catch (err) {
        console.error("Error fetching messages:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, [axios]);

  // Filter + search
  useEffect(() => {
    let filtered = messages;

    if (searchTerm) {
      filtered = filtered.filter(
        (msg) =>
          msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          msg.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    const now = new Date();
    if (filterBy === "today") {
      filtered = filtered.filter((msg) => {
        const msgDate = new Date(msg.createdAt);
        return msgDate.toDateString() === now.toDateString();
      });
    } else if (filterBy === "week") {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter((msg) => new Date(msg.createdAt) >= weekAgo);
    } else if (filterBy === "month") {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter((msg) => new Date(msg.createdAt) >= monthAgo);
    }

    setFilteredMessages(filtered);
  }, [messages, searchTerm, filterBy]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mx-auto mb-3"></div>
          <p className="text-indigo-600">Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white p-5 mb-6 border rounded-lg shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                <FaEnvelope className="text-indigo-600" />
                Contact Messages
              </h1>
              <p className="text-gray-600 mt-1">
                Total:{" "}
                <span className="font-medium text-indigo-600">
                  {filteredMessages.length}
                </span>{" "}
                messages
              </p>
            </div>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-2 border rounded-md text-sm focus:ring-1 focus:ring-indigo-500"
              />
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="px-3 py-2 border rounded-md text-sm focus:ring-1 focus:ring-indigo-500"
              >
                <option value="">All</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
          {filteredMessages.length === 0 ? (
            <div className="text-center py-12">
              <FaEnvelope className="mx-auto text-5xl text-gray-300 mb-3" />
              <h3 className="text-lg font-medium text-gray-600">
                No messages found
              </h3>
              <p className="text-gray-500 text-sm">
                Try adjusting your search or filter
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-gray-700 border-b">
                      <FaUser className="inline mr-2 text-gray-500" />
                      Name
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700 border-b">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700 border-b">
                      Message
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700 border-b">
                      <FaCalendarAlt className="inline mr-2 text-gray-500" />
                      Date
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700 border-b">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredMessages.map((msg) => (
                    <tr
                      key={msg._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3 text-gray-700 font-medium">
                        {msg.name}
                      </td>
                      <td className="px-4 py-3 text-indigo-600">{msg.email}</td>
                      <td className="px-4 py-3 text-gray-700 truncate max-w-xs" title={msg.message}>
                        {msg.message}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {new Date(msg.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="px-4 py-3">
                        <a
                          href="https://mail.google.com/mail/u/0/#inbox"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs"
                        >
                          Open in Gmail
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminMessages;
