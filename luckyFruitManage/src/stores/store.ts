import Vue from 'vue';
import Vuex from 'vuex';
import plugins from './plugins/index';
Vue.use(Vuex);

const requireComponent = require.context(
  './modules',
  false,
  /\w+\.(ts)$/,
);

const modules: {[propName: string]: object } = {};
requireComponent.keys().forEach((fileName: string) => {
  const moduleName = fileName.replace(/^\.\/(.*)\.\w+$/, '$1');
  modules[moduleName] = requireComponent(fileName).default || requireComponent(fileName);
});
export default new Vuex.Store({
  modules: {
    ...modules,
  },
  plugins,
});
