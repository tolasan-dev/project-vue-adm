<template>
    <nav class="navbar navbar-dark bg-dark px-3 fixed-top">
        <button @click="statuesModal.sidebarStatus()" class="btn btn-outline-light me-3">
            <i class="bi bi-list"></i>
        </button>

        <span class="navbar-brand mb-0 h5">Portfolio</span>

        <div class="ms-auto d-flex align-items-center">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3huDmE3x5hdBP-cxyCMEc65XkDHpK_s2ogw&s"
                class="rounded-circle me-2 img-fluid" alt="avatar" width="40" height="40" />
            <span class="text-white">Admin</span>
        </div>
    </nav>
</template>
<script setup>
import { useSideStatusStore } from '@/stores/sidebarStatus';
const statuesModal = useSideStatusStore();
</script>