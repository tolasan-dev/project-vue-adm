<template>
    <teleport to="body">
        <div class="modal fade show d-block" tabindex="-1" style="background-color: rgba(0,0,0,0.5);"
            @click.self="close">
            <div class="modal-dialog modal-dialog-centered" :class="sizeClass">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{ title }}</h5>
                        <button type="button" class="btn-close" @click="close"></button>
                    </div>
                    <div class="modal-body">
                        <slot name="body"></slot>
                    </div>
                    <div class="modal-footer">
                        <slot name="footer"></slot>
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
    title: String,
    size: { type: String, default: "" },
});

const emit = defineEmits(["close"]);

const close = () => emit("close");

const sizeClass = computed(() => (props.size ? `modal-${props.size}` : ""));
</script>
<style scoped>
/* Custom Modern Modal Styles */
.modal-content {
    border: none !important;
    border-radius: 16px !important;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    overflow: hidden;
}

.modal-header {
    border-bottom: 1px solid #f3f4f6;
    padding: 1.25rem 1.5rem !important;
    background-color: #ffffff;
}

.modal-title {
    font-weight: 600;
    color: #111827;
    font-size: 1.125rem;
}

.modal-body {
    padding: 1.5rem !important;
    color: #4b5563;
    line-height: 1.5;
}

.modal-footer {
    border-top: 1px solid #f3f4f6;
    padding: 1rem 1.5rem !important;
    background-color: #f9fafb;
    /* Light gray background for the footer */
}

/* Better Backdrop Effect */
.modal.show {
    backdrop-filter: blur(4px);
    /* Modern frosted glass effect */
    transition: all 0.3s ease;
}

/* Style the close button */
.btn-close {
    font-size: 0.8rem;
    opacity: 0.5;
    transition: opacity 0.2s;
}

.btn-close:hover {
    opacity: 1;
}
</style>