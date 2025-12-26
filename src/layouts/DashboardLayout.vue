<template>
    <div class="admin-layout">
        <Navbar />
        <Sidebar />

        <!-- Main Content -->
        <main class="mt-5" :class="sideStatus.isStatus ? 'content' : 'content expanded'">
            <router-view></router-view>
        </main>
    </div>
</template>

<script setup>
import Navbar from '@/components/layout/Navbar.vue';
import Sidebar from '@/components/layout/Sidebar.vue';
import { useSideStatusStore } from '@/stores/sidebarStatus';
const sideStatus = useSideStatusStore();
</script>

<style scoped>
.admin-layout {
    min-height: 100vh;
}

.content {
    margin-left: 140px;
    padding: 1.5rem;
    transition: margin-left 0.3s ease;
}

.content.expanded {
    margin-left: -100px;
}
</style>