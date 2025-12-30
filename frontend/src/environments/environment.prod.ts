export const environment = {
  production: true,
  // Lee la variable del objeto global inyectado por env.js
  apiUrl: (window as any).env?.apiUrl || 'https://tu-backend-render.onrender.com'
};