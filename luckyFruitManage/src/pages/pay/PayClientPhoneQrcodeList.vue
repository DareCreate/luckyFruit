<template>
<div>
  <el-row class="warp">
    <el-col :span="24" class="warp-main" v-loading="loading" element-loading-text="拼命加载中">
      <!--工具条-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true">
          <el-form-item>
            <el-button type="primary" @click="addFormVisible = true">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!--列表-->
      <el-table :data="list" highlight-current-row
                style="width: 100%;">
        <el-table-column type="index" width="60"></el-table-column>
        <el-table-column prop="payClientPhoneAmountId" label="金额id" sortable></el-table-column>
        <el-table-column prop="payTag" label="金额识别标识" sortable></el-table-column>
        <el-table-column prop="payType" label="支付类型" sortable></el-table-column>
        <el-table-column prop="qrCodeUrl" label="二维码解析地址" sortable></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini" @click="showEditDialog(scope.row.id)">编辑</el-button>
            <el-button type="danger" @click="deleteItem(scope.row.id)" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
        <el-form :model="editForm" label-width="120px" :rules="editFormRules" ref="editForm">
          <el-form-item label="金额识别标识" prop="payTag">
            <el-input v-model="editForm.payTag" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="二维码解析地址" prop="qrCodeUrl">
            <el-input disabled v-model="editForm.qrCodeUrl" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="支付类型" prop="payType">
            <el-radio-group v-model="editForm.payType">
              <el-radio
                v-for="item in $app.typeDef.payType"
                :label="item"
                :key="item"
              >
                {{ $app.typeDef.payTypeLabMap[item] }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="二维码图片" prop="qrCodeImg">
            <qrcode-capture @detect="onEditFormDetect" />
            <!-- <app-image-upload :imgUrl.sync="addForm.qrCodeImg"></app-image-upload> -->
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="editFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="editSubmit">提交</el-button>
        </div>
      </el-dialog>

      <!--新增界面-->
      <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
        <el-form :model="addForm" label-width="120px" :rules="addFormRules" ref="addForm">
          <el-form-item label="金额识别标识" prop="payTag">
            <el-input v-model="addForm.payTag" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="二维码解析地址" prop="qrCodeUrl">
            <el-input disabled v-model="addForm.qrCodeUrl" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="支付类型" prop="payType">
            <el-radio-group v-model="addForm.payType">
              <el-radio
                v-for="item in $app.typeDef.payType"
                :label="item"
                :key="item"
              >
                {{ $app.typeDef.payTypeLabMap[item] }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="二维码图片" prop="qrCodeImg">
            <qrcode-capture ref="capture" @detect="onAddDetect" />
            <!-- <app-image-upload :imgUrl.sync="addForm.qrCodeImg"></app-image-upload> -->
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="addFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
        </div>
      </el-dialog>

    </el-col>
  </el-row>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ApiUpload from '@/services/common/upload';
import ApiPayClient from '@/services/pay/payClient';
import { QrcodeCapture } from 'vue-qrcode-reader';
import { setTimeout } from 'timers';
@Component({
  components: {
    'qrcode-capture': QrcodeCapture,
  },
})
export default class PayClientPhoneQrcodeList extends Vue {
  data() {
    return {
      loading: false,
      editFormVisible: false, // 编辑界面是否显示
      editLoading: false,
      editFormRules: {
      },
      editForm: {
        payType: this.$app.typeDef.payType.WECHAT,
      },
      addFormVisible: false,
      addLoading: false,
      addFormRules: {
      },
      addForm: {
        payType: this.$app.typeDef.payType.WECHAT,
      },
      list: [],
    };
  }
  mounted() {
    this.getList();
  }
  onchange(file: any) {
    console.log('onchange', file);
  }
  async onAddDetect(promise: any) {
    this.$data.addLoading = true;
    const { qrCodeUrl, qrCodeImg } = await this.onDetect(promise);
    this.$data.addForm.qrCodeUrl = qrCodeUrl;
    this.$data.addForm.qrCodeImg = qrCodeImg;
    this.$data.addLoading = false;
  }
  async onEditFormDetect(promise: any) {
    this.$data.editLoading = true;
    const { qrCodeUrl, qrCodeImg } = await this.onDetect(promise);
    this.$data.editForm.qrCodeUrl = qrCodeUrl;
    this.$data.editForm.qrCodeImg = qrCodeImg;
    this.$data.editLoading = false;
  }
  async onDetect(promise: any) {
    let qrCodeUrl = '';
    let qrCodeImg = '';
    try {
      const info = await promise;
      const { imageData, content, location } = info;
      if (content == null) {
        throw new Error('解析失败');
      }
      qrCodeUrl = content;
      const file = new File(imageData.data, 'qrcode.jpg');
      const res = await ApiUpload.uploadImage(file);
      if (!res.isSuccess) {
        throw new Error('上传图片失败');
      }
      qrCodeImg = res.data.resourceUrl;
    } catch (err) {
      this.$message.error('解析失败');
      console.log(err);
    }
    return {
      qrCodeUrl,
      qrCodeImg,
    };
  }
  async editSubmit() {
    const { payClientPhoneAmountId } = this.$route.params;
    const res = await ApiPayClient.editPayClientPhoneQrCode({
      ...this.$data.editForm,
      payClientPhoneAmountId,
    });
    if (!res.isSuccess) {
      return;
    }
    this.getList();
    this.$message.success('修改成功');
    this.$data.editFormVisible = false;
  }
  async addSubmit() {
    const { payClientPhoneAmountId } = this.$route.params;
    const res = await ApiPayClient.createPayClientPhoneQrCode({
      ...this.$data.addForm,
      payClientPhoneAmountId,
    });
    if (!res.isSuccess) {
      return;
    }
    this.getList();
    this.$message.success('创建成功');
    this.$data.addFormVisible = false;
  }
  async showEditDialog(phoneQrCodeId: number) {
    const res = await ApiPayClient.getPayClientPhoneQrCodeDetail(phoneQrCodeId);
    if (!res.isSuccess) {
      return;
    }
    this.$data.editForm = res.data;
    this.$data.editFormVisible = true;
  }
  async deleteItem(phoneQrCodeId: number) {
    const isConfirm = await this.$confirm('确认删除该记录吗?', '提示', {type: 'warning'});
    if (!isConfirm) {
      return;
    }
    const res = await ApiPayClient.deletePayClientPhoneQrCode(phoneQrCodeId);
    if (!res.isSuccess) {
      return;
    }
    this.$message.success('删除成功');
    this.getList();
  }
  async getList() {
    const { payClientPhoneAmountId } = this.$route.params;
    this.$data.loading = true;
    const res = await ApiPayClient.payClientPhoneQrCodeList(payClientPhoneAmountId);
    this.$data.loading = false;
    if (!res.isSuccess) {
      return;
    }
    // this.$data.total = res.data.total;
    this.$data.list = res.data;
  }
}
</script>

<style scoped lang="less">
</style>