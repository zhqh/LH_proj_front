<template>
  <div>
    <div class="course-type">
      <h1>
        <nut-button block type="info" @click="refreshHighestAndLowestPrice"> 刷新持仓单监控价格 </nut-button>
      </h1>
      <h1>
        <nut-button block type="info" @click="refreshStrategies"> 同步策略到当前服务器节点 </nut-button>
      </h1>
      <h1>
        <nut-button block type="info" @click=""> 同步持仓数据到当前服务器节点 </nut-button>
      </h1>
    </div>
  </div>
</template>

<script setup name="DemoPage" lang="ts">
import { i18n } from '/@/i18n';
import { useOpsApi } from '/@/api/trade';
import { showToast } from 'vant';
import { showDialog, Dialog } from '@nutui/nutui';
import '@nutui/nutui/dist/packages/dialog/style';
// import { useI18n } from 'vue-i18n';
// const { locale } = useI18n();

const refreshHighestAndLowestPrice = async () => {
  confirmClick("", "", async () => {
    const r = await useOpsApi().refreshHoldPrice({});
    if (r.code == 0) {
      showToast("刷新成功");
    }
    throw new Error(`刷新失败`);
  });
};
const refreshStrategies = async () => {
  confirmClick("", "", async () => {
    const r = await useOpsApi().refreshStrategies({});
    if (r.code == 0) {
      showToast("同步成功");
    }
    throw new Error(`同步失败`);
  });
};

const confirmClick = (title, content, onOk, onCancel = () => { }): void => {
  showDialog({
    title: title || '确认进行此次操作',
    content: content || '',
    onCancel,
    onOk
  });
};
</script>

<style lang="scss" scoped>
@import '../../styles/mixin.scss';

.course-type {
  padding: 0 60px;
  text-align: center;
  margin: 100px 0;
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
