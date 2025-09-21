<template>
  <div class="login-container">
    <div class="header-band top-band"></div>
    <div class="main-content">
      <h1>Bienvenido de vuelta</h1>
      <form @submit.prevent="handleLogin">
        <!-- Campo de Usuario -->
        <div class="input-group">
          <label for="username">Usuario</label>
          <div class="input-box">
            <i class="fas fa-user"></i>
            <input id="username" v-model="username" type="text" placeholder="Ingresar tu usuario" required />
          </div>
        </div>

        <!-- Campo de Contraseña -->
        <div class="input-group">
          <div class="label-row">
            <label for="password">Contraseña</label>
            <span class="forgot">¿Has olvidado tu contraseña?</span>
          </div>
          <div class="input-box">
            <i class="fas fa-lock"></i>
            <input id="password" v-model="password" :type="passwordFieldType" placeholder="Ingresar tu contraseña"
              required />
            <i class="fas fa-eye" @click="togglePasswordVisibility"></i>
          </div>
        </div>

        <!-- Botón de Enviar -->
        <button class="login-btn" type="submit">Iniciar sesión</button>

        <!-- Mensajes de Estado -->
        <div v-if="error" class="error">{{ error }}</div>
        <div v-if="success" class="success">¡Login exitoso!</div>
      </form>
    </div>
    <div class="header-band bottom-band"></div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      error: '',
      success: false,
      passwordFieldType: 'password'
    };
  },
  methods: {
    async handleLogin() {
      this.error = '';
      this.success = false;

      try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: this.username,
            password: this.password
          })
        });
        const data = await response.json();

        if (response.ok && data.accessToken) {
          localStorage.setItem('accessToken', data.accessToken);
          this.success = true;
        } else {
          this.error = data.message || 'Credenciales incorrectas';
        }
      } catch (err) {
        this.error = 'Error de conexión con el servidor.';
        console.error('Error al iniciar sesión:', err);
      }
    },
    togglePasswordVisibility() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    }
  }
};
</script>
