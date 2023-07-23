<template>
  <div>
    <div class="course-type">
      <br />
      <nut-form ref="ruleForm" :model-value="baseInfo">
        <nut-form-item :label="$t('person.avatar')">
          <div style="text-align: right">
            <nut-avatar size="small" @click="chooseAvatar">
              <img :src="baseInfo.photo" />
            </nut-avatar>
          </div>
        </nut-form-item>
        <nut-divider :style="styleObject" />
        <nut-form-item :label="$t('person.nickname')">
          <nut-input v-model="baseInfo.nickname" class="nut-input-text" :placeholder="$t('person.input_nickname')"
            type="text" />
        </nut-form-item>
        <nut-divider :style="styleObject" />
        <nut-form-item :label="$t('person.name')" required prop="name"
          :rules="[{ required: true, message: $t('person.empty_name') }]">
          <nut-input v-model="baseInfo.name" class="nut-input-text" :placeholder="$t('person.input_name')" type="text" />
        </nut-form-item>
        <nut-divider :style="styleObject" />
      </nut-form>
      <nut-popup position="bottom" :style="{ height: '40%' }" v-model:visible="showTop">
        <nut-grid :border="false" column-num="6">
          <nut-grid-item v-for="item in avatars" :key="item.id">
            <nut-avatar size="small" @click="onChooseAvatar(item.id)">
              <img :src="item.icon" width="100%" height="100%" />
            </nut-avatar>
          </nut-grid-item>
        </nut-grid>
      </nut-popup>
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
import { showToast } from 'vant';
import getImageUrl from '/@/utils/getImageByPath';
// import 'vant/es/toast/style';

// import { useI18n } from 'vue-i18n';
// const { locale } = useI18n();

const { appContext: { config: { globalProperties } } } = getCurrentInstance();
const userStore = useUserStore();
const userApi = useUserApi();

const styleObject = { color: 'rgb(204 204 204)' };

const concatPath = (id) => {
  return getImageUrl('assets/avatar/' + id + '.png');
};
const avatars = [];
for (let i = 0; i < 24; i++) {
  avatars.push({
    id: i + 1,
    icon: concatPath(i + 1)
  });
}

let showTop = ref(false);
const chooseAvatar = () => {
  showTop.value = true;
};
// let chosenAvatar = ref();
// let chosenAvatar = ref();
// chosenAvatar.value = userStore.getUserInfo.photo;
let baseInfo = reactive({
  userId: userStore.getUserInfo.userId,
  photo: userStore.getUserInfo.photo,
  nickname: userStore.getUserInfo.nickname,
  name: userStore.getUserInfo.name,
});
// chosenAvatar.value = computed(() => {
//   return userStore.getUserInfo.avatar;
// });
const onChooseAvatar = (id) => {
  const found = avatars.find((e) => {
    return e.id == id;
  });
  baseInfo.photo = found.icon;
  // chosenAvatar.value = found.icon;
};
const saving = ref(false);
const ruleForm = ref<any>(null);
const save = () => {
  saving.value = true;
  ruleForm.value.validate().then(async ({ valid, errors }: any) => {
    if (valid) {
      const r = await useUserApi().updateBaseInfo(baseInfo);
      if (r.code == 0) {
        Object.assign(userStore.getUserInfo, baseInfo);
        showToast(globalProperties.$t('common.save_success'));
      }
    } else {
      console.log('error submit!!', errors);
    }
    saving.value = false;
  });
};

// const save = async () => {
//   // userStore.getUserInfo
//   const r = await useUserApi().updateBaseInfo(baseInfo);
//   if (r.code == 0) {
//     Object.assign(userStore.getUserInfo, baseInfo);
//     showToast('保存成功');
//   }
// }
const cancel = () => {
  router.go(-1);
};
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
