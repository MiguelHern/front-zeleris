<script setup>
import Footer from "@/components/Footer.vue";
import { onMounted, ref } from 'vue';

const showModalEdit = ref(false);
const showModalNew = ref(false);

const toggleModalEdit = () => {
  showModalEdit.value = !showModalEdit.value;
};

const toggleModalNew = () => {
  showModalNew.value = !showModalNew.value;
};

import { allPolices } from '@/api/allService.js';
const error = ref(null);
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

  <div class="layout">
    <div class="lay p-4">
      <header>
        <h1 class="header__title text-center">
          Políticas
        </h1>
      </header>
      <div class="main">
        <section class="main__policies w-100">
          <table class="table shadow-sm">
            <thead>
            <tr>
              <th scope="col" class="col-12"></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="police in polices" :key="police.id" class="list__polices">
              <td class="" >
                <p class="polices__police">{{police.description}}</p>
              </td>
            </tr>
            </tbody>
          </table>
        </section>
      </div>
    </div>
    <Footer></Footer>
  </div>

  <!--Ventana emergente para ver política-->

  <!--Ventana emergente para agregar política-->
</template>


<style scoped>
.list__polices{
  cursor: pointer;
}
.polices__police{
  transition: color 200ms ease-in-out;
}
.list__polices:hover .polices__police{
  color: var(--principal-color);
}
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
  overflow: auto;
  scrollbar-width: thin;
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