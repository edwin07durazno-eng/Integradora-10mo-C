<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal-content-delete">
      <h3 class="modal-title">¿Estás seguro de que quieres eliminar a este empleado?</h3>
      <p class="modal-message">
        <strong>Nombre:</strong> {{ empleado.fullName }} <br>
        <strong>Teléfono:</strong> {{ empleado.phone }} <br>
        <strong>Curp:</strong> {{ empleado.curp }}
      </p>

      <div class="modal-actions">
        <button class="confirm-btn" @click="confirmarEliminacion">Sí, eliminar</button>
        <button class="cancel-btn" @click="cerrarModal">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalEliminarEmpleado',
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
  methods: {
    confirmarEliminacion() {
      // ✅ Emite un evento para que el componente padre (ListarEmpleados) maneje la petición de eliminación
      this.$emit('confirmar-eliminacion');
    },
    cerrarModal() {
      // ✅ Emite un evento para que el componente padre cierre el modal
      this.$emit('cerrar');
    }
  }
};
</script>

<style scoped>
/* Estilos básicos para el modal de eliminación */
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

.modal-content-delete {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 400px;
  text-align: center;
}

.modal-title {
  margin-bottom: 20px;
  color: #333;
}

.modal-message {
  margin-bottom: 20px;
  text-align: left;
}

.modal-message strong {
  color: #555;
}

.modal-actions {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.confirm-btn {
  background-color: #e74c3c;
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

.confirm-btn:hover {
  background-color: #c0392b;
}

.cancel-btn {
  background-color: #95a5a6;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
  font-size: 1em;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 100%;
}

.cancel-btn:hover {
  background-color: #7f8c8d;
}
</style>