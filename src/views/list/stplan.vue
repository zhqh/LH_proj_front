<template>
  <div class="container">
    <div class="head">
      <div class="title">
        <div class="flex-2">单数：{{ orderPlan.data.length }}</div>
        <div class="flex-2">幅度：{{ parseFloat(amplitude).toFixed(2) }}%</div>
        <div class="flex-3">区间：{{ priceArea }}</div>
      </div>
    </div>
    <div class="body" v-for="item in orderPlan.data" :key="item.totalAmount">
      <div class="row">
        <div>{{ item.num }}. 数量：{{ item.quantity }}</div>
        <div>买入价格：{{ item.price }}</div>
      </div>
      <div class="row">
        <div>投入金额：{{ item.context.totalAmount }}</div>
        <div>下跌比率：{{ (((item.num - 1) * amplitude) / (orderPlan.data.length - 1)).toFixed(2) }}%</div>
      </div>
      <div class="row">
        <div>浮亏金额：{{ item.context.totalLoss }}</div>
        <div
          >浮亏比率：{{
            item.context.totalAmount != 0 ? parseFloat((item.context.totalLoss / item.context.totalAmount) * 100).toFixed(2) : 0
          }}%</div
        >
      </div>
      <div class="row">
        <div>首单浮盈：{{ item.context.backFirstOrderProfit }}</div>
        <div
          >浮盈比率：{{
            item.context.totalAmount != 0 ? parseFloat((item.context.backFirstOrderProfit / item.context.totalAmount) * 100).toFixed(2) : 0
          }}%</div
        >
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
  import { useOrderApi, useStrategyApi } from '/@/api/trade';
  import { showToast } from 'vant';

  const { locale } = useI18n();
  const {
    appContext: {
      config: { globalProperties },
    },
  } = getCurrentInstance();

  const currentOrders = reactive({
    data: [],
  });
  onMounted(() => {
    setOrderPlan();
  });
  onActivated(() => {
    setOrderPlan();
  });

  let route = useRoute();

  const props = defineProps({
    strategy: Object,
  });

  const amplitude = ref();
  const priceArea = ref();
  const directionName = ref();

  const { strategy } = toRefs(props);

  const setOrderPlan = async () => {
    if (strategy.value.orderPlan && strategy.value.orderPlan.lines.length > 0) {
      orderPlan.data = strategy.value.orderPlan.lines;
      orderPlan.columns[1].title = `${globalProperties.$t('orderPlan.openCount')}(${strategy.value.unit})`;
      for (let i = 0; i < orderPlan.data.length; i++) {
        let order = orderPlan.data[i];
        order.num = i + 1;
        order.quantity = parseFloat(order.quantity).toFixed(0);
        order.price = parseFloat(order.price).toFixed(3);

        order.context.totalAmount = parseFloat(order.context.totalAmount).toFixed(0);
        order.context.totalLoss = parseFloat(order.context.totalLoss).toFixed(0);
        order.context.backFirstOrderProfit = parseFloat(order.context.backFirstOrderProfit).toFixed(0);
      }
      let firstOrderPrice = parseFloat(orderPlan.data[0].price);
      let lastOrderPrice = parseFloat(orderPlan.data[orderPlan.data.length - 1].price);
      if (strategy.value.posSide == 'long') {
        amplitude.value = ((firstOrderPrice - lastOrderPrice) / firstOrderPrice) * 100;
        priceArea.value = `${firstOrderPrice} - ${lastOrderPrice}`;
      } else {
        amplitude.value = ((lastOrderPrice - firstOrderPrice) / firstOrderPrice) * 100;
        priceArea.value = `${lastOrderPrice} - ${firstOrderPrice}`;
      }
    }
  };

  const router = useRouter();

  const orderPlan = reactive({
    columns: [
      {
        title: globalProperties.$t('common.num'),
        key: 'num',
        align: 'center',
        stylehead: 'font-size:15px;font-family: "Microsoft YaHei", sans-serif;vertical-align:middle;',
        stylecolumn: 'font-size:15px;font-family: "Microsoft YaHei", sans-serif;color:red;',
      },
      {
        title: globalProperties.$t('orderPlan.openCount'),
        key: 'quantity',
        align: 'center',
        stylehead: 'font-size:15px;font-family: "Microsoft YaHei", sans-serif;vertical-align:middle;',
        stylecolumn: 'font-size:15px;font-family: "Microsoft YaHei", sans-serif;color:red;',
      },
      {
        title: globalProperties.$t('orderPlan.openPrice'),
        key: 'price',
        align: 'center',
        stylehead: 'font-size:15px;font-family: "Microsoft YaHei", sans-serif;vertical-align:middle;',
        stylecolumn: 'font-size:15px;font-family: "Microsoft YaHei", sans-serif;color:red;',
      },
    ],
    data: [],
  });
</script>

<style lang="scss" scoped>
  .container {
    padding: 10px;
    font-size: 28px;
  }

  .head,
  .body {
    padding: 20px;
    border-bottom: 1px solid #e5e5e5;
  }

  .body:nth-child(even) {
    background-color: #f3f3f3;
  }

  .title,
  .row {
    display: flex;
    padding: 10px;
  }

  .row {
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
