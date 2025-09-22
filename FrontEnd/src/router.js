import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/Login.vue';
import ListarEmpleados from './components/ListarEmpleados.vue';

const routes = [
  { path: '/', name: 'Login', component: Login },
  { path: '/empleados', name: 'ListarEmpleados', component: ListarEmpleados }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;