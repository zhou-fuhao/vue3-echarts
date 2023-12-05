
<template>
  <v-chart class="app-echarts" :option="option" autoresize />
</template>

<script setup>
import { ref } from 'vue';
import lodash from 'lodash';
import statusData from '../../data/statusData.json';

const solve = lodash.get(statusData, 'solve');
const evaluation = lodash.get(statusData, 'evaluation');

const legendData = lodash.concat(
  lodash.map(solve, (item) => item.name),
  lodash.map(evaluation, (item) => item.name),
);

const option = ref(
  {
    tooltip: {
      trigger: 'item',
      // formatter: '{a} <br/>{b}: {d}%',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
    },
    legend: {
      data: legendData,
      itemHeight: 10,
      itemWidth: 10,
      bottom: 0,
    },
    series: [
      {
        name: '评价状态',
        type: 'pie',
        radius: [0, '30%'],
        label: {
          position: 'inner',
          color: '#000',
          formatter: '{b}: {d}%',
        },
        labelLine: {
          show: false,
        },
        data: evaluation,
      },
      {
        name: '解决状态',
        type: 'pie',
        radius: ['45%', '60%'],
        label: {
          formatter: '{b}: {d}%',
        },
        data: solve,
      },
    ],
  }
);
</script>

<style scoped></style>
