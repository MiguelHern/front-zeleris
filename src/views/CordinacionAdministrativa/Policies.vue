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
        <div class="main__header text-end">
          <button class="btn btn__new d-inline-block" @click="toggleModalNew">Generar nueva política</button>
        </div>
        <section class="main__policies w-100">
          <table class="table shadow-sm">
            <thead>
            <tr>
              <th scope="col" class="col-10"></th>
              <th scope="col" class="col-1"></th>
              <th scope="col" class="col-1 text-center"></th>
            </tr>
            </thead>
            <tbody>
            <tr class="align-content-center">
              <td class="">
                <span class="">Deberá informar cuando sea posible debido a que aja se portó mal porque debió haber ido.....</span>
              </td>
              <td class="align-content-center text-center" role="button" @click="toggleModalEdit">
                <i class="bi bi-pencil-square"></i>
              </td>
              <td class="align-content-center text-center" role="button">
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
      <form>
        <textarea class="form-control modal__edit-text"></textarea>
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