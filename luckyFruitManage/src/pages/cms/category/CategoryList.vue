<template>
  <el-row>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item>
          <router-link :to="{name: 'CreateCategory'}">
            <el-button type="primary">添加类目</el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </el-col>

    <el-table :data="categoryList" highlight-current-row v-loading="loading" style="width: 100%;">
      <el-table-column prop="id" label="id" >
      </el-table-column>
      <el-table-column prop="categoryName" label="类别名称" >
      </el-table-column>
      <el-table-column prop="systemType" label="系统类型" sortable>
      </el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button v-if="scope.row.viewType === 'HIDDEN'" size="mini" type="primary" @click="showCategory(scope.row.id)">显示</el-button>
          <el-button v-else size="mini" type="info" @click="hiddenCategory(scope.row.id)">隐藏</el-button>
          <el-button size="mini" type="warning" @click="goEditPage(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="primary" @click="goManageArticle(scope.row.id)">管理文章</el-button>
          <el-button size="mini" type="danger" @click="deleteCategory(scope.row.id)">删除</el-button>
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
import ApiCategory from '@/services/cms/category';
@Component
export default class CategoryList extends Vue {
  data() {
    return {
      categoryList: [],
      loading: true,
      total: 0,
      page: 1,
      limit: 10,
    };
  }
  async getList() {
    const params = {
      pageNum: this.$data.page - 1,
      pageSize: 10,
    };
    this.$data.loading = true;
    const res = await ApiCategory.categoryList(params);
    this.$data.loading = false;
    if (!res.isSuccess) {
      return;
    }
    this.$data.total = res.data.total;
    this.$data.categoryList = res.data.data;
  }
  goEditPage(categoryId: string) {
    this.$router.push({ name: 'EditCategory', params: { categoryId } });
  }
  goManageArticle(categoryId: string) {
    this.$router.push({ name: 'ArticleList', params: { categoryId } });
  }
  async deleteCategory(categoryId: number) {
    const isConfirm = await this.$confirm('确认删除该记录吗?', '提示', {type: 'warning'});
    if (!isConfirm) {
      return;
    }
    const res = await ApiCategory.deleteCategory(categoryId);
    if (!res.isSuccess) {
      return;
    }
    this.$message.success('删除成功');
    this.reLoadInfo();
  }
  async showCategory(categoryId: number) {
    const res = await ApiCategory.showCategory(categoryId);
    if (!res.isSuccess) {
      return;
    }
    this.getList();
    this.$message.success('修改成功');
  }
  async hiddenCategory(categoryId: number) {
    const res = await ApiCategory.hideCategory(categoryId);
    if (!res.isSuccess) {
      return;
    }
    this.getList();
    this.$message.success('修改成功');
  }
  mounted() {
    this.reLoadInfo();
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