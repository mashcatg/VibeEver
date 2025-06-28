import { useEffect, useState } from "react";
import { 
  FaEnvelope, 
  FaClock, 
  FaUser, 
  FaCalendarAlt, 
  FaReply,
  FaSearch,
  FaFilter,
  FaDownload
} from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import useAxios from "../../../Hooks/useAxios";

const AdminMessages = () => {
  const axios = useAxios();
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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

  // Filter and search messages
  useEffect(() => {
    let filtered = messages;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(msg => 
        msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply date filter
    const now = new Date();
    if (filterBy === "today") {
      filtered = filtered.filter(msg => {
        const msgDate = new Date(msg.createdAt);
        return msgDate.toDateString() === now.toDateString();
      });
    } else if (filterBy === "week") {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(msg => new Date(msg.createdAt) >= weekAgo);
    } else if (filterBy === "month") {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(msg => new Date(msg.createdAt) >= monthAgo);
    }

    setFilteredMessages(filtered);
  }, [messages, searchTerm, filterBy]);

  const handleEmailClick = (email, subject = "Reply to your message") => {
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
    window.open(mailtoUrl, '_blank');
  };

  const handleRefresh = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/hello");
      setMessages(res.data);
    } catch (err) {
      console.error("Error refreshing messages:", err);
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    const csvContent = [
      ['Name', 'Email', 'Message', 'Date'],
      ...filteredMessages.map(msg => [
        msg.name,
        msg.email,
        msg.message.replace(/,/g, ';'), // Replace commas to avoid CSV issues
        new Date(msg.createdAt).toLocaleString()
      ])
    ].map(row => row.map(field => `"${field}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `messages_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-indigo-600 font-medium">Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white  p-6 mb-8 border border-slate-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2 flex items-center gap-3">
                <FaEnvelope className="text-indigo-600" />
                Contact Messages
              </h1>
              <p className="text-slate-600">
                Total: <span className="font-semibold text-indigo-600">{filteredMessages.length}</span> messages
              </p>
            </div>
            
            {/* Live Clock */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-4 rounded-xl shadow-lg">
              <div className="flex items-center gap-2 text-sm opacity-90">
                <FaClock />
                <span>Current Time</span>
              </div>
              <div className="text-xl font-mono font-bold">
                {currentTime.toLocaleTimeString()}
              </div>
              <div className="text-sm opacity-90">
                {currentTime.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
          </div>
        </div>
 
        {/* Messages Table */}
        <div className="bg-white rounded-2xl  overflow-hidden border border-slate-200">
          {filteredMessages.length === 0 ? (
            <div className="text-center py-16">
              <FaEnvelope className="mx-auto text-6xl text-slate-300 mb-4" />
              <h3 className="text-xl font-semibold text-slate-600 mb-2">No messages found</h3>
              <p className="text-slate-500">
                {searchTerm || filterBy !== "all" 
                  ? "Try adjusting your search or filter criteria" 
                  : "No contact messages available at the moment"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 border-b border-slate-200">
                      <div className="flex items-center gap-2">
                        <FaUser className="text-slate-500" />
                        Name
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 border-b border-slate-200">
                      <div className="flex items-center gap-2">
                        <FaEnvelope className="text-slate-500" />
                        Email
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 border-b border-slate-200">
                      Message
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 border-b border-slate-200">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-slate-500" />
                        Date
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 border-b border-slate-200">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredMessages.map((msg, index) => (
                    <tr 
                      key={msg._id} 
                      className={`hover:bg-slate-50 transition-colors ${
                        index % 2 === 0 ? 'bg-white' : 'bg-slate-25'
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900">{msg.name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-indigo-600 hover:text-indigo-800 cursor-pointer"
                             onClick={() => handleEmailClick(msg.email)}>
                          {msg.email}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-slate-700 max-w-xs truncate" title={msg.message}>
                          {msg.message}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-slate-600 text-sm">
                          {new Date(msg.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleEmailClick(msg.email, `Re: Message from ${msg.name}`)}
                          className="flex items-center gap-2 px-3 py-2 text-sm bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors shadow-md hover:shadow-lg"
                        >
                          <FaReply />
                          Reply
                        </button>
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