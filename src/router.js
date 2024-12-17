import { createMemoryHistory, createRouter } from 'vue-router'
import CreateCodeReview from './views/CreateCodeReview.vue'
import ViewCodeReview from './views/ViewCodeReview.vue'
import HomeReview from './views/HomeReview.vue'

const routes = [
  { path: '/', component: HomeReview },
  { path: '/create', component: CreateCodeReview },
  { path: '/view', component: ViewCodeReview },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router;