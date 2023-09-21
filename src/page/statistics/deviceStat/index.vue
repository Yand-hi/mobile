<template>
  <Layout>
    <common-chart :chart-data="lineChartData" chart-type="line" title="地磁最近半年增量统计" />
    <common-chart :chart-data="lineChartData" chart-type="line" title="高杆最近半年增量统计" />
    <common-chart :chart-data="lineChartData" chart-type="line" title="巡检车最近半年增量统计" />
  </Layout>
</template>

<script setup>
import { ref } from 'vue';
import Layout from '@/components/layout.vue';
import commonChart from '../components/commonChart.vue';

const lineChartData = ref([
  { xdata: '9/21', ydata: 15 },
  { xdata: '9/20', ydata: 23 },
  { xdata: '9/19', ydata: 22 },
  { xdata: '9/18', ydata: 21 },
  { xdata: '9/17', ydata: 13 },
  { xdata: '9/16', ydata: 14 },
  { xdata: '9/15', ydata: 14 },
  { xdata: '9/14', ydata: 26 },
]);
</script>

<style lang="scss" scoped></style>