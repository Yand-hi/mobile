<template>
  <van-cell-group>
    <van-cell v-for="item in list" :title="item.title" :value="item.value" value-class="right"
      :is-link="item.title === '总车场数'" :to="item.title === '总车场数' ? '/parkingStat' : ''" />
  </van-cell-group>
</template>

<script setup>
import { ref } from 'vue'

const list = ref([
  { title: '总车场数', value: 76 },
  { title: '总车位', value: 56731 },
  { title: '封闭式车场', value: 76 },
  { title: '封闭式车位', value: 56731 },
  { title: '路边车场', value: 0 },
  { title: '路边车位', value: 0 },
  { title: '车位周转率', value: 0 },
  { title: '立方车场', value: 0 },
  { title: '立方车位', value: 0 },
])

</script>

<style lang="scss" scoped>
:deep() {
  .van-cell {
    padding: 10px 22px;
  }

  .van-cell--clickable {

    .right,
    .van-cell__right-icon {
      color: #1989fa;
    }
  }

  .van-tabs__nav--line.van-tabs__nav--shrink,
  .van-tabs__nav--line.van-tabs__nav--complete {
    padding-left: 16px;
    padding-right: 16px;
  }
}
</style>