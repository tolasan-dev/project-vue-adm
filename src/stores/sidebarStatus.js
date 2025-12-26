import { defineStore } from "pinia";
import { ref } from "vue";

export const useSideStatusStore = defineStore("sidebarStatus", () => {
  let isStatus = ref(true);
  function sidebarStatus() {
    console.log(isStatus.value);
    isStatus.value = !isStatus.value;
    console.log(isStatus.value);
  }
  return { isStatus, sidebarStatus };
});
