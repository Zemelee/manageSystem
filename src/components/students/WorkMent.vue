<template>
  <div>
    <el-table :data="tableData" v-loading="loading" border style="width: 100%">
      <el-table-column prop="id" label="用户ID" align="center">
      </el-table-column>
      <el-table-column prop="userId" label="所属班级" align="center">
      </el-table-column>
      <el-table-column prop="title" label="作业名称" align="center">
      </el-table-column>
      <el-table-column
        prop="computed_text"
        label="完成情况"
        align="center"
      ></el-table-column>
    </el-table>

  <Page :total="total" :url="url" />

  </div>
</template>

<script>
import Page from "../common/Page.vue";
export default {
  components: {
    Page,
  },
  data() {
    return {
      tableData:[],
      loading:true,
      total:0,
      url:'/works',
    };
  },
};
</script>

<style>
</style>