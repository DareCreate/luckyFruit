<template>
  <el-upload
    class="avatar-uploader"
    :action="qnLocation"
    :data="uploadData"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload">
    <slot>
      <img v-if="imgUrl" :src="`http://${imgUrl}`" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </slot>
  </el-upload>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ApiUpload from '@/services/common/upload.ts';
import { uploadType } from '@/app/typeDef';
// import { Getter } from 'vuex-class';
// import { TOKEN } from '../../stores/getters-types';


@Component({
  props: {
    imgUrl: String,
  },
  computed: {
    qnLocation() {
      return location.protocol === 'http:' ? 'http://upload.qiniu.com' : 'https://up.qbox.me';
    },
  },
})
export default class AppImageUpload extends Vue {
  // @Getter TOKEN!: string;
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
    const imgUrl = imgAdminOrigin + key;
    this.$emit('update:imgUrl', imgUrl);
    this.$emit('uploadSuccess', imgUrl);
  }
  async beforeAvatarUpload(file: any) {
    const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
    if (!isJPG) {
      return false;
    }
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