/**
 * 组件封装
 */
//基于el-table进行封装
import comTable from './comTable'
import EShadowBar from './echarts/bar/EShadowBar'


const components = {
  comTable,
  EShadowBar
};

const install = (Vue = {}) => {
  if (install.installed) return;
  Object.keys(components).forEach(component => {
    Vue.component(components[component].name, components[component]);
  });

  install.installed = true;
};

install.installed = false;

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
  install.installed = true;
}

const Vcomp = {
  ...components,
  install
};


export default Vcomp
