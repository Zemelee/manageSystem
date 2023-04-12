<template>
  <div>
    <el-form :inline="true" class="demo-form-inline" size="small">
      <el-form-item>
        <el-button type="primary" @click="addStudent">增加学生</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="name" label="姓名" align="center">
      </el-table-column>
      <el-table-column prop="sex" label="性别" align="center">
      </el-table-column>
      <el-table-column prop="age" label="年龄" align="center">
      </el-table-column>
      <el-table-column prop="father" label="父亲" align="center">
      </el-table-column>
      <el-table-column prop="mother" label="母亲" align="center">
      </el-table-column>
      <el-table-column prop="time" label="时间" align="center">
      </el-table-column>
      <el-table-column prop="address" label="地址" align="center">
      </el-table-column>
      <el-table-column prop="phone" label="电话" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center" width="200px">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="del(scope.row)"
            >删除</el-button
          >
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="edit(scope.row)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- Form -->

    <el-dialog
      :title="state ? '添加学生信息' : '修改学生信息'"
      :visible.sync="dialogFormVisible"
      width="500px"
    >
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
          <el-radio v-model="form.sex" label="1">男</el-radio>
          <el-radio v-model="form.sex" label="2">女</el-radio>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth" prop="age">
          <el-input v-model="form.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="父亲" :label-width="formLabelWidth" prop="father">
          <el-input v-model="form.father" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="母亲" :label-width="formLabelWidth" prop="mother">
          <el-input v-model="form.mother" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth" prop="address">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="入校时间"
          :label-width="formLabelWidth"
          prop="time"
        >
          <el-date-picker
            v-model="form.time"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="联系方式"
          :label-width="formLabelWidth"
          prop="phone"
        >
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure(form)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { info, getinfo, updateinfo, delinfo } from "../../api/api.js";
export default {
  data() {
    return {
      tableData: [], //表格绑定的数据
      dialogFormVisible: false, //弹窗是否可见
      form: {
        //弹窗的表单
        name: "",
        sex: 1,
        age: "",
        father: "",
        mother: "",
        address: "",
        time: "",
        phone: "",
      },
      total: 0,
      formLabelWidth: "80px",
      rules: {
        name: [{ required: true, message: "请输入姓名" }],
        sex: [{ required: true }],
        age: [{ required: true, message: "请输入年龄" }],
        address: [{ required: true, message: "请输入地址" }],
        time: [{ required: true, message: "请选择入学时间" }],
        phone: [{ required: true, message: "请输入联系方式" }],
      },
      state: true, //添加或者修改学生信息，默认添加
    };
  },

  created() {
    this.getData();
  },
  methods: {
    edit(row) {
      this.state = false;
      this.dialogFormVisible = true;
      //将当前行结构重赋值，避免修改当前行时输入框的数据表动带动表格数据表动
      this.form = { ...row };
    },
    //删除信息列表某一项
    del(row) {
      console.log(row);
      delinfo(row.id).then((res) => {
        console.log(res);
        this.$alert("确定要删除吗？", "提示", {
          confirmButtonText: "确定",
          callback: () => {
            if (res.data.status === 200) {
              this.$message({ message: "删除成功", type: "success" });
              this.getData();
            }
          },
        });
      });
    },
    
    addStudent() {
      this.form = {}; //将弹出的表单置空
      this.state = true; //将表单提示内容改为新增
      this.dialogFormVisible = true;
    },

    //获取信息列表
    getData() {
      getinfo().then((res) => {
        if (res.data.status === 200) {
          console.log("列表信息", res);
          this.tableData = res.data.data;
          this.tableData.forEach((element) => {
            if (element.sex === 1) {
              element.sex_text = "男";
            } else if (element.sex === 2) {
              element.sex_text = "女";
            }
          });
        }
      });
    },

    sure(form) {
      console.log("this.$refs[form]:", this.$refs);
      //如果新增信息,info
      if (this.state) {
        info(this.form).then((res) => {
          if (res.data.status == 200) {
            this.$message({ message: "新增成功", type: "success" });
            this.getData();
          }
        });
        //如果修改信息,udateinfo
      } else {
        updateinfo(this.form).then((res) => {
          if (res.data.status == 200) {
            this.$message({ message: "修改成功", type: "success" });
            this.getData();
          }
        });
      }

      this.dialogFormVisible = false;
    },
  },
};
</script>

<style>
</style>