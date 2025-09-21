# FrontEnd - Vue 3 + Vite

Este repositorio contiene la interfaz de usuario para la aplicación de autenticación, construida con **Vue 3** y **Vite**. El frontend está preparado para conectarse con la API de autenticación desarrollada por el equipo.

---

## 🚀 Empezando

Sigue estos pasos para levantar el entorno de desarrollo y comenzar a trabajar:

### 1. Requisitos

Asegúrate de tener instalado **Node.js** y **npm**.

### 2. Instalación

1.  **Instala las dependencias:**
    ```bash
    npm install
    ```

2.  **Levanta el servidor de desarrollo:**
    ```bash
    npm run dev
    ```
    Esto iniciará la aplicación en modo desarrollo. Por defecto estará disponible en [http://localhost:5173](http://localhost:5173).

---

## 💻 Funcionalidades Principales

- **Login de usuario:**  
  Formulario de inicio de sesión que se conecta al endpoint `/api/auth/login` del backend.

- **Gestión de tokens:**  
  Al iniciar sesión exitosamente, el token de acceso se guarda en `localStorage` para futuras peticiones autenticadas.

- **Diseño responsivo:**  
  Interfaz moderna y adaptable a dispositivos móviles y escritorio.

---

## 🔗 Conexión con el Backend

Asegúrate de que el backend esté corriendo en [http://localhost:3000](http://localhost:3000) para que el frontend pueda comunicarse correctamente.

---

## 📦 Estructura del Proyecto

```
FrontEnd/
├── src/
│   ├── components/
│   │   └── Login.vue
│   ├── main.js
│   └── style.css
├── public/
├── package.json
└── README.md
```

---

## 🛠️ Personalización

Puedes modificar los estilos globales en `src/style.css` y los componentes en `src/components/`.

---

## 🤝 Equipo de Desarrollo

Desarrollado por el equipo de integración FullStack.