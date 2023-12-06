<template>
  <div class="app-custom-demo1">
    <my-select v-model:value="_value" :options="options" />
    当前选择的值是：{{ _value }}
  </div>
</template>

<script setup>
import { ref } from 'vue';

const _value = ref('jack');
const options = ref([
  {
    value: 'jack',
    label: 'Jack',
  },
  {
    value: 'lucy',
    label: 'Lucy',
  },
  {
    value: 'disabled',
    label: 'Disabled',
    // disabled: true, // 单独禁用某一个
  },
  {
    value: 'yiminghe',
    label: 'Yiminghe',
  },
]);

</script>

<style lang="less" scoped>
.app-custom-demo1 {
  height: 100vh;
}
</style>