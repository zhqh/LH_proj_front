<template>
  <div>
    <div class="amount">
      <div>
        <nut-grid direction="vertical" :column-num="4">
          <nut-grid-item :text="$t('my_wallet.totalAmount')">
            <span>{{ wallet.totalAmount }}</span>
          </nut-grid-item>
          <nut-grid-item :text="$t('my_wallet.chargeAmount')">
            <span>{{ wallet.chargeAmount }}</span>
          </nut-grid-item>
          <nut-grid-item :text="$t('my_wallet.presentAmount')">
            <span>{{ wallet.presentAmount }}</span>
          </nut-grid-item>
          <nut-grid-item :text="$t('my_wallet.commissionAmount')">
            <span>{{ wallet.commissionAmount }}</span>
          </nut-grid-item>
        </nut-grid>
      </div>
      <nut-grid :border="false" column-num="2">
        <nut-grid-item :text="$t('my_wallet.charge')">
          <router-link to="/charge">
            <nut-avatar size="normal" shape="square">
              <img src="../../assets/chongzhi.png" />
            </nut-avatar>
          </router-link>
        </nut-grid-item>
        <nut-grid-item :text="$t('my_wallet.withdraw')">
          <router-link to="/withdraw">
            <nut-avatar size="normal" shape="square">
              <img src="../../assets/tixian.png" />
            </nut-avatar>
          </router-link>
        </nut-grid-item>
      </nut-grid>
      <nut-tabs v-model="wallet.type" @change="getWalletFlow">
        <nut-tab-pane :title="$t('my_wallet.charge_record')" pane-key="charge">
          <nut-table :columns="chargetable.columns" :data="chargetable.data" :bordered="false" :striped="true" />
        </nut-tab-pane>
        <nut-tab-pane :title="$t('my_wallet.withdraw_record')" pane-key="withdraw">
          <nut-table :columns="withdrawtable.columns" :data="withdrawtable.data" :bordered="false" :striped="true" />
        </nut-tab-pane>
        <nut-tab-pane :title="$t('my_wallet.consume_record')" pane-key="commission">
          <nut-table :columns="consumetable.columns" :data="consumetable.data" :bordered="false" :striped="true" />
        </nut-tab-pane>
      </nut-tabs>
    </div>
  </div>
</template>

<script lang="ts" setup name="MemberPage">
import { useUserStore } from '/@/store/modules/user';
import { useRouter } from 'vue-router';
import { Dongdong, ArrowRight } from '@nutui/icons-vue';
import { useWalletApi, useWalletFlowApi } from '/@/api/trade';

const { appContext: { config: { globalProperties } } } = getCurrentInstance();
const router = useRouter();
const userStore = useUserStore();
const name = computed(() => {
  const { name = '' } = userStore.getUserInfo || {};
  console.log(name);
  return name;
});

const wallet = reactive({
  type: 'charge',
  totalAmount: 0,
  chargeAmount: 0,
  presentAmount: 0,
  commissionAmount: 0,
});

const goLogin = () => {
  router.push('/login');
};

onActivated(() => {
  getWallet();
  getWalletFlow();
});

const getWallet = async () => {
  const r = await useWalletApi().getWallet({});
  if (r.code == 0) {
    Object.assign(wallet, r.data);
  }
};

const chargetable = reactive({
  columns: [
    {
      title: globalProperties.$t('my_wallet.charge_time'),
      key: 'transactionTime',
      align: 'center',
      stylehead: 'font-size:15px;font-family: "Microsoft YaHei", sans-serif;',
      stylecolumn: 'font-size:15px;font-family: "Microsoft YaHei", sans-serif;',
    },
    {
      title: `${globalProperties.$t('my_wallet.charge_amount')}(USDT)`,
      key: 'amount',
      align: 'center',
      stylehead: 'font-size:15px;font-family: "Microsoft YaHei", sans-serif;',
      stylecolumn: 'font-size:15px;font-family: "Microsoft YaHei", sans-serif;color:red;',
    },
  ],
  data: [],
});

const withdrawtable = reactive({
  columns: [
    {
      title: globalProperties.$t('my_wallet.withdraw_time'),
      key: 'transactionTime',
      align: 'center',
      stylehead: 'font-size:15px;font-family: "Microsoft YaHei", sans-serif;',
      stylecolumn: 'font-size:15px;font-family: "Microsoft YaHei", sans-serif;',
    },
    {
      title: `${globalProperties.$t('my_wallet.withdraw_amount')}(USDT)`,
      key: 'amount',
      align: 'center',
      stylehead: 'font-size:15px;font-family: "Microsoft YaHei", sans-serif;',
      stylecolumn: 'font-size:15px;font-family: "Microsoft YaHei", sans-serif;color:red;',
    },
  ],
  data: [],
});

const consumetable = reactive({
  columns: [
    {
      title: globalProperties.$t('my_wallet.consume_time'),
      key: 'transactionTime',
      align: 'center',
      stylehead: 'font-size:15px;font-family: "Microsoft YaHei", sans-serif;',
      stylecolumn: 'font-size:15px;font-family: "Microsoft YaHei", sans-serif;',
    },
    {
      title: `${globalProperties.$t('my_wallet.consume_amount')}(USDT)`,
      key: 'amount',
      align: 'center',
      stylehead: 'font-size:15px;font-family: "Microsoft YaHei", sans-serif;',
      stylecolumn: 'font-size:15px;font-family: "Microsoft YaHei", sans-serif;color:red;',
    },
  ],
  data: [],
});
const walletFlow = reactive({
  charge: chargetable,
  withdraw: withdrawtable,
  commission: consumetable,
});

const getWalletFlow = async () => {
  const r = await useWalletFlowApi().list({ type: wallet.type });
  if (r.code == 0) {
    console.log(walletFlow[wallet.type]);
    Object.assign(walletFlow[wallet.type].data, r.data.records);
  }
};
</script>

<style lang="scss" scoped>
.amount {
  padding: 20px;

  span {
    font-size: 30px;
  }
}

.nut-tab-pane {
  padding: 10px 0;
}

.section-title {
  font-size: 26px;
  margin: 10px;
}

.avatar-wrap {
  display: flex;
  margin: 30px 40px;
  align-items: center;
  // background-color: gray;

  .member-detail {
    margin-left: 20px;
    display: flex;
    width: 100%;

    a {
      margin-left: auto;
    }

    .nickname {
      font-size: 25px;
      font-weight: bold;

      .nut-button {
        margin-left: 10px;
      }
    }

    .info {
      margin-top: 10px;
      font-size: 16px;
    }
  }
}
</style>
