<template>
  <div class="layout-wrapper">
    <common-nav class="navbar" :title="route.meta.name" />
    <div class="content" :class="classPrefix && `${classPrefix}-content`">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import commonNav from './commonNav.vue';

defineProps({
  classPrefix: String
})

const route = useRoute()
</script>

<style lang="scss" scoped>
.layout-wrapper {
  position: relative;
  width: 100vw;
  /* height: 100vh; */
}

.navbar {
  position: fixed;
  top: 0;
  width: 100%;
}

.content {
  margin-top: 80px;
  overflow: hidden;
}
</style>