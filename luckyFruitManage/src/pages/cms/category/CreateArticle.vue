<template>
<div class="container">
  <el-form :model="addForm" label-width="130px" class="form-box" :rules="addFormRules" ref="addForm">
    <el-form-item label="主标题" prop="mainTitle">
      <el-input v-model="addForm.mainTitle" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="副标题" prop="subTitle">
      <el-input v-model="addForm.subTitle" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="简介" prop="introduction">
      <el-input v-model="addForm.introduction" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="作者" prop="authorName">
      <el-input v-model="addForm.authorName" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="封面" prop="coverImage">
      <app-image-upload :imgUrl.sync="addForm.coverImage"></app-image-upload>
    </el-form-item>
    <el-form-item label="内容" prop="content">
      <div style="width: 800px;">
        <app-quill-editor
          :content.sync="addForm.content"
        ></app-quill-editor>
      </div>
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
      addFormRules: {
        // roleName: [{required: true, message: '请输入角色名称', trigger: 'blur'}],
      },
      addForm: {},
    };
  }
  addSubmit() {
    (this.$refs.addForm as any).validate(async (valid: boolean) => {
      if (!valid) {
        return;
      }
      const res = await ApiCategory.createArticle({
        ...this.$data.addForm,
        categoryId: this.$route.params.categoryId,
      });
      if (!res.isSuccess) {
        return;
      }
      this.$message.success('创建成功');
      this.$router.back();
    });
  }
}
</script>

<style scoped lang="less">
</style>