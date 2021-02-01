<template>
  <el-scrollbar>
    <template>
      <div class="el-form-my">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item prop="type">
            <el-select
              :style="style"
              :size="size"
              v-model="search.status"
              @change="handleChangeStatus"
              placeholder="请选择状态">
              <el-option label="全部" :value="0"></el-option>
              <el-option label="审批中" :value="1"></el-option>
              <el-option label="已审核" :value="2"></el-option>
              <el-option label="未通过" :value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-tooltip v-if="showBtn.add" effect="dark" content="添加" placement="bottom-start">
              <el-button @click="handleAdd" :size="size" type="primary" icon="el-icon-plus"></el-button>
            </el-tooltip>
          </el-form-item>
        </el-form>
      </div>
      <com-table
        class="centerData"
        :tableDataLoading="table.loading"
        :tableData="table.data"
        :tableOption="table.option"
        :isOperate="table.isOperate"
        :isPage="table.isPage">
        <template slot-scope="scope" slot="name">
          {{handleLoadName(scope.row)}}
        </template>
        <template slot-scope="scope" slot="type">
          <span v-if="scope.row.type===1">公有</span>
          <span v-else>私有</span>
        </template>
        <template slot-scope="scope" slot="status">
            <span v-if="scope.row.status===1">
              <el-tooltip
                v-if="scope.row.status===1"
                effect="dark"
                content="审批"
                placement="bottom-start">
                <el-button
                  :loading="addLoading"
                  @click="handleClickApply(scope.row.id,scope.row.apply_id)"
                  :size="size"
                  type="success"
                  icon="el-icon-check"></el-button>
              </el-tooltip>
            </span>
          <span v-else-if="scope.row.status===2">已审核</span>
          <span v-else-if="scope.row.status===3">未通过</span>
          <span v-else>状态信息获取失败</span>
        </template>
      </com-table>
    </template>
  </el-scrollbar>
</template>

<script>
  import {
    resourceGetDataJoinApplyList,
    resourceGetIndexTypeList,
    resourceJoinApproal
  } from "@/api/settlement";
  import {logout} from "@/tools/utils";
  import {mapGetters} from 'vuex'

  export default {
    name: "index",
    data() {
      return {
        table: {
          //表格数据
          data: [],
          option: [
            // {type:'selection', label:'#'},
            {prop: 'index', label: '序号', width: "20px"},
            {prop: 'name', label: '入驻资源名称',isSlot:true,name:'name'},
            {prop: 'type', label: '资源类型',isSlot:true,name:'type'},
            {prop: 'apply_time', label: '入驻时间'},
            {prop: 'apply_name', label: '所有者'},
            {prop: 'status', label: '状态',isSlot:true,name:'status'},
            // {name:'operate', label:'操作',isSlot: true,width:'20px'},
          ],
          //是否分页
          isPage: true,
          //loading加载
          loading: false
        },
        showBtn: {
          add: false,
          update: false,
          delete: false,
        },
        addLoading: false,
        indexTypeList: {},
        size: this.$store.getters.getAppSize,
        style: "width:100%",
        search:{
          status:""
        }
      }
    },
    mounted() {
      this.initData();
      this.getLoad({});
    },
    methods: {
      logout,
      ...mapGetters(['getUsersInfo']),
      // TODO 加载表格数据
      getLoad({status}) {
        this.table.loading = true;
        let obj = {
          apply_name: "",
          id: "",
          field: 'id,type,name,forecast_size,join_type,update_type,update_cycle,status,apply_name,apply_id,apply_time,api_service'
        };
        if(status){
          obj.status=status;
        }
        resourceGetDataJoinApplyList(obj).then((res) => {
          this.table.loading = false;
          if (res && res.code === 200) {
            this.table.data = res.data || [];
            let i = 1;
            this.table.data.forEach(item => {
              item.index = i++;
            });
          } else {
            this.table.data = [];
          }
        });
      },
      // TODO 格式化数据
      handleLoadName(row) {
        return this.indexTypeList[row.name] || row.name;
      },
      // TODO 初始化数据
      initData() {
        resourceGetIndexTypeList({
          field: 'id,chn_name'
        }).then((res) => {
          if (res && res.code === 200 && res.data && res.data.length > 0) {
            let data = res.data || [];
            data.forEach(item => {
              this.indexTypeList[item['id']] = item['chn_name'];
            })
          }
        });
      },
      // TODO 审批
      handleClickApply(id, apply_id) {
        this.addLoading = true;
        resourceJoinApproal({
          id,
          userid: apply_id
        }).then((res) => {
          this.addLoading = false;
          if (res && res.code === 200) {
            this.$message.success('已审批');
            this.getLoad({status:this.search.status});
          } else {
            this.$message.error('申请失败');
          }
        })
      },
      handleChangeStatus(val){
        this.getLoad({status:val})
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-form-item__content .el-input-group {
    vertical-align: middle;
  }
</style>
