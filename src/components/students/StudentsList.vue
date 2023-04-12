<template>
  <div>
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      size="small"
    >
      <el-form-item label="姓名">
        <el-input v-model="formInline.name" placeholder="姓名查询"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="find">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 分页：每一页需要展示的数据可以通过简单的数学公式计算出来，
    点击第x页时就把tableData里需要展示的数据用slice函数分割出来即可 -->
    <!-- 1：1-10；2：11-20...slice((当前页数-1)*每页条数，当前页数*每页条数) -->
    <el-table
      :data="
        tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      border
      v-loading="loading"
      style="width: 100%"
    >
      <el-table-column prop="name" label="姓名" align="center">
      </el-table-column>
      <el-table-column prop="sex_text" label="性别" align="center">
      </el-table-column>
      <el-table-column prop="age" label="年龄" align="center">
      </el-table-column>
      <el-table-column prop="number" label="学号" align="center">
      </el-table-column>
      <el-table-column prop="class" label="班级" align="center">
      </el-table-column>
      <el-table-column prop="state_text" label="状态" align="center">
      </el-table-column>
      <el-table-column prop="address" label="地址" align="center">
      </el-table-column>
      <el-table-column prop="phone" label="电话" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="del(scope.row)"
            >删除</el-button
          ></template
        >
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { student, studentDel } from "../../api/api.js";

export default {
  data() {
    return {
      tableData: [],
      currentPage: 5, //当前页数
      pageSize: 10, //每页显示条数
      total: 0, //数据量
      formInline: {
        name: "",
      }, //查询依据
      loading: true, //加载动画
    };
  },
  created() {
    this.getData();
  },
  methods: {
    // 改变每页数据量
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1; //同时跳转到第一页
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(`当前页: ${val}`);
    },
    getData(params) {
      student(params).then((res) => {
        console.log("学生列表：", res);
        if (res.status == 200) {
          this.tableData = res.data.data;
          this.total = res.data.total;
          this.tableData.forEach((element) => {
            element.sex === 1
              ? (element.sex_text = "男")
              : (element.sex_text = "女");
            if (element.state == 1) {
              element.state_text = "已入学";
            } else if (element.state == 2) {
              element.state_text = "未入学";
            } else if (element.state == 3) {
              element.state_text = "休学中";
            }
          });
        }
        this.loading = false;
      });
    },
    del(row) {
      console.log(row);
      studentDel(row.id).then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          this.$message({ message: "删除成功", type: "success" });
          this.getData();
        }
      });
    },
    //查询
    find() {
      this.currentPage = 1;
      console.log("this.formInline:", this.formInline);
      this.getData(this.formInline);
    },
    reset() {
      this.getData();
    },
  },
};
</script>

<style>
.block {
  margin-top: 10px;
}
</style>