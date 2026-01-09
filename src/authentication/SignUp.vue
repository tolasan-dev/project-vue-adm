<!-- Signup.vue -->
<template>
  <div class="auth-page signup-page">
    <base-toast v-if="isShowToast" :message="messToast" @close="handleToast" />

    <div class="auth-card">
      <div class="auth-header">
        <div class="logo-wrapper">
          <!-- <img src="@/assets/logo.svg" alt="Logo" class="logo-img" /> -->
        </div>
        <h1>Create Account</h1>
        <p>Join us and get started today</p>
      </div>

      <form @submit.prevent="handleSignup" class="auth-form">
        <base-input
          id="fullName"
          v-model="fullName"
          label="Full name"
          placeholder="John Doe"
          :error="errors.fullName"
          @blur="validateField('fullName', fullName, 'Full name is required')"
        />

        <base-input
          id="email"
          v-model="email"
          label="Email address"
          type="email"
          placeholder="you@example.com"
          :error="errors.email"
          @blur="validateEmail"
        />

        <div class="password-container">
          <base-input
            id="password"
            v-model="password"
            label="Password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="••••••••"
            :error="errors.password"
            @blur="validatePassword"
          />
          <button
            type="button"
            class="password-toggle"
            @click="showPassword = !showPassword"
          >
            <i
              class="bi"
              :class="showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'"
            ></i>
          </button>
        </div>

        <div class="password-container">
          <base-input
            id="confirmPassword"
            v-model="confirmPassword"
            label="Confirm password"
            :type="showConfirmPassword ? 'text' : 'password'"
            placeholder="••••••••"
            :error="errors.confirmPassword"
            @blur="validateConfirmPassword"
          />
          <button
            type="button"
            class="password-toggle"
            @click="showConfirmPassword = !showConfirmPassword"
          >
            <i
              class="bi"
              :class="showConfirmPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'"
            ></i>
          </button>
        </div>

        <base-button
          type="submit"
          :label="isLoading ? '' : 'Create Account'"
          :loading="isLoading"
          class="submit-btn"
        >
          <template #loading> Creating... </template>
        </base-button>
      </form>

      <div class="switch-auth">
        <p>
          Already have an account?
          <router-link to="/login">Sign in</router-link>
        </p>
      </div>
    </div>

    <div class="background-decoration"></div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useRequiredValidator } from "@/composable/useRequiredValidator";

import BaseButton from "@/components/ui/base/BaseButton.vue";
import BaseInput from "@/components/ui/base/BaseInput.vue";

const router = useRouter();
const auth = useAuthStore();

const fullName = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const isLoading = ref(false);
const isShowToast = ref(false);
const messToast = ref("");

const { errors, validateField } = useRequiredValidator();

const validateEmail = () =>
  validateField("email", email.value, "Email is required");

const validatePassword = () => {
  validateField("password", password.value, "Password is required");
  if (password.value.length < 8) {
    errors.password = "Password must be at least 8 characters";
    return false;
  }
  return true;
};

const validateConfirmPassword = () => {
  validateField(
    "confirmPassword",
    confirmPassword.value,
    "Please confirm your password"
  );
  if (password.value !== confirmPassword.value) {
    errors.confirmPassword = "Passwords do not match";
    return false;
  }
  return true;
};

const validateForm = () => {
  let valid = true;
  if (!validateField("fullName", fullName.value, "Full name is required"))
    valid = false;
  if (!validateEmail()) valid = false;
  if (!validatePassword()) valid = false;
  if (!validateConfirmPassword()) valid = false;
  return valid;
};

async function handleSignup() {
  if (!validateForm()) return;

  try {
    isLoading.value = true;
    await auth.register({
      fullName: fullName.value.trim(),
      email: email.value.trim(),
      password: password.value,
    });

    // Auto-login after success (optional)
    await auth.login({ email: email.value, password: password.value });
    await auth.fetchProfile();

    router.push("/");
  } catch (err) {
    messToast.value = err?.response?.data?.message || "Registration failed";
    isShowToast.value = true;
  } finally {
    isLoading.value = false;
  }
}

function handleToast() {
  isShowToast.value = false;
}
</script>

<!-- Login.vue and Signup.vue - use the same <style scoped> block -->

<style scoped>
.auth-page {
  min-height: 100dvh;
  display: grid;
  place-items: center;
  /* background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); */
  position: relative;
  padding: 1.5rem;
  overflow: hidden;
}

.background-decoration {
  position: absolute;
  inset: 0;
  background: radial-gradient(
      circle at 15% 20%,
      rgba(255, 255, 255, 0.12) 0%,
      transparent 40%
    ),
    radial-gradient(
      circle at 80% 70%,
      rgba(255, 255, 255, 0.08) 0%,
      transparent 45%
    );
  pointer-events: none;
}

.auth-card {
  width: 100%;
  max-width: 420px;
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 2.5rem 2.25rem;
  box-shadow: 0 20px 50px -15px rgba(0, 0, 0, 0.18),
    0 0 0 1px rgba(255, 255, 255, 0.15) inset;
  border: 1px solid rgba(255, 255, 255, 0.25);
  position: relative;
  z-index: 2;
  animation: fadeInUp 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}

.auth-header {
  text-align: center;
  margin-bottom: 2.25rem;
}

.auth-header h1 {
  font-size: 2.125rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 0.5rem;
  letter-spacing: -0.025em;
}

.auth-header p {
  color: #6b7280;
  margin: 0;
  font-size: 0.975rem;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.password-container {
  position: relative;
}

.password-toggle {
  position: absolute;
  right: 1.125rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #9ca3af;
  font-size: 1.3rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: color 0.2s ease;
}

.password-toggle:hover {
  color: #6366f1;
}

.options-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  color: #4b5563;
  margin-top: -0.25rem;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  user-select: none;
}

.remember-me input {
  accent-color: #6366f1;
}

.forgot-link {
  color: #6366f1;
  text-decoration: none;
  font-weight: 500;
}

.forgot-link:hover {
  text-decoration: underline;
}

.switch-auth {
  text-align: center;
  margin-top: 2rem;
  color: #6b7280;
  font-size: 0.925rem;
}

.switch-auth a {
  color: #6366f1;
  font-weight: 600;
  text-decoration: none;
}

.switch-auth a:hover {
  text-decoration: underline;
}

/* Animation */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .auth-card {
    padding: 2rem 1.75rem;
    border-radius: 20px;
  }

  .auth-header h1 {
    font-size: 1.875rem;
  }
}
</style>
