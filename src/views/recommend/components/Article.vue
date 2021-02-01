<template>
  <div class="recommendExpert">
    <com-table
      class="recommendExpertTable"
      :tableDataLoading="table.loading"
      :tableData="table.data"
      :tableOption="table.option"
      :isOperate="table.isOperate"
      :isPage="table.isPage">
<!--      <template slot-scope="scope" slot="auid">-->
<!--        <el-link @click="handleClickSeeName(scope.row)" >查看专家姓名</el-link>-->
<!--      </template>-->
      <template slot="KEYWORD" slot-scope="scope">
        {{scope.row.source.KEYWORD|filterKeyWord}}
      </template>
      <template slot="ABSTRACT" slot-scope="scope">
        {{scope.row.source.ABSTRACT|filterAbstract}}
      </template>
    </com-table>
  </div>
</template>

<script>
  export default {
    name: "Expert",
    props:{
      list:{
        required:true,
        type:Array
      },
      options:{
        required:true,
        type:Object
      }
    },
    data() {
      return {
        table: {
          //表格数据
          data: [],
          option: [
            // {type:'selection', label:'#'},
            // {prop: 'source.ID', label: '文章编号'},
            {prop: 'source.TI', label: '标题'},
            {prop: 'source.KEYWORD', label: '关键词',name:'KEYWORD',isSlot:true},
            {prop: 'source.ABSTRACT', label: '摘要',name:'ABSTRACT',isSlot:true},
          ],
          //是否分页
          isPage: true,
          //loading加载
          loading: false
        },
      }
    },
    mounted(){

    },
    methods:{
      handleClickSeeName(row){

      }
    },
    filters:{
      filterKeyWord(val){
        if(Array.isArray(val)){
          return val.toString();
        }
        return  val;
      },
      filterAbstract(val){
        if(val&&val.indexOf('%')!==-1){
          val=val.split('%')[0];
        }
        return val;
      }
    },
    watch:{
      options:{
        immediate: true,
        deep:true,
        handler(options){
          this.table.loading=options.loading;
        }
      },
      list:{
        immediate:true,
        deep:true,
        handler(list){
          this.table.data=list;
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
