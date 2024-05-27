<template>
    <div class="container-profile">
        <div class="carta">
            <h1>Bienvenido {{ nombreCompleto }}</h1>
            <div class="perfil">
                <i class="display-1 bi bi-person-circle"></i>
            </div>

            <form class="formulario">
                <div class="columna">
                    <div class="inputs">
                        <input type="text" id="nombre" placeholder=" " :value="nombreCompleto" readonly>
                        <label for="nombre">Nombre completo</label>
                    </div>
                    <div class="inputs">
                        <input type="email" id="email" placeholder=" " :value="correoElecP" readonly>
                        <label for="email">Correo Electrónico</label>
                    </div>
                    <div class="inputs">
                        <input type="text" id="matricula" placeholder=" " :value="matriculaP" readonly>
                        <label for="matricula">Matricula</label>
                    </div>
                </div>
                <div class="columna">
                    <div class="inputs">
                        <input type="text" id="happydate" placeholder=" " :value="fechaNacimientoP" readonly>
                        <label for="ciudad">Fecha de nacimiento</label>
                    </div>
                    <div class="inputs">
                        <input type="text" id="permisos" placeholder=" " :value="cantPermisosP" readonly>
                        <label for="permisos">Cantidad de permisos económicos restantes</label>
                    </div>
                    <div class="inputs">
                        <img :src="fileDigitalP" alt="Firma digital" v-if="fileDigitalP" style="max-width: 200px; max-height: 110px; padding-top: 30px; margin-top: -25px;">
                        <label for="pais" style="margin-left: -15px; font-size: 12px; color: #1B365D;">Firma digital</label>
                    </div>
                </div>
                <div class="botones">
                    <button>Cambiar contraseña <i id="changePassIcon" class="bi bi-lock-fill"></i> </button>
                    <label for="file" id="fileInput" role="button" @click="triggerFileInput">Editar firma digital
                        <input type="file" id="frontFInput" accept="image/*" @change="handleFileInputChange"
                               ref="fileInput"></input>
                        <i id="editFirmaIcon" class="bi bi-file-earmark-text-fill"></i>
                    </label>
                </div>
            </form>
        </div>
        <!-- Popup Modal -->
        <div v-if="showModal" class="modalSEFir" @click.self="closeModal">
            <form @submit.prevent="editarFirma">
                <div class="modalSEFir-content">
                    <span class="close" @click="closeModal">&times;</span>
                    <img :src="imagePreview" alt="Vista previa de la firma digital" />
                    <div class="d-flex flex-column justify-content-center">
                        <button id="modalSEFir-botton" type="submit">Guardar</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import EditFirmaDigital from "@/scripts/EditFirmaDigital";
import PerfilEmployees from "@/scripts/PerfilEmployees";
import router from "@/router/index.js";

export default {
    data() {
        return {
            signatureBase64: '',
            showModal: false,
            imagePreview: null,
            nombreCompleto: '',
            matriculaP: '',
            fechaNacimientoP: '',
            fileDigitalP: '',
            cantPermisosP: '',
            perEm: new PerfilEmployees()
        };
    },
    async mounted() {
        console.log(import.meta.env.VITE_APP_API_URL);

        const userData= await this.perEm.perEmployees();
        this.nombreCompleto= userData.data.name;
        this.matriculaP= userData.data.matricula;
        this.correoElecP= userData.data.email;
        this.fechaNacimientoP = userData.data.birthDate;
        this.cantPermisosP= userData.data.quantityPermissions;
        //this.fileDigitalP= userData.data.signature;
        this.fileDigitalP= `data:image/png;base64,${userData.data.signature}`;
    },
    methods: {
        async editarFirma() {
            const editF = new EditFirmaDigital();
            const token = localStorage.getItem('token'); // Obtén el token del almacenamiento local

            if (!token) {
                console.error('No token found');
                return;
            }

            try {
                const respuesta = await editF.editarFirma(this.signatureBase64, token);
                this.closeModal();
                location.reload()
            } catch (error) {
                console.error('Error en la solicitud:', error);
                // Maneja el error de alguna manera, por ejemplo, muestra un mensaje al usuario
            }
        },

        triggerFileInput() {
            this.$refs.fileInput.click();
        },
        handleFileInputChange(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.signatureBase64 = e.target.result.split(',')[1]; // Guarda la imagen en base64 sin el encabezado de data URL
                    this.imagePreview = e.target.result;
                    this.showModal = true;
                };
                reader.readAsDataURL(file);
            }
        },
        closeModal() {
            this.showModal = false;
            this.imagePreview = null;
        }
    }
}
</script>

<style scoped>


i[id="editFirmaIcon"],
i[id="changePassIcon"] {
    padding-left: 6px;
}

input[id="frontFInput"] {
    display: none;
}

/* Modal Styles */
.modalSEFir {
    display: flex;
    position: fixed;
    z-index: 4;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.4);
    justify-content: center;
    align-items: center;

}

.modalSEFir-content {
    background-color: #fefefe;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    max-width: 500px;
    position: relative;
    margin-left: 11%;
}

.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}

.modal img {
    width: 100%;
    height: auto;
}

.container-profile {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 70px);
    margin: 0;
}

.carta {
    position: relative;
    width: 60%;
    padding: 20px;
    margin-top: -50px;
    border: 2px solid #fff;
    border-radius: 10px;
    background-color: #f9f9f9;
    text-align: center;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

.carta h1 {
    color: #333;
}

.carta p {
    color: #a9a9a9;
    line-height: 1.6;
}

.formulario {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 20px;
}

.formulario .columna {
    flex: 0 1 calc(50% - 10px);
    /* Ajustar el ancho de la columna */
    margin-bottom: 20px;
}

.formulario .inputs {
    margin-bottom: 15px;
    position: relative;
    margin-right: 18px;
}

.formulario .inputs input {
    width: calc(100% - 24px);
    /* Ajustar el ancho del input */
    padding: 15px;
    margin-bottom: 20px;
    border: 1px solid #1B365D;
    border-radius: 10px;
}

.formulario .inputs input:focus {
    border-color: #FCBF12;
    outline: none;
}

.formulario .inputs label {
    position: absolute;
    top: 10px;
    left: 10px;
    margin-bottom: 5px;
    font-weight: bold;
    color: #333;
    pointer-events: none;
    transition: all 0.3s ease;
}

.formulario .inputs input:focus+label,
.formulario .inputs input:not(:placeholder-shown)+label {
    top: -15px;
    left: 0;
    font-size: 12px;
    color: #1B365D;
}

.botones {
    display: flex;
    justify-content: center;
    flex: 0 1 100%;
    /* Ajustar el ancho de los botones */
}

button[id="modalSEFir-botton"]{
    display: flex;
    text-align: center;
    align-self: center;
    padding: 10px 50px 10px 50px;
    margin-top: 15px;
    border: none;
    border-radius: 5px;
    background-color: #1B365D;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.botones button,
.botones label[id="fileInput"]{
    padding: 10px 10px;
    margin: -10px 10px;
    border: none;
    border-radius: 5px;
    background-color: #1B365D;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.botones button:hover,
.botones label[id="fileInput"]:hover,
button[id="modalSEFir-botton"]:hover {
    background-color: #385979;
}

/* Estilos para la foto de perfil circular */
.perfil {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto 20px;
    /* Centro y espacio debajo */
}

.perfil img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

</style>