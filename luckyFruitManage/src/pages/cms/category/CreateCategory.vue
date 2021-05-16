<template>
<div class="container">
  <el-form :model="addForm" label-width="130px" class="form-box" :rules="addFormRules" ref="addForm">
    <el-form-item label="类目名" prop="categoryName">
      <el-input v-model="addForm.categoryName" auto-complete="off"></el-input>
    </el-form-item>
    <!-- <el-form-item label="前端页面标注" prop="categoryOrder">
      <el-radio-group v-model="addForm.categoryOrder">
        <el-radio
          v-for="webtag in $app.typeDef.slideWebTagMap"
          :label="webtag"
          :key="webtag"
        >{{ $app.typeDef.slideWebTagLabMap[webtag] }}</el-radio>
      </el-radio-group>
    </el-form-item> -->
    <el-form-item label="序列" prop="categoryOrder">
      <el-input type="number" v-model="addForm.categoryOrder" auto-complete="off"></el-input>
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
export default class CreateCategory extends Vue {
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
      const res = await ApiCategory.createCategory({
        ...this.$data.addForm,
        systemType: SYSTEM_TYPE,
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