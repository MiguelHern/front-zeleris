<script setup>

</script>

<template>
    <div class="d-flex flex-column">
        <div class="d-flex justify-content-center gap-4 mt-1">
            <div class="settings card p-2">
                <router-link :to="{ name: 'Settings' }">Perfil</router-link>
            </div>
            <div class="settings  card p-2">
                <router-link :to="{ name: 'Permiso' }">Solicitar Permiso</router-link>
            </div>
            <div class="settings  card p-2">
                <router-link :to="{ name: 'Historial' }">Historial</router-link>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<style scoped>
.settings{
    text-align: center;
    width: 140px;
}
</style>