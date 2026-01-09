// main.js / main.ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'

// =============================================
// 1. STYLES
// =============================================
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '@/assets/main.css'

// =============================================
// 2. GLOBAL COMPONENTS
// =============================================
import BaseButton from '@/components/ui/base/BaseButton.vue'
import BaseInput from '@/components/ui/base/BaseInput.vue'
import BaseModal from '@/components/ui/base/BaseModal.vue'
import BaseToast from '@/components/ui/base/BaseToast.vue'
import BaseTable from '@/components/ui/base/BaseTable.vue'

import ArticleCardSkeleton from '@/components/common/ArticleCardSkeleton.vue'
import ArticleForm from '@/components/form/ArticleForm.vue'

// =============================================
// 3. APPLICATION & PLUGINS
// =============================================
import App from './App.vue'
import router from './router'

const app = createApp(App)

// Pinia (state management)
app.use(createPinia())

// Vue Router
app.use(router)

// =============================================
// 4. GLOBAL COMPONENT REGISTRATION
// =============================================
const globalComponents = {
  // Base UI Components (atomic / primitive)
  'base-button': BaseButton,
  'base-input': BaseInput,
  'base-modal': BaseModal,
  'base-toast': BaseToast,
  'base-table': BaseTable,

  // Domain-specific / composite components
  'article-card-skeleton': ArticleCardSkeleton,
  'article-form': ArticleForm
}

// Register all at once
Object.entries(globalComponents).forEach(([name, component]) => {
  app.component(name, component)
})

// =============================================
// 5. MOUNT
// =============================================
app.mount('#app')

// Optional: Development only helpers
if (import.meta.env.DEV) {
  console.log('App mounted in development mode')
  console.log('Global components registered:', Object.keys(globalComponents))
}
