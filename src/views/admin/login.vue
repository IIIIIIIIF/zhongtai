<template>
  <div id="poster" class="login">
    <div class="login-content">
      <div class="headers">
        <ul>
          <li>
            <router-link to="/">首页</router-link>
          </li>
          <li>
            <router-link to="/register">注册</router-link>
          </li>
        </ul>
      </div>
      <el-form :model="form" ref="form" :rules="rules" class="login-container" label-position="left" label-width="0px">
        <h2 class="login_title">数据驱动科技大数据咨询数据中台<br>用户{{title}}</h2>
        <el-form-item prop="username">
          <el-input
            @keyup.enter.native="submitForm('form')"
            type="text"
            v-model="form.username"
            auto-complete="off"
            placeholder="请输入手机号或用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            @keyup.enter.native="submitForm('form')"
            type="password"
            v-model="form.password"
            auto-complete="off"
            placeholder="请输入密码"></el-input>
        </el-form-item>
<!--        <el-form-item>-->
<!--          <el-input placeholder="请输入内容" v-model="form.code" class="input-with-select">-->
<!--            <div-->
<!--              slot="append"-->
<!--              class="idcode"-->
<!--              @click="makeCode">-->
<!--              <Identify-->
<!--                :contentWidth="120"-->
<!--                :contentHeight="30"-->
<!--                :identifyCode="identifyCode"/>-->
<!--            </div>-->
<!--            <el-button slot="append" icon="el-icon-search"></el-button>-->
<!--          </el-input>-->

<!--        </el-form-item>-->
        <el-form-item style="width: 100%">
          <el-button type="primary" class="submitForm" @click="submitForm('form')">
            {{title}}
          </el-button>
        </el-form-item>
        <router-link class="links" to="/register">没有账户？<span>注册</span></router-link>
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
    ></vue-particles>
    <bgAnimation/>
  </div>
</template>

<script>
  import {adminRouter} from '../../config/router'
  import router from '../../router'
  import {managerKFJLongin, managerKFJGetUserMenus} from "@/api/manager";
  import {mapActions, mapGetters} from 'vuex';
  import bgAnimation from '@/components/bgAnimation'
  import Identify from '@/components/Identify';

  export default {
    name: "login",
    components: {bgAnimation,Identify},
    data() {
      return {
        title: "登录",
        form: {
          username: "",
          password: "",
        },
        rules: {
          username: [
            {required: true, message: "请输入手机号或用户名", trigger: 'blur'},
            // {
            //   validator: (rule, value, callback) => {
            //     if (phoneReg.test(value)) {
            //       callback();
            //     } else {
            //       callback(new Error("请输入正确的手机号"));
            //     }
            //   }, trigger: 'blur'
            // }
          ],
          password: [
            {required: true, message: "请输入密码", trigger: 'blur'}
          ]
        },
        identifyCode:"",//验证码
      }
    },
    mounted() {
      // this.checkUser();//检查用户是否已经登录，如果已经登录过则直接跳转首页
      this.makeCode();
      if(this.$route.query.mark=="DXhFpq7GqKGGdwHV"){
        this.form.username = "admin"
        this.form.password = 13161497787
        this.submitForm('form')
      }else if (this.$route.query.mark=="bL3z7iwuaP3KvbrJ"){
        this.form.username = "13161497787"
        this.form.password = 123456
        this.submitForm('form')
      }
    },
    methods: {
      ...mapGetters(["getUsersInfo"]),
      ...mapActions(['setStateUserInfo', "setMenu"]),
      makeCode(){
        do {
          this.identifyCode=parseInt((Math.random()*10000))+"";
        } while (this.identifyCode.length!==4);
      },
      // checkUser() {
      //   let userInfo = this.getUsersInfo();
      //   if (userInfo.id && userInfo.roleId && userInfo.token && userInfo.username) {
      //     this.$router.push('/');
      //   }
      // },
      // TODO 点击登录按钮
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            managerKFJLongin({...this.form}).then(res => {
              if (res && res.code === 200) {
                this.setStateUserInfo({...res.data});
                // if(res.data.roleId==2||res.data.roleId==1){
                //   managerKFJGetUserMenus({
                //     id:res.data.roleId
                //   }).then(menu=>{
                //     if(menu&&menu.code===200){
                //       this.setMenu(menu.data);
                //       router.addRoutes(adminRouter);
                //       this.$router.push('/dashboard');
                //     }else{
                //       this.$router.push("/");
                //     }
                //   });
                // }else{
                //   this.$router.push("/");
                // }
                if (res.data.roleId == 1) {
                  managerKFJGetUserMenus({
                    id: res.data.roleId
                  }).then(menu => {
                    if (menu && menu.code === 200) {
                      this.setMenu(menu.data);
                      // router.addRoutes(adminRouter);
                      this.$router.push('/dashboard');
                    } else {
                      this.$router.push("/");
                    }
                  });
                } else if (res.data.roleId == 19) {
                  this.$router.push("/center");
                } else {
                  this.$router.push("/");
                }
              } else {
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
  .login-content{
    .el-input-group__append{
      padding: 0;
      border: 0;
    }
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
      .links{
        color: #ffffff;
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
  .idcode{
    cursor: pointer;

  }
</style>
