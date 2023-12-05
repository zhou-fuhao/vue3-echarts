
<template>
  <v-chart class="app-line-demo1" :option="option" autoresize />
</template>

<script setup>
import { ref } from 'vue';
import * as echarts from 'echarts';

const data = [
  ['product', '2012', '2013', '2014', '2015', '2016', '2017'],
  ['奶茶', 56.5, 82.1, 88.7, 70.1, 53.4, 85.1],
  ['牛奶', 51.1, 51.4, 55.1, 53.3, 73.8, 68.7],
  ['奶酪', 40.1, 62.2, 69.5, 36.4, 45.2, 32.5],
  ['面包', 55.2, 57.1, 61.2, 48.9, 63.9, 59.1]
];
const myColor = [
  new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: 'rgb(128, 255, 165)' },
    { offset: 1, color: 'rgb(1, 191, 236)' }
  ]),
  new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: 'rgb(0, 221, 255)' },
    { offset: 1, color: 'rgb(77, 119, 255)' }
  ]),
  new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: 'rgb(55, 162, 255)' },
    { offset: 1, color: 'rgb(116, 21, 219)' }
  ]),
  new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: 'rgb(255, 0, 135)' },
    { offset: 1, color: 'rgb(135, 0, 157)' }
  ]),
  new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: 'rgb(255, 191, 0)' },
    { offset: 1, color: 'rgb(224, 62, 76)' }
  ])
];
const myColor2 = [
  'linear-gradient(rgb(128, 255, 165), rgb(1, 191, 236))',
  'linear-gradient(rgb(0, 221, 255),rgb(77, 119, 255))',
  'linear-gradient(rgb(55, 162, 255), rgb(116, 21, 219))',
  'linear-gradient(rgb(255, 0, 135),rgb(135, 0, 157))',
  'linear-gradient(rgb(255, 191, 0), rgb(224, 62, 76))'
];

const option = ref({
  dataset: {
    source: data
  },
  color: myColor,
  tooltip: {
    trigger: 'axis',
    formatter: function (param) {
      let str = '';
      str += param[0].axisValue + '</br>';
      for (var k = 0; k < param.length; k++) {
        if (param[k].seriesName.indexOf('series') !== 0) {
          str +=
            '<div style="float:left;width:68%">' +
            '<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-image:' +
            myColor2[k] +
            ';"></span>' +
            param[k].seriesName +
            ':' +
            '</div>' +
            '<div style="float:right;width:32%">' +
            param[k].value[param[k].encode.y[0]] +
            '</div>' +
            '<br>';
        }
      }
      return str;
    }
  },
  legend: {},
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false
  },
  yAxis: {
    type: 'value'
  },
  series: [{
    type: 'line',
    stack: 'Total'
  },
  {
    type: 'line',
    stack: 'Total'
  },
  {
    type: 'line',
    stack: 'Total'
  },
  {
    type: 'line',
    stack: 'Total'
  },
  {
    type: 'line',
    stack: 'Total'
  }
  ]
});

</script>

<style scoped>
.app-line-demo1 {
  height: 100vh;
}
</style>
