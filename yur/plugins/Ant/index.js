import {
  ConfigProvider,
  Button,
  Menu,
  Popover,
  Icon,
  Carousel,
  Tooltip,
  Modal
} from "ant-design-vue";

export default {
  install: Vue => {
    Vue.use(ConfigProvider);
    Vue.use(Button);
    Vue.use(Menu);
    Vue.use(Popover);
    Vue.use(Icon);
    Vue.use(Carousel);
    Vue.use(Tooltip);
    Vue.use(Modal);
  }
};
