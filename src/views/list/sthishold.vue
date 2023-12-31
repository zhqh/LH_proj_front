<template>
  <div class="container">
    <div class="query">
      <div class="menu">
        <nut-menu active-color="green" title-class="mymenu" style="font-size: 14px">
          <nut-menu-item v-model="tradeTime.selected" :options="tradeTime.options" @change="handleChange" />
        </nut-menu>
      </div>
      <div class="query-date">
        <div>
          <IconFont name="date" />
        </div>
        <div
          ><nut-cell @click="queryDate.startShow = true">
            <div>{{ queryDate.startPopupDesc }}</div>
          </nut-cell></div
        >
        <div>-</div>
        <div
          ><nut-cell @click="queryDate.endShow = true">
            <div>{{ queryDate.endPopupDesc }}</div>
          </nut-cell></div
        >
        <div class="search">
          <nut-button block type="info" size="mini" @click="displayKLine" color="#7232dd" plain>展示</nut-button>
        </div>
      </div>
    </div>
    <div class="data">
      <nut-infinite-loading
        v-model="infinityValue"
        load-txt="Loading..."
        :load-more-txt="$t('common.nomore')"
        :has-more="hasMore"
        @load-more="getHisOrder"
      >
        <div class="body" v-for="item in hidOrders.data" :key="item.id">
          <div class="row">
            <div>开仓数量：{{ item.openQuantity && item.openQuantity.toFixed(2) }}</div>
            <div :class="{ 'row red': item.profitAmount > 0, 'row green': item.profitAmount <= 0 }"
              >开仓收益：{{ item.profitAmount && item.profitAmount.toFixed(2) }}</div
            >
          </div>
          <div class="row">
            <div>开仓价格：{{ item.openPrice && item.openPrice.toFixed(2) }}</div>
            <div>平仓价格：{{ item.closePrice && item.closePrice.toFixed(2) }}</div>
          </div>
          <div class="row">
            <div>开仓时间：{{ item.openTime }}</div>
          </div>
          <div class="row">
            <div>平仓时间：{{ item.closeTime }}</div>
          </div>
        </div>
      </nut-infinite-loading>
    </div>
  </div>
  <nut-popup position="bottom" v-model:visible="queryDate.startShow">
    <nut-date-picker
      v-model="queryDate.startDate"
      :min-date="queryDate.startMinDate"
      :max-date="queryDate.startMaxDate"
      @confirm="startPopupConfirm"
      :is-show-chinese="true"
      :threeDimensional="false"
    />
  </nut-popup>
  <nut-popup position="bottom" v-model:visible="queryDate.endShow">
    <nut-date-picker
      v-model="queryDate.endDate"
      :min-date="queryDate.endMinDate"
      :max-date="queryDate.endMaxDate"
      @confirm="endPopupConfirm"
      :is-show-chinese="true"
      :threeDimensional="false"
    />
  </nut-popup>
</template>

