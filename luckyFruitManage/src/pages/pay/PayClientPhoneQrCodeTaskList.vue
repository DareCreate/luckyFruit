<template>
  <el-row>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item>
          <el-button @click="goAddPage" type="primary">添加二维码任务</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <el-table :data="list" highlight-current-row v-loading="loading" style="width: 100%;">
      <el-table-column prop="id" label="id" >
      </el-table-column>
      <el-table-column prop="amount" label="金额">
      </el-table-column>
      <el-table-column prop="buildQrCodeNum" label="生成二维码数量">
      </el-table-column>
      <el-table-column prop="buildQrCodeTaskStatus" label="任务状态">
      </el-table-column>
      <el-table-column prop="payType" label="二维码类型">
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <!-- <el-button size="mini" type="warning" @click="goEditPage(scope.row.id)">编辑</el-button> -->
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
  </el-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ApiPayClient from '@/services/pay/payClient';

@Component
export default class PayClientPhoneQrCodeTaskList extends Vue {
  data() {
    return {
      // filters: {
      //   name: '',
      // },
      list: [],
      loading: false,
      // total: 0,
      // page: 1,
      // limit: 10,
    };
  }
  mounted() {
    this.getList();
  }
  goAddPage() {
    const { payClientPhoneId } = this.$route.params;
    this.$router.push({ name: 'CreatePayClientPhoneQrCodeTask', params: { payClientPhoneId } });
  }
  async getList() {
    // const params = {
    //   pageNum: this.$data.page - 1,
    //   pageSize: 10,
    // };
    const { payClientPhoneId } = this.$route.params;
    this.$data.loading = true;
    const res = await ApiPayClient.getQrcodeTaskList(payClientPhoneId);
    this.$data.loading = false;
    if (!res.isSuccess) {
      return;
    }
    // this.$data.total = res.data.total;
    this.$data.list = res.data;
  }
  handleCurrentChange(val: number) {
    this.$data.page = val;
    this.getList();
  }
  async deleteItem(taskId: string | number) {
    const isConfirm = await this.$confirm('确认删除该记录吗?', '提示', {type: 'warning'});
    if (!isConfirm) {
      return;
    }
    const res = await ApiPayClient.deletePayClientPhoneQrCodeTask(taskId);
    if (!res.isSuccess) {
      return;
    }
    this.$message.success('删除成功');
    this.getList();
  }
}
</script>

<style scoped lang="less">
</style>