<template>
<div class="container">
  <el-form :model="addForm" label-width="130px" class="form-box" :rules="addFormRules" ref="addForm">
    <el-form-item label="竞猜标题" prop="title">
      <el-input v-model="addForm.title" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="正面名称" prop="headName">
      <el-input v-model="addForm.headName" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item v-if="addForm.guessBankerType === $app.typeDef.guessBankerType.SYSTEM_BANKER" label="正面赔率" prop="headOdds">
      <el-input v-model="addForm.headOdds" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="反面名称" prop="tailName">
      <el-input v-model="addForm.tailName" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item v-if="addForm.guessBankerType === $app.typeDef.guessBankerType.SYSTEM_BANKER" label="反面赔率" prop="tailOdds">
      <el-input v-model="addForm.tailOdds" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="额外说明" prop="remark">
      <el-input v-model="addForm.remark" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="竞猜庄家类型" prop="guessBankerType">
      <el-radio-group v-model="addForm.guessBankerType">
        <el-radio
          v-for="type in $app.typeDef.guessBankerType"
          :label="type"
          :key="type"
        >{{ $app.typeDef.guessBankerTypeLabMap[type] }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="投注值类型" prop="guessGameValueType">
      <el-radio-group v-model="addForm.guessGameValueType">
        <el-radio
          v-for="type in $app.typeDef.guessGameValueType"
          :label="type"
          :key="type"
        >{{ $app.typeDef.guessGameValueTypeLabMap[type] }}</el-radio>
      </el-radio-group>
    </el-form-item>
  </el-form>
  <div style="margin-left: 300px;margin-top: 30px;">
    <el-button type="primary" @click.native="addSubmit" :loading="loading">提交</el-button>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ApiGuess from '@/services/cms/guess';
import { guessBankerType, guessGameValueType } from '@/app/typeDef';
@Component
export default class CreateGuess extends Vue {
  data() {
    return {
      loading: false,
      addFormRules: {
      },
      addForm: {
        guessBankerType: guessBankerType.SYSTEM_BANKER,
        guessGameValueType: guessGameValueType.BALANCE,
      },
    };
  }
  addSubmit() {
    (this.$refs.addForm as any).validate(async (valid: boolean) => {
      if (!valid) {
        return;
      }
      const params = Object.assign({}, this.$data.addForm, {
      });
      const res = await ApiGuess.createGuessGame(params);
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