import Vue from 'vue';
import Router from 'vue-router';
import store from './stores/store';
import appRouters from '@/routers/appRouters.ts';
import comRouters from '@/routers/comRouters.ts';
import { BASE_URL } from './app/config';
Vue.use(Router);

const router = new Router({
  mode: 'hash', // hash history
  base: BASE_URL,
  // routes,
  routes: [
    ...comRouters,
    ...appRouters,
  ],
});

const findRouterInChild = (routerInfo: { children: any[], path: string }, authPath: string): boolean => {
  if (new RegExp(routerInfo.path).test(authPath)) {
    return true;
  }
  const children = routerInfo.children;
  if (!children || children.length <= 0) {
    return false;
  }
  return children.some((info: any) => {
    return findRouterInChild(info, authPath);
  });
};

router.beforeEach((to, from, next) => {
  if (!to.meta.needAuth) {
    next();
    return;
  }
  const goPath = to.path;
  const routers = (store.state as any).userInfo.router;
  const isAuth = routers.some((routerInfo: any) => {
    return findRouterInChild(routerInfo, goPath);
  });
  if (isAuth) {
    next();
    return;
  }
  next('/403');
});


export default router;
