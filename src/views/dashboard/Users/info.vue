<!--查看用户基本信息-->
<template>
  <div class="user-info">
    <el-form class="el-form-info" label-width="150px" :mode="form" ref="form" :rules="rules">
      <el-form-item label="用户名：">{{form.username?form.username:'-'}} <!--<a href="javascript:void(0)">忘记密码</a>--></el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-link @click="handleClickPasswordChange">修改密码</el-link>
      </el-form-item>
      <el-form-item label="用户状态：">{{form.status==1?'正常':'停用'}}</el-form-item>
      <el-form-item label="用户权限：">
        <template v-if="form.roleId===1">管理员</template>
        <template v-else>普通用户</template>
      </el-form-item>
      <el-form-item label="基本信息：">{{form.userinfo?form.userinfo:'-'}}</el-form-item>
      <el-form-item label="手机号：">{{form.tel?form.tel:"-"}}</el-form-item>
      <el-form-item label="邮箱：">{{form.mail?form.mail:'-'}}</el-form-item>
      <el-form-item label="用户类型：">
        <template v-if="form.type===1">机构</template>
        <template v-else-if="form.type===2">企业</template>
        <template v-else-if="form.type===3">高校</template>
        <template v-else>其他</template>
      </el-form-item>
      <el-form-item label="IP：">{{form.ip?form.ip:'-'}}</el-form-item>
      <el-form-item label="接口调用最大次数：">{{form.max_inter_num}}</el-form-item>
      <el-form-item label="接口调用总次数：">{{form.total_inter_num}}</el-form-item>
      <el-form-item label="到期时间：">{{form.exptime?form.exptime:'长期有效'}}</el-form-item>
    </el-form>
    <ChangePassword :row="{id:form.id,username:form.username}" @close="handleCloseChangePassword" :visible="visibleChangePassword"/>
  </div>

</template>

<script>
  import ChangePassword from './changPassword'
  import {logout} from "../../../tools/utils";

  export default {
    name: "info",
    props:{
      // web端用户页面
      web:{
        required:true,
      },
      row:{
        default:""
      }
    },
    components:{ChangePassword},
    data() {
      return {
        visibleChangePassword:false,
        form: {
          password:"",
          repassword:"",
          api_permission: "",
          exptime: "",
          id: "",
          index: "",
          index_permission: "",
          max_inter_num: "",
          roleId: "",
          status: "",
          total_inter_num: "",
          username: ""
        },
        rules:{}
      }
    },
    methods:{
      logout,
      handleClickPasswordChange(){
        this.visibleChangePassword=true;
      },
      handleCloseChangePassword(){
        this.visibleChangePassword=false;
        //如果是web端用户修改密码则 退出登录，并跳转登录
        // if(this.row){
        //   this.logout();
        // }
      }
    },
    watch:{
      row:{
        immediate:true,//首次加载的时候执行函数
        deep:true,//深入观察，监听数值，对象属性值的变化
        handler(val) {
          this.form=val;
        }
      }
    }
  }
</script>
<style lang="scss">
  .el-form-info{
    .el-form-item{
      margin-bottom: 0px;
    }
  }
</style>
<style scoped>

</style>
