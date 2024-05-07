<script setup>
import { ref } from 'vue';

const showModalEdit = ref(false);
const showModalNew = ref(false);

const toggleModalEdit = () => {
  showModalEdit.value = !showModalEdit.value;
};

const toggleModalNew = () => {
  showModalNew.value = !showModalNew.value;
};
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
            <tr class="list__polices" @click="toggleModalEdit">
              <td class="" >
                <span class="polices__police">Deberá informar cuando sea posible debido a que aja se portó mal porque debió haber ido.....</span>
              </td>
            </tr>
            </tbody>
          </table>
        </section>
      </div>
    </div>
  </div>

  <!--Ventana emergente para ver política-->
  <div v-if="showModalEdit" class="modal">
    <div class="modal-content">
      <div class="close__modal">
        <span class="close" @click="toggleModalEdit">&#x2716;</span>
      </div>
      <h3 class="text-center">Cuidar el salón</h3>
        <div class="form-control modal__edit-text">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </div>
        <div class="buttons__edit">
          <button @click="toggleModalEdit" class="btn btn__submit">Cerrar</button>
        </div>
    </div>
  </div>

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