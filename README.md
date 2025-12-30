# 🛠️ Sistema Tecno Repuestos S.A.

Este repositorio contiene una solución integral para la gestión de repuestos, construida con una arquitectura de microservicios contenedorizados y un flujo de despliegue continuo (CI/CD) hacia la nube.

---

## 🏗️ Estructura del Proyecto

El proyecto está organizado como un **monorepo** para facilitar la orquestación y el despliegue:

* **`/backend`**: API REST construida con **Node.js, Express y Sequelize**. Sigue una arquitectura de 3 capas (Routes, Controllers, Services).
* **`/frontend`**: Interfaz de usuario desarrollada en **Angular 18+**, optimizada para comunicación segura con el backend mediante interceptores.
* **`.github/workflows`**: Automatización de pruebas y publicación de imágenes en **Docker Hub**.

---

## 🌐 Arquitectura de Producción (Multi-Cloud)

El sistema utiliza un entorno distribuido para garantizar escalabilidad y seguridad:

* **Frontend**: Desplegado en **Netlify** con soporte para Single Page Application (SPA).
* **Backend**: Ejecutándose en **Render** mediante contenedores Docker.
* **Base de Datos**: **MySQL** gestionado de forma independiente en **Aiven**.
* **Seguridad**: 
    * Gestión de sesiones mediante cookies **HttpOnly**.
    * Políticas de **CORS** restringidas para dominios específicos.
    * Configuración `SameSite: None` y `Secure` para permitir el intercambio de tokens entre nubes.

---

## 🚀 Despliegue Local (Docker Compose)

Esta configuración permite replicar el sistema completo en un entorno local o servidor Debian.

### Requisitos Previos
* Docker y Docker Compose instalado.
* Archivo `.env` en la raíz con las credenciales necesarias.

### Pasos para iniciar
1.  **Configurar el entorno**: Crea un archivo `.env` con `DATABASE_URL`, `JWT_SECRET` y `NODE_ENV`.
2.  **Levantar el sistema**:
    ```bash
    docker compose up -d --build
    ```
3.  **Acceso**:
    * **Frontend**: `http://localhost:4200`
    * **Backend API**: `http://localhost:3000/api`

---

## 🔐 CI/CD y Calidad de Código

El proyecto integra **GitHub Actions** para asegurar un ciclo de vida de desarrollo profesional:

1.  **Validación**: Cada `push` dispara pruebas unitarias en el backend para asegurar la integridad de la lógica.
2.  **Contenedorización**: Se generan imágenes automáticas en **Docker Hub** con tags de versión (ej. `v1.1.0`).
3.  **Despliegue Automático**: Una vez superadas las pruebas, Render y Netlify actualizan los servicios de producción sin intervención manual.

---

## 🧪 Desarrollo y Pruebas

### Backend
Para ejecutar las pruebas unitarias localmente:
```bash
cd backend
npm install
npm test
```
### Frontend
Para iniciar el servidor de desarrollo:
```bash
cd frontend
npm install
npm start
```