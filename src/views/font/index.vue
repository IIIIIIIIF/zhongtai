<template>
  <div class="index">
    <div class="rolling">
      <div class="swiper">
        <a class="banner_bg banner_imgbg2" href="/login">
          <div class="banner_word">
            <div class="banner_title">
              数据驱动科技大数据咨询数据中台
            </div>
            <p class="banner_pword">整合数据技术、产品技术能力、提供统一的数据和服务、强力支撑前台业务。</p>
            <object><a class="sy_btn" href="/login">入驻申请</a></object>
          </div>
          <div class="CGZH2020_plate1">
            <div class="CGZH2020_main">
              <ul class="banner_iconul ">
                <li class="icon_li">
                  <i class="icon_line"></i>
                  <object>
                    <a class="a_yuanbbox">
                      <div class="border-circle"></div>
                      <div class="cycle"><span class="num_icon1"></span></div>
                      <div class="num_wordbox">
                        <p class="num_pword">科技成果</p>
                        <div class="num_sz"><i>10052</i>例</div>
                      </div>
                    </a>
                  </object>
                </li>
                <li class="icon_li">
                  <i class="icon_line"></i>
                  <object><a class="a_yuanbbox">
                    <div class="border-circle"></div>
                    <div class="cycle"><span class="num_icon2"></span></div>
                    <div class="num_wordbox">
                      <p class="num_pword">转化基金</p>
                      <div class="num_sz"><i>30</i>家</div>
                    </div>
                  </a></object>
                </li>
                <li class="icon_li">
                  <i class="icon_line"></i>
                  <object><a class="a_yuanbbox">
                    <div class="border-circle"></div>
                    <div class="cycle"><span class="num_icon2"></span></div>
                    <div class="num_wordbox">
                      <p class="num_pword">平台专家</p>
                      <div class="num_sz"><i>51779</i>人</div>
                    </div>
                  </a></object>
                </li>
                <li class="icon_li">
                  <i class="icon_line"></i>
                  <object><a class="a_yuanbbox">
                    <div class="border-circle"></div>
                    <div class="cycle"><span class="num_icon4"></span></div>
                    <div class="num_wordbox">
                      <p class="num_pword">创新机构</p>
                      <div class="num_sz"><i>6025</i>家</div>
                    </div>
                  </a></object>
                  <i class="icon_line"></i>
                </li>
              </ul>
            </div>
          </div>
        </a>
      </div>
    </div>
    <div class="content">
      <div class="item interface" @click="()=>{this.$router.push('/shopping')}">
        <div class="cons">
          <h2>数据接口</h2>
          <div class="item-content">
            <img src="@/assets/font/index/interface.png" alt="">
            <ul>
              <li><a href="javascript:void(0)">开放的http接口</a></li>
              <li><a href="javascript:void(0)">支持跨语言跨平台调用</a></li>
              <li><a href="javascript:void(0)">智能化的数据分析</a></li>
              <li><a href="javascript:void(0)">接口毫秒级响应</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="item function">
        <div class="cons">
          <h2>核心功能</h2>
          <div class="item-content">
            <img src="@/assets/font/index/function.png" alt="">
            <ul>
              <li>
                <span class="iconfont icontongyi"></span>
                <h3>汇聚整合</h3>
                <p>实现多方数据源数据整合，统一管理维护。</p>
              </li>
              <li>
                <span class="iconfont iconshezhi"></span>
                <h3>提纯加工</h3>
                <p>连通全域数据，通过统一的数据标准和质量体系，建设提纯加工后的标准数据资产体系，以满足企业业务对数据的需求。</p>
              </li>
              <li>
                <span class="iconfont iconkaifangjihua"></span>
                <h3>开放平台</h3>
                <p>便捷、快速的服务开发环境，方便开发人员快速开发数据应用。</p>
              </li>
              <li>
                <span class="iconfont iconkeshihua"></span>
                <h3>服务可视化</h3>
                <p>帮助企业快速实现数据资产的可视化分析，提供包括实时流数据分析、预测分析、机器学习等更为高级的服务，为企业数据化运营赋能。</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="item characteristic">
        <div class="cons">
          <h2>优势特性</h2>
          <ul>
            <li>
              <div class="liTop">
                <span class="iconfont iconjisu_-"></span>
                <h4>数据急速访问</h4>
              </div>
              <p>依托于RMS-Cloud搜索引擎，实现检索接口毫秒级返回速度，支持高并发。</p>
            </li>
            <li>
              <div class="liTop">
                <span class="iconfont iconanquan"></span>
                <h4>系统安全稳定</h4>
              </div>
              <p>平台接口均采用令牌二次加密技术，保证用户接口的安全性。</p>
            </li>
            <li>
              <div class="liTop">
                <span class="iconfont iconlianjie"></span>
                <h4>APP应用入驻</h4>
              </div>
              <p>对于入驻的应用，将不受令牌时效限制，提升接入的效率和性能。</p>
            </li>
            <li>
              <div class="liTop">
                <span class="iconfont icontuoguan"></span>
                <h4>资源托管</h4>
              </div>
              <p>提供资源托管服务，可选择托管资源公有或私有，同时提供资源的管理接口。</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="item introduce">
        <div class="cons">
          <h2>服务介绍</h2>
          <ul class="con">
            <li class="conIli">
              <div class="liTop">
                <span class="iconfont iconmianfei"></span>
                <h4>免费接入</h4>
              </div>
              <ul>
                <li>接口访问次数20次</li>
                <li>数据报表实时生成</li>
                <li>全方位技术支持</li>
              </ul>
              <a href="http://apit.kefuju.cn/manager/admin/login.html">注册/登录</a>
            </li>
            <li class="conIli">
              <div class="liTop">
                <span class="iconfont iconhuangguan"></span>
                <h4>VIP用户</h4>
              </div>
              <ul>
                <li>全域检索</li>
                <li>应用入驻</li>
                <li>资源托管</li>
                <li>资源管理</li>
                <li>数据报表实时反馈</li>
                <li>专项团队专线服务</li>
              </ul>
              <a href="javascript:void(0)">在线咨询</a>
            </li>
            <li class="conIli">
              <div class="liTop">
                <span class="iconfont iconyun2"></span>
                <h4>私有云客户</h4>
              </div>
              <ul>
                <li>全域检索</li>
                <li>应用入驻</li>
                <li>私有数据托管</li>
                <li>资源管理</li>
                <li>数据报表实时反馈</li>
                <li>专项团队专线服务</li>
              </ul>
              <a href="javascript:void(0)">在线咨询</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="item list">
        <div class="cons">
          <h2>完整功能列表</h2>
          <div class="item-content">
            <el-table
              :data="tableData"
              border
              :span-method="dataSpanMethod"
              :row-class-name="tableRowClassName"
              style="width: 100%">
              <el-table-column
                prop="platform"
                label="平台功能"
                width="180">
              </el-table-column>
              <el-table-column
                prop="function"
                label="功能介绍"
                width="180">
              </el-table-column>
              <el-table-column
                prop="free"
                label="免费用户">
                <template slot-scope="scope">
                  <span style="color: #3ca805;" class="iconfont iconduihao-copy" v-if="scope.row.free===true"></span>
                  <span style="color: #cecece;" class="iconfont iconhengxian" v-else-if="scope.row.free===false"></span>
                  <span v-else>{{scope.row.free}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="vip"
                label="VIP用户">
                <template slot-scope="scope">
                  <span style="color: #3ca805;" class="iconfont iconduihao-copy" v-if="scope.row.vip===true"></span>
                  <span style="color: #cecece;" class="iconfont iconhengxian" v-else-if="scope.row.vip===false"></span>
                  <span v-else>{{scope.row.vip}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="me"
                label="私有云用户">
                <template slot-scope="scope">
                  <span style="color: #3ca805;" class="iconfont iconduihao-copy" v-if="scope.row.me===true"></span>
                  <span style="color: #cecece;" class="iconfont iconhengxian" v-else-if="scope.row.me===false"></span>
                  <span v-else>{{scope.row.me}}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <!--      <div class="item us">-->
      <!--        <div class="cons">-->
      <!--          <h2>联系我们</h2>-->
      <!--          <div class="item-content">-->
      <!--            <div class="phone">-->
      <!--              <div class="phone-item">-->
      <!--                <span class="iconfont icondianhua"></span>-->
      <!--                联系电话：010-58882692-->
      <!--              </div>-->
      <!--              <div class="phone-item">-->
      <!--                <span class="iconfont iconxinbanQQqie"></span>-->
      <!--                <a href="tencent://message/?Site=baidu.com&uin=1053848752&Menu=yes">技术支持QQ</a>-->
      <!--              </div>-->
      <!--              <div class="phone-item">-->
      <!--                <span style="font-size: 24px;vertical-align: middle" class="iconfont iconshangwu"></span>-->
      <!--                商务咨询：liubowen@wanfangdata.com.cn-->
      <!--              </div>-->
      <!--            </div>-->
      <!--            <p>或留下您的联系方式，我们将有专人与您联系</p>-->
      <!--            <el-form :inline="true" class="demo-form-inline">-->
      <!--              <el-form-item>-->
      <!--                <el-input placeholder="姓名"></el-input>-->
      <!--              </el-form-item>-->
      <!--              <el-form-item>-->
      <!--                <el-input placeholder="电话"></el-input>-->
      <!--              </el-form-item>-->
      <!--              <el-form-item>-->
      <!--                <el-input placeholder="公司名称"></el-input>-->
      <!--              </el-form-item>-->
      <!--              <el-form-item>-->
      <!--                <el-input placeholder="所在部门"></el-input>-->
      <!--              </el-form-item>-->
      <!--              <br>-->
      <!--              <el-form-item>-->
      <!--                <el-button type="primary" @click="handleFormSubmit">提交</el-button>-->
      <!--              </el-form-item>-->
      <!--            </el-form>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
    </div>
    <el-dialog title="请先填写表单进行预约" :visible.sync="dialogMakeVisible" :close-on-click-modal="false">
      <el-form :rules="rules" ref="dialogMakeForm" :model="form">
        <el-form-item prop="name">
          <el-input placeholder="姓名" v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="org">
          <el-input placeholder="工作单位" v-model="form.org" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input placeholder="联系方式" v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('dialogMakeForm')">取 消</el-button>
        <el-button type="primary" @click="handleSubmitDialog('dialogMakeForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {getIndexList} from '@/api'

  export default {
    name: "indexs",
    data() {
      return {
        rules: {
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'},
          ],
          org: [
            {
              require: true, message: '请输入工作单位', trigger: 'blur'
            }
          ],
          phone: [
            {
              require: true, message: '请输入联系方式', trigger: 'blur'
            }
          ]
        },
        tableData: [],
        dialogMakeVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
        },
      }
    },
    computed: {
      // swiper() {
      //   return this.$refs.mySwiper.$swiper
      // }
    },
    mounted() {
      // console.log('Current Swiper instance object', this.swiper)
      // this.swiper.slideTo(1, 1000, false)

      getIndexList().then((res) => {
        this.tableData = res.data;
      })
    },
    methods: {
      handleSubmitDialog(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.$mesage.success("预约成功");
            this.dialogMakeVisible = false;
          } else {
            this.$message.error("请完善您的信息");
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.dialogMakeVisible = false;
      },
      handleFormSubmit() {
        this.$message.success("提交成功")
      },
      //隔行变色
      tableRowClassName({row, rowIndex}) {
        if (rowIndex % 2 !== 1) {
          return 'success-row'
        }
        return "";
      },
      //跨行跨列
      dataSpanMethod({row, column, rowIndex, columnIndex}) {
        if (columnIndex === 0) {//第一列合并
          if (row.isFirst) {
            return {
              rowspan: row.len,
              colspan: 1
            }
          } else {
            return {
              rowspan: 0,
              colspan: 0
            }
          }
        }
      }
    }
  }
