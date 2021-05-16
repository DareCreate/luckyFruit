<template>
<div class="container">
  <el-form :model="addForm" label-width="130px" class="form-box" :rules="addFormRules" ref="addForm">
    <el-form-item label="幻灯片名称" prop="slideshowName">
      <el-input v-model="addForm.slideshowName" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="前端页面标注" prop="webTag">
      <el-radio-group v-model="addForm.webTag">
        <el-radio
          v-for="webtag in $app.typeDef.slideWebTagMap"
          :label="webtag"
          :key="webtag"
        >{{ $app.typeDef.slideWebTagLabMap[webtag] }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <!-- <el-form-item label="系统类型" prop="systemType">
      <app-image-upload :imgUrl.sync="addForm.mainImage"></app-image-upload>
    </el-form-item> -->
    <el-form-item label="备注" prop="remark">
      <el-input v-model="addForm.remark" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <div style="margin-left: 300px;margin-top: 30px;">
    <el-button type="primary" @click.native="addSubmit" :loading="loading">提交</el-button>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ApiSlide from '@/services/cms/slideShow';
import { SYSTEM_TYPE } from '@/app/config';
@Component
export default class CreateSlideShow extends Vue {
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
      const params = Object.assign({}, this.$data.addForm, {
        systemType: SYSTEM_TYPE,
      });
      const res = await ApiSlide.createSlide(params);
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