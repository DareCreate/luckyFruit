<template>
<div class="container">
  <el-form :model="editForm" label-width="130px" class="form-box" :rules="editFormRules" ref="editForm">
    <el-form-item label="视频组名" prop="groupName">
      <el-input v-model="editForm.groupName" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="视频组排序" prop="orderNum">
      <el-input v-model="editForm.orderNum" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="视屏组封面" prop="groupImg">
      <app-image-upload :imgUrl.sync="editForm.groupImg"></app-image-upload>
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
export default class EditVideoGroup extends Vue {
  data() {
    return {
      loading: false,
      editFormRules: {
        // roleName: [{required: true, message: '请输入角色名称', trigger: 'blur'}],
      },
      editForm: {},
    };
  }
  addSubmit() {
    (this.$refs.editForm as any).validate(async (valid: boolean) => {
      if (!valid) {
        return;
      }
      const params = Object.assign(this.$data.editForm);
      const res = await ApiVideoGroup.editVideoGroup(params);
      if (!res.isSuccess) {
        return;
      }
      this.$message.success('修改成功');
      this.$router.back();
    });
  }
  mounted() {
    this.getDetail();
  }
  async getDetail() {
    const { videoGroupId } = this.$route.params;
    const res = await ApiVideoGroup.getVideoGroup(videoGroupId);
    if (!res.isSuccess) {
      return;
    }
    this.$data.editForm = res.data;
  }
}
</script>

<style scoped lang="less">
</style>