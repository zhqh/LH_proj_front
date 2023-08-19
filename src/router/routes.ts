export const routes = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('/@/layout/basic/index.vue'),
    children: [
      {
        path: 'home',
        component: () => import('/@/views/home/index.vue'),
        meta: {
          title: 'tabbar.home',
          keepAlive: true,
        },
      },
      {
        path: 'api',
        component: () => import('/@/views/home/api.vue'),
        meta: {
          title: 'home.api',
          keepAlive: true,
        },
      },
      {
        path: 'share',
        component: () => import('/@/views/home/share.vue'),
        meta: {
          title: 'home.share',
          keepAlive: true,
        },
      },
      {
        path: 'exchange',
        component: () => import('/@/views/home/exchange.vue'),
        meta: {
          title: 'home.exchange',
          keepAlive: true,
        },
      },
      {
        path: 'help',
        component: () => import('/@/views/home/help.vue'),
        meta: {
          title: 'home.help',
          keepAlive: true,
        },
      },
      {
        path: 'list',
        component: () => import('/@/views/list/index.vue'),
        meta: {
          title: 'tabbar.list',
          keepAlive: true,
        },
      },
      {
        path: 'stcreate',
        component: () => import('/@/views/list/stcreate.vue'),
        meta: {
          title: 'list.stcreate',
          keepAlive: true,
        },
      },
      {
        path: 'stparam/:id',
        component: () => import('/@/views/list/stparam.vue'),
        meta: {
          title: 'list.stparam',
          keepAlive: true,
        },
      },
      {
        path: 'sthold/:id',
        component: () => import('/@/views/list/sthold.vue'),
        meta: {
          title: 'list.sthold',
          keepAlive: true,
        },
      },
      {
        path: 'sthishold/:id',
        component: () => import('/@/views/list/sthishold.vue'),
        meta: {
          title: 'list.sthishold',
          keepAlive: true,
        },
      },
      {
        path: 'kline/:id',
        component: () => import('/@/views/list/kline.vue'),
        meta: {
          title: 'list.kline',
          keepAlive: true,
        },
      },
      {
        path: 'hisst',
        component: () => import('/@/views/list/hisst.vue'),
        meta: {
          title: 'list.hisst',
          keepAlive: false,
        },
      },
      {
        path: 'member',
        component: () => import('/@/views/member/index.vue'),
        meta: {
          title: 'tabbar.member',
          keepAlive: true,
        },
      },
      {
        path: 'wsinit',
        component: () => import('/@/views/member/wsinit.vue'),
        meta: {
          title: 'member.ws',
          keepAlive: true,
        },
      },
      {
        path: 'ws',
        component: () => import('/@/views/member/ws.vue'),
        meta: {
          title: 'member.ws',
          keepAlive: true,
        },
      },
      {
        path: 'rest',
        component: () => import('/@/views/member/rest.vue'),
        meta: {
          title: 'member.rest',
          keepAlive: true,
        },
      },
      {
        path: 'setting',
        component: () => import('/@/views/member/setting.vue'),
        meta: {
          title: 'member.setting',
          keepAlive: true,
        },
      },
      {
        path: 'person',
        component: () => import('/@/views/member/person.vue'),
        meta: {
          title: 'member.person',
          keepAlive: true,
        },
      },
      {
        path: 'email',
        component: () => import('/@/views/member/email.vue'),
        meta: {
          title: 'member.email',
          keepAlive: true,
        },
      },
      {
        path: 'password',
        component: () => import('/@/views/member/password.vue'),
        meta: {
          title: 'member.password',
          keepAlive: true,
        },
      },
      {
        path: 'contact',
        component: () => import('/@/views/member/contact.vue'),
        meta: {
          title: 'member.contact',
          keepAlive: true,
        },
      },
      {
        path: 'cache',
        component: () => import('/@/views/member/cache.vue'),
        meta: {
          title: 'member.cache',
          keepAlive: true,
        },
      },
      {
        path: 'manage',
        component: () => import('/@/views/member/manage.vue'),
        meta: {
          title: 'member.manage',
          keepAlive: true,
        },
      },
      {
        path: 'version',
        component: () => import('/@/views/member/version.vue'),
        meta: {
          title: 'member.version',
          keepAlive: true,
        },
      },
      {
        path: 'wallet',
        component: () => import('/@/views/member/wallet.vue'),
        meta: {
          title: 'member.wallet',
          keepAlive: true,
        },
      },
      {
        path: 'charge',
        component: () => import('/@/views/member/charge.vue'),
        meta: {
          title: 'member.charge',
          keepAlive: true,
        },
      },
      {
        path: 'withdraw',
        component: () => import('/@/views/member/withdraw.vue'),
        meta: {
          title: 'member.withdraw',
          keepAlive: true,
        },
      },
      {
        path: 'language',
        component: () => import('/@/views/member/language.vue'),
        meta: {
          title: 'member.language',
          keepAlive: true,
        },
      },
      {
        path: 'analysis',
        component: () => import('/@/views/member/analysis.vue'),
        meta: {
          title: 'member.analysis',
          keepAlive: true,
        },
      },
      {
        path: 'demo',
        component: () => import('/@/views/demo/index.vue'),
        meta: {
          title: 'tabbar.demo',
          keepAlive: true,
        },
      },
      {
        name: 'listDetails',
        path: '/details',
        component: () => import('/@/views/list/details/index.vue'),
        meta: {
          title: 'list.details',
          border: false,
        },
      },
      {
        name: 'noticeList',
        path: '/notices',
        component: () => import('/@/views/notice/index.vue'),
        meta: {
          title: 'notice.list',
          border: false,
        },
      },
      {
        name: 'noticeDetail',
        path: '/noticedetail/:id',
        component: () => import('/@/views/notice/detail.vue'),
        meta: {
          title: 'notice.detail',
          border: false,
        },
      },
    ],
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('/@/views/login/index.vue'),
    meta: {
      title: '',
      keepAlive: true,
    },
  },
  {
    name: 'register',
    path: '/register',
    component: () => import('/@/views/login/register.vue'),
    meta: {
      title: '',
      keepAlive: true,
    },
  },
  {
    name: 'forget',
    path: '/forget',
    component: () => import('/@/views/login/forget.vue'),
    meta: {
      title: '',
      keepAlive: true,
    },
  },
];

export default routes;
