<template>
<div class="container">
  <el-form :model="editForm" label-width="130px" class="form-box" :rules="editFormRules" ref="editForm">
    <el-form-item label="appId" prop="appId">
      <el-input v-model="editForm.appId" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="editForm.password" auto-complete="off"></el-input>
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
export default class EditPayClient extends Vue {
  data() {
    return {
      loading: false,
      giveLimit: false,
      editFormRules: {
        // roleName: [{required: true, message: '请输入角色名称', trigger: 'blur'}],
      },
      editForm: {
      },
    };
  }
  mounted() {
    this.getDetail();
  }
  async getDetail() {
    const { payClientId } = this.$route.params;
    const res = await ApiPayClient.getPayClientDetail(payClientId);
    if (!res.isSuccess) {
      return;
    }
    this.$data.editForm = res.data;
  }
  addSubmit() {
    this.$message.error('没做');
    // (this.$refs.editForm as any).validate(async (valid: boolean) => {
    //   if (!valid) {
    //     return;
    //   }
    //   const { tenantId } = this.$route.params;
    //   const params = Object.assign({}, this.$data.editForm, {
    //     tenantId,
    //   });
    //   const res = await ApiPayClient.createPayClient(params);
    //   if (!res.isSuccess) {
    //     return;
    //   }
    //   this.$router.back();
    // });
  }
}
</script>

<style scoped lang="less">
</style>