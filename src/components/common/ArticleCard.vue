<template>
    <div class="card article-card">
        <!-- Image Section -->
        <div class="card-image-wrapper">
            <img v-if="thumbnail" :src="thumbnail" class="card-img-top" :alt="title" />
            <div v-else class="card-img-placeholder">
                <i class="bi bi-image"></i>
            </div>
        </div>

        <!-- Card Body -->
        <div class="card-body">
            <h5 class="card-title">{{ title }}</h5>
            <p class="card-text text-muted">{{ content }}</p>

            <!-- Author Info -->
            <div class="author-info d-flex align-items-center gap-2 mb-3">
                <img v-if="avatar" :src="avatar" class="author-avatar" :alt="creatorName" />
                <div v-else class="author-avatar-placeholder">
                    <i class="bi bi-person"></i>
                </div>
                <span class="author-name text-sm">{{ creatorName }}</span>
            </div>

            <!-- Action Button -->
            <RouterLink :to="{ name: `article.detail`, params: { id } }" class="btn btn-primary w-100">
                Read Article
            </RouterLink>
        </div>
    </div>
</template>

<script setup>
defineProps({
    id: {
        type: [String, Number],
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        default: null,
    },
    content: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: null,
    },
    creatorName: {
        type: String,
        required: "",
    },
});
</script>

<style scoped>
.article-card {
    border: none;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    overflow: hidden;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.article-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 24px rgba(87, 114, 249, 0.2);
}

/* Image Section */
.card-image-wrapper {
    position: relative;
    overflow: hidden;
    height: 200px;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.card-img-top {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.card-img-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    font-size: 3rem;
    color: rgba(87, 114, 249, 0.3);
}

/* Theme Badge */
.badge-theme {
    position: absolute;
    top: 12px;
    right: 12px;
    background-color: var(--btn-default);
    color: white;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

/* Card Body */
.card-body {
    padding: 1.5rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}

.card-title {
    font-size: 1.1rem;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 0.75rem;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.card-text {
    font-size: 0.9rem;
    line-height: 1.5;
    margin-bottom: 1rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    color: #6c757d;
}

/* Author Info */
.author-info {
    margin-top: auto;
    padding-top: 1rem;
    border-top: 1px solid #f0f0f0;
}

.author-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid var(--btn-default);
}

.author-avatar-placeholder {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--btn-default);
    font-size: 1.25rem;
}

.author-name {
    font-weight: 600;
    color: #1a1a1a;
    font-size: 0.9rem;
}

/* Button */
.btn-primary {
    background-color: var(--btn-default);
    border: none;
    border-radius: 8px;
    font-weight: 600;
    padding: 0.65rem 1.25rem;
    transition: all 0.3s ease;
    margin-top: auto;
}

.btn-primary:hover {
    background-color: var(--btn-hover);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(87, 114, 249, 0.3);
}

.btn-primary:active {
    transform: translateY(0);
}

/* Responsive */
@media (max-width: 576px) {
    .card-body {
        padding: 1rem;
    }

    .card-title {
        font-size: 1rem;
    }

    .card-text {
        font-size: 0.85rem;
    }
}
</style>