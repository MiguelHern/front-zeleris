<script setup>
import {onMounted, ref} from 'vue';
import { APIS } from "@/api/adminService.js";
import {allPolices} from "@/api/allService.js";

const showModalEdit = ref(false);
const showModalNew = ref(false);
const description = ref('');

const toggleModalEdit = () => {
    showModalEdit.value = !showModalEdit.value;
};

const toggleModalNew = () => {
    showModalNew.value = !showModalNew.value;
};

const newPolice = async () => {
    const createdDate = new Date().toISOString();
    const response = await APIS.newPolice(description.value, createdDate);
    console.log(response);
};

const polices = ref([]);

onMounted(async () => {
    const { data, success, error: fetchError } = await allPolices();
    if (success) {
        polices.value = data.data;
    } else {
        error.value = fetchError;
    }
});
</script>



<template>
    <div class="accordion" id="accordionExample">
    </div>
    <div class="layout">
        <div class="lay p-4">
            <header>
                <h1 class="header__title text-center">
                    Políticas
                </h1>
            </header>
            <div class="main">
                <div class="main__header text-end">
                    <button class="btn btn__new d-inline-block" @click="toggleModalNew">Generar nueva política</button>
                </div>
                <section class="main__policies w-100">
                        <div v-for="(police, index) in polices" :key="police.id" class="accordion" :id="'accordionExample' + index">
                            <div class="accordion-item">
                                <div class="accordion-header d-flex" :id="'heading' + index">
                                    <div class="accordion-button d-flex justify-content-end" type="button" :data-bs-toggle="'collapse'" :data-bs-target="'#collapse' + index" :aria-expanded="index === 0 ? 'true' : 'false'" :aria-controls="'collapse' + index">
                                        Política {{ police.id }}
                                            <i class="bi bi-pencil-square"></i>
                                            <i class="bi bi-trash3-fill"></i>
                                    </div>
                                </div>
                                <div :id="'collapse' + index" class="accordion-collapse collapse" :class="index === 0 ? 'show' : ''" :aria-labelledby="'heading' + index" :data-bs-parent="'#accordionExample' + index">
                                    <div class="accordion-body">
                                        {{ police.description }}
                                    </div>
                                </div>
                            </div>
                        </div>
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
            <form>
                <textarea class="form-control modal__edit-text" ref="myTextarea"></textarea>
                <div class="buttons__edit">
                    <button @click="toggleModalEdit" class="btn__cancel btn">Cancelar</button>
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
            <form @submit.prevent="newPolice">
                <textarea v-model="description" class="form-control modal__edit-text"></textarea>
                <div class="buttons__edit">
                    <button @click="toggleModalNew" class="btn__cancel btn">Cancelar</button>
                    <input type="submit" class="btn btn__submit" value="Guardar" />
                </div>
            </form>
        </div>
    </div>
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