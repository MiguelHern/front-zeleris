<template>
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

const API_BASE_URL = import.meta.env.VITE_MANAGER_API_URL;
const token = localStorage.getItem('token');

// Creamos una referencia reactiva para almacenar los documentos pendientes
const pendingDocuments = ref([]);

// Utilizamos el hook onMounted para realizar la solicitud GET cuando el componente se monte
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
