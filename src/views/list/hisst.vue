<template>
  <div class="header">
    <div class="condition">
      <span>当前策略数:{{ strategies.data.length }}</span>
      <span @change="reloadStrategy"><input type="checkbox" v-model="showBacktest">
        <label>只显示回测</label></span>
    </div>
    <nut-infinite-loading v-model="infinityValue" load-txt="Loading..." load-more-txt="没有啦~" :has-more="hasMore"
      @load-more="getStrategy">
      <div v-for="item in strategies.data" :key="item.id" class="history">
        <div class="stratergy-item">
          <div class="stratergy-item-left">
            <div class="instId">{{ item.backtest ? '(回测)' : '' }}{{ item.instId
            }}</div>
            <div class="stratergy-type">{{ tradeUtil.getNameDesc(item.name, globalProperties) +
              tradeUtil.getTypeNameDesc(item.type, globalProperties)
            }}<span>({{ item.posSide == 'long' ? '做多' : '做空' }})</span></div>
          </div>
          <div class="stratergy-item-right">累计收益<span class="digit">{{ item.accumulatedProfit.toFixed(2) }}({{
            (item.accumulatedProfitRate * 100).toFixed(0) + '%' }})</span></div>
        </div>
        <div class="stratergy-item">
          <div class="stratergy-item-left">平仓单量<span class="digit">{{ item.closeCount }}</span></div>
          <div class="stratergy-item-right">最大回撤<span class="digit">{{ (Math.abs(item.maxLoss) * 100).toFixed(0) + '%'
          }}</span></div>
        </div>
        <div class="stratergy-item">
          <div class="stratergy-item-left">开始时间<span class="digit">{{ item.startTime }}</span></div>
          <div class="stratergy-item-right">运行时长<span class="digit">{{ item.duration }}天</span></div>
        </div>
        <div class="operation">
          <a @click="showOrderPlan(item.id)"><span class="seperate operation-font-color">执行计划</span></a>
          <router-link :to="{ path: `/stparam/${item.strategyParamId}` }"><span
              class="seperate operation-font-color">策略参数</span></router-link>
          <router-link :to="{ path: `/sthishold/${item.id}` }"><span
              class="seperate operation-font-color">历史持仓</span></router-link>
        </div>
        <nut-divider :style="styleObject" />
      </div>
    </nut-infinite-loading>
    <div>
      <nut-popup position="bottom" v-model:visible="orderPlanShowed">
        <nut-table :columns="orderPlan.columns" :data="orderPlan.data" :bordered="false" :striped="true"
          class="orderplan" />
      </nut-popup>
    </div>
  </div>
</template>

<script lang="ts" setup name="HomePage">
import { computed, onBeforeMount } from 'vue';
import * as tradeUtil from '/@/utils/trade';
import { useUserStore } from '/@/store/modules/user';
import { setLang } from '/@/i18n';
import { useI18n } from 'vue-i18n';
import { Check, MoreS, ArrowRight } from '@nutui/icons-vue';
import { useStrategyApi } from '/@/api/trade';

const styleObject = { color: 'rgb(204 204 204)' };
const { locale } = useI18n();
const { appContext: { config: { globalProperties } } } = getCurrentInstance();

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

const strategies = reactive({
  floatPL: -20,
  balance: 110,
  equity: 90,
  dayProfit: 2.3,
  accumulatedProfit: 8.9,
  data: [],
});

const showBacktest = ref(false);
onBeforeMount(() => {
  getStrategy();
});

const infinityValue = ref(false);
const hasMore = ref(true);
const current = ref(1);
const getStrategy = async () => {
  let exchange = userStore.getUserInfo.defaultExchange;
  if (showBacktest.value) {
    exchange = 'simulate';
  }
  const r = await useStrategyApi().listHistory({ current: current.value, limit: 100, backtest: showBacktest.value, exchange });
  if (r.code == 0) {
    infinityValue.value = false;
    strategies.data = [...strategies.data, ...r.data.records];
    current.value++;
    if (current.value > r.data.pages) hasMore.value = false;
  }
};

const reloadStrategy = async () => {
  strategies.data = [];
  current.value = 1;
  hasMore.value = true;
  getStrategy();
};

const orderPlanShowed = ref(false);
const orderPlan = reactive({
  columns: [
    {
      title: '序号',
      key: 'num',
      align: 'center',
      stylehead: 'font-size:13px;font-family: "Microsoft YaHei", sans-serif;vertical-align:middle;',
      stylecolumn: 'font-size:13px;font-family: "Microsoft YaHei", sans-serif;color:red;',
    },
    {
      title: '买入张数',
      key: 'quantity',
      align: 'center',
      stylehead: 'font-size:13px;font-family: "Microsoft YaHei", sans-serif;vertical-align:middle;',
      stylecolumn: 'font-size:13px;font-family: "Microsoft YaHei", sans-serif;color:red;',
    },
    {
      title: '买入价格',
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
    orderPlan.columns[1].title = '买入金额';
    if (strategy.tradeType == 'SWAPB') {
      orderPlan.columns[1].title = '买入个数';
    }
    for (let i = 0; i < orderPlan.data.length; i++) {
      orderPlan.data[i].num = i + 1;
    }
  }
};
</script>
<style lang="scss" scoped>
.header {
  line-height: 50px;
  padding: 0 20px;
  font-size: 25px;

  .instId {
    font-weight: 700;
  }

  .condition {
    padding: 0 20px;
    display: flex;
    justify-content: left;

    input[type="checkbox"] {
      vertical-align: middle;
    }
  }

  .condition span:nth-child(2) {
    margin-left: auto;
  }

  .history {
    background-color: #f3ecec;

    .stratergy-item:nth-child(1) {
      padding-top: 20px;
    }
  }

  .digit {
    margin-left: 20px;
    font-size: 25px;
    font-weight: bold;
  }

  .orderplan {
    height: 700px;
  }
}

.stratergy-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;

  .stratergy-item-left {
    flex: 4;
  }

  .stratergy-item-right {
    flex: 3;
  }
}

.operation {
  text-align: center;

  .seperate {
    margin: 0 50px;
  }

  .operation-font-color {
    color: blue;
  }
}

.his-stratergy {
  float: right;
  color: blue;
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
</style>
