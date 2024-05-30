<script setup>

import Profile from "@/components/Profile.vue";
</script>

<template>
    <div class="contenedor__router p-3">
        <div class="card router__card">
            <profile></profile>
        </div>
    </div>
</template>

<style scoped>
.contenedor__router {
    height: calc(100vh - 100px);
}
.router__card{
    background-color: #F5F5F5;
    height: 100%;
}
</style>