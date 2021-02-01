<template>
  <div id="poster" class="login">
    <div class="login-content">
      <div class="headers">
        <ul>
          <li>
            <router-link to="/">首页</router-link>
          </li>
          <li>
            <router-link to="/login">登录</router-link>
          </li>
        </ul>
      </div>
      <el-form :model="form" ref="form" :rules="rules" class="login-container" label-position="left" label-width="0px">
        <h2 class="login_title">数据驱动科技大数据咨询数据中台-用户{{title}}</h2>
        <el-form-item prop="type">
          <el-select style="width:100%" v-model="form.type" placeholder="请选择用户类型">
            <el-option label="机构" value="1"></el-option>
            <el-option label="企业" value="2"></el-option>
            <el-option label="高校" value="3"></el-option>
            <el-option label="其他" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="username">
          <el-input

            @keyup.enter.native="submitForm('form')"
            type="text"
            v-model.trim="form.username"
            auto-complete="off"
            placeholder="请输入手机号/用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            @keyup.enter.native="submitForm('form')"
            type="password"
            v-model.trim="form.password"
            auto-complete="off"
            placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item style="width: 100%">
          <el-button type="primary" class="submitForm" @click="submitForm('form')">{{title}}</el-button>
        </el-form-item>
        <router-link class="links" to="/login">已账户？<span>登录</span></router-link>
      </el-form>
    </div>
    <vue-particles
      color="#6495ED"
      :particleOpacity="0.9"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="4"
      linesColor="#6495ED"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.6"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    >
    </vue-particles>
    <bgAnimation/>
  </div>
</template>

<script>
  import {managerKFJRegister,managerKFJLongin} from "../../api/manager";
  import {mapGetters} from 'vuex';
  import bgAnimation from '@/components/bgAnimation'

  export default {
    name: "login",
    components:{bgAnimation},
    data() {
      return {
        title: "注册",
        form: {
          username: "",
          password: "",
          type:"",
          status:1,
          roleId:19
        },
        rules: {
          username: [
            {required: true, message: "请输入手机号/用户名", trigger: 'blur'},
            // {validator:(rule,value,callback)=>{
            //   if(phoneReg.test(value)){
            //     callback();
            //   }else{
            //     callback(new Error("请输入正确的手机号"));
            //   }
            //   },trigger:'blur'}
          ],
          password: [
            {required: true, message: "请输入密码", trigger: 'blur'}
          ],
          type:[
            {required: true, message: "请选择用户类型", trigger: 'blur'}
          ]
        }
      }
    },
    mounted() {
    },
    methods: {
      ...mapGetters(["getUsersInfo"]),
      handleKeyUpToSubmit(e){
        console.log(e)
      },
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            managerKFJRegister({...this.form}).then(res=>{
              if(res&&res.code===200){
                managerKFJLongin({...this.form}).then((res)=>{
                  if(res&&res.code===200){
                    this.setStateUserInfo({...res.data});
                    this.$router.push('/');
                  }else{
                    this.$router.push('/login');
                  }
                })
              }else{
                this.$message.error(res.message);
              }
            });
          }
        });
      }
    },
  }
</script>
<style lang="scss">
  #particles-js {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
</style>
<style lang="scss" scoped>
  .login {
    .login-content {
      position: fixed;
      z-index: 2;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;

      .headers {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 80px;

        ul {
          position: absolute;
          top: 0;
          right: 50px;

          li {
            display: inline-block;
            vertical-align: middle;
            margin: 20px 10px;

            a {
              color: #ffffff;
              font-size: 14px;
            }
          }
        }
      }

      .login-container {
        color: #ffffff;
        opacity: 0.8;
        border-radius: 15px;
        background-clip: padding-box;
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        width: 350px;
        padding: 35px 35px 15px 35px;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
      }

      .login_title {
        margin: 0px auto 40px auto;
        text-align: center;
        font-size: 20px;
      }

      .submitForm {
        width: 100%;
        background: transparent;
        border: 1px solid #ffffff;
      }
    }
  }

</style>
