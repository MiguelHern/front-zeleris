<script>
import AuthFetch from "../scripts/AuthFetch";

export default {
    data() {
        return {
            email: '',
            password: '',
            error: '',
            loading: false
        };
    },

    methods: {
        async iniciarSesion() {
            const auth = new AuthFetch();
            this.loading = true; // Mostrar la ventana de carga

            try {
                const respuesta = await auth.login(this.email, this.password);

                if (respuesta.success) {
                    localStorage.token = respuesta.data.token;
                    localStorage.rol = respuesta.data.rol;
                    localStorage.username = respuesta.data.usearname;
                    localStorage.setItem('name_Coordination', respuesta.data.name_Coordination);
                    localStorage.expiredTime = respuesta.data.expiredTime;

                    if (localStorage.rol === 'Docente') {
                        this.$router.replace('/TeachersHome');
                    } else if (localStorage.rol === 'Coordinador') {
                        this.$router.replace('/CordinationHome');
                    } else if (localStorage.rol === 'Admin') {
                        this.$router.replace('/AdminHome');
                    } else if (localStorage.rol === 'Director') {
                        this.$router.replace('/PrincipalHome');
                    } else {
                        this.$router.replace('/');
                    }
                } else {
                    // Si la respuesta tiene success = false, mostrar el mensaje de error del backend
                    this.error = respuesta.message;
                }

            } catch (error) {
                console.error('Error en la solicitud:', error);
                // En caso de error en la solicitud, verificar si hay un mensaje específico del backend
                if (error.response && error.response.data && error.response.data.message) {
                    this.error = error.response.data.message;
                } else {
                    this.error = 'Ambos datos son incorrectos'; // Mensaje genérico en caso de error desconocido
                }
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
            <img src="/src/assets/img/UACLogo.jpg" class="logouac" style="max-width: 75px; max-height: 75px;">

        </div>
        <div class="content d-flex flex-column align-items-center justify-content-center">
            <div class="layout card">
                <div v-if="error" class="alert alert-danger text-center" role="alert">
                    <i class="bi bi-exclamation-triangle-fill"></i> ¡{{ error }}!
                </div>
                <div class="logoContainer">
                    <img src="/src/assets/img/ISCLogo.jpg" class="logoisc" style="max-width: 85px; max-height: 85px;">
                </div>
                <div class="layout__header">
                    <h1 class="layout__title">Ingresar a Zeleris</h1>
                </div>
                <form @submit.prevent="iniciarSesion" class="login__form">
                    <div class="form__group">
                        <input v-model="email" type="email" class="form__input card form-control" name="email" required
                            placeholder="Email">
                        <label for="email" class="form__label">Email</label>
                    </div>
                    <div class="form__group">
                        <input v-model="password" type="password" class="form__input card form-control" name="contraseña" required
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
.logouac {
    margin-left: 20px;
    margin-top: -80px;
    text-align: start;
    justify-self: flex-start;
}

.logoContainer {
    display: flex;
    flex-direction: column;
}

.logoisc {
    align-self: center;
    margin-bottom: 15px;
}

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
    text-decoration: none;
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
    background-color: var(--white-color);
    position: relative;
    border-radius: 6px;
    box-shadow: var(--bs-box-shadow-sm);
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
    padding: 0.8rem 3rem;
    font-size: 1.3rem;
    background-color: var(--principal-color);
    color: var(--white-color);
    border-radius: 6px;
    transition: all 200ms linear;
}

.form__button:hover {
    background-color: var(--grayy);
}

.form__button:active {}

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
