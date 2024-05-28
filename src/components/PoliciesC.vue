<script setup>
import Footer from "@/components/Footer.vue";
import { onMounted, ref } from 'vue';

import { allPolices } from '@/api/allService.js';
const error = ref(null);
const polices = ref([]);
const showModalEdit = ref(false);
const selectedPolicyId = ref(null);
const description = ref('');

onMounted(async () => {
    const { data, success, error: fetchError } = await allPolices();
    if (success) {
        polices.value = data.data;
    } else {
        error.value = fetchError;
    }
});

const toggleModalEdit = (id, currentDescription) => {
    selectedPolicyId.value = id;
    description.value = currentDescription;
    showModalEdit.value = !showModalEdit.value;
};
</script>

<template>

  <div class="layout">
    <div class="lay p-4">
      <header class="mb-2">
        <h1 class="header__title text-center">
          Políticas
        </h1>
      </header>
      <div class="main navbar-nav-scroll">
        <section class="main__policies w-100 d-flex flex-wrap">
            <div class="col-lg-3 col-md-6 col-sm-12 policie" v-for="police in polices" :key="police.id">
                <div class="card  m-1" role="button" @click="toggleModalEdit(police.id, police.description)">
                    <p class="card-body">
                        {{police.description}}
                    </p>
                </div>
            </div>
        </section>
      </div>
    </div>
  </div>
    <div v-if="showModalEdit" class="modal">
        <div class="modal-content">
            <div class="close__modal">
                <span class="close" @click="toggleModalEdit">&#x2716;</span>
            </div>
            <h3 class="text-center">Política</h3>
            <div>
                <textarea v-model="description" class="form-control modal__edit-text" readonly></textarea>
            </div>
        </div>
    </div>

</template>


<style scoped>
.card{
    height: 250px;
}
.card-body{

    overflow: hidden;
    max-width: 300px;
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
    margin: 8% auto;
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
    height: 400px;
    margin: 20px 0;
    resize: none;
    box-shadow: var(--bs-box-shadow-inset);
}
</style>