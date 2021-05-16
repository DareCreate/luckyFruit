import Layout from '@/components/Layout/Layout.vue';
export default [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/luck_fruit/user',
        name: 'user',
        component: () => import(/* webpackChunkName: "Home" */ '../pages/luck_fruit/user/user.vue'),
        meta: {
          title: '用户管理',
        },
      },

      {
        path: '/luck_fruit/tenant',
        name: 'tenant',
        component: () => import(/* webpackChunkName: "Home" */ '../pages/luck_fruit/tenant/tenant.vue'),
        meta: {
          title: '游戏设置',
        },
      },

      {
        path: '/luck_fruit/gift',
        name: 'gift',
        component: () => import(/* webpackChunkName: "Home" */ '../pages/luck_fruit/gift/gift.vue'),
        meta: {
          title: '礼品管理',
        },
      },

    ],
  },
];
