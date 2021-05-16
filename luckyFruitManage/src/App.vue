<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { globalEvent } from './app/typeDef';
import { Getter } from 'vuex-class';
import { MY_USER_INFO } from '@/stores/getters-types';
import { IUserListItem } from '@/services/apiDataType';
@Component
export default class App extends Vue {
  @Getter(MY_USER_INFO) myUserInfo!: IUserListItem;
  public routerTimer!: any;
  public created() {
    this.$root.$on(globalEvent.NO_LOGIN, () => {
      clearTimeout(this.routerTimer);
      this.routerTimer = setTimeout(() => {
        clearTimeout(this.routerTimer);
        this.goLoginPage();
      }, 300);
    });
  }
  goLoginPage() {
    if (this.myUserInfo == null || this.myUserInfo.tenantId == null) {
      this.$router.push('/login');
      return;
    }
    const { tenantId } = this.myUserInfo;
    this.$router.push({ name: 'Login',  params: { tenantId: String(tenantId) } });
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
body, html {
  margin: 0;
  width: 100%;
  height: 100%;
}
.el-menu {
  border-right: 0;
}


// common
.container {
    padding: 30px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
}
.form-box {
    max-width: 600px;
}
img {
  width: 100%;
  height: 100%;
}
a {
  color: #409EFF;
}
</style>
