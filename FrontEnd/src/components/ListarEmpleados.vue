<template>
    <div class="empleados-view">
        <aside class="sidebar">
            <div class="sidebar-header">
                <h2 class="admin-title">Administrador</h2>
            </div>
            <nav class="sidebar-nav">
                <a href="#" class="nav-item active">
                    <i class="fas fa-users-cog"></i>
                    <span>Empleados</span>
                </a>
                <br>
                <a href="#" class="nav-item active" @click="logout">
                    <i class="fas fa-sign-out-alt"></i>
                    <span>Cerrar sesión</span>
                </a>
            </nav>
        </aside>

        <main class="main-content1">
            <header class="content-header">
                <div class="page-title-center">
                    <h1 class="page-title">Empleados</h1>
                </div>
            </header>

            <div class="btn-add">
                <button class="add-btn" @click="abrirModal">
                    <i class="fas fa-plus-circle"></i> Agregar empleados
                </button>
            </div>

            <AgregarEmpleado v-if="showModal" :visible="showModal" :empleado="empleadoActual" @agregar-empleado="handleAgregarEmpleado" @cerrar="cerrarModal" />

            <div class="search-bar">
                <input type="text" placeholder="Buscar..." class="search-input" />
                <button class="search-btn">
                    <i class="fas fa-search"></i>
                </button>
            </div>

            <div class="employees-table">
                <div class="table-header">
                    <span class="header-item">Nombre completo</span>
                    <span class="header-item">Teléfono</span>
                    <span class="header-item">Curp</span>
                    <span class="header-item">Salario</span>
                    <span class="header-item">Acciones</span>
                </div>
                
                <div class="table-row" v-for="empleado in empleados" :key="empleado.id">
                    <span class="row-item">{{ empleado.fullName }}</span>
                    <span class="row-item">{{ empleado.phone }}</span>
                    <span class="row-item">{{ empleado.curp }}</span>
                    <span class="row-item">${{ empleado.salary }}</span>
                    <span class="row-item actions">
                        <i class="fas fa-pen action-icon yellow"></i>
                        <i class="fas fa-trash-alt action-icon red"></i>
                    </span>
                </div>

            </div>
        </main>
    </div>
</template>

<script>
import AgregarEmpleado from './AgregarEmpleado.vue';

export default {
    name: 'Empleados',
    components: {
        AgregarEmpleado
    },
    data() {
        return {
            showModal: false,
            empleadoActual: {},
            empleados: [] // ✅ Agregamos un array para almacenar la lista de empleados
        };
    },
    created() {
        // ✅ Llamamos a la función para obtener los empleados al crear el componente
        this.fetchEmpleados();
    },
    methods: {
        async fetchEmpleados() {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                alert('No estás autenticado. Por favor, inicia sesión.');
                this.$router.push('/');
                return;
            }

            try {
                const response = await fetch('http://localhost:3000/api/employees', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    this.empleados = await response.json();
                } else {
                    alert('Error al obtener la lista de empleados.');
                    // Opcional: Cerrar sesión si el token es inválido
                    // this.logout();
                }
            } catch (error) {
                console.error("Error de conexión:", error);
                alert('Error de conexión con el servidor.');
            }
        },
        logout() {
            localStorage.removeItem('accessToken');
            this.$router.push('/');
        },
        abrirModal() {
            this.showModal = true;
        },
        cerrarModal() {
            this.showModal = false;
        },
        // ✅ Cuando se agrega un empleado desde el modal, se recarga la lista
        handleAgregarEmpleado(nuevoEmpleado) {
            this.empleados.push(nuevoEmpleado);
            this.cerrarModal();
        }
    }
};
</script>