</script>
<style lang="scss" scoped>

  .swiper {
    background: #0c1155;
    height: 530px;
    width: 100%;
    position: relative;

    .CGZH2020_main {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;
    }

    .banner_bg {
      float: left;
      overflow: hidden;
      display: inline-block;

      &.banner_imgbg2 {
        background: url(../../assets/font/index/cgzh_bn2.jpg) no-repeat top center;
        height: 530px;
        width: 100%;
      }

      .banner_word {
        width: 1200px;
        margin: 0 auto;

        .banner_title {
          font-size: 38px;
          font-weight: 200;
          margin-bottom: 20px;
          color: #fff;
          margin-top: 100px;
        }

        .banner_pword {
          font-size: 18px;
          line-height: 30px;
          margin-bottom: 50px;
          color: #fff;
          display: block;
        }

        .sy_btn {
          background: url(../../assets/font/index/sy_bt.png) no-repeat;
          font-size: 16px;
          width: 128px;
          height: 40px;
          line-height: 40px;
          display: block;
          color: #fff;
          text-align: center;
          border: none;
        }

        .sy_btn:hover {
          background: #ff7309;
          border-radius: 3px;
        }
      }

      .CGZH2020_plate1 {
        background: url(../../assets/font/index/ul_bg.png) repeat-x;
        height: 120px;
        width: 100%;
        position: absolute;
        left: 0px;
        bottom: 0px;
        z-index: 11;

        .icon_li {
          width: 300px;
          float: left;
          box-sizing: border-box;
          overflow: hidden;

          .a_yuanbbox {
            float: left;
            color: #fff;
            position: relative;
            width: 220px;
            margin-left: 40px;
            overflow: hidden;
            margin-top: 10px;

            .border-circle {
              float: left;
              width: 100px;
              height: 100px;
              margin-right: 15px;
              background: url(../../assets/font/index/border-white.png) no-repeat center center/contain;
            }

            &:hover {
              .border-circle {
                background: url(../../assets/font/index/border-yellow.png) no-repeat center center/contain;
                transition: transform 2s;
                transition-timing-function: ease;
                transform: rotate(360deg);
              }

              .cycle {
                background-color: #ff9e2c;
                animation: all 3s;
              }
            }

            .cycle {
              display: inline-block;
              width: 84px;
              height: 84px;
              background-color: rgba(255, 255, 255, .1);
              border-radius: 50%;
              position: absolute;
              top: 8px;
              left: 9px;

              .num_icon1, .num_icon2, .num_icon3, .num_icon4 {
                display: inline-block;
                height: 37px;
                background-image: url(../../assets/font/index/num_icon.png);
                margin-top: 23px;
                margin-left: 25px;
              }

              .num_icon1 {
                background-position: 0 0px;
                width: 34px;
              }

              .num_icon2 {
                background-position: 0  -52px;
                width: 37px;
              }

              .num_icon3 {
                background-position: 0  -104px;
                width: 34px;
              }

              .num_icon4 {
                background-position: 0  -168px;
                width: 34px;
              }
            }

            .num_pword {
              padding-top: 15px;
              font-size: 16px;
            }

            .num_sz {
              font-size: 12px;
              padding-top: 15px;

              i {
                font-size: 30px;
                font-style: normal;
                display: inline-block;
                padding-right: 3px;
              }
            }
          }
        }

        .icon_line {
          background: url(../../assets/font/index/jb_line.png) no-repeat;
          width: 1px;
          height: 76px;
          float: left;
          margin-top: 20px;
        }
      }
    }
  }


  .index {
    background-color: #fafafa;
  }

  .consulting {
    cursor: pointer;
    width: 100%;
    height: 400px;
    background-image: linear-gradient(-54deg, #0941d2 0%, #1e5bde 50%, #3072ea 100%);

    .container {
      width: 1200px;
      margin: 0 auto;
      position: relative;

      .txt {
        position: absolute;
        top: 100px;
        width: 630px;
        user-select: none;

        h2, p {
          font-weight: normal;
          font-stretch: normal;
          color: #ffffff;
        }

        h2 {
          line-height: 1;
          font-size: 36px;
          letter-spacing: 2px;
          /*text-shadow: 0 4px 4px #000;*/
        }

        p {
          font-size: 16px;
          letter-spacing: 2px;
          margin-top: 20px;
        }

        a {
          margin-top: 30px;
          width: 140px;
          height: 46px;
          line-height: 46px;
          font-size: 14px;
          display: inline-block;
          border-radius: 4px;
          text-align: center;
          background-color: #ffffff;
          color: #063c80;
        }
      }

      img {
        position: absolute;
        right: 0;
      }
    }
  }

  .content {
    margin: 0 auto;

    .item {
      padding: 30px 0 40px;

      .cons {
        width: 1200px;
        margin: 0 auto;
      }

      h2 {
        padding-top: 30px;
        font-size: 36px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 4px;
        color: #06407f;
        text-align: center;
        margin-bottom: 30px;
      }
    }

    .item.interface {
      padding-left: 80px;
      padding-right: 80px;
      transition: background-color .3s;
      background-color: #fff;
      cursor: pointer;

      &:hover {
        background-color: #f5f8fd;
      }

      .item-content {
        img {
          display: inline-block;
          vertical-align: middle;
        }

        ul {
          margin-left: 170px;
          display: inline-block;
          vertical-align: middle;

          li {
            position: relative;

          }

          li:before {
            margin-right: 10px;
            content: '';
            display: inline-block;
            width: 10px;
            height: 10px;
            background-color: #dcdcdc;
            border-radius: 50%;
          }

          a {
            font-size: 18px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 40px;
            letter-spacing: 1px;
            color: #666666;
          }
        }
      }
    }

    .item.function {
      img, ul {
        display: inline-block;
        vertical-align: middle;
      }

      img {
        margin-left: 30px;
      }

      ul {
        width: 680px;
        padding-left: 60px;

        li {
          width: 300px;
          margin-right: 30px;
          vertical-align: top;
          display: inline-block;
          color: #13436d;

          .iconfont {
            font-size: 42px;
          }

          h3 {
            font-size: 24px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 30px;
            letter-spacing: 2px;
            color: #06407f;
          }

          p {
            font-size: 16px;
            font-weight: normal;
            letter-spacing: 2px;
            text-align: justify;
            color: #06407f;
          }
        }
      }
    }

    .item.characteristic {
      background-color: #fff;

      ul {
        width: 100%;
        padding-top: 10px;

        li {
          outline: 1px solid #e5e5e5;
          display: inline-block;
          vertical-align: middle;
          height: 300px;
          width: 270px;
          margin-right: 36px;
          cursor: pointer;
          transition: outline .3s;

          .liTop {
            width: 100%;
            height: 116px;
            padding-top: 50px;
            text-align: center;
            background-color: #ffffff;
            transition: background-color .3s;

            span {
              font-size: 28px;
              color: #06407f;
              transition: color .3s;
            }

            h4 {
              transition: color .3s;
              font-size: 16px;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 2px;
              color: #666666;
              text-align: center;
            }
          }

          p {
            padding: 30px 10px 0;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 1px;
            color: #aaaaaa;
            text-align: justify;
          }

          &:last-of-type {
            margin-right: 0;
          }

          &:hover {
            outline: 1px solid #438af4;

            .liTop {
              background-color: #2e6fe8;

              span, h4 {
                color: #ffffff;
              }
            }
          }
        }
      }
    }

    .item.introduce {
      background-color: #fff;

      ul.con {
        padding-top: 10px;

        .conIli {
          width: 355px;
          height: 453px;
          display: inline-block;
          vertical-align: top;
          background-image: linear-gradient(182deg, #f1faff 0%, #ffffff 100%);
          margin-right: 60px;
          position: relative;

          .liTop {
            color: #06407f;
            text-align: center;
            padding-top: 70px;

            span {
              font-size: 30px;
            }

            h4 {
              font-size: 18px;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 2px;
            }
          }

          ul {
            padding-top: 40px;
            padding-left: 100px;

            li {
              font-size: 16px;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 2px;
              color: #aaaaaa;

              &:before {
                content: '';
                margin-right: 16px;
                width: 8px;
                height: 8px;
                display: inline-block;
                background-image: linear-gradient(0deg, #54cfec 0%, #2376ff 100%);
                border-radius: 50%;
              }
            }
          }

          a {
            position: absolute;
            display: block;
            width: 100%;
            bottom: 40px;
            text-align: center;
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 2px;
            color: #06407f;
            border-radius: 4px;

            & {
              width: 100px;
              height: 30px;
              line-height: 30px;
              background-color: transparent;
              border: solid 1px transparent;
              left: 50%;
              transform: translateX(-50px);
              transition: background-color .3s, border .3s;
            }

            &:hover {
              background-color: #ffffff;
              border: solid 1px #438af4;
            }
          }

          &:last-of-type {
            margin-right: 0;
          }
        }
      }
    }

    .item.list {
      background-color: #fff;

      .item-content {
        width: 960px;
        padding-top: 10px;
        margin: 0 auto;
      }
    }

    .item.us {
      background-color: #fff;

      .item-content {
        width: 750px;
        margin: 0 auto;

        .phone {
          .phone-item {
            display: inline-block;
            margin-right: 30px;
            padding-right: 30px;
            text-align: center;
            position: relative;

            a {
              color: #131313;
            }

            &:after {
              position: absolute;
              top: 50%;
              right: 0;
              transform: translateY(-6px);
              display: inline-block;
              content: '';
              padding: 6px 1px;
              background-color: #d8dfea;
            }

            &:last-of-type:after {
              padding: 0;
            }
          }

        }

        p {
          text-align: center;
          margin-top: 30px;
          margin-bottom: 20px;
        }

      }
    }

  }
</style>
<style lang="scss">
  .item.list .item-content {
    .el-table {
      .el-table__header-wrapper {
        th {
          background-color: #00a0e9 !important;
          border-right: 1px solid #1aa9eb !important;
          color: #ffffff !important;
          text-align: center;
        }
      }

      .el-table__body-wrapper {
        tr, td {
          text-align: center !important;
        }
      }
    }
  }

  .el-table .success-row {
    background-color: #f8fafb !important;
  }

  .swiper {
    .el-carousel__container {
      height: 100%;
    }
  }
</style>
