import { useState } from 'react';
import { Link as LinkIcon, Loader2 } from 'lucide-react';

export default function ShortenForm({ onSubmit, loading }) {
  const [url, setUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) return;
    try {
      await onSubmit(url);
      setUrl('');
    } catch (error) {
      // Error is handled by hook
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative flex items-center shadow-lg rounded-full bg-white dark:bg-slate-800 p-2 border border-slate-200 dark:border-slate-700 transition-all hover:shadow-xl focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-transparent">
        <div className="pl-4 text-slate-400">
          <LinkIcon className="w-6 h-6" />
        </div>
        <input
          type="url"
          required
          placeholder="https://tu-url-larga.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 bg-transparent px-4 py-3 text-lg outline-none text-slate-700 dark:text-slate-200 placeholder-slate-400"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-full transition-colors disabled:opacity-70 flex items-center justify-center min-w-[140px]"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Acortar'}
        </button>
      </div>
    </form>
  );
}
