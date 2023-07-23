<template>
  <div class="header">
    <div class="code" @click="copy">{{ $t('shareInvite.share') }}：<b id="inviteCode" style="text-decoration: underline;"
        ref="inviteCode">{{
          userStore.getUserInfo.inviteCode
        }}</b></div>
    <div class="logo">
      <img src="../../assets/logo2.png" style="width:50%;height:50%" />
    </div>
  </div>
</template>

<script lang="ts" setup name="HomePage">
import Clipboard from 'clipboard'
import { computed, onBeforeMount } from 'vue';
import { useUserStore } from '/@/store/modules/user';
import { setLang } from '/@/i18n';
import { useI18n } from 'vue-i18n';

let userStore = useUserStore();
const inviteCode = ref();
const copy = () => {
  let shareUrl = `http://${location.host}/#/register?rc=${userStore.getUserInfo.inviteCode}`;
  var clipboard3 = new Clipboard(document.getElementById("inviteCode"), {
    text: function () {
      return shareUrl;
    }
  });
  clipboard3.on('success', function (e) {//复制成功执行的回调，可选
    // console.log(e);
  });
  clipboard3.on('error', function (e) {//复制失败执行的回调，可选
    // console.log(e);
  });
};

</script>
<style lang="scss" scoped>
.header {
  display: block;
  height: 100%;
  background-color: #f5f5f5;
  // background-image: url("../../assets/share.jpeg");
}

.code {
  width: 100%;
  position: absolute;
  top: 700px;
  text-align: center;
  font-size: 30px;
  margin: 15px 0;
}

.logo {
  position: absolute;
  top: 300px;
  text-align: center;
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
