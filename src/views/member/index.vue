<template>
  <div>
    <div class="avatar-wrap">
      <nut-avatar class="avatar" size="large" @click="account">
        <router-link to="/setting">
          <img :src="userStore.getUserInfo.photo" />
        </router-link>
      </nut-avatar>
      <div class="member-detail">
        <span class="nickname"> ID:{{ username }} </span>
        <router-link to="/setting">
          <ArrowRight />
        </router-link>
      </div>
    </div>
    <div class="amount">
      <nut-grid direction="vertical" column-num="3">
        <nut-grid-item :text="$t('member.todayProfit')">
          <span>{{ profit.todayProfit }}</span>
        </nut-grid-item>
        <nut-grid-item :text="$t('member.monthProfit')">
          <span>{{ profit.currentMonthProfit }}</span>
        </nut-grid-item>
        <nut-grid-item :text="$t('member.accumulatedProfit')">
          <span>{{ profit.accumulatedProfit }}</span>
        </nut-grid-item>
      </nut-grid>
    </div>
  </div>
  <h3 class="section-title">{{ $t('member.strategy') }}</h3>
  <div class="strategy">
    <nut-grid :border="false" column-num="3">
      <nut-grid-item :text="$t('member.analyse')">
        <router-link to="/analysis">
          <nut-avatar size="normal">
            <img src="../../assets/jiaoyifenxi.png" />
          </nut-avatar>
        </router-link>
      </nut-grid-item>
      <nut-grid-item :text="$t('member.flow')">
        <router-link to="/exchange">
          <nut-avatar size="normal">
            <img src="../../assets/jiaoyiliushui.png" />
          </nut-avatar>
        </router-link>
      </nut-grid-item>
      <nut-grid-item :text="$t('member.hisStrategy')">
        <router-link to="/hisst">
          <nut-avatar size="normal">
            <img src="../../assets/lishicelve.png" />
          </nut-avatar>
        </router-link>
      </nut-grid-item>
    </nut-grid>
  </div>
  <h3 class="section-title">{{ $t('member.general') }}</h3>
  <nut-grid :border="false" column-num="3">
    <nut-grid-item :text="$t('member.wallet')">
      <router-link to="/wallet">
        <nut-avatar size="normal">
          <img src="../../assets/wallet.png" />
        </nut-avatar>
      </router-link>
    </nut-grid-item>
    <nut-grid-item :text="$t('home.shareinvite')">
      <router-link to="/share">
        <nut-avatar size="normal">
          <img src="../../assets/fuzhilianjie.png" />
        </nut-avatar>
      </router-link>
    </nut-grid-item>
    <nut-grid-item :text="$t('home.helpcenter')">
      <router-link to="/help">
        <nut-avatar size="normal">
          <img src="../../assets/bangzhu.png" />
        </nut-avatar>
      </router-link>
    </nut-grid-item>
    <nut-grid-item :text="$t('member.manage')" v-if="userStore.getUserInfo.username == 'admin'">
      <router-link to="/manage">
        <nut-avatar size="normal">
          <img src="../../assets/xitongguanli.png" />
        </nut-avatar>
      </router-link>
    </nut-grid-item>
    <nut-grid-item :text="$t('member.signal')" v-if="userStore.getUserInfo.username == 'zhqh'">
      <router-link to="/signal">
        <nut-avatar size="normal">
          <img src="../../assets/xitongguanli.png" />
        </nut-avatar>
      </router-link>
    </nut-grid-item>
  </nut-grid>
</template>

<script lang="ts" setup name="MemberPage">
  import { useUserStore } from '/@/store/modules/user';
  import { useRouter } from 'vue-router';
  import { Dongdong, ArrowRight } from '@nutui/icons-vue';
  import { useProfitApi, useStrategyApi } from '/@/api/trade';
  import { showToast } from 'vant';

  const router = useRouter();
  const userStore = useUserStore();
  const username = computed(() => {
    const { username = '' } = userStore.getUserInfo || {};
    return username;
  });

  const goLogin = () => {
    router.push('/login');
  };

  let profit = reactive({
    todayProfit: 0,
    currentMonthProfit: 0,
    accumulatedProfit: 0,
  });

  onActivated(() => {
    getProfit();
  });

  const getProfit = async () => {
    const r = await useProfitApi().getProfit({});
    if (r.code == 0) {
      Object.assign(profit, r.data);
    }
  };
</script>

<style lang="scss" scoped>
  .amount {
    span {
      font-size: 30px;
    }
  }

  .section-title {
    font-size: 26px;
    margin: 10px;
  }

  .strategy {
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
