<template>
  <div>
    <div class="course-type">
      <br />
      <nut-form ref="ruleForm" :model-value="baseInfo">
        <nut-form-item label="旧密码" required prop="password" :rules="[{ required: true, message: '密码为空' }]">
          <nut-input v-model="baseInfo.password" class="nut-input-text" placeholder="请输入旧密码" type="text" />
        </nut-form-item>
        <nut-divider :style="styleObject" />
        <nut-form-item label="新密码" required prop="newPassword" :rules="[{ required: true, message: '新密码为空' }]">
          <nut-input v-model="baseInfo.newPassword" class="nut-input-text" placeholder="请输入新密码" type="text" />
        </nut-form-item>
        <nut-divider :style="styleObject" />
        <nut-form-item label="确认新密码" required prop="confirmPassword" :rules="[
          { required: true, message: '确认新密码为空' },
          { validator: customValidator, message: '两次新密码不一致' },
        ]">
          <nut-input v-model="baseInfo.confirmPassword" class="nut-input-text" placeholder="请输入新密码" type="text" />
        </nut-form-item>
        <nut-divider :style="styleObject" />
      </nut-form>
    </div>
    <br />
    <br />
    <div class="button-align-center">
      <nut-button block type="info" @click="save"> 保存 </nut-button>
      <nut-button block type="info" @click="cancel"> 取消 </nut-button>
    </div>
  </div>
</template>

<script lang="ts" setup name="DemoPage">
import { i18n } from '/@/i18n';
import router from '/@/router';
import { useUserStore } from '/@/store/modules/user';
import { useUserApi } from '/@/api/user';
import { showToast } from 'vant';
// import { useI18n } from 'vue-i18n';
// const { locale } = useI18n();

const userStore = useUserStore();
const userApi = useUserApi();
const styleObject = { color: 'rgb(204 204 204)' };
const baseInfo = reactive({
  password: '',
  newPassword: '',
  confirmPassword: '',
});

const customValidator = (confirmPassword: string) => baseInfo.newPassword == confirmPassword;

const ruleForm = ref<any>(null);
const save = () => {
  ruleForm.value.validate().then(async ({ valid, errors }: any) => {
    if (valid) {
      const r = await useUserApi().password({
        userId: userStore.getUserInfo.userId,
        password: baseInfo.password,
        newPassword: baseInfo.newPassword,
      });
      if (r.code == 0) {
        showToast('保存成功');
      }
    } else {
      console.log('error submit!!', errors);
    }
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
