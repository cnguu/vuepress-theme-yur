import {
  ConfigProvider,
  Button,
  Menu,
  Popover,
  Icon,
  Empty,
  Card,
  Input,
  Select,
  Row,
  Col,
  Pagination,
  Tag,
  Drawer,
  Anchor
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
    Vue.use(Row);
    Vue.use(Col);
    Vue.use(Pagination);
    Vue.use(Tag);
    Vue.use(Drawer);
    Vue.use(Anchor);
  }
};
