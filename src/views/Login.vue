<script>
import AuthFetch from "../scripts/AuthFetch";

export default {
  // Otros component options aquí
  data() {
    return {
      email: '',
      password: ''
    };
  },

mounted() {
  console.log(import.meta.env.VITE_APP_API_URL);
},

  methods: {
    async iniciarSesion() {
    const auth = new AuthFetch();

      try {
        // Llama al método login de AuthService
        const respuesta = await auth.login(this.email, this.password);
        console.log('Respuesta del servidor:', respuesta.data.token);
        console.log('Respuesta del servidor:', respuesta.data);
        localStorage.token = respuesta.data.token;
        localStorage.rol = respuesta.data.rol;
        localStorage.username = respuesta.data.usearname;
        localStorage.expiredTime = respuesta.data.expiredTime;       
        
        if (respuesta.success) {
          this.$router.push('/TeachersHome')
        }
        
        // Haz algo con la respuesta, por ejemplo, redirige a otra página
      } catch (error) {
        console.error('Error en la solicitud:', error);
        // Maneja el error de alguna manera, por ejemplo, muestra un mensaje al usuario
      }
    }
  }
}
</script>

<template>
  <div class="background">
    <div class="img__container">
      <img class="img__zeleris" src="/src/assets/img/Zeleris.jpg" alt="">
    </div>
    <div class="content d-flex flex-column align-items-center justify-content-center">
        <div class="layout">
          <div class="layout__header">
            <h1 class="layout__title">Ingresar a Zeleris</h1>
          </div>
          <form @submit.prevent="iniciarSesion" class="login__form">
            <div class="form__group">
              <input v-model="email" type="email" class="form__input" name="email" required placeholder="Email">
              <label for="email" class="form__label">Email</label>
            </div>
            <div class="form__group">
              <input v-model="password" type="password" class="form__input" name="contraseña" required placeholder="Contraseña">
              <label for="contraseña" class="form__label">Contraseña</label>
              <i class="eye bi bi-eye"></i>
            </div>
            <a href="ForgotPassword" class="form__recover">Recuperar contraseña</a>
            <button type="submit" class="form__button">Continuar</button>
          </form>
        </div>
    </div>
  </div>
</template>

<style scoped>
.img__container{
  pointer-events: none;
  position: absolute;
  height: 100px;
  width: 100px;
}
.eye{
  font-size: 1.2rem;
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
}
.form__recover{

  text-align: right;
  transition: all 200ms ease-in-out;
  margin: 1rem 0;
  text-decoration: underline;
}
.form__recover:hover{
  color: #FCBF12;
}
.background{
    width: 100%;
    height: 100vh;
}
.content{
  height: 100%
}
.layout{
  width: 450px;
  height: auto;
  padding: 3rem;

  position: relative;
  border-radius: 6px;
  box-shadow: var(--bs-box-shadow);
}
.layout__title{
  font-weight: 700;
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 4rem;
}
.form__group{
  position: relative;
  margin-bottom: 2.5rem;

}
.form__input
{
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
.form__label{
  position: absolute;
  top: 1rem;
  left: 1.5rem;

  transition: all 250ms ease-in-out;
  pointer-events: none;
}
.form__input:focus~label,
.form__input:not(:placeholder-shown)~label
{
  top: -2rem;
  left: 0;
  z-index: 1;
  color: var(--principal-color);
}
.form__input::-webkit-input-placeholder{
  color: transparent;
}
.form__input::-moz-placeholder{
  color: transparent;
}
.form__button{
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
.form__button:hover{
  background-color: var(--principal-color);
}
.form__button:active{
  background-color: var(--grayy);
}
</style>
