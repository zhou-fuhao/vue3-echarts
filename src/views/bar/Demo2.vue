
<template>
  <div class="app-bar-demo2">
    <a-space class="space">
      <span class="tips">根据查询条件高亮显示柱状图</span>
      大区
      <a-select class="pub-w120" v-model:value="region" @change="handleChange" :options="regionData" />
      战区
      <a-select class="pub-w120" v-model:value="fightingregion" :options="fightingregionData" />
      <a-button type="primary" @click="onSearch">查询</a-button>
    </a-space>
    <v-chart class="app-echarts" :option="chartOption" autoresize />

    <a-modal v-model:visible="visible" title="" @ok="handleOk" ok-text="去试试" cancel-text="取消">
      <v-empty title="根据搜索结果高亮柱状图" sub-title="柱状图颜色渐变" />
    </a-modal>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { SmileTwoTone } from '@ant-design/icons-vue';
import * as echarts from 'echarts';
import lodash from 'lodash';
import area from '../../data/area.json';
import areaData from '../../data/areaData.json';

const xDataFn = (item) => {
  return {
    value: Number(item.value).toFixed(2),
    itemStyle: {
      color: item.own
        ? '#fc6600'
        : new echarts.graphic.LinearGradient(
          0,
          0,
          1,
          0,
          [
            {
              offset: 0,
              color: '#2D7FFF', // 0% 处的颜色
            },
            {
              offset: 1,
              color: '#0BF1FF', // 100% 处的颜色
            },
          ],
          false
        ),
    },
  }
}

const regionData = lodash.map(area, item => {
  return {
    value: item.areaName,
    data: item
  }
});
const region = ref('全部');
const fightingregion = ref('全部');
const fightingregionData = ref([]);

const visible = ref(true);

const chartAvg = lodash.get(areaData, 'avg').toFixed(2);
const yData = lodash.map(lodash.get(areaData, 'details'), (item) => item.key);
const xData = ref(lodash.map(lodash.get(areaData, 'details'), (item) => {
  return xDataFn(item);
}));

const chartOption = ref({
  backgroundColor: '#F4F4F4',
  // backgroundColor: {
  //   type: 'linear',
  //   x: 0,
  //   y: 0,
  //   x2: 0,
  //   y2: 1,
  //   colorStops: [{
  //     offset: 0, color: '#FFDAB9'  // 0% 处的颜色
  //   }, {
  //     offset: 1, color: '#F08080' // 100% 处的颜色
  //   }],
  //   globalCoord: false // 默认为 false
  // },
  xAxis: {
    show: false,
    type: 'value',
    // 网格线
    splitLine: {
      show: false,
    },
  },
  yAxis: {
    type: 'category',
    data: yData, // y轴-战区名称
    // y轴
    axisTick: {
      show: false,
    },
    // y轴刻度线
    axisLine: {
      show: false,
    },
    // 网格线
    splitLine: {
      show: false,
    },
  },
  series: [
    {
      data: xData,
      type: 'bar',
      barWidth: '40%', //设置柱子的宽度
      label: {
        show: true,
        position: 'right',
      },
      itemStyle: {
        // 柱形图圆角，初始化效果
        borderRadius: [25, 25],
      },
    },
    // ***** 警戒线 *****
    {
      type: 'bar',
      markLine: {
        symbol: 'none',
        silent: true,
        label: {
          position: 'start',
          formatter: `平均R值：${chartAvg}`,
          color: '#EB646B',
        },
        data: [
          {
            silent: false,
            lineStyle: {
              type: 'solid',
              width: 3,
              color: '#EB646B',
            },
            // 红色警戒值
            xAxis: `${chartAvg}`,
          },
        ],
      },
    },
  ],
});


const handleChange = (value, dataObj) => {
  if (value == '全部') {
    fightingregion.value = '全部';
    fightingregionData.value = [];
  } else {
    fightingregion.value = lodash.get(dataObj, 'data.children[0].areaName', '');
    fightingregionData.value = lodash.map(lodash.get(dataObj, 'data.children', []), item => {
      return {
        value: item.areaName,
        data: item
      }
    })
  }
};

const onSearch = () => {
  let result = [];
  if (fightingregion.value != '全部') {
    result = lodash.map(lodash.get(areaData, 'details'), item => {
      return {
        ...item,
        own: item.key == fightingregion.value
      }
    })
  } else {
    result = lodash.map(lodash.get(areaData, 'details'), item => {
      return {
        ...item,
        own: item.region == region.value
      }
    })
  }

  lodash.set(areaData, 'details', result);

  xData.value = lodash.map(lodash.get(areaData, 'details'), (item) => {
    return xDataFn(item);
  });
}

const handleOk = () => {
  visible.value = false;
}

</script>

<style lang="less" scoped>
.app-bar-demo2 {
  .tips {
    color: #fc6600;
    font-weight: bold;
  }
}
</style>
