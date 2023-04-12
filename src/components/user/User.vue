<template>
  <div>
    权限管理和动态路由思路：不同用户登录返回不同的路由菜单
    通过树形控件达到权限精准控制，根据不同角色，勾选不同菜单权限，将菜单数据提交至后端保存
    后端保存之后在用户登录时会查询该用户所拥有的菜单，最终进行动态渲染展示
    动态路由添加使用router.addRoutes方法。
    <el-tree
      :data="menus"
      show-checkbox
      node-key="name"
      :props="defaultProps"
      ref='tree'
    >
    </el-tree>
    <el-button @click="show">show</el-button>
  </div>
</template>

<script>
export default {
  data(){
    return{
      menus:[],
      defaultProps:{
        label:'name',
        children:'children'
      },

    }
  },
  created(){
    // console.log(this.$router.options.routes);
    this.menus = [...this.$router.options.routes]
  },
  methods:{
    show(){
      let arr = this.$refs.tree.getCheckedNodes()
      console.log("arr:",arr);
    }
  }
};
</script>

<style>
</style>