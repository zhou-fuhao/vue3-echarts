import Empty from "../Empty.vue";
import MyAdapter from "../ScreenAdapter.vue";
import MySelect from "./Select.vue";

export const components = {
  install(app) {
    app.component("v-empty", Empty);
    app.component("MySelect", MySelect);
    app.component("MyAdapter", MyAdapter);
  },
};
