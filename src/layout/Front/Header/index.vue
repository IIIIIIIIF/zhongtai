<template>
<!--  <div class="main-container-2020">-->
    <div class="CGZH2020_main">
      <div class="CGZH2020_header">
        <div class="logo_box pull-left">
          <a href="/">
            <img src="@/assets/font/logo_p.png"/>
            <span>数据驱动科技大数据咨询数据中台</span>
          </a>
        </div>
        <!--      <div class="top_banner pull-left">-->
        <!--        <el-carousel :interval="5000" arrow="always">-->
        <!--          <el-carousel-item>-->
        <!--            <img src="@/assets/font/index/banner1.jpg" alt="">-->
        <!--          </el-carousel-item>-->
        <!--          <el-carousel-item>-->
        <!--            <img src="@/assets/font/index/banner2.jpg" alt="">-->
        <!--          </el-carousel-item>-->
        <!--          <el-carousel-item>-->
        <!--            <img src="@/assets/font/index/banner3.jpg" alt="">-->
        <!--          </el-carousel-item>-->
        <!--        </el-carousel>-->
        <!--      </div>-->
        <div class="dl_box pull-right">
          <Miss class="miss-content" v-if="userInfo.username&&userInfo.username!==''"/>
<!--          <template v-else>-->
<!--            <router-link to="/register" class="dl_href">注册</router-link>-->
<!--            <router-link to="/login" class="zc_href">登录</router-link>-->
<!--          </template>-->
        </div>
      </div>
    </div>
<!--  </div>-->

</template>

<script>
  import Miss from '../../../components/Miss'
  import {mapGetters} from 'vuex';

  export default {
    name: "index",
    components: {
      Miss
    },
    data() {
      return {
        userInfo: {
          id: "",
          username: "",
          roleId: "",
          token: ""
        }
      }
    },
    mounted() {
      document.title = "资源管理服务·中台";
      this.userInfo = this.getUsersInfo();
    },
    methods: {
      ...mapGetters(["getUsersInfo"]),
    }
  }
</script>
<style lang="scss">
  .miss-content .el-dropdown {
    color: #ffffff;
  }
</style>
<style lang="scss" scoped>

  /*.main-container-2020 {*/
  /*  background-color: #050c40;*/
  /*}*/

  .CGZH2020_main {
    /*width: 1200px;*/
    /*overflow: hidden;*/
    /*margin: 0 auto;*/
    background-color: #050c40;

    .CGZH2020_header {
      width: 1200px;
      margin: 0 auto;
      padding: 20px 0;
      height: 62px;
      overflow: hidden;
      position: relative;

      .logo_box {
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        a,img,span{
          display: inline-block;
        }
        img,span{
          vertical-align: middle;
        }
        a{
          color: #ffffff;
          img{
            width: 160px;
          }
          span{
            margin-left: 10px;
            font-size: 36px;
            font-weight: normal;
          }
        }
      }

      .top_banner {
        width: 870px;
        height: 62px;
        overflow: hidden;
        margin-left: 18px;
      }

      .dl_box {
        cursor: pointer;
        user-select: none;
        width: 124px;
        margin-top: 20px;
        padding-left: 20px;
        overflow: hidden;

        .uname {
          font-size: 16px;
          display: inline-block;
        }

        .dl_href, .zc_href {
          font-size: 14px;
          width: 30px;
          height: 30px;
          float: right;
          text-align: center;
          color: #fff;
          line-height: 30px;
          margin-left: 10px;
          border-radius: 2px;
        }

        .dl_href {
          /*background: #013d86;*/
        }

        .zc_href {
          /*background: #3799f7;*/
        }
      }
    }
  }
</style>
