
<template>
  <v-chart class="app-echarts" :option="option" autoresize />
</template>

<script setup>
import { ref } from 'vue';

let data = [
  { name: 'A', value: 54 },
  { name: 'B', value: 44 },
  { name: 'C', value: 35 },
  { name: 'D', value: 30 },
  { name: 'E', value: 20 },
  { name: 'F', value: 40 },
  { name: 'B2', value: 44 },
  { name: 'C2', value: 35 },
  { name: 'D2', value: 30 },
  { name: 'E2', value: 20 },
  { name: 'F2', value: 40 },
  { name: 'B3', value: 44 },
  { name: 'C3', value: 35 },
  { name: 'D3', value: 30 },
  { name: 'E3', value: 20 },
  { name: 'F3', value: 40 }
];
let titleArr = [], seriesArr = [];
let colors = ['#648ADD', '#64DD9C', '#7364DD', '#57FFBC', '#DDC164', '#FF4646', '#64DD9C', '#7364DD', '#57FFBC', '#DDC164', '#FF4646', '#7364DD', '#57FFBC', '#DDC164', '#FF4646', '#7364DD', '#57FFBC', '#DDC164', '#FF4646'];
let mhNum = 6; // 每行数量
let hsTop = 0; // 当前行数(设置top距离)
let hsLeft = 0; // 重置行数(设置left距离)
let chuliFun = (index) => {
  hsLeft++
  if (index % mhNum === 0) {
    hsLeft = 0
    if (index < mhNum) {
      // 判断是第一层top为0
      hsTop = 0
    } else {
      hsTop++
    }
  }
  let sff = [hsLeft * (100 / mhNum), hsTop * (100 / (data.length / mhNum))]
  return sff
};

data.forEach(function (item, index) {
  let centerList = chuliFun(index)
  titleArr.push(
    {
      show: false,
      text: item.name,
      left: centerList[0] - 0.8 + '%',
      top: centerList[1] + '%',
      textAlign: 'center',
      fontWeight: 'normal',
      fontSize: '16',
      color: '#fff',
      textAlign: 'center',
    }
  );
  seriesArr.push(
    {
      name: item.name,
      type: 'pie',
      // clockWise: false,//方向
      roundCap: true,
      radius: [data.length - 3 + '%', data.length + '%'],
      itemStyle: {
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 1, y2: 1,
          colorStops: [
            { offset: 0, color: colors[index], },
            { offset: 1, color: colors[index], },
          ],
          global: false, // 缺省为 false
        },
        shadowColor: colors[index],
        shadowBlur: 0,
      },
      label: { show: false },
      labelLine: { show: false },
      emphasis: { scale: false },
      center: [centerList[0] + 10 + '%', centerList[1] + 10 + '%'],
      data: [{
        value: item.value,
        name: item.name,
        itemStyle: {
          borderRadius: 10,
          borderColor: colors[index],
        },
        label: {
          formatter: function (params) {
            return `{a| ${params.value}}{b|${params.name}}`;
          },
          rich: {
            a: {
              color: '#fff',
              fontSize: 16,
            },
            b: {
              color: '#b3c7c9',
              fontSize: 12,
              fontWeight: 'bold',
            },
          },
          position: 'center',
          show: true,
          fontSize: '16',
          color: '#ffff',
        },
      }, {
        value: 100 - item.value,
        name: 'invisible',
        tooltip: {
          show: false
        },
        itemStyle: {
          color: colors[index],
          opacity: 0.3
        },
        emphasis: {
          itemStyle: {
            color: colors[index],
            opacity: 0.3
          }
        }
      }]
    }
  )
});

const option = ref({
  backgroundColor: '#001334',
  tooltip: {
    trigger: 'item',
    extraCssText: 'box-shadow: 0 0 3px rgba(100, 100, 100, 0.8)'
  },
  title: titleArr,
  series: seriesArr
});
</script>

<style scoped></style>
