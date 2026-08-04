import api from './axiosConfig';

const userService = {
  getProfile: async () => {
    try {
      const response = await api.get('/users/profile');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch profile' };
    }
  },

  updateProfile: async (userData) => {
    try {
      const response = await api.put('/users/profile', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update profile' };
    }
  },

  changePassword: async (passwordData) => {
    try {
      const response = await api.put('/users/profile/password', passwordData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to change password' };
    }
  },

  uploadProfileImage: async (formData) => {
    try {
      const response = await api.put('/users/profile/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to upload profile image' };
    }
  },

  getTrainings: async () => {
    try {
      const response = await api.get('/users/trainings');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch trainings' };
    }
  },

  getBookmarks: async () => {
    try {
      const response = await api.get('/users/bookmarks');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch bookmarks' };
    }
  },

  getActivity: async () => {
    try {
      const response = await api.get('/users/activity');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch activity' };
    }
  },

  deleteAccount: async () => {
    try {
      const response = await api.delete('/users/account');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete account' };
    }
  }
};

export default userService;
