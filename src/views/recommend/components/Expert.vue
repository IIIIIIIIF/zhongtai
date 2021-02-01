<template>
  <div class="recommendExpert">
    <com-table
      class="recommendExpertTable"
      :tableDataLoading="table.loading"
      :tableData="table.data"
      :tableOption="table.option"
      :isOperate="table.isOperate"
      :isPage="table.isPage">
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
            {prop: 'CNAME', label: '专家姓名'},
            // {prop: '_ID', label: 'auid'},
            {prop: 'score', label: '推荐指数'},
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
