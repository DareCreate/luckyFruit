<template>
<div class="container">
  <el-form :model="addForm" label-width="130px" class="form-box" :rules="addFormRules" ref="addForm">
    <el-form-item label="手机名字" prop="phoneName">
      <el-input v-model="addForm.phoneName" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <div style="margin-left: 300px;margin-top: 30px;">
    <el-button type="primary" @click.native="addSubmit" :loading="loading">提交</el-button>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ApiPayClient from '@/services/pay/payClient';
@Component
export default class CreatePayClientPhone extends Vue {
  data() {
    return {
      loading: false,
      giveLimit: false,
      addFormRules: {
        // roleName: [{required: true, message: '请输入角色名称', trigger: 'blur'}],
      },
      addForm: {
      },
    };
  }
  addSubmit() {
    (this.$refs.addForm as any).validate(async (valid: boolean) => {
      if (!valid) {
        return;
      }
      const { payClientId } = this.$route.params;
      const params = Object.assign({}, this.$data.addForm, {
        payClientId,
      });
      const res = await ApiPayClient.createPayClientPhone(params);
      if (!res.isSuccess) {
        return;
      }
      this.$message.success('创建成功');
      this.$router.back();
    });
  }
}
</script>

<style scoped lang="less">
</style>