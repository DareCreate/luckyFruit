<template>
  <el-row>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-button @click="addFormVisible = true" type="primary">添加</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <el-table :data="tenantList" highlight-current-row v-loading="loading" style="width: 100%;">
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="id" label="id" >
      </el-table-column>
      <el-table-column prop="userName" label="用户名" >
      </el-table-column>
      <el-table-column prop="tenantName" label="商户名" >
      </el-table-column>
      <el-table-column prop="remark" label="备注" >
      </el-table-column>
      <el-table-column prop="expireTime" :formatter="$app.formatter.dateSecTime" label="过期时间" >
      </el-table-column>
      <el-table-column label="操作" width="500">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="showCreateRootUserDisalog(scope.row.id)">创建初始用户</el-button>
          <el-button size="mini" @click="createRootMenu(scope.row.id)">创建商户菜单</el-button>
          <el-button size="mini" @click="showMenuDialog(scope.row)">编辑菜单</el-button>
          <el-button size="mini" type="warning" @click="showEditDialog(scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="deleteItem(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--新增界面-->
    <el-dialog title="新增商户" :visible.sync="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="addForm.userName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商户名" prop="tenantName">
          <el-input v-model="addForm.tenantName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="addForm.remark" :rows="8"></el-input>
        </el-form-item>
        <el-form-item label="过期时间" prop="expireTime">
          <el-date-picker
            v-model="addForm.expireTime"
            type="datetime"
            value-format="timestamp"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>
    <!--修改界面-->
    <el-dialog title="修改商户" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="editForm.userName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="商户名" prop="tenantName">
          <el-input v-model="editForm.tenantName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="editForm.remark" :rows="8"></el-input>
        </el-form-item>
        <el-form-item label="过期时间" prop="expireTime">
          <el-date-picker
            v-model="editForm.expireTime"
            type="datetime"
            value-format="timestamp"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>
    <!--商户菜单管理-->
    <el-dialog title="商户菜单管理" :visible.sync="tenantMenuDialogVisible" :close-on-click-modal="true">
      <el-form label-width="80px">
        <el-form-item label="权限">
          <el-tree
            :data="menuList"
            show-checkbox
            node-key="id"
            :props="treeProps"
            ref="menuTree">
          </el-tree>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="tenantMenuDialogVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editTenantMenu" :loading="editMenuLoading">提交</el-button>
      </div>
    </el-dialog>
    <!-- 创建初始用户 -->
    <el-dialog title="创建初始用户" :visible.sync="createRootUserDialogVisible" :close-on-click-modal="true">
      <el-form label-width="80px">
        <el-form-item label="登陆名" prop="username">
            <el-input v-model="createUserForm.username" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="createUserForm.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="名称" prop="name">
            <el-input v-model="createUserForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="mobile">
            <el-input v-model="createUserForm.mobile" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="createUserForm.sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="角色">
            <el-checkbox-group v-model="roleIds">
              <el-checkbox v-for="role in roles" :label="role.roleId" :key="role.roleId">
                {{role.roleName}}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="createRootUserDialogVisible = false">取消</el-button>
        <el-button type="primary" @click.native="createRootUser" :loading="createRootUserLoading">提交</el-button>
      </div>
    </el-dialog>

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
import ApiTenant from '@/services/admin/tenant';
import ApiMenu from '@/services/admin/menu';
import ApiRole from '@/services/admin/role';
import { setTimeout } from 'timers';
import { PROJECT_TYPE } from '@/app/config';
@Component
export default class TenantList extends Vue {
  data() {
    return {
      filters: {
        name: '',
      },
      tenantList: [],
      loading: true,
      total: 0,
      page: 1,
      limit: 10,
      // add
      addForm: {},
      addFormVisible: false,
      addLoading: false,
      addFormRules: {},
      // edit
      editForm: {},
      editFormVisible: false,
      editLoading: false,
      editFormRules: {},
      // menu
      editTenantId: null,
      menuList: [],
      menuIds: null,
      tenantMenuDialogVisible: false,
      editMenuLoading: false,
      treeProps: {
        children: 'children',
        label: 'text',
      },
      // create user
      roleIds: [],
      createRootUserDialogVisible: false,
      createUserForm: {
        sex: 1,
      },
      createRootUserLoading: false,
      roles: [],
    };
  }
  async getList() {
    // const params = {
    //   pageNum: this.$data.page - 1,
    //   pageSize: 10,
    // };
    this.$data.loading = true;
    const res = await ApiTenant.tenantList();
    this.$data.loading = false;
    if (!res.isSuccess) {
      return;
    }
    this.$data.tenantList = res.data;
  }
  async showEditDialog(row: any) {
    this.$data.editFormVisible = true;
    this.$data.editForm = Object.assign({}, row, {
      expireTime: row.expireTime * 1000,
    });
  }
  async showMenuDialog(row: any) {
    this.$data.menuIds = row.menuIds;
    this.$data.editTenantId = row.id;
    this.$data.tenantMenuDialogVisible = true;
    this.$nextTick(() => {
      const treeRed = this.$refs[`menuTree`] as any;
      if (!treeRed) {
        return;
      }
      treeRed.setCheckedKeys(row.menuIds || [], false);
    });
  }
  async editTenantMenu() {
    const { editTenantId } = this.$data;
    const treeRed = this.$refs[`menuTree`] as any;
    if (!treeRed) {
      return [];
    }
    const menuIds = treeRed.getCheckedKeys(); //  treeRed.getHalfCheckedKeys().concat();
    const params = {
      menuIds,
      tenantId: +editTenantId,
    };
    this.$data.editMenuLoading = true;
    const res = await ApiTenant.tenantMenuEdit(params);
    this.$data.editMenuLoading = false;
    if (!res.isSuccess) {
      return;
    }
    this.getList();
    this.$data.tenantMenuDialogVisible = false;
    this.$message.success('修改成功');
  }
  async addSubmit() {
    if (this.$data.addForm.expireTime == null) {
      return;
    }
    const params = {
      ...this.$data.addForm,
      expireTime: this.$data.addForm.expireTime / 1000,
    };
    this.$data.addLoading = true;
    const res = await ApiTenant.createTenant(params);
    this.$data.addLoading = false;
    if (!res.isSuccess) {
      return;
    }
    this.$data.addFormVisible = false;
    this.$message.success('创建成功');
    this.getList();
  }
  async editSubmit() {
    if (this.$data.editForm.expireTime == null) {
      return;
    }
    const params = {
      ...this.$data.editForm,
      expireTime: this.$data.editForm.expireTime / 1000,
    };
    this.$data.editLoading = true;
    const res = await ApiTenant.editTenant(params);
    this.$data.editLoading = false;
    if (!res.isSuccess) {
      return;
    }
    this.$data.editFormVisible = false;
    this.$message.success('修改成功');
    this.getList();
  }
  async deleteItem(teanantId: number) {
    const isConfirm = await this.$confirm('确认删除该记录吗?', '提示', {type: 'warning'});
    if (!isConfirm) {
      return;
    }
    const res = await ApiTenant.deleteTenant(teanantId);
    if (!res.isSuccess) {
      return;
    }
    this.$message.success('删除成功');
    this.reLoadInfo();
  }
  async createRootMenu(tenantId: number | string) {
    const res = await ApiTenant.createTenantMenu(tenantId);
    if (!res.isSuccess) {
      return;
    }
    this.$message.success('创建成功');
  }
  showCreateRootUserDisalog(tenantId: number) {
    this.$data.createRootUserDialogVisible = true;
    this.$data.editTenantId = tenantId;
    this.getTenantRolesInfo(tenantId);
  }
  async createRootUser() {
    const { roleIds, editTenantId } = this.$data;
    const params = {
      ...this.$data.createUserForm,
      roleIds,
      tenantId: editTenantId,
    };
    const res = await ApiTenant.createTenantUser(params);
    if (!res.isSuccess) {
      return;
    }
    this.$message.success('创建成功');
    this.$data.createRootUserDialogVisible = false;
  }
  async getTenantRolesInfo(tenantId: number | string) {
    const res = await ApiTenant.tenantRoleList(tenantId);
    if (!res.isSuccess) {
      return;
    }
    this.$data.roles = res.data;
  }
  async getMenuList() {
    const res = await ApiMenu.getMenus(PROJECT_TYPE);
    if (!res.isSuccess) {
      return;
    }
    this.$data.menuList = res.data;
  }
  mounted() {
    this.reLoadInfo();
    this.getMenuList();
  }
  reLoadInfo() {
    this.getList();
  }
  handleCurrentChange(val: number) {
    this.$data.page = val;
    this.getList();
  }
}
</script>

<style scoped lang="less">

</style>