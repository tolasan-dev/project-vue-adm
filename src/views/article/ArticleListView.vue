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
        <div v-if="isModal">
            <base-modal title="Delete Article?" @close="isModal = false">
                <template #body>
                    Are you sure ?
                </template>
                <template #footer>
                    <base-button @click="handleDelete" :isLoading="isLoadingDelete">
                        Delete
                    </base-button>
                </template>
            </base-modal>
        </div>
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
import { onMounted, ref } from 'vue';
import { useArtitleStore } from '@/stores/article';
import { useRouter } from 'vue-router';
const articleStore = useArtitleStore();
const router = useRouter();

let isModal = ref(false);
let selectId = ref(null);
let isLoadingDelete = ref(false);

onMounted(async () => {
    await articleStore.getOwnArticle();
})

// for create colunm table th
const columns = [
    { key: 'title', label: 'Title' },
    { key: 'category', label: 'Category' },
    { key: 'content', label: 'Content' },
];

// handle edit article 
const onEdit = (id) => {

    router.push({ name: 'edit.article', params: { id } })
}

const onDelete = (id) => {
    console.log("Article Delete :", id);
    selectId.value = id;
    isModal.value = true;
}

// delete article
const handleDelete = async () => {
    if (!selectId.value) return;
    try {
        isLoadingDelete.value = true;
        await articleStore.deleteArticle(selectId.value);
        await articleStore.getOwnArticle();
        isModal.value = false;

        // clear id after delete
        selectId.value = null;
        isLoadingDelete.value = false;
    }
    catch (err) {
        console.log(err);
    }
}
</script>