<template>
  <div class="basic-info">
    <div class="stratergy-item">
      <div class="stratergy-item-left">{{ $t('create_strategy.priceArea') }}<span class="digit">{{
        baseStrategyParam.param.customParam.low_price }}</span>
      </div>
      <div class="stratergy-item-right">{{ $t('common.to') }}<span class="digit">{{
        baseStrategyParam.param.customParam.high_price }}</span>
      </div>
    </div>
    <div class="stratergy-item">
      <div class="stratergy-item-left">{{ baseStrategyParam.param.tradeType == 'SPOT' ? $t('create_strategy.position') :
        $t('create_strategy.margin')
      }}<span class="digit">{{ baseStrategyParam.param.position }}</span></div>
      <div class="stratergy-item-right">{{ $t('create_strategy.addtion_count') }}<span class="digit">{{
        baseStrategyParam.param.customParam.addition_count
      }}</span>
      </div>
    </div>
  </div>
  <div class="basic-info"><nut-divider :style="styleObject" /></div>
  <h4 class="basic-title">{{ $t('list.orderPlan') }}</h4>
  <div class="basic-info">
    <div class="stratergy-item">
      <div class="stratergy-item-left">{{ $t('create_strategy.batch_profit') }}<span class="digit">{{
        baseStrategyParam.param.customParam.batch_profit_rate ?
        (baseStrategyParam.param.customParam.batch_profit_rate * 100).toFixed(0) : '--' }}%</span>
      </div>
      <div class="stratergy-item-left">{{ $t('create_strategy.batch_loss') }}<span class="digit">{{
        baseStrategyParam.param.customParam.batch_loss_rate ?
        (baseStrategyParam.param.customParam.batch_loss_rate * 100).toFixed(0) : '--' }}%</span>
      </div>
    </div>
    <div class="stratergy-item grid-head">
      <div class="stratergy-item-left">{{ $t('common.num') }}
      </div>
      <div class="stratergy-item-left">{{ $t('create_strategy.quantity') }}({{ baseStrategyParam.param.unit
      }})<span></span>
      </div>
      <div class="stratergy-item-left">{{ $t('create_strategy.addition_gap') }}<span>%</span>
      </div>
      <div class="stratergy-item-left">{{ $t('create_strategy.stop_profit') }}<span>%</span>
      </div>
      <div class="stratergy-item-left">{{ $t('create_strategy.adjust') }}<span>%</span>
      </div>
      <div class="stratergy-item-left">{{ $t('create_strategy.stop_loss') }}<span>%</span>
      </div>
    </div>
    <div class="stratergy-item grid-line" v-for="(item, index) in baseStrategyParam.param.customParam.grid_lines"
      :key="item.id">
      <div class="stratergy-item-left"><span>{{ index + 1 }}</span>
      </div>
      <div class="stratergy-item-left"><span>{{ item.quantity }}</span>
      </div>
      <div class="stratergy-item-left"><span>{{ (item.addition_gap && item.addition_gap * 100) || '--' }}</span>
      </div>
      <div class="stratergy-item-left"><span>{{ (item.target_profit_rate && item.target_profit_rate * 100) || '--'
      }}</span>
      </div>
      <div class="stratergy-item-left"><span>{{ (item.adjust_rate && item.adjust_rate * 100) || '--' }}</span>
      </div>
      <div class="stratergy-item-left"><span>{{ (item.loss_condition_rate && item.loss_condition_rate * 100) || '--'
      }}</span>
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

let route = useRoute();

const props = defineProps({
  //子组件接收父组件传递过来的值
  baseStrategyParam: Object
});

const { baseStrategyParam } = toRefs(props)

const styleObject = { color: 'rgb(204 204 204)' };
const userStore = useUserStore();
const router = useRouter();

</script>
<style lang="scss" scoped>
.header {
  line-height: 50px;
  padding: 10px 0;
  font-size: 25px;

  .digit {
    margin-left: 20px;
    font-size: 25px;
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

.basic-info {}

.stratergy-item {
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 0 20px;

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

.grid-head,
.grid-line {
  .stratergy-item-left {
    text-align: center;
  }
}

.grid-head,
.grid-line {
  :nth-child(1) {
    flex: 2;
  }
}

.grid-head,
.grid-line {
  :nth-child(2) {
    flex: 5;
  }
}

.grid-head,
.grid-line {
  :nth-child(3) {
    flex: 5;
  }
}

.grid-head,
.grid-line {
  :nth-child(4) {
    flex: 3;
  }
}

.grid-head,
.grid-line {
  :nth-child(5) {
    flex: 3;
  }
}

.grid-head,
.grid-line {
  :nth-child(6) {
    flex: 3;
  }
}
</style>
