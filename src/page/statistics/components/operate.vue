<template>
  <van-tabs class="innerTab" sticky v-model="active" :swipe-threshold="5" line-height="0" title-active-color="#1989fa"
    title-inactive-color="#666">
    <van-tab v-for="tab in tabList" :title="tab">
      <van-cell-group>
        <van-cell v-for="item in list" :title="item.title" :value="item.value" value-class="right" is-link
          to="/revenueTrend" />
      </van-cell-group>
    </van-tab>
  </van-tabs>
</template>

<script setup>
import { ref } from 'vue'

const active = ref('昨日')
const tabList = ref(['昨日', '本周', '当月', '上月', '半年', '一年'])
const list = ref([
  { title: '应收总额', value: randomNum(10000, 2) },
  { title: '实收总额', value: randomNum(10000, 2) },
  { title: '收费率', value: randomNum(100, 0) + '%' },
  { title: '临停收入', value: randomNum(10000, 2) },
  { title: '长期收入', value: randomNum(10000, 2) },
  { title: '月卡收入', value: randomNum(100, 0) + '%' },
  { title: '欠费金额', value: randomNum(10000, 2) },
  { title: '补缴金额', value: randomNum(10000, 2) },
])

function randomNum(multiple, digit) {
  return (Math.random() * multiple).toFixed(digit)
}
</script>

<style lang="scss" scoped>
:deep() {
  .van-cell {
    padding: 10px 22px;
  }

  .right,
  .van-cell__right-icon {
    color: #1989fa;
  }

  .van-tabs__nav--line.van-tabs__nav--shrink,
  .van-tabs__nav--line.van-tabs__nav--complete {
    padding-left: 14px;
    padding-right: 14px;
  }
}
</style>