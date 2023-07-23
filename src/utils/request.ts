import router from '/@/router/index';
import axios from 'axios';
import { showToast } from 'vant';
import 'vant/es/toast/style';
import { useUserStore } from '/@/store/modules/user';

const userStore = useUserStore();
// 创建 axios 实例
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // api 的 base_url
  // baseURL: 'https://www.okx.com',
  timeout: 50000,
  headers: { 'Content-Type': 'application/json' },
});

// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么 token
    if (userStore.token) {
      config.headers['token'] = userStore.token;
    }
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

// 添加响应拦截器
service.interceptors.response.use(
  (response) => {
    // debugger;
    // 对响应数据做点什么
    const res = response.data;
    if (res.code && res.code != 0) {
      // `token` 过期或者账号已在别处登录
      if (res.code === 401) {
        showToast('你已被登出，请重新登录');
        // 清除浏览器全部临时缓存
        userStore.clearToken();
        router.push({ path: '/login' });
        // router.push('/login');
        // store.commit('setMenuData', {});
        // resetRouter(); // 重置路由
      } else if (res.code === 500) {
        showToast(res.msg);
      } else if (res.code === 403) {
        showToast(res.msg);
      } else {
        showToast('请求code 错误');
      }
      // return Promise.reject(service.interceptors.response.error);
      return response.data;
    } else {
      return response.data;
    }
  },
  (error) => {
    // 对响应错误做点什么
    if (error.message.indexOf('timeout') != -1) {
      showToast('网络超时');
    } else if (error.message == 'Network Error') {
      showToast('网络连接错误');
    } else {
      showToast(error.message);
    }
    return Promise.reject(error);
  },
);

// 导出 axios 实例
export default service;
