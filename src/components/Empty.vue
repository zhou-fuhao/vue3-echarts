
<template>
  <a-result :class="appEmptyResult" :title="title" :subTitle="subTitle">
    <template #icon>
      <smile-twoTone />
    </template>
  </a-result>
</template>

<script setup>
import { ref } from 'vue';
import { SmileTwoTone } from '@ant-design/icons-vue';

const appEmptyResult = ref('app-empty-result'); // 是否引用app-empty-result样式
const title = ref('图表持续更新中...');
const subTitle = ref('如果您有更好的想法或建议，请发送至邮箱zhoufuhao@hotmail.com，祝您开心快乐每一天~😊');

const props = defineProps(['title', 'subTitle']);

if (props.title) {
  title.value = props.title;
  appEmptyResult.value = '';
}

if (props.subTitle) {
  subTitle.value = props.subTitle;
  appEmptyResult.value = '';
}

</script>

<style scoped>
.app-empty-result {
  height: 100vh;
  padding-top: 15%;
}
</style>
