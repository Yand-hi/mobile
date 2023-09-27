<template>
  <van-tabs class="innerTab" swipeable sticky v-model:active="active" :swipe-threshold="5" line-height="0"
    title-active-color="#1989fa" title-inactive-color="#666">
    <van-tab v-for="tab in tabList" :title="tab" :name="tab">
      <van-cell-group>
        <van-cell v-for="item in dataList" :title="item.title" :value="item.value" value-class="right" is-link
          :to="`/revenueTrend?projectName=${projectName}`" />
      </van-cell-group>
    </van-tab>
  </van-tabs>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { revenueData } from '@/api/index';

const route = useRoute();
const projectName = ref(route.query.projectName);
const active = ref('昨日');
const tabList = ref(['昨日', '本周', '当月', '上月', '半年', '一年']);
const dataList = ref([]);
const revenueItemMap = {
  '应收总额': 'operateAmount',
  '实收总额': 'receivableAmount',
  '收费率': 'chargeRate',
  '临停收入': 'tempAmount',
  '长期收入': 'longAmount',
  '月卡收入': 'monthlyCard',
  '欠费金额': 'arrearAmount',
  '补缴金额': 'replenishAmount',
};

async function getRevenueData() {
  const { data } = await revenueData({ dateType: active.value, projectName: projectName.value });
  data.list && (data.list.chargeRate = ((data.list.receivableAmount / data.list.operateAmount) * 100).toFixed(2) + '%');
  dataList.value = Object.keys(revenueItemMap).map(key => ({ title: key, value: data.list[revenueItemMap[key]] })) || [];
}

watchEffect(() => {
  getRevenueData();
});
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