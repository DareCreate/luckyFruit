<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-main" v-loading="loading" element-loading-text="拼命加载中">
      <!--工具条-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-input v-model="filters.name" placeholder="角色名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addFormVisible = true">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <!--列表-->
      <el-table :data="roles" highlight-current-row @selection-change="selsChange"
                style="width: 100%;">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" width="60"></el-table-column>
        <el-table-column prop="roleName" label="角色名" sortable></el-table-column>
        <el-table-column prop="remark" label="备注" sortable></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini" @click="showEditDialog(scope.$index,scope.row)">编辑</el-button>
            <el-button type="danger" @click="delRole(scope.$index,scope.row)" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--工具条-->
      <el-col :span="24" class="toolbar">
        <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total"
                       style="float:right;">
        </el-pagination>
      </el-col>

      <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
        <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
          <el-form-item label="角色名" prop="roleName">
            <el-input v-model="editForm.roleName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input type="textarea" v-model="editForm.remark" :rows="2"></el-input>
          </el-form-item>
          <el-form-item label="权限">
            <el-tree
              :data="menus"
              show-checkbox
              node-key="id"
              :props="treeProps"
              ref="editMenuTree">
            </el-tree>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="editFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="editSubmit">提交</el-button>
        </div>
      </el-dialog>

      <!--新增界面-->
      <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
        <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
          <el-form-item label="角色名" prop="roleName">
            <el-input v-model="addForm.roleName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input type="textarea" v-model="addForm.remark" :rows="8"></el-input>
          </el-form-item>
          <el-form-item label="权限">
            <el-tree
              :data="menus"
              show-checkbox
              node-key="id"
              :props="treeProps"
              ref="addMenuTree">
            </el-tree>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="addFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
        </div>
      </el-dialog>

    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
