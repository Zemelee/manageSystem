<template>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :url="url"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getTableData } from "../../utils/table.js";
export default {
  props: {
    "total": Number,
    "url": String,
  },
  data() {
    return {
      tableData: {},
      size: 10, //每页显示数量
      page: 1,
    };
  },
  created() {
    // root, url, params
    getTableData(this.$parent, "/works", {}, ["computed"]);
  },
  methods: {
    handleSizeChange(val) {
      this.size = val;
      this.page = 1;
      getTableData(
        this.$parent,
        "/works",
        { page: this.page, size: this.size },
        ["computed"]
      );
    },
    handleCurrentChange(val) {
      this.page = val;
      getTableData(
        this.$parent,
        "/works",
        { page: this.page, size: this.size },
        ["computed"]
      );
    },
  },
};
</script>

<style>
</style>