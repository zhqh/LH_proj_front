<template>
  <div class="container">
    <div class="query">
      <div class="menu">
        <nut-menu active-color="green" title-class="mymenu" style="font-size: 14px;">
          <nut-menu-item v-model="tradeTime.selected" :options="tradeTime.options" @change="handleChange" />
        </nut-menu>
      </div>
      <div class="query-date">
        <div>
          <IconFont name="date" />
        </div>
        <div><nut-cell @click="queryDate.startShow = true">
            <div>{{ queryDate.startPopupDesc }}</div>
          </nut-cell></div>
        <div>-</div>
        <div><nut-cell @click="queryDate.endShow = true">
            <div>{{ queryDate.endPopupDesc }}</div>
          </nut-cell></div>
        <div class="search">
          <Search @click="search" />
        </div>
      </div>
    </div>
    <div class="data">
      <div class="head">
        <div class="head-column">{{ $t('hisOrder.openQuantity') }}({{ hidOrders.data.length > 0 ?
          hidOrders.data[0].openUnit : '' }})</div>
        <div class="head-column">{{ $t('hisOrder.openClosePrice') }}</div>
        <div class="head-column">{{ $t('hisOrder.openCloseTime') }}</div>
        <div class="head-column">{{ $t('hisOrder.profitAmount') }}({{ hidOrders.data.length > 0 ?
          hidOrders.data[0].openUnit : '' }})</div>
      </div>
      <div class="body">
        <div class="body-row" v-for="item in hidOrders.data" :key="item.id">
          <div class="body-column">{{ item.openQuantity }}</div>
          <div class="body-column">{{ item.openPrice }}<br />{{ item.closePrice }}</div>
          <div class="body-column">{{ item.openTime }}<br />{{ item.closeTime }}</div>
          <div class="body-column">{{ item.profitAmount }}</div>
        </div>
      </div>
    </div>
  </div>
  <nut-popup position="bottom" v-model:visible="queryDate.startShow">
    <nut-date-picker v-model="queryDate.startDate" :min-date="queryDate.startMinDate" :max-date="queryDate.startMaxDate"
      @confirm="startPopupConfirm" :is-show-chinese="true" :threeDimensional="false" />
  </nut-popup>
  <nut-popup position="bottom" v-model:visible="queryDate.endShow">
    <nut-date-picker v-model="queryDate.endDate" :min-date="queryDate.endMinDate" :max-date="queryDate.endMaxDate"
      @confirm="endPopupConfirm" :is-show-chinese="true" :threeDimensional="false" />
  </nut-popup>
</template>

<script lang="ts" setup name="HomePage">
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

let route = useRoute();
const { locale } = useI18n();
const { appContext: { config: { globalProperties } } } = getCurrentInstance();

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
onActivated(() => {
  getHisOrder();
});

const getHisOrder = async () => {
  console.log(queryDate);
  const r = await useOrderApi().listHistory({
    current: 1,
    limit: 100,
    transactionType: tradeTime.selected,
    startTime: queryDate.startDate,
    endTime: queryDate.endDate,
    strategyId: route.params.id,
  });
  if (r.code == 0) {
    Object.assign(hidOrders.data, r.data.records);
  }
};

const search = () => {
  getHisOrder();
};

const handleChange = (val) => {
  console.log('val', val);
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
};
const endPopupConfirm = ({ selectedValue, selectedOptions }) => {
  queryDate.endPopupDesc = selectedOptions.map((val: any) => val.value).join('-');
  queryDate.endShow = false;
};

</script>

<style lang="scss" scoped>
.container {
  font-family: "Microsoft YaHei", sans-serif;
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
</style>
