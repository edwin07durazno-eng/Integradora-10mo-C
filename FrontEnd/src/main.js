import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')

// Ejemplo de petición al backend
fetch('http://localhost:3000/api/auth', {
	method: 'GET',
	credentials: 'include'
})
	.then(response => response.json())
	.then(data => {
		console.log('Respuesta del backend:', data);
	})
	.catch(error => {
		console.error('Error al conectar con el backend:', error);
	});
