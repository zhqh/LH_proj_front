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
    <nut-divider :style="styleObject" />
  </div>
  <h3 class="basic-title"
    >{{ $t('list.orderPlan')
    }}<span
      >{{ $t('create_strategy.lowestOpenQuantity') }}{{ baseStrategyParam.context.lowestOpenQuantity }}({{
        baseStrategyParam.param.unit
      }})</span
    ></h3
  >
  <div class="course-type">
    <nut-row>
      <nut-col :span="5">
        <div class="flex-content">{{ $t('create_strategy.batch_profit') }}</div>
      </nut-col>
      <nut-col :span="7">
        <div class="dropdown-contain target-profit">
          <nut-input placeholder="" v-model="customStrategyParam.param.batch_profit_rate" input-align="right" type="number" />%
        </div>
      </nut-col>
      <nut-col :span="5">
        <div class="flex-content">{{ $t('create_strategy.batch_loss') }}</div>
      </nut-col>
      <nut-col :span="7">
        <div class="dropdown-contain target-profit">
          <nut-input placeholder="" v-model="customStrategyParam.param.batch_loss_rate" input-align="right" type="number" />%
        </div>
      </nut-col>
    </nut-row>
    <nut-row>
      <div class="grid-head">
        <nut-col :span="3">
          <div class="flex-content">{{ $t('common.num') }}</div>
        </nut-col>
        <nut-col :span="6">
          <div class="flex-content">{{ $t('create_strategy.quantity') }}({{ baseStrategyParam.param.unit }})</div>
        </nut-col>
        <nut-col :span="5">
          <div class="flex-content">{{ $t('create_strategy.addition_gap') }}%</div>
        </nut-col>
        <nut-col :span="3">
          <div class="flex-content">{{ $t('create_strategy.stop_profit') }}%</div>
        </nut-col>
        <nut-col :span="3">
          <div class="flex-content">{{ $t('create_strategy.adjust') }}%</div>
        </nut-col>
        <nut-col :span="4">
          <div class="flex-content">{{ $t('create_strategy.stop_loss') }}%</div><span @click="addRow">+</span>
        </nut-col>
      </div>
    </nut-row>
    <nut-row v-for="(item, index) in customStrategyParam.param.grid_lines" :key="item.id">
      <div class="grid-line">
        <nut-col :span="3">
          <span>{{ index + 1 }}</span>
        </nut-col>
        <nut-col :span="6">
          <nut-input placeholder="" v-model="item.quantity" input-align="left" type="number" />
        </nut-col>
        <nut-col :span="5">
          <nut-input placeholder="" v-model="item.addition_gap" input-align="left" type="number" />
        </nut-col>
        <nut-col :span="3">
          <nut-input placeholder="" v-model="item.target_profit_rate" input-align="left" type="number" />
        </nut-col>
        <nut-col :span="3">
          <nut-input placeholder="" v-model="item.adjust_rate" input-align="left" type="number" />
        </nut-col>
        <nut-col :span="4">
          <nut-input placeholder="" v-model="item.loss_condition_rate" input-align=" left" type="number" /><span @click="deleteRow">-</span>
        </nut-col>
      </div>
    </nut-row>
    <nut-divider :style="styleObject" />
  </div>
  <div>
    <nut-popup position="bottom" v-model:visible="profitModeShow">
      <nut-picker
        v-model="profitMode"
        :columns="profitModeColumns"
        :title="$t('create_strategy.select_profit_mode')"
        @confirm="profitModePopupConfirm"
        @cancel="profitModeShow = false"
      />
    </nut-popup>
  </div>
</template>

