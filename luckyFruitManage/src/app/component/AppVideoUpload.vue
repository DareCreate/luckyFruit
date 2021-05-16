<template>
  <el-upload
    class="avatar-uploader"
    :action="qnLocation"
    :data="uploadData"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload">
    <slot>
      <video v-if="videoUrl" :src="`http://${videoUrl}`" class="avatar"></video>
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </slot>
  </el-upload>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ApiUpload from '@/services/common/upload.ts';
import { uploadType } from '@/app/typeDef';

@Component({
  props: {
    videoUrl: String,
  },
  computed: {
    qnLocation() {
      return location.protocol === 'http:' ? 'http://upload.qiniu.com' : 'https://up.qbox.me';
    },
  },
})
export default class AppVideoUpload extends Vue {
  data() {
    return {
      uploadData: null,
    };
  }
  handleAvatarSuccess(res: any, file: any) {
    // if (res.code !== this.$app.typeDef.serverCode.SUCCESS) {
    //   this.$message.error(res.msg || '上传失败');
    //   return;
    // }
    // const imgUrl = res.data.resourceUrl;
    const imgAdminOrigin = 'resource.qidianlive.com/';
    const key = res.key;
    const videoUrl = imgAdminOrigin + key;
    console.log(videoUrl);
    this.$emit('update:videoUrl', videoUrl);
    this.$emit('uploadSuccess', videoUrl);
  }
  async beforeAvatarUpload(file: any) {
    console.log(file);
    // const isVideo = file.type === 'video/mp4';
    // if (!isVideo) {
    //   return false;
    // }
    const res = await ApiUpload.getUploadToken(file.name, uploadType.IMAGE);
    if (!res.isSuccess) {
      return false;
    }
    // const { key, token } = res.data;
    this.$data.uploadData = res.data;
    return true;
  }
}
</script>

<style scoped lang="less">
@avatarSize: 100px;
.setAvatarSize() {
  width: @avatarSize;
  height: @avatarSize;
}
.avatar-uploader {
  display: inline-block;
  border: 1px dashed #ccc;
  .setAvatarSize();
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  .setAvatarSize();
  line-height: @avatarSize;
  text-align: center;
}
.avatar {
  width: 100%;
  height: 100%;
  display: block;
}
</style>