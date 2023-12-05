
<template>
  <v-chart class="app-echarts" :option="option" autoresize />

  <a-modal v-model:visible="visible" title="" @ok="handleOk" ok-text="去试试" cancel-text="取消">
    <v-empty title="数据过多时增加滚动条以及鼠标拖动滚动条功能" />
  </a-modal>
</template>

<script setup>
import { ref } from 'vue';
import { SmileTwoTone } from '@ant-design/icons-vue';
import lodash from 'lodash';
import trendData from '../../data/trendData.json';

const visible = ref(true);
const colorArr = ['#FFC833', '#EB646B', '#27D8FC'];

const series = lodash.map(lodash.get(trendData, 'keyList'), (item, index) => {
  return {
    name: item.value,
    data: lodash.map(lodash.get(trendData, 'detailList'), (oo) => oo[item.key]),
    type: 'bar',
    stack: 'total',
    label: {
      show: false, // 是否显示数值
    },
    emphasis: {
      focus: 'series',
    },
    itemStyle: {
      //自定义颜色
      color: colorArr[index],
    },
    barWidth: '40%',
  };
});
const xData = lodash.map(lodash.get(trendData, 'detailList'), (item) => item.name);

const option = ref({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow', // 'shadow' as default; can also be 'line' or 'shadow'
    },
    // formatter(params) {
    //   自定义格式
    //   let relVal = params[0].name + `<br/>`;
    //   for (let j = 0; j < params.length; j++) {
    //     relVal +=
    //       params[j].marker +
    //       params[j].seriesName +
    //       `&nbsp;&nbsp;&nbsp;&nbsp;<span style='font-weight:bold;float:right'>` +
    //       params[j].value.toFixed(2) +
    //       `</span><br/>`;
    //   }
    //   return relVal;
    // }
  },
  grid: {
    bottom: '8%'
  },
  legend: {
    itemWidth: 10,
    itemHeight: 10,
  },
  xAxis: {
    type: 'category',
    data: xData,
  },
  yAxis: {
    type: 'value',
    name: '单位:次数',
  },
  series,
  dataZoom: [
    {
      type: 'slider',
      height: 10,
      bottom: 6,
      start: xData.length >= 12 ? 100 - (12 / xData.length) * 100 : 0,
      end: 100,
      handleIcon:
        'path://M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
      handleSize: '60%',
      showDetail: false,
      filterMode: 'empty',
    },
  ]
});

const handleOk = () => {
  visible.value = false;
}
</script>

<style scoped></style>
