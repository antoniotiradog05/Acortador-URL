import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAnalytics } from '../hooks/useAnalytics';
import AnalyticsChart from '../components/AnalyticsChart';
import { ArrowLeft, Loader2, Link as LinkIcon, Globe, Monitor, Clock } from 'lucide-react';

export default function Dashboard() {
  const { slug } = useParams();
  const { analytics, loading, error, fetchAnalytics } = useAnalytics();

  useEffect(() => {
    if (slug) fetchAnalytics(slug);
  }, [slug, fetchAnalytics]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <Loader2 className="w-10 h-10 animate-spin text-purple-600" />
      </div>
    );
  }

  if (error || !analytics) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">Error al cargar analíticas</h2>
        <p className="text-slate-500 mb-6">{error}</p>
        <Link to="/" className="text-purple-600 hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Volver al Inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <Link to="/" className="inline-flex items-center text-slate-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors mb-8 font-medium">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Volver al Inicio
        </Link>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-3">
                <LinkIcon className="w-8 h-8 text-purple-500" />
                Analíticas de {analytics.slug}
              </h1>
              <a href={analytics.url} target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 hover:underline text-lg">
                {analytics.url}
              </a>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/30 px-6 py-4 rounded-xl border border-purple-100 dark:border-purple-800 text-center">
              <span className="block text-4xl font-extrabold text-purple-700 dark:text-purple-300">
                {analytics.clicks?.length || 0}
              </span>
              <span className="text-purple-600 dark:text-purple-400 text-sm font-medium uppercase tracking-wider">Clics Totales</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-500" /> Historial de Clics
            </h3>
            <div className="h-[300px]">
              <AnalyticsChart clicks={analytics.clicks} />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Globe className="w-5 h-5 text-green-500" /> Clics Recientes
            </h3>
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {analytics.clicks?.slice(0, 10).map((click, idx) => (
                <div key={click.id || idx} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-500 dark:text-slate-400">
                      {click.country ? click.country.substring(0, 2).toUpperCase() : '??'}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        {click.referrer ? new URL(click.referrer).hostname : 'Directo'}
                      </p>
                      <p className="text-xs text-slate-500">
                        {new Date(click.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {!analytics.clicks?.length && (
                <p className="text-slate-500 text-center py-4">Aún no hay clics registrados.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
