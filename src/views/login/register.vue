<template>
  <div class="login">
    <div class="language">
      <span :class="{ selected: currentLanguage == 'zh-cn' }" @click="changeLang('zh-cn')">
        中文
      </span>
      <span :class="{ selected: currentLanguage == 'en-us' }" @click="changeLang('en-us')">
        English
      </span>
    </div>
    <img src="../../assets/logo2.png" class="logo" />
    <div class="base-info">
      <nut-form ref="ruleForm" :model-value="baseInfo">
        <nut-form-item required prop="username" :rules="[{ required: true, message: $t('register.empty_name') }]">
          <My></My>
          <input v-model="baseInfo.username" class="nut-input-text" :placeholder="$t('register.input_name')"
            type="text" />
        </nut-form-item>
        <nut-form-item required prop="password" :rules="[{ required: true, message: $t('register.empty_password') }]">
          <Order />
          <input v-model="baseInfo.password" class="nut-input-text" :placeholder="$t('register.input_password')"
            type="password" />
        </nut-form-item>
        <nut-form-item required prop="email" :rules="[{ required: true, message: $t('register.empty_email') }]">
          <My />
          <input v-model="baseInfo.email" class="nut-input-text" v-bind:placeholder="$t('register.input_email')"
            type="text" />
        </nut-form-item>
        <nut-form-item required prop="emailCode" :rules="[{ required: true, message: $t('common.empty_captcha') }]">
          <Order />
          <input v-model="baseInfo.emailCaptcha" class="nut-input-text" :placeholder="$t('common.input_captcha')"
            type="text" />
          <nut-button type="primary" size="small" shape="square" @click="sendEmailCaptcha">{{ $t('common.send_captcha')
          }}</nut-button>
        </nut-form-item>
        <nut-form-item required prop="invitedCode"
          :rules="[{ required: true, message: $t('register.empty_invitedCode') }]">
          <My />
          <input v-model="baseInfo.invitedCode" class="nut-input-text" :placeholder="$t('register.input_name')"
            type="text" />
        </nut-form-item>
        <div class="button-align-center">
          <nut-button block type="info" @click="register" :disabled="saving"> {{ $t('register.register')
          }} </nut-button>
        </div>
        <div class="bottom">
          <router-link to="/login"> {{ $t('common.goto_login') }}</router-link>
        </div>
      </nut-form>
    </div>
  </div>
</template>

<script lang="ts" setup name="LoginPage">
import router from '/@/router';
import { reactive, ref } from 'vue';
import { useUserStore } from '/@/store/modules/user';
import { Order, My } from '@nutui/icons-vue';
import { useRoute } from 'vue-router';
import { useUserApi } from '/@/api/user';
import { useLoginApi } from '/@/api/login';
import { useMenuApi } from '/@/api/menu';
import { setLang } from '/@/i18n';
import { showToast } from 'vant';

const { appContext: { config: { globalProperties } } } = getCurrentInstance();

const userApi = useUserApi();
const menuApi = useMenuApi();

let route = useRoute();
let rc = route.query.rc;
let tt = route.query.tt;

const userStore = useUserStore();
const baseInfo = reactive({
  username: '',
  password: '',
  email: '',
  emailCaptcha: '',
  invitedCode: rc || '',
});
const sendEmailCaptcha = async () => {
  if (!baseInfo.email) {
    showToast(globalProperties.$t('register.empty_email'));
    return;
  }
  await useLoginApi().sendEmailCaptcha(baseInfo.email);
  showToast(globalProperties.$t('common.has_send_captcha'));
};

const saving = ref(false);
const ruleForm = ref<any>(null);
const register = async () => {
  saving.value = true;
  ruleForm.value.validate().then(async ({ valid, errors }: any) => {
    if (valid) {
      const r = await userApi.register(baseInfo);
      if (r.code == 0) {
        Object.assign(userStore.getUserInfo, baseInfo);
        showToast(globalProperties.$t('register.registered_to_login'));
        const tokenInfo = await useLoginApi().signIn(baseInfo);
        if (tokenInfo.token) {
          userStore.setToken(tokenInfo.token);
          const userInfoResult = await menuApi.getRouterMenu();
          userStore.setInfo(userInfoResult.data.userInfo);
          setLang(userInfoResult.data.userInfo.language);
          router.push({ path: '/home' });
        }
      }
    }
    saving.value = false;
  });
}
const verify = (baseInfo) => {
  if (!baseInfo.username) {
    showToast(globalProperties.$t("register.empty_name"));
  }
};
const cancel = () => {
  router.go(-1);
};
let currentLanguage = ref('zh-cn');
const changeLang = (language) => {
  currentLanguage.value = language;
  setLang(language);
}
</script>

<style scoped lang="scss">
.login {
  padding: 80px;
  text-align: center;

  .language {
    margin: 20px 20px 0 0;
    text-align: right;

    :nth-child(n) {
      padding: 0 10px;
    }

    .selected {
      color: blue;
      text-decoration: underline;
    }
  }

  .logo {
    margin-top: 80px;
    width: 50%;
  }

  .base-info {}

  a {
    // width: 50%;
    flex: 1;
    margin: 30px 50px;
    font-size: 30px;
  }

  h2 {
    text-align: center;
    letter-spacing: 10px;
  }

  .nut-icon {
    vertical-align: middle;
  }

  .nut-button {
    font-size: 30px;
  }

  .bottom {
    display: flex;
    // margin: 40px;
  }

  .nut-form-item {
    // background: #f2f3f5;
    // border-radius: 20px;
    // margin: 0 40px;
    line-height: 60px;

    input {
      width: 50%;
      padding-left: 40px;
      background: transparent;
    }
  }
}

.button-align-center {
  padding: 20px 0;
  display: flex;
  justify-content: space-between;

  >.nut-button {
    margin: 0 100px;
    flex: 1;
  }
}
</style>
