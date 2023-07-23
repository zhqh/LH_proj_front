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
    <div class="user-info">
      <nut-form ref="ruleForm" :model-value="formData">
        <nut-form-item required prop="username" :rules="[{ required: true, message: $t('login.empty_name') }]">
          <My />
          <input v-model="formData.username" class="nut-input-text" :placeholder="$t('login.input_name')" type="text" />
        </nut-form-item>
        <nut-form-item required prop="password" :rules="[{ required: true, message: $t('login.empty_password') }]">
          <Order />
          <input v-model="formData.password" class="nut-input-text" :placeholder="$t('login.input_password')"
            type="password" />
        </nut-form-item>
        <!-- <nut-form-item required prop="captcha" :rules="[{ required: true, message: '请输入验证码' }]">
        <Order></Order>
        <input v-model="formData.captcha" class="nut-input-text" placeholder="请输入验证码" type="text">
        <img :src="identifyCodeSrc" @click="getIdentifyingCode" style="width:30%;" />
      </nut-form-item> -->
        <br />
        <br />
        <div class="button-align-center">
          <nut-button block type="info" @click="submit" :disabled="saving"> {{ $t('login.login') }} </nut-button>
        </div>
        <div class="bottom">
          <router-link to="/forget">{{ $t('login.forget_password') }}</router-link>
          <router-link to="/register">{{ $t('login.register') }}</router-link>
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
// import { Encrypt } from '../../utils/aes'
import { useLoginApi } from '/@/api/login';
import { useMenuApi } from '/@/api/menu';
import { setLang } from '/@/i18n';

const menuApi = useMenuApi();
const userStore = useUserStore();
const formData = reactive({
  username: 'guest',
  password: '1',
  captcha: '',
  randomStr: 0,
});
const identifyCodeSrc = ref();
const getRandomStr = () => {
  formData.randomStr = Math.floor(Math.random() * 999999999);
};
const getIdentifyingCode = () => {
  getRandomStr();
  identifyCodeSrc.value = 'api/sys/code/' + formData.randomStr;
};
getIdentifyingCode();

const saving = ref(false);
const ruleForm = ref<any>(null);
const submit = () => {
  saving.value = true;
  ruleForm.value.validate().then(async ({ valid, errors }: any) => {
    if (valid) {
      const tokenInfo = await useLoginApi().signIn(formData);
      if (tokenInfo.token) {
        userStore.setToken(tokenInfo.token);
        const userInfoResult = await menuApi.getRouterMenu();
        userStore.setInfo(userInfoResult.data.userInfo);
        setLang(userInfoResult.data.userInfo.language);
        router.push({ path: '/home' });
      }
    } else {
      console.log('error submit!!', errors);
    }
    saving.value = false;
  });
};
let currentLanguage = ref('zh-cn');
const changeLang = (language) => {
  currentLanguage.value = language;
  setLang(language);
}
</script>

<style scoped lang="scss">
.login {
  padding: 90px;
  text-align: center;

  .user-info {
    // padding: 0 50px;
  }

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
    margin-top: 130px;
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
    line-height: 60px;

    input {
      width: 50%;
      padding-left: 40px;
      background: transparent;
    }
  }
}

.button-align-center {
  display: flex;
  justify-content: center;

  >.nut-button {
    flex: 1;
    margin: 0 100px;
  }
}
</style>
