<template>
  <div>
    <nut-swiper :init-page="state.page" :pagination-visible="true" pagination-color="#426543" auto-play="3000">
      <nut-swiper-item v-for="item in state.list" :key="item">
        <img :src="item" alt="" />
      </nut-swiper-item>
    </nut-swiper>
    <div>
      <nut-noticebar :text="$t('slogan')" :background="`rgba(251, 248, 220, 0)`" :color="`#D9500B`">
        <template #right-icon>
          <MoreS @click="showMoreNotice()" />
        </template></nut-noticebar>
    </div>
    <nut-grid :border="false">
      <nut-grid-item :text="$t('home.tradeflow')">
        <router-link to="/exchange">
          <nut-avatar size="normal">
            <img src="../../assets/jiaoyiliushui.png" />
          </nut-avatar>
        </router-link>
      </nut-grid-item>
      <nut-grid-item :text="$t('home.shareinvite')">
        <router-link to="/share">
          <nut-avatar size="normal">
            <img src="../../assets/fuzhilianjie.png" />
          </nut-avatar>
        </router-link>
      </nut-grid-item>
      <nut-grid-item :text="$t('home.apiset')">
        <router-link to="/api">
          <nut-avatar size="normal">
            <img src="../../assets/API.png" />
          </nut-avatar>
        </router-link>
      </nut-grid-item>
      <nut-grid-item :text="$t('home.helpcenter')">
        <router-link to="/help">
          <nut-avatar size="normal">
            <img src="../../assets/bangzhu.png" />
          </nut-avatar>
        </router-link>
      </nut-grid-item>
    </nut-grid>
    <h4>{{ $t('home.market') }}</h4>
    <br />
    <nut-table :columns="market.columns" :data="market.data" :bordered="false" :striped="true" />
  </div>
</template>

<script lang="ts" setup name="HomePage">
import { computed, onBeforeMount } from 'vue';
import { useUserStore } from '/@/store/modules/user';
import { setLang } from '/@/i18n';
import { useI18n } from 'vue-i18n';
import { Check, MoreS } from '@nutui/icons-vue';
import { instIds } from '/@/data/data';

const { appContext: { config: { globalProperties } } } = getCurrentInstance();

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
  list: [] as string[],
});
let websocket = ref();
onBeforeMount(() => {
  createWebSocket();
});
const createWebSocket = () => {
  if ('WebSocket' in window) {
    console.log('WebSocket');
    websocket.value = new WebSocket(`ws://${location.host}/ws/wsserver`, [userStore.token]);
    // websocket.value = new WebSocket(`ws://${location.hostname}:8080/wsserver`, [userStore.token]);
  } else {
    alert('Current Browser Not support websocket');
  }
  websocket.value.onopen = function () {
    console.log('WebSocket连接成功');
    window.setInterval(() => {
      websocket.value.send('ping');
    }, 25000);
  };
  websocket.value.onerror = function () {
    console.log('WebSocket连接发生错误');
  };
  websocket.value.onmessage = function (event) {
    // console.log(event.data);
    if (event.type == 'message' && event.data != 'pong') {
      // console.log(JSON.parse(event.data));
      refreshMarketPrice(JSON.parse(event.data));
    }
  };
  websocket.value.onclose = function () {
    console.log('WebSocket连接关闭');
  };
};

const initInstIds = () => {
  let data = JSON.parse(JSON.stringify(instIds));
  data.forEach((e) => {
    e.name = e.value;
    e.price = 0;
    e.change = 0;
  });
  return data;
};

onBeforeUnmount(() => {
  console.log('closing websocket');
  websocket.value.close();
});

onBeforeMount(() => {
  setTimeout(() => {
    state.list = [
      'https://img.36krcdn.com/20200410/v2_e167e39262d14ce188d34c7a6bd21a41_img_000?x-oss-process=image/format,jpg',
      'http://5b0988e595225.cdn.sohucs.com/images/20181126/cdb6ee82a9fa4a87a76018b1beeec54c.jpeg'
    ];
  }, 0);
});
onMounted(() => {
  window.addEventListener('beforeunload', beforeunloadHandler);
  window.addEventListener('unload', unloadHandler);
});
onUnmounted(() => {
  window.removeEventListener('beforeunload', beforeunloadHandler);
  window.removeEventListener('unload', unloadHandler);
});

const UnloadTime = reactive({
  beforeUnload_time: 0,
});
const beforeunloadHandler = () => {
  UnloadTime.beforeUnload_time = new Date().getTime();
};
const unloadHandler = () => {
  let gap_time = new Date().getTime() - UnloadTime.beforeUnload_time;
  //判断是窗口关闭还是刷新 毫秒数判断 网上大部分写的是5
  if (gap_time <= 10) {
    websocket.value.close();
  }
};
const showMoreNotice = () => {
  // router.push({ path: '/notices' });
};

const market = reactive({
  columns: [
    {
      title: globalProperties.$t('home.instId'),
      key: 'name',
      align: 'left',
      stylehead: 'font-size:15px;font-family: "Microsoft YaHei", sans-serif;',
      stylecolumn: 'font-size:15px;font-family: "Microsoft YaHei", sans-serif;',
    },
    {
      title: globalProperties.$t('home.price'),
      key: 'price',
      align: 'center',
      stylehead: 'font-size:15px;font-family: "Microsoft YaHei", sans-serif;',
      stylecolumn: 'font-size:15px;font-family: "Microsoft YaHei", sans-serif;color:red;',
    },
    {
      title: globalProperties.$t('home.dayfl'),
      key: 'change',
      align: 'right',
      stylehead: 'font-size:15px;font-family: "Microsoft YaHei", sans-serif;',
      stylecolumn: 'font-size:15px;font-family: "Microsoft YaHei", sans-serif;',
      render: (record) => {
        return h(
          'span',
          {
            style: {
              color: record.change > 0 ? 'red' : 'green',
            },
          },
          (record.change > 0 ? '+' : '') + record.change + '%',
        );
      },
    },
  ],
  data: initInstIds(),
});
const refreshMarketPrice = (tickerData) => {
  let instIdRow = market.data.find((e) => e.name == tickerData.instId);
  if (instIdRow) {
    instIdRow.price = tickerData.last;
    let last = parseFloat(tickerData.last);
    let sodUtc8 = parseFloat(tickerData.sodUtc8);
    // console.log(tickerData);
    instIdRow.change = (((last - sodUtc8) * 100) / sodUtc8).toFixed(2);
  }
};
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
  margin-left: auto;
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
