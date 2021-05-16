import createLogger from 'vuex/dist/logger';
import VuexPersistence from 'vuex-persist';
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  key: 'manageVuex',
});
export default [createLogger({}), vuexLocal.plugin];
// export default process.env.NODE_ENV !== 'production'
//   ? [createLogger({})]
//   : [];
