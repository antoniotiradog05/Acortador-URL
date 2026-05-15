import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 text-center px-4">
      <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-purple-500 to-blue-600 mb-4">
        404
      </h1>
      <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-6">Página no encontrada</h2>
      <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md">
        El enlace que has pulsado podría estar roto o la página podría haber sido eliminada.
      </p>
      <Link 
        to="/" 
        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-purple-600 hover:bg-purple-700 transition-colors"
      >
        <Home className="w-5 h-5 mr-2" />
        Volver al Inicio
      </Link>
    </div>
  );
}
