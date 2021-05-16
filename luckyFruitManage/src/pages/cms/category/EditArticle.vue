<template>
<div class="container">
  <el-form :model="editForm" label-width="130px" class="form-box" :rules="editFormRules" ref="editForm">
    <el-form-item label="主标题" prop="mainTitle">
      <el-input v-model="editForm.mainTitle" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="副标题" prop="subTitle">
      <el-input v-model="editForm.subTitle" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="简介" prop="introduction">
      <el-input v-model="editForm.introduction" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="作者" prop="authorName">
      <el-input v-model="editForm.authorName" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="封面" prop="coverImage">
      <app-image-upload :imgUrl.sync="editForm.coverImage"></app-image-upload>
    </el-form-item>
    <el-form-item label="内容" prop="content">
      <app-quill-editor
        :content.sync="editForm.content"
      ></app-quill-editor>
    </el-form-item>
    
  </el-form>
  <div style="margin-left: 300px;margin-top: 30px;">
    <el-button type="primary" @click.native="addSubmit" :loading="loading">提交</el-button>
  </div>
</div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ApiCategory from '@/services/cms/category';
import { systemType } from '@/app/typeDef';
@Component
export default class CreateArticle extends Vue {
   data() {
    return {
      loading: false,
      editFormRules: {
        // roleName: [{required: true, message: '请输入角色名称', trigger: 'blur'}],
      },
      editForm: {},
    };
  }
  async getInfo() {
    const { articleId } = this.$route.params;
    const res = await ApiCategory.getArticle(articleId);
    if (!res.isSuccess) {
      return;
    }
    this.$data.editForm = res.data;
  }
  addSubmit() {
    (this.$refs.editForm as any).validate(async (valid: boolean) => {
      if (!valid) {
        return;
      }
      const res = await ApiCategory.editArticle({
        ...this.$data.editForm,
      });
      if (!res.isSuccess) {
        return;
      }
      this.$message.success('修改成功');
      this.$router.back();
    });
  }
  mounted() {
    this.getInfo();
  }
}
</script>

<style scoped lang="less">
</style>