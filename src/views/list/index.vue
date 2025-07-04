<template>
  <div class="header">
    <div class="total-floatPL"
      >{{ $t('list.floatPL') }}(USDT)<span :class="{ red: strategies.floatPL > 0, green: strategies.floatPL < 0 }"
        ><b>{{ strategies.floatPL }}&nbsp;</b>
      </span>
      <span class="his-stratergy">
        <Refresh @click="refresh" />
        <router-link to="/hisst"
          ><span>{{ $t('list.hisstratety') }}</span></router-link
        >
      </span>
    </div>
    <div class="button-align-center toolbar">
      <nut-button block type="info" @click="create"> {{ $t('list.oneKeyStart') }} </nut-button>
      <nut-button block type="info" @click="backtest"> {{ $t('list.his_backtest') }} </nut-button>
    </div>
    <div class="condition">
      <span>{{ $t('list.currentStrategyCount') }}:{{ strategies.data.length }}</span>
      <span>{{ $t('list.investment') }}:{{ strategies.investment.position }}USDT</span>
      <span @change="reloadStrategy"
        ><input type="checkbox" v-model="showBacktest" /> <label>{{ $t('list.backtestOnly') }}</label></span
      >
    </div>
    <nut-infinite-loading
      v-model="infinityValue"
      load-txt="Loading..."
      :load-more-txt="$t('common.nomore')"
      :has-more="hasMore"
      @load-more="getStrategy"
    >
      <div v-for="item in strategies.data" :key="item.id" :class="{ running: item.status == 'RUNNING', pause: item.status == 'PAUSE' }">
        <div class="stratergy-head">
          <div class="stratergy-item-left">
            <div class="status">
              <IconFont name="check-normal" />
              <b @click="showPauseRemark(item.id)"
                ><span :class="{ underline: item.status == 'PAUSE' }">{{
                  item.status == 'RUNNING' ? $t('list.running') : $t('list.pausing')
                }}</span
                >{{ item.backtest ? $t('list.backtest') : '' }}</b
              ><span class="stratergy-type">{{ tradeUtil.getNameDesc(item.name, globalProperties) }}</span
              >&nbsp;<span class="unit">单位：{{ item.unit }}</span>
            </div>
          </div>
        </div>
        <div class="body" @click="detail(item.id)">
          <div class="stratergy-item">
            <div class="stratergy-item-left"
              ><span class="seperate"
                ><span>品种：</span>{{ item.instName ? item.instName + '(' + item.instId + ')' : item.instId }}</span
              ></div
            >
            <div class="stratergy-item-right">{{ item.mode == 'formal' ? '--------正式单' : '--------模拟单' }} </div>
          </div>
          <div class="stratergy-item">
            <div class="stratergy-item-left"
              ><span class="seperate">投入：</span><span>{{ item.openQuantity }}</span></div
            >
          </div>
          <div class="stratergy-item">
            <div class="stratergy-item-left"
              ><span class="seperate">{{ $t('list.strategyFloatFL') }}：</span
              ><span :class="{ red: item.floatPL > 0, green: item.floatPL < 0 }" class="bold">{{
                item.floatPL && item.floatPL.toFixed(2)
              }}</span></div
            >
            <div class="stratergy-item-right"
              >收益率：<span :class="{ red: item.floatPL > 0, green: item.floatPL < 0 }" class="bold"
                >{{ item.openQuantity ? parseFloat((item.floatPL / item.openQuantity) * 100).toFixed(2) : 0 }}%</span
              >
            </div>
          </div>
          <div class="stratergy-item">
            <div class="stratergy-item-left"
              ><span class="seperate">现价：</span><span>{{ item.price }}</span></div
            >
            <div class="stratergy-item-right"
              >成本价：<span>{{ item.costPrice }}</span>
            </div>
          </div>
        </div>
        <div class="operation">
          <div v-if="item.backtest == false && item.mode == 'simulated'" @click="activate(item.id)">转正</div>
          <div v-if="item.backtest == false" @click="process(item.id)">{{
            item.status == 'RUNNING' ? $t('list.pause') : $t('list.proceed')
          }}</div>
          <div v-if="item.backtest == false" @click="stop(item.id)">{{ $t('list.stop') }}</div>
        </div>
        <nut-divider :style="styleObject" />
      </div>
    </nut-infinite-loading>
    <div>
      <nut-popup position="bottom" v-model:visible="orderPlanShowed">
        <nut-table :columns="orderPlan.columns" :data="orderPlan.data" :bordered="false" :striped="true" class="orderplan" />
      </nut-popup>
    </div>
  </div>
</template>

