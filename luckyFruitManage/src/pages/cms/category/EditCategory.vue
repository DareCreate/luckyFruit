<template>
<div class="container">
  <el-form :model="editForm" label-width="130px" class="form-box" :rules="editFormRules" ref="editForm">
    <el-form-item label="类目名" prop="categoryName">
      <el-input v-model="editForm.categoryName" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="序列" prop="categoryOrder">
      <el-input type="number" v-model="editForm.categoryOrder" auto-complete="off"></el-input>
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
import { SYSTEM_TYPE } from '@/app/config';
@Component
export default class EditCategory extends Vue {
   data() {
    return {
      loading: false,
      editFormRules: {
        // roleName: [{required: true, message: '请输入角色名称', trigger: 'blur'}],
      },
      editForm: {},
    };
  }
  mounted() {
    this.getCategory();
  }
  async getCategory() {
    const { categoryId } = this.$route.params;
    const res = await ApiCategory.getCategory(categoryId);
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
      const res = await ApiCategory.editCategory({
        ...this.$data.editForm,
        systemType: SYSTEM_TYPE,
      });
      if (!res.isSuccess) {
        return;
      }
      this.$message.success('修改成功');
      this.$router.back();
    });
  }
}
</script>

<style scoped lang="less">
</style>