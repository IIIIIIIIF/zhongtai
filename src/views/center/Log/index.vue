<template>
  <div class="my_settlement">
    <com-table
      :tableDataLoading="table.loading"
      :tableData="table.data"
      :tableOption="table.option"
      :isOperate="table.isOperate"
      :isPage="table.isPage">
      <template slot-scope="scope" slot="status">
        {{scope.row.status | formatterStatus}}
      </template>
      <template slot="error_info" slot-scope="scope">
        <el-link v-if="scope.row.error_info" type="primary" @click="handleClickSee(scope.row)">查看</el-link>
      </template>
      <template slot="join_time" slot-scope="scope">
        {{scope.row.join_time | formatterDate}}
      </template>
    </com-table>
    <el-dialog
      :title="dialog.title"
      :close-on-click-modal="false"
      width="400px"
      :visible.sync="dialog.visible"
    >
      <table>
        <tr>
          <td align="right">资源编号：</td>
          <td>{{dialog.row.index_id}}</td>
        </tr>
        <tr>
          <td align="right">文件名：</td>
          <td>{{dialog.row.file_name}}</td>
        </tr>
        <tr>
          <td align="right">上传状态：</td>
          <td>{{dialog.row.status | formatterStatus}}</td>
        </tr>
        <tr>
          <td align="right">数据条数：</td>
          <td>{{dialog.row.number}}</td>
        </tr>
        <tr>
          <td align="right">上传时间：</td>
          <td>{{dialog.row.join_time}}</td>
        </tr>
        <tr>
          <td align="right">错误信息：</td>
          <td>{{dialog.row.number}}</td>
        </tr>
      </table>
    </el-dialog>
  </div>
</template>

<script>
  import {managerResourceGetFileJoinList} from "../../../api/manager";
  import {mapGetters} from 'vuex'
  import {logout} from "../../../tools/utils";

  export default {
    name: "index",
    filters:{
      //上传状态
      formatterStatus(val){
        if(val===1){
          return '成功'
        }else{
          return '失败'
        }
      },
      //时间格式化
      formatterDate(val){
        let date=new Date(val);
        let year=date.getFullYear();//年
        let month=(date.getMonth()+1).toString().padStart(2,0);//月+1
        let dDate=(date.getDate()).toString().padStart(2,0);//日
        let hours=(date.getHours()).toString().padStart(2,0);//时
        let minutes=(date.getMinutes()).toString().padStart(2,0);//分
        let seconds=(date.getSeconds()).toString().padStart(2,0);//秒
        return `${year}-${month}-${dDate} ${hours}:${minutes}:${seconds}`;
      }
    },
    data() {
      return {
        tableData: [],
        size: this.$store.getters.getAppSize,
        table: {
          //表格数据
          data: [],
          option: [
            // {type:'selection', label:'#'},
            {prop: 'index_id', label: '资源编号'},
            {prop: 'file_name', label: '文件名'},
            {prop: 'status', label: '上传状态',isSlot:true,name:"status"},
            {prop: 'join_time', label: '上传时间',isSlot:true,name:"join_time"},
            {prop: 'error_info', label: '错误信息',isSlot:true,name:"error_info"},
            {prop: 'number', label: '数据条数'},
            // {name:'operate', label:'操作',isSlot: true},
          ],
          //是否分页
          isPage: true,
          //loading加载
          loading: false
        },
        dialog: {
          visible: false, //是否显示dialog
          row:{},
          title:"错误信息"
        }
      }
    },
    mounted() {
      this.loadData()
    },
    methods: {
      ...mapGetters(['getUsersInfo']),
      logout,
      // TODO 显示table表格
      loadData() {
        let info = this.getUsersInfo();
        if (!info.id) {
          this.$message.error('用户信息获取失败，请重新登录');
          this.logout();
          return false;
        }
        this.table.loading = true;
        managerResourceGetFileJoinList({
          owner_id: info.id,
          field: 'id,index_id,resource_name,apply_name,apply_id,file_name,number,status,join_time,error_info'
        }).then((res) => {
          this.table.loading = false;
          if (res && res.code === 200 && res.data) {
            this.table.data = res.data;
          }
        })
      },
      handleClickSee(row){
        this.dialog.title="错误信息";
        this.dialog.row=row;
        this.dialog.visible=true;
      }
    }
  }
</script>
<style lang="scss" scoped></style>
