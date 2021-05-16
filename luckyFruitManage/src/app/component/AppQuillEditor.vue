<template>
<div class="editor-container">
  <quill-editor
    class="editor-wrap"
    v-bind="$attrs"
    ref="myQuillEditor"
    :options="editorOption"
    @change="onEditorChange($event)"
  >
  </quill-editor>
  <app-image-upload
    @uploadSuccess="uploadSuccess"
    style="display: none;"
  >
    <el-button ref="imgUploadButton">上传图片</el-button>
  </app-image-upload>
  <app-video-upload
    style="display: none;"
    @uploadSuccess="uploadVideoSuccess"
  >
    <el-button ref="videoUploadButton">上传视频</el-button>
  </app-video-upload>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import { quillEditor } from 'vue-quill-editor';
@Component({
  components: {
    quillEditor,
  },
})
export default class AppQuillEditor extends Vue {
  addRange: any;
  data() {
    return {
      // content: '',
      editorOption: {
        // some quill options
      },
    };
  }
  imgHandler(state: boolean) {
    const editor = this.getEditor();
    this.addRange = editor.quill.getSelection();
    if (state) {
      const fileInput = this.$refs.imgUploadButton as any;
      fileInput.$el.click();
    }
  }
  mounted() {
    const editor = this.getEditor();
    editor.quill.getModule('toolbar').addHandler('image', this.imgHandler);
    editor.quill.getModule('toolbar').addHandler('video', this.videoHandler);
  }
  videoHandler(state: boolean) {
    const editor = this.getEditor();
    this.addRange = editor.quill.getSelection();
    if (state) {
      const fileInput = this.$refs.videoUploadButton as any;
      fileInput.$el.click();
    }
  }
  uploadSuccess(imgUrl: string) {
    const editor = this.getEditor();
    this.addRange = editor.quill.getSelection();
    const value = imgUrl.indexOf('http') !== -1 ? imgUrl : 'http://' + imgUrl;
    editor.quill.insertEmbed(this.addRange == null ? 0 : this.addRange.index, 'image', value, 'user');
  }
  uploadVideoSuccess(videoUrl: string) {
    this.$message.success('上传成功');
    const editor = this.getEditor();
    this.addRange = editor.quill.getSelection();
    const value = videoUrl.indexOf('http') !== -1 ? videoUrl : 'http://' + videoUrl;
    editor.quill.insertEmbed(this.addRange == null ? 0 : this.addRange.index, 'video', value, 'user');
  }
  getEditor(): any {
    return this.$refs.myQuillEditor;
  }
  onEditorChange(content: any) {
    const { quill, html, text } = content;
    // this.$data.content = html;
    this.$emit('update:content', html);
  }
}
</script>

<style scoped lang="less">
.editor-container {
  min-height: 200px;
}
.editor-wrap /deep/ .ql-container {
  min-height: 140px;
}
</style>