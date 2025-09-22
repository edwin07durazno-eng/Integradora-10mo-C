<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal-content">
      <h3 class="modal-title">Agregar Empleado</h3>

      <form @submit.prevent="agregarEmpleado">
        <div class="input-group">
          <label>Nombre Completo</label>
          <input class="input-control" v-model="form.nombreCompleto" placeholder="Nombre Completo" required />
        </div>

        <div class="input-group">
          <label>Teléfono</label>
          <input class="input-control" v-model="form.telefono" placeholder="Teléfono" required />
        </div>

        <div class="input-group">
          <label>Curp</label>
          <input class="input-control" v-model="form.curp" placeholder="Curp" required />
        </div>

        <div class="input-group">
          <label>Salario</label>
          <input class="input-control" v-model.number="form.salario" type="number" placeholder="Salario" required />
        </div>
        
        <div class="modal-actions">
          <button type="submit" class="update-btn">Agregar</button>
          <button type="button" class="cancel-btn" @click="cerrarModal">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalAgregarEmpleado',
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
      form: {
        nombreCompleto: '',
        telefono: '',
        curp: '',
        salario: ''
      }
    };
  },
  watch: {
    empleado: {
      handler(newEmpleado) {
        if (newEmpleado) {
          this.form = { ...newEmpleado };
        }
      },
      immediate: true,
      deep: true
    }
  },
methods: {
    async agregarEmpleado() {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        alert('No estás autenticado. Por favor, inicia sesión.');
        return;
      }

      const empleadoData = {
        fullName: this.form.nombreCompleto,
        phone: this.form.telefono,
        curp: this.form.curp,
        salary: this.form.salario
      };

      try {
        const response = await fetch('http://localhost:3000/api/employees', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(empleadoData)
        });

        // Verifica si la respuesta es exitosa (código 2xx)
        if (response.ok) {
          const data = await response.json();
          alert('✅ Empleado agregado exitosamente');
          this.$emit('agregar-empleado', data);
          this.cerrarModal();
          this.form = {
            nombreCompleto: '',
            telefono: '',
            curp: '',
            salario: ''
          };
        } else {
          // Si la respuesta no es exitosa, lee el mensaje de error del cuerpo
          const errorData = await response.json();
          if (errorData.message) {
            alert(`Error: ${errorData.message}`);
          } else {
            alert('Error al agregar empleado. Inténtalo de nuevo.');
          }
        }
      } catch (error) {
        alert('Error de conexión con el servidor. Por favor, verifica tu red.');
        console.error(error);
      }
    },
    cerrarModal() {
      this.$emit('cerrar');
    }
  }
};
</script>

<style scoped>
/* Fondo semi-transparente para el modal */
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

/* Contenido del modal */
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

/* Estilos para los campos de formulario */
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

/* Botón y acciones del modal */
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