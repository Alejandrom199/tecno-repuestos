# 🛠️ Sistema Tecno Repuestos S.A.

Este repositorio contiene la solución integral para la gestión de repuestos, construida con una arquitectura moderna basada en microservicios contenedorizados.

---

## 🏗️ Estructura del Proyecto

El proyecto está organizado como un **monorepo** para facilitar la orquestación de todos los servicios:

* **`/backend`**: API REST construida con **Node.js, Express y Sequelize**. Sigue una arquitectura de 3 capas (Routes, Controllers, Services).
* **`/frontend`**: Interfaz de usuario desarrollada en **Angular**.
* **`docker-compose.yml`**: Orquestador principal que levanta la base de datos MySQL, el Backend, el Frontend y el Proxy Inverso.
* **`nginx.conf`**: Configuración del servidor web que unifica el sistema y gestiona el tráfico mediante un Reverse Proxy.

---

## 🚀 Despliegue en Producción (Docker)

Esta es la forma recomendada para desplegar en tu servidor **Debian**. Gracias a la segmentación de redes de Docker, el sistema emula una **VPC** donde los componentes críticos están protegidos.

### Requisitos Previos
* Docker y Docker Compose plugin instalados.
* Archivo `.env` configurado en la raíz del proyecto.

### Pasos para iniciar
1.  **Configurar el entorno**: Crea un archivo `.env` en la raíz con las credenciales de base de datos y JWT.
2.  **Levantar el sistema**:
    ```bash
    docker compose up -d --build
    ```
3.  **Acceso**:
    * **Frontend**: `http://tu-ip-o-dominio/`
    * **Backend API**: `http://tu-ip-o-dominio/api/`

---

## 🔐 Seguridad y Red (Concepto VPC)

El sistema utiliza un aislamiento de red mediante **Docker Networks**:

* **`frontend_net`**: Red de acceso público. Aquí conviven el Proxy y el Frontend.
* **`backend_net`**: Red **privada interna**. Aquí reside la base de datos MySQL. 
    > **Nota:** Ningún puerto de la base de datos está expuesto al exterior. Solo el contenedor del Backend tiene permiso para comunicarse con ella.

---

## 🧪 Desarrollo y Pruebas

### Backend
Para ejecutar pruebas unitarias y asegurar la calidad de la lógica de negocio:
```bash
cd backend
npm install
npm test
