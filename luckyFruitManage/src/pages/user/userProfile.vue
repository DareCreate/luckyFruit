<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-main">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <!-- <el-form-item label="登陆名">
          <el-input v-model="form.useranme" disabled></el-input>
        </el-form-item> -->
        <el-form-item prop="name" label="昵称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item prop="mobile" type="phone" label="电话">
          <el-input v-model="form.mobile"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        
        <el-form-item prop="hobby" label="爱好">
          <el-input v-model="form.hobby"></el-input>
        </el-form-item>
        <el-form-item prop="liveAddress" label="地址">
          <el-input v-model="form.liveAddress"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSaveProfile">修改并保存</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ApiUser from '@/services/admin/user';
import { Getter, Mutation } from 'vuex-class';
import { MY_USER_INFO } from '../../stores/getters-types';
import { UPDATE_MY_USER_INFO } from '../../stores/mutation-types';
import { IUserListItem } from '@/services/apiDataType';
@Component({
})
export default class UserProfile extends Vue {
  @Getter(MY_USER_INFO) myUserInfo!: IUserListItem;
  @Mutation(UPDATE_MY_USER_INFO) updateMyUserInfo!: (myUserInfo: IUserListItem) => {};
  data() {
    return {
      loading: false,
      form: {
        // username: '',
        name: '',
        mobile: '',
        email: '',
        birth: '',
        hobby: '',
        // province: '',
        liveAddress: '',
      },
      rules: {
        nickname: [{required: true, message: '请输入昵称', trigger: 'blur'}],
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change'},
        ],
      },
    };
  }
  mounted() {
    this.setUserInfo();
  }
  handleSaveProfile() {
    (this.$refs.form as any).validate(async (valid: boolean) => {
      this.$data.loading = true;
      const res = await ApiUser.editUser(this.$data.form);
      if (!res.isSuccess) {
        return;
      }
      this.$message.success('修改成功');
      this.updateMyUserInfo(this.$data.form);
    });
  }
  setUserInfo() {
    this.$data.form = {
      ...this.myUserInfo,
    };
  }
}
</script>

<style scoped lang="less">
</style>