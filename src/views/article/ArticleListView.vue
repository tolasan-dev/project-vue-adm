<template>
    <div>
        <!-- bar top -->
        <div class="d-flex justify-content-between">
            <div>
                <h1>All Article</h1>
            </div>
            <RouterLink :to="{ name: 'article.create' }">
                <base-button>Create Article</base-button>
            </RouterLink>
        </div>

        <!-- body list all own article -->
        <div>
            <base-table :columns="columns" :items="articleStore.my_article" :isLoading="articleStore.my_loading"
                @edit="onEdit" @delete="onDelete">
                <template #column-title="{ item }">
                    <span class="fw-medium line-clamp-1 ">{{ item.title }}</span>
                </template>
                <template #column-category="{ item }">
                    <span class="fw-medium">
                        {{ item.category?.name }}
                    </span>
                </template>
                <template #columns-content="{ item }">
                    <span class=" line-clamp-1 w-70">{{ item.content }}</span>
                </template>
            </base-table>
        </div>
    </div>
</template>
<script setup>
import { onMounted } from 'vue';
import { useArtitleStore } from '@/stores/article';
const articleStore = useArtitleStore();
// articleStore.getOwnArticle();
// console.log("ownArticle:", articleStore.ownArticle)
onMounted(async () => {
    await articleStore.getOwnArticle();
})
const columns = [
    { key: 'title', label: 'Title' },
    { key: 'category', label: 'Category' },
    { key: 'content', label: 'Content' },
];

// handle edit article 
const onEdit = (id) => {
    console.log("Article Edit : ", id);
}

const onDelete = (id) => {
    console.log("Article Delete :", id);
}
</script>