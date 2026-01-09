import { defineStore } from "pinia";
import api from "@/api/api";
import { ref } from "vue";

export const useCategoryStore = defineStore("category", () => {
  const categories = ref([]);
  const isLoading = ref(false);

  const fetchCategories = async () => {
    try {
      isLoading.value = true;
      const res = await api.get("/categories");
      console.log(res.data.data.item);
      categories.value = res.data.data.items;
    } catch (err) {
      console.error("Error fetching categories:", err);
    } finally {
      isLoading.value = false;
    }
  };


  // method for handle deleted category by id
 
  const DeleteCategory = async (id) => {
    console.log(id);
    try {
      delete_loading.value = true;
      const res = await api.delete("/categories/" + id);
      console.log(res.data);
      delete_loading.value = false;
    } catch (err) {
      console.log("delete category err:", err);
    }
  };
  return { categories, isLoading, fetchCategories, DeleteCategory, };
});
