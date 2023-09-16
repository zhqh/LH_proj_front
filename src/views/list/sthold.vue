<template>
  <div class="container">
    <div class="body" v-for="item in currentOrders.data" :key="item.openTime">
      <div class="row">
        <div>买入数量：{{ item.quantity }}</div>
        <div>买入价格：{{ item.price }}</div>
      </div>
      <div class="row">
        <div>买入时间：{{ item.openTime }}</div>
      </div>
      <div :class="{ 'row red': item.context.profit > 0, 'row green': item.context.profit <= 0 }">
        <div>实时收益：{{ item.context.profit && item.context.profit.toFixed(2) }}</div>
        <div>收益率：{{ item.context.profitRate && parseFloat(item.context.profitRate * 100).toFixed(2) }}%</div>
      </div>
    </div>
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
  const {
    appContext: {
      config: { globalProperties },
    },
  } = getCurrentInstance();
  const userStore = useUserStore();

  const currentOrders = reactive({
    data: [],
  });
  onMounted(() => {
    getCurrentOrder();
  });
  onActivated(() => {
    getCurrentOrder();
  });

  let route = useRoute();

  const getCurrentOrder = async () => {
    let exchange = userStore.getUserInfo.defaultExchange;
    const r = await useOrderApi().listCurrent({ current: 1, limit: 100, strategyId: route.params.id, exchange });
    if (r.code == 0 && r.data.records.length > 0) {
      r.data.records.forEach((e, i) => (e.num = ++i));
      Object.assign(currentOrders.data, r.data.records);
    }
  };

  const router = useRouter();
</script>

<style lang="scss" scoped>
  .container {
    padding: 10px;
    font-size: 28px;
  }

  .body {
    padding: 20px;
    border-bottom: 1px solid #e5e5e5;
  }

  .row {
    display: flex;
    padding: 10px;

    > div {
      flex: 1;
    }
  }

  .red {
    color: red;
  }

  .green {
    color: green;
  }
</style>
