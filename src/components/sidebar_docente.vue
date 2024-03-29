<script setup>

</script>

<template>
  <aside class="layout__aside">
        <ul class="menu__list">
          <li class="menu__option">
            <a href="index.html" class="menu__link menu__link--active">
              <i class="menu__icon bi bi-person-circle"></i>
              <span class="menu__overlay">Inicio</span>
            </a>
          </li>

          <li class="menu__option">
            <a href="about-me.html" class="menu__link">
              <i class="menu__icon bi bi-folder2"></i>
              <span class="menu__overlay">Permisos</span>
            </a>
          </li>

          <li class="menu__option">
            <a href="portfolio.html" class="menu__link ">
              <i class="menu__icon bi bi-journal-x"></i>
              <span class="menu__overlay">Políticas</span>
            </a>
          </li>
        </ul>
        <div class="menu__option menu__option-logout">
            <a href="#" class="menu__link">
              <i class="menu__icon bi bi-box-arrow-right"></i>
            </a>
        </div>
  </aside>
</template>

<style>
.menu__option-logout{
  display: flex;
  justify-content: center;
}
.layout__aside{
  position: relative;
  border-right: 1px solid var(--grayy);
  width: 60px;
  height: 100vh;
  min-height: 100vh;
}
.menu__list{
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0; /* Eliminar el margen predeterminado de la lista */
  padding: 0;
  align-items: center;
}
.menu__overlay{
  position: absolute;
  left: 0;
  margin-top: -3rem;
  padding: 0.5rem 1rem;
  display: block;
  color: var(--principal-color);
  opacity: 0;
  background-color: var(--secondary-color);
  white-space: nowrap;
  transition: all 300ms ease-in-out;
  z-index: 3;
}
.menu__option:hover .menu__overlay{
  opacity: 1;
  left: 100%;
}
.menu__icon{
  color: var(--grayy);
  font-size: 2.4rem;
  transition: all 300ms ease-in-out;
}
.menu__option:hover .menu__icon,
.menu__link--active .menu__icon{
  color: var(--principal-color);
}

</style>

