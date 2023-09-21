<template>
  <van-cell-group>
    <van-cell v-for="item in dataList" :title="item.title" :value="item.value" value-class="right"
      :is-link="item.title === '总车场数'" :to="item.title === '总车场数' ? `/parkingStat?projectName=${projectName}` : ''" />
  </van-cell-group>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { parkingLotData } from '@/api/index';

const route = useRoute();
const projectName = ref(route.query.projectName);
const dataList = ref([]);
const parkingLotMap = {
  '总车场数': 'carPark',
  '总车位': 'parkSpace',
  '封闭式车场': 'outwayCarPark',
  '封闭式车位': 'outwaySpace',
  '路边车场': 'inwayCarPark',
  '路边车位': 'inwaySpace',
  '车位周转率': 'parkingRate',
  '立方车场': 'reformerPark',
  '立方车位': 'reformerSpaceNum',
};

async function getParkingLotData() {
  const { data } = await parkingLotData({ projectName: projectName.value });
  dataList.value = Object.keys(parkingLotMap).map(key => ({ title: key, value: data.list[parkingLotMap[key]] })) || [];
}

onMounted(() => {
  getParkingLotData();
});
</script>

<style lang="scss" scoped>
:deep() {
  .van-cell {
    padding: 10px 22px;
  }

  .van-cell--clickable {

    .right,
    .van-cell__right-icon {
      color: #1989fa;
    }
  }

  .van-tabs__nav--line.van-tabs__nav--shrink,
  .van-tabs__nav--line.van-tabs__nav--complete {
    padding-left: 16px;
    padding-right: 16px;
  }
}
</style>