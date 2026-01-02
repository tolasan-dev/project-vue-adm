import { createApp } from "vue";
import { createPinia } from "pinia";
// -----> style register
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@/assets/main.css";

// -----> Base Component
import BaseButton from "./components/ui/base/BaseButton.vue";
import BaseInput from "./components/ui/base/BaseInput.vue";
import BaseModal from "./components/ui/base/BaseModal.vue";
import BaseToast from "./components/ui/base/BaseToast.vue";
import ArticleCardSkeleton from "./components/common/ArticleCardSkeleton.vue";
import BaseTable from "./components/ui/base/BaseTable.vue";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

// mount component
app.component("base-button", BaseButton);
app.component("BaseInput", BaseInput);
app.component("BaseModal", BaseModal);
app.component("BaseToast", BaseToast);
app.component("ArticleCaedSkeleton", ArticleCardSkeleton);
app.component("BaseTable", BaseTable);

app.mount("#app");
