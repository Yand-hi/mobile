<template>
  <common-title :title="title" :value="value" :editable="editable" />
  <div id="chart" ref="chartRef"></div>
  <div class="blank"></div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import drawChart from '../chart/chart';
import commonTitle from '@/components/commonTitle.vue';

const chartRef = ref();
const props = defineProps(['value', 'title', 'chartType', 'chartData', 'editable']);

watchEffect(() => {
  drawChart(chartRef.value, props.chartData, props.chartType);
});
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