<template>
  <div class="comTable">
    <el-table
      :size="size"
      v-loading="tableDataLoading"
      :data="isPage?tableData.slice((page.currentPage-1)*page.pageSize,page.currentPage*page.pageSize):tableData"
      :span-method="spanMethod"
      highlight-current-row
      border
      stripe
      style="width: 100%">
      <template v-for="(item,index) in tableOption" >
        <el-table-column
          v-if="item.isSlot&&item.isShow!==false"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :align="item.align||'left'"
          :show-overflow-tooltip="item.overHidden||false"
          :min-width="item.width||'100px'"
          :fixed="item.fixed||false"
          :sortable="item.sortable||false"
          :type="item.type||'normal'">
          <template slot-scope="scope" v-if="item.isSlot===true">
            <slot :name="item.name" :row="scope.row"></slot>
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="!item.isSlot&&item.isShow!==false"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :align="item.align||'left'"
          :show-overflow-tooltip="item.overHidden||false"
          :min-width="item.width||'100px'"
          :fixed="item.fixed||false"
          :sortable="item.sortable||false"
          :type="item.type||'normal'"></el-table-column>
      </template>
    </el-table>
    <el-pagination
      v-if="isPage&&tableData.length>0"
      class="com-table-page"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="page.currentPage"
      :page-sizes="[10,20,30,50,100]"
      :page-size="page.pageSize"
      layout="total,sizes,prev,pager,next,jumper"
      :total="tableData.length"></el-pagination>
  </div>
</template>

<script>
  export default {
    name: "comTable",
    props: {
      "spanMethod":{
        type:Function,
        default:function(){

        }
      },
      //表格显示的数据
      tableData: {
        type: Array,
        default: []
      },
      //表格操作及列选项
      tableOption: {
        type: Array,
        default: function () {
          /**
           * {
           *    prop:对象中的键名
           *    label:表格的列名
           *    align:对齐方式，默认居左
           *    overHidden:过长时是否显示提示，默认不显示
           *    width:最小宽度，默认100px
           *    fixed 是否是固定列
           *    sortable 是否支持排序
           *    type 列的类型，是索引列还是多选列还是扩展列
           *    isSlot 是否需要卡槽
           *    isShow 是否显示当前列
           *    name 卡槽name
           *
           *
           * }
           */
          return []
        }
      },
      // 数据正在加载loading
      tableDataLoading: {
        type: Boolean,
        default: false
      },
      //是否需要分页
      isPage: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        size: this.$store.getters.getAppSize,
        page:{
          currentPage:1,
          pageSize:20
        },
        tableDatas:[],
      }
    },
    mounted(){},
    methods:{
      // 每页多少条
      handleSizeChange(val){
        this.page.pageSize=val;
      },
      handleCurrentChange(val){
        this.page.currentPage=val;
      },
    },
    watch:{
      tableData:{
        immediate:true,
        deep:true,
        handler(val){
          this.tableDatas=val;
          this.page.currentPage=1;
          this.$forceUpdate();
        },
      }
    }
  }
</script>

<style lang="scss" scoped>
  .com-table-page{
    margin-top: 20px;
  }
</style>
