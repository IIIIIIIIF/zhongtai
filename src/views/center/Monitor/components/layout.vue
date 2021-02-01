<template>
  <div class="monitor-com-layout">
    <h3 class="title" v-show="title">{{title}}</h3>
    <div class="main">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "layout",
    props:{
      title:{
        type:String,
        default:''
      }
    },
    data() {
      return {}
    }
  }
</script>

<style lang="scss" scoped>
  $borderColor:#eee;

  .monitor-com-layout{
    box-sizing: border-box;
    &>h3.title{
      font-size: 14px;
      box-sizing: border-box;
      font-weight: normal;
      /*<!--border: 1px solid $borderColor;-->*/
      display: inline-block;
      position: relative;
      padding-bottom: 10px;
      padding-top: 10px;
      padding-right: 40px;
    }
    &>.main{
      box-sizing: border-box;
      margin-bottom: 20px;
      /*<!--border: 1px solid $borderColor;-->*/
      min-height: 200px;
    }
  }
</style>
