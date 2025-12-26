<template>
    <button :type="statusType" :class="`btn btn-${variants}`" :disabled="isDisable || isLoading" @click="handleClick">
        <span v-if="isLoading" class="spinner-border spinner-border-sm me-2"></span>
        <slot></slot>
    </button>
</template>
<script setup>
const props = defineProps({
    variants: { type: String, default: "primary" },
    isLoading: { type: Boolean, default: false },
    isDisable: { type: Boolean, default: false },
    statusType: { type: String, default: "button" },
});

const emit = defineEmits(["click"]);

const handleClick = () => {
    if (!props.isDisable && !props.isLoading) {
        emit("click");
    }
}
</script>