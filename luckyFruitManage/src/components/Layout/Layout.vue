<template>
    <el-container class="app-container">
        <el-header class="app-header">
            <v-header></v-header>
        </el-header>
        <el-container>
            <v-sidebar></v-sidebar>
            <el-main>
                <!-- <v-tags></v-tags> -->
                <transition
                    mode="out-in"
                    enter-active-class="fadeIn"
                    leave-active-class="fadeOut"
                    appear
                >
                    <router-view></router-view>
                </transition>
            </el-main>
        </el-container>
    </el-container>
</template>

<script lang="ts">
import VSidebar from './Sidebar.vue';
import VHeader from './Header.vue';
import VTags from './Tags.vue';
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component({
    components: {
        VSidebar,
        VHeader,
        VTags,
    },
})
export default class Layout extends Vue {
    data() {
        return {
            isCollapse: false,
        };
    }
}
</script>

<style scoped lang="less">
.app-container {
    height: 100vh;
}
.app-header {
    background: #373d41;
    color: #fff;
}

</style>