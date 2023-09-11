<template>
  <Layout>
    <ul>
      <li v-for="item in Array.from({ length: 12 }, () => [...dataList]).flat()" :key="item.id">
        <div class="title">
          <p>
            <span>{{ item.title }}</span>
            <span @click="goto(item.id)">详情 ></span>
          </p>
        </div>
        <div class="content">
          <p class="income">
            <span>昨日营收</span>
            <span :class="[Number(item.arrears) ? 'plus' : 'minus']">{{ item.income }}</span>
          </p>
          <p class="arrears">
            <span>同比增长</span>
            <span :class="[Number(item.arrears) ? 'plus' : 'minus']">{{ item.arrears }}</span>
          </p>
        </div>
      </li>
    </ul>
    <div class="pagination">
      <van-pagination v-model="currentPage" :page-count="12" mode="simple" />
    </div>
  </Layout>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Layout from '@/components/layout.vue';

const router = useRouter()
const dataList = ref([
  {
    title: '重庆公租房',
    id: (Math.random() * 10).toFixed(0),
    income: (Math.random() * 100000).toFixed(2),
    increase: (Math.random() * 10).toFixed(1),
    arrears: (Math.random() * 100).toFixed(2)
  }
])
const currentPage = ref(1)

function goto(id) {
  router.push(`./statistics/${id}`)
}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 100px;
  background-color: #1989fa;
  color: #fff;
  text-align: center;
  line-height: 100px;
}

ul {
  /* margin-top: 80px; */
  height: calc(100vh - 128px);
  overflow: auto;
}

li {
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 0 6px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .title,
  .content {
    padding: 20px 30px;
    border-bottom: 1px solid #f2f2f2;
  }

  p {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  p.income {
    margin-bottom: 10px;
  }

  .title>p>span:last-child {
    color: #1989fa;
  }

  .content>p {
    color: #999;
    font-size: 14px;

    span.plus {
      color: #1989fa;
    }

    span.minus {
      color: red;
    }
  }
}

.pagination {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 48px;
  background-color: #f2f2f2;
}

:deep() {

  .van-pagination__item,
  .van-pagination__page-desc {
    height: 48px;
  }

  .van-pagination__item {
    color: #fff;
    background-color: #1989fa;
  }
}
</style>
