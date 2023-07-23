<template>
  <div>
    <div class="course-type">
      <br />
      <nut-form ref="ruleForm" :model-value="baseInfo">
        <nut-form-item :label="$t('email.old_email')" required prop="email">
          <nut-input v-model="baseInfo.email" class="nut-input-text" type="text" readonly />
        </nut-form-item>
        <nut-divider :style="styleObject" />
        <nut-form-item :label="$t('email.new_email')" required prop="newEmail"
          :rules="[{ required: true, message: $t('email.empty_email') }]">
          <nut-input v-model="baseInfo.newEmail" class="nut-input-text" :placeholder="$t('email.input_email')"
            type="text" />
        </nut-form-item>
        <nut-divider :style="styleObject" />
        <nut-form-item :label="$t('common.captcha')" required prop="emailCaptcha"
          :rules="[{ required: true, message: $t('common.empty_captcha') }]">
          <div style="display: flex">
            <nut-input v-model="baseInfo.emailCaptcha" class="nut-input-text" :placeholder="$t('common.input_captcha')"
              type="text">
              <template #right>
                <nut-button type="primary" size="small" shape="square" @click="sendEmailCaptcha">{{
                  $t('common.send_captcha')
                }}</nut-button>
              </template>
            </nut-input>
          </div>
        </nut-form-item>
        <nut-divider :style="styleObject" />
      </nut-form>
    </div>
    <br />
    <br />
    <div class="course-type">
      <div class="button-align-center">
        <nut-button block type="info" @click="save" :disabled="saving"> {{ $t('common.save') }} </nut-button>
        <nut-button block type="info" @click="cancel"> {{ $t('common.cancel') }} </nut-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup name="DemoPage">
import { i18n } from '/@/i18n';
import router from '/@/router';
import { useUserStore } from '/@/store/modules/user';
import { useUserApi } from '/@/api/user';
import { useLoginApi } from '/@/api/login';
import { showToast } from 'vant';
// import { useI18n } from 'vue-i18n';
// const { locale } = useI18n();

const { appContext: { config: { globalProperties } } } = getCurrentInstance();
const userApi = useUserApi();
const userStore = useUserStore();
const styleObject = { color: 'rgb(204 204 204)' };
const baseInfo = reactive({
  email: userStore.getUserInfo.email,
  newEmail: '',
  emailCaptcha: '',
});

const sendEmailCaptcha = async () => {
  if (!baseInfo.newEmail) {
    showToast(globalProperties.$t('email.empty_email'));
    return;
  }
  await useLoginApi().sendEmailCaptcha(baseInfo.newEmail);
  showToast(globalProperties.$t('common.has_send_captcha'));
};

const saving = ref(false);
const ruleForm = ref<any>(null);
const save = () => {
  saving.value = true;
  ruleForm.value.validate().then(async ({ valid, errors }: any) => {
    console.log(11);
    if (valid) {
      const r = await useUserApi().updateEmail({ newEmail: baseInfo.newEmail, emailCaptcha: baseInfo.emailCaptcha });
      if (r.code == 0) {
        Object.assign(userStore.getUserInfo, { email: baseInfo.newEmail });
        showToast(globalProperties.$t('common.save_success'));
        baseInfo.email = baseInfo.newEmail;
        baseInfo.newEmail = '';
        baseInfo.emailCaptcha = '';
      }
    } else {
      console.log('error submit!!', errors);
    }
    saving.value = false;
  });
};

const cancel = () => {
  router.go(-1);
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

.button-align-center {
  display: flex;
  justify-content: space-between;

  >.nut-button {
    flex: 1;
    margin: 0 20px;
  }
}
</style>
