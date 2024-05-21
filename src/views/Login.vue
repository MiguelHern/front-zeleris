<script>
import AuthFetch from "../scripts/AuthFetch";
export default {
  data() {
    return {
      email: '',
      password: '',
      error: '',
      loading: false // Variable para controlar la ventana de carga
    };
  },

  mounted() {
    console.log(import.meta.env.VITE_APP_API_URL);
  },

  methods: {
    async iniciarSesion() {
      const auth = new AuthFetch();
      this.loading = true; // Mostrar la ventana de carga

      try {
        const respuesta = await auth.login(this.email, this.password);
        console.log('Respuesta del servidor:', respuesta.data.token);
        console.log('Respuesta del servidor:', respuesta.data);
        localStorage.token = respuesta.data.token;
        localStorage.rol = respuesta.data.rol;
        localStorage.username = respuesta.data.usearname;
        localStorage.expiredTime = respuesta.data.expiredTime;

if (respuesta.success) {
  if (localStorage.rol === 'Docente') {
    this.$router.replace('/TeachersHome');
  } else if (localStorage.rol === 'Coordinador') {
    this.$router.replace('/CordinationHome');
  } else if (localStorage.rol === 'Admin') {
    this.$router.replace('/AdminHome');
  } else if (localStorage.rol === 'Director') {
    this.$router.replace('/DirectortHome');
  } else {
    this.$router.replace('/');
  }
}

      } catch (error) {
        console.error('Error en la solicitud:', error);
        this.error = 'Usuario o contraseña incorrectos';
      } finally {
        this.loading = false; // Ocultar la ventana de carga
      }
    }
  }
}
</script>

<template>
  <div class="background">
    <!-- Agrega la ventana de carga -->
    <div v-if="loading" class="loading-overlay">
      <div class="spinner"></div>
    </div>

    <div class="img__container">
      <img class="img__zeleris" src="/src/assets/img/Zeleris.jpg" alt="">
    </div>
    <div class="content d-flex flex-column align-items-center justify-content-center">
      <div class="layout">
        <div class="layout__header">
          <div v-if="error" class="error-message card">
            <div class="card-body">
              {{ error }}
            </div>
          </div>
          <h1 class="layout__title">Ingresar a Zeleris</h1>
        </div>
        <form @submit.prevent="iniciarSesion" class="login__form">
          <div class="form__group">
            <input v-model="email" type="email" class="form__input" name="email" required placeholder="Email">
            <label for="email" class="form__label">Email</label>
          </div>
          <div class="form__group">
            <input v-model="password" type="password" class="form__input" name="contraseña" required
              placeholder="Contraseña">
            <label for="contraseña" class="form__label">Contraseña</label>
          </div>
          <div class="recover text-end m-0 p-0">
            <a href="ForgotPassword" class="form__recover d-inline-block mb-2 mt-0">Recuperar contraseña</a>
          </div>
          <button type="submit" class="form__button">Continuar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.img__container {
  pointer-events: none;
  position: absolute;
  height: 100px;
  width: 100px;
}

.form__recover {

  text-align: right;
  transition: all 200ms ease-in-out;
  margin: 1rem 0;
  text-decoration: underline;
}

.form__recover:hover {
  color: #FCBF12;
}

.background {
  width: 100%;
  height: 100vh;
}

.content {
  height: 100%
}

.layout {
  width: 450px;
  height: auto;
  padding: 3rem;

  position: relative;
  border-radius: 6px;
  box-shadow: var(--bs-box-shadow);
}

.layout__title {
  font-weight: 700;
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 4rem;
}

.form__group {
  position: relative;
  margin-bottom: 2.5rem;

}

.form__input {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
  border: none;
  border-bottom: 1px solid var(--grayy);
  position: relative;
  width: 100%;
  display: block;
  font-size: 1rem;
  padding: 1rem 3rem 1rem 1.5rem;
  border-radius: 6px;
  outline: none;
}

.form__label {
  position: absolute;
  top: 1rem;
  left: 1.5rem;

  transition: all 250ms ease-in-out;
  pointer-events: none;
}

.form__input:focus~label,
.form__input:not(:placeholder-shown)~label {
  top: -2rem;
  left: 0;
  z-index: 1;
  color: var(--principal-color);
}

.form__input::-webkit-input-placeholder {
  color: transparent;
}

.form__input::-moz-placeholder {
  color: transparent;
}

.form__button {
  border: none;
  width: 100%;
  cursor: pointer;
  padding: 1rem 3rem;
  font-size: 1.3rem;
  background-color: var(--grayy);
  color: var(--white-color);
  border-radius: 6px;
  transition: all 200ms linear;
}

.form__button:hover {
  background-color: var(--principal-color);
}

.form__button:active {
  background-color: var(--grayy);
}

.error-message {
  border: 1px solid #ff0000;
  border-radius: 0.25rem;
  background-color: #dc3545;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  margin-top: 10px;
  text-align: center;
}

.card-body {
  padding: 1rem;
  color: #ffffff;
}

/* Estilos para la ventana de carga */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.spinner {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 4px solid #ffffff;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
