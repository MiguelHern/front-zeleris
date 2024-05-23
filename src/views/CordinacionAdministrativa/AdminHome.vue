<template>
    <div class="w-25">
    <menu_cordinacion_administrativa></menu_cordinacion_administrativa>
    </div>
    <div>
        <!-- Aquí puedes mostrar los documentos pendientes -->
        <div v-for="document in pendingDocuments" :key="document.id">
            {{ document.name }}
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Menu_cordinacion_administrativa from "@/components/menu_cordinacion_administrativa.vue";

const API_BASE_URL = import.meta.env.VITE_MANAGER_API_URL;
const token = localStorage.getItem('token');


const pendingDocuments = ref([]);


onMounted(async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/admin/documents/pending`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        pendingDocuments.value = response.data;
    } catch (error) {
        console.error('Hubo un error al obtener los documentos pendientes:', error);
    }
});
</script>
