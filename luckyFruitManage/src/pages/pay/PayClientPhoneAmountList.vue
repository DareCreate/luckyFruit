<template>
  <el-row>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-button @click="addFormVisible = true" type="primary">添加金额</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <el-table :data="list" highlight-current-row v-loading="loading" style="width: 100%;">
      <el-table-column prop="id" label="id" >
      </el-table-column>
      <el-table-column prop="amount" label="金额">
      </el-table-column>
      <el-table-column prop="payClientPhoneId" label="手机客户端id">
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <!-- <el-button size="mini" type="warning" @click="goEditPage(scope.row.id)">编辑</el-button> -->
          
          <el-button size="mini" type="primary" @click="goManageQrcode(scope.row.id)">管理二维码</el-button>
          <el-button size="mini" type="danger" @click="deleteItem(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- <el-col :span="24" class="toolbar">
      <el-pagination
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :page-size="10"
        :total="total"
        style="float:right;"
      >
      </el-pagination>
    </el-col> -->
    <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
        <el-form-item label="金额" prop="amount">
          <el-input type="number" v-model="addForm.amount" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ApiPayClient from '@/services/pay/payClient';

@Component
export default class PayClientPhoneAmountList extends Vue {
  data() {
    return {
      filters: {
        name: '',
      },
      list: [],
      loading: false,
      // total: 0,
      // page: 1,
      // limit: 10,
      addFormVisible: false,
      addLoading: false,
      addFormRules: {},
      addForm: {},
    };
  }
  mounted() {
    this.getList();
  }
  goEditPage(payClientPhoneAmountId: string) {
    const { payClientPhoneId } = this.$route.params;
    this.$router.push({ name: 'EditPayClientPhoneAmount', params: { payClientPhoneAmountId } });
  }
  async getList() {
    // const params = {
    //   pageNum: this.$data.page - 1,
    //   pageSize: 10,
    // };
    const { payClientPhoneId } = this.$route.params;
    this.$data.loading = true;
    const res = await ApiPayClient.payClientPhoneAmountList(payClientPhoneId);
    this.$data.loading = false;
    if (!res.isSuccess) {
      return;
    }
    // this.$data.total = res.data.total;
    this.$data.list = res.data;
  }
  // handleCurrentChange(val: number) {
  //   this.$data.page = val;
  //   this.getList();
  // }
  async deleteItem(payClientPhoneAmountId: string | number) {
    const isConfirm = await this.$confirm('确认删除该记录吗?', '提示', {type: 'warning'});
    if (!isConfirm) {
      return;
    }
    const res = await ApiPayClient.deletePayClientPhoneAmount(payClientPhoneAmountId);
    if (!res.isSuccess) {
      return;
    }
    this.$message.success('删除成功');
    this.getList();
  }
  async addSubmit() {
    const { payClientPhoneId } = this.$route.params;
    this.$data.addLoading = true;
    const res = await ApiPayClient.createPayClientPhoneAmount({
      ...this.$data.addForm,
      payClientPhoneId,
    });
    this.$data.addLoading = false;
    if (!res.isSuccess) {
      return;
    }
    this.getList();
    this.$message.success('创建成功');
    this.$data.addFormVisible = false;
  }
  goManageQrcode(payClientPhoneAmountId: string) {
    this.$router.push({ name: 'PayClientPhoneQrcodeList', params: { payClientPhoneAmountId } });
  }
}
</script>

<style scoped lang="less">
</style>