<template>
  <Layout>
    <common-chart title="车场分布情况" :chart-data="pieChartData" chart-type="pie" />
    <common-chart title="最近半年增量统计" :chart-data="lineChartData" chart-type="line" />
  </Layout>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { parkingLotRatio, incrementStat } from '@/api/index';
import Layout from '@/components/layout.vue';
import commonChart from '../components/commonChart.vue';

const route = useRoute();
const projectName = ref(route.query.projectName);
const incrementStatData = ref([]);
const lineChartData = computed(() => [{
  name: '增量',
  data: incrementStatData.value
}]);
const pieChartData = reactive({
  title: '车场分布情况',
  data: [
    { value: 1048, name: '路边车场' },
    { value: 735, name: '立方车场' },
    { value: 580, name: '第三方车场' },
    { value: 484, name: '其他车场' },
  ]
});

const parkingLotStatMap = {
  '路边车场': 'inwayPark',
  '立方车场': 'reformerPark',
  '第三方车场': 'thirdPark',
  '其他车场': 'otherPark',
};

async function getParkingLotRatio() {
  const { data } = await parkingLotRatio({ projectName: projectName.value });
  pieChartData.data = Object.keys(parkingLotStatMap).map(key => ({ value: data.list[parkingLotStatMap[key]], name: key })) || [];
}

async function getIncrementStat() {
  const { data } = await incrementStat({ projectName: projectName.value });
  incrementStatData.value = data.list.sort((a, b) => a.month - b.month).map(item => ({ xdata: item.month, ydata: item.addParkSum })) || [];
}

onMounted(async () => {
  await getParkingLotRatio();
  await getIncrementStat();
});
</script>

<style lang="scss" scoped></style>