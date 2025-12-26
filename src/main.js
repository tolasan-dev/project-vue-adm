import { createApp } from "vue";
import { createPinia } from "pinia";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import BaseButton from "./components/ui/base/BaseButton.vue";
import BaseInput from "./components/ui/base/BaseInput.vue";
import BaseModal from "./components/ui/base/BaseModal.vue";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.component("base-button", BaseButton);
app.component("BaseInput", BaseInput);
app.component("BaseModal", BaseModal);

app.mount("#app");
