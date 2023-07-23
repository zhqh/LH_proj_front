// import { createRouter, createWebHistory, createWebHashHistory, Router } from 'vue-router';
import { createRouter, createWebHashHistory, Router } from 'vue-router';
import routes from './routes';
import { useUserStore } from '/@/store/modules/user';
import { setLang } from '/@/i18n';

const router: Router = createRouter({
  history: createWebHashHistory(),
  // history: createWebHistory('/'),
  routes: routes,
});

router.beforeEach(async (_to, _from, next) => {
  const userStore = useUserStore();
  if (!userStore.token) {
    //未登录情况下，如果访问非公开页面则统一跳转到登录页面
    if (_to.path != '/login' && _to.path != '/forget' && _to.path != '/register') {
      next('/login');
      return;
    }
  } else {
    setLang(userStore.getUserInfo.language);
    if (_to.path == '/login' || _to.path == '/forget' || _to.path == '/register') {
      //已经登录则统一跳转首页
      next('/home');
      return;
    }
    if (_to.path == '/stcreate') {
      //如果ApiKey没有配置，则调整到配置界面
      next();
      return;
    }
  }
  next();
});

export default router;
