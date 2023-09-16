<template>
  <div class="header">
    <div class="basic-info">
      <h4 class="basic-title">{{ $t('create_strategy.base_param') }}</h4>
      <div class="stratergy-item">
        <div class="stratergy-item-left"
          >{{ $t('create_strategy.type')
          }}<span class="digit">{{ tradeUtil.getTypeNameDesc(baseStrategyParam.param.type, globalProperties) }}</span>
        </div>
        <div class="stratergy-item-right"
          ><span class="digit">{{ tradeUtil.getNameDesc(baseStrategyParam.param.name, globalProperties) }}</span></div
        >
      </div>
      <div class="stratergy-item">
        <div class="stratergy-item-left"
          >{{ $t('create_strategy.tradeType')
          }}<span class="digit">{{ tradeUtil.getTradeTypeNameDesc(baseStrategyParam.param.tradeType, globalProperties) }}</span></div
        >
      </div>
      <div class="stratergy-item">
        <div class="stratergy-item-left"
          >{{ $t('create_strategy.instId')
          }}<span class="digit">{{
            baseStrategyParam.param.instName
              ? baseStrategyParam.param.instName + '(' + baseStrategyParam.param.instId + ')'
              : baseStrategyParam.param.instId
          }}</span></div
        >
      </div>
      <div class="stratergy-item">
        <div class="stratergy-item-left"
          >{{ $t('create_strategy.direction')
          }}<span class="digit">{{
            baseStrategyParam.param.posSide == 'long'
              ? $t('create_strategy.long')
              : baseStrategyParam.param.posSide == 'short'
              ? $t('create_strategy.short')
              : $t('create_strategy.longshort')
          }}</span></div
        >
        <div class="stratergy-item-right"
          >{{ $t('create_strategy.lever') }}<span class="digit">{{ baseStrategyParam.param.lever }}</span></div
        >
      </div>
    </div>
    <keep-alive>
      <component :is="currentStrategy" ref="currentStrategyComponent" :baseStrategyParam="baseStrategyParam" />
    </keep-alive>
    <div class="basic-info">
      <nut-divider :style="styleObject" />
    </div>
    <div class="basic-info">
      <h4 class="basic-title">{{ $t('create_strategy.controll') }}</h4>
      <div class="stratergy-item">
        <div class="stratergy-item-left"
          >{{ $t('create_strategy.triggerCondition')
          }}<span class="digit">{{
            tradeUtil.gettriggerConditionNameDesc(baseStrategyParam.param.triggerCondition, globalProperties)
          }}</span>
        </div>
        <div class="stratergy-item-right" v-if="baseStrategyParam.param.triggerCondition == 'price'"
          >{{ $t('create_strategy.triggerPrice') }}<span class="digit">{{ baseStrategyParam.param.triggerPrice }}</span></div
        >
        <div class="stratergy-item-left"
          >{{ $t('create_strategy.loopMode')
          }}<span class="digit">{{ tradeUtil.getLoopModeNameDesc(baseStrategyParam.param.loopMode, globalProperties) }}</span></div
        >
      </div>
      <div class="stratergy-item">
        <div class="stratergy-item-left close-strategy"
          >{{ $t('create_strategy.closeStrategy') }}<span>{{ $t('create_strategy.profit') }}</span>
          <div>{{ (baseStrategyParam.param.closeProfitRate && baseStrategyParam.param.closeProfitRate * 100) || '--' }} </div>
          <span>%</span>
          <span class="loss-label">{{ $t('create_strategy.loss') }}</span>
          <div>
            {{ (baseStrategyParam.param.closeLossRate && baseStrategyParam.param.closeLossRate * 100) || '--' }}
          </div>
          <span>%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup name="HomePage">
  import { computed, onBeforeMount } from 'vue';
  import { useUserStore } from '/@/store/modules/user';
  import { setLang } from '/@/i18n';
  import { useI18n } from 'vue-i18n';
  import { Check, MoreS, ArrowRight } from '@nutui/icons-vue';
  import * as tradeUtil from '/@/utils/trade';
  import { useStrategyParamApi } from '/@/api/trade';
  import { showToast } from 'vant';

  import SimpleGrid from '../../components/simple-grid-param.vue';
  import CustomGrid from '../../components/custom-grid-param.vue';
  import LongShortHedgingGrid from '../../components/longshort-hedging-grid-param.vue';
  import TrendTrade from '../../components/trendtrade-param.vue';
  import ReboundTrade from '../../components/reboundtrade-param.vue';

  let route = useRoute();
  const {
    appContext: {
      config: { globalProperties },
    },
  } = getCurrentInstance();

  const baseStrategyParam = reactive({
    param: {},
  });

  const activeNames = reactive([1, 2]);
  const styleObject = { color: 'rgb(204 204 204)' };
  const { locale } = useI18n();

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

  const strategyMap = {
    SimpleGrid: shallowRef(SimpleGrid),
    CustomGrid: shallowRef(CustomGrid),
    LongShortHedgingGrid: shallowRef(LongShortHedgingGrid),
    TrendTrade: shallowRef(TrendTrade),
    ReboundTrade: shallowRef(ReboundTrade),
  };
  let currentStrategy;
  let currentStrategyComponent = ref();

  onMounted(() => {
    getStrategyParam();
  });

  onActivated(() => {
    getStrategyParam();
  });

  const props = defineProps({
    strategyParamId: String,
  });

  const { strategyParamId } = toRefs(props);

  const getStrategyParam = async () => {
    const r = await useStrategyParamApi().list(strategyParamId.value);
    if (r.code == 0) {
      Object.assign(baseStrategyParam.param, r.data);
      currentStrategy = strategyMap[baseStrategyParam.param.name];
    }
  };
</script>
<style lang="scss" scoped>
  .header {
    line-height: 50px;
    padding: 10px 50px;
    font-size: 28px;

    .digit {
      margin-left: 20px;
      font-size: 28px;
      // font-weight: bold;
    }

    .stratergy-type {
      margin-left: 50px;
      // font-weight: bold;
    }
  }

  .basic-title {
    padding: 10px 0;
  }

  .basic-info {
    padding: 0;
    font-size: 28px;
    // border: 1px solid gray;
    // border-radius: 10px;
    // background-color: #f1f1f1;
  }

  .stratergy-item {
    display: flex;
    justify-content: left;
    align-items: center;
    padding: 10px 20px;

    .stratergy-item-left {
      flex: 1;
      // width: 60%;
      // margin-left: auto;
    }

    .stratergy-item-right {
      flex: 1;
      // width: 60%;
      // margin-left: auto;
    }
  }

  .operation {
    text-align: center;

    .seperate {
      margin: 0 100px;
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
    font-size: 28px;
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

  .close-strategy {
    display: flex;

    span,
    div {
      padding-left: 40px;
    }

    :nth-child(3),
    :nth-child(6) {
      padding-left: 0;
    }
  }
</style>
