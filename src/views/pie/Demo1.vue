
<template>
  <v-chart class="app-echarts" :option="option" autoresize />
</template>

<script setup>
import { ref } from 'vue';
import sexData from '../../data/sexData.json';
import lodash from 'lodash';

const xData = lodash.get(sexData, 'sex');

const option = ref({
  tooltip: {
    trigger: 'item'
  },
  color: ['#3FD1FB', '#FF3193', '#4982FD'],
  // 标题居中 - 1
  title: {
    text: `年龄分布`,
    left: '45%',//对齐方式居中
    top: 'center',//距离顶部
  },
  legend: {
    type: 'plain',
    icon: 'square',
    bottom: 0,
    itemGap: 4,
    itemWidth: 10, // 设置宽度
    itemHeight: 10, // 设置高度
    symbolKeepAspect: false,
    formatter: function (name) {
      let total = 0, tarValue;
      for (let i = 0; i < xData.length; i++) {
        total += xData[i].value;
        if (name === xData[i].name) {
          tarValue = xData[i].value;
        }
      }
      let p = Math.round((tarValue / total) * 100);
      p = lodash.isNaN(p) ? 0 : p;
      return `${name}:${tarValue}人 占比:${p}%`;
    },
  },
  series: [
    {
      name: `性别分布`,
      type: 'pie',
      radius: ['40%', '70%'],
      // center: ['25%', '50%'],
      label: {
        show: false,
      },
      data: xData
    }
  ]
});
</script>

<style scoped></style>