<script lang="ts" setup name="DemoPage">
  import { i18n } from '/@/i18n';
  import { useUserStore } from '/@/store/modules/user';
  import { Check, MoreS, ArrowDown } from '@nutui/icons-vue';
  import { useStrategyApi, useApiKeyApi, useExchangeApi } from '/@/api/trade';
  import { getRecentMonth, getRecentYearMonthString, formatDateTime } from '/@/utils/date';
  import * as tradeUtil from '/@/utils/trade';
  import { showToast } from 'vant';
  import moment from 'moment';

  // import { useI18n } from 'vue-i18n';
  // const { locale } = useI18n();

  const route = useRoute();
  const router = useRouter();
  const userStore = useUserStore();
  const styleObject = { color: 'rgb(204 204 204)' };
  const {
    appContext: {
      config: { globalProperties },
    },
  } = getCurrentInstance();
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
      position: 0,
      batch_profit_rate: '',
      batch_loss_Rate: '',
      grid_lines: [],
    },
    context: {},
  });

  const getCustomParam = async (baseStrategyParam) => {
    let batch_profit_rate = customStrategyParam.param.batch_profit_rate && customStrategyParam.param.batch_profit_rate / 100;
    let batch_loss_Rate = customStrategyParam.param.batch_loss_Rate && customStrategyParam.param.batch_loss_Rate / 100;
    let position = customStrategyParam.param.grid_lines.reduce((pre, cur) => pre + parseFloat(cur.quantity), 0);
    let addition_count = customStrategyParam.param.grid_lines.length;
    let grid_lines = JSON.parse(JSON.stringify(customStrategyParam.param.grid_lines));
    grid_lines.forEach((e) => {
      e.addition_gap = e.addition_gap && e.addition_gap / 100;
      e.target_profit_rate = e.target_profit_rate && e.target_profit_rate / 100;
      e.adjust_rate = e.adjust_rate && e.adjust_rate / 100;
      e.loss_condition_rate = e.loss_condition_rate && e.loss_condition_rate / 100;
    });
    return { ...customStrategyParam.param, position, addition_count, grid_lines, batch_profit_rate, batch_loss_Rate };
  };

  const verify = async (baseStrategyParam) => {
    if (customStrategyParam.param.grid_lines.length == 0) {
      showToast(globalProperties.$t('create_strategy.empty_order_plan'));
      return false;
    }
    let errorRow = customStrategyParam.param.grid_lines.some((e) => !e.quantity || !e.addition_gap || !e.target_profit_rate);
    if (errorRow) {
      showToast(globalProperties.$t('create_strategy.empty_opencount_additiongap_profitrate'));
      return false;
    }
    errorRow = customStrategyParam.param.grid_lines.some(
      (e) => e.quantity * baseStrategyParam.param.lever < baseStrategyParam.context.lowestOpenQuantity,
    );
    if (errorRow) {
      showToast(
        `${globalProperties.$t('create_strategy.lowestOpenQuantity')}<${baseStrategyParam.context.lowestOpenQuantity}${
          baseStrategyParam.param.unit
        }`,
      );
      return false;
    }
    let position = customStrategyParam.param.grid_lines.reduce((pre, cur) => pre + parseFloat(cur.quantity), 0);
    if (position <= 0) {
      showToast(globalProperties.$t('create_strategy.empty_position'));
      return false;
    }
    if (position >= baseStrategyParam.context.availBal) {
      if (baseStrategyParam.param.backtest != 'true') {
        showToast(globalProperties.$t('create_strategy.position_greatethen_availBal'));
        return false;
      }
    }

    return true;
  };
  defineExpose({ getCustomParam, verify });

  const addRow = async () => {
    customStrategyParam.param.grid_lines.push({
      id: new Date().valueOf(),
      quantity: 100,
      addition_gap: 8,
      target_profit_rate: 5,
      adjust_rate: 1,
      loss_condition_rate: '',
    });
  };
  const deleteRow = async (id) => {
    let index = customStrategyParam.param.grid_lines.findIndex((e) => (e.id = id));
    customStrategyParam.param.grid_lines.splice(index, 1);
  };
</script>

<style lang="scss" scoped>
  @import '../styles/mixin.scss';

  .header-stcreate {
    font-size: 28px;
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
      margin-right: 20px;
    }

    .course-type {
      padding: 0 60px;

      :nth-child(1) {
        padding: 0;
      }

      .nut-form-item {
        align-items: center;
        // margin: 0 40px;
        // line-height: 60px;
      }

      .nut-divider {
        margin: 10px;
      }
    }

    .nut-button--block {
      // display: inline-block;
    }

    .nut-radio__label {
      font-size: 28px;
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
      font-size: 28px;

      span {
        font-size: small;
        font-weight: 500;
        padding-left: 10px;
        color: red;
      }
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

    .grid-head :nth-last-child(1) {
      display: flex;
      justify-content: space-between;

      span {
        font-size: 45px;
      }
    }

    .grid-line {
      :nth-child(1) {
        line-height: 45px;

        span {
          padding-left: 15px;
        }
      }

      :nth-last-child(1) {
        padding-right: 6px;
        display: flex;
        justify-content: space-between;

        span {
          font-size: 45px;
        }
      }
    }
  }

  .nut-row {
    padding: 10px 0;
  }
</style>
