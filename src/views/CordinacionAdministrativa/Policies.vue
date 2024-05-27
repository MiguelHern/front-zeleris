<script setup>
import Footer from "@/components/Footer.vue";
import { onMounted, ref } from 'vue';
import { APIS } from "@/api/adminService.js";
import { allPolices } from "@/api/allService.js";

const showModalEdit = ref(false);
const showModalNew = ref(false);
const description = ref('');
const selectedPolicyId = ref(null);
const error = ref(null);
const loading = ref(true);

const toggleModalEdit = (id, currentDescription) => {
    selectedPolicyId.value = id;
    description.value = currentDescription;
    showModalEdit.value = !showModalEdit.value;
};

const toggleModalNew = () => {
    showModalNew.value = !showModalNew.value;
};

const newPolice = async () => {
    const createdDate = new Date().toISOString();
    const response = await APIS.newPolice(description.value, createdDate);
    console.log(response);
    showModalNew.value = false;
    await loadPolicies();
};

const editPolice = async () => {
    const response = await APIS.editPolice(selectedPolicyId.value, description.value);
    if (response.success) {
        showModalEdit.value = false;
        console.log('Política editada con éxito:', response.data);
        await loadPolicies();
    } else {
        console.error('Error al editar la política:', response.data);
        error.value = response.data;
    }
};

const deletePolice = async (id) => {
    if (confirm('¿Estás seguro de que deseas eliminar esta política?')) {
        const response = await APIS.deletePolice(id);
        if (response.success) {
            console.log('Política eliminada con éxito:', response.data);
            await loadPolicies();
        } else {
            console.error('Error al eliminar la política:', response.data);
            error.value = response.data;
        }
    }
};

const polices = ref([]);

const loadPolicies = async () => {
    loading.value = true
    const { data, success, error: fetchError } = await allPolices();
    if (success) {
        polices.value = data.data;
        loading.value = false;
    } else {
        console.error('Error al obtener las políticas:', fetchError);
        error.value = fetchError;
    }
};

onMounted(async () => {
    await loadPolicies();
});
</script>

<template>
    <div class="accordion" id="accordionExample"></div>
    <div class="layout">
        <div class="lay p-4">
            <header>
                <h1 class="header__title text-center">Políticas</h1>
            </header>
            <div class="main">
                <div class="main__header text-end">
                    <button class="btn btn__new d-inline-block" @click="toggleModalNew">Generar nueva política</button>
                </div>
                <section class="main__policies w-100">
                    <table class="table shadow-sm">
                        <thead>
                        <tr>
                            <th scope="col" class="col-10">Descripción</th>
                            <th scope="col" class="col-1">Editar</th>
                            <th scope="col" class="col-1">Eliminar</th>
                        </tr>
                        </thead>
                        <i v-if="loading" class="c-inline-spinner"></i>
                        <tbody>
                        <tr v-for="police in polices" :key="police.id" class="align-content-center">
                            <td>
                                <p>{{ police.description }}</p>
                            </td>
                            <td class="align-content-center text-center" role="button" @click="toggleModalEdit(police.id, police.description)">
                                <i class="bi bi-pencil-square"></i>
                            </td>
                            <td class="align-content-center text-center" role="button" @click="deletePolice(police.id)">
                                <i class="bi bi-trash3-fill"></i>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
    </div>

    <!--Ventana emergente para modificar política-->
    <div v-if="showModalEdit" class="modal">
        <div class="modal-content">
            <div class="close__modal">
                <span class="close" @click="toggleModalEdit">&#x2716;</span>
            </div>
            <h3 class="text-center">Modificar política</h3>
            <form @submit.prevent="editPolice">
                <textarea v-model="description" class="form-control modal__edit-text"></textarea>
                <div class="buttons__edit">
                    <button type="button" @click="toggleModalEdit" class="btn__cancel btn">Cancelar</button>
                    <input type="submit" class="btn btn__submit" value="Guardar" />
                </div>
            </form>
        </div>
    </div>

    <!--Ventana emergente para agregar política-->
    <div v-if="showModalNew" class="modal">
        <div class="modal-content">
            <div class="close__modal">
                <span class="close" @click="toggleModalNew">&#x2716;</span>
            </div>
            <h3 class="text-center">Agregar política</h3>
            <form @submit.prevent=" newPolice">
                <textarea v-model="description" class="form-control modal__edit-text"></textarea>
                <div class="buttons__edit">
                    <button type="button" @click="toggleModalNew" class="btn__cancel btn">Cancelar</button>
                    <input type="submit" class="btn btn__submit" value="Guardar" />
                </div>
            </form>
        </div>
    </div>
    <Footer></Footer>
</template>




<style scoped>
.btn__new{
    background-color: var(--grayy);
    color: var(--white-color);
}
.btn__new:hover{
    background-color: var(--principal-color);
}
.bi{
    transition: color 200ms ease-in-out;
}
td:hover .bi{
    color: var(--secondary-color);
}

.modal {
    display: block!important;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.4);

}

.modal-content {
    background-color: #fefefe;
    margin: 12% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 50%;
}
.close__modal{
    text-align: right;
}
.close {
    text-align: right;
    color: #aaa;
    font-size: 28px;
    font-weight: bold;
}
.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}
.modal__edit-text{
    height: 200px;
    margin: 20px 0;
    resize: none;
    box-shadow: var(--bs-box-shadow-inset);
}
.buttons__edit{
    display: flex;
    justify-content: space-around;
}
.btn__cancel{
    background-color: var(--grayy);
    color: var(--white-color);
}
.btn__cancel:hover{
    background-color: var(--cancel-red);
}
.btn__submit{
    background-color: #758CA3;
    color: var(--white-color);
}
.btn__submit:hover{
    background-color: var(--principal-color);
}
</style>