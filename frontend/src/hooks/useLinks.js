import { useState, useCallback } from 'react';
import api from '../api/axios';

export const useLinks = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLinks = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/links');
      setLinks(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Error al obtener los enlaces');
    } finally {
      setLoading(false);
    }
  }, []);

  const createLink = async (url) => {
    setLoading(true);
    try {
      const { data } = await api.post('/links', { url });
      setLinks(prev => [data, ...prev]);
      setError(null);
      return data;
    } catch (err) {
      setError(err.response?.data?.error || 'Error al crear el enlace');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteLink = async (slug) => {
    try {
      await api.delete(`/links/${slug}`);
      setLinks(prev => prev.filter(l => l.slug !== slug));
    } catch (err) {
      setError(err.response?.data?.error || 'Error al eliminar el enlace');
      throw err;
    }
  };

  return { links, loading, error, fetchLinks, createLink, deleteLink };
};
