<template>
  <Layout>
    <common-chart title="车场分布情况" :chart-data="chartData" chart-type="pie" />
    <common-chart title="最近半年增量统计" :chart-data="chartData" chart-type="line" />
  </Layout>
</template>

<script setup>
import { reactive } from 'vue';
import Layout from '@/components/layout.vue';
import commonChart from '../components/commonChart.vue';

const chartData = reactive({
  title: '车场分布情况',
  data: [
    { value: 1048, name: '路边车场' },
    { value: 735, name: '立方车场' },
    { value: 580, name: '第三方车场' },
    { value: 484, name: '其他车场' },
  ]
})
</script>

<style lang="scss" scoped></style>