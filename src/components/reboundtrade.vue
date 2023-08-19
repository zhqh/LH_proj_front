<template>
  <div class="course-type">
    <nut-row class="pos-side">
      <nut-col :span="5">
        <div>{{ $t('create_strategy.direction') }}</div>
      </nut-col>
      <nut-col :span="19">
        <div class="radio-group-container">
          <nut-radio-group v-model="customStrategyParam.param.pos_side" direction="horizontal">
            <nut-radio label="long">{{ $t('create_strategy.long') }}</nut-radio>
            <nut-radio label="short">{{ $t('create_strategy.short') }}</nut-radio>
          </nut-radio-group>
        </div>
      </nut-col>
    </nut-row>
    <nut-row>
      <nut-col :span="5">
        <div class="flex-content">{{ $t('create_strategy.priceArea') }}</div>
      </nut-col>
      <nut-col :span="7">
        <div class="dropdown-contain">
          <nut-input placeholder="" v-model="customStrategyParam.param.low_price" type="number" />
        </div>
      </nut-col>
      <nut-col :span="3">
        <div class="flex-content">{{ $t('common.to') }}</div>
      </nut-col>
      <nut-col :span="9">
        <nut-input placeholder="" v-model="customStrategyParam.param.high_price" type="number" />
      </nut-col>
    </nut-row>
    <nut-row>
      <nut-col :span="5">
        <div class="flex-content">{{ $t('create_strategy.fluctuation') }}</div>
      </nut-col>
      <nut-col :span="7" class="fluctuation">
        <div><nut-input placeholder="" v-model="customStrategyParam.param.fluctuation" type="number" /></div>
        <span>%</span>
      </nut-col>
      <nut-col :span="5">
        <div class="flex-content">{{ $t('create_strategy.addition_gap') }}</div>
      </nut-col>
      <nut-col :span="7" class="addition_gap">
        <div><nut-input placeholder="" v-model="customStrategyParam.param.addition_gap" type="number" /></div>
        <span>%</span>
      </nut-col>
    </nut-row>
    <nut-row>
      <nut-col :span="5">
        <div class="flex-content">{{ $t('create_strategy.quantity_serial') }}</div>
      </nut-col>
      <nut-col :span="19">
        <nut-input placeholder="" v-model="customStrategyParam.param.quantity_serial" />
      </nut-col>
    </nut-row>
    <nut-row>
      <nut-col :span="5">
        <div class="flex-content">{{ $t('create_strategy.first_order_money') }}</div>
      </nut-col>
      <nut-col :span="7">
        <nut-input placeholder="" v-model="customStrategyParam.param.first_order_money" type="number" />
      </nut-col>
      <nut-col :span="5">
        <div class="flex-content">{{ $t('create_strategy.position') }}</div>
      </nut-col>
      <nut-col :span="5">
        <div class="grid-count">
          <nut-input placeholder="" v-model="customStrategyParam.param.position" readonly />
          <div @click="showLowestOpenQuantity">
            <IconFont name="ask" />
          </div>
        </div>
      </nut-col>
    </nut-row>
    <nut-divider :style="styleObject" />
  </div>
  <h3 class="basic-title">{{ $t('create_strategy.profit_loss') }}</h3>
  <div class="course-type" style="display: none">
    <nut-row>
      <nut-col :span="5">
        <div class="flex-content">{{ $t('create_strategy.profit_condition') }}</div>
      </nut-col>
      <nut-col :span="7">
        <div class="flex-content flex-content-light">
          <nut-input :placeholder="targetProfitConditionDesc" readonly>
            <template #right>
              <ArrowDown @click="targetProfitConditionShow = true" />
            </template>
          </nut-input>
        </div>
      </nut-col>
    </nut-row>
    <nut-row>
      <nut-col :span="5">
        <div class="flex-content">{{ $t('create_strategy.traget_profit_rate') }}</div>
      </nut-col>
      <nut-col :span="7">
        <div class="dropdown-contain target-profit">
          <nut-input placeholder="" v-model="customStrategyParam.param.target_profit_rate" input-align="right" type="number" />%
        </div>
      </nut-col>
      <nut-col :span="5" v-show="customStrategyParam.param.target_profit_condition == 'gainThenFall'">
        <div class="flex-content">{{ $t('create_strategy.adjust_rate') }}</div>
      </nut-col>
      <nut-col :span="7" v-show="customStrategyParam.param.target_profit_condition == 'gainThenFall'">
        <div class="dropdown-contain target-profit">
          <nut-input placeholder="" v-model="customStrategyParam.param.adjust_rate" input-align="right" type="number" />%
        </div>
      </nut-col>
    </nut-row>
    <nut-row>
      <nut-col :span="5">
        <div class="flex-content">{{ $t('create_strategy.loss_condition') }}</div>
      </nut-col>
      <nut-col :span="7">
        <div class="flex-content flex-content-light">
          <nut-input :placeholder="lossConditionDesc" readonly>
            <template #right>
              <ArrowDown @click="lossConditionShow = true" />
            </template>
          </nut-input>
        </div>
      </nut-col>
    </nut-row>
    <nut-row v-show="customStrategyParam.param.loss_condition == 'rate'">
      <nut-col :span="5">
        <div class="flex-content">{{ $t('create_strategy.loss_rate') }}</div>
      </nut-col>
      <nut-col :span="7">
        <div class="dropdown-contain target-profit">
          <nut-input placeholder="" v-model="customStrategyParam.param.loss_condition_rate" input-align="right" />%
        </div>
      </nut-col>
    </nut-row>
    <nut-divider :style="styleObject" />
  </div>
  <div>
    <nut-popup position="bottom" v-model:visible="targetProfitConditionShow">
      <nut-picker
        v-model="targetProfitCondition"
        :columns="targetProfitConditionColumns"
        :title="$t('create_strategy.select_profit_condition')"
        @confirm="targetProfitConditionPopupConfirm"
        @cancel="targetProfitConditionShow = false"
      />
    </nut-popup>
    <nut-popup position="bottom" v-model:visible="lossConditionShow">
      <nut-picker
        v-model="lossCondition"
        :columns="lossConditionColumns"
        :title="$t('create_strategy.select_loss_condition')"
        @confirm="lossConditionPopupConfirm"
        @cancel="lossConditionShow = false"
      />
    </nut-popup>
  </div>
