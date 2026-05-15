import { useEffect } from 'react';
import { useLinks } from '../hooks/useLinks';
import ShortenForm from '../components/ShortenForm';
import LinkCard from '../components/LinkCard';
import { Sparkles, Activity } from 'lucide-react';

export default function Home() {
  const { links, loading, error, fetchLinks, createLink, deleteLink } = useLinks();

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 transition-colors">
      <header className="pt-16 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full text-center">
        <div className="inline-flex items-center justify-center p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-6">
          <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-2" />
          <span className="text-sm font-medium text-purple-800 dark:text-purple-300 pr-2">Acortador de URLs Ultrarrápido</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
          Acorta tus Enlaces <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
            Expande tu Alcance
          </span>
        </h1>
        <p className="mt-4 max-w-2xl text-xl text-slate-500 dark:text-slate-400 mx-auto mb-10">
          Crea enlaces cortos y memorables en segundos y haz un seguimiento de su rendimiento con nuestro panel de analíticas avanzado.
        </p>
        
        <ShortenForm onSubmit={createLink} loading={loading} />
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </header>

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Activity className="w-6 h-6 text-purple-500" />
            Enlaces Recientes
          </h2>
          <span className="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 py-1 px-3 rounded-full text-sm font-medium">
            {links.length} en Total
          </span>
        </div>

        {links.length === 0 && !loading ? (
          <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">Aún no hay enlaces</h3>
            <p className="text-slate-500 dark:text-slate-400">¡Acorta tu primer enlace para empezar!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {links.map((link) => (
              <LinkCard key={link.id} link={link} onDelete={deleteLink} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
