<template>
  <div>
    <nut-swiper :init-page="state.page" :pagination-visible="true" pagination-color="#426543" auto-play="3000">
      <nut-swiper-item v-for="item in state.list" :key="item">
        <img :src="item" alt="" />
      </nut-swiper-item>
    </nut-swiper>
    <div>
      <nut-noticebar text="NutUI 是京东风格的移动端组件库，使用 Vue 语言来编写可以在 H5，小程序平台上的应用，帮助研发人员提升开发效率，改善开发体验。"
        :background="`rgba(251, 248, 220, 0)`" :color="`#D9500B`">
        <template #right-icon>
          <MoreS @click='showMoreNotice()' />
        </template></nut-noticebar>
    </div>
    <nut-grid :border="false">
      <nut-grid-item v-for="item in tools" :key="item.router" :text="item.text">
        <router-link :to="item.router">
          <nut-avatar size="normal">
            <img :src="item.icon" />
          </nut-avatar>
        </router-link>
      </nut-grid-item>
    </nut-grid>
    <h4>市场行情</h4>
    <br />
    <nut-table :columns="table.columns" :data="table.data" :bordered="false" :striped="true"></nut-table>
  </div>
</template>

<script lang="ts" setup name="HomePage">
import { computed, onBeforeMount } from 'vue';
import { useUserStore } from '/@/store/modules/user';
import { setLang } from '/@/i18n';
import { useI18n } from 'vue-i18n';
import { Check, MoreS } from '@nutui/icons-vue';

const { locale } = useI18n();

let cellList = ['vue3', 'vite', 'vue-router', 'axios', 'Pinia', 'vue-i18n', 'postcss-px-to-viewport', 'varlet / vant / nutUI', 'eruda'];
const userStore = useUserStore();
const getUserInfo = computed(() => {
  const { name = '' } = userStore.getUserInfo || {};
  return name;
});

const router = useRouter();

const changeLang = (type) => {
  setLang(type);
};

const state = reactive({
  page: 2,
  list: [] as string[]
});
onBeforeMount(() => {
  setTimeout(() => {
    state.list = [
      'https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg',
      'https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg',
      'https://storage.360buyimg.com/jdc-article/welcomenutui.jpg',
      'https://storage.360buyimg.com/jdc-article/fristfabu.jpg'
    ];
  }, 0);
});
const tools = [{
  router: '/exchange',
  icon: 'https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png',
  text: '交易流水'
}, {
  router: '/share',
  icon: 'https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png',
  text: '分享邀请'
}, {
  router: '/api',
  icon: 'https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png',
  text: 'API配置'
}, {
  router: '/help',
  icon: 'https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png',
  text: '帮助中心'
}];
const showMoreNotice = () => {
  router.push({ path: '/notices' });
}

const table = reactive({
  columns: [
    {
      title: '交易对',
      key: 'name',
      align: 'left',
      stylehead: 'font-size:15px;font-family: "Microsoft YaHei", sans-serif;',
      stylecolumn: 'font-size:15px;font-family: "Microsoft YaHei", sans-serif;'
    },
    {
      title: '价格',
      key: 'price',
      align: 'center',
      stylehead: 'font-size:15px;font-family: "Microsoft YaHei", sans-serif;',
      stylecolumn: 'font-size:15px;font-family: "Microsoft YaHei", sans-serif;color:red;'
    },
    {
      title: '24小时涨跌幅',
      key: 'change',
      align: 'right',
      stylehead: 'font-size:15px;font-family: "Microsoft YaHei", sans-serif;',
      stylecolumn: 'font-size:15px;font-family: "Microsoft YaHei", sans-serif;',
      render: (record) => {
        return h(
          'span',
          {
            style: {
              color: record.change > 0 ? 'red' : 'green'
            }
          },
          (record.change > 0 ? '+' : '-') + record.change + '%'
        );
      }
    }],
  data: []
});
onBeforeMount(() => {
  setTimeout(() => {
    table.data = [
      { name: 'BTCUSDT', price: 29190.10, change: 1.92 },
      { name: 'ETHUSDT', price: 29190.10, change: -1.92 },
      { name: 'BTCUSDT', price: 29190.10, change: -1.92 },
      { name: 'BTCUSDT', price: 29190.10, change: 1.92 },
      { name: 'BTCUSDT', price: 29190.10, change: 1.92 },
      { name: 'BTCUSDT', price: 29190.10, change: 1.92 },
      { name: 'BTCUSDT', price: 29190.10, change: 1.92 },
      { name: 'BTCUSDT', price: 29190.10, change: 1.92 },
      { name: 'BTCUSDT', price: 29190.10, change: 1.92 },
      { name: 'BTCUSDT', price: 29190.10, change: 1.92 },
      { name: 'BTCUSDT', price: 29190.10, change: 1.92 },
      { name: 'BTCUSDT', price: 29190.10, change: 1.92 },
      { name: 'BTCUSDT', price: 29190.10, change: 1.92 },
      { name: 'BTCUSDT', price: 29190.10, change: 1.92 },
      { name: 'BTCUSDT', price: 29190.10, change: 1.92 },
      { name: 'BTCUSDT', price: 29190.10, change: 1.92 },
      { name: 'BTCUSDT', price: 29190.10, change: 1.92 },
      { name: 'BTCUSDT', price: 29190.10, change: 1.92 },
      { name: 'BTCUSDT', price: 29190.10, change: 1.92 },
      { name: 'BTCUSDT', price: 29190.10, change: 1.92 },
      { name: 'BTCUSDT', price: 29190.10, change: 1.92 }
    ];
  }, 0);
});
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 10px 0;
  font-size: 40px;
}

.notice {
  font-size: 30px;
  padding: 0px 10px;
}

.more-notice {
  margin-left: auto
}

.nut-noticebar__page {
  padding: 0 0;
}

.intro-header {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}

.supportList {
  margin: 0 16px;

  .nut-cell-group__title {
    margin-top: 30px;
  }
}

.btn-wrap {
  margin: 20px;
}

.btn-confirm {
  @include main-lang-bg(302px, 82px, '/@/assets/button', 'confirm.png');
}

.nut-swiper-item {
  line-height: 150px;
  // width: 100%;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
