<template>
  <div class="articleList">
    <div class="vector-list-item" @click="dialogTableVisible=true">
      <h3 class="item-title">{{data.NAME}}</h3>
      <div class="authorTime"><span class="author" v-if="data.CORETEAM">作者：{{data.CORETEAM}} </span><span class="time">{{data.COLLECTDATE||""}}</span></div>
      <div class="keyword" v-if="data.CKEY">关键词：{{data.CKEY|filterKey}}</div>
      <div class="abstract overflow" v-if="data.ABS">摘要：<span v-html="data.ABS||''"></span></div>
    </div>
    <el-dialog title="详细信息" :visible.sync="dialogTableVisible">
      <h3 class="item-title">{{data.NAME}}</h3>
      <div class="authorTime"><span class="author" v-if="data.CORETEAM">作者：{{data.CORETEAM}} </span><span class="time">{{data.COLLECTDATE||""}}</span></div>
      <div class="keyword" v-if="data.CKEY">关键词：{{data.CKEY|filterKey}}</div>
      <div class="abstract" v-if="data.ABS">摘要：<span v-html="data.ABS||''"></span></div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name:'vectorListItem',
    props:{
      data:{
        type:Object,
        default:{}
      }
    },
    mounted(){
      console.log(this.data)
    },
    data(){
      return{
        dialogTableVisible:false
      }
    },
    filters:{
      filterKey(val){
        if(Array.isArray(val)){
          return val.toString()
        }
        return  val;
      }
    }
  }
</script>
<style lang="scss">
  .vector-list-item{
    padding: 14px 0;
    border-bottom: solid 1px #e5e5e4;
    >>> .el-dialog__body{
      padding-top:10px;
    }
  }
  .item-title{
    font-family: MicrosoftYaHei;
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    line-height: 19px;
    color: #333333;
  }
  .authorTime{
    .author,.time{
      font-family: MicrosoftYaHei;
      font-size: 14px;
      font-weight: normal;
      font-style: italic;
      font-stretch: normal;
      line-height: 23px;
      letter-spacing: 0px;
      color: #666666;
      display: inline-block;
      vertical-align: middle;
    }
    .author{
      margin-right: 8px;
    }
    .time{
      display: inline-block;
      color: #0f6ab4;
    }
  }
  .keyword,.abstract{
    font-family: MicrosoftYaHei;
    font-size: 14px;
    font-weight: normal;
    font-style: italic;
    font-stretch: normal;
    line-height: 23px;
    letter-spacing: 0px;
    color: #666666;
    &.abstract{
      sub{
        bottom: 0.5em;
      }
    }
  }
  .overflow{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }

</style>
