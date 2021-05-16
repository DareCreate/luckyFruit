<template>
  <el-row>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-button @click="goAddPage" type="primary">添加app客户端</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <el-table :data="list" highlight-current-row v-loading="loading" style="width: 100%;">
      <el-table-column prop="id" label="id" >
      </el-table-column>
      <el-table-column prop="appId" label=" 账号id">
      </el-table-column>
      <el-table-column prop="tenantId" label="商户id">
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="goManageClientPhone(scope.row.id)">管理手机端</el-button>
          <el-button size="mini" type="warning" @click="goEditPage(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deletePayClient(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-col :span="24" class="toolbar">
      <el-pagination
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :page-size="10"
        :total="total"
        style="float:right;"
      >
      </el-pagination>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ApiPayClient from '@/services/pay/payClient';

@Component
export default class PayClientList extends Vue {
  data() {
    return {
      filters: {
        name: '',
      },
      list: [],
      loading: false,
      total: 0,
      page: 1,
      limit: 10,
    };
  }
  mounted() {
    this.getList();
  }
  goAddPage() {
    const { tenantId } = this.$route.params;
    this.$router.push({ name: 'CreatePayClient', params: { tenantId } });
  }
  goEditPage(payClientId: string) {
    this.$router.push({ name: 'EditPayClient', params: { payClientId } });
  }
  async getList() {
    const { tenantId } = this.$route.params;
    this.$data.loading = true;
    const res = await ApiPayClient.payClientList(tenantId);
    this.$data.loading = false;
    if (!res.isSuccess || res.data == null) {
      return;
    }
    // this.$data.total = res.data.total;
    this.$data.list = res.data;
  }
  handleCurrentChange(val: number) {
    this.$data.page = val;
    this.getList();
  }
  async deletePayClient(payClientId: number | string) {
    const isConfirm = await this.$confirm('确认删除该记录吗?', '提示', {type: 'warning'});
    if (!isConfirm) {
      return;
    }
    const res = await ApiPayClient.deletePayClient(payClientId);
    if (!res.isSuccess) {
      return;
    }
    this.$message.success('删除成功');
    this.getList();
  }
  goManageClientPhone(payClientId: string) {
    this.$router.push({ name: 'PayClientPhoneList', params: { payClientId } });
  }
}
</script>

<style scoped lang="less">
</style>