<template>
  <nav class="navbar navbar-expand navbar-modern fixed-top px-5">
    <!-- Sidebar toggle -->
    <button
      @click="statuesModal.sidebarStatus()"
      class="btn btn-icon me-3"
      aria-label="Toggle sidebar"
    >
      <i class="bi bi-list"></i>
    </button>

    <!-- Brand -->
    <span class="navbar-brand fw-semibold">Portfolio</span>
    <!-- User -->
    <div class="ms-auto d-flex align-items-center position-relative user-info">
      <!-- Trigger -->
      <div class="user-menu d-flex align-items-center" @click="toggleMenu">
        <img :src="userImg" class="avatar" alt="avatar" />
        <span class="username ms-2">{{ userName }}</span>
        <i class="pi pi-angle-down ms-1"></i>
      </div>

      <!-- Dropdown -->
      <div v-show="showMenu" class="dropdown-menu-custom">
        <a
          class="dropdown-item p-2 rounded-3"
          href="#"
          style="color: #1c1917; font-weight: 500"
        >
          <i class="pi pi-user me-2"></i> Profile
        </a>
        <a
          class="dropdown-item p-2 rounded-3"
          href="#"
          style="color: #1c1917; font-weight: 500"
        >
          <i class="pi pi-cog me-2"></i> Settings
        </a>
        <div class="dropdown-divider"></div>
        <a class="dropdown-item text-danger fw-medium p-2 rounded-3" href="#">
          <i class="pi pi-sign-out me-2"></i> Logout
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useSideStatusStore } from "@/stores/sidebarStatus";
import { useAuthStore } from "@/stores/auth";

const statuesModal = useSideStatusStore();
const authStore = useAuthStore();

/* dropdown state */
const showMenu = ref(false);

/* ✅ safer user data */
const userName = computed(() => {
  const user = authStore.user;
  return user ? `${user.firstName} ${user.lastName}` : "User";
});

const userImg = computed(() => {
  return authStore.user?.avatar || "/default-avatar.png";
});

/* toggle dropdown */
const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};

/* close when clicking outside */
const handleClickOutside = (e) => {
  if (!e.target.closest(".user-info")) {
    showMenu.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

/* actions */
const goProfile = () => {
  console.log("Go to profile");
  showMenu.value = false;
};

const goSettings = () => {
  console.log("Go to settings");
  showMenu.value = false;
};

const logout = () => {
  authStore.logout();
  showMenu.value = false;
};
</script>

<style scoped>
.user-menu {
  cursor: pointer;
  padding: 6px 10px;
  border-radius: 8px;
  transition: background-color 0.2s ease;
}

.user-menu:hover {
  background-color: var(--bs-secondary-bg);
}

.avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  object-fit: cover;
}

.username {
  font-weight: 500;
  color: var(--bs-body-color);
}

.user-menu {
  cursor: pointer;
  padding: 6px 10px;
  border-radius: 8px;
  transition: background-color 0.2s ease;
}

.user-menu:hover {
  background-color: var(--bs-secondary-bg);
}

.avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  object-fit: cover;
}

.username {
  font-weight: 500;
  color: var(--bs-body-color);
}

.dropdown-menu-custom {
  position: absolute;
  top: 110%;
  right: 0;
  min-width: 200px;
  background: var(--bs-body-bg);
  border: 1px solid var(--bs-border-color);
  border-radius: 10px;
  padding: 6px 0;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
  z-index: 1000;
}

.dropdown-menu-custom .dropdown-item {
  padding: 10px 16px;
  font-size: 14px;
  display: flex;
  align-items: center;
  background: transparent;
  border: 0;
  width: 100%;
}

.dropdown-menu-custom .dropdown-item:hover {
  background-color: var(--bs-secondary-bg);
}

.dropdown-divider {
  margin: 6px 0;
}
</style>
