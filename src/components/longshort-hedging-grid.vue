<template>
  <div class="course-type">
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
    <nut-divider :style="{ color: 'red', borderColor: '#1989fa', padding: '0 16px' }" content-position="left">{{
      $t('create_strategy.long_position')
    }}</nut-divider>
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
          <div class="flex-content">{{ $t('create_strategy.stop_loss') }}%</div><span @click="addLongRow">+</span>
        </nut-col>
      </div>
    </nut-row>
    <nut-row v-for="(item, index) in customStrategyParam.param.long_grid_lines" :key="item.id">
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
          <nut-input placeholder="" v-model="item.loss_condition_rate" input-align=" left" type="number" /><span @click="deleteLongRow"
            >-</span
          >
        </nut-col>
      </div>
    </nut-row>
    <br />
    <nut-divider :style="{ color: 'green', borderColor: '#1989fa', padding: '0 16px' }" content-position="left">{{
      $t('create_strategy.short_position')
    }}</nut-divider>
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
          <div class="flex-content">{{ $t('create_strategy.stop_loss') }}%</div><span @click="addShortRow">+</span>
        </nut-col>
      </div>
    </nut-row>
    <nut-row v-for="(item, index) in customStrategyParam.param.short_grid_lines" :key="item.id">
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
          <nut-input placeholder="" v-model="item.loss_condition_rate" input-align=" left" type="number" /><span @click="deleteShortRow"
            >-</span
          >
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
        title="请选择盈利方式"
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
  // console.log();
  const {
    appContext: {
      config: { globalProperties },
    },
  } = getCurrentInstance();

  const props = defineProps({
    //子组件接收父组件传递过来的值
    baseStrategyParam: Object,
  });

  const { baseStrategyParam } = toRefs(props);

  const customStrategyParam = reactive({
    param: {
      low_price: '',
      high_price: '',
      pos_side: 'longshort',
      position: 0,
      batch_profit_rate: '',
      batch_loss_rate: '',
      long_grid_lines: [],
      short_grid_lines: [],
    },
    context: {},
  });

  const getCustomParam = async (param, context) => {
    let batch_profit_rate = customStrategyParam.param.batch_profit_rate && customStrategyParam.param.batch_profit_rate / 100;
    let batch_loss_rate = customStrategyParam.param.batch_loss_rate && customStrategyParam.param.batch_loss_rate / 100;
    let long_position = customStrategyParam.param.long_grid_lines.reduce((pre, cur) => pre + parseFloat(cur.quantity), 0);
    let short_position = customStrategyParam.param.short_grid_lines.reduce((pre, cur) => pre + parseFloat(cur.quantity), 0);
    let position = long_position + short_position;
    let addition_count = customStrategyParam.param.long_grid_lines.length + customStrategyParam.param.short_grid_lines.length;
    let long_grid_lines = formatGridLines(customStrategyParam.param.long_grid_lines);
    let short_grid_lines = formatGridLines(customStrategyParam.param.short_grid_lines);
    return {
      ...customStrategyParam.param,
      position,
      addition_count,
      long_grid_lines,
      short_grid_lines,
      batch_profit_rate,
      batch_loss_rate,
    };
  };

  const formatGridLines = (xx_grid_lines) => {
    let grid_lines = JSON.parse(JSON.stringify(xx_grid_lines));
    grid_lines.forEach((e) => {
      e.addition_gap = e.addition_gap && e.addition_gap / 100;
      e.target_profit_rate = e.target_profit_rate && e.target_profit_rate / 100;
      e.adjust_rate = e.adjust_rate && e.adjust_rate / 100;
      e.loss_condition_rate = e.loss_condition_rate && e.loss_condition_rate / 100;
    });
    return grid_lines;
  };

  const verify = async (baseStrategyParam) => {
    if (customStrategyParam.param.long_grid_lines.length == 0 || customStrategyParam.param.short_grid_lines.length == 0) {
      showToast(globalProperties.$t('create_strategy.empty_order_plan'));
      return false;
    }
    let errorRow =
      customStrategyParam.param.long_grid_lines.some((e) => !e.quantity || !e.addition_gap || !e.target_profit_rate) ||
      customStrategyParam.param.short_grid_lines.some((e) => !e.quantity || !e.addition_gap || !e.target_profit_rate);
    if (errorRow) {
      showToast(globalProperties.$t('create_strategy.empty_opencount_additiongap_profitrate'));
      return false;
    }
    errorRow =
      customStrategyParam.param.long_grid_lines.some(
        (e) => e.quantity * baseStrategyParam.param.lever < baseStrategyParam.context.lowestOpenQuantity,
      ) ||
      customStrategyParam.param.short_grid_lines.some(
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
    let longPosition = customStrategyParam.param.long_grid_lines.reduce((pre, cur) => pre + parseFloat(cur.quantity), 0);
    let shortPosition = customStrategyParam.param.short_grid_lines.reduce((pre, cur) => pre + parseFloat(cur.quantity), 0);
    if (longPosition <= 0 || shortPosition < 0) {
      showToast(globalProperties.$t('create_strategy.empty_position'));
      return false;
    }
    if (longPosition + shortPosition >= baseStrategyParam.context.availBal) {
      if (baseStrategyParam.param.backtest != 'true') {
        showToast(globalProperties.$t('create_strategy.position_greatethen_availBal'));
        return false;
      }
    }
    return true;
  };
  defineExpose({ getCustomParam, verify });

  const addLongRow = async () => {
    customStrategyParam.param.long_grid_lines.push({
      id: new Date().valueOf(),
      quantity: 100,
      addition_gap: 8,
      target_profit_rate: 5,
      adjust_rate: 1,
      loss_condition_rate: '',
    });
  };
  const deleteLongRow = async (id) => {
    let index = customStrategyParam.param.long_grid_lines.findIndex((e) => (e.id = id));
    customStrategyParam.param.long_grid_lines.splice(index, 1);
  };

  const addShortRow = async () => {
    customStrategyParam.param.short_grid_lines.push({
      id: new Date().valueOf(),
      quantity: 100,
      addition_gap: 8,
      target_profit_rate: 5,
      adjust_rate: 1,
      loss_condition_rate: '',
    });
  };
  const deleteShortRow = async (id) => {
    let index = customStrategyParam.param.short_grid_lines.findIndex((e) => (e.id = id));
    customStrategyParam.param.short_grid_lines.splice(index, 1);
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
