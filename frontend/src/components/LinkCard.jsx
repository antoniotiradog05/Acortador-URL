import { Copy, BarChart2, Trash2, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LinkCard({ link, onDelete }) {
  const shortUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/${link.slug}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    // You could add a toast notification here
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all hover:shadow-md">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-purple-600 dark:text-purple-400 hover:underline truncate">
            {shortUrl}
          </a>
          <button onClick={copyToClipboard} className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors" title="Copiar">
            <Copy className="w-4 h-4" />
          </button>
        </div>
        <p className="text-slate-500 dark:text-slate-400 truncate text-sm flex items-center gap-1">
          <ExternalLink className="w-3 h-3" /> {link.url}
        </p>
      </div>
      
      <div className="flex items-center gap-4 text-sm w-full md:w-auto justify-between md:justify-end border-t border-slate-100 dark:border-slate-700 pt-4 md:pt-0 md:border-0">
        <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 px-3 py-1.5 rounded-full font-medium">
          <BarChart2 className="w-4 h-4" />
          {link._count?.clicks || 0} clics
        </div>
        <div className="flex items-center gap-2">
          <Link to={`/dashboard/${link.slug}`} className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors" title="Analíticas">
            Analíticas
          </Link>
          <button onClick={() => onDelete(link.slug)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors" title="Eliminar">
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
