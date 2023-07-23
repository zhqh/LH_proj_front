<template>
  <div>
    <div class="course-type">
      <br />
      <div class="btn-wrap">
        <nut-form ref="ruleForm" :model-value="baseInfo">
          <nut-form-item :label="$t('change_language')" required prop="language">
            <nut-radio-group v-model="userStore.getUserInfo.language" direction="horizontal" @change="languageChanged">
              <nut-radio label="zh-cn">{{ $t('language.zh') }}</nut-radio>
              <nut-radio label="en-us">{{ $t('language.en') }}</nut-radio>
            </nut-radio-group>
          </nut-form-item>
        </nut-form>
      </div>
    </div>
    <br />
    <br />
  </div>
</template>

<script lang="ts" setup name="DemoPage">
import { setLang } from '/@/i18n';
import router from '/@/router';
import { useUserStore } from '/@/store/modules/user';
import { useUserApi } from '/@/api/user';
import { showToast } from 'vant';

// import { useI18n } from 'vue-i18n';
// const { locale } = useI18n();

const userStore = useUserStore();
const styleObject = { color: 'rgb(204 204 204)' };

const languageChanged = async (language: any) => {
  console.log(language)
  const r = await useUserApi().changeLanguage({ language });
  if (r.code == 0) {
    setLang(language);
    showToast('切换成功');
    window.location.reload();
  }
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
