<template>
  <Layout>
    <ul>
      <li v-for="item in dataList">
        <div class="name">
          <p>
            <span>{{ item.name }}</span>
            <span @click="goto(item.id, item.name)">详情 ></span>
          </p>
        </div>
        <div class="content">
          <p class="income">
            <span>昨日营收</span>
            <span :class="createClassName(Number(item.arrears))">{{ formatStr(item.income + '') }}</span>
          </p>
          <p class="arrears">
            <span>同比增长</span>
            <span :class="createClassName(Number(item.arrears))">{{ item.arrears !== 0 ? item.arrears + '%' : item.arrears }}</span>
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
    id: (Math.random() * 100).toFixed(0),
    name: '重庆公租房',
    income: 232131.06,
    arrears: 3.3
  }, {
    id: (Math.random() * 100).toFixed(0),
    name: '眉山城市停车',
    income: 63213.07,
    arrears: -2.1
  }, {
    id: (Math.random() * 100).toFixed(0),
    name: '阆中城市停车',
    income: 23213.11,
    arrears: 1.1
  }, {
    id: (Math.random() * 100).toFixed(0),
    name: '犍为城市停车',
    income: 23213.11,
    arrears: 1.1
  }, {
    id: (Math.random() * 100).toFixed(0),
    name: '峨眉山城市停车',
    income: 0,
    arrears: 0
  }
])
const currentPage = ref(1)

function createClassName(num) {
  if (num > 0) {
    return 'plus';
  } else if (num < 0) {
    return 'minus';
  } else {
    return 'normal';
  }
}

function formatStr(str) {
  return str.replace(/\B(?=(\d{4})+(?!\d))/g, ',')
}

function goto(id, name) {
  router.push(`./statistics/${id}?name=${name}`)
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
  height: calc(100vh - 128px);
  background-color: #f2f2f2;
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

  .name,
  .content {
    padding: 16px 30px 20px;
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

  .name>p>span:last-child {
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
