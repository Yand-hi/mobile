<template>
  <Layout>
    <common-chart v-for="item in dataList" :key="item.title" :chart-data="item.chartData" chart-type="line"
      :title="`${item.title}最近半年增量统计`" />
  </Layout>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import Layout from '@/components/layout.vue';
import commonChart from '../components/commonChart.vue';
import { deviceIncreaseData } from '@/api/index';

const route = useRoute();
const projectName = ref(route.query.projectName);
const dataList = ref([]);

async function getDeviceIncreaseData() {
  const { data } = await deviceIncreaseData({ projectName: projectName.value });
  let temp = [];
  for (let i = 0; i < data.list.length;) temp.push(data.list.slice(i, i += 6).sort((a, b) => a.month - b.month));
  dataList.value = temp.map(item => ({
    title: item[0].deviceName,
    chartData: [{ name: item[0].deviceName + '最近半年增量', data: item.map(i => ({ xdata: i.month, ydata: i.addDeviceNum })) }]
  }));
}

onMounted(() => {
  getDeviceIncreaseData();
});
</script>

<style lang="scss" scoped></style>