<template>
  <nav class="nav">
    <div class="nav__header">
      <h1 class="header__text">
        Bandeja de entrada
      </h1>
    </div>
    <ul class="list">
      <!-- Primer menú desplegable -->
      <li class="list__item list__item--click">
        <div class="list__button list__button-click">
          <a href="#" class="nav__link" id="toggleButton1">Ing. en sistemas computacionales</a>
          <i class="bi bi-chevron-double-right list__arrow"></i>
        </div>
        <ul class="list__show">
          <li class="list__inside list__item--click"> <!-- Agregamos la clase list__item--click para hacerlo clickeable -->
            <a href="#" class="nav__link--inside" id="toggleSubmenu1">Hoy</a>
            <ul class="list__sub-menu">
              <li class="list__sub-item">
                <a href="#" class="nav__link--sub-item">Submenú 1</a>
              </li>
            </ul>
          </li>
          <li class="list__inside list__item--click">
            <a href="#" class="nav__link--inside" id="toggleSubmenu2">Semana pasada</a>
            <ul class="list__sub-menu">
              <li class="list__sub-item">
                <a href="#" class="nav__link--sub-item">Submenú 4</a>
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li class="list__item list__item--click">
        <div class="list__button list__button-click">
          <a href="#" class="nav__link" id="toggleButton1">Ing. civil y administración</a>
          <i class="bi bi-chevron-double-right list__arrow"></i>
        </div>
        <ul class="list__show">
          <li class="list__inside list__item--click"> <!-- Agregamos la clase list__item--click para hacerlo clickeable -->
            <a href="#" class="nav__link--inside" id="toggleSubmenu1">Hoy</a>
            <ul class="list__sub-menu">
              <li class="list__sub-item">
                <a href="#" class="nav__link--sub-item">Submenú 1</a>
              </li>
            </ul>
          </li>
          <li class="list__inside list__item--click">
            <a href="#" class="nav__link--inside" id="toggleSubmenu2">Semana pasada</a>
            <ul class="list__sub-menu">
              <li class="list__sub-item">
                <a href="#" class="nav__link--sub-item">Submenú 4</a>
              </li>
            </ul>
          </li>
          <li class="list__inside list__item--click">
            <a href="#" class="nav__link--inside" id="toggleSubmenu2">Antiguos</a>
            <ul class="list__sub-menu">
              <li class="list__sub-item">
                <a href="#" class="nav__link--sub-item">Submenú 4</a>
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li class="list__item list__item--click">
        <div class="list__button list__button-click">
          <a href="#" class="nav__link" id="toggleButton1">Ing. en energía</a>
          <i class="bi bi-chevron-double-right list__arrow"></i>
        </div>
        <ul class="list__show">
          <li class="list__inside list__item--click"> <!-- Agregamos la clase list__item--click para hacerlo clickeable -->
            <a href="#" class="nav__link--inside" id="toggleSubmenu1">Hoy</a>
            <ul class="list__sub-menu">
              <li class="list__sub-item">
                <a href="#" class="nav__link--sub-item">Submenú 1</a>
              </li>
            </ul>
          </li>
          <li class="list__inside list__item--click">
            <a href="#" class="nav__link--inside" id="toggleSubmenu2">Semana pasada</a>
            <ul class="list__sub-menu">
              <li class="list__sub-item">
                <a href="#" class="nav__link--sub-item">Submenú 4</a>
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li class="list__item list__item--click">
        <div class="list__button list__button-click">
          <a href="#" class="nav__link" id="toggleButton1">Ing. mecatrónica</a>
          <i class="bi bi-chevron-double-right list__arrow"></i>
        </div>
        <ul class="list__show">
          <li class="list__inside list__item--click"> <!-- Agregamos la clase list__item--click para hacerlo clickeable -->
            <a href="#" class="nav__link--inside" id="toggleSubmenu1">Hoy</a>
            <ul class="list__sub-menu">
              <li class="list__sub-item">
                <a href="#" class="nav__link--sub-item">Submenú 1</a>
              </li>
            </ul>
          </li>
          <li class="list__inside list__item--click">
            <a href="#" class="nav__link--inside" id="toggleSubmenu2">Semana pasada</a>
            <ul class="list__sub-menu">
              <li class="list__sub-item">
                <a href="#" class="nav__link--sub-item">Submenú 4</a>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<style>
