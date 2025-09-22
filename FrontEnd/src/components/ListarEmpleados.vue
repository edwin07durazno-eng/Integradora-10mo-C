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
                    <span class="header-item">Acciones</span>
                </div>
                <div class="table-row">
                    <span class="row-item">Luis Norberto Hernández</span>
                    <span class="row-item">772 267 7849</span>
                    <span class="row-item">GAGL920315HDFRNS08</span>
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
            empleadoActual: {
                nombreCompleto: '',
                telefono: '',
                curp: '',
                salario: ''
            }
        };
    },
    methods: {
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
        handleAgregarEmpleado(nuevoEmpleado) {
            // Aquí puedes agregar la lógica para guardar el nuevo empleado
            // Por ejemplo, hacer una petición al backend
            console.log('Empleado agregado:', nuevoEmpleado);
            this.cerrarModal();
        }
    }
};
</script>
