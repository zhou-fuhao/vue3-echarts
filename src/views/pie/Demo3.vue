
<template>
  <v-chart class="app-echarts" :option="option" autoresize />
</template>

<script setup>
import { ref } from 'vue';

let allnum = 0;
let arr = [{
  name: '政务信息',
  value: 3500,
  bfb: '35%'
}, {
  name: '政法信息',
  value: 1500,
  bfb: '20%'
}, {
  name: '检察信息',
  value: 1500,
  bfb: '20%'
}, {
  name: '社会信息',
  value: 1000,
  bfb: '15%'
}];

arr.forEach(val => {
  allnum += val.value
})

const option = ref({
  backgroundColor: '#daf3fd',
  animation: true,
  title: {
    text: allnum,
    subtext: '总数',
    x: 'center',
    y: 'center',
    textStyle: {
      color: '#003b79',
      fontSize: 25,
      fontWeight: '600',
      align: 'center',
    },
    subtextStyle: {
      color: '#003b79',
      fontSize: 12,
      fontWeight: 'normal',
      align: 'center'
    }
  },
  legend: {
    left: 'center',
    textStyle: {
      color: '#000',
      fontSize: 14
    },
    itemWidth: 14,
    itemHeight: 14,
    right: '0',
    bottom: '12%',
    textStyle: {
      rich: {
        name: {
          width: 100,
          fontWeight: 600,
          color: '#000'
        },
        bfb: {
          width: 90,
          fontWeight: 600,
          color: '#000'
        },
        num: {
          width: 50,
          fontWeight: 600,
          color: '#000'
        }
      }
    },
    formatter: function (params) {
      const list = arr.filter((val) => val.name == params)[0]
      let legendHtml = '';
      legendHtml = (`{name|${params}}{bfb|${list.bfb}}{num|${list.value}}{bfb|}`)
      return legendHtml
    },
    data: arr
  },
  series: [{
    type: 'pie',
    center: ['50%', '50%'],
    radius: ['35%', '48%'],
    itemStyle: {
      shadowBlur: 10,
      shadowColor: '#aec3cb'
    },
    color: ['#267ef2', '#ffde00', '#00ffff', '#ff924f', '#00FFA8', '#9F17FF', '#FFE400', '#FE2C8A'],
    startAngle: 135,
    labelLine: {
      length: 25
    },
    label: {
      show: false
    },
    data: arr
  }]
});
</script>

<style scoped></style>
