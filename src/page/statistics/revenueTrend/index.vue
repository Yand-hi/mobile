<template>
  <Layout>
    <common-chart :chart-data="lineChartData" chart-type="line" title="最近七日营收趋势" editable />
    <common-chart :chart-data="pieChartData" chart-type="pie" title="收入占比" editable />
    <common-chart :chart-data="barChartData" chart-type="bar" title="最近七日收费率变化趋势" editable />
  </Layout>
</template>

<script setup>
import { useRoute } from 'vue-router';
import Layout from '@/components/layout.vue';
import { ref, onMounted, computed, provide } from 'vue';
import commonChart from '../components/commonChart.vue';
import { incomeRankData, recentRevenueTrendData } from '@/api/index';

const route = useRoute();
const projectName = ref(route.query.projectName);
const incomeOriginMap = {
  '临停': 'tempAmount',
  '长期': 'longAmount',
  '月卡': 'monthlyCard',
  '补缴': 'replenishAmount',
  '其他': 'otherWay',
};
const pieChartData = computed(() => ({
  title: '收入占比',
  data: incomeRateData.value
}));
const incomeRateData = ref([]);
const receivableAmountData = ref([]);
const arrearAmountData = ref([]);
const barChartData = ref([]);
const lineChartData = computed(() => [
  {
    name: '营收',
    data: receivableAmountData.value
  }, {
    name: '欠费',
    data: arrearAmountData.value
  }
]);

const formatDate = (number) => {
  return new Date(number).getMonth() + 1 + '/' + new Date(number).getDate();
};

async function getRecentRevenueTrendData(startDate) {
  const { data } = await recentRevenueTrendData({ projectName: projectName.value, startDate: startDate });
  receivableAmountData.value = data.list.map(item => ({ xdata: formatDate(item.dateTime), ydata: item.receivableAmount })) || [];
  arrearAmountData.value = data.list.map(item => ({ xdata: formatDate(item.dateTime), ydata: item.arrearAmount })) || [];
}

async function getRecentIncomeRateData(startDate) {
  const { data } = await recentRevenueTrendData({ projectName: projectName.value, startDate: startDate });
  barChartData.value = data.list.map(item => ({ xdata: formatDate(item.dateTime), ydata: ((item.receivableAmount / item.operateAmount) * 100).toFixed(2) })) || [];
}

async function getIncomeRankData(startDate) {
  const { data } = await incomeRankData({ projectName: projectName.value, startDate: startDate });
  incomeRateData.value = Object.keys(incomeOriginMap).map(key => ({ value: data.list[incomeOriginMap[key]], name: key })) || [];
}

function getSelectDate(date, title) {
  startDate.value = date;
  if (title === '最近七日营收趋势') {
    getRecentRevenueTrendData(date);
  } else if (title === '收入占比') {
    getIncomeRankData(date);
  } else if (title === '最近七日收费率变化趋势') {
    getRecentIncomeRateData(date);
  } else {
    return;
  }
}

provide('getSelectDate', getSelectDate);

function startDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

onMounted(async () => {
  const dateStr = startDate();
  await getRecentRevenueTrendData(dateStr);
  await getIncomeRankData(dateStr);
  await getRecentIncomeRateData(dateStr);
});
</script>

<style lang="scss" scoped></style>