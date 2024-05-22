<template>
    <div class="container-profile">
        <div class="carta">
            <h1>Bienvenido <span>{{employee.name}}</span></h1>
            <div class="perfil">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="">
            </div>

            <form class="formulario">
                <div class="columna">
                    <div class="inputs">
                        <input v-model="employeeFullName" type="text" id="nombre" placeholder=" " readonly>
                        <label for="nombre">Nombre Completo</label>
                    </div>
                    <div class="inputs">
                        <input type="email" id="email" placeholder=" " value="heribeuribe@uacam.mx" readonly>
                        <label for="email">Correo Electrónico</label>
                    </div>
                    <div class="inputs">
                        <input type="tel" id="telefono" placeholder=" " value="981 123 4567" readonly>
                        <label for="telefono">Teléfono</label>
                    </div>
                </div>
                <div class="columna">
                    <div class="inputs">
                        <input type="text" id="happydate" placeholder=" " value="12/09/1986" readonly>
                        <label for="ciudad">Fecha de nacimiento</label>
                    </div>
                    <div class="inputs">
                        <input type="text" id="firma" placeholder=" " value="File" readonly>
                        <label for="pais">Firma digital</label>
                    </div>
                    <div class="inputs">
                        <input type="text" id="permisos" placeholder=" " value="1" readonly>
                        <label for="permisos">Cantidad de permisos económicos restantes</label>
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
        <div v-if="showModal" class="modal" @click.self="closeModal">
            <form @submit.prevent="editarFirma">
                <div class="modal-content">
                    <span class="close" @click="closeModal">&times;</span>
                    <img :src="imagePreview" alt="Vista previa de la firma digital" />
                    <button type="submit">Guardar</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useEmployee } from "@/api/teacherService.js";
import EditFirmaDigital from "@/scripts/EditFirmaDigital";

export default {
    name: 'ProfileComponent',
    setup() {
        const { employee } = useEmployee();

        // Computed property to concatenate name and last name
        const employeeFullName = computed(() => {
            return `${employee.value.name} ${employee.value.lastName}`;
        });

        // Reactive data properties
        const signatureBase64 = ref('');
        const showModal = ref(false);
        const imagePreview = ref(null);

        const editarFirma = async () => {
            const editF = new EditFirmaDigital();
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('No token found');
                return;
            }
            try {
                const respuesta = await editF.editarFirma(signatureBase64.value, token);
                console.log('Respuesta del servidor:', respuesta.signatureBase64);
                closeModal();
            } catch (error) {
                console.error('Error en la solicitud:', error);
            }
        };

        const triggerFileInput = () => {
            fileInput.value.click();
        };

        const handleFileInputChange = (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    signatureBase64.value = e.target.result.split(',')[1];
                    imagePreview.value = e.target.result;
                    showModal.value = true;
                };
                reader.readAsDataURL(file);
            }
        };

        const closeModal = () => {
            showModal.value = false;
            imagePreview.value = null;
        };

        return {
            employee,
            employeeFullName,
            signatureBase64,
            showModal,
            imagePreview,
            editarFirma,
            triggerFileInput,
            handleFileInputChange,
            closeModal
        };
    }
};
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
.modal {
    display: flex;
    position: fixed;
    z-index: 1;
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

.modal-content {
    background-color: #fefefe;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    max-width: 500px;
    position: relative;
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
    height: 100vh;
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

.botones button,
.botones label[id="fileInput"] {
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
.botones label[id="fileInput"]:hover {
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