<template>
    <el-aside class="app-sidebar" width="auto">
        <el-menu 
            class="sidebar-el-menu" :default-active="onRoutes" :collapse="appState.menuCollapse"
            background-color="#324157" text-color="#bfcbd9" active-text-color="#20a0ff"
            unique-opened router
        >
            <template v-for="item in menus">
                <template v-if="item.children">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span class="menu-title" slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="(subItem, i) in item.children" >
                          <template v-if="subItem.menuShow && subItem.children && subItem.children.length > 0">
                            <el-submenu :index="subItem.index || ''" :key="i">
                              <template slot="title">{{ subItem.title }}</template>
                              <el-menu-item v-for="item in subItem.children" :key="item.id" :index="item.path">
                                {{ item.name }}
                              </el-menu-item>
                            </el-submenu>
                          </template>
                          <el-menu-item v-else :index="subItem.index" :key="i">
                            {{ subItem.title }}
                          </el-menu-item> 
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span class="menu-title" slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
        
    </el-aside>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IAppState } from '../../stores/modules/app';
import { USER_MENUS } from '../../stores/getters-types';
import { State, Getter } from 'vuex-class';
@Component({
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        },
    },
})
export default class Sidebar extends Vue {
  @State('app') appState!: IAppState;
   data() {
       return {menus: [
  {
      icon: 'el-icon-setting',
      index: '1',
      key: 1,
      title: '用户管理',
      children: [
          {
              index: '/luck_fruit/user',
              title: '用户管理',
          },
      ],
  },


      {
      icon: 'el-icon-setting',
      index: '2',
      title: '游戏管理',
      children: [
          {
              index: '/luck_fruit/tenant',
              title: '游戏设置',
          },
      ],
  },

        {
      icon: 'el-icon-setting',
      index: '3',
      title: '礼品码管理',
      children: [
          {
              index: '/luck_fruit/gift',
              title: '激活礼品码',
          },
      ],
  },

],
       };
   }

  mounted() {
    console.log(this.$data.menus);
  }
}
</script>

<style scoped lang="less">
.app-sidebar {
    align-items: stretch;
    background: #2f4050;
    color: #fff;
    overflow: hidden;
}
.sidebar::-webkit-scrollbar{
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse){
    width: 180px;
}
// .menu-title {
//     padding: 0 15px;
// }
</style>