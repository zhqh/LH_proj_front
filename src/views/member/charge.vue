<template>
  <div>
    <div class="course-type">
      <h1>建设中 </h1>
    </div>
  </div>
</template>

<script setup name="DemoPage">
import { i18n } from '/@/i18n';
// import { useI18n } from 'vue-i18n';
// const { locale } = useI18n();

let data = ref();
onMounted(() => {
  setTimeout(() => {
    data.value = [
      {
        id: 1,
        title: '湖塘煙雨 阳澄湖大闸蟹公4.5两 母3.5两 4对8只 鲜活',
        publishDate: '2024-04-23',
        content: '湖塘煙雨 阳澄湖大闸蟹公4.5两 母3.5两 4对8只 鲜活湖塘煙雨 阳澄湖大闸蟹公4.5两 母3.5两 4对8只 鲜活',
      },
      {
        id: 2,
        title: '湖塘煙雨 阳澄湖大闸蟹公4.5两 母3.5两 4对8只 鲜活',
        publishDate: '2024-04-23',
        content: '湖塘煙雨 阳澄湖大闸蟹公4.5两 母3.5两 4对8只 鲜活湖塘煙雨 阳澄湖大闸蟹公4.5两 母3.5两 4对8只 鲜活',
      },
      {
        id: 3,
        title: '湖塘煙雨 阳澄湖大闸蟹公4.5两 母3.5两 4对8只 鲜活',
        publishDate: '2024-04-23',
        content: '湖塘煙雨 阳澄湖大闸蟹公4.5两 母3.5两 4对8只 鲜活湖塘煙雨 阳澄湖大闸蟹公4.5两 母3.5两 4对8只 鲜活',
      },
    ];
  }, 0);
});

const logout = () => {
  console.log('logout');
};
</script>

<style lang="scss" scoped>
@import '../../styles/mixin.scss';

.course-type {
  text-align: center;
  margin: 100px 0;
  padding: 0 60px;

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
</style>
