<template>
<div class="container">
  <el-form :model="editForm" label-width="130px" class="form-box" :rules="editFormRules" ref="editForm">
    <el-form-item label="手机名字" prop="phoneName">
      <el-input v-model="editForm.phoneName" auto-complete="off"></el-input>
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
export default class EditPayClientPhone extends Vue {
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
    const { payClientPhoneId } = this.$route.params;
    const res = await ApiPayClient.getPayClientPhoneDetail(payClientPhoneId);
    if (!res.isSuccess) {
      return;
    }
    this.$data.editForm = res.data;
  }
  addSubmit() {
    (this.$refs.editForm as any).validate(async (valid: boolean) => {
      if (!valid) {
        return;
      }
      const { payClientPhoneId } = this.$route.params;
      const { phoneName } = this.$data.editForm;
      const res = await ApiPayClient.editPayClientPhone(payClientPhoneId, phoneName);
      if (!res.isSuccess) {
        return;
      }
      this.$message.success('修改成功');
      this.$router.back();
    });
  }
}
</script>

<style scoped lang="less">
</style>