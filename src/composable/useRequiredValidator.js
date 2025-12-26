import { reactive } from "vue";
export function useRequiredValidator() {
  const errors = reactive({});
  console.log(errors);
  const validateField = (field, value, message) => {
    errors[field] = value ? "" : message;
    console.log(!errors[field]);
    return !errors[field];
  };
  return { errors, validateField };
}
