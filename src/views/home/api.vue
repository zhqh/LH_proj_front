<template>
  <nut-tabs v-model="state.exchange">
    <nut-tab-pane :title="$t('apiset.binance')" pane-key="binance">
      <div class="unsetapi" v-if="state.binance.apiKey == ''">{{ $t('apiset.api_no_config') }}</div>
      <br />
      <nut-form :ref="ruleForms.binance" :model-value="state.binance">
        <nut-form-item :label="$t('apiset.api_key')" required prop="apiKey"
          :rules="[{ required: true, message: $t('apiset.empty_api_key') }]">
          <nut-input v-model="state.binance.apiKey" class="nut-input-text" :placeholder="$t('apiset.input_api_key')"
            type="text" />
        </nut-form-item>
        <nut-divider :style="styleObject" />
        <nut-form-item :label="$t('apiset.secret_key')" required prop="secretKey"
          :rules="[{ required: true, message: $t('apiset.empty_secret_key') }]">
          <nut-input v-model="state.binance.secretKey" class="nut-input-text" :placeholder="$t('apiset.input_secret_key')"
            type="text" />
        </nut-form-item>
        <nut-divider :style="styleObject" />
        <nut-form-item :label="$t('apiset.simulate')" required prop="simulate">
          <nut-checkbox v-model="state.binance.simulate" text-position="left" />
        </nut-form-item>
      </nut-form>
    </nut-tab-pane>
    <nut-tab-pane :title="$t('apiset.okx')" pane-key="okx">
      <div class="unsetapi" v-if="state.okx.apiKey == ''">{{ $t('apiset.api_no_config') }}</div>
      <br />
      <nut-form :ref="ruleForms.okx" :model-value="state.okx">
        <nut-form-item :label="$t('apiset.api_key')" required prop="apiKey"
          :rules="[{ required: true, message: $t('apiset.empty_api_key') }]">
          <nut-input v-model="state.okx.apiKey" class="nut-input-text" :placeholder="$t('apiset.input_api_key')"
            type="text" />
        </nut-form-item>
        <nut-divider :style="styleObject" />
        <nut-form-item :label="$t('apiset.secret_key')" required prop="secretKey"
          :rules="[{ required: true, message: $t('apiset.empty_secret_key') }]">
          <nut-input v-model="state.okx.secretKey" class="nut-input-text" :placeholder="$t('apiset.input_secret_key')"
            type="text" />
        </nut-form-item>
        <nut-divider :style="styleObject" />
        <nut-form-item :label="$t('apiset.passphrase')" required prop="passphrase"
          :rules="[{ required: true, message: $t('apiset.empty_passphrase') }]">
          <nut-input v-model="state.okx.passphrase" class="nut-input-text" :placeholder="$t('apiset.input_passphrase')"
            type="text" />
        </nut-form-item>
        <nut-divider :style="styleObject" />
        <nut-form-item :label="$t('apiset.simulate')" required prop="simulate">
          <nut-checkbox v-model="state.okx.simulate" text-position="left" />
        </nut-form-item>
      </nut-form>
    </nut-tab-pane>
  </nut-tabs>
  <br />
  <div class="course-type">
    <div class="button-align-center">
      <nut-button block type="info" color="#7232dd" :disabled="saving" @click="save()">{{ $t('common.save')
      }}</nut-button>
      <nut-button block type="info" @click="cancel"> {{ $t('common.cancel') }} </nut-button>
    </div>
  </div>
</template>

<script lang="ts" setup name="HomePage">
import { computed, onBeforeMount } from 'vue';
import { useUserStore } from '/@/store/modules/user';
import { setLang } from '/@/i18n';
import { useI18n } from 'vue-i18n';
import { useApiKeyApi } from '/@/api/trade';
import { showToast } from 'vant';
const apiKeyApi = useApiKeyApi();
const { appContext: { config: { globalProperties } } } = getCurrentInstance();

const { locale } = useI18n();

const state = reactive({
  exchange: 'okx',
  binance: { exchange: 'binance' },
  okx: { exchange: 'okx' },
  huobi: { exchange: 'huobi' },
});

const userStore = useUserStore();

const styleObject = { color: 'rgb(204 204 204)' };

const router = useRouter();

onBeforeMount(async () => {
  const r = await apiKeyApi.listByUserId();
  if (r.code == 0) {
    Object.assign(state, r.data);
    state.binance.simulate = state.binance.simulate == 'Y' ? true : false;
    state.okx.simulate = state.okx.simulate == 'Y' ? true : false;
    state.huobi.simulate = state.huobi.simulate == 'Y' ? true : false;
  }
});

const ruleForms = {
  binance: ref<any>(null),
  okx: ref<any>(null),
  huobi: ref<any>(null),
};
const saving = ref(false);
const save = () => {
  saving.value = true;
  ruleForms[state.exchange].value.validate().then(async ({ valid, errors }: any) => {
    if (valid) {
      const data = state[state.exchange];
      const param = JSON.parse(JSON.stringify(data));
      param.simulate = data.simulate == true ? 'Y' : 'N';
      try {
        let r = {};
        if (param.id) {
          r = await apiKeyApi.update(param);
        } else {
          r = await apiKeyApi.add(param);
        }
        if (r.code == 0) {
          data.id = r.data.id;
          showToast(globalProperties.$t('common.save_success'));
        }
        saving.value = false;
      } catch (e) {
        console.log(e);
      }
    } else {
      saving.value = false;
      console.log('error submit!!', errors);
    }
  });
};
const cancel = () => {
  router.go(-1);
};
</script>
<style lang="scss" scoped>
.course-type {
  padding: 0 60px;
}

.unsetapi {
  margin: 0 10px;
  font-size: 28px;
}

.notice {
  font-size: 30px;
  padding: 0px 10px;
}

.more-notice {
  margin-left: auto;
}

.nut-checkbox {
  display: flex;
  margin-right: 200px;

  .nut-checkbox__label {
    margin-left: 10px;
  }
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

.button-align-center {
  display: flex;
  justify-content: space-between;

  >.nut-button {
    flex: 1;
    margin: 0 20px;
  }
}
</style>
