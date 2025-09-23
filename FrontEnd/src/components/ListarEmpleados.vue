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

            <AgregarEmpleado v-if="showModal" :visible="showModal" :empleado="empleadoActual"
                @agregar-empleado="handleAgregarEmpleado" @cerrar="cerrarModal" />

            <ActualizarEmpleado v-if="showModalActualizar" :visible="showModalActualizar" :empleado="empleadoActual"
                @actualizar-empleado="handleActualizarEmpleado" @cerrar="cerrarModalActualizar" />

            <EliminarEmpleado v-if="showModalEliminar" :visible="showModalEliminar" :empleado="empleadoActual" @confirmar-eliminacion="handleEliminarEmpleado" @cerrar="cerrarModalEliminar" />

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
                        <i class="fas fa-pen action-icon yellow" @click="abrirModalActualizar(empleado)"></i> 
                        <i class="fas fa-trash-alt action-icon red" @click="abrirModalEliminar(empleado)"></i>
                    </span>
                </div>

            </div>
        </main>
    </div>
</template>

<script>
import AgregarEmpleado from './AgregarEmpleado.vue';
// ✅ Importa el nuevo componente
import ActualizarEmpleado from './ActualizarEmpleado.vue';
import EliminarEmpleado from './EliminarEmpleado.vue';

export default {
    name: 'Empleados',
    components: {
        AgregarEmpleado,
        ActualizarEmpleado, // ✅ Registra el nuevo componente
        EliminarEmpleado
    },
    data() {
        return {
            showModalAgregar: false, // ✅ Estado para el modal de agregar
            showModalActualizar: false, // ✅ Estado para el modal de actualizar
            showModalEliminar: false,
            empleadoActual: null, // ✅ Almacenará el empleado a editar
            empleados: []
        };
    },
    created() {
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
        // ✅ Métodos para el modal de Agregar
        abrirModalAgregar() {
            this.showModalAgregar = true;
        },
        cerrarModalAgregar() {
            this.showModalAgregar = false;
            this.fetchEmpleados(); // ✅ Refrescar la lista al cerrar el modal de agregar
        },
        // ✅ Métodos para el modal de Actualizar
        abrirModalActualizar(empleado) {
            this.empleadoActual = { ...empleado }; // ✅ Copiamos el objeto para evitar mutar el original
            this.showModalActualizar = true;
        },
        cerrarModalActualizar() {
            this.showModalActualizar = false;
        },
        handleAgregarEmpleado(nuevoEmpleado) {
            this.empleados.push(nuevoEmpleado);
            this.cerrarModalAgregar();
        },
        // ✅ Manejador del evento de actualización
        handleActualizarEmpleado(updatedEmployee) {
            // ✅ Encontramos el empleado en la lista y lo reemplazamos con los datos actualizados
            const index = this.empleados.findIndex(emp => emp.id === updatedEmployee.id);
            if (index !== -1) {
                this.empleados.splice(index, 1, updatedEmployee);
            }
            this.cerrarModalActualizar();
        },
        // ✅ Métodos para el modal de Eliminar
        abrirModalEliminar(empleado) {
            this.empleadoActual = empleado;
            this.showModalEliminar = true;
        },
        cerrarModalEliminar() {
            this.showModalEliminar = false;
        },
        async handleEliminarEmpleado() {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                alert('No estás autenticado. Por favor, inicia sesión.');
                return;
            }

            try {
                const response = await fetch(`http://localhost:3000/api/employees/${this.empleadoActual.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    alert('✅ Empleado eliminado exitosamente');
                    // ✅ Filtra la lista para eliminar el empleado sin recargar la página
                    this.empleados = this.empleados.filter(emp => emp.id !== this.empleadoActual.id);
                    this.cerrarModalEliminar();
                } else {
                    const errorData = await response.json();
                    alert(`❌ Error al eliminar empleado: ${errorData.message}`);
                }
            } catch (error) {
                console.error("Error de conexión:", error);
                alert('Error de conexión con el servidor.');
            }
        }
    }
};
</script>