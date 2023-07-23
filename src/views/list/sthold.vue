<template>
  <div>
    <div class="exchange-table"><nut-table :columns="orderColumns.columns" :data="currentOrders.data" :bordered="false"
        :striped="true" /></div>
  </div>
</template>

<script lang="ts" setup name="HomePage">
import { computed, onBeforeMount } from 'vue';
import { useUserStore } from '/@/store/modules/user';
import { setLang } from '/@/i18n';
import { useI18n } from 'vue-i18n';
import '@nutui/icons-vue/dist/style_iconfont.css';
import { IconFont } from '@nutui/icons-vue';
import { useOrderApi } from '/@/api/trade';
import { showToast } from 'vant';

const { locale } = useI18n();
const { appContext: { config: { globalProperties } } } = getCurrentInstance();

const currentOrders = reactive({
  data: [],
});
onActivated(() => {
  getCurrentOrder();
});

let route = useRoute();

const getCurrentOrder = async () => {
  const r = await useOrderApi().listCurrent({ current: 1, limit: 100, strategyId: route.params.id });
  if (r.code == 0 && r.data.records.length > 0) {
    orderColumns.columns[1].title = `${globalProperties.$t('orderPlan.openCount')}(${r.data.records[0].unit})`;
    r.data.records.forEach((e, i) => e.num = ++i);
    Object.assign(currentOrders.data, r.data.records);
  }
};

const router = useRouter();

const orderColumns = reactive({
  columns: [
    {
      title: globalProperties.$t('common.num'),
      key: 'num',
      align: 'center',
      stylehead: 'font-size:13px;font-family: "Microsoft YaHei", sans-serif;vertical-align:middle;',
      stylecolumn: 'font-size:13px;font-family: "Microsoft YaHei", sans-serif;color:red;',
    },
    {
      title: globalProperties.$t('orderPlan.openCount'),
      key: 'quantity',
      align: 'center',
      stylehead: 'font-size:13px;font-family: "Microsoft YaHei", sans-serif;vertical-align:middle;',
      stylecolumn: 'font-size:13px;font-family: "Microsoft YaHei", sans-serif;color:red;',
    },
    {
      title: globalProperties.$t('orderPlan.openPrice'),
      key: 'price',
      align: 'center',
      stylehead: 'font-size:13px;font-family: "Microsoft YaHei", sans-serif;vertical-align:middle;',
      stylecolumn: 'font-size:13px;font-family: "Microsoft YaHei", sans-serif;color:red;',
    },
    {
      title: globalProperties.$t('holdOrder.openTime'),
      key: 'openTime',
      align: 'center',
      stylehead: 'font-size:13px;font-family: "Microsoft YaHei", sans-serif;vertical-align:middle;',
      stylecolumn: 'font-size:13px;font-family: "Microsoft YaHei", sans-serif;color:red;',
    },
  ],
});
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: left;
  align-items: center;
  height: 70px;
}

.mymenu {
  // height: 50px;
  color: red;
}

.query-date {
  margin: 0 25px 0 auto;
  display: flex;
  align-items: center;
}

.nut-icon-date {
  // vertical-align: middle;
}

.nut-cell {
  box-shadow: none;
}

.menu {
  // padding-left: 0px;
  width: 250px;
  // height: 50px;
  // display: flex;
  // justify-content: left;
  // height: 30px;
}

.exchange-table {
  margin: 0 30px;

  span {
    font-size: 15px;
  }
}

.code {
  width: 100%;
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

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
