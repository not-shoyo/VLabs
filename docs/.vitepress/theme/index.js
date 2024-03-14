// .vitepress/theme/index.js
import DefaultTheme from "vitepress/theme";
import "./custom.css";
import CustomFooterTemplateLayout from "./CustomFooterTemplateLayout.vue";

export default {
  extends: DefaultTheme,
  Layout: CustomFooterTemplateLayout,
};
