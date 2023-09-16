<template>
  <nut-tabs v-model="state.tab">
    <nut-tab-pane title="运行数据" pane-key="run" />
    <nut-tab-pane title="执行计划" pane-key="plan" />
    <nut-tab-pane title="策略参数" pane-key="param" />
    <nut-tab-pane title="当前持仓" pane-key="hold" />
    <nut-tab-pane title="历史持仓" pane-key="hishold" />
  </nut-tabs>
  <stbasic v-if="state.tab == 'run'" :strategy="state.strategy" />
  <stplan v-if="state.tab == 'plan'" :strategy="state.strategy" />
  <stparam v-if="state.tab == 'param'" :strategyParamId="state.strategy.strategyParamId" />
  <sthold v-if="state.tab == 'hold'" />
  <sthishold v-if="state.tab == 'hishold'" />
</template>

<script lang="ts" setup name="HomePage">
  import { computed, onBeforeMount } from 'vue';
  import { useUserStore } from '/@/store/modules/user';
  import { setLang } from '/@/i18n';
  import { useI18n } from 'vue-i18n';
  import { useApiKeyApi, useStrategyApi } from '/@/api/trade';
  import { showToast } from 'vant';
  import * as tradeUtil from '/@/utils/trade';

  import Stbasic from './stbasic.vue';
  import Stplan from './stplan.vue';
  import Stparam from './stparam.vue';
  import Sthold from './sthold.vue';
  import Sthishold from './sthishold.vue';

  const { locale } = useI18n();
  let route = useRoute();

  const state = reactive({
    tab: 'run',
    strategy: {},
  });

  onMounted(() => {
    // getStrategyById();
  });
  onActivated(() => {
    getStrategyById();
  });

  const getStrategyById = async () => {
    let r = await useStrategyApi().getStrategyById(route.params.id);
    if (r.code != 0) {
      return;
    }
    state.strategy = r.data;
    if (state.strategy.status == 'RUNNING') {
      state.strategy.statusName = '运行中';
    } else if (state.strategy.status == 'PAUSE') {
      state.strategy.statusName = '已暂停';
    } else if (state.strategy.status == 'STOP') {
      state.strategy.statusName = '已停止';
    }
  };
</script>
<style lang="scss" scoped>
  .course-type {
    padding: 0 60px;
  }

  .unsetapi {
    margin: 0 10px;
    font-size: 28px;
  }

  .notice {
    font-size: 30px;
    padding: 0px 10px;
  }

  .more-notice {
    margin-left: auto;
  }

  .nut-checkbox {
    display: flex;
    margin-right: 200px;

    .nut-checkbox__label {
      margin-left: 10px;
    }
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

  .nut-tab-pane {
    padding: 0;
  }
</style>
