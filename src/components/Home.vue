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
import lodash from 'lodash';

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
        },
        {
          key: '2',
          title: '柱状图',
          titleEn: 'bar',
        },
        {
          key: '3',
          title: '饼图',
          titleEn: 'pie',
        },
        {
          key: '4',
          title: '雷达图',
          titleEn: 'radar',
        },
        {
          key: '5',
          title: '漏斗图',
          titleEn: 'funnel',
        },
        {
          key: '6',
          title: '仪表盘',
          titleEn: 'gauge',
        },
      ])
    };
  },
  created() {
    this.menuData = lodash.map(this.menuData, item => {
      return { ...item, children: this.menuChildren(item) }
    })
  },
  methods: {
    onMenu(prefix, suffix) {
      this.$router.push(`${prefix}-${suffix}`);
    },
    menuChildren(item) {
      const children = [];
      for (let i = 1; i <= 10; i++) {
        children.push({
          key: `${item.key}${i}`,
          title: `demo${item.key}${i}`,
          titleEn: `demo${i}`,
          children: []
        })
      }
      return children;
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