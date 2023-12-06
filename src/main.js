import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "echarts";
import ECharts from "vue-echarts";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import "./assets/style/index.css";
// 全局挂载所有自定义组件
import { components } from "./components/basic/index.js";

const app = createApp(App);

app.component("v-chart", ECharts);

app.use(components);
app.use(router);
app.use(Antd);

app.mount("#app");
