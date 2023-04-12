<template>
  <div class="header">
    
    <el-header>
      <div class="title">通用后台管理系统</div>
      <div>{{name}}</div>
    </el-header>
  </div>
</template>

<script>
export default {
  data(){
    return{
      name:''
    }
  },
  created(){
    this.name = localStorage.getItem('username')
    console.log("this.name:",this.name);
  }
}
</script>

<style lang="less">
  .header{
    .el-header{
      background-color: #409eff;
      color:#fff;
      line-height: 60px;
      display: flex;
      justify-content: space-between;
      .title{
        width: 200px;
        font-size: 24px;
      }
    }
  }
</style>