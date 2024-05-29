<script setup>

</script>

<template>
    <div class="d-flex flex-column">
        <header class="d-flex justify-content-center gap-4 p-2">
            <div class=" p-1 settings">
                <router-link :to="{ name: 'SettingsA' }">Perfil</router-link>
            </div>
            <div class=" p-1 settings">
                <router-link :to="{ name: 'PermisoA' }">Solicitar Permiso</router-link>
            </div>
            <div class=" p-1 settings">
                <router-link :to="{ name: 'HistorialA' }">Historial</router-link>
            </div>
        </header>
        <div class="router card m-3">
            <router-view></router-view>
        </div>
    </div>
</template>

<style scoped>
.settings {
    text-align: center;
    width: 140px;
    color: white;
}

header {
    background-color: #1B365D;
}
.router{
    height: calc(100vh - 180px);
}
</style>