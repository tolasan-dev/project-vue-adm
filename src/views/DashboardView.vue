<template class="bg-primary">
    <div>
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h1>All Articles</h1>
            <div>
                <base-button @click="createArticle">Create Article</base-button>
            </div>
        </div>
        <div class="row">
            <div class="col-md-4 mb-4" v-for="art in articles" :key="art.id">
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
let articles = ref([]);
function createArticle() {
    router.push({ name: 'article.create' })
}
onMounted(async () => {
    await artStore.getAllArticle();
    // console.log()
    articles.value = artStore.articles;
})
function handleReadMore() {
    alert();
}
// let article = reactive([
//     {
//         id: 1,
//         title: "Understanding Vue 3 Composition API",
//         thumbnail: "https://via.placeholder.com/400x200",
//         content: "The Composition API is a set of additive, function-based APIs that allow flexible composition of component logic in Vue.js 3...",
//         avatar: "https://via.placeholder.com/40",
//         creatorName: "Jane Doe"
//     },
//     {
//         id: 1,
//         title: "Understanding Vue 3 Composition API",
//         thumbnail: "https://via.placeholder.com/400x200",
//         content: "The Composition API is a set of additive, function-based APIs that allow flexible composition of component logic in Vue.js 3...",
//         avatar: "https://via.placeholder.com/40",
//         creatorName: "Jane Doe"
//     },
//     {
//         id: 1,
//         title: "Understanding Vue 3 Composition API",
//         thumbnail: "https://via.placeholder.com/400x200",
//         content: "The Composition API is a set of additive, function-based APIs that allow flexible composition of component logic in Vue.js 3...",
//         avatar: "https://via.placeholder.com/40",
//         creatorName: "Jane Doe"
//     }
// ])
</script>