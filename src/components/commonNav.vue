<template>
  <van-nav-bar :title="title" left-text="返回" left-arrow @click-left="onClickLeft" />
</template>

<script setup>
import { useRouter } from 'vue-router'

defineProps({
  title: String,
  leftText: String
})

const router = useRouter()
function onClickLeft() {
  router.go(-1)
}
</script>

<style scoped lang="scss">
:deep() {
  .van-nav-bar__content {
    height: 80px;
    background-color: #1989fa;

    .van-icon,
    .van-nav-bar__text {
      color: #fff;
      font-size: 16px;
    }

    .van-nav-bar__title {
      color: #fff;
      font-size: 18px;
      font-weight: normal;
    }
  }
}
</style>