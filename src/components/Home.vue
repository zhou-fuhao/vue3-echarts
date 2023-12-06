<template>
  <a-layout class="app-home">
    <a-layout-sider class="app-home-sider" v-model:collapsed="collapsed" collapsible>
      <a-menu theme="dark" v-model:selectedKeys="selectedKeys" mode="inline">
        <a-sub-menu v-for="item in menuData" :key="item.key">
          <template #title>
            <span>
              <icon-font :type="'icon-' + item.icon" />
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
    <a-layout class="app-home-content">
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
  scriptUrl: '/src/assets/font/iconfont.js',
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
          icon: 'zhexiantu',
        },
        {
          key: '2',
          title: '柱状图',
          titleEn: 'bar',
          icon: 'zhuzhuangtu',
        },
        {
          key: '3',
          title: '饼图',
          titleEn: 'pie',
          icon: 'bingtu',
        },
        {
          key: '4',
          title: '雷达图',
          titleEn: 'radar',
          icon: 'leidatu',
        },
        {
          key: '5',
          title: '漏斗图',
          titleEn: 'funnel',
          icon: 'loudoutu',
        },
        {
          key: '6',
          title: '仪表盘',
          titleEn: 'gauge',
          icon: 'yibiaopan',
        },
        {
          key: '7',
          title: '自定义',
          titleEn: 'custom',
          icon: 'V',
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

<style lang="less" scoped>
.app-home {
  .site-layout .site-layout-background {
    background: #fff;
  }

  [data-theme='dark'] .site-layout .site-layout-background {
    background: #141414;
  }

  &-sider {
    overflow: auto;
    height: 100vh;
    position: fixed;
    left: 0;
  }


  &-content {
    margin-left: 200px;
  }

  &-sider::-webkit-scrollbar {
    width: 4px;
  }

  &-sider::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.2);
  }

  &-sider::-webkit-scrollbar-track {
    border-radius: 0;
    background: rgba(0, 0, 0, 0.1);
  }
}
</style>