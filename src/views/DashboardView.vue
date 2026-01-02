<template class="bg-primary">
    <div>
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h1>All Articles</h1>
            <div>
                <base-button @click="createArticle">Create Article</base-button>
            </div>
        </div>
        <div class="row">
            <div class="col-md-4 mb-4" v-for="art in artStore.articles" :key="art.id">
                <ArticleCard :id="art.id" :title="art.title" :thumbnail="art.thumbnail" :content="art.content"
                    :avatar="art.avatar" :creatorName="art.creatorName" />
            </div>
        </div>
    </div>
</template>
<script setup>
import ArticleCard from '@/components/common/ArticleCard.vue';
import { useArtitleStore } from '@/stores/article';
const artStore = useArtitleStore();
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
// let articles = ref([]);
function createArticle() {
    router.push({ name: 'article.create' })
}
onMounted(async () => {
    await artStore.getAllArticle();
    // articles.value = artStore.articles;
    console.log("dashboardArt:", artStore.articles)
    console.log(artStore.isLoadding);
})
function handleReadMore() {
    alert();
}
</script>