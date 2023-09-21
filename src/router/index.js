import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: '/statistics',
  },
  {
    path: '/statistics',
    meta: {
      name: '项目数据统计'
    },
    component: () => import('../page/statistics/index.vue')
  },
  {
    path: '/statistics/details',
    meta: {
      name: '项目详情'
    },
    component: () => import('../page/statistics/details.vue')
  },
  {
    path: '/parkingStat',
    meta: {
      name: '车场统计'
    },
    component: () => import('../page/statistics/parkingStat/index.vue')
  },
  {
    path: '/deviceStat',
    meta: {
      name: '设备统计'
    },
    component: () => import('../page/statistics/deviceStat/index.vue')
  },
  {
    path: '/revenueTrend',
    meta: {
      name: '营收趋势'
    },
    component: () => import('../page/statistics/revenueTrend/index.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    meta: {
      name: 'Not Found'
    },
    component: () => import('../components/404.vue')
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;