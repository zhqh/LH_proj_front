<template>
  <div class="header">
    <div>
      <img style="width:100%;height:100%" />
    </div>
    <div class="code">点击复制推荐码：{{ recommendedCode }}</div>
  </div>
</template>

<script lang="ts" setup name="HomePage">
import { computed, onBeforeMount } from 'vue';
import { useUserStore } from '/@/store/modules/user';
import { setLang } from '/@/i18n';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

const recommendedCode = ref({});

onBeforeMount(() => {
  setTimeout(() => {
    recommendedCode.value = "YNXXUUXX";
  }, 0);
});
const router = useRouter();

const changeLang = (type) => {
  setLang(type);
};

const save = () => {
  console.log('保存API');
};
</script>
<style lang="scss" scoped>
.header {
  display: block;
  // justify-content: center;
  // height: 100%;
}

.code {
  text-align: center;
  font-size: 30px;
  margin: 15px 0;
}

.notice {
  font-size: 30px;
  padding: 0px 10px;
}

.more-notice {
  margin-left: auto
}

.nut-noticebar__page {
  padding: 0 0;
}

.intro-header {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}

.supportList {
  margin: 0 16px;

  .nut-cell-group__title {
    margin-top: 30px;
  }
}

.btn-wrap {
  margin: 20px;
}

.btn-confirm {
  @include main-lang-bg(302px, 82px, '/@/assets/button', 'confirm.png');
}

.nut-swiper-item {
  line-height: 150px;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
