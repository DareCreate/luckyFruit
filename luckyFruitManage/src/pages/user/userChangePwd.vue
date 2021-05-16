<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-main">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="原密码">
          <el-input v-model="form.oldPwd"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="form.newPwd"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码">
          <el-input v-model="form.confirmPwd"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button :disabled="!form.oldPwd || !form.newPwd || !form.confirmPwd" type="primary" @click="handleChangepwd">提交</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ApiUser from '@/services/admin/user';
@Component
export default class UserChangePwd extends Vue {
    data() {
      return {
        form: {
          oldPwd: '',
          newPwd: '',
          confirmPwd: '',
        },
      };
    }
    async handleChangepwd() {
      const { oldPwd, newPwd, confirmPwd } = this.$data.form;
      if (newPwd !== confirmPwd) {
        this.$message.error('两次密码不一致');
        return;
      }
      const params = {
        newPassword: newPwd,
        oldPassword: oldPwd,
      };
      const res = await ApiUser.editUserPassword(params);
      if (!res.isSuccess) {
        return;
      }
      this.$data.form = {};
      this.$message.success('修改成功');
    }
}
</script>

<style scoped lang="less">
</style>