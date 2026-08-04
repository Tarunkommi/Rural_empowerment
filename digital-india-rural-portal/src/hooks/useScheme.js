import { useState, useEffect, useCallback } from 'react';
import { schemeService } from '../services/schemeService';
import { toast } from 'react-toastify';

export const useSchemes = (initialParams = {}) => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});

  const fetchSchemes = useCallback(async (params = initialParams) => {
    try {
      setLoading(true);
      setError(null);
      const data = await schemeService.getAllSchemes(params);
      setSchemes(data.data.data);
      setPagination({ count: data.data.count, total: data.data.total });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch schemes');
      toast.error(err.response?.data?.message || 'Failed to fetch schemes');
    } finally {
      setLoading(false);
    }
  }, []); // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchSchemes();
  }, [fetchSchemes]);

  return { schemes, loading, error, pagination, fetchSchemes };
};

export const useSchemeDetails = (slug) => {
  const [scheme, setScheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSchemeDetails = useCallback(async () => {
    if (!slug) return;
    try {
      setLoading(true);
      setError(null);
      const data = await schemeService.getSchemeBySlug(slug);
      setScheme(data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch scheme details');
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchSchemeDetails();
  }, [fetchSchemeDetails]);

  return { scheme, loading, error, refetch: fetchSchemeDetails };
};
