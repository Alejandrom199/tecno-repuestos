# Sistema Tecno Repuestos S.A. (Backend)

## Estructura del Proyecto
Este proyecto sigue una arquitectura de 3 capas para garantizar escalabilidad y orden:

* **src/routes:** Aquí se definen los endpoints de la API (las URLs). No contienen lógica, solo dirigen el tráfico.
* **src/controllers:** Actúan como intermediarios. Reciben los datos del usuario, llaman al servicio correspondiente y responden al cliente.
* **src/services:** Aquí vive la lógica de negocio pura (validaciones de stock, cálculos de totales). Es el corazón del sistema.
* **src/config:** Configuraciones de base de datos y variables de entorno.
* **test:** Contiene los scripts de pruebas unitarias para asegurar la calidad del código.

## Instalación
1. Clonar el repositorio.
2. Ejecutar `npm install` para bajar dependencias.
3. Ejecutar `npm run dev` para iniciar el servidor.