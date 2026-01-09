<template>
  <div>
    <div>
      <h1>Article Edit</h1>
    </div>
    <div>
      <ArticleForm ref="articleFormRef" />
      <base-button
        @click="handleUpdateArticle"
        :isLoading="isLoading"
        class="mt-3"
      >
        Update Article
      </base-button>
    </div>
  </div>
</template>

<script setup>
import ArticleForm from "@/components/form/ArticleForm.vue";
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useArticleStore } from "@/stores/article";

const router = useRouter();
const route = useRoute();
const articleStore = useArticleStore();

const articleFormRef = ref(null);
const id = Number(route.params.id);
const isLoading = ref(false);

onMounted(async () => {
  if (!articleFormRef.value) return;

  await articleStore.getArticleById(id);
  // form.categoryId = articleStore.article.category?.id;
  if (!articleStore.article) return;

  const article = articleStore.article;
  const formRef = articleFormRef.value;

  // Fill normal fields
  formRef.formData.title = article.title ?? "";
  formRef.formData.categoryId = article.category?.id ?? "";
  formRef.formData.content = article.content ?? "";

  // ✅ CORRECT IMAGE HANDLING
  formRef.formData.thumbnail = null;
  formRef.existingThumbnail = article.thumbnail ?? null;
});

const handleUpdateArticle = async () => {
  const formRef = articleFormRef.value;
  if (!formRef || !formRef.validateForm()) return;

  try {
    isLoading.value = true;

    const form = formRef.formData;

    const data = new FormData();
    data.append("title", form.title.trim());
    data.append("categoryId", form.categoryId);
    data.append("content", form.content.trim());

    // ✅ ONLY send image if user selected a new one
    // if (form.thumbnail) {
    //   data.append("thumbnail", form.thumbnail);
    // }

    await articleStore.updateArticle(id, data);

    router.push({ name: "article.index" });
  } catch (err) {
    console.error("Update failed:", err);
  } finally {
    isLoading.value = false;
  }
};
</script>
