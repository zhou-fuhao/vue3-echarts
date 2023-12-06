<template>
  <div class="screen-adapter" :style="style">
    <slot />
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue';
import lodash from 'lodash';
export default {
  name: 'ScreenAdapter',
  //参数注入
  props: {
    width: {
      type: Number,
      default: 1920
    },
    height: {
      type: Number,
      default: 1080
    }
  },

  setup(props) {
    const state = reactive({
      style: {
        width: `${props.width}px`,
        height: `${props.height}px`,
        transform: 'scale(1) translate(-50%, -50%)',
      }
    })

    onMounted(() => {
      setScale();
      window.onresize = lodash.debounce(setScale, 100);
    })

    const getScale = () => {
      const w = window.innerWidth / props.width;
      const h = window.innerHeight / props.height;
      return w < h ? w : h;
    }

    const setScale = () => {
      state.style.transform = `scale(${getScale()}) translate(-50%, -50%)`;
      console.log('任你千变万化,我都不会影响性能');
    }

    return {
      ...toRefs(state)
    }
  }
};
</script>

<style lang="less" scoped>
.screen-adapter {
  transform-origin: 0 0;
  position: absolute;
  left: 50%;
  top: 50%;
  transition: 0.3s;
  background: #050510;
}
</style>