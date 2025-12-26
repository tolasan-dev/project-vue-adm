import Login from "@/authentication/Login.vue";
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import ArticleCreateVue from "@/views/article/ArticleCreateVue.vue";
import ArticleListView from "@/views/article/ArticleListView.vue";
import DashboardView from "@/views/DashboardView.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: DashboardLayout,
      children: [
        {
          path: "",
          name: "dashboard",
          component: DashboardView,
          meta: { title: "Dashboard" },
        },
        {
          path: "article",
          name: "article",
          children: [
            {
              path: "",
              name: "article.index",
              component: ArticleListView,
              meta: { title: "Aricle-List" },
            },
            {
              path: "create",
              name: "article.create",
              component: ArticleCreateVue,
              meta: { title: "Aricle-Create" },
            },
          ],
        },
      ],
    },
    {
      path: "/login",
      component: Login,
      name: "login",
      meta: { title: "Login" },
    },
  ],
});

router.beforeEach((to, from) => {
  document.title = to.meta.title ? to.meta.title + " - My Admin" : "My Admin";
  return true;
});

export default router;
