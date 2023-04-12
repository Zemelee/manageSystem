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
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getTableData } from "../../utils/table.js";
export default {
  data() {
    return {
      tableData: {},
      size:10,
      total:10,
      page:1,
      loading:true,
    };
  },
  created() {
    // root, url, params
    getTableData(this, "/works", {}, ["computed"]);
  },
  methods:{
    handleSizeChange(val){
      this.size = val
      this.page=1
      getTableData(this, "/works", {page:this.page,size:this.size}, ["computed"]);

    },
    handleCurrentChange(val){
      this.page = val
      getTableData(this, "/works", {page:this.page,size:this.size}, ["computed"]);
    }
  }
};
</script>

<style>
</style>