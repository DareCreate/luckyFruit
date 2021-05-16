<template>
  <div class="ms-tab">
    <div class="text-center">
      <p class="titel-font">商户id: {{tenantInfo.id}}</p>
      <p class="titel-font">奖池: {{tenantInfo.jackpot}}</p>
      <p class="titel-font">过期时间: {{ $app.helps.formatDateBySecTime(tenantInfo.expireTime) }}</p>
      <p class="titel-font">抽水: {{tenantInfo.tax}}%</p>
    </div>

    <div style="margin-left: 130px;margin-top: 60px;">
      <el-button type="primary" @click.native="setTax">设置抽水</el-button>
      <el-button type="primary" @click.native="jackpotAdd">奖池注水</el-button>
      <el-button type="primary" @click.native="tenantCharge">充值时间</el-button>
      <el-button type="primary" @click.native="readyShowGameQrCode">游戏二维码</el-button>
    </div>

    <el-dialog
      title="图片"
      :visible.sync="gameQrCodeVisible"
      :close-on-click-modal="false"
      width="30%"
    >  
    <img :src="gameQrCode">
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ApiTenant from '@/services/luck_fruit/tenant';

@Component
export default class Tenant extends Vue {
  data() {
    return {
      tenantInfo: {},
      gameQrCodeVisible: false,
      gameQrCode: null,
    };
  }

  mounted() {
    this.getTenantInfo();
  }

  async tenantCharge() {
    this.$prompt('请输入充值密钥', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
    }).then(({ value }) => {
      this.tenantChargeApi(value);
    });
  }

  async tenantChargeApi(value: string) {
    const res = await ApiTenant.tenantCharge(value);
    this.getTenantInfo();
    if (!res.isSuccess) {
      return;
    }
    this.$message.success('充值时间成功');
  }

  async jackpotAdd() {
    this.$prompt('请输入奖池注水数', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
    }).then(({ value }) => {
      const param = {
        jackpot: value,
      };
      this.jackpotAddApi(param);
    });
  }

  async jackpotAddApi(param: any) {
    const res = await ApiTenant.jackpotAdd(param);
    this.getTenantInfo();
    if (!res.isSuccess) {
      return;
    }
    this.$message.success('奖池注水成功');
  }

  async setTax() {
    this.$prompt('请输入修改的抽水数', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
    }).then(({ value }) => {
      const param = {
        tax: value,
      };
      this.setTaxApi(param);
    });
  }

  async setTaxApi(param: any) {
    const res = await ApiTenant.setTax(param);
    this.getTenantInfo();
    if (!res.isSuccess) {
      return;
    }
    this.$message.success('修改抽水成功');
  }

  async getTenantInfo() {
    const res = await ApiTenant.tenantInfo();
    this.$data.tenantInfo = res.data;
  }

  async readyShowGameQrCode() {
    this.$prompt('请输入推广标语', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
    }).then(({ value }) => {
      this.showGameQrCode(value);
    });
  }

  async showGameQrCode(value: string) {
    const host = 'http://' + window.location.host;
    const param = {
      url: host,
      content: value,
    };
    const res = await ApiTenant.getTenantQrCode(param);
    this.$data.gameQrCode = 'data:image/jpg;base64,' + res.data;
    this.$data.gameQrCodeVisible = true;
  }
}
</script>

<style scoped lang="less">
.ms-tab {
  position: relative;
  left: 45%;
  top: 30%;
  width: 600px;
  height: 300px;
  margin: -150px 0 0 -190px;
  padding: 40px;
  border-radius: 5px;
  border-style: solid;
  border-color: #252222;
  background: #fff;
}

.text-center {
  position: relative;
  left: 100px;
}

.titel-font {
  font-size: 20px;
}
</style>