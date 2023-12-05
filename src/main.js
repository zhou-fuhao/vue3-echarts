import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "echarts";
import ECharts from "vue-echarts";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import "./assets/style/index.css";

import Empty from "./components/Empty.vue";

const app = createApp(App);

app.component("v-chart", ECharts);
app.component("v-empty", Empty);

app.use(router);
app.use(Antd);

app.mount("#app");
