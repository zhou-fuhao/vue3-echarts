<template>
  <a-select v-model:value="_value" :class="className" :allowClear="allowClear" :disabled="disabled" :options="options"
    @change="$emit('update:value', $event)" />
    <!-- @change="handleChange" /> -->
    <!-- 第一种写法 -->
    <!-- @change="$emit('update:value', $event)" /> -->
    <!-- 第二种写法 -->
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  value: {
    type: String,
    require: true,
    default: ''
  },
  options: {
    type: Array,
    require: true,
    default: [], // 数据源
  },
  disabled: {
    type: Boolean,
    require: false,
    default: false, // 是否禁用
  },
  className: {
    type: String,
    require: false,
    default: 'pub-w120', // 下拉框样式
  },
  allowClear: {
    type: Boolean,
    require: false,
    default: false, // 支持清除
  },
});

// const emit = defineEmits(['update:value']);

const _value = ref(props.value);
const options = ref(props.options);
const disabled = ref(props.disabled);
const className = ref(props.className);
const allowClear = ref(props.allowClear);

// 第一种子组件-->父组件传值写法
// const handleChange = (value) => {
//   emit('update:value', value);
// }

</script>

<style lang="less" scoped></style>