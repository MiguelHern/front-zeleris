import axios from 'axios';

export default class AuthFetch {
    constructor() {
      // No es necesario configurar opciones comunes de Axios aquí, pero puedes hacerlo si lo deseas.
    }
  
    async login(email, password) {
      try {
        const response = await axios.post(`${import.meta.env.VITE_APP_API_URL}/Accounts/Login`, {
          email: email,
          password: password
        });
        return response.data;
      } catch (error) {
        console.error('Error al realizar la petición:', error);
        throw error;
      }
    }
  }
  
  // Ejemplo de uso:
  //const authService = new AuthService();
  
  /*const email = "al066225@uacam.mx";
  const password = "chan28";
  
  authService.login(email, password)
    .then(data => {
      console.log('Respuesta del servidor:', data);
    })
    .catch(error => {
      console.error('Error en la solicitud:', error);
    });*/