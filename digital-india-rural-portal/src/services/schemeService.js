import api from './axiosConfig';

export const schemeService = {
  getAllSchemes: async (params = {}) => {
    const response = await api.get('/schemes', { params });
    return response.data;
  },
  
  getSchemeBySlug: async (slug) => {
    const response = await api.get(`/schemes/slug/${slug}`);
    return response.data;
  }
};
