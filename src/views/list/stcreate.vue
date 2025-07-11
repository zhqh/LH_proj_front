<template>
  <div class="header-stcreate">
    <h3 class="basic-title">{{ $t('create_strategy.base_param') }}</h3>
    <div class="course-type">
      <nut-row v-if="baseStrategyParam.param.backtest == 'true'" class="backtest">
        <nut-col :span="5">
          <div>{{ $t('create_strategy.backtest_period') }}</div>
        </nut-col>
        <nut-col :span="19">
          <div class="query-date">
            <nut-cell @click="queryDate.startShow = true">
              {{ $t('common.from') }}<span>{{ queryDate.startPopupDesc }}</span>
            </nut-cell>
            <nut-cell @click="queryDate.endShow = true">
              {{ $t('common.to') }}<span>{{ queryDate.endPopupDesc }}</span>
            </nut-cell>
          </div>
        </nut-col>
      </nut-row>
      <nut-row class="strategy-mode">
        <nut-col :span="5">
          <div>策略模式</div>
        </nut-col>
        <nut-col :span="19">
          <div class="st-type radio-group-container">
            <nut-radio-group v-model="baseStrategyParam.param.mode" direction="horizontal" @change="typeChanged">
              <nut-radio label="simulated">模拟单</nut-radio>
              <nut-radio label="formal">正式单</nut-radio>
            </nut-radio-group>
          </div>
        </nut-col>
      </nut-row>
      <nut-row class="strategy-type">
        <nut-col :span="5">
          <div>{{ $t('create_strategy.type') }}</div>
        </nut-col>
        <nut-col :span="19">
          <div class="st-type radio-group-container">
            <nut-radio-group v-model="baseStrategyParam.param.type" direction="horizontal" @change="typeChanged">
              <nut-radio label="steady">{{ $t('type.steady') }}</nut-radio>
              <nut-radio label="radical">{{ $t('type.radical') }}</nut-radio>
            </nut-radio-group>
          </div>
        </nut-col>
      </nut-row>
      <nut-row>
        <nut-col :span="5">
          <div>{{ $t('create_strategy.name') }}</div>
        </nut-col>
        <nut-col :span="10">
          <div>
            <nut-input :placeholder="nameDesc" readonly>
              <template #right>
                <ArrowDown @click="nameShow = true" />
              </template>
            </nut-input>
          </div>
        </nut-col>
      </nut-row>
      <nut-row>
        <nut-col :span="5">
          <div>{{ $t('create_strategy.tradeType') }}</div>
        </nut-col>
        <nut-col :span="12">
          <div>
            <nut-input :placeholder="tradeTypeDesc" readonly>
              <template #right>
                <ArrowDown @click="tradeTypeShow = true" />
              </template>
            </nut-input>
          </div>
        </nut-col>
      </nut-row>
      <nut-row>
        <nut-col :span="5">
          <div>{{ $t('create_strategy.instId') }}</div>
        </nut-col>
        <nut-col :span="12">
          <div>
            <nut-input :placeholder="instIdDesc" readonly>
              <template #right>
                <ArrowDown @click="instIdShow = true" />
              </template>
            </nut-input>
          </div>
        </nut-col>
      </nut-row>
      <nut-row>
        <nut-col :span="5">
          <div>{{ $t('create_strategy.avaiBal') }}</div>
        </nut-col>
        <nut-col :span="7">
          <div class="dropdown-contain">
            <nut-input :placeholder="baseStrategyParam.context.availBal" readonly />
          </div>
        </nut-col>
        <nut-col :span="5">
          <div>{{ $t('create_strategy.lever') }}</div>
        </nut-col>
        <nut-col :span="2">
          <nut-input placeholder="" v-model="baseStrategyParam.param.lever" type="number" readonly />
        </nut-col>
        <nut-col :span="5">
          <nut-button block type="info" size="mini" @click="resetLever" color="#7232dd" plain style="display: none">{{
            $t('create_strategy.modify_lever')
          }}</nut-button>
        </nut-col>
      </nut-row>
    </div>
    <keep-alive>
      <component :is="currentStrategy" ref="currentStrategyComponent" :baseStrategyParam="baseStrategyParam" />
    </keep-alive>
    <h3 class="basic-title">{{ $t('create_strategy.controll') }}</h3>
    <div class="course-type">
      <nut-row>
        <nut-col :span="5">
          <div>{{ $t('create_strategy.triggerCondition') }}</div>
        </nut-col>
        <nut-col :span="7">
          <div>
            <nut-input :placeholder="triggerConditionDesc" readonly>
              <template #right>
                <ArrowDown @click="triggerConditionShow = true" />
              </template>
            </nut-input>
          </div>
        </nut-col>
      </nut-row>
      <nut-row>
        <nut-col :span="5">
          <div>实时价格</div>
        </nut-col>
        <nut-col :span="19">
          <div>
            <nut-input v-model="currentPrice" />
          </div>
        </nut-col>
      </nut-row>
      <nut-row v-show="baseStrategyParam.param.triggerCondition == 'price'">
        <nut-col :span="5">
          <div>{{ $t('create_strategy.triggerPrice') }}</div>
        </nut-col>
        <nut-col :span="12">
          <div>
            <nut-input-number v-model="baseStrategyParam.param.triggerPrice" :step="step" decimal-places="2" />
          </div>
        </nut-col>
        <nut-col :span="4">
          <div>步长%</div>
        </nut-col>
        <nut-col :span="3">
          <div>
            <nut-input v-model="stepPercent" @update:model-value="stepPercentChanged" />
          </div>
        </nut-col>
      </nut-row>
      <nut-row class="loop-mode">
        <nut-col :span="5">
          <div>{{ $t('create_strategy.loopMode') }}</div>
        </nut-col>
        <nut-col :span="19">
          <div class="st-type radio-group-container">
            <nut-radio-group v-model="baseStrategyParam.param.loopMode" direction="horizontal">
              <nut-radio label="loop" disabled>{{ $t('create_strategy.loop') }}</nut-radio>
              <nut-radio label="onetime" disabled>{{ $t('create_strategy.onetime') }}</nut-radio>
            </nut-radio-group>
          </div>
        </nut-col>
      </nut-row>
      <nut-row>
        <nut-col :span="5">
          <div>{{ $t('create_strategy.closeStrategy') }}</div>
        </nut-col>
        <nut-col :span="19">
          <div class="close-strategy">
            <span>{{ $t('create_strategy.profit') }}</span>
            <div>
              <nut-input placeholder="" v-model="baseStrategyParam.param.closeProfitRate" input-align="right" type="number" />
            </div>
            <span>%</span>
            <span class="loss-label">{{ $t('create_strategy.loss') }}</span>
            <div>
              <nut-input placeholder="" v-model="baseStrategyParam.param.closeLossRate" input-align="right" type="number" />
            </div>
            <span>%</span>
          </div>
        </nut-col>
      </nut-row>
    </div>
    <br />
    <div class="course-type">
      <div class="button-align-center">
        <nut-button block type="info" @click="oneKeyStart" :disabled="disableOneKeyStart">{{
          baseStrategyParam.param.backtest == 'true' ? $t('create_strategy.start_backtest') : $t('create_strategy.start_strategy')
        }}</nut-button>
        <nut-button block type="info" @click="cancel"> {{ $t('common.cancel') }} </nut-button>
      </div>
    </div>
    <div>
      <nut-popup position="bottom" v-model:visible="nameShow">
        <nut-picker
          v-model="name"
          :columns="nameColumns"
          :title="$t('create_strategy.select_strategy_name')"
          @confirm="namePopupConfirm"
          @cancel="nameShow = false"
        />
      </nut-popup>
      <nut-popup position="bottom" v-model:visible="tradeTypeShow">
        <nut-picker
          v-model="tradeType"
          :columns="tradeTypeColumns"
          :title="$t('create_strategy.select_trade_type')"
          @confirm="tradeTypePopupConfirm"
          @cancel="tradeTypeShow = false"
        />
      </nut-popup>
      <nut-popup position="bottom" v-model:visible="instIdShow">
        <nut-searchbar
          v-model="instIdSearch.searchKey"
          background=""
          input-background="white"
          :placeholder="$t('common.input_keywords')"
          @change="searchInstId"
        >
          <template v-slot:leftin>
            <Search2 />
          </template>
        </nut-searchbar>
        <nut-picker
          v-model="instIdSearch.located"
          :columns="instIdColumns"
          :title="$t('create_strategy.select_instId')"
          @confirm="instIdPopupConfirm"
          @cancel="instIdShow = false"
        />
      </nut-popup>
      <nut-popup position="bottom" v-model:visible="triggerConditionShow">
        <nut-picker
          v-model="triggerCondition"
          :columns="triggerConditionColumns"
          :title="$t('create_strategy.select_trigger_condition')"
          @confirm="triggerConditionPopupConfirm"
          @cancel="triggerConditionShow = false"
        />
      </nut-popup>
      <nut-popup position="bottom" v-model:visible="queryDate.startShow">
        <nut-date-picker
          type="year-month"
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
          type="year-month"
          v-model="queryDate.endDate"
          :min-date="queryDate.endMinDate"
          :max-date="queryDate.endMaxDate"
          @confirm="endPopupConfirm"
          :is-show-chinese="true"
          :threeDimensional="false"
        />
      </nut-popup>
    </div>
  </div>
