<template>
  <div class="center-div">
    <el-row>
      <el-col :push="8">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-input
              v-model="filters.giftCode"
              placeholder="礼品码"
              style="min-width: 600px"
              size="medium"
            >
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="showGiftCodeDetail" type="primary">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <el-dialog
      title="礼品码详情"
      :visible.sync="giftCodeDetailVisible"
      :close-on-click-modal="false"
      width="30%"
    >
      <div class="text-center">
        <p class="titel-font">
          礼品码:
          <span>{{giftCodeVO.giftCode}}</span>
        </p>
        <p class="titel-font">
          用户id:
          <span>{{giftCodeVO.userId}}</span>
        </p>
        <p class="titel-font">
          价值:
          <span>{{giftCodeVO.balance / 100}}</span>
        </p>
        <p class="titel-font">
          创建时间:
          <span>{{$app.helps.formatDateBySecTime(giftCodeVO.balance)}}</span>
        </p>
        <p class="titel-font">
          是否可用:
          <span v-if="giftCodeVO.usable">是</span>
          <span v-else>否</span>
        </p>
        <el-button v-if="giftCodeVO.usable" type="primary" @click="useGiftCode">确认兑换</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ApiGift from '@/services/luck_fruit/gift';

@Component
export default class User extends Vue {
  data() {
    return {
      filters: {
        giftCode: null,
      },
      giftCodeDetailVisible: false,
      giftCodeVO: {},
    };
  }

  async showGiftCodeDetail() {
    const param = this.$data.filters.giftCode;
    const res = await ApiGift.getGiftCodeDetail(param);
    if (!res.isSuccess) {
      return;
    }
    this.$data.giftCodeVO = res.data;
    this.$data.giftCodeDetailVisible = true;
  }

  async getGiftCodeDetail() {
    const param = this.$data.filters.giftCode;
    const res = await ApiGift.getGiftCodeDetail(param);
    if (!res.isSuccess) {
      return;
    }
    this.$data.giftCodeVO = res.data;
  }

  async useGiftCode() {
    const isConfirm = await this.$confirm('确认兑换礼品码吗?', '提示', {
      type: 'warning',
    });
    if (!isConfirm) {
      return;
    }
    const giftCode = this.$data.giftCodeVO.giftCode;
    const res = await ApiGift.dealGiftCode(giftCode);

    if (!res.isSuccess) {
      return;
    }

    this.$message.success('兑换成功');
    this.getGiftCodeDetail();
  }
}
</script>

<style scoped lang="less">
.center-div {
  position: relative;
  top: 10%;
}

.titel-font {
  font-size: 20px;
}

.text-center {
  position: relative;
  left: 100px;
}
</style>