<template>
<div class="container">
  <el-form :model="addForm" label-width="130px" class="form-box" :rules="addFormRules" ref="addForm">
    <el-form-item label="视频标题" prop="videoTitle">
      <el-input v-model="addForm.videoTitle" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="视频链接" prop="videoUrl">
      <el-input v-model="addForm.videoUrl" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="视频介绍" prop="videoIntroduction">
      <el-input v-model="addForm.videoIntroduction" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="视频组封面" prop="videoImage">
      <app-image-upload :imgUrl.sync="addForm.videoImage"></app-image-upload>
    </el-form-item>
    <el-form-item label="记录时间" prop="recordTime">
      <el-date-picker
        v-model="addForm.recordTime"
        type="datetime"
        value-format="timestamp"
      ></el-date-picker>
    </el-form-item>
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
export default class CreateVideo extends Vue {
  data() {
    return {
      loading: false,
      addFormRules: {
        videoGroupId: [{required: true, message: '视频组必须选择', trigger: 'blur'}],
      },
      addForm: {
        recordTime: new Date().getTime(),
      },
    };
  }
  addSubmit() {
    (this.$refs.addForm as any).validate(async (valid: boolean) => {
      if (!valid) {
        return;
      }
      const { videoGroupId } = this.$route.params;
      const { recordTime } = this.$data.addForm;
      const params = Object.assign({}, this.$data.addForm, {
        recordTime: Math.floor(this.$data.addForm.recordTime / 1000),
        videoGroupId,
      });
      const res = await ApiVideoGroup.createVideo(params);
      if (!res.isSuccess) {
        return;
      }
      this.$router.back();
    });
  }
}
</script>

<style scoped lang="less">
</style>