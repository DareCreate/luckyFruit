<template>
<div class="container">
  <el-form :model="addForm" label-width="130px" class="form-box" :rules="addFormRules" ref="addForm">
    <el-form-item label="视频组名" prop="groupName">
      <el-input v-model="addForm.groupName" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="视屏组排序" prop="orderNum">
      <el-input v-model="addForm.orderNum" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="视屏组封面" prop="groupImg">
      <app-image-upload :imgUrl.sync="addForm.groupImg"></app-image-upload>
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
export default class CreateVideoGroup extends Vue {
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
      const params = Object.assign(this.$data.addForm);
      const res = await ApiVideoGroup.createVideoGroup(params);
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