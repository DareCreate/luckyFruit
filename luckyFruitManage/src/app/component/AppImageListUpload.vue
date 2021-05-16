<template>
<div>
  <el-upload
    :action="qnLocation"
    list-type="picture-card"
    :data="uploadData"
    :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove"
    :file-list="fileList"
    :show-file-list="true"
    :on-success="handleSuccess"
    :before-upload="beforeUpload"
    >
    <i class="el-icon-plus"></i>
  </el-upload>
  <el-dialog :visible.sync="dialogVisible">
    <img width="100%" :src="dialogImageUrl" alt="">
  </el-dialog>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ApiUpload from '@/services/common/upload.ts';
import { uploadType } from '@/app/typeDef';
@Component({
  props: {
    imgList: Array,
  },
  computed: {
    qnLocation() {
      return location.protocol === 'http:' ? 'http://upload.qiniu.com' : 'https://up.qbox.me';
    },
    fileList() {
      if (!this.$props.imgList) {
        return [];
      }
      return this.$props.imgList.map((url: string) => {
        return {
          name: '',
          url: `http://${url}`,
        };
      });
    },
  },
})
export default class AppImageListUpload extends Vue {
  data() {
    return {
      uploadData: null,
      dialogImageUrl: '',
      dialogVisible: false,
    };
  }
  handleRemove(file: any, fileList: any[]) {
    const imgList = fileList.map((item) => {
      return item.url.replace(/^http:\/\/|^https:\/\//, '');
    });
    this.$emit('removeImg', file.url.replace(/^http:\/\/|^https:\/\//, ''));
    this.$emit('update:imgList', imgList);
  }
  handleSuccess(res: any, file: any) {
    const imgAdminOrigin = 'resource.qidianlive.com/';
    const key = res.key;
    const imgUrl = imgAdminOrigin + key;
    let imgList = [imgUrl];
    if (this.$props.imgList) {
      imgList = [...this.$props.imgList, imgUrl];
    }
    console.log('handleSuccess', imgList);
    this.$emit('update:imgList', imgList);
    this.$emit('uploadSuccess', imgUrl);
  }
  // getImgList() {
  //   const imgAdminOrigin = 'resource.qidianlive.com/';
  //   return this.$data.fileList.map((item: any) => {
  //     if (/^http/.test(item.url)) {
  //       return item.url;
  //     }
  //     if (item.response && item.response.key) {
  //       return imgAdminOrigin + item.response.key;
  //     }
  //     return '';
  //   });
  // }
  handlePictureCardPreview(file: any) {
    this.$data.dialogImageUrl = file.url;
    this.$data.dialogVisible = true;
  }
  async beforeUpload(file: any) {
    const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
    if (!isJPG) {
      return false;
    }
    return new Promise(async (resolve, reject) => {
      const res = await ApiUpload.getUploadToken(file.name, uploadType.IMAGE);
      if (!res.isSuccess) {
        reject();
        return false;
      }
      // const { key, token } = res.data;
      this.$data.uploadData = res.data;
      resolve();
    });
  }
}
</script>

<style scoped lang="less">
</style>