.nav {
  width: 340px;
}
.nav__header{
  width: 100%;
  margin: 10px;
  padding: 10px;
  text-align: center;
  background-color: var(--principal-color);
  color: var(--white-color);
  border-radius: 6px;
}
.header__text{
  font-size: 1.6rem;
}
.nav__link {
  display: block;
  padding: 15px 0;

}
.nav__link--inside {
  width: 100%;
  border-radius: 6px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 2px 5px 3px rgba(0, 0, 0, 0.1);
  margin: 3px 0;
}
.nav__link--sub-item{
  border: 1px solid rgba(0,0,0,0);
  border-radius: 6px;
  margin: 4px 0;
}
.nav__link--sub-item:hover{
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 2px 5px 3px rgba(0, 0, 0, 0.1);
}
.list {
  padding: 0 10px;
  width: 100%;
  height: 100vh;
}
.list__item {
  padding: 5px;
  margin: 10px 0;
  border-radius: 6px;
  width: 100%;
  text-align: center;
  overflow: hidden;
  box-shadow: 2px 5px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.list__item:hover{
  transform: translateY(-2px);
  box-shadow: 2px 8px 3px rgba(0, 0, 0, 0.3);

}
.list__item--click {
  cursor: pointer;
}
.list__button {

  display: flex;
  align-items: center;
  gap: 1em;
  width: 90%;
  margin: 0 auto;
}
.list__arrow {
  transition: transform 300ms ease-in-out;
  margin-left: auto;
}
.list__show {
  width: 100%;
  margin-left: auto;
  /* border-left: 2px solid var(--principal-color); */ /* Comentar o quitar esta línea para evitar la línea azul en el menú principal */
  transition: height 0.4s;
  height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
}
.list__sub-menu {
  border-left: 2px solid var(--principal-color); /* Agregar el borde izquierdo azul al submenú */
  height: 0;
  overflow: hidden;
  transition: height 0.1s;
}

.show-menu {
  height: auto;
}
.rotate-arrow {
  transition: all 150ms ease-in-out;
  transform: rotate(90deg);
}
.show-submenu {
  height: auto;
}

</style>

<script>
document.addEventListener("DOMContentLoaded", function() {
  // Seleccionar todos los botones de menú
  var toggleButtons = document.querySelectorAll(".list__item--click");

  // Iterar sobre cada botón de menú
  toggleButtons.forEach(function(button) {
    // Obtener el menú desplegable asociado a este botón
    var menuList = button.querySelector(".list__show");
    // Obtener la flecha asociada a este botón
    var arrowIcon = button.querySelector(".list__arrow");

    // Escuchar el evento de clic en el botón
    button.addEventListener("click", function(event) {
      // Detener la propagación del evento para evitar que se cierre el menú principal al hacer clic en los submenús
      event.stopPropagation();
      // Alternar la clase para mostrar/ocultar el menú desplegable
      menuList.classList.toggle("show-menu");
      // Alternar la clase para girar la flecha
      arrowIcon.classList.toggle("rotate-arrow");
    });
  });

  // Seleccionar todos los botones de submenú
  var toggleSubmenus = document.querySelectorAll("[id^='toggleSubmenu']");

  // Iterar sobre cada botón de submenú
  toggleSubmenus.forEach(function(submenuButton) {
    // Obtener el submenú desplegable asociado a este botón
    var submenuList = submenuButton.nextElementSibling;

    // Ocultar el submenú inicialmente
    submenuList.classList.remove("show-submenu");

    // Escuchar el evento de clic en el botón de submenú
    submenuButton.addEventListener("click", function(event) {
      // Detener la propagación del evento para evitar que se cierre el menú principal
      event.stopPropagation();
      // Alternar la clase para mostrar/ocultar el submenú desplegable
      submenuList.classList.toggle("show-submenu");
    });
  });
});
</script>
