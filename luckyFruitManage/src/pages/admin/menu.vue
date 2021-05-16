<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-main" v-loading="loading" element-loading-text="拼命加载中">
      <!--工具条-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true">
          <el-form-item>
            <el-button type="primary" @click="showAddDialog(0)">添加</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-col>
    <!--菜单表格-->
    <el-col :span="24" class="warp-main" v-loading="loading" element-loading-text="拼命加载中">
      <tree-table
        :data="menudata"
        ref="treeTable"
        v-loading="loading"
        :columns="columns"
        border
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column label="类型" prop="object.type">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.object.type == null"></el-tag>
            <el-tag v-if="scope.row.object.type == $app.typeDef.menuType.CATALOG">目录</el-tag>
            <el-tag v-if="scope.row.object.type == $app.typeDef.menuType.MENU">菜单</el-tag>
            <el-tag v-if="scope.row.object.type == $app.typeDef.menuType.MODULE">模块</el-tag>
            <el-tag v-if="scope.row.object.type == $app.typeDef.menuType.API">操作</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="路径" prop="object.url"></el-table-column>
        <el-table-column label="API类型" prop="object.requestType"></el-table-column>
        <el-table-column label="项目类型" prop="object.projectType" :formatter="projectForMatter"></el-table-column>
        <el-table-column label="是否隐藏" prop="object.hidden" :formatter="hiddeForMatter"></el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-button size="mini" @click="showAddDialog(scope.row.id)">增加</el-button>
            <el-button size="mini" @click="showEditDialog(scope.$index,scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="remove(scope.$index,scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </tree-table>
      <!-- 添加界面 -->
      <el-dialog title="编辑" :visible.sync="addFormVisible" :close-on-click-modal="false">
        <el-form :model="addForm" label-width="80px" :rules="editFormRules" ref="addForm">
          <el-form-item label="类型" prop="type">
            <el-radio-group v-model="addForm.type">
              <el-radio :label="$app.typeDef.menuType.CATALOG">目录</el-radio>
              <el-radio :label="$app.typeDef.menuType.MENU">菜单</el-radio>
              <el-radio :label="$app.typeDef.menuType.MODULE">模块</el-radio>
              <el-radio :label="$app.typeDef.menuType.API">操作</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="名称" prop="name">
            <el-input v-model="addForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item v-show="addForm.type == $app.typeDef.menuType.MENU ||  addForm.type == $app.typeDef.menuType.API" label="路径" prop="url">
            <el-input v-model="addForm.url" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item v-if="addForm.type == $app.typeDef.menuType.CATALOG" label="图标名" prop="icon">
            <el-input v-model="addForm.icon" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item
            v-if="addForm.type == $app.typeDef.menuType.CATALOG || addForm.type == $app.typeDef.menuType.MENU"
            label="是否隐藏"
            prop="hidden"
          >
            <el-radio-group v-model="addForm.hidden">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="addForm.type == $app.typeDef.menuType.API" label="api类型" prop="requestType">
            <el-radio-group v-model="addForm.requestType">
              <el-radio
                v-for="item in requestItems"
                :label="item.key"
                :key="item.key"
              >
                {{item.value}}
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="项目" prop="projectType">
            <el-radio-group v-model="addForm.projectType">
              <el-radio
                v-for="item in $app.typeDef.projectType"
                :label="item"
                :key="item"
              >
                {{$app.typeDef.projectTypeLabMap[item]}}
              </el-radio>
            </el-radio-group>
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
          <el-form-item label="类型" prop="type">
            <el-radio-group v-model="editForm.type">
              <el-radio :label="$app.typeDef.menuType.CATALOG">目录</el-radio>
              <el-radio :label="$app.typeDef.menuType.MENU">菜单</el-radio>
              <el-radio :label="$app.typeDef.menuType.MODULE">模块</el-radio>
              <el-radio :label="$app.typeDef.menuType.API">操作</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="名称" prop="name">
            <el-input v-model="editForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item v-show="editForm.type == $app.typeDef.menuType.MENU ||  editForm.type == $app.typeDef.menuType.API" label="路径" prop="url">
            <el-input v-model="editForm.url" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item v-if="editForm.type == $app.typeDef.menuType.CATALOG" label="图标名" prop="icon">
            <el-input v-model="editForm.icon" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item
            v-if="editForm.type == $app.typeDef.menuType.CATALOG || editForm.type == $app.typeDef.menuType.MENU"
            label="是否隐藏"
            prop="hidden"
          >
            <el-radio-group v-model="editForm.hidden">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="editForm.type == $app.typeDef.menuType.API" label="api类型" prop="requestType">
            <el-radio-group v-model="editForm.requestType">
              <el-radio
                v-for="item in requestItems"
                :label="item.key"
                :key="item.key"
              >
                {{item.value}}
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="项目" prop="projectType">
            <el-radio-group v-model="editForm.projectType">
              <el-radio
                v-for="item in $app.typeDef.projectType"
                :label="item"
                :key="item"
              >
                {{$app.typeDef.projectTypeLabMap[item]}}
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- <el-form-item label="排序" prop="icon">
            <el-input v-model="editForm.orderNum" auto-complete="off"></el-input>
          </el-form-item> -->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="editFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
        </div>
      </el-dialog>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import treeTable from '../../components/TreeTable/index.vue';
import ApiMenu from '@/services/admin/menu';
import { projectTypeLabMap } from '@/app/typeDef';
import { PROJECT_TYPE } from '@/app/config';
@Component({
  components: {
    treeTable,
  },
})
export default class MenuManage extends Vue {
  data() {
    return {
      loading: false,
      requestItems: [
        {key: 'GET', value: 'GET'},
        {key: 'POST', value: 'POST'},
        {key: 'PUT', value: 'PUT'},
        {key: 'DELETE', value: 'DELETE'},
      ],
      columns: [
        {
          text: '名称',
          value: 'text',
          width: 200,
        },
      ],
      menudata: [],
      // 添加数据
      addFormVisible: false,
      addLoading: false,
      addForm: {},
      addFormRules: {
        name: [{required: true, message: '请输入名称', trigger: 'blur'}],
      },
      // 编辑数据
      editFormRules: {
        name: [{required: true, message: '请输入名称', trigger: 'blur'}],
      },
      editFormVisible: false,
      editForm: {},
      editLoading: false,
    };
  }
  hiddeForMatter(row: any): string {
    if (row.object.type === this.$app.typeDef.menuType.CATALOG) {
      return row.object.hidden ? '是' : '否';
    }
    if (row.object.type === this.$app.typeDef.menuType.MENU) {
      return row.object.hidden ? '是' : '否';
    }
    return '';
  }
  projectForMatter(row: any): string {
    return projectTypeLabMap[row.object.projectType];
  }
  handleCurrentChange(val: number) {
    this.$data.page = val;
    this.getUserList();
  }
  reLoadInfo() {
    this.getUserList();
  }
  // 获取用户列表
  async getUserList() {
    const res = await ApiMenu.getMenus(PROJECT_TYPE);
    if (!res.isSuccess) {
      return;
    }
    const expandedData = (this.$refs.treeTable as any).getExpandedData();
    this.$data.menudata = res.data;
    this.$nextTick(() => {
      (this.$refs.treeTable as any).setExpandedData(expandedData);
    });
  }
  mounted() {
    this.resetAddForm();
    this.reLoadInfo();
  }
  showAddDialog(parentId: number) {
    this.$data.addForm.parentId = parentId;
    this.$data.addFormVisible = true;
  }
  addSubmit() {
    (this.$refs.addForm as any).validate(async (valid: boolean) => {
      if (!valid) {
        return;
      }
      this.$data.loading = true;
      const res = await ApiMenu.addRoleMenu(this.$data.addForm);
      this.$data.loading = false;
      if (!res.isSuccess) {
        return;
      }
      this.$message.success('新增成功');
      this.$data.addFormVisible = false;
      this.resetAddForm();
      this.reLoadInfo();
    });
  }
  // TODO: row type add
  showEditDialog(index: number, row: any) {
    this.$data.editFormVisible = true;
    this.$data.editForm = Object.assign({}, row.object);
  }
  editSubmit() {
    (this.$refs.editForm as any)
      .validate(async (valid: boolean) => {
        if (!valid) {
          return;
        }
        this.$data.editLoading = true;
        const res = await ApiMenu.editMenu(this.$data.editForm);
        this.$data.editLoading = false;
        if (!res.isSuccess) {
          return;
        }
        this.$data.editFormVisible = false;
        this.$message.success('修改成功');
        this.setSetEditForm();
        this.reLoadInfo();
      });
  }
  // TODO: row type add
  remove(index: number, row: any) {
    this.$confirm('确认删除该记录吗?', '提示', {type: 'warning'})
      .then(async () => {
        const { id } = row;
        const res = await ApiMenu.remove(id);
        if (!res.isSuccess) {
          return;
        }
        this.$message.success('删除成功');
        this.reLoadInfo();
      });
  }
  resetAddForm() {
    this.$data.addForm = {
      perms: [],
      hidden: false,
      type: this.$app.typeDef.menuType.CATALOG,
      projectType: PROJECT_TYPE,
    };
  }
  setSetEditForm() {
    this.$data.editForm = {
      perms: [],
      hidden: false,
      type: this.$app.typeDef.menuType.CATALOG,
    };
  }
}
</script>

<style scoped lang="less">
</style>