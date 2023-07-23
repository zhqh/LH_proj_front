<template>
  <div>
    <div class='course-type'>
      <br />
      <nut-form>
        <nut-form-item label="提现地址">
          <div class="adress">
            <nut-input v-model="wallet.address" class="nut-input-text" placeholder="请输入或粘贴USDT地址" type="text" />
            <nut-avatar size="small" @click="chooseAvatar" shape="square">
              <Scan2></Scan2>
            </nut-avatar>
          </div>
        </nut-form-item>
        <nut-divider :style="styleObject" />
        <nut-form-item label="提现数量">
          <nut-input v-model="wallet.amount" class="nut-input-text" placeholder="请输入提现数量" type="text" />
        </nut-form-item>
        <nut-divider :style="styleObject" />
        <nut-form-item label="可用点卡" class="available">
          <span>{{ wallet.available }}U</span>
        </nut-form-item>
        <nut-divider :style="styleObject" />
      </nut-form>
      <nut-popup position="bottom" :style="{ height: '40%' }" v-model:visible="showTop">
        <nut-grid :border="false" column-num="6">
          <nut-grid-item v-for="item in exchangeTools" :key="item.id">
            <nut-avatar size="small" @click="onChooseAvatar(item.id);">
              <img :src="item.icon" />
            </nut-avatar>
          </nut-grid-item>
        </nut-grid>
      </nut-popup>
    </div>
    <div class="button-align-center">
      <br />
      <br />
      <nut-button block type="info" @click="save"> 提币 </nut-button>
    </div>
  </div>
</template>

<script setup name="DemoPage">
import { i18n } from '/@/i18n';
import { useUserStore } from '/@/store/modules/user';
import { Scan2 } from '@nutui/icons-vue';
// import { useI18n } from 'vue-i18n';
// const { locale } = useI18n();

const userStore = useUserStore();
const styleObject = { color: 'rgb(204 204 204)' };
const wallet = reactive({
  available: 0,
  address: '',
  amount: '',
});

onActivated(() => {
  getAvailable().then(e => wallet.available = e);
});

const getAvailable = async () => {
  const r = await useWalletApi().getWallet({});
  if (r.code == 0) {
    if (r.data.commissionAmount >= r.data.presentAmount) {
      return r.data.totalAmount;
    }
    return r.data.chargeAmount
  }
};

const save = () => {
  console.log("save");
  //调用提币服务
}
</script>

<style lang="scss" scoped>
@import '../../styles/mixin.scss';

:root {
  --nut-form-item-body-slots-text-align: right;
  /* --nut-form-item-body-input-text-align: right; */
}

.course-type {
  padding: 0 60px;

  .nut-form-item {
    align-items: center;
  }

  .adress {
    display: flex;
    align-items: center;
    text-align: right;
  }

  .available {
    span {
      color: gray;
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

.button-align-center {
  display: flex;
  justify-content: space-between;

  >.nut-button {
    width: 200px;
    flex: 1;
  }
}

.button-align-center {
  display: flex;
  justify-content: space-between;

  >.nut-button {
    margin: 50px 150px;
    flex: 1;
  }
}
</style>