</template>

<script lang="ts" setup name="DemoPage">
  import { i18n } from '/@/i18n';
  import { useUserStore } from '/@/store/modules/user';
  import { Check, Loading, ArrowDown, IconFont } from '@nutui/icons-vue';
  import '@nutui/icons-vue/dist/style_iconfont.css';
  import { useStrategyApi, useApiKeyApi, useExchangeApi } from '/@/api/trade';
  import { getRecentMonth, getRecentYearMonthString, formatDateTime } from '/@/utils/date';
  import * as tradeUtil from '/@/utils/trade';
  import { showToast } from 'vant';
  import moment from 'moment';

  // import { useI18n } from 'vue-i18n';
  // const { locale } = useI18n();
  const {
    appContext: {
      config: { globalProperties },
    },
  } = getCurrentInstance();

  const route = useRoute();
  const router = useRouter();
  const userStore = useUserStore();
  const styleObject = { color: 'rgb(204 204 204)' };
  // console.log();

  const props = defineProps({
    //子组件接收父组件传递过来的值
    baseStrategyParam: Object,
  });

  const { baseStrategyParam } = toRefs(props);

  const customStrategyParam = reactive({
    param: {
      low_price: '',
      high_price: '',
      pos_side: 'long',
      profit_mode: 'single',
      first_order_money: '',
      fluctuation: 4.5,
      addition_gap: 0.5,
      quantity_serial: '1,1,1,1,2,2,2,2,3,3,3,4,4,5,5,6',
      position: '',
      addition_rate: 0.0,
      addition_count: '',
      target_profit_condition: 'gainThenFall',
      target_profit_rate: 4,
      adjust_rate: 1,
      loss_condition: 'none',
      loss_condition_rate: 5,
    },
    context: {},
  });

  watch(
    () => {
      return [customStrategyParam.param.first_order_money];
    },
    (newValues) => {
      if (newValues[0]) {
        customStrategyParam.param.position = newValues[0] * 49;
      }
    },
  );

  const targetProfitConditionShow = ref(false);
  // const targetProfitCondition = ref();
  const targetProfitConditionDesc = ref(globalProperties.$t('profitCondition.gainThenFall'));
  const targetProfitConditionColumns = ref(tradeUtil.map2List(tradeUtil.targetProfitConditionNameMap, globalProperties));
  const targetProfitConditionPopupConfirm = ({ selectedValue, selectedOptions }) => {
    customStrategyParam.param.target_profit_condition = selectedValue[0];
    targetProfitConditionDesc.value = selectedOptions.map((val) => val.text).join(',');
    targetProfitConditionShow.value = false;
  };

  const lossConditionShow = ref(false);
  // const lossCondition = ref();
  const lossConditionDesc = ref(globalProperties.$t('lossCondition.none'));
  const lossConditionColumns = ref(tradeUtil.map2List(tradeUtil.lossConditionNameMap, globalProperties));
  const lossConditionPopupConfirm = ({ selectedValue, selectedOptions }) => {
    customStrategyParam.param.loss_condition = selectedValue[0];
    lossConditionDesc.value = selectedOptions.map((val) => val.text).join(',');
    lossConditionShow.value = false;
  };
  const getCustomParam = async (baseStrategyParam) => {
    let target_profit_rate = customStrategyParam.param.target_profit_rate / 100;
    let adjust_rate = customStrategyParam.param.adjust_rate / 100;
    let loss_condition_rate = customStrategyParam.param.loss_condition_rate / 100;
    let fluctuation = customStrategyParam.param.fluctuation / 100;
    let addition_gap = customStrategyParam.param.addition_gap / 100;
    let quantity_serial = customStrategyParam.param.quantity_serial.split(',').map((e) => parseFloat(e));
    let addition_count = quantity_serial.length;
    return {
      ...customStrategyParam.param,
      target_profit_rate,
      adjust_rate,
      loss_condition_rate,
      fluctuation,
      addition_gap,
      quantity_serial,
      addition_count,
    };
  };

  const verify = async (baseStrategyParam) => {
    if (!customStrategyParam.param.first_order_money) {
      showToast(globalProperties.$t('create_strategy.empty_first_order_money'));
      return false;
    }
    if (
      parseFloat(customStrategyParam.param.first_order_money * baseStrategyParam.param.lever) < baseStrategyParam.context.lowestOpenQuantity
    ) {
      showToast(
        `${globalProperties.$t('create_strategy.lowestOpenQuantity')}${baseStrategyParam.context.lowestOpenQuantity}${
          baseStrategyParam.param.unit
        }`,
      );
      return false;
    }
    if (customStrategyParam.param.position >= parseFloat(baseStrategyParam.context.availBal)) {
      if (baseStrategyParam.param.backtest != 'true') {
        showToast(globalProperties.$t('create_strategy.position_greatethen_availBal'));
        return false;
      }
    }
    return true;
  };

  defineExpose({ getCustomParam, verify });

  const showLowestOpenQuantity = async () => {
    if (!baseStrategyParam.value.param.instId) {
      showToast(globalProperties.$t('create_strategy.select_instId'));
      return;
    }
    showToast(
      `${globalProperties.$t('create_strategy.lowestOpenQuantity')}${baseStrategyParam.value.context.lowestOpenQuantity}${
        baseStrategyParam.value.param.unit
      }`,
    );
  };
