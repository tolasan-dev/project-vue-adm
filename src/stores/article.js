import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import api from "@/api/api";

export const useArtitleStore = defineStore("article", () => {
  let articles = ref([]);
  let article = ref(null);
  let my_article = ref([]);

  let isLoadding = ref(false);
  let my_loading = ref(false);

  //   get all article
  const getAllArticle = async () => {
    try {
      isLoadding.value = true;
      const res = await api.get("/articles");
      // console.log(res.data.data.items);
      articles.value = res.data.data.items;
      console.log("articles", articles);
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
      article.value = res.data.data;
      // console.log("aArtice:", article.value);
    } catch (error) {
      console.log(error);
    }
  };

  // get own article
  const getOwnArticle = async () => {
    try {
      my_loading.value = true;
      const res = await api.get(`/articles/own`);
      // console.log("Own Article: ", res.data.data.items);
      my_article.value = res.data.data.items;
      my_loading.value = false;
    } catch (err) {
      console.log(err);
    } finally {
      console.log("Success");
    }
  };
  return {
    getAllArticle,
    getArticleById,
    getOwnArticle,
    my_article,
    my_loading,
    isLoadding,
    articles,
    article,
  };
});
