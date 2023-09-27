<template>
  <van-cell-group>
    <van-cell v-for="item in dataList" :title="item.deviceName" :value="item.deviceNum" value-class="right"
      :is-link="item.deviceNum > 0" :to="item.deviceNum > 0 ? `/deviceStat?projectName=${projectName}` : ''" />
  </van-cell-group>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { deviceData } from '@/api/index';

const route = useRoute();
const projectName = ref(route.query.projectName);
const dataList = ref([]);

async function getDeviceData() {
  const { data } = await deviceData({ projectName: projectName.value });
  dataList.value = data.list || [];
}

onMounted(() => {
  getDeviceData();
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