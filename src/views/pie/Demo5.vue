
<template>
  <v-chart class="app-echarts" :option="option" autoresize />
</template>

<script setup>
import { ref } from 'vue';
import * as echarts from 'echarts';

const durColor = ['#c23531', '#FF9900', '#FFFF00', '#6633FF', '#FF99FF', '#33FFFF', '#33FF00', '#37b1ec', '#9e50ad', '#5f64ee', '#2655ba'];
const durTimeData = ['服装', '其他', '家居', '玩具', '运动', '百货', '绿植'];
const data = [30, 27, 21, 20, 18, 12, 10];

let getDurData = function (data) {
  let result = [];
  for (let i in data) {
    let opt = {
      name: durTimeData[i],
      type: 'pie',
      z: i + 1,
      // clockWise: false,
      center: ['45%', '47%'],
      label: {
        show: false,
        formatter: '{c}/{d}%',
        fontSize: 14
      },
      emphasis: {
        label: {
          show: false
        },
        labelLine: {
          show: false
        },
        scale: false
      },
      labelLine: {
        show: false,
        length: 10,
        length2: 15
      },
      data: [{
        value: data[i],
        itemStyle: {
          color: durColor[i],
        }
      },
      {
        value: 50,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [{
            offset: 0,
            color: '#CCCCCC' // 0% 处的颜色
          }, {
            offset: 1,
            color: '#333333' // 100% 处的颜色
          },], false),
        },
        label: {
          show: false,
        },
        labelLine: {
          show: false
        },
        emphasis: {
          label: {
            show: false
          },
          labelLine: {
            show: false
          },
        },
        tooltip: {
          show: false,
          formatter: function () {
            return '';
          }
        }
      }
      ]
    };

    let max = data.length * 10 - i * 8;
    opt.radius = [(max - 15) + '%', (max - 11) + '%'];
    result.push(opt);

  }
  return result;
};

const option = ref({
  backgroundColor: '#001334',
  // 	title: {
  // 		text: '环形图'
  // 	},
  color: durColor,
  tooltip: {
    show: true,
    formatter: '{a} <br/> {c} ({d}%)'
  },

  legend: {
    orient: 'vertical',
    top: 'center',
    right: '10%',
    itemWidth: 10,
    itemHeight: 10,
    itemGap: 10,
    textStyle: {
      color: '#fff',
      fontSize: 12
    },
    selectedMode: false,
    data: durTimeData
  },
  series: getDurData(data)
});
</script>

<style scoped></style>
