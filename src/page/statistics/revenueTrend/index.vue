<template>
  <Layout>
    <common-chart :chart-data="chartData" chart-type="line" title="最近七日营收趋势" editable />
    <common-chart :chart-data="chartData" chart-type="pie" title="收入占比" editable />
    <common-chart :chart-data="chartData" chart-type="bar" title="最近七日收费变化趋势" editable />
  </Layout>
</template>

<script setup>
import { reactive } from 'vue';
import Layout from '@/components/layout.vue';
import commonChart from '../components/commonChart.vue';

const chartData = reactive({
  title: '收入占比',
  data: [
    { value: 3431.41, name: '临停' },
    { value: 3431.41, name: '长期' },
    { value: 3431.41, name: '月卡' },
    { value: 3431.41, name: '补缴' },
    { value: 3431.41, name: '其他' },
  ]
})
</script>

<style lang="scss" scoped></style>