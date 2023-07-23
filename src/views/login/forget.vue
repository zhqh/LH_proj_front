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
    <nut-form ref="ruleForm" :model-value="baseInfo">
      <nut-form-item required prop="email" :rules="[{ required: true, message: $t('forget.empty_email') }]">
        <My />
        <input v-model="baseInfo.email" class="nut-input-text" :placeholder="$t('forget.input_email')" type="text" />
      </nut-form-item>
      <nut-form-item required prop="emailCaptcha" :rules="[{ required: true, message: $t('common.empty_captcha') }]">
        <Order />
        <input v-model="baseInfo.emailCaptcha" class="nut-input-text" :placeholder="$t('common.input_captcha')"
          type="text" />
        <nut-button type="primary" size="small" shape="square" @click="sendEmailCaptcha">{{ $t('common.send_captcha')
        }}</nut-button>
      </nut-form-item>
      <nut-form-item required prop="password" :rules="[{ required: true, message: $t('forget.empty_newpassword') }]">
        <Order />
        <input v-model="baseInfo.password" class="nut-input-text" :placeholder="$t('forget.input_password')"
          type="password" />
      </nut-form-item>
      <br />
      <br />
      <div class="button-align-center">
        <nut-button block type="info" @click="submit" :disabled="saving"> {{ $t('forget.reset_password') }} </nut-button>
      </div>
      <div class="bottom">
        <router-link to="/login"> {{ $t('common.goto_login') }}</router-link>
      </div>
    </nut-form>
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
import { showToast } from 'vant';
import { setLang } from '/@/i18n';

const { appContext: { config: { globalProperties } } } = getCurrentInstance();
const userApi = useUserApi();

let route = useRoute();
let ic = route.query.ic;
let tt = route.query.tt;
console.log(ic + ':' + tt);

const userStore = useUserStore();
const baseInfo = reactive({
  password: '',
  email: '',
  emailCaptcha: '',
  ic: ic || '',
});
const sendEmailCaptcha = async () => {
  if (!baseInfo.email) {
    showToast(globalProperties.$t('forget.empty_email'));
    return;
  }
  await useLoginApi().sendEmailCaptcha(baseInfo.email);
  showToast(globalProperties.$t('common.has_send_captcha'));
};

const saving = ref(false);
const ruleForm = ref<any>(null);
const submit = async () => {
  saving.value = true;
  ruleForm.value.validate().then(async ({ valid, errors }: any) => {
    if (valid) {
      // userStore.getUserInfo
      const r = await userApi.resetPassword({ email: baseInfo.email, emailCaptcha: baseInfo.emailCaptcha, newPassword: baseInfo.password });
      if (r.code == 0) {
        Object.assign(userStore.getUserInfo, baseInfo);
        showToast(globalProperties.$t('forget.reset_to_login'));
        baseInfo.username = baseInfo.email;
        const tokenInfo = await useLoginApi().signIn(baseInfo);
        if (tokenInfo.token) {
          userStore.setToken(tokenInfo.token);
          const userInfoResult = await useMenuApi().getRouterMenu();
          userStore.setInfo(userInfoResult.data.userInfo);
          setLang(userInfoResult.data.userInfo.language);
          router.push({ path: '/home' });
        }
      }
    }
    saving.value = false;
  });
}
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
    margin-top: 150px;
    width: 50%;
  }

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
    margin: 0 40px;
    line-height: 60px;

    input {
      width: 50%;
      padding-left: 40px;
      background: transparent;
    }
  }

  .button-align-center {
    display: flex;
    justify-content: space-between;

    >.nut-button {
      margin: 0 100px;
      flex: 1;
    }
  }
}
</style>
