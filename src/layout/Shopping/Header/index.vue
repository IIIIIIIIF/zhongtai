<template>
  <div id="header">
    <div class="header clear">
      <div class="left pull-left">
        <Logo/>
      </div>
      <ul class="right pull-right">
        <li class="inlineBlock userInfos" style="display: none;">
          <a href="javascript:void(0)">退出</a>
        </li>
        <li class="inlineBlock line">
          <img align="absmiddle" src="@/assets/shopping/phoneicon.png" alt="">
          010-58882692
        </li>
        <li class="inlineBlock">
          <a href="tencent://message/?Site=baidu.com&uin=127886683&Menu=yes">
            <img align="absmiddle" src="@/assets/shopping/customer.png" alt="">
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Logo from './Logo';

  export default {
    name: "index",
    components:{
      Logo
    },
    data() {
      return {}
    },
    mounted() {
      document.title="资源管理服务·中台";
    }
  }
</script>

<style lang="scss" scoped>
  #header{
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    min-width: 1200px;
    .header{
      width: 100%;
      height: 50px;
      padding-top: 10px;
      padding-bottom: 4px;
      background-color: #ffffff;
      transition: box-shadow .3s;
      box-shadow: 0 2px 10px 0 rgba(49, 49, 49, 0.35);
      &:hover{
        box-shadow: 0 2px 10px 0 rgba(49, 49, 49, 0.5);
      }
      .right{
        li{
          height: 40px;
          line-height: 40px;
          margin-top: 0;
          font-family: MicrosoftYaHei;
          font-size: 18px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0;
          color: #4b4a4a;
          padding-right: 8px;
          margin-left: 4px;
          &.line{
            border-right: 1px solid #bfbfbf;
          }
        }
      }
    }
  }
</style>
