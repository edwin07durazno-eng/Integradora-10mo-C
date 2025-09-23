<template>
  <div class="empleados-view">
    <main class="main-content1">
      <header class="content-header">
        <div class="page-title-center">
          <h1 class="page-title">Empleados</h1>
        </div>
      </header>
      
      <div class="btn-add">
        <button class="add-btn" @click="abrirModalAgregar">
          <i class="fas fa-plus-circle"></i> Agregar empleados
        </button>
      </div>

      <AgregarEmpleado v-if="showModalAgregar" :visible="showModalAgregar" @agregar-empleado="handleAgregarEmpleado" @cerrar="cerrarModalAgregar" />

      <ActualizarEmpleado v-if="showModalActualizar" :visible="showModalActualizar" :empleado="empleadoActual" @actualizar-empleado="handleActualizarEmpleado" @cerrar="cerrarModalActualizar" />
      
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
            <i class="fas fa-trash-alt action-icon red"></i>
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

export default {
    name: 'Empleados',
    components: {
        AgregarEmpleado,
        ActualizarEmpleado
    },
    data() {
        return {
            showModalAgregar: false,
            showModalActualizar: false,
            empleadoActual: null,
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
        abrirModalAgregar() {
            this.showModalAgregar = true;
        },
        cerrarModalAgregar() {
            this.showModalAgregar = false;
            this.fetchEmpleados();
        },
        abrirModalActualizar(empleado) {
            this.empleadoActual = { ...empleado }; 
            this.showModalActualizar = true;
        },
        cerrarModalActualizar() {
            this.showModalActualizar = false;
        },
        handleAgregarEmpleado(nuevoEmpleado) {
            this.empleados.push(nuevoEmpleado);
            this.cerrarModalAgregar();
        },
        handleActualizarEmpleado(updatedEmployee) {
            const index = this.empleados.findIndex(emp => emp.id === updatedEmployee.id);
            if (index !== -1) {
                this.empleados.splice(index, 1, updatedEmployee);
            }
            this.cerrarModalActualizar();
        }
    }
};
</script>