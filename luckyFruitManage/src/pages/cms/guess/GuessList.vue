<template>
  <el-row>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-button @click="goAddPage" type="primary">添加竞猜</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <el-table :data="guessList" highlight-current-row v-loading="loading" style="width: 100%;">
      <el-table-column prop="id" label="id" >
      </el-table-column>
      <el-table-column prop="title" label="竞猜标题">
      </el-table-column>
      <el-table-column prop="tailName" label="反面名称" sortable>
      </el-table-column>
      <el-table-column prop="tailOdds" label="反面赔率" sortable>
      </el-table-column>
      <el-table-column prop="headName" label="正面名称" sortable>
      </el-table-column>
      <el-table-column prop="headOdds" label="正面赔率" sortable>
      </el-table-column>
      <el-table-column prop="guessGameValueType" label="投注值类型" sortable>
      </el-table-column>
      <el-table-column prop="guessBankerType" label="竞猜庄家类型" :formatter="guessBankerTypeFormatter" sortable>
      </el-table-column>
      <el-table-column prop="guessGameStatusType" label="竞猜状态" :formatter="guessGameStatusTypeFormatter" sortable>
      </el-table-column>
      <el-table-column prop="remark" label="额外说明" sortable>
      </el-table-column>
      <el-table-column prop="guessStopTime" label="封盘时间" sortable :formatter="$app.formatter.dateSecTime">
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button v-if="scope.row.guessGameStatusType === $app.typeDef.guessGameStatusType.UN_START" @click="startGuess(scope.row.id)">开启竞猜</el-button>
          <el-button v-if="scope.row.guessGameStatusType === $app.typeDef.guessGameStatusType.DOING" size="mini" type="primary" @click="stopGuess(scope.row.id)">竞猜封盘</el-button>
          <el-button size="mini" type="warning" @click="goEditPage(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteItem(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-col :span="24" class="toolbar">
      <el-pagination
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :page-size="10"
        :total="total"
        style="float:right;"
      >
      </el-pagination>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ApiGuess from '@/services/cms/guess';
import { guessGameStatusTypeLabMap, guessBankerTypeLabMap } from '@/app/typeDef';
@Component
export default class GuessList extends Vue {
  data() {
    return {
      filters: {
        name: '',
      },
      guessList: [],
      loading: false,
      total: 0,
      page: 1,
      limit: 10,
    };
  }
  mounted() {
    this.getList();
  }
  goAddPage() {
    this.$router.push({ name: 'CreateGuess' });
  }
  goEditPage(guessId: string) {
    this.$router.push({ name: 'EditGuess', params: { guessId } });
  }
  async startGuess(guessId: number) {
    const res = await ApiGuess.startGuessGame(guessId);
    if (!res.isSuccess) {
      return;
    }
    this.getList();
    this.$message.success('操作成功');
  }
  async stopGuess(guessId: number) {
    const res = await ApiGuess.stopGuessGame(guessId);
    if (!res.isSuccess) {
      return;
    }
    this.getList();
    this.$message.success('操作成功');
  }
  async getList() {
    const params = {
      pageNum: this.$data.page - 1,
      pageSize: 10,
    };
    this.$data.loading = true;
    const res = await ApiGuess.guessList(params);
    this.$data.loading = false;
    if (!res.isSuccess) {
      return;
    }
    this.$data.total = res.data.total;
    this.$data.guessList = res.data.data;
  }
  handleCurrentChange(val: number) {
    this.$data.page = val;
    this.getList();
  }
  async deleteItem(guessId: number) {
    const isConfirm = await this.$confirm('确认删除该记录吗?', '提示', {type: 'warning'});
    if (!isConfirm) {
      return;
    }
    const res = await ApiGuess.deleteGuess(guessId);
    if (!res.isSuccess) {
      return;
    }
    this.$message.success('删除成功');
    this.getList();
  }
  guessGameStatusTypeFormatter(row: any) {
    return guessGameStatusTypeLabMap[row.guessGameStatusType];
  }
  guessBankerTypeFormatter(row: any) {
    return guessBankerTypeLabMap[row.guessBankerType];
  }
}
</script>

<style scoped lang="less">
</style>