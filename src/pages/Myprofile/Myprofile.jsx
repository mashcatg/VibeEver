import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";
import toast from "react-hot-toast";

const Myprofile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const axios = useAxios();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/profile');
        setProfileData(response.data);
      } catch (error) {
        toast.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [axios]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        {/* Profile Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <div className="flex gap-4">
            <Link
              to="/edit-profile"
              className="px-6 py-2 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors"
            >
              Edit Profile
            </Link>
            <Link
              to="/change-password"
              className="px-6 py-2 border border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-colors"
            >
              Change Password
            </Link>
          </div>
        </div>

        {/* Profile Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm text-neutral-caption mb-1">Full Name</h3>
              <p className="text-xl font-semibold">{profileData?.user?.fullName}</p>
            </div>
            <div>
              <h3 className="text-sm text-neutral-caption mb-1">Email</h3>
              <p className="text-xl font-semibold">{profileData?.user?.email}</p>
            </div>
            <div>
              <h3 className="text-sm text-neutral-caption mb-1">Role</h3>
              <p className="text-xl font-semibold capitalize">{profileData?.user?.role}</p>
            </div>
            <div>
              <h3 className="text-sm text-neutral-caption mb-1">Email Status</h3>
              <span 
                className={`px-3 py-1 rounded-full text-sm ${
                  profileData?.user?.isEmailVerified 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {profileData?.user?.isEmailVerified ? 'Verified' : 'Not Verified'}
              </span>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-neutral-subtle rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-6">Account Statistics</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6">
                <h3 className="text-neutral-caption mb-2">Total Orders</h3>
                <p className="text-3xl font-bold text-primary">
                  {profileData?.stats?.totalOrders}
                </p>
              </div>
              <div className="bg-white rounded-xl p-6">
                <h3 className="text-neutral-caption mb-2">Total Spent</h3>
                <p className="text-3xl font-bold text-primary">
                  ${profileData?.stats?.totalSpent.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Myprofile;