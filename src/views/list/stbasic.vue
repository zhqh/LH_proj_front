<template>
  <div class="header">
    <div :class="{ running: strategy.status == 'RUNNING', pause: strategy.status == 'PAUSE' }">
      <div class="stratergy-head">
        <div class="stratergy-item-left">
          <div class="status">
            <IconFont name="check-normal" />
            <b @click="showPauseRemark(strategy.id)"
              ><span :class="{ underline: strategy.status == 'PAUSE' }"> {{ strategy.statusName }}</span
              >{{ strategy.backtest ? $t('list.backtest') : '' }}</b
            ><span class="stratergy-type">{{ tradeUtil.getNameDesc(strategy.name, globalProperties) }}({{ strategy.unit }})</span>
          </div>
        </div>
        <div class="stratergy-item-right">{{ strategy.mode == 'formal' ? '正式单' : '模拟单' }}</div>
      </div>
      <div class="stratergy-item">
        <div class="stratergy-item-left"
          >交易品种<span class="digit">{{
            strategy.instName ? strategy.instName + '(' + strategy.instId + ')' : strategy.instId
          }}</span></div
        >
      </div>
      <div class="stratergy-item">
        <div class="stratergy-item-left"
          >{{ $t('list.todayProfit') }}<span class="digit">{{ strategy.todayProfit && strategy.todayProfit.toFixed(2) }}</span>
        </div>
      </div>
      <div class="stratergy-item">
        <div class="stratergy-item-left"
          >{{ $t('list.accumulatedProfit')
          }}<span class="digit">{{ strategy.accumulatedProfit && strategy.accumulatedProfit.toFixed(2) }}</span>
        </div>
        <div class="stratergy-item-right"
          >总收益率<span class="digit">{{ (strategy.accumulatedProfitRate * 100).toFixed(0) + '%' }}</span>
        </div>
      </div>
      <div class="stratergy-item">
        <div class="stratergy-item-left"
          >{{ $t('list.openQuantity') }}<span class="digit">{{ strategy.openQuantity }}</span></div
        >
        <div class="stratergy-item-right"
          >{{ $t('list.openCount') }}<span class="digit">{{ strategy.openCount }}单</span>
        </div>
      </div>
      <div class="stratergy-item">
        <div class="stratergy-item-left"
          >{{ $t('list.closeCount') }}<span class="digit">{{ strategy.closeCount }}单</span>
        </div>
        <div class="stratergy-item-right"
          >{{ $t('list.maxLoss') }}<span class="digit">{{ (Math.abs(strategy.maxLoss) * 100).toFixed(0) }}%</span>
        </div>
      </div>
      <div class="stratergy-item">
        <div class="stratergy-item-left"
          >{{ $t('list.startTime') }}<span class="digit">{{ strategy.startTime }}</span>
        </div>
      </div>
      <div class="stratergy-item">
        <div class="stratergy-item-right"
          >{{ $t('list.duration') }}<span class="digit">{{ strategy.duration }}天</span>
        </div>
      </div>
      <div class="stratergy-item">
        <div class="stratergy-item-left"
          >{{ $t('list.liqPx') }}<span class="digit">{{ strategy.liqPx || '--' }}</span>
        </div>
      </div>
      <nut-divider :style="styleObject" />
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

  const styleObject = { color: 'rgb(204 204 204)' };
  const userStore = useUserStore();
  const router = useRouter();

  const props = defineProps({
    strategy: Object,
  });

  const { strategy } = toRefs(props);

  onMounted(() => {});

  onActivated(() => {});
</script>
<style lang="scss" scoped>
  .header {
    line-height: 50px;
    padding: 30px;
    font-size: 28px;

    .total-floatPL {
      padding: 0 10px;

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
      font-size: 28px;

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
      // font-weight: bold;
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
    padding: 10px 20px;
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
    padding-top: 10px;

    .stratergy-item-left {
      flex: 2;
    }

    .stratergy-item-right {
      flex: 1;
    }
  }

  .operation {
    text-align: center;
    font-size: 28px;

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
    // background-color: #c7e0c7;
  }

  .pause {
    // background-color: #ebeba5;
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
</style>
