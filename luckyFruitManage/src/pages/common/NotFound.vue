<template>
  <div class="error-page">
      <div class="error-code">4<span>0</span>4</div>
      <div class="error-desc">啊哦~ 你所访问的页面不存在</div>
      <div class="error-handle">
          <el-button @click="goHomePage" type="primary" size="large">返回首页</el-button>
          <el-button class="error-btn" type="primary" size="large" @click="goBack">返回上一页</el-button>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { MY_USER_INFO } from '@/stores/getters-types';

@Component
export default class NotFound extends Vue {
  @Getter(MY_USER_INFO) myUserInfo!: any;
  goBack() {
    this.$router.go(-1);
  }
  goHomePage() {
    this.$router.push('/home');
  }
}
</script>

<style scoped lang="less">
    .error-page{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        height: 100%;
        background: #f3f3f3;
        box-sizing: border-box;
    }
    .error-code{
        line-height: 1;
        font-size: 250px;
        font-weight: bolder;
        color: #2d8cf0;
    }
    .error-code span{
        color: #00a854;
    }
    .error-desc{
        font-size: 30px;
        color: #777;
    }
    .error-handle{
        margin-top: 30px;
        padding-bottom: 200px;
    }
    .error-btn{
        margin-left: 100px;
    }
</style>