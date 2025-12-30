<template>
    <div class="container py-4">
        <div class="row g-4">
            <div class="col-8">
                <div class="card">
                    <div class="card-body">
                        <h1>{{ article.title }}</h1>
                    </div>
                    <div class="card-img">
                        <img :src="article.thumbnail" alt="">
                    </div>
                    <div class="card-body">
                        <p>{{ article.content }}</p>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useArtitleStore } from '@/stores/article';
import { useRoute } from 'vue-router';
const ArtitleStore = useArtitleStore();
const route = useRoute();
let article = ref(null);
onMounted(async () => {
    // console.log()
    await ArtitleStore.getArticleById(route.params.id);
    // ArtitleStore.article;
    article.value = ArtitleStore.article;
    console.log(article.value)
})


// const res = await api.get(`/articles/${1}`);
// console.log("a article", res.data)

// onMounted(async () => {

// })
// let article = reactive(
//     {
//         id: 1,
//         title: "Understanding Vue 3 Composition API",
//         thumbnail: "https://via.placeholder.com/400x200",
//         content: "The Composition API is a set of additive, function-based APIs that allow flexible composition of component logic in Vue.js 3...",
//         avatar: "https://via.placeholder.com/40",
//         creatorName: "Jane Doe"
//     },
// )

</script>

<style scoped>
.article-detail {
    border: none;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
}

.card-image {
    height: 320px;
    position: relative;
    overflow: hidden;
    background: linear-gradient(135deg, #f7f9ff 0%, #e6eefc 100%);
}

.card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.image-placeholder {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(87, 114, 249, 0.25);
    font-size: 3rem;
}

.card-overlays {
    position: absolute;
    top: 12px;
    right: 12px
}

.meta-avatar {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    object-fit: cover
}

.meta-icon {
    font-size: 1.6rem;
    color: #97a0b9
}

.article-content {
    color: #343a40;
    line-height: 1.75
}

.tag-badge {
    background: #eef2ff;
    color: #2b3aeb;
    font-weight: 600
}

.author-card {
    border-radius: 12px;
    box-shadow: none
}

.author-lg {
    width: 72px;
    height: 72px;
    border-radius: 8px;
    object-fit: cover
}

/* use your root vars */
:root {
    --btn-default: #5772f9;
    --btn-hover: #5772f99d
}

.btn-primary {
    background-color: var(--btn-default);
    border: none
}

.btn-primary:hover {
    background-color: var(--btn-hover)
}

@media (max-width: 767px) {
    .card-image {
        height: 220px
    }
}
</style>