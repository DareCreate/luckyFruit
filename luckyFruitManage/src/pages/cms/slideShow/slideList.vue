<template>
  <el-row>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <router-link :to="{name: 'CreateSlideShow'}">
            <el-button type="primary">添加</el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </el-col>

    <el-table :data="slideShows" highlight-current-row v-loading="loading" style="width: 100%;">
      <el-table-column prop="id" label="id" >
      </el-table-column>
      <el-table-column prop="slideshowName" label="幻灯片名称" >
      </el-table-column>
      <el-table-column prop="webTag" label="前端页面标注" sortable>
      </el-table-column>
      <el-table-column prop="remark" label="备注" sortable>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="goEditPage(scope.$index,scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="removeSlideShow(scope.$index,scope.row)">删除</el-button>
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
import ApiSlideShow from '@/services/cms/slideShow';
@Component
export default class SlideShowList extends Vue {
  data() {
    return {
      filters: {
        name: '',
      },
      slideShows: [],
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
    const res = await ApiSlideShow.slideShowList(params);
    this.$data.loading = false;
    if (!res.isSuccess) {
      return;
    }
    this.$data.total = res.data.total;
    this.$data.slideShows = res.data.data;
  }
  async goEditPage(index: number, row: any) {
    this.$router.push({ name: 'EditSlideShow', params: { slideshowId: row.id } });
  }
  async removeSlideShow(index: number, row: any) {
    const isConfirm = await this.$confirm('确认删除该记录吗?', '提示', {type: 'warning'});
    if (!isConfirm) {
      return;
    }
    const res = await ApiSlideShow.deleteSlide(row.id);
    if (!res.isSuccess) {
      return;
    }
    this.$message.success('删除成功');
    this.reLoadInfo();
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