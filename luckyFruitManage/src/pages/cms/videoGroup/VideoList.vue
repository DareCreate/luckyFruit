<template>
  <el-row>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-button @click="goAddVideoPage" type="primary">添加视频</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <el-table :data="videoList" highlight-current-row v-loading="loading" style="width: 100%;">
      <el-table-column prop="id" label="id" >
      </el-table-column>
      <el-table-column prop="videoTitle" label="视频标题">
      </el-table-column>
      <el-table-column prop="videoUrl" label="视频链接" sortable>
      </el-table-column>
      <el-table-column prop="videoIntroduction" label="视频介绍" sortable>
      </el-table-column>
      <el-table-column prop="recordTime" label="记录时间" sortable :formatter="$app.formatter.dateSecTime">
      </el-table-column>
      <el-table-column prop="videoGroupId" label="视频组id" sortable>
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="goEditPage(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="removeVideo(scope.row.id)">删除</el-button>
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
export default class VideoList extends Vue {
  data() {
    return {
      filters: {
        name: '',
      },
      videoList: [],
      loading: false,
      total: 0,
      page: 1,
      limit: 10,
    };
  }
  mounted() {
    this.getList();
  }
  goAddVideoPage() {
    const { videoGroupId } = this.$route.params;
    this.$router.push({ name: 'CreateVideo', params: { videoGroupId } });
  }
  goEditPage(videoId: string) {
    const { videoGroupId } = this.$route.params;
    this.$router.push({ name: 'EditVideo', params: { videoGroupId, videoId } });

  }
  async getList() {
    const { videoGroupId } = this.$route.params;
    const params = {
      pageNum: this.$data.page - 1,
      pageSize: 10,
      videoGroupId,
    };
    this.$data.loading = true;
    const res = await ApiVideoGroup.videoList(params);
    this.$data.loading = false;
    if (!res.isSuccess) {
      return;
    }
    this.$data.total = res.data.total;
    this.$data.videoList = res.data.data;
  }
  handleCurrentChange(val: number) {
    this.$data.page = val;
    this.getList();
  }
  async removeVideo(videoId: number) {
    const isConfirm = await this.$confirm('确认删除该记录吗?', '提示', {type: 'warning'});
    if (!isConfirm) {
      return;
    }
    const res = await ApiVideoGroup.deleteVideo(videoId);
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