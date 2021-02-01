<template>
  <el-dialog
    title="修改密码"
    :close-on-click-modal="false"
    width="400px"
    @closed="resetForm('form')"
    :visible.sync="dialog.visible"
  >
    <el-form ref="form" :model="form" :size="size" :rules="rules" label-width="70px">
      <el-form-item label="用户名">{{form.username}}</el-form-item>
      <el-form-item label="旧密码" v-if="!form.oldpassword||oldShow" prop="oldpassword">
        <el-input
          :style="style"
          type="password"
          :size="size"
          v-model.trim="form.oldpassword"
          autocomplete="off"
          placeholder="请输入旧密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newpassword">
        <el-input
        :style="style"
        :size="size"
        type="password"
        autocomplate="off"
        placeholder="请输入新密码"
        v-model.trim="form.newpassword"></el-input>
      </el-form-item>
      <el-form-item style="text-align: right">
        <el-button
          :loading="addLoading"
          :size="size"
          type="primary"
          @click="handleSubmitChangePassword()"
        >修改
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
  import {managerKFJChangePassword} from "../../../api/manager";

  export default {
    name: "changPassword",
    props:{
      visible:{
        required:true,
        default:false
      },
      row:{
        required:true,
        default:{}
      }
    },
    data() {
      return {
        size: this.$store.getters.getAppSize,
        style: "width:100%",
        addLoading:false,
        dialog:{
          visible:false,
        },
        oldShow:false,
        form: {
          id:'',
          username: "",
          oldpassword: "",
          newpassword: ""
        },
        rules:{
          newpassword:[
            {required:true,message:'请输入新密码',trigger:['blur','change']},
            {min:6,max:20,message:"长度在6到20个字符",trigger:['blur','change']}
          ],
          oldpassword:[
            {required:true,message:'请输入新密码',trigger:['blur','change']},
          ]
        }
      }
    },
    methods:{
      // TODO 修改密码提交
      handleSubmitChangePassword() {
        if(this.oldShow===false){
          managerKFJChangePassword({
            id: this.form.id,
            username:this.form.username,
            password: this.form.newpassword
          }).then((res) => {
            if (res && res.code === 200) {
              this.$emit('close',false);
              this.$message.success("修改成功");
            } else {
              this.$message.error(res.message);
            }
          })
        }else{
          managerKFJChangePassword({
            ...this.form
          }).then(res => {
            if (res && res.code === 200) {
              this.$emit('close',false);
              this.$message.success("修改成功");
            } else {
              this.$message.error(res.message);
            }
          });
        }
      },
      // TODO 重置表单
      resetForm(){
        this.form={id:"", username:"", oldpassword:"", newpassword:""};
        this.$emit('close',false);
      }
    },
    watch:{
      visible:{
        immediate: true,//首次加载的时候执行函数
        // deep:true,//深入观察，监听数值，对象属性值的变化
        handler(val) {
          this.dialog.visible = val;
        }
      },
      row:{
        immediate: true,
        deep:true,
        handler(row){
          if(row.id){
            this.form.id=row.id;
          }
          if(row.username){
            this.form.username=row.username;
          }
          if(row.oldpassword){
            this.form.oldpassword=row.oldpassword;
            this.oldShow=false;
          }else{
            this.oldShow=true;
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
