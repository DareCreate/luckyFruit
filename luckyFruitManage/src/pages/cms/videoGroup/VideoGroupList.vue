<template>
  <el-row>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <router-link :to="{name: 'CreateVideoGroup'}">
            <el-button type="primary">添加视频组</el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </el-col>

    <el-table :data="videoGroupList" highlight-current-row v-loading="loading" style="width: 100%;">
      <el-table-column prop="id" label="id" >
      </el-table-column>
      <el-table-column prop="groupName" label="组名">
      </el-table-column>
      <el-table-column prop="systemType" label="系统类型" sortable>
      </el-table-column>
      <el-table-column prop="orderNum" label="排序" sortable>
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button size="mini" @click="goEditVideoList(scope.row.id)">视频管理</el-button>
          <el-button size="mini" v-if="scope.row.hidden" type="info" @click="showVideoGroup(scope.row.id)">显示</el-button>
          <el-button size="mini" v-else type="warning" @click="hideVideoGroup(scope.row.id)">隐藏</el-button>
          <el-button size="mini" type="primary" @click="goEditPage(scope.row.id)">编辑</el-button>
          <!-- <el-button size="mini" type="danger" @click="removeVideoGroup(scope.row.id)">删除</el-button> -->
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
import ApiVideoGroup from '@/services/cms/videoGroup';
@Component
export default class VideoGroupList extends Vue {
  data() {
    return {
      filters: {
        name: '',
      },
      videoGroupList: [],
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
    const res = await ApiVideoGroup.videoGroupLilst(params);
    this.$data.loading = false;
    if (!res.isSuccess) {
      return;
    }
    if (res.data == null) {
      return;
    }
    this.$data.total = res.data.total;
    this.$data.videoGroupList = res.data.data;
  }
  async showVideoGroup(videoGroupId: number) {
    const res = await ApiVideoGroup.showVideoGroup(videoGroupId);
    if (!res.isSuccess) {
      return;
    }
    this.$message.success('操作成功');
    this.getList();
  }
  async hideVideoGroup(videoGroupId: number) {
    const res = await ApiVideoGroup.hideVideoGroup(videoGroupId);
    if (!res.isSuccess) {
      return;
    }
    this.$message.success('操作成功');
    this.getList();
  }
  async goEditPage(videoGroupId: string) {
    this.$router.push({ name: 'EditVideoGroup', params: { videoGroupId } });
  }
  async removeVideoGroup(videoGroupId: number) {
    const isConfirm = await this.$confirm('确认删除该记录吗?', '提示', {type: 'warning'});
    if (!isConfirm) {
      return;
    }
    const res = await ApiVideoGroup.deleteVideoGroup(videoGroupId);
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
  goEditVideoList(videoGroupId: string) {
    this.$router.push({ name: 'VideoList', params: { videoGroupId } });
  }
}
</script>

<style scoped lang="less">

</style>