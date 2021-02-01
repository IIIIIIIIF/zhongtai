<template>
  <div>
    <com-table
      :tableDataLoading="table.loading"
      :tableData="table.data"
      :tableOption="table.option"
      :isOperate="table.isOperate"
      :isPage="table.isPage">
      <template slot="operate" slot-scope="scope">
        <el-button>删除</el-button>
      </template>
    </com-table>
  </div>
</template>

<script>
  // import {comTable} from "../../../components";

  export default {
    name: "index",
    // components: {comTable},
    data() {
      return {
        table:{
          data:[

          ],
          option:[
            // {type:'selection', label:'#'},
            {prop:'title', label:'稿件名称'},
            {prop:'status', label:'稿件状态'},
            {prop:'docAuthor', label:'作者'},
            {prop:'date', label:'提交时间',sortable:true},
          ],

          //控制操作列是否显示
          isOperate:true,
          //是否分页
          isPage:false,
          //loading加载
          loading:false
        },
      }
    },
    mounted(){

    }
  }
</script>

<style lang="scss" scoped>

</style>
