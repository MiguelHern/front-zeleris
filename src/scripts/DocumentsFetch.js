import axios from 'axios';

export default class DocumentsFetch {
  constructor() {
    // No es necesario configurar opciones comunes de Axios aquí, pero puedes hacerlo si lo deseas.
  }

  async login() {
    try {
      const token = localStorage.token;

      const response = await axios.get(`${import.meta.env.VUE_APP_API_URL}/Documents`, {
        headers: {
          Authorization: `Bearer ${token}` // Agregar el token como un header de autorización
        },
        // Se pueden agregar otros headers si son necesarios
      });
      return response.data;
    } catch (error) {
      console.error('Error al realizar la petición:', error);
      throw error;
    }
  }
}

   // Ejemplo de uso:
  /*const authService = new DocumentsFetch();
  
  authService.login()
    .then(data => {
      console.log('Respuesta del servidor:', data);
    })
    .catch(error => {
      console.error('Error en la solicitud:', error);
    });*/