</script>

<style lang="scss" scoped>
  @import '../styles/mixin.scss';

  .header-stcreate {
    font-size: 25px;
    line-height: 45px;
    padding-top: 25px;

    .query-date {
      margin: 0 35px 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 25px;
    }

    .nut-input {
      padding: 0;
    }

    .dropdown-contain {
      margin-right: 0;
    }

    .course-type {
      padding: 0 60px;

      .pos-side {
        display: flex;
        align-items: center;

        .nut-radio-group .nut-radio {
          margin-bottom: 0;
        }
      }

      .nut-form-item {
        align-items: center;
        // margin: 0 40px;
        // line-height: 60px;
      }

      .addition_gap {
        display: flex;

        span {
          padding-right: 50px;
        }
      }

      .fluctuation {
        display: flex;

        span {
          padding-right: 50px;
        }
      }

      .nut-divider {
        margin: 10px;
      }

      .radio-group-container {
        display: flex;
      }
    }

    .nut-button--block {
      // display: inline-block;
    }

    .nut-radio__label {
      font-size: 25px;
    }

    .st-type {
      line-height: 15px;
    }

    .nut-radio-group {
      line-height: 15px;
    }

    .custom-button {
      width: 26px;
      color: #fff;
      font-size: 10px;
      line-height: 30px;
      text-align: center;
      background-color: #ee0a24;
      border-radius: 100px;
    }

    .range-adjust {
      margin-top: 18px;
    }

    .basic-title {
      padding: 10px 50px;
    }

    .nut-collapse-item__title-mtitle {
      font-weight: bold;
    }

    .close-strategy {
      width: 75%;
      display: flex;

      div {
        flex: 1;
      }

      .loss-label {
        padding-left: 50px;
      }
    }

    .target-profit {
      display: flex;
      width: 60%;
    }

    .grid-count {
      display: flex;

      .nut-icon-ask {
        background-color: red;
        color: white;
        border-radius: 50%;
        vertical-align: middle;
        margin-right: 10px;
      }
    }
  }
</style>
