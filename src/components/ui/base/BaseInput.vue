<template>
    <div class="class">
        <label v-if="label" :for="id" class="form-label">{{ label }}</label>
        <input :type="type" :id="id" :value="modelValue" :placeholder="placeholder"
            :class="['form-control', { 'is-invalid': error }]" :disabled="disabled"
            @input="$emit('update:modelValue', $event.target.value)" />
        <div v-if="error" class="invalid-feedback">{{ error }}</div>
    </div>
</template>
<script setup>
const props = defineProps({
    modelValue: [String, Number],
    label: String,
    placeholder: String,
    id: String,
    type: { type: String, default: "text" },
    error: String,
    disabled: { type: Boolean, default: false },
})
const emit = defineEmits(["update:modelValue", "changeInput"])
</script>
<style scoped>
.form-control.is-invalid {
    border-color: var(--bs-form-invalid-border-color);
    padding-right: calc(1.5em + .75rem);
    background: none !important;
    background-repeat: no-repeat;
    background-position: right calc(.375em + .1875rem) center;
    background-size: calc(.75em + .375rem) calc(.75em + .375rem);
}
</style>