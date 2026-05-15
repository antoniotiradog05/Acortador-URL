import { useState, useCallback } from 'react';
import api from '../api/axios';

export const useAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAnalytics = useCallback(async (slug) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/links/analytics/${slug}`);
      setAnalytics(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Error al obtener las analíticas');
    } finally {
      setLoading(false);
    }
  }, []);

  return { analytics, loading, error, fetchAnalytics };
};
