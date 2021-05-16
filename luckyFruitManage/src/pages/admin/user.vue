<template>
  <el-row>
    <el-col :span="24" class="warp-main" v-loading="loading" element-loading-text="拼命加载中">
      <!--工具条-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-input
              v-model="filters.name"
              placeholder="用户名/姓名/昵称"
              style="min-width: 240px;"
            >
            <!-- @keyup.enter.native="handleSearch" -->
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addFormVisible = true">添加</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <el-table :data="users" highlight-current-row v-loading="loading" style="width: 100%;">
        <el-table-column type="index" width="60">
        </el-table-column>
        <el-table-column prop="userId" label="用户id" width="80">
        </el-table-column>
        <el-table-column prop="name" label="名称" width="120" sortable>
        </el-table-column>
        <el-table-column prop="mobile" label="电话" width="120" sortable>
        </el-table-column>
        <el-table-column prop="username" label="登陆名" width="120" sortable>
        </el-table-column>
        <el-table-column prop="sex" label="性别" width="100" :formatter="sexFormatter" sortable>
        </el-table-column>
        <el-table-column prop="email" label="邮箱" min-width="160" sortable>
        </el-table-column>
        <el-table-column prop="birth" label="出生日期" min-width="160" sortable>
        </el-table-column>
        <el-table-column prop="liveAddress" label="地址" sortable>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini" @click="showEditDialog(scope.$index,scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="removeUser(scope.$index,scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--工具条-->
      <el-col :span="24" class="toolbar">
        <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total"
                       style="float:right;">
        </el-pagination>
      </el-col>
      <!-- 添加界面 -->
      <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
        <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
          <el-form-item label="登陆名" prop="username">
            <el-input v-model="addForm.username" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="addForm.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="名称" prop="name">
            <el-input v-model="addForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="mobile">
            <el-input v-model="addForm.mobile" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="addForm.sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="出生日期" prop="birth">
            <el-date-picker type="date" placeholder="出生日期" v-model="addForm.birth"></el-date-picker>
          </el-form-item>
          <el-form-item label="地址" prop="liveAddress">
            <el-input v-model="addForm.addr" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input type="email" v-model="addForm.email"></el-input>
          </el-form-item>
          <el-form-item label="角色">
            <el-checkbox-group v-model="addForm.roleIds">
              <el-checkbox v-for="role in roles" :label="role.roleId" :key="role.roleId">
                {{role.roleName}}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="addFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
        </div>
      </el-dialog>
      <!-- 编辑界面 -->
      <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
        <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
          <el-form-item label="用户名" prop="roleName">
            <el-input v-model="editForm.username" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="editFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="editSubmit" :loading="addLoading">提交</el-button>
        </div>
      </el-dialog>

    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ApiUser from '@/services/admin/user';
import ApiRole from '@/services/admin/role';
import { IUserListItem } from '@/services/apiDataType';
@Component
export default class UserManage extends Vue {
  data() {
    return {
      filters: {
        name: '',
      },
      loading: false,
      users: [],
      roles: [],
      total: 0,
      page: 1,
      limit: 10,
      // 修改表单数据
      editFormVisible: false,
      editLoading: false,
      editFormRules: {
        username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        password: [{required: true, message: '请输入作者', trigger: 'blur'}],
        name: [{required: true, message: '请输入姓名', trigger: 'blur'}],
      },
      editForm: {},
      // 新增表单数据
      addFormVisible: false,
      addLoading: false,
      addFormRules: {
        roleName: [{required: true, message: '请输入角色名称', trigger: 'blur'}],
        roleSign: [{required: true, message: '请输入角色标识', trigger: 'blur'}],
      },
      addForm: {},
    };
  }
  sexFormatter(row: any) {
    const sex = row.sex;
    if (sex === 0) {
      return '女';
    }
    if (sex === 1) {
      return '男';
    }
    return '未知';
  }
  handleCurrentChange(val: number) {
    this.$data.page = val;
    this.getUserList();
  }
  reLoadInfo() {
    this.$data.total = 0;
    this.$data.page = 1;
    this.getUserList();
  }
  // 获取用户列表
  async getUserList() {
    const params = {
      pageNum: this.$data.page - 1,
      pageSize: 10,
      name: this.$data.filters.name,
    };
    this.$data.loading = true;
    const res = await ApiUser.findList(params);
    this.$data.loading = false;
    if (!res.isSuccess) {
      return;
    }
    const result = res.data;
    this.$data.total = result.total;
    this.$data.users = result.data;
  }
  async addSubmit() {
    (this.$refs.addForm as any).validate(async (valid: boolean) => {
      if (!valid) {
        return;
      }
      this.$data.addLoading = true;
      const params = this.$data.addForm;
      const res = await ApiUser.addUser(params);
      this.$data.addLoading = false;
      if (!res.isSuccess) {
        return;
      }
      this.$data.addFormVisible = false;
      this.$message.success('新增成功');
      this.resetAddForm();
      this.getUserList();
    });
  }
  async showEditDialog(index: number, row: IUserListItem) {
    this.$data.editFormVisible = true;
    this.$data.editForm = Object.assign({}, row);
    const res = await ApiRole.findById(row.userId);
    if (!res.isSuccess) {
      return;
    }
    this.$data.editForm.roleIds = res.data;
  }
  async editSubmit() {
    (this.$refs.editForm as any).validate(async (valid: boolean) => {
      if (!valid) {
        return;
      }
      this.$data.editLoading = true;
      const params = Object.assign({}, this.$data.editForm);
      const res = await ApiUser.editUser(params);
      this.$data.editLoading = false;
      this.$data.editFormVisible = !res.isSuccess;
      this.reLoadInfo();
    });
  }
  async removeUser(index: number, row: IUserListItem) {
    const isConfirm = await this.$confirm('确认删除该记录吗?', '提示', {type: 'warning'});
    if (!isConfirm) {
      return;
    }
    const res = await ApiUser.removeUser(row.userId);
    if (!res.isSuccess) {
      return;
    }
    this.$message.success('删除成功');
    this.reLoadInfo();
  }
  mounted() {
    this.resetAddForm();
    this.resetEditForm();
    this.reLoadInfo();
    this.getRolesInfo();
  }
  async getRolesInfo() {
    const res = await ApiRole.findList({
      pageSize: 999,
      pageNum: 0,
      name: '',
    });
    if (!res.isSuccess) {
      return;
    }
    this.$data.roles = res.data.data;
  }
  resetAddForm() {
    this.$data.addForm = {
      username: '',
      name: '',
      sex: 1,
      password: '',
      email: '',
      mobile: '',
      birth: new Date(),
      liveAddress: '',
      roleIds: [],
    };
  }
  resetEditForm() {
    this.$data.editForm = {
      roleName: '',
      roleSign: '',
      remark: '',
      mobile: '',
      liveAddress: '',
      roleIds: [],
      sex: 1,
    };
  }
}
</script>

<style scoped lang="less">
</style>