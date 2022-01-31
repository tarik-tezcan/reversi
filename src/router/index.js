import { createRouter, createWebHistory } from 'vue-router';
import Rules from '@/views/Rules.vue';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/rules',
    name: 'Rules',
    component: Rules,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
