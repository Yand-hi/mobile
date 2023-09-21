<template>
  <Layout>
    <common-chart :chart-data="lineChartData" chart-type="line" title="最近七日营收趋势" editable />
    <common-chart :chart-data="pieChartData" chart-type="pie" title="收入占比" editable />
    <common-chart :chart-data="[]" chart-type="bar" title="最近七日收费变化趋势" editable />
  </Layout>
</template>

<script setup>
import { ref, reactive } from 'vue';
import Layout from '@/components/layout.vue';
import commonChart from '../components/commonChart.vue';

const pieChartData = reactive({
  title: '收入占比',
  data: [
    { value: 3431.41, name: '临停' },
    { value: 3431.41, name: '长期' },
    { value: 3431.41, name: '月卡' },
    { value: 3431.41, name: '补缴' },
    { value: 3431.41, name: '其他' },
  ]
});
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