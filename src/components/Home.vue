<template>
  <a-layout style="min-height: 100vh" id="components-layout-demo-side">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <a-menu theme="dark" v-model:selectedKeys="selectedKeys" mode="inline">
        <a-sub-menu v-for="item in menuData" :key="item.key">
          <template #title>
            <span>
              <icon-font type="icon-weixin" />
              <span>{{ item.title }}</span>
            </span>
          </template>
          <a-menu-item v-for="itemChild in item.children" :key="itemChild.key"
            @click="onMenu(item.titleEn, itemChild.titleEn)">
            {{ itemChild.title }}
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <router-view></router-view>
    </a-layout>
  </a-layout>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { createFromIconfontCN } from '@ant-design/icons-vue';

// 常用的话可以挂载到全局
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_4355069_liobch4ta2h.js',
});

export default defineComponent({
  components: {
    IconFont
  },
  data() {
    return {
      collapsed: ref(false),
      selectedKeys: ref(['1']),
      menuData: ref([
        {
          key: '1',
          title: '折线图',
          titleEn: 'line',
          children: [
            {
              key: '11',
              title: 'demo1',
              titleEn: 'demo1',
              children: []
            }
          ]
        },
        {
          key: '2',
          title: '柱状图',
          titleEn: 'bar',
          children: [
            {
              key: '21',
              title: 'demo1',
              titleEn: 'demo1',
              children: []
            },
            {
              key: '22',
              title: 'demo2',
              titleEn: 'demo2',
              children: []
            },
            {
              key: '23',
              title: 'demo3',
              titleEn: 'demo3',
              children: []
            },
          ]
        },
        {
          key: '3',
          title: '饼图',
          titleEn: 'pie',
          children: [
            {
              key: '31',
              title: 'demo1',
              titleEn: 'demo1',
              children: []
            }
          ]
        },
        {
          key: '4',
          title: '雷达图',
          titleEn: 'radar',
          children: [
            {
              key: '41',
              title: 'demo41',
              titleEn: 'demo1',
              children: []
            }
          ]
        },
        {
          key: '5',
          title: '漏斗图',
          titleEn: 'funnel',
          children: [
            {
              key: '51',
              title: 'demo51',
              titleEn: 'demo1',
              children: []
            }
          ]
        },
        {
          key: '6',
          title: '仪表盘',
          titleEn: 'gauge',
          children: [
            {
              key: '61',
              title: 'demo61',
              titleEn: 'demo1',
              children: []
            }
          ]
        },
      ])
    };
  },
  methods: {
    onMenu(prefix, suffix) {
      this.$router.push(`${prefix}-${suffix}`);
    }
  }
});
</script>

<style scoped>
.site-layout .site-layout-background {
  background: #fff;
}

[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}
</style>