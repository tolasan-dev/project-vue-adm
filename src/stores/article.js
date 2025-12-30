import { ref, computed } from "vue";
import { defineStore } from "pinia";
import api from "@/api/api";

export const useArtitleStore = defineStore("article", () => {
  let articles = ref([]);
  let article = ref(null);
  let isLoadding = ref(false);

  //   get all article
  const getAllArticle = async () => {
    try {
      isLoadding.value = true;
      const res = await api.get("/articles");
      console.log(res.data.data.items);
      articles.value = res.data.data.items;
    } catch (error) {
      console.log(error);
    } finally {
      isLoadding.value = false;
    }
  };

  //   get a article by id
  const getArticleById = async (id) => {
    try {
      console.log(id);
      const res = await api.get(`/articles/${id}`);
      console.log("a article", res.data);
      article.value = res.data.data;
    } catch (error) {
      console.log(error);
    }
  };
  return {
    getAllArticle,
    getArticleById,
    isLoadding,
    articles,
    article,
  };
});
