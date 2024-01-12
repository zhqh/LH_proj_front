<template>
  <div>
    <div class="course-type">
      <h3> 周跌幅排行： </h3>
      <div v-for="(item, index) in result" class="row" :key="index">
        <div>{{ item.instId }}</div>
        <div>{{ item.instName }}</div>
        <div>{{ item.lossRate.toFixed(2) * 100 + '%' }}</div>
      </div>
    </div>
  </div>
</template>

<script setup name="DemoPage" lang="ts">
  import { i18n } from '/@/i18n';
  import { useSignalApi } from '/@/api/trade';
  import { showToast } from 'vant';
  import { showDialog, Dialog } from '@nutui/nutui';
  import '@nutui/nutui/dist/packages/dialog/style';
  // import { useI18n } from 'vue-i18n';
  // const { locale } = useI18n();

  onActivated(() => {
    getSignal();
  });

  const result = ref([]);
  const getSignal = async () => {
    const r = await useSignalApi().getSignal('weekLossRate');
    if (r.code == 0) {
      console.log(r.data.signalContent);
      result.value = JSON.parse(r.data.signalContent);
    }
  };
</script>

<style lang="scss" scoped>
  @import '../../styles/mixin.scss';

  .course-type {
    padding: 0 60px;
    text-align: center;
    margin: 30px 0;
    padding: 0 60px;

    // justify-content: center;
    // align-items: center;
    // width: 100%;
    // // width: calc(1200px);
    // margin: 0 auto;
    // background: #ffffff;
    // box-shadow: 0px 10px 25px 10px #d2d2d2;
    // border-bottom-left-radius: 10px;
    // border-bottom-right-radius: 10px;
    .nut-divider {
      margin: 10px;
    }

    h1 {
      margin-bottom: 50px;
    }
  }

  .row {
    display: flex;
    justify-content: space-between;
    padding: 20px;
  }

  .nut-button--block {
    // display: inline-block;
  }

  .course-type-item {
    width: 100%;
    height: auto;
  }

  .course-type-item a {
    display: flex;
    justify-content: left;
    text-decoration: none;
    line-height: 50px;
  }

  .course-type-item-icon {
    font-size: 35px;
    border-radius: 50%;
    margin: 25px 20px 0 auto;
    width: 50px;
    height: 50px;
    background: #55ee8b;
    text-align: left;
    // line-height: 50px;
    color: #ffffff;
  }

  .course-type-item-icon img {
    width: 100%;
    height: 100%;
  }

  .course-type-item-text {
    margin: 25px 0 0 0;
  }

  .course-type-item-title {
    margin: 0px 20px;
    font-size: 25px;
    line-height: 30px;
    font-weight: bold;
  }

  .course-type-item-desc {
    margin: 0px 20px;
    color: #808080;
    font-size: 14px;
  }
</style>
