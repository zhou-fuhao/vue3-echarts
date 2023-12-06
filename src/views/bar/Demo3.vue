
<template>
  <div class="app-bar-demo3">
    <div class="d-flex">
      <span class="tips">（点击柱状图及阴影均可下钻）</span>当前位置：
      <a-breadcrumb>
        <a-breadcrumb-item @click="onBreadcrumb" class="breadcrumb">Home</a-breadcrumb-item>
        <a-breadcrumb-item>{{ breadcrumbName ? breadcrumbName : '点击柱状图试下?' }}</a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <!-- @zr:click 方法是一个图标区域内任意位置点击的事件监听 -->
    <v-chart class="app-echarts" :option="option" ref="barDemo3" autoresize @click="clickBarInBarChart"
      @zr:click="handleZrClick" v-if="!isDrillingIn" />
    <v-chart class="app-echarts" :option="option2" autoresize v-else />

    <a-modal v-model:visible="visible" title="" @ok="handleOk" ok-text="去试试" cancel-text="取消">
      <v-empty title="点击柱状图及阴影均可下钻" />
    </a-modal>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue';
import lodash from 'lodash';
import scoreData from '../../data/scoreData.json';

let myChart = getCurrentInstance();

const detailList = lodash.get(scoreData, 'detailList') || [];
const series = lodash.map(detailList, (item, index) => item[`key${index}`]);
const xData = lodash.map(detailList, (item) => item.name + '分');

const visible = ref(true);
const isDrillingIn = ref(false);
const breadcrumbName = ref('');

const option = ref({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow', // 'shadow' as default; can also be 'line' or 'shadow'
    },
    valueFormatter: function (value) {
      return value ? `${value}人` : value;
    },
  },
  xAxis: {
    type: 'category',
    data: xData,
    // triggerEvent: true, // 增加 x 轴和 y 轴在 @click 中的事件响应
  },
  yAxis: {
    type: 'value',
    name: '单位:人',
    // triggerEvent: true, // 增加 x 轴和 y 轴在 @click 中的事件响应
  },
  series: [
    {
      type: 'bar',
      itemStyle: {
        color: function (params) {
          // 给出颜色组
          const colorList = ['#FFC833', '#f59a23', '#EB646B', '#d9001b'];
          return colorList[params.dataIndex];
        },
      },
      barWidth: '30%',
      data: series,
    },
  ],
});


const option2 = ref({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
    formatter: function (params) {
      let tar;
      if (params[1] && params[1].value !== '-') {
        tar = params[1];
      } else {
        tar = params[2];
      }
      return tar && tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
    }
  },
  legend: {
    data: ['支出', '收入']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: (function () {
      let list = [];
      for (let i = 1; i <= 11; i++) {
        list.push('1月' + i + '日');
      }
      return list;
    })()
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'Placeholder',
      type: 'bar',
      stack: 'Total',
      silent: true,
      itemStyle: {
        borderColor: 'transparent',
        color: 'transparent'
      },
      emphasis: {
        itemStyle: {
          borderColor: 'transparent',
          color: 'transparent'
        }
      },
      data: [0, 900, 1245, 1530, 1376, 1376, 1511, 1689, 1856, 1495, 1292]
    },
    {
      name: '收入',
      type: 'bar',
      stack: 'Total',
      label: {
        show: true,
        position: 'top'
      },
      data: [900, 345, 393, '-', '-', 135, 178, 286, '-', '-', '-']
    },
    {
      name: '支出',
      type: 'bar',
      stack: 'Total',
      label: {
        show: true,
        position: 'bottom'
      },
      data: ['-', '-', '-', 108, 154, '-', '-', '-', 119, 361, 203]
    }
  ]
});

// 普通点击事件，只能点击颜色柱子
const clickBarInBarChart = (params) => {
  console.log('clickBarInBarChart', params);
}

// 整个柱状图及阴影
const handleZrClick = lodash.debounce(async (params) => {
  // console.log('handleZrClick', params);
  let op = myChart.refs.barDemo3.getOption();
  let pointInPixel = [params.offsetX, params.offsetY];
  if (myChart.refs.barDemo3.containPixel("grid", pointInPixel)) {
    const xIndex = myChart.refs.barDemo3.convertFromPixel(
      { seriesIndex: 0 },
      pointInPixel
    )[0]; // 下标0纵向柱状图；下标1横向柱状图
    let handleIndex = Number(xIndex);
    //获得图表中点击的列
    let name = op.xAxis[0].data[handleIndex]; // yAxis：当前点击的 Y轴 的名称；xAxis：当前点击的 X轴 的名称；

    const isEmpty = lodash.map(op.series, (item) => {
      return item.data[handleIndex];
    });

    if (lodash.some(isEmpty, Boolean)) {
      // <===> lodash.sum(isEmpty) <===> lodash.every(isEmpty, oo => oo == null)
      console.log("可以下钻 - " + name);

      breadcrumbName.value = name;
      isDrillingIn.value = true;
    } else {
      console.log("当前数据为空，不能进行后续操作！");
    }
  }
}, 200);

const onBreadcrumb = () => {
  breadcrumbName.value = '';
  isDrillingIn.value = false;
}

const handleOk = () => {
  visible.value = false;
}

</script>

<style lang="less" scoped>
.app-bar-demo3 {
  .tips {
    color: #000000;
    font-weight: bold;
  }

  .breadcrumb {
    cursor: pointer;
  }
}
</style>
