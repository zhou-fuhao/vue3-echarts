
<template>
  <v-chart class="app-line-demo2" :option="option" autoresize />
</template>

<script setup>
import { ref } from 'vue';

let XData = ['12', '13', '14', '15', '16', '17', '18日'];
let valueData = {
  data1: [64, 159, 112, 86, 151, 131, 118],
  data2: [124, 30, 77, 97, 67, 75, 70]
};

const option = ref({
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    color: ["#F58080", "#47D8BE", "#F9A589"],
    right: '2%',
    top: '2%'
  },
  xAxis: {
    type: 'category',
    data: XData,
    axisLine: {
      lineStyle: {
        color: 'rgba(193, 207, 220, 1)',
      }
    },
    axisLabel: {
      color: "rgba(0, 0, 0, 1)"
    },
  },
  yAxis: [{
    type: 'value',
    axisLabel: {
      color: "rgba(0, 0, 0, 1)"
    },
    axisLine: {
      show: false,
      lineStyle: {
        color: '#cdd5e2'
      }
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: 'rgba(193, 207, 220, 1)',
      }
    },
  }
  ],
  series: [{
    name: '新增',
    type: 'line',
    data: valueData.data1,
    color: "rgba(112, 119, 242, 1)",
    symbol: "circle", //标记的图形为实心圆
    symbolSize: 9, //标记的大小
    lineStyle: {
      width: 2,
      color: {
        type: 'linear',
        colorStops: [{
          offset: 0,
          color: 'rgba(112, 119, 242, 1)' // 0% 处的颜色
        }, {
          offset: 0.4,
          color: 'rgba(112, 119, 242, 1)' // 100% 处的颜色
        }, {
          offset: 1,
          color: 'rgba(112, 119, 242, 1)' // 100% 处的颜色
        }],
        globalCoord: false // 缺省为 false
      },
      shadowColor: 'rgba(112, 119, 242, 0.5)',
      shadowBlur: 10,
      shadowOffsetY: 7
    },
    itemStyle: {
      color: 'rgba(112, 119, 242, 1)',
    },
    emphasis: {
      // 鼠标hover上去的时候，拐点的颜色和样式
      itemStyle: {
        color: 'rgba(129, 135, 244, 1)', //颜色
        borderColor: '#fff', //图形的描边颜色
        borderWidth: 2, // 描边的线宽
        shadowBlur: 4, // 图形的阴影大小
        shadowColor: 'rgba(129, 135, 244, 1)', // 图形的阴影颜色
      },
    },
    smooth: false
  },
  {
    name: '注销',
    type: 'line',
    data: valueData.data2,
    symbol: "circle", //标记的图形为实心圆
    symbolSize: 9, //标记的大小
    lineStyle: {
      width: 2,
      color: {
        type: 'linear',
        colorStops: [{
          offset: 0,
          color: 'rgba(242, 121, 36, 1)' // 0% 处的颜色
        },
        {
          offset: 0.4,
          color: 'rgba(242, 121, 36, 1)' // 100% 处的颜色
        }, {
          offset: 1,
          color: 'rgba(242, 121, 36, 1)' // 100% 处的颜色
        }
        ],
        globalCoord: false // 缺省为 false
      },
      shadowColor: 'rgba(242, 121, 36, 0.5)',
      shadowBlur: 10,
      shadowOffsetY: 7
    },
    itemStyle: {
      color: 'rgba(242, 121, 36, 1)',
    },
    emphasis: {
      // 鼠标hover上去的时候，拐点的颜色和样式
      itemStyle: {
        color: 'rgba(242, 121, 36, 1)', //颜色
        borderColor: '#fff', //图形的描边颜色
        borderWidth: 2, // 描边的线宽
        shadowBlur: 4, // 图形的阴影大小
        shadowColor: 'rgba(242, 121, 36, 1)', // 图形的阴影颜色
      },
    },
    smooth: false
  }
  ]
});

</script>

<style scoped>
.app-line-demo2 {
  height: 100vh;
}
</style>
