<template>
  <div class="my_settlement">
    <div class="el-form-my">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-tooltip
            effect="dark"
            content="资源入驻"
            placement="bottom-start">
            <el-button
              @click="handleOpenApply"
              :size="size"
              type="primary"
              icon="el-icon-plus"></el-button>
          </el-tooltip>
        </el-form-item>
      </el-form>
    </div>

    <el-table
      v-loading="tableDataLoading"
      :data="tableData"
      highlight-current-row
      border
      style="width: 100%">
      <el-table-column
        prop="index"
        width="50px"
        label="序号">
      </el-table-column>
      <el-table-column
        prop="name"
        label="入驻资源名称">
        <template slot-scope="scope">
<!--          <router-link target="_blank" :to="{path:'/test',query:{indexName:scope.row.id}}">{{handleLoadName(scope.row)}}</router-link>-->
          {{handleLoadName(scope.row)}}
        </template>
      </el-table-column>
      <el-table-column prop="type" label="资源类型">
        <template slot-scope="scope">
          <span v-if="scope.row.type===1">公有</span>
          <span v-else>私有</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="apply_time"
        label="入驻时间"></el-table-column>
      <el-table-column
        prop="status"
        label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status===1">审批中</span>
          <span v-else-if="scope.row.status===2">已审核</span>
          <span v-else-if="scope.row.status===3">未通过</span>
          <span v-else>状态信息获取失败</span>
        </template>
      </el-table-column>
<!--      <el-table-column-->
<!--        prop="status"-->
<!--        label="操作">-->
<!--        <template slot-scope="scope">-->
<!--          {{scope.row}}-->
<!--          <el-button-group v-if="scope.row.status===2">-->
<!--            <el-tooltip-->
<!--              effect="dark"-->
<!--              content="文件上传"-->
<!--              placement="bottom-start">-->
<!--              <el-button-->
<!--                @click="handleOpenFile(scope.row.id)"-->
<!--                :size="size"-->
<!--                type="primary"-->
<!--                icon="el-icon-folder-checked"></el-button>-->
<!--            </el-tooltip>-->
<!--            <el-tooltip-->
<!--              effect="dark"-->
<!--              content="接口上传"-->
<!--              placement="bottom-start">-->
<!--              <el-button-->
<!--                type="danger"-->
<!--                :size="size"-->
<!--                icon="el-icon-upload"-->
<!--                @click="handleOpenInterface(scope.row.id)"></el-button>-->
<!--            </el-tooltip>-->
<!--          </el-button-group>-->
<!--        </template>-->
<!--      </el-table-column>-->
    </el-table>
    <el-dialog
      :title="dialog.title"
      :close-on-click-modal="false"
      :width="dialog.width"
      :visible.sync="dialog.open">
      <Apply @close="handleCloseDialog" v-if="dialog.visibleApply"/>
      <FileUpload :id="dialog.id" @close="handleCloseDialog" v-if="dialog.visibleFile"/>
      <InterfaceUpload :id="dialog.id" @close="handleCloseDialog" v-if="dialog.visibleInterface"/>
    </el-dialog>
  </div>
</template>

<script>
  import {resourceGetDataJoinApplyList,resourceGetIndexTypeList} from "../../../api/settlement";
  import {mapGetters} from 'vuex'
  import {Apply,FileUpload,InterfaceUpload} from "./index.js";

  export default {
    name: "index",
    components:{Apply,FileUpload,InterfaceUpload},
    data() {
      return {
        dialog:{
          id:"",
          title:"资源入驻",
          width:"550px",
          visibleApply:false,//入驻申请
          visibleFile:false,//文件上传
          visibleInterface:false,//接口上传
          open:false,
        },
        tableData: [],
        tableDataLoading: false,
        indexTypeList:{},
        size: this.$store.getters.getAppSize,
      }
    },
    mounted() {
      this.initData();
      this.loadData({});
    },
    methods: {
      ...mapGetters(['getUsersInfo']),
      initData(){
        resourceGetIndexTypeList({
          field:'id,chn_name'
        }).then((res) => {
          if (res && res.code === 200 && res.data && res.data.length > 0) {
            let data=res.data||[];
            data.forEach(item=>{
              this.indexTypeList[item['id']]=item['chn_name'];
            })
          }
        });
      },
      loadData({}) {
        this.tableDataLoading = true;
        let info = this.getUsersInfo();
        resourceGetDataJoinApplyList({
          apply_id: info.id,
          apply_name: "",
          id: "",
          field:'id,type,name,forecast_size,join_type,update_type,update_cycle,status,apply_name,apply_id,apply_time,api_service'
        }).then((res) => {
          this.tableDataLoading = false;
          if (res && res.code === 200 && res.data && res.data.length > 0) {
            this.tableData = res.data || [];
            let i = 1;
            this.tableData.forEach(item => {
              item.index = i++;
            });
          }
        })
      },
      handleLoadName(row){
        return this.indexTypeList[row.name]||row.name;
      },
      handleOpenApply(){
        this.dialog.title="资源入驻";
        this.dialog.open=true;
        this.dialog.visibleApply=true;
        this.dialog.visibleFile=false;
        this.dialog.visibleInterface=false;
        this.dialog.width="550px";
      },
      handleOpenFile(id){
        this.dialog.id=id;
        this.dialog.title="文件上传";
        this.dialog.open=true;
        this.dialog.visibleFile=true;
        this.dialog.visibleApply=false;
        this.dialog.visibleInterface=false;
        this.dialog.width="450px";
      },
      handleOpenInterface(id){
        this.dialog.id=id;
        this.dialog.title="接口上传";
        this.dialog.open=true;
        this.dialog.visibleInterface=true;
        this.dialog.visibleFile=false;
        this.dialog.visibleApply=false;
        this.dialog.width="550px";
      },
      handleCloseDialog(){
        this.dialog.open=false;
        this.dialog.visibleInterface=false;
        this.dialog.visibleFile=false;
        this.dialog.visibleApply=false;
      }
    },
    watch:{
      $route(){
        this.initData();
        this.loadData({});
      }
    }
  }
</script>
<style lang="scss" scoped></style>
