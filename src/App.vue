<template>
  <router-view />
</template>
<script setup lang="ts">
(async () => {
  // console.log(await httpApi.getTickers('FUTURES'));
  // console.log(await httpApi.getAccountConfig());
  // console.log(await httpApi.getAccounts('USDT,BTM'));
  // console.log(await httpApi.getPositions('FUTURES'));
})().catch(e => console.error(e.stack));

</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

:root {
  --nut-menu-bar-line-height: 70px;
  --nut-cell-padding: 10px;
  --nut-menu-bar-box-shadow: none;
  --nut-noticebar-box-padding: 0;
  --nut-radio-label-font-size: 22px;
  --nut-input-font-size: 25px;
  --nut-range-bar-btn-width: 25px;
  --nut-range-bar-btn-height: 25px;
  --nut-radio-label-font-size: 24px;
  --nut-menu-item-font-size: 25px;
  /* --nut-picker-item-height: 50px; */
  /* --nut-form-item-body-slots-text-align: right; */
  /* --nut-form-item-body-input-text-align: right; */
}
</style>
