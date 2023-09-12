<template>
  <div>
    <div class="wrapper">
      <span>{{ title }}</span>
      <span class="date">
        <span>{{ formatDate() }}</span>
        <van-icon @click="openDatePicker" v-if="editable" name="clock-o" color="#1989fa" />
      </span>
    </div>
    <div class="line"></div>
    <van-popup v-model:show="show" :overlay="false" position="bottom" :style="{ height: '30%' }">
      <van-date-picker v-model="currentDate" type="date" :max-date="maxDate" title="选择日期" @cancel="cancelDate"
        @confirm="confirmDate" />
    </van-popup>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  title: String,
  editable: Boolean
})

const show = ref(false)
// const minDate = ref(new Date(2023, 8, 6))
const maxDate = ref(new Date(2023, 8, 12))
const currentDate = ref(['2023', '09', '12'])

function formatDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function openDatePicker() {
  show.value = true;
}

function cancelDate() {
  show.value = false;
}

function confirmDate(data) {
  console.log(data);
  cancelDate();
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 18px 14px 12px;
  padding: 5px 4px 5px 8px;
  border-left: 2px solid #1989fa;
}

.line {
  margin: 0 auto;
  width: 93%;
  border-bottom: 2px solid #f2f2ff;
}

.date {
  display: flex;
  align-items: center;
  gap: 4px;

  >span {
    font-size: 14px;
    color: #999;
  }
}

:deep() {
  .van-icon-clock-o {
    font-size: 16px;
  }
}
</style>