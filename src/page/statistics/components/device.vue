<template>
  <van-cell-group>
    <van-cell v-for="item in list" :title="item.title" :value="item.value" value-class="right" :is-link="item.value > 0"
      :to="item.value > 0 ? '/deviceStat' : ''" />
  </van-cell-group>
</template>

<script setup>
import { ref } from 'vue';

const list = ref([
  { title: '地磁', value: 0 },
  { title: '高杆', value: 0 },
  { title: '低杆', value: 0 },
  { title: '手持机', value: 0 },
  { title: '机器人', value: 86 },
  { title: '巡检车', value: 0 },
  { title: '车位锁', value: 0 },
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