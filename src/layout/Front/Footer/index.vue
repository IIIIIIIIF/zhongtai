<template>
  <div class="CGZH2020_footer">
    <div class="CGZH2020_main clear">
      <div class="one">
        <div class="tt">数据来源</div>
        <div class="txt">
          科技成果库 100万+
          <br>
          专利数据库 2000万+
          <br>
          研发合作库 252万+
          <br>
          科技人才库 2000万+
          <br>
          科研机构库 22000+
        </div>
      </div>
      <div class="one">
        <div class="tt">联系我们</div>
        <div class="txt">
          电话：010-58882692 <br>邮箱：xiongwei@wanfangdata.com.cn <br>地址：北京市海淀区复兴路15号
          <br>邮编：100038
        </div>
      </div>
      <div class="one">
        <div class="tt">友情链接</div>
        <div class="txt">
          <a href="http://www.chinatorch.gov.cn/" target="_blank">科技部火炬中心</a>
          <a href="http://www.cppc.org.cn/" target="_blank">中国生产力促进中心协会</a>
          <a href="http://www.istic.ac.cn/" target="_blank">中国科学技术信息研究所</a>
        </div>
      </div>
      <div class="one">
        <div class="tt">微信小程序</div>
        <div class="txt">
          <img class="EWM" src="@/assets/font/home_EWM.png">
        </div>
      </div>
    </div>
    <div style="margin:30px auto 0;padding:0px 0;text-align: center;">
      <p class="foc" style="text-align: center;font-size: 14px;color:#939393">京ICP备12020743号-3</p>

      <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802020603"
         style="display:inline-block;text-decoration:none;height:20px;line-height:20px;text-align: center;">

        <p style="height:20px;line-height:20px;margin: 0px 0px 0px  5px;color:#939393;text-align: center;font-size: 14px;">
          <img align="absmiddle" src="http://stads.infosoft.cc/images/ING.png"> 京公网安备 11010802020603号</p>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {}
    }
  }
</script>

<style lang="scss" scoped>
  .CGZH2020_footer {
    background-color: #363A3F;
    padding: 50px 0;
    .CGZH2020_main{
      width: 1200px;
      overflow: hidden;
      margin: 0 auto;
      .one {
        display: inline-block;
        float: left;
        width: auto;
        margin-right: 110px;
        .tt {
          line-height: 30px;
          height: 45px;
          font-size: 16px;
          color: #FFFFFF;
        }
        .txt {
          line-height: 28px;
          font-size: 14px;
          color: #c7c7c7;
          a {
            display: block;
            font-size: 14px;
            color: #c7c7c7;
          }
        }
        .EWM {
          width: 120px;
          height: 120px;
        }
      }
    }
  }

</style>
