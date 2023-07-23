<template>
  <div class="container">
    <div class="query">
      <div class="query-row">
        <div class="instId">
          <nut-input :placeholder="instIdDesc" readonly>
            <template #right>
              <ArrowDown @click="instIdShow = true" />
            </template>
          </nut-input>
        </div>
        <div class="menu" style="display: none;">
          <nut-menu active-color="green" title-class="mymenu" style="font-size: 14px;">
            <nut-menu-item v-model="tradeTime.selected" :options="tradeTime.options" @change="handleChange" />
          </nut-menu>
        </div>
      </div>
      <div class="query-row">
        <div class="query-date">
          <div><nut-cell @click="queryDate.startShow = true">
              <div>{{ queryDate.startPopupDesc }}</div>
            </nut-cell></div>
          <div>-</div>
          <div><nut-cell @click="queryDate.endShow = true">
              <div>{{ queryDate.endPopupDesc }}</div>
            </nut-cell></div>
          <div class="search">
            <Search @click="reloadOrders" />
          </div>
        </div>
      </div>
    </div>
    <div class="data">
      <div class="head">
        <div class="head-column">{{ $t('tradeflow.instId') }}</div>
        <div class="head-column">{{ $t('tradeflow.openQuantity') }}</div>
        <div class="head-column">{{ $t('tradeflow.openClosePrice') }}</div>
        <div class="head-column">{{ $t('tradeflow.openCloseTime') }}</div>
        <div class="head-column">{{ $t('tradeflow.profitAmount') }}</div>
      </div>
      <nut-infinite-loading v-model="infinityValue" load-txt="Loading..." :load-more-txt="$t('common.nomre')"
        :has-more="hasMore" @load-more="getAllOrdersByUserId">
        <div class="body">
          <div class="body-row" v-for="item in orders.data" :key="item.id">
            <div class="body-column">{{ item.instId }}</div>
            <div class="body-column">{{ item.openQuantity }}<br />{{ item.openUnit }}</div>
            <div class="body-column">{{ item.openPrice }}<br />{{ item.closePrice }}</div>
            <div class="body-column">{{ item.openTime }}<br />{{ item.closeTime }}</div>
            <div class="body-column">{{ item.profitAmount }}<br />{{ item.openUnit }}</div>
          </div>
        </div>
      </nut-infinite-loading>
    </div>
  </div>
  <nut-popup position="bottom" v-model:visible="instIdShow">
    <nut-searchbar v-model="instIdSearch.searchKey" background="" input-background="white"
      :placeholder="$t('common.input_keywords')" @change="searchInstId">
      <template v-slot:leftin>
        <Search2 />
      </template>
    </nut-searchbar>
    <nut-picker v-model="instIdSearch.located" :columns="instIdColumns" :title="$t('tradeflow.selectInstId')"
      @confirm="instIdPopupConfirm" @cancel="instIdShow = false" />
  </nut-popup>
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
import { IconFont, ArrowDown } from '@nutui/icons-vue';
import { useOrderApi, useReportApi } from '/@/api/trade';
import { getRecentMonth, getRecentMonthString } from '/@/utils/date';
import { showToast } from 'vant';
import { Check, MoreS, Search } from '@nutui/icons-vue';

const { appContext: { config: { globalProperties } } } = getCurrentInstance();

let route = useRoute();
const { locale } = useI18n();
const userStore = useUserStore();

const tradeTime = reactive({
  options: [
    { text: globalProperties.$t('tradeflow.open_time'), value: 'OPEN' },
    { text: globalProperties.$t('tradeflow.close_time'), value: 'CLOSE' },
  ],
  selected: 'OPEN',
});

const orders = reactive({
  data: [],
});
onActivated(async () => {
  reloadOrders();
  getInstIds().then(e => {
    instIdColumns.value = e.map(instId => {
      return { text: instId, value: instId }
    });
  });
});
const infinityValue = ref(false);
const hasMore = ref(true);
const current = ref(1);
const loading = ref(false);
const getAllOrdersByUserId = async () => {
  if (loading.value) {
    return;
  }
  loading.value = true;
  const r = await useReportApi().getAllOrdersByUserId({
    current: current.value,
    limit: 100,
    exchange: userStore.getUserInfo.defaultExchange,
    startTime: queryDate.startDate,
    endTime: queryDate.endDate,
    instId: instId.value,
  });
  loading.value = false;
  if (r.code == 0) {
    orders.data = [...orders.data, ...r.data.records];
    infinityValue.value = false;
    current.value++;
    if (current.value > r.data.pages) hasMore.value = false;
  }
};

const reloadOrders = async () => {
  orders.data = [];
  current.value = 1;
  hasMore.value = true;
  getAllOrdersByUserId();
};

const getInstIds = async () => {
  const r = await useReportApi().listInstIds({ exchange: userStore.getUserInfo.defaultExchange });
  if (r.code == 0) {
    return r.data;
  }
  throw new Error(globalProperties.$t('tradeflow.get_instId_error'));;
};

const search = () => {
  getAllOrdersByUserId();
};

const handleChange = (val) => {
  console.log('val', val);
};

const instIdShow = ref(false);
const instId = ref();
const instIdDesc = ref(globalProperties.$t('tradeflow.selectInstId'));
const instIdColumns = ref([]);
const instIdPopupConfirm = async ({ selectedValue, selectedOptions }) => {
  instId.value = selectedValue[0];
  instIdDesc.value = selectedOptions.map((val) => val.text).join(',');
  instIdShow.value = false;
};

let instIdSearch = reactive({ searchKey: '', located: [] });
const searchInstId = () => {
  if (!instIdSearch.searchKey) {
    return;
  }
  const found = instIdColumns.value.find(e => {
    let instId = e.value;
    let index = instId.indexOf('-');
    if (index > -1) {
      instId = instId.substring(0, index);
    }
    return instId.toLowerCase().indexOf(instIdSearch.searchKey.toLowerCase()) > -1;
  });
  if (found) {
    instIdSearch.located = [found.value];
  }
}


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
  font-size: 23px;
  padding: 0px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  // height: 70px;
  .instId {
    flex: 1;
    width: 300px;

    .nut-input {
      padding-left: 0;
      padding-right: 0;
    }
  }

  .menu {
    flex: 1;
  }

  .query-date {
    flex: 5;
  }
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
  text-align: center;
  background-color: #f3f3f3;
  padding: 10px 0;

  :nth-child(1) {
    flex: 2;
  }

  :nth-child(2) {
    flex: 2;
  }

  :nth-child(3) {
    flex: 2;
  }

  :nth-child(4) {
    flex: 4;
  }

  :nth-child(5) {
    flex: 2;
  }
}

.body {
  :nth-child(1) {
    flex: 2;
  }

  :nth-child(2) {
    flex: 2;
  }

  :nth-child(3) {
    flex: 2;
  }

  :nth-child(4) {
    flex: 4;
  }

  :nth-child(5) {
    flex: 2;
  }
}

.head-column {
  flex: 1;
}

.body-column {
  flex: 1;
  padding: 10px 0;
  text-align: center;
  line-height: 35px;
}

.mymenu {
  font-size: 14px;
  height: 50px;
  color: red;
}

.query-date {
  // margin: 0 35px 0 auto;
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
