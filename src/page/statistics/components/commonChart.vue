<template>
  <common-title :title="title" :value="value" :editable="editable" />
  <div>
    <div id="chart" ref="chartRef"></div>
  </div>
  <div class="blank"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import drawChart from '../chart/chart';
import commonTitle from '@/components/commonTitle.vue';

const chartRef = ref()
const { chartData, chartType } = defineProps({
  value: String,
  title: String,
  chartType: String,
  chartData: Array,
  editable: Boolean
})

onMounted(() => {
  drawChart(chartRef.value, chartData, chartType)
})
</script>

<style lang="scss" scoped>
#chart {
  width: 100%;
  height: 240px;
}

.blank {
  height: 8px;
  background-color: #f2f2f2;

  &:last-child {
    display: none;
  }
}
</style>