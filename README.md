# 🚀 Acortador de URLs Pro

Este es un acortador de URLs de alto rendimiento construido con una arquitectura limpia (Clean Architecture), separando la lógica de negocio del router y los controladores.

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React + Vite**: Interfaz ultrarrápida y moderna.
- **Tailwind CSS v4**: Diseño premium con soporte para modo oscuro.
- **Chart.js**: Visualización de analíticas en tiempo real.
- **Lucide React**: Iconografía elegante.

### Backend
- **Node.js + Express**: Servidor robusto y escalable.
- **Prisma ORM**: Gestión de base de datos segura y tipada.
- **SQLite**: Base de datos local (fácilmente migrable a PostgreSQL).
- **Nanoid**: Generación de slugs únicos y cortos.
- **Express Rate Limit**: Protección contra abuso y ataques.

## 📈 Características Principales
- **Analíticas Avanzadas**: Gráficos de clics por día y seguimiento de procedencia.
- **Privacidad**: Las IPs se hashean con SHA-256 antes de guardarse para proteger la privacidad del usuario.
- **Diseño Responsive**: Optimizado para dispositivos móviles y escritorio.
- **Clean Code**: Separación clara entre `routes`, `controllers` y `services`.

## 🚀 Instalación y Uso

### Clonar el repositorio
```bash
git clone https://github.com/antoniotiradog05/Acortador-URL.git
```

### Configuración del Backend
```bash
cd backend
npm install
npx prisma generate
npm start
```

### Configuración del Frontend
```bash
cd frontend
npm install
npm run dev
```

---
Desarrollado con ❤️ para impresionar a cualquier reclutador técnico.