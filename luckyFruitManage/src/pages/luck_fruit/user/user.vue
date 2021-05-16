<template>
  <el-row>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.id" placeholder="账户id" style="min-width: 240px;">
            <!-- @keyup.enter.native="handleSearch" -->
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="getUser" type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <el-table :data="users" highlight-current-row v-loading="loading" style="width: 100%;">
      <el-table-column type="index" width="60"></el-table-column>
      <el-table-column prop="id" label="UID"></el-table-column>
      <el-table-column prop="balance" label="余额" :formatter="formatBalance"></el-table-column>
      <el-table-column prop="pokerChips" label="筹码"></el-table-column>
      <el-table-column prop="winChips" label="备用池"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="showOperateDialog(scope.$index,scope.row)">操作</el-button>
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
      ></el-pagination>
    </el-col>
    <!-- 编辑界面 -->
    <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false" width="30%">
      <el-form :model="editForm" label-width="80px" ref="editForm">
        <el-form-item label="增加余额" prop="addBalance">
          <el-input v-model="editForm.addBalance" auto-complete="off"></el-input>
        </el-form-item>
        <el-button type="primary" @click.native="addBalance">提交</el-button>
      </el-form>
    </el-dialog>
  </el-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ApiUser from '@/services/luck_fruit/user';

@Component
export default class User extends Vue {
  data() {
    return {
      filters: {
        id: null,
      },
      users: [],
      loading: true,
      total: 0,
      page: 1,
      limit: 10,
      editFormVisible: false,
      editForm: {},
    };
  }

  mounted() {
    this.getUser();
  }

  async getUser() {
    const param = {
      pageNum: this.$data.page - 1,
      pageSize: 10,
      id: this.$data.filters.id,
    };
    const res = await ApiUser.getUserList(param);

    if (!res.isSuccess) {
      return;
    }
    this.$data.users = res.data.data;
    this.$data.loading = false;
  }

  async addBalance() {
    const param = {
      userId: this.$data.editForm.id,
      balance: this.$data.editForm.addBalance * 100,
    };

    const res = await ApiUser.addUserBalance(param);
    if (!res.isSuccess) {
      return;
    }

    this.$data.editFormVisible = false;
    this.$message.success('增加成功');
    this.getUser();
  }

  handleCurrentChange(val: number) {
    this.$data.page = val;
    this.getUser();
  }

  async showOperateDialog(index: number, row: any) {
    this.$data.editFormVisible = true;
    this.$data.editForm = Object.assign({}, row);
  }

  formatBalance(row: any, column: any) {
    const value = row[column.property];
    return value / 100;
  }
}
</script>