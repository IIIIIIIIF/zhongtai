<template>
  <div class="recommendExpert">
    <com-table
      class="recommendExpertTable"
      :spanMethod="mergeColumn"
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
            {prop: 'org', label: '机构名称'},
            {prop: 'two', label: '二级机构'},
            {prop: 'score', label: '推荐指数'},
          ],
          //是否分页
          isPage: true,
          //loading加载
          loading: false
        },
        mergingRows:[],
        mergingPos:""
      }
    },
    mounted(){

    },
    methods:{

      dataPretreatment(){
        this.mergingRows=[];
        this.mergingPos='';
        for(let i = 0; i < this.table.data.length; i ++){ // tabledata 表格数据源
          if(i === 0){
            this.mergingRows.push(1)
            this.mergingPos = 0
          }else {
            if(this.table.data[i].org === this.table.data[i - 1].org) { //哪些数据是要合并的 合并的条件是什么

              this.mergingRows[this.mergingPos] +=1
              this.mergingRows.push(0)
            }else {
              this.mergingRows.push(1)
              this.mergingPos = i
            }
          }
        }
      },
      // el 动态合并单元格  https://www.cnblogs.com/ifannie/p/11882428.html
      mergeColumn({row,column,rowIndex,columnIndex}){
        if (columnIndex === 0) { //第一列
          const _row = this.mergingRows[rowIndex];
          const _col = _row>0 ? 1 : 0;
          return {
            rowspan: _row,
            colspan: _col
          }
        }
        // if (columnIndex === 0) { //第一列
        //   const _row = this.mergingRows[rowIndex];
        //   const _col = _row>0 ? 1 : 0;
        //   return {
        //     rowspan: _row,
        //     colspan: _col
        //   }
        // }
        // if(columnIndex === 1){  //第二列 每一行的条件可以不一样 这样就是动态多样合并表格啦
        //     const _row = this.mergingRows[rowIndex];
        //     const _col = _row>0 ? 1 : 0;
        //      return {
        //          rowspan: _row,
        //          colspan: _col
        //      }
        //  }
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
          this.dataPretreatment();
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
