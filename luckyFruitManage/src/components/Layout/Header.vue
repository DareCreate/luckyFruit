<template>
    <el-row type="flex" justify="space-between" align="middle" class="header">
        <!-- 折叠按钮 -->
        <el-row type="flex" align="middle">
            <i @click="TOGGLE_MENU_COLLAPSE" class="el-icon-menu collapse-btn"></i>
            <span class="title" @click="goHomePage">后台管理系统</span>
            <!-- <div class="logo">后台管理系统</div> -->
        </el-row>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 全屏显示 -->
                <div class="btn-fullscreen" @click="handleFullScreen">
                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
                </div>
                <!-- 消息中心 -->
                <!-- <div class="btn-bell">
                    <el-tooltip effect="dark" :content="message?`有${message}条未读消息`:`消息中心`" placement="bottom">
                        <router-link to="/tabs">
                            <i class="el-icon-bell"></i>
                        </router-link>
                    </el-tooltip>
                    <span class="btn-bell-badge" v-if="message"></span>
                </div> -->
                <!-- 用户头像 -->
                <div class="user-avator">
                  <app-local-img imgUrl="default_avatar"></app-local-img>
                </div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{myUserInfo.name}} <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item divided  command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </el-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { MY_USER_INFO } from '../../stores/getters-types';
import { LOGOUT } from '../../stores/action-types';
import { TOGGLE_MENU_COLLAPSE } from '../../stores/mutation-types';
import { IUserListItem } from '@/services/apiDataType';
import { Getter, Action, State, Mutation } from 'vuex-class';
@Component({
})
export default class Header extends Vue {
    @Mutation TOGGLE_MENU_COLLAPSE!: () => {};
    @Action LOGOUT!: () => {};
    @Getter(MY_USER_INFO) myUserInfo!: IUserListItem;
    data() {
        return {
            fullscreen: false,
            name: 'linxin',
            message: 2,
        };
    }
     // 用户名下拉菜单选择事件
    handleCommand(command: string) {
        if (command === 'loginout') {
          if (this.myUserInfo == null || this.myUserInfo.tenantId == null) {
            this.$router.push('/login');
            return;
          }
          const { tenantId } = this.myUserInfo;
          this.$router.push({ name: 'Login',  params: { tenantId: String(tenantId) } });
          this.LOGOUT();
        }
    }
    goHomePage() {
      this.$router.push({ name: 'home' });
    }
    // 全屏事件
    handleFullScreen() {
        const doc = document as any;
        const element = document.documentElement as any;
        if ( this.$data.fullscreen) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (doc.webkitCancelFullScreen) {
                doc.webkitCancelFullScreen();
            } else if (doc.mozCancelFullScreen) {
                doc.mozCancelFullScreen();
            } else if (doc.msExitFullscreen) {
                doc.msExitFullscreen();
            }
        } else {
            if ( element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.webkitRequestFullScreen) {
                element.webkitRequestFullScreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.msRequestFullscreen) {
                // IE11
                element.msRequestFullscreen();
            }
        }
        this.$data.fullscreen = !this.$data.fullscreen;
    }
    mounted() {
        if (document.body.clientWidth < 1500) {
            this.TOGGLE_MENU_COLLAPSE();
        }
    }
}
</script>

<style scoped lang="less">
.header {
    height: 100%;
}
.collapse-btn{
    padding: 0 21px;
    font-size: 32px;
    cursor: pointer;
}
.header-right{
    padding-right: 50px;
}
.header-user-con{
    display: flex;
    align-items: center;
}
.btn-fullscreen{
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
}
.btn-bell, .btn-fullscreen{
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
}
.btn-bell-badge{
    position: absolute;
    right: 0;
    top: -2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: #fff;
}
.btn-bell .el-icon-bell{
    color: #fff;
}
.user-name{
    margin-left: 10px;
}
.user-avator{
    margin-left: 20px;
}
.user-avator img{
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.el-dropdown-link{
    color: #fff;
    cursor: pointer;
}
.el-dropdown-menu__item{
    text-align: center;
}
.title {
  cursor: pointer;
}
</style>