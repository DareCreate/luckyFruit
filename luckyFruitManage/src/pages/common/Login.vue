<template>
  <div class="login-wrap">
    <div class="ms-title">后台管理系统</div>
    <div class="ms-login">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="0px"
        class="demo-ruleForm"
      >
        <el-form-item prop="loginId">
          <el-input v-model="ruleForm.loginId" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="请输入密码"
            v-model="ruleForm.password"
            @keyup.enter.native="submitForm('ruleForm')"
          ></el-input>
        </el-form-item>
        <div class="login-btn">
          <el-row>
            <el-col span="12" pull="1">
              <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            </el-col>
            <el-col span="12" push="1">
              <el-button type="success" @click="showAddTenant()">注册</el-button>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </div>

    <!-- 添加商户 -->
    <el-dialog
      title="添加商户"
      :visible.sync="addTenantFormVisible"
      :close-on-click-modal="false"
      width="30%"
    >
      <el-form :model="addTenantForm" :rules="rules" ref="addTenantForm">
        <el-form-item prop="loginId">
          <el-input v-model="addTenantForm.loginId" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="请输入密码" v-model="addTenantForm.password"></el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="success" @click="addTenant()">注册</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ApiLogin from '@/services/admin/login';
import { IUserInfoState } from '../../stores/modules/userInfo';
import { Mutation } from 'vuex-class';
import { UPDATE_USER_INFO } from '../../stores/mutation-types';
@Component
export default class Login extends Vue {
  @Mutation UPDATE_USER_INFO!: (userInfo: IUserInfoState) => {};
  data() {
    return {
      ruleForm: {
        loginId: '',
        password: '',
      },
      rules: {
        loginId: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
      addTenantForm: {},
      addTenantFormVisible: false,
    };
  }
  submitForm(formName: string) {
    (this.$refs[formName] as any).validate((valid: boolean) => {
      if (!valid) {
        return;
      }
      this.login();
    });
  }

  showAddTenant() {
    this.$data.addTenantFormVisible = true;
  }

  async addTenant() {
    const param = Object.assign({}, this.$data.addTenantForm);
    const res = await ApiLogin.tenantAdd(param);
    if (!res.isSuccess) {
      return;
    }
    this.UPDATE_USER_INFO(res.data);
    this.$data.addTenantFormVisible = false;
    this.$router.push({ path: '/home' });
  }

  async login() {
    this.$data.loading = true;
    const loginParams = {
      loginId: this.$data.ruleForm.loginId,
      password: this.$data.ruleForm.password,
    };
    const res = await ApiLogin.login(loginParams);
    this.$data.loading = false;
    if (!res.isSuccess) {
      return;
    }
    this.UPDATE_USER_INFO(res.data);
    this.$router.push({ path: '/home' });
  }
}
</script>

<style scoped lang="less">
.login-wrap {
  width: 100%;
  height: 100%;
  background: #324157;
}
.ms-title {
  position: absolute;
  top: 50%;
  width: 100%;
  margin-top: -230px;
  text-align: center;
  font-size: 30px;
  color: #fff;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 300px;
  height: 160px;
  margin: -150px 0 0 -190px;
  padding: 40px;
  border-radius: 5px;
  background: #fff;
}
.login-btn {
  text-align: center;
  margin-top: 35px;
}
.login-btn button {
  width: 100%;
  height: 40px;
}
</style>