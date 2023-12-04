import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../components/Home.vue";
import BarDemo1 from "../views/bar/Demo1.vue";
import PieDemo1 from "../views/pie/Demo1.vue";

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
        meta: { title: "BarDemo1" },
      },
      {
        path: "/pie-demo1",
        name: PieDemo1,
        component: PieDemo1,
        meta: { title: "PieDemo1" },
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
