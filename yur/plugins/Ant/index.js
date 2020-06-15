import { ConfigProvider, Button, Menu, Popover, Icon, Carousel } from "ant-design-vue";

export default {
  install: Vue => {
    Vue.use(ConfigProvider);
    Vue.use(Button);
    Vue.use(Menu);
    Vue.use(Popover);
    Vue.use(Icon);
    Vue.use(Carousel);
  }
};