<script lang="ts" setup name="Sthishold">
  import { computed, onBeforeMount } from 'vue';
  import { useUserStore } from '/@/store/modules/user';
  import { setLang } from '/@/i18n';
  import { useI18n } from 'vue-i18n';
  import '@nutui/icons-vue/dist/style_iconfont.css';
  import { IconFont } from '@nutui/icons-vue';
  import { useOrderApi } from '/@/api/trade';
  import { getRecentMonth, getRecentMonthString } from '/@/utils/date';
  import { showToast } from 'vant';
  import { Check, MoreS, Search } from '@nutui/icons-vue';
  import router from '/@/router';

  let route = useRoute();
  const { locale } = useI18n();
  const {
    appContext: {
      config: { globalProperties },
    },
  } = getCurrentInstance();

  const tradeTime = reactive({
    options: [
      { text: globalProperties.$t('tradeflow.open_time'), value: 'OPEN' },
      { text: globalProperties.$t('tradeflow.close_time'), value: 'CLOSE' },
    ],
    selected: 'OPEN',
  });

  const hidOrders = reactive({
    data: [],
  });
  onMounted(() => {
    search();
  });
  onActivated(() => {
    search();
  });

  const infinityValue = ref(false);
  const hasMore = ref(true);
  const current = ref(1);
  const loading = ref(false);
  const getHisOrder = async () => {
    if (loading.value) {
      return;
    }
    loading.value = true;
    const r = await useOrderApi().listHistory({
      current: 1,
      limit: 100,
      transactionType: tradeTime.selected,
      startTime: queryDate.startDate,
      endTime: queryDate.endDate,
      strategyId: route.params.id,
    });
    loading.value = false;
    if (r.code == 0) {
      hidOrders.data = [...hidOrders.data, ...r.data.records];
      infinityValue.value = false;
      current.value++;
      if (current.value > r.data.pages) hasMore.value = false;
    }
  };

  const search = async () => {
    hidOrders.data = [];
    current.value = 1;
    hasMore.value = true;
    getHisOrder();
  };

  const displayKLine = () => {
    router.push(`/kline/${route.params.id}`);
  };

  const handleChange = (val) => {
    search();
  };

  const queryDate = reactive({
    startShow: false,
    startPopupDesc: getRecentMonthString(3),
    startMinDate: new Date(2020, 0, 1),
    startMaxDate: new Date(2025, 10, 1),
    startDate: getRecentMonth(3).toDate(),
    endShow: false,
    endPopupDesc: getRecentMonthString(0),
    endMinDate: new Date(2020, 0, 1),
    endMaxDate: new Date(2025, 10, 1),
    endDate: getRecentMonth(0).toDate(),
  });
  const startPopupConfirm = ({ selectedValue, selectedOptions }) => {
    queryDate.startPopupDesc = selectedOptions.map((val: any) => val.value).join('-');
    queryDate.startShow = false;
    search();
  };
  const endPopupConfirm = ({ selectedValue, selectedOptions }) => {
    queryDate.endPopupDesc = selectedOptions.map((val: any) => val.value).join('-');
    queryDate.endShow = false;
    search();
  };
</script>

<style lang="scss" scoped>
  .container {
    font-family: 'Microsoft YaHei', sans-serif;
    padding: 10px 0;
  }

  .query {
    display: flex;
    justify-content: left;
    align-items: center;
    // height: 70px;
  }

  .data {
    font-size: 23px;
    padding: 0px 30px;
    border-top: 1px solid #e5e5e5;
  }

  .head,
  .body-row {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .body-row:nth-child(even) {
    background-color: #f3f3f3;
  }

  .head {
    background-color: #f3f3f3;
  }

  .head-column,
  .body-column {
    flex: 1;
    padding: 10px 0;
    text-align: center;
    line-height: 35px;
  }

  .head-column:nth-child(3),
  .body-column:nth-child(3) {
    flex: 2;
    // font-size: 14px;
  }

  .mymenu {
    font-size: 14px;
    height: 50px;
    color: red;
  }

  .query-date {
    margin: 0 35px 0 auto;
    display: flex;
    align-items: center;

    .nut-cell {
      margin: 0;
      font-size: 25px;
      color: #1a1a1a;
    }
  }

  .search {
    .nut-icon {
      margin-left: 20px;
    }
  }

  .nut-icon-date {
    // vertical-align: middle;
  }

  .nut-cell {
    box-shadow: none;
  }

  .menu {
    // padding-left: 0px;
    width: 250px;
    // height: 50px;
    // display: flex;
    // justify-content: left;
    // height: 30px;
  }

  .exchange-table {
    margin: 0 30px;

    span {
      font-size: 15px;
    }
  }

  .code {
    width: 100%;
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

    img {
      width: 100%;
      height: 100%;
    }
  }

  .body {
    padding: 20px;
    border-bottom: 1px solid #e5e5e5;
    font-size: 28px;
  }

  .row {
    display: flex;
    align-items: center;
    padding: 10px;

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
