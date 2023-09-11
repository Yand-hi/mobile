<template>
  <Layout>
    <div class="details">
      <h3>重庆公租房</h3>
      <div class="content">
        <p>
          <span>累计应收：<span>{{ formatStr(data.receive + '') }}</span></span>
          <span>累计欠费：{{ data.arrears }}</span>
        </p>
        <p>
          <span>累计实收：<span>{{ formatStr(data.receipts + '') }}</span></span>
          <span>欠费率：<span class="rate">{{ data.rate }}%</span></span>
        </p>
      </div>
    </div>
    <div class="split"></div>
    <van-tabs sticky v-model="active" swipeable title-active-color="#1989fa" title-inactive-color="#666">
      <van-tab v-for="tab in tabList" :title="tab.title">
        <div class="blank"></div>
        <component :is='tab.name' />
      </van-tab>
    </van-tabs>
  </Layout>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref, reactive, markRaw } from 'vue'
import Layout from '@/components/layout.vue';
import device from './components/device.vue'
import operate from './components/operate.vue'
import parking from './components/parking.vue'

const route = useRoute()
const active = ref('运营数据')
const tabList = markRaw([
  { title: '运营数据', name: operate },
  { title: '设备数据', name: device },
  { title: '车场数据', name: parking }
])
const data = reactive({
  receive: 67323213.121,
  arrears: 0,
  receipts: 67323213.121,
  rate: 100,
})

function formatStr(str) {
  return str.replace(/\B(?=(\d{4})+(?!\d))/g, ',')
}
</script>

<style lang="scss" scoped>
.details {
  padding: 20px 30px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h3 {
    font-size: 18px;
    margin-bottom: 10px;
  }
}

.content {
  p {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;

    span {
      color: #666;
      font-size: 14px;
    }

    span:first-child>span {
      color: red;
    }

    span.rate {
      color: #1989fa;
    }
  }
}

.split {
  width: 90%;
  border-top: 1px solid #f2f2f2;
  margin: 0 auto;
}

.blank {
  height: 10px;
  background-color: #f2f2f2;
}

:deep() {
  .van-tab:nth-child(2):not(.innerTab .van-tab) {
    flex: 1.4
  }
}
</style>