<template>
  <Layout>
    <ul>
      <li v-for="item in dataList">
        <div class="name">
          <p>
            <span>{{ item.projectName }}</span>
            <span @click="goto(item.projectName)">详情 ></span>
          </p>
        </div>
        <div class="content">
          <p class="income">
            <span>昨日营收</span>
            <span :class="createClassName(item.growthRate)">{{ formatStr(item.beforeReceivableAmount + '') }}</span>
          </p>
          <p class="arrears">
            <span>同比增长</span>
            <span :class="createClassName(item.growthRate)">{{ item.growthRate }}</span>
          </p>
        </div>
      </li>
    </ul>
    <div class="pagination">
      <van-pagination v-model="currentPage" :page-count="total" mode="simple" @change="getProjectList" />
    </div>
  </Layout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Layout from '@/components/layout.vue';
import { projectList } from '@/api/index';

const router = useRouter();
const dataList = ref([]);
const total = ref(1);
const pageSize = ref(5);
const currentPage = ref(1);

function createClassName(rate) {
  if (rate !== '0' && !rate.includes('-')) {
    return 'plus';
  } else if (rate.includes('-')) {
    return 'minus';
  } else {
    return 'normal';
  }
}

function formatStr(str) {
  return str.replace(/\B(?=(\d{4})+(?!\d))/g, ',');
}

function goto(name) {
  router.push(`./statistics/details?projectName=${name}`);
}

async function getProjectList() {
  let params = { currentPage: currentPage.value, pageSize: pageSize.value };
  const { data } = await projectList(params);
  total.value = Math.ceil(data.Total / pageSize.value);
  dataList.value = data.List;
}

onMounted(() => {
  getProjectList();
});
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
