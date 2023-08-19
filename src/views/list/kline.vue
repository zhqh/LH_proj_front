<template>
  <div class="container">
    <div class="query">
      <div ref="chart" style="height: 400px; padding-left: 10px"></div>
    </div>
  </div>
</template>

<script lang="ts" setup name="HomePage">
  import { computed, onBeforeMount } from 'vue';
  import { useUserStore } from '/@/store/modules/user';
  import { setLang } from '/@/i18n';
  import { useI18n } from 'vue-i18n';
  import '@nutui/icons-vue/dist/style_iconfont.css';
  import { IconFont } from '@nutui/icons-vue';
  import { useOrderApi, useExchangeApi, useStrategyApi } from '/@/api/trade';
  import { getRecentMonth, getRecentMonthString } from '/@/utils/date';
  import { showToast } from 'vant';
  import { Check, MoreS, Search } from '@nutui/icons-vue';
  import router from '/@/router';
  import * as echarts from 'echarts';

  let route = useRoute();
  const userStore = useUserStore();
  const { locale } = useI18n();
  const {
    appContext: {
      config: { globalProperties },
    },
  } = getCurrentInstance();

  const chart = ref();
  const upColor = '#ec0000';
  const upBorderColor = '#8A0000';
  const downColor = '#00da3c';
  const downBorderColor = '#008F28';
  const option = reactive({
    title: {
      text: '',
      left: 0,
    },
    tooltip: {
      textStyle: { fontSize: 8 },
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
      position: function () {
        return { top: 0, left: 0 };
      },
      formatter: function (param) {
        let r = (Math.abs(param[0].data[5]) * 100).toFixed(2);
        return `${param[0].name}&nbsp;开:${param[0].data[1]}&nbsp;低:${param[0].data[3]}&nbsp;高:${param[0].data[4]}&nbsp;收:${
          param[0].data[2]
        }&nbsp;涨跌幅&nbsp;${param[0].data[5] > 0 ? '+' : '-'}${r}%`;
      },
    },
    legend: {
      data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30'],
    },
    grid: {
      left: '10%',
      right: '10%',
      bottom: '15%',
    },
    xAxis: {
      type: 'category',
      data: [],
      boundaryGap: false,
      axisLine: { onZero: false },
      splitLine: { show: false },
      min: 'dataMin',
      max: 'dataMax',
    },
    yAxis: {
      offset: -2,
      scale: true,
      splitArea: {
        show: true,
      },
    },
    dataZoom: [
      {
        type: 'inside',
        start: 50,
        end: 100,
      },
      {
        show: true,
        type: 'slider',
        top: '90%',
        start: 50,
        end: 100,
      },
    ],
    series: [
      {
        // name: '日K',
        type: 'candlestick',
        data: [],
        itemStyle: {
          color: upColor,
          color0: downColor,
          borderColor: upBorderColor,
          borderColor0: downBorderColor,
        },
        markPoint: {
          symbol: 'circle',
          symbolSize: 5,
          data: [],
        },
        markLine: {
          symbol: ['none', 'none'],
          data: [],
        },
      },
    ],
  });

  function splitData(rawData) {
    const categoryData = [];
    const values = [];
    for (var i = 0; i < rawData.length; i++) {
      let line = rawData[i].split(',');
      categoryData.push(line[0].substr(0, 10));
      let o = parseFloat(line[1]);
      let h = parseFloat(line[2]);
      let l = parseFloat(line[3]);
      let c = parseFloat(line[4]);
      let r = 0;
      if (i > 0) {
        let lastC = parseFloat(rawData[i - 1].split(',')[4]);
        r = (c - lastC) / lastC;
      }
      values.push([o, c, l, h, r]);
    }
    return {
      categoryData: categoryData,
      values: values,
    };
  }

  onActivated(async () => {
    const myChart = echarts.init(chart.value);
    let strategy = await getStrategyById(route.params.id);
    console.log(strategy);
    getHistoryCandles(strategy.instId, userStore.getUserInfo.defaultExchange).then((candles) => {
      option.xAxis.data = candles.categoryData;
      option.series[0].data = candles.values;
      myChart.setOption(option);
    });
    getHisOrder(route.params.id).then((orders) => {
      let data = [];
      orders.forEach((e) => {
        data.push([{ coord: [e.openTime.substring(0, 10), e.openPrice] }, { coord: [e.closeTime.substring(0, 10), e.closePrice] }]);
      });
      option.series[0].markLine.data = data;
      myChart.setOption(option);
    });
    getCurrentOrder(route.params.id).then((orders) => {
      let data = [];
      for (let i = 0; i < orders.length; i++) {
        let e = orders[i];
        data.push({ coord: [e.openTime.substring(0, 10), e.price], value: orders.length - i });
      }
      option.series[0].markPoint.data = data;
      myChart.setOption(option);
    });
  });

  const getStrategyById = async (strategyId) => {
    const r = await useStrategyApi().getStrategyById(strategyId);
    if (r.code == 0) {
      return r.data;
    }
    return {};
  };

  const getHistoryCandles = async (instId, exchange) => {
    const r = await useExchangeApi().historyCandles({ instId, exchange });
    if (r.code == 0) {
      return splitData(r.data);
    }
    return {
      categoryData: [],
      values: [],
    };
  };

  const getHisOrder = async (strategyId) => {
    const r = await useOrderApi().listHistory({
      current: 1,
      limit: 1000,
      strategyId: strategyId,
    });
    if (r.code == 0) {
      return r.data.records;
    }
    return [];
  };

  const getCurrentOrder = async (strategyId) => {
    const r = await useOrderApi().listCurrent({ current: 1, limit: 1000, strategyId: strategyId });
    if (r.code == 0) {
      return r.data.records;
    }
    return [];
  };
</script>

<style lang="scss" scoped>
  .container {
    font-family: 'Microsoft YaHei', sans-serif;
  }

  .query {
    margin-top: 20px;
  }
</style>