<script lang="ts" setup name="HomePage">
  import { computed, onBeforeMount } from 'vue';
  import { useUserStore } from '/@/store/modules/user';
  import * as tradeUtil from '/@/utils/trade';
  import { titleCase } from '/@/utils/string';
  import { useStrategyApi, useApiKeyApi, useProfitApi } from '/@/api/trade';
  import { setLang } from '/@/i18n';
  import { useI18n } from 'vue-i18n';
  import { Check, Loading, Refresh, IconFont } from '@nutui/icons-vue';
  import '@nutui/icons-vue/dist/style_iconfont.css';
  import { showToast } from 'vant';
  import { showDialog, Dialog } from '@nutui/nutui';
  import { ref, createVNode } from 'vue';
  import '@nutui/nutui/dist/packages/dialog/style';

  const {
    appContext: {
      config: { globalProperties },
    },
  } = getCurrentInstance();

  const strategies = reactive({
    floatPL: 0,
    balance: 0,
    equity: 0,
    dayProfit: 0,
    accumulatedProfit: 0,
    investment: {},
    data: [],
  });

  const styleObject = { color: 'rgb(204 204 204)' };
  const userStore = useUserStore();
  const router = useRouter();

  const create = async () => {
    let api = await getApiKey();
    if (!api.apiKey) {
      showToast(globalProperties.$t('list.config_api_first'));
      router.push({ path: '/api' });
      return;
    }
    router.push({ path: '/stcreate' });
  };

  const getApiKey = async () => {
    const r = await useApiKeyApi().listByUserId();
    if (r.code == 0) {
      let ret = r.data[userStore.getUserInfo.defaultExchange];
      if (!ret || !ret.apiKey) {
        return {};
      }
      return ret;
    }
    throw new Error(globalProperties.$t('list.get_api_error'));
  };

  function detail(id) {
    router.push({ path: '/stdetail/' + id });
  }

  const activate = (strategyId) => {
    confirmClick('', '', async () => {
      let strategy = strategies.data.find((e) => e.id == strategyId);
      let exchange = userStore.getUserInfo.defaultExchange;
      const r = await useStrategyApi().activate({ strategyId, exchange });
      if (r.code == 0) {
        strategy.mode = 'formal';
        showToast(globalProperties.$t('common.operate_success'));
      }
    });
  };

  const process = (strategyId) => {
    confirmClick('', '', async () => {
      let strategy = strategies.data.find((e) => e.id == strategyId);
      let operation = strategy.status == 'RUNNING' ? 'pause' : 'proceed';
      const r = await useStrategyApi()[operation]({ strategyId });
      if (r.code == 0) {
        strategy.status = strategy.status == 'RUNNING' ? 'PAUSE' : 'RUNNING';
        showToast(globalProperties.$t('common.operate_success'));
      }
    });
  };

  const stop = (strategyId) => {
    confirmClick('', `<input id='forceClose' type='checkbox'>${globalProperties.$t('list.force_close')}`, async () => {
      let forceClose = document.getElementById('forceClose').checked;
      const r = await useStrategyApi().stop({ strategyId, forceClose });
      if (r.code == 0) {
        let index = strategies.data.findIndex((e) => e.id == strategyId);
        strategies.data.splice(index, 1);
        showToast(globalProperties.$t('list.refer_to_hisstrategy'));
      }
    });
  };

  const confirmClick = (title, content, onOk, onCancel = () => {}): void => {
    showDialog({
      title: title || globalProperties.$t('common.confirm_current_operation'),
      content: content || '',
      onCancel,
      onOk,
    });
  };

  // onBeforeMount(() => {
  //   console.log('onBeforeMount');
  //   getStrategy();
  // });
  const showBacktest = ref(false);

  let interval = ref();
  onActivated(() => {
    reloadStrategy();
    getFloatPL();
    interval.value = setInterval(() => {
      getFloatPL();
    }, 5 * 1000);
  });

  onDeactivated(() => {
    clearInterval(interval.value);
  });

  const infinityValue = ref(false);
  const hasMore = ref(true);
  const current = ref(1);
  const loading = ref(false);
  const getStrategy = async () => {
    if (loading.value) {
      return;
    }
    loading.value = true;
    let exchange = userStore.getUserInfo.defaultExchange;
    if (showBacktest.value) {
      exchange = 'backtest';
    }
    const r = await useStrategyApi().listCurrent({ current: current.value, limit: 100, backtest: showBacktest.value, exchange });
    loading.value = false;
    if (r.code == 0) {
      strategies.data = [...strategies.data, ...r.data.records];
      if (Object.keys(floatPLMap).length > 0) {
        setFloatPL();
      }
      infinityValue.value = false;
      current.value++;
      if (current.value > r.data.pages) hasMore.value = false;
    }
  };

  const reloadStrategy = async () => {
    strategies.data = [];
    current.value = 1;
    hasMore.value = true;
    getStrategy();
    getInvestment();
  };

  const refresh = async () => {
    reloadStrategy();
  };

  const showPauseRemark = async (strategyId) => {
    let strategy = strategies.data.find((e) => e.id == strategyId);
    if (strategy.status == 'PAUSE') {
      showToast(strategy.statusRemark);
    }
  };

  const floatPLMap = ref({});
  const getFloatPL = async () => {
    const r = await useStrategyApi().getTotalFloatFL({ exchange: userStore.getUserInfo.defaultExchange });
    if (r.code == 0) {
      floatPLMap.value = r.data;
      setFloatPL();
    }
  };

  function setFloatPL() {
    if (Object.keys(floatPLMap.value).length === 0) {
      return;
    }
    strategies.data.forEach((e) => {
      if (!floatPLMap.value[e.id]) {
        return;
      }
      e.floatPL = floatPLMap.value[e.id].pl;
      e.price = floatPLMap.value[e.id].price;
    });
    strategies.floatPL = floatPLMap.value && floatPLMap.value.total.pl.toFixed(2);
  }

  const getInvestment = async () => {
    strategies.investment = {};
    const r = await useProfitApi().getProfit({});
    if (r.code == 0) {
      strategies.investment = r.data;
    }
  };

  const backtest = async () => {
    let api = await getApiKey();
    if (!api.apiKey) {
      router.push({ path: '/api' });
      return;
    }
    router.push({ path: '/stcreate', query: { backtest: 'true' } });
  };

  const orderPlanShowed = ref(false);
  const orderPlan = reactive({
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
    ],
    data: [],
  });
  const showOrderPlan = async (strategyId) => {
    orderPlanShowed.value = true;
    let strategy = strategies.data.find((e) => e.id == strategyId);
    if (strategy.orderPlan && strategy.orderPlan.lines.length > 0) {
      orderPlan.data = strategy.orderPlan.lines;
      orderPlan.columns[1].title = `${globalProperties.$t('orderPlan.openCount')}(${strategy.unit})`;
      for (let i = 0; i < orderPlan.data.length; i++) {
        orderPlan.data[i].num = i + 1;
      }
    }
  };
