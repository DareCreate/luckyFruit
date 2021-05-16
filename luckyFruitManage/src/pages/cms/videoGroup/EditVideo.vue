<template>
<div class="container">
  <el-form :model="editForm" label-width="130px" class="form-box" :rules="editFormRules" ref="editForm">
    <el-form-item label="视频标题" prop="videoTitle">
      <el-input v-model="editForm.videoTitle" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="视频链接" prop="videoUrl">
      <el-input v-model="editForm.videoUrl" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="视频介绍" prop="videoIntroduction">
      <el-input v-model="editForm.videoIntroduction" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="视频组封面" prop="videoImage">
      <app-image-upload :imgUrl.sync="editForm.videoImage"></app-image-upload>
    </el-form-item>
    <el-form-item label="记录时间" prop="recordTime">
      <el-date-picker
        v-model="editForm.recordTime"
        type="datetime"
        value-format="timestamp"
      ></el-date-picker>
    </el-form-item>
    <!-- <el-form-item label="所属视频组" prop="videoGroupId">
      <el-select v-model="editForm.videoGroupId" filterable placeholder="所属视频组">
        <el-option
          v-for="item in videoGroupList"
          :key="item.id"
          :label="`${item.groupName}`"
          :value="item.id">
        </el-option>
      </el-select>
    </el-form-item> -->
  </el-form>
  <div style="margin-left: 300px;margin-top: 30px;">
    <el-button type="primary" @click.native="addSubmit" :loading="loading">提交</el-button>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ApiVideoGroup from '@/services/cms/videoGroup';
@Component
export default class EditVideo extends Vue {
  data() {
    return {
      loading: false,
      editFormRules: {
        videoGroupId: [{required: true, message: '视频组必须选择', trigger: 'blur'}],
      },
      editForm: {},
      videoGroupList: [],
    };
  }
  addSubmit() {
    (this.$refs.editForm as any).validate(async (valid: boolean) => {
      if (!valid) {
        return;
      }
      const { videoGroupId } = this.$route.params;
      const { recordTime } = this.$data.editForm;
      const params = Object.assign({}, this.$data.editForm, {
        recordTime: Math.floor(this.$data.editForm.recordTime / 1000),
        videoGroupId,
      });
      const res = await ApiVideoGroup.editVideo(params);
      if (!res.isSuccess) {
        return;
      }
      this.$router.back();
    });
  }
  mounted() {
    this.getDetail();
    this.getVideoGroupList();
  }
  async getVideoGroupList() {
    const params = {
      pageNum: 0,
      pageSize: 999,
    };
    const res = await ApiVideoGroup.videoGroupLilst(params);
    if (!res.isSuccess) {
      return;
    }
    this.$data.videoGroupList = res.data.data;
  }
  async getDetail() {
    const { videoId } = this.$route.params;
    const res = await ApiVideoGroup.getVideo(videoId);
    if (!res.isSuccess) {
      return;
    }
    this.$data.editForm = {
      ...res.data,
      recordTime: res.data.recordTime * 1000,
    };
  }
}
</script>

<style scoped lang="less">
</style>