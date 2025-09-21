# Auth API Backend - Equipo de Desarrollo

Este repositorio contiene la API de autenticación, construida con **Node.js, Express, TypeScript, Sequelize y MySQL**. El proyecto está completamente "dockerizado" para un entorno de desarrollo consistente y sin complicaciones.

---

## 🚀 Empezando

Sigue estos pasos para levantar el entorno de desarrollo y comenzar a trabajar:

### 1. Requisitos

Asegúrate de tener instalado **Docker** y **Docker Compose**.

### 2. Configuración del Entorno

1.  **Crea el archivo de variables de entorno:**
    Crea uno nuevo archivo llamado `.env` en la raíz del proyecto.
    ```
    DB_ROOT_PASSWORD=root
    DB_HOST=db
    DB_USER=admin
    DB_PASSWORD=Password123
    DB_NAME=api
    ACCESS_TOKEN_SECRET=Password123_Access
    REFRESH_TOKEN_SECRET=Password123_Refresh
    ```

### 2. Ejecución

-   **Primera vez (o si hay cambios en dependencias):**
    ```bash
    docker-compose up --build
    ```
    Este comando construirá las imágenes, instalará las dependencias y levantará los contenedores de MySQL y la API.

-   **Ejecuciones siguientes:**
    ```bash
    docker-compose up
    ```
    Esto reiniciará los contenedores rápidamente sin necesidad de reconstruir las imágenes. El servidor de la API se reiniciará automáticamente al detectar cambios en el código.

---

## 💻 Endpoints de la API

| Método | Endpoint | Descripción | Cuerpo de la Solicitud |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Autentica al usuario. | `{ "username": "admin", "password": "123456" }` |
| `POST` | `/api/auth/refresh` | Genera un nuevo token de acceso. | `{ "refreshToken": "<token>" }` |
| `GET` | `/api/auth/me` | Obtiene el perfil del usuario autenticado. | **Header:** `Authorization: Bearer <access_token>` |