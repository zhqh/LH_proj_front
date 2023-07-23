<template>
  <div>
    <div class="course-type">
      <nut-cell-group>
        <router-link to="/person">
          <nut-cell :title="$t('member.person')" is-link />
        </router-link>
        <nut-divider />
        <router-link to="/email">
          <nut-cell :title="$t('member.email')" is-link />
        </router-link>
        <nut-divider />
        <router-link to="/password">
          <nut-cell :title="$t('member.password')" is-link />
        </router-link>
        <nut-divider />
        <router-link to="/language">
          <nut-cell :title="$t('member.language')" is-link />
        </router-link>
        <nut-divider />
        <router-link to="/contact" style="display: none;">
          <nut-cell :title="$t('member.contact')" is-link />
        </router-link>
        <nut-divider style="display: none;" />
        <router-link to="/cache">
          <nut-cell :title="$t('member.cache')" is-link />
        </router-link>
        <nut-divider />
        <router-link to="/version">
          <nut-cell :title="$t('member.version')" is-link />
        </router-link>
      </nut-cell-group>
    </div>
    <div class="button-align-center">
      <nut-button block type="info" @click="logout"> {{ $t('setting.logout') }} </nut-button>
    </div>
  </div>
</template>

<script setup name="DemoPage">
import { i18n } from '/@/i18n';
import { useUserStore } from '/@/store/modules/user';
import router from '/@/router';
import { useLoginApi } from '/@/api/login';
const userStore = useUserStore();
// import { useI18n } from 'vue-i18n';
// const { locale } = useI18n();

const logout = () => {
  useLoginApi()
    .signOut()
    .then((response) => {
      userStore.clearToken();
      router.push({ path: '/login' });
    })
    .catch(() => { });
};
</script>

<style lang="scss" scoped>
@import '../../styles/mixin.scss';

.course-type {
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
}

.nut-button--block {
  // display: inline-block;
}

.button-align-center>:nth-child(1) {
  margin: 30px 150px;
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
</style>
