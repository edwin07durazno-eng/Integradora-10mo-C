<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal-content">
      <h3 class="modal-title">Actualizar Empleado</h3>

      <form @submit.prevent="actualizarEmpleado">
        <div class="input-group">
          <label>Nombre Completo</label>
          <input class="input-control" v-model="form.fullName" placeholder="Nombre Completo" required />
        </div>

        <div class="input-group">
          <label>Teléfono</label>
          <input class="input-control" v-model="form.phone" placeholder="Teléfono" required />
        </div>

        <div class="input-group">
          <label>Curp</label>
          <input class="input-control" v-model="form.curp" placeholder="Curp" required />
        </div>

        <div class="input-group">
          <label>Salario</label>
          <input class="input-control" v-model.number="form.salary" type="number" placeholder="Salario" required />
        </div>
        
        <div class="modal-actions">
          <button type="submit" class="update-btn">Actualizar</button>
          <button type="button" class="cancel-btn" @click="cerrarModal">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalActualizarEmpleado',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    empleado: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      form: { ...this.empleado }
    };
  },
  watch: {
    empleado: {
      handler(newEmpleado) {
        this.form = { ...newEmpleado };
      },
      deep: true
    }
  },
  methods: {
    async actualizarEmpleado() {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        alert('No estás autenticado.');
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/api/employees/${this.form.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(this.form)
        });

        if (response.ok) {
          const updatedEmployee = await response.json();
          alert('✅ Empleado actualizado exitosamente');
          this.$emit('actualizar-empleado', updatedEmployee);
          this.cerrarModal();
        } else {
          const errorData = await response.json();
          alert(`❌ Error al actualizar empleado: ${errorData.message}`);
        }
      } catch (error) {
        console.error('Error de conexión:', error);
        alert('Error de conexión con el servidor.');
      }
    },
    cerrarModal() {
      this.$emit('cerrar');
    }
  }
};
</script>

<style scoped>
/* Puedes reutilizar los mismos estilos que tienes en ModalAgregarEmpleado.vue */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}
.modal-content {
    background: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 90%;
    max-width: 400px;
    text-align: left;
}
.modal-title {
    text-align: center;
    margin-bottom: 20px;
    color: black;
}
.input-group {
    margin-bottom: 15px;
}
.input-group label {
    font-weight: bold;
    display: block;
    margin-bottom: 5px;
}
.input-control {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f5f5f5;
    outline: none;
}
.input-control:focus {
    border-color: #43a047;
}
.modal-actions {
    display: flex;
    justify-content: center;
    margin-top: 25px;
}
.update-btn {
    background-color: #43a047;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 12px 20px;
    font-size: 1em;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s;
    width: 100%;
}
.update-btn:hover {
    background-color: #388e3c;
}
.cancel-btn {
    background-color: red;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 12px 20px;
    font-size: 1em;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s;
    width: 100%;
    margin-left: 10px;
}
</style>