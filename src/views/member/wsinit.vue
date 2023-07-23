<template>
  <div class="course-type">
    {{ message }}
    <br />
    <br />
    <nut-button block type="info" @click="start"> 开启策略 </nut-button> <br />
    <nut-button block type="info" @click="stop"> 停止策略 </nut-button> <br />
    <br />
    <nut-divider />
    <br />
    <nut-button block type="info" @click="pause" disabled=""> 暂停策略 </nut-button><br />
    <nut-button block type="info" @click="proceed" disabled=""> 继续策略 </nut-button> <br />
    <br />
    <nut-divider />
    <br />
    <nut-button block type="info" @click="dcstate"> 获取订阅消息 </nut-button> <br />
  </div>
</template>

<script lang="ts" setup name="DemoPage">
  import { i18n } from '/@/i18n';
  import router from '/@/router';
  import { useUserStore } from '/@/store/modules/user';
  import { useStrategyApi } from '/@/api/trade';
  import { showToast } from 'vant';
  // import { useI18n } from 'vue-i18n';
  // const { locale } = useI18n();

  const userStore = useUserStore();
  const tradeApi = useStrategyApi();
  const styleObject = { color: 'rgb(204 204 204)' };

  let message = ref('');

  const start = async () => {
    const r = await tradeApi.start({ strParamId: '123' });
    if (r.code == 0) {
      showToast(JSON.stringify(r.data));
    }
  };
  const pause = async () => {
    const r = await tradeApi.pause({ strParamId: '123' });
    if (r.code == 0) {
      showToast(JSON.stringify(r.data));
    }
  };
  const proceed = async () => {
    const r = await tradeApi.proceed({ strParamId: '123' });
    if (r.code == 0) {
      showToast(JSON.stringify(r.data));
    }
  };
  const getMessage = async () => {
    const r = await tradeApi.getMessage({});
    if (r.code == 0) {
      message.value = r.data;
    }
  };
  const stop = async () => {
    const r = await tradeApi.stop({ strParamId: '123' });
    if (r.code == 0) {
      showToast(JSON.stringify(r.data));
    }
  };
  const dcstate = async () => {
    const r = await tradeApi.dcstate({ strParamId: '123' });
    if (r.code == 0) {
      showToast(JSON.stringify(r.data));
    }
  };
</script>

<style lang="scss" scoped>
  @import '../../styles/mixin.scss';

  .course-type {
    padding: 0 60px;

    .nut-form-item {
      align-items: center;
      // margin: 0 40px;
      // line-height: 60px;

      input {
        // width: 50%;
        // padding-left: 40px;
        // background: transparent;
      }
    }

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
