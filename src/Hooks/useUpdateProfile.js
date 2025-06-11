import useAxios from './useAxios';
import { useState } from 'react';
import toast from 'react-hot-toast';

const useUpdateProfile = () => {
  const [loading, setLoading] = useState(false);
  const axios = useAxios();

  const updateProfile = async (profileData) => {
    try {
      setLoading(true);
      const response = await axios.put('/profile/update-profile', profileData);
      
      if (response.data) {
        const currentAuth = JSON.parse(localStorage.getItem('auth')) || {};
        const updatedAuth = {
          ...currentAuth,
          user: {
            id: response?.data?._id,
            fullName: response?.data?.fullName,
            role: response?.data?.role,
            image: response?.data?.image
          }
        };

        console.log("updatedAuth" , updatedAuth);
        localStorage.setItem('auth', JSON.stringify(updatedAuth));
        
        toast.success('Profile updated successfully!');
        return response.data;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { updateProfile, loading };
};

export default useUpdateProfile;