</template>

<script lang="ts" setup name="DemoPage">
  import { i18n } from '/@/i18n';
  import { useUserStore } from '/@/store/modules/user';
  import { Check, Loading, ArrowDown, IconFont, Search2 } from '@nutui/icons-vue';
  import '@nutui/icons-vue/dist/style_iconfont.css';
  import { useStrategyApi, useApiKeyApi, useExchangeApi } from '/@/api/trade';
  import { getRecentMonth, getRecentYearMonthString, formatDateTime } from '/@/utils/date';
  import * as tradeUtil from '/@/utils/trade';
  import { showToast } from 'vant';
  import moment from 'moment';

  import SimpleGrid from '../../components/simple-grid.vue';
  import CustomGrid from '../../components/custom-grid.vue';
  import LongShortHedgingGrid from '../../components/longshort-hedging-grid.vue';
  import TrendTrade from '../../components/trendtrade.vue';
  import ReboundTrade from '../../components/reboundtrade.vue';

  const {
    appContext: {
      config: { globalProperties },
    },
  } = getCurrentInstance();
  // import { useI18n } from 'vue-i18n';
  // const { locale } = useI18n();

  const route = useRoute();
  const router = useRouter();
  const userStore = useUserStore();
  const styleObject = { color: 'rgb(204 204 204)' };

  const strategyMap = {
    SimpleGrid: shallowRef(SimpleGrid),
    CustomGrid: shallowRef(CustomGrid),
    LongShortHedgingGrid: shallowRef(LongShortHedgingGrid),
    TrendTrade: shallowRef(TrendTrade),
    ReboundTrade: shallowRef(ReboundTrade),
  };

  let currentStrategyComponent = ref();
  let currentStrategy = strategyMap.ReboundTrade;

  const invokeStrategyComponentMethod = async (name) => {
    let result = await currentStrategyComponent.value[name]({ ...baseStrategyParam });
    return result;
  };

  const baseStrategyParam = reactive({
    param: {
      mode: 'simulated',
      type: 'steady',
      name: 'ReboundTrade',
      instId: '',
      instName: '',
      tradeType: 'SPOT',
      lever: 1,
      triggerCondition: 'price',
      triggerPrice: 0,
      loopMode: 'loop',
      closeProfitRate: '',
      closeLossRate: '',
      exchange: userStore.getUserInfo.defaultExchange,
      unit: '',
      backtest: 'false',
    },
    context: {
      apiKey: {},
      balances: {},
      availBal: 0,
      lowestOpenQuantity: '',
    },
  });

  const currentPrice = ref(0);
  const step = ref(0);
  const stepPercent = ref(10);

  const typeChanged = (value: any) => {
    console.log(value);
  };

  const stepPercentChanged = (value: any) => {
    step.value = (currentPrice.value * value) / 100;
    baseStrategyParam.param.triggerPrice = currentPrice.value;
  };

  const queryDate = reactive({
    startShow: false,
    startPopupDesc: getRecentYearMonthString(20),
    startMinDate: new Date(2019, 0, 1),
    startMaxDate: new Date(2025, 10, 1),
    startDate: getRecentMonth(20).toDate(),
    endShow: false,
    endPopupDesc: getRecentYearMonthString(0),
    endMinDate: new Date(2019, 0, 1),
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

  const nameShow = ref(false);
  // const name = ref();
  const nameDesc = ref(globalProperties.$t('strategy_name.ReboundTrade'));
  const nameColumns = ref([
    { text: globalProperties.$t('strategy_name.SimpleGrid'), value: 'SimpleGrid' },
    { text: globalProperties.$t('strategy_name.CustomGrid'), value: 'CustomGrid' },
    { text: globalProperties.$t('strategy_name.LongShortHedgingGrid'), value: 'LongShortHedgingGrid' },
    { text: globalProperties.$t('strategy_name.TrendTrade'), value: 'TrendTrade' },
    { text: globalProperties.$t('strategy_name.ReboundTrade'), value: 'ReboundTrade' },
  ]);
  const namePopupConfirm = ({ selectedValue, selectedOptions }) => {
    baseStrategyParam.param.name = selectedValue[0];
    nameDesc.value = selectedOptions.map((val) => val.text).join(',');
    nameShow.value = false;
    currentStrategy = strategyMap[selectedValue[0]];
    if (baseStrategyParam.param.name == 'LongShortHedgingGrid') {
      tradeTypeDesc.value = globalProperties.$t('tradeType.SWAPUSDT');
      tradeTypeColumns.value = [...swapTradeTypeColumns];
      baseStrategyParam.param.tradeType = 'SWAPUSDT';
    } else {
      tradeTypeDesc.value = globalProperties.$t('tradeType.SPOT');
      tradeTypeColumns.value = [...baseTradeTypeColumns, ...swapTradeTypeColumns];
      baseStrategyParam.param.tradeType = 'SPOT';
    }

    tradeTypeChanged();
  };

  const tradeTypeShow = ref(false);
  // const name = ref();
  const tradeTypeDesc = ref(globalProperties.$t('tradeType.SPOT'));
  const baseTradeTypeColumns = [
    { text: globalProperties.$t('tradeType.SPOT'), value: 'SPOT' },
    { text: globalProperties.$t('tradeType.MARGIN'), value: 'MARGIN' },
  ];
  const swapTradeTypeColumns = [
    { text: globalProperties.$t('tradeType.SWAPUSDT'), value: 'SWAPUSDT' },
    { text: globalProperties.$t('tradeType.SWAPCOIN'), value: 'SWAPCOIN' },
  ];
  let tradeTypeColumns = ref([...baseTradeTypeColumns, ...swapTradeTypeColumns]);
  const tradeTypePopupConfirm = async ({ selectedValue, selectedOptions }) => {
    baseStrategyParam.param.tradeType = selectedValue[0];
    tradeTypeDesc.value = selectedOptions.map((val) => val.text).join(',');
    tradeTypeShow.value = false;
    tradeTypeChanged();
  };

  const tradeTypeChanged = async () => {
    let instruments;
    switch (baseStrategyParam.param.tradeType) {
      case 'SPOT':
        instruments = await loadInstruments('SPOT', null);
        break;
      case 'MARGIN':
        instruments = await loadInstruments('MARGIN', null);
        break;
      case 'SWAPUSDT':
        instruments = await loadInstruments('SWAP', null);
        instruments = instruments.filter((e) => e.instId.indexOf('-USDT-') > -1);
        break;
      case 'SWAPCOIN':
        instruments = await loadInstruments('SWAP', null);
        instruments = instruments.filter((e) => e.instId.indexOf('-USD-') > -1);
        break;
    }
    //默认显示前100个，其他可以通过搜索获取
    wholeInstIdColumns.value = instruments.map((e) => {
      return { text: e.instName || e.instId, value: e.instId };
    });
    instIdColumns.value = [...wholeInstIdColumns.value.slice(0, 200)];
    instIdDesc.value = '';
    baseStrategyParam.param.instId = '';
    baseStrategyParam.param.unit = '';
    baseStrategyParam.param.lever = 1;
    baseStrategyParam.context.lowestOpenQuantity = '';
    baseStrategyParam.context.availBal = 0;
  };

  const instIdShow = ref(false);
  // const instId = ref();
  const instIdDesc = ref('');
  const wholeInstIdColumns = ref([]);
  const instIdColumns = ref([]);
  const instIdPopupConfirm = async ({ selectedValue, selectedOptions }) => {
    baseStrategyParam.param.instId = selectedValue[0];
    baseStrategyParam.param.instName = selectedOptions[0].text;
    instIdDesc.value = selectedOptions.map((val) => val.text).join(',');
    instIdShow.value = false;
    baseStrategyParam.param.lever = 1;
    if (baseStrategyParam.param.tradeType != 'SPOT') {
      getLever(baseStrategyParam.param.instId).then((e) => (baseStrategyParam.param.lever = e));
    }
    baseStrategyParam.param.unit = 'USDT';
    if (baseStrategyParam.param.tradeType == 'SWAPCOIN') {
      let index = baseStrategyParam.param.instId.indexOf('-');
      baseStrategyParam.param.unit = baseStrategyParam.param.instId.substring(0, index);
    }
    let balance = baseStrategyParam.context.balances[baseStrategyParam.param.unit] || { availBal: 0 };
    baseStrategyParam.context.availBal = balance.availBal;
    getLowestOpenQuantity(baseStrategyParam.param.instId, baseStrategyParam.param.tradeType).then(
      (e) => (baseStrategyParam.context.lowestOpenQuantity = e),
    );
    if (baseStrategyParam.param.instId) {
      baseStrategyParam.param.triggerPrice = await getPrice(baseStrategyParam.param.instId);
      currentPrice.value = baseStrategyParam.param.triggerPrice;
      step.value = (currentPrice.value * stepPercent.value) / 100;
    }
  };

  let instIdSearch = reactive({ searchKey: '', located: [] });
  const searchInstId = () => {
    if (!instIdSearch.searchKey) {
      return;
    }
    const found = wholeInstIdColumns.value.find((e) => {
      let instId = e.text;
      let index = instId.indexOf('-');
      if (index > -1) {
        instId = instId.substring(0, index);
      }
      return instId.toLowerCase().indexOf(instIdSearch.searchKey.toLowerCase()) > -1;
    });
    if (found) {
      instIdColumns.value.push(found);
      instIdSearch.located = [found.value];
    }
  };

  const triggerConditionShow = ref(false);
  // const triggerCondition = ref();
  const triggerConditionDesc = ref(globalProperties.$t('triggerCondition.price'));
  const triggerConditionColumns = ref(tradeUtil.map2List(tradeUtil.triggerConditionNameMap, globalProperties));
  const triggerConditionPopupConfirm = async ({ selectedValue, selectedOptions }) => {
    baseStrategyParam.param.triggerCondition = selectedValue[0];
    triggerConditionDesc.value = selectedOptions.map((val) => val.text).join(',');
    triggerConditionShow.value = false;
    if (baseStrategyParam.param.instId) {
      baseStrategyParam.param.triggerPrice = await getPrice(baseStrategyParam.param.instId);
      currentPrice.value = baseStrategyParam.param.triggerPrice;
      step.value = (currentPrice.value * stepPercent.value) / 100;
    }
  };

  onActivated(async () => {
    baseStrategyParam.param.backtest = route.query.backtest || 'false';
    if (baseStrategyParam.param.backtest == 'true') {
      baseStrategyParam.param.exchange = 'backtest';
    }
    getApiKey().then((e) => {
      Object.assign(baseStrategyParam.context.apiKey, e);
    });
    getBalances().then((r) => (baseStrategyParam.context.balances = r));
    let tradeType = baseStrategyParam.param.tradeType;
    if (baseStrategyParam.param.tradeType.startsWith('SWAP')) {
      tradeType = 'SWAP';
    }
    loadInstruments(tradeType, null).then((e) => {
      wholeInstIdColumns.value = e.map((e) => {
        return { text: e.instName || e.instId, value: e.instId };
      });
      instIdColumns.value = [...wholeInstIdColumns.value.slice(0, 200)];
    });
  });

  const disableOneKeyStart = ref(true);
  watch(
    () => {
      return [baseStrategyParam.param.instId, baseStrategyParam.context.apiKey];
    },
    (newValues, oldValues) => {
      if (newValues[0] && newValues[1]) {
        disableOneKeyStart.value = false;
      }
    },
  );

  const oneKeyStart = async () => {
    let overWriteParam = {};
    if (!baseStrategyParam.context.apiKey) {
      showToast(globalProperties.$t('list.config_api_first'));
      router.push({ path: '/api' });
      return;
    }
    let ok = await verify(baseStrategyParam);
    if (!ok) {
      return;
    }
    if (baseStrategyParam.param.backtest == 'true') {
      let startTime = queryDate.startPopupDesc + '-01 00:00:00';
      let stopTime = moment(queryDate.endPopupDesc, 'YYYY-MM').add(1, 'months').subtract(1, 'seconds').format('YYYY-MM-DD HH:mm:ss');
      // const r = await checkBacktestData(baseStrategyParam.param.instId, startTime, stopTime);
      const r = await downloadHistoryCandles(baseStrategyParam.param.instId, userStore.getUserInfo.defaultExchange);
      if (r.code != 0) {
        return;
      }
      Object.assign(overWriteParam, { startTime, stopTime });
    }
    // if (baseStrategyParam.param.triggerCondition == 'price') {
    //   baseStrategyParam.param.triggerPrice = await getPrice(baseStrategyParam.param.instId);
    // }
    const customParam = await invokeStrategyComponentMethod('getCustomParam');
    Object.assign(overWriteParam, {
      closeProfitRate: baseStrategyParam.param.closeProfitRate / 100,
      closeLossRate: baseStrategyParam.param.closeLossRate / 100,
      position: customParam.position,
      posSide: customParam.pos_side,
    });
    const r = await useStrategyApi().oneKeyStart({ ...baseStrategyParam.param, customParam, ...overWriteParam });
    if (r.code == 0) {
      showToast(globalProperties.$t('common.start_success'));
      router.push({ path: '/list' });
    }
  };

  const verify = async (baseStrategyParam) => {
    if (!baseStrategyParam.param.instId) {
      showToast(globalProperties.$t('create_strategy.select_instId'));
      return false;
    }
    if (!baseStrategyParam.context.availBal) {
      if (baseStrategyParam.param.backtest != 'true') {
        showToast(globalProperties.$t('create_strategy.empty_availBal'));
        return false;
      }
    }
    let result = await invokeStrategyComponentMethod('verify');
    if (!result) {
      return false;
    }
    if (baseStrategyParam.param.tradeType != 'SPOT') {
      let lever = await getLever(baseStrategyParam.param.instId);
      if (baseStrategyParam.param.lever != lever) {
        showToast(globalProperties.$t('create_strategy.no_same_lever'));
        return false;
      }
    }
    return true;
  };

  const getApiKey = async () => {
    const r = await useApiKeyApi().listByUserId();
    if (r.code == 0) {
      let ret = r.data[userStore.getUserInfo.defaultExchange];
      if (!ret || !ret.apiKey) {
        return {};
      }
      return ret;
    }
    throw new Error(globalProperties.$t('list.get_api_error'));
  };

  const getBalances = async () => {
    const r = await useExchangeApi().balance({ exchange: userStore.getUserInfo.defaultExchange });
    if (r.code == 0) {
      const balances = {};
      if (r.data[0].details.length) {
        r.data[0].details.forEach((e) => {
          balances[e.ccy] = e;
        });
      }
      return balances;
    }
    throw new Error(globalProperties.$t('create_strategy.get_availBal_error'));
  };

  const loadInstruments = async (instType, instId) => {
    const r = await useExchangeApi().instrument({ instType, instId, exchange: userStore.getUserInfo.defaultExchange });
    if (r.code == 0) {
      return r.data;
    }
    throw new Error(globalProperties.$t('create_strategy.get_instrument_error'));
  };

  const getLowestOpenQuantity = async (instId, tradeType) => {
    let price = await getPrice(instId);
    if (tradeType == 'SPOT' || tradeType == 'MARGIN') {
      let instrument = await loadInstruments(tradeType, instId);
      return (instrument[0].minSz * price).toFixed(10);
    } else if (tradeType == 'SWAPUSDT') {
      let coinOfOnePiece = await getConvertContractCoin({ type: '2', instId: instId, sz: '1', px: '100', unit: 'coin' });
      let lowestOpenQuantity = (parseFloat(coinOfOnePiece) * price).toFixed(10);
      return lowestOpenQuantity;
    } else if (tradeType == 'SWAPCOIN') {
      let usdtOfOnePiece = await getConvertContractCoin({ type: '2', instId: instId, sz: '1', px: '100' });
      usdtOfOnePiece = parseFloat(usdtOfOnePiece) * 100;
      let lowestOpenQuantity = usdtOfOnePiece / price;
      return parseFloat(lowestOpenQuantity).toFixed(10);
    }
    throw new Error(`globalProperties.$t('create_strategy.get_lowest_open_quantity_error'):${tradeType}`);
  };

  const getConvertContractCoin = async (param) => {
    let exchange = userStore.getUserInfo.defaultExchange;
    const r = await useExchangeApi().getConvertContractCoin({ ...param, exchange });
    if (r.code == 0) {
      return parseFloat(r.data[0].sz);
    }
    throw new Error(globalProperties.$t('create_strategy.get_par_value_error'));
  };

  const getPrice = async (instId) => {
    if (!instId) {
      throw new Error(globalProperties.$t('common.empty_instId'));
    }
    const r = await useExchangeApi().price({ instId, exchange: userStore.getUserInfo.defaultExchange });
    if (r.code == 0) {
      return parseFloat(r.data[0].last);
    }
    throw new Error(globalProperties.$t('common.get_price_error'));
  };

  const downloadHistoryCandles = async (instId, exchange) => {
    if (instId.indexOf('-') > -1) {
      let fullName = instId.split('-');
      instId = fullName[0] + '-USDT';
    }
    return await useStrategyApi().downloadHistoryCandles({ instId, exchange });
  };

  const checkBacktestData = async (instId, startTime, stopTime) => {
    let fullName = instId.split('-');
    instId = fullName[0] + '-USDT';
    return await useStrategyApi().checkBacktestData({ instId, startTime, stopTime });
  };

  const getLever = async (instId) => {
    if (!instId) {
      throw new Error(globalProperties.$t('common.empty_instId'));
    }
    const r = await useExchangeApi().lever({ instId, exchange: userStore.getUserInfo.defaultExchange });
    if (r.code == 0) {
      return r.data[0] && r.data[0].lever;
    }
    throw new Error(globalProperties.$t('common.get_lever_error'));
  };

  const cancel = () => {
    router.go(-1);
  };
</script>

<style lang="scss" scoped>
  @import '../../styles/mixin.scss';

  .header-stcreate {
    font-size: 28px;
    line-height: 45px;
    padding-top: 25px;

    .backtest,
    .strategy-type,
    .strategy-mode,
    .trade-type,
    .pos-side,
    .loop-mode {
      display: flex;
      align-items: center;
    }

    .nut-row {
      padding: 10px 0;
    }

    .query-date {
      margin: 0 35px 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 25px;

      .nut-cell {
        margin: 0;
        padding: 0;
        box-shadow: 0 0 0 0;
        align-items: center;

        span {
          margin: 0 20px;
          text-decoration: underline;
        }
      }

      .nut-cell:nth-child(1) {
        flex: 2;
      }

      .nut-cell:nth-child(2) {
        flex: 3;
      }
    }

    .nut-radio-group .nut-radio {
      margin-bottom: 0;
    }

    .nut-input {
      padding: 0;
    }

    .dropdown-contain {
      margin-right: 20px;
    }

    .course-type {
      padding: 0 60px;
      font-size: 28px;

      :nth-child(1) {
        padding: 0;
      }

      :nth-child(2) {
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

    .radio-group-container {
      display: flex;
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

    .nut-button--mini {
      padding: 0;
    }

    .button-align-center {
      display: flex;
      justify-content: space-between;

      > .nut-button {
        flex: 1;
        margin: 0 20px;
      }
    }
  }
</style>
