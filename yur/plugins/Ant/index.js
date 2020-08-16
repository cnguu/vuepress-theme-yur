import {
  ConfigProvider,
  Button,
  Menu,
  Popover,
  Icon,
  Empty,
  Card,
  Input,
  Select
} from "ant-design-vue";

export default {
  install: Vue => {
    Vue.use(ConfigProvider);
    Vue.use(Button);
    Vue.use(Menu);
    Vue.use(Popover);
    Vue.use(Icon);
    Vue.use(Empty);
    Vue.use(Card);
    Vue.use(Input);
    Vue.use(Select);
  }
};
