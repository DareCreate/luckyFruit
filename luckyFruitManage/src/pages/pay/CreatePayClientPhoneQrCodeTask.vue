<template>
<div class="container">
  <el-form :model="addForm" label-width="130px" class="form-box" :rules="addFormRules" ref="addForm">
    <el-form-item label="金额" prop="amount">
      <el-input v-model="addForm.amount" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="生成二维码数量" prop="buildQrCodeNum">
      <el-input v-model="addForm.buildQrCodeNum" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="支付类型" prop="payType">
      <el-radio-group v-model="addForm.payType">
        <el-radio
          v-for="item in $app.typeDef.payType"
          :label="item"
          :key="item"
        >
          {{ $app.typeDef.payTypeLabMap[item] }}
        </el-radio>
      </el-radio-group>
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
import { payType } from '@/app/typeDef';
@Component
export default class CreatePayClientPhoneQrCodeTask extends Vue {
  data() {
    return {
      loading: false,
      giveLimit: false,
      addFormRules: {
        // roleName: [{required: true, message: '请输入角色名称', trigger: 'blur'}],
      },
      addForm: {
        payType: payType.WECHAT,
      },
    };
  }
  addSubmit() {
    (this.$refs.addForm as any).validate(async (valid: boolean) => {
      if (!valid) {
        return;
      }
      const { payClientPhoneId } = this.$route.params;
      const params = Object.assign({}, this.$data.addForm, {
        payClientPhoneId,
      });
      const res = await ApiPayClient.createPayClientPhoneQrCodeTask(params);
      if (!res.isSuccess) {
        return;
      }
      this.$router.back();
    });
  }
}
</script>

<style scoped lang="less">
</style>