<template>
  <div>
    <div class="wrapper">
      <span>{{ title }}</span>
      <span class="date">
        <span>{{ formatDate }}</span>
        <van-icon @click="openDatePicker" v-if="editable" name="clock-o" color="#1989fa" />
      </span>
    </div>
    <div class="line"></div>
    <van-popup v-model:show="show" round close-on-click-overlay safe-area-inset-bottom position="bottom"
      style="overflow: hidden; height: 30%;">
      <van-date-picker v-model="currentDate" type="date" :max-date="maxDate" title="选择日期" @cancel="cancelDate"
        @confirm="confirmDate" />
    </van-popup>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue';

const props = defineProps({
  title: String,
  editable: Boolean
});

const getSelectDate = inject('getSelectDate');
const day = new Date().getDate();
const year = new Date().getFullYear();
const month = new Date().getMonth() + 1;
const show = ref(false);
const maxDate = ref(new Date());
const currentDate = ref([year, month, day]);
const format = (dateArr) => {
  const year = dateArr[0];
  const month = String(dateArr[1]).padStart(2, '0');
  const day = String(dateArr[2]).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
const formatDate = ref(format([year, month, day]));

function openDatePicker() {
  show.value = true;
}

function cancelDate() {
  show.value = false;
}

function confirmDate() {
  formatDate.value = format(currentDate.value);
  getSelectDate(formatDate.value, props.title);
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