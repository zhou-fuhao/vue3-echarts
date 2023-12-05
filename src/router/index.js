import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../components/Home.vue";
import BarDemo1 from "../views/bar/Demo1.vue";
import BarDemo2 from "../views/bar/Demo2.vue";
import BarDemo3 from "../views/bar/Demo3.vue";
import PieDemo1 from "../views/pie/Demo1.vue";
import PieDemo2 from "../views/pie/Demo2.vue";
import PieDemo3 from "../views/pie/Demo3.vue";
import PieDemo4 from "../views/pie/Demo4.vue";
import PieDemo5 from "../views/pie/Demo5.vue";
import PieDemo6 from "../views/pie/Demo6.vue";

const routes = [
  {
    path: "/",
    name: Home,
    component: Home,
    children: [
      {
        path: "/bar-demo1",
        name: BarDemo1,
        component: BarDemo1,
        meta: { title: "柱状图" },
      },
      {
        path: "/bar-demo2",
        name: BarDemo2,
        component: BarDemo2,
        meta: { title: "柱状图" },
      },
      {
        path: "/bar-demo3",
        name: BarDemo3,
        component: BarDemo3,
        meta: { title: "柱状图" },
      },
      {
        path: "/pie-demo1",
        name: PieDemo1,
        component: PieDemo1,
        meta: { title: "饼图" },
      },
      {
        path: "/pie-demo2",
        name: PieDemo2,
        component: PieDemo2,
        meta: { title: "饼图" },
      },
      {
        path: "/pie-demo3",
        name: PieDemo3,
        component: PieDemo3,
        meta: { title: "饼图" },
      },
      {
        path: "/pie-demo4",
        name: PieDemo4,
        component: PieDemo4,
        meta: { title: "饼图" },
      },
      {
        path: "/pie-demo5",
        name: PieDemo5,
        component: PieDemo5,
        meta: { title: "饼图" },
      },
      {
        path: "/pie-demo6",
        name: PieDemo6,
        component: PieDemo6,
        meta: { title: "饼图" },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
    // document.title = to.meta.title + " - (默认标题系统名,看需要拼接)";
  } else {
    document.title = "vue3-echarts";
  }
  next();
});
