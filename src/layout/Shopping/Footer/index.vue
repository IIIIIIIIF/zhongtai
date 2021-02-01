<template>
    <div id="bottoms">
      <div class="bottom">
        <p>
          <a href="">联系我们</a>
          |
          <a href="">关于我们</a>
          <br>
          北京市海淀区复兴路15号 邮编：100038 电话：010-58882692
          <br>
          &copy;2018-2020 Infosoft 北京万方软件有限公司
        </p>
      </div>
    </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style lang="scss" scoped>
  #bottoms{
    .bottom{
      position: relative;

      width: 100%;
      min-width: 1200px;
      background-color: #108cff;
      font-family: MicrosoftYaHei;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0;
      color: #fff;
      text-align: center;
      padding: 6px 0;
      a{
        color: #ffffff;
        text-decoration: none;
        display: inline-block;
        margin: 0 20px;
      }
    }
  }
</style>