</script>
<style lang="scss" scoped>
  .header {
    line-height: 50px;
    padding: 10px 0;
    font-size: 26px;

    .total-floatPL {
      padding: 0 10px;
      font-size: 28px;

      b {
        font-size: 40px;
        vertical-align: middle;
        margin: 0 30px;
      }
    }

    .amount {
      display: none;
    }

    .toolbar {
      margin: 20px 0 10px 0;
    }

    .condition {
      display: flex;
      justify-content: left;
      font-size: 25px;

      input[type='checkbox'] {
        vertical-align: middle;
      }
    }

    .condition span:nth-child(2) {
      margin-left: 30px;
    }

    .condition span:nth-last-child(1) {
      margin-left: auto;
    }

    .digit {
      margin-left: 20px;
      font-size: 28px;
      font-weight: bold;
    }

    .stratergy-type {
      margin-left: 20px;
      // font-weight: bold;
    }

    .nut-button--mini {
      width: 120px;
      font-size: 15px;
    }

    .seperate {
      padding-left: 20px;
      font-size: 28px;
    }

    .orderplan {
      height: 700px;
    }
  }

  .stratergy-head,
  .stratergy-item {
    display: flex;
    justify-content: left;
    align-items: center;
    padding: 5px 20px;
    font-size: 28px;

    .stratergy-item-left {
      flex: 4;

      .status {
        display: flex;
        align-items: center;
      }

      // width: 60%;
      // margin-left: auto;
    }

    .stratergy-item-right {
      flex: 3;
      display: flex;
    }
  }

  .stratergy-head {
    padding-top: 25px;

    .stratergy-item-left {
      flex: 2;
    }

    .stratergy-item-right {
      flex: 1;
    }
  }

  .operation {
    display: flex;
    justify-content: right;
    text-align: center;
    font-size: 30px;
    padding: 10px;

    > view {
      margin-right: 20px;
    }

    > div {
      background-color: white;
      border-radius: 8px;
      color: blue;
      width: 120px;
      margin: 0 10px;
      height: 45px;
    }

    .seperate {
      margin: 0 15px;
    }

    .operation-font-color {
      color: blue;
    }
  }

  .his-stratergy {
    display: flex;
    align-items: center;
    float: right;
    color: blue;

    .nut-icon {
      vertical-align: middle;
      margin-right: 50px;
    }
  }

  .button-list {
    display: flex;
    justify-content: center;
    align-items: center;

    .nut-button--block {
      width: 40%;
    }
  }

  .asset,
  .profit {
    display: flex;
    justify-content: left;
    align-items: center;

    div {
      width: 50%;
    }
  }

  .nut-divider {
    margin: 10px 0;
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

  .button-align-center {
    display: flex;
    justify-content: space-between;

    > .nut-button {
      flex: 1;
      margin: 0 20px;
    }
  }

  .underline {
    text-decoration: underline;
  }

  .running {
    background-color: #c7e0c7;
  }

  .pause {
    background-color: #ebeba5;
  }

  .running {
    .nut-icon-check-normal {
      background-color: green;
      color: green;
      border-radius: 50%;
      vertical-align: middle;
      margin-right: 10px;
    }
  }

  .pause {
    .nut-icon-check-normal {
      background-color: red;
      color: red;
      border-radius: 50%;
      vertical-align: middle;
      margin-right: 10px;
    }
  }

  .red {
    color: red;
  }

  .green {
    color: green;
  }

  .bold {
    font-weight: 700;
  }

  .unit {
    padding-right: 20px;
    margin-left: auto;
  }
</style>
