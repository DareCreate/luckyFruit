<template>
<div class="container">
  <div>
    <el-button @click.native="clearCache" type="primary">清空缓存</el-button>
  </div>
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
    <el-form-item label="备注" prop="remark">
      <el-input v-model="addForm.remark" auto-complete="off"></el-input>
    </el-form-item>
    <el-card class="box-card">
      <el-row slot="header" type="flex" align="middle">
        <el-col>
          轮播内容列表
        </el-col>
        <el-button @click.native="addSlideContentDialogVisible = true" type="primary">添加</el-button>
      </el-row>
      <template v-if="slideshowContentVOS">
        <el-row
          v-for="(item, index) in slideshowContentVOS"
          :key="index"
          type="flex"
          justify="space-between"
          align="middle"
          class="slide-content-item"
        >
          <el-row type="flex">
            <div class="slide-content-img">
              <app-net-img :imgUrl="item.coverImg" />
            </div>
            <div class="link-url">链接：{{ item.link }}</div>
          </el-row>
          <el-row type="flex">
            <el-button
              type="primary"
              @click="showEditSlideContentDialog(item.id)"
            >编辑</el-button>
            <el-button
            type="danger"
            @click="deleteSlideContentDialog(item.id)"
            >删除</el-button>
          </el-row>
        </el-row>
      </template>
    </el-card>
  </el-form>
  <div style="margin-left: 300px;margin-top: 30px;">
    <el-button type="primary" @click.native="addSubmit" :loading="loading">提交</el-button>
  </div>
  <!-- 添加界面 -->
  <el-dialog title="新增" :visible.sync="addSlideContentDialogVisible" :close-on-click-modal="false">
    <el-form :model="addSlideContentForm" label-width="80px" :rules="addFormRules" ref="addSlideContentForm">
      <el-form-item label="链接" prop="link">
        <el-input v-model="addSlideContentForm.link" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="封面" prop="coverImg">
        <app-image-upload :imgUrl.sync="addSlideContentForm.coverImg"></app-image-upload>
      </el-form-item>
      <el-form-item label="排序" prop="orderNum">
        <el-input v-model="addSlideContentForm.orderNum" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="slideshowContentType">
        <el-radio-group v-model="addSlideContentForm.slideshowContentType">
          <el-radio label="URL_LINK">URL_LINK</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native="addSlideContentDialogVisible = false">取消</el-button>
      <el-button type="primary" @click.native="addSlideContentSubmit" :loading="addContentLoading">添加</el-button>
    </div>
  </el-dialog>
  <!-- 编辑界面 -->
  <el-dialog title="编辑" :visible.sync="editSlideContentDialogVisible" :close-on-click-modal="false">
    <el-form :model="editSlideContentForm" label-width="80px" :rules="addFormRules" ref="editSlideContentForm">
      <el-form-item label="链接" prop="link">
        <el-input v-model="editSlideContentForm.link" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="封面" prop="coverImg">
        <app-image-upload :imgUrl.sync="editSlideContentForm.coverImg"></app-image-upload>
      </el-form-item>
      <el-form-item label="排序" prop="orderNum">
        <el-input v-model="editSlideContentForm.orderNum" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="slideshowContentType">
        <el-radio-group v-model="editSlideContentForm.slideshowContentType">
          <el-radio label="URL_LINK">URL_LINK</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native="editSlideContentDialogVisible = false">取消</el-button>
      <el-button type="primary" @click.native="editSlideContentSubmit" :loading="editContentLoading">添加</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ApiSlide from '@/services/cms/slideShow';
@Component
export default class EditSlideShow extends Vue {
  data() {
    return {
      loading: false,
      addFormRules: {
        // roleName: [{required: true, message: '请输入角色名称', trigger: 'blur'}],
      },
      addForm: {},
      slideshowContentVOS: [],
      // add slide content
      addContentLoading: false,
      addSlideContentForm: {},
      addSlideContentDialogVisible: false,
      // edit slice content
      editSlideContentForm: {},
      editContentLoading: false,
      editSlideContentDialogVisible: false,
    };
  }
  addSubmit() {
    (this.$refs.addForm as any).validate(async (valid: boolean) => {
      if (!valid) {
        return;
      }
      const params = this.$data.addForm;
      const res = await ApiSlide.editSlide(params);
      if (!res.isSuccess) {
        return;
      }
      this.clearCache();
      this.$message.success('修改成功');
      this.$router.back();
    });
  }
  showEditSlideContentDialog(slideContentId: number) {
    this.$data.editSlideContentForm = {};
    let slideContentInfo;
    this.$data.slideshowContentVOS.some((content: any) => {
      if (content.id === slideContentId) {
        slideContentInfo = content;
        return true;
      }
      return false;
    });
    if (slideContentInfo == null) {
      return;
    }
    this.$data.editSlideContentDialogVisible = true;
    this.$data.editSlideContentForm = slideContentInfo;
  }
  async deleteSlideContentDialog(slideContentId: number) {
    const res = await ApiSlide.deleteSlideContent(slideContentId);
    if (!res.isSuccess) {
      return;
    }
    this.getSlideContent();
    this.$message.success('删除成功');
  }
  editSlideContentSubmit() {
    (this.$refs.editSlideContentForm as any).validate(async (valid: boolean) => {
      if (!valid) {
        return;
      }
      const { slideshowId } = this.$route.params;
      const params = Object.assign({}, this.$data.editSlideContentForm, {
        slideshowId,
      });
      const res = await ApiSlide.editSlideContent(params);
      if (!res.isSuccess) {
        return;
      }
      this.$data.editSlideContentDialogVisible = false;
      this.getSlideContent();
    });
  }
  addSlideContentSubmit() {
    (this.$refs.addSlideContentForm as any).validate(async (valid: boolean) => {
      if (!valid) {
        return;
      }
      const { slideshowId } = this.$route.params;
      const params = Object.assign({}, this.$data.addSlideContentForm, {
        slideshowId,
      });
      const res = await ApiSlide.createSlideContent(params);
      if (!res.isSuccess) {
        return;
      }
      this.$data.addSlideContentDialogVisible = false;
      this.getSlideContent();
      this.resetSlideContentForm();
    });
  }
  resetSlideContentForm() {
    this.$data.addSlideContentForm = {
      slideshowContentType: 'URL_LINK',
    };
  }
  mounted() {
    this.getSlideShowInfo();
    this.getSlideContent();
    this.resetSlideContentForm();
  }
  async getSlideShowInfo() {
    const { slideshowId } = this.$route.params;
    const res = await ApiSlide.getSlideShow(slideshowId);
    if (!res.isSuccess) {
      return;
    }
    this.$data.addForm = res.data;
  }
  async getSlideContent() {
    const { slideshowId } = this.$route.params;
    const res = await ApiSlide.slideContentList(slideshowId);
    if (!res.isSuccess) {
      return;
    }
    this.$data.slideshowContentVOS = res.data;
  }
  async clearCache() {
    const { slideshowId } = this.$route.params;
    const res = await ApiSlide.clearCache(slideshowId);
    if (!res.isSuccess) {
      return;
    }
    this.$message.success('清空成功');
  }
}
</script>

<style scoped lang="less">
.slide-content-img {
  width: 150px;
  height: 100px;
  padding-right: 10px;
}
.link-url {
  max-width: 266px;
}
.slide-content-item {
  margin-top: 10px;
}
</style>