// import ApiUser from '../../services/user';
import ApiRole from '@/services/admin/role';
import ApiMenu from '@/services/admin/menu';
import { IUserRoleInfoItem } from '@/services/apiDataType';
import { PROJECT_TYPE } from '@/app/config';
@Component
export default class UserManage extends Vue {
  data() {
    return {
        filters: {
          name: '',
        },
        roles: [],
        total: 0,
        page: 1,
        limit: 10,
        loading: false,
        sels: [], // 列表选中列
        treeProps: {
          children: 'children',
            label: 'text',
        },
        // 编辑相关数据
        menus: [],
        menuIds: [], // 角色拥有的权限
        editFormVisible: false, // 编辑界面是否显示
        editLoading: false,
        editFormRules: {
            name: [{required: true, message: '请输入书名', trigger: 'blur'}],
            author: [{required: true, message: '请输入作者', trigger: 'blur'}],
            description: [{required: true, message: '请输入简介', trigger: 'blur'}],
        },
        editForm: {},
        // 新增相关数据
        addFormVisible: false,
        addLoading: false,
        addFormRules: {
            roleName: [{required: true, message: '请输入角色名', trigger: 'blur'}],
            remark: [{required: true, message: '请输入备注', trigger: 'blur'}],
        },
        addForm: {},
    };
  }
  handleCurrentChange(val: number) {
    this.$data.page = val;
    this.getList();
  }
  reLoadInfo() {
    this.$data.total = 0;
    this.$data.page = 1;
    this.getList();
  }
  async getList() {
    const params = {
        pageNum: this.$data.page - 1,
        pageSize: 10,
        name: this.$data.filters.name,
    };
    this.$data.loading = true;
    const res = await ApiRole.findList(params);
    this.$data.loading = false;
    if (!res.isSuccess) {
        return;
    }
    const result = res.data;
    this.$data.total = result.total;
    this.$data.roles = res.data.data;
  }
  addSubmit() {
    (this.$refs.addForm as any).validate(async (valid: boolean) => {
      if (!valid) {
        return;
      }
      this.$data.addLoading = true;
      const params = Object.assign({}, this.$data.addForm, {
        menuIds: this.getMenuIds('add'),
      });
      const res = await ApiRole.add(params);
      this.$data.addLoading = false;
      if (!res.isSuccess) {
        return;
      }
      this.$message.success('新增成功');
      this.resetAddForm();
      this.$data.addFormVisible = false;
      this.reLoadInfo();
    });
  }
  async showEditDialog(index: number, row: IUserRoleInfoItem) {
    const { roleId } = row;
    this.$data.editFormVisible = true;
    const userMenuRes = await ApiMenu.menuIdsByRoleId(roleId);
    this.$data.editForm = Object.assign({}, row);
    if (!userMenuRes.isSuccess) {
      return;
    }
    // this.$data.menuIds = userMenuRes.data;
    this.setMenuIds('edit', userMenuRes.data);
  }
  editSubmit() {
    (this.$refs.editForm as any).validate(async (valid: boolean) => {
      if (!valid) {
        return;
      }
      this.$data.editLoading = true;
      const params = Object.assign({}, this.$data.editForm, {
        menuIds: this.getMenuIds('edit'),
      });
      const res = await ApiRole.update(params);
      this.$data.editLoading = false;
      if (!res.isSuccess) {
        return;
      }
      this.$message.success('修改成功');
      this.$data.editFormVisible = false;
      this.resetEditForm();
      this.reLoadInfo();
    });
  }
  batchDeleteRole() {
    const ids = this.$data.sels.map((item: IUserRoleInfoItem) => item.roleId);
    this.$confirm('确认删除选中记录吗？', '提示', {
      type: 'warning',
    }).then(async () => {
      const res = await ApiRole.removeBatch(ids);
      if (!res.isSuccess) {
        return;
      }
      this.$message.success('删除成功');
      this.reLoadInfo();
    });
  }
  delRole(index: number, row: IUserRoleInfoItem) {
    this.$confirm('确认删除该记录吗?', '提示', {type: 'warning'})
      .then(async () => {
        this.$data.loading = true;
        const res = await ApiRole.remove(row.roleId);
        this.$data.loading = false;
        if (!res.isSuccess) {
          return;
        }
        this.$message.success('删除成功');
        this.reLoadInfo();
      });
  }
  async getAllMenu() {
    const allMenures = await ApiMenu.getMenus(PROJECT_TYPE);
    if (!allMenures.isSuccess) {
      return;
    }
    this.$data.menus = allMenures.data;
  }
  /** 获取选中、半选中节点 */
  getMenuIds(refKey: 'add' | 'edit') {
    const treeRed = this.$refs[`${refKey}MenuTree`] as any;
    if (!treeRed) {
      return [];
    }
    return treeRed.getCheckedKeys().concat(treeRed.getHalfCheckedKeys());
  }
  /**
   * @param:(keys)
   * 1. 勾选节点的 key 的数组
   * 2. boolean 类型的参数，若为 true 则仅设置叶子节点的选中状态，默认值为 false
   */
  setMenuIds(refKey: 'add' | 'edit', keys: any) {
    const treeRed = this.$refs[`${refKey}MenuTree`] as any;
    if (!treeRed) {
      return;
    }
    treeRed.setCheckedKeys(keys, true);
  }
  mounted() {
    this.resetAddForm();
    this.resetEditForm();
    this.getAllMenu();
    this.reLoadInfo();
  }
  resetAddForm() {
    this.$data.addForm = {
      roleName: '',
      name: '',
      author: '',
      publishAt: '',
      description: '',
    };
    this.setMenuIds('add', []);
  }
  resetEditForm() {
    this.$data.editForm = {
      id: 0,
      roleName: '',
      name: '',
      author: '',
      publishAt: '',
      description: '',
    };
  }
  // 选项改变
  selsChange(sels: IUserRoleInfoItem[]) {
    this.$data.sels = sels;
  }
}
</script>

<style scoped lang="less">
</style>