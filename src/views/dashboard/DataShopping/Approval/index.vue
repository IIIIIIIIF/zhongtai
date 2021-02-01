<template>
  <el-scrollbar>
    <template>
      <div class="el-form-my">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item>
            <el-select
              :size="size"
              v-model="status"
              @change="handleClickSearch"
              placeholder="请选择审核状态">
              <el-option :value="-1" label="所有"></el-option>
              <el-option :value="1" label="未审核"></el-option>
              <el-option :value="2" label="审核中"></el-option>
              <el-option :value="3" label="审核通过"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input v-model="username" :size="size" placeholder="请输入用户名">
              <el-button type="primary" slot="append" icon="el-icon-search" @click="handleClickSearch"></el-button>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <com-table
        :tableDataLoading="table.loading"
        :tableData="table.data"
        :tableOption="table.option"
        :isOperate="table.isOperate"
        :isPage="table.isPage">
        <template slot="type" slot-scope="scope">
          <span v-if="scope.row.type===1">接口</span>
          <span v-else>索引</span>
        </template>
        <template slot="status" slot-scope="scope">
          <el-button-group v-if="scope.row.status===1||scope.row.status===2">
            <el-tooltip
              v-if="showBtn.authority"
              effect="dark"
              content="审批"
              placement="bottom-start">
              <el-button
                :loading="addLoading"
                @click="handleUpdate(scope.row)"
                :size="size"
                type="primary">审批
              </el-button>
            </el-tooltip>
            <span v-else>-</span>
          </el-button-group>
          <span v-else-if="scope.row.status===3">审核通过</span>
          <span v-else>{{scope.row.status}}</span>
        </template>
      </com-table>
    </template>
  </el-scrollbar>
</template>

<script>
  import {
    managerResourceGetApiIndexExamineAll,
    managerResourceUdpApiIndexExamine
  } from '@/api/manager';
  import {getShowBtn} from "@/tools/utils";

  export default {
    name: "index",
    data() {
      return {
        showBtn: {
          authority: true,
        },
        page: {
          currentPage: 1,
          pageSize: 10
        },
        username: "",//筛选条件
        status: "",//筛选条件
        addLoading: false,
        size: this.$store.getters.getAppSize,
        style: "width:100%",
        table: {
          //表格数据
          data: [],
          option: [
            // {type:'selection', label:'#'},
            {prop: 'index', label: '序号',width:'20px'},
            {prop: 'username', label: '用户名'},
            {prop: 'aoi_name', label: '接口或索引名称'},
            {prop: 'type', label: '接口类型',name:'type',isSlot:true},
            {prop: 'create_time', label: '创建时间'},
            {name:'status',label: '审核状态',isSlot:true},
            // {prop:'date', label:'提交时间',sortable:true},
          ],
          //是否分页
          isPage: true,
          //loading加载
          loading: false
        },
      }
    },
    mounted() {
      this.showBtn = getShowBtn(this.$route.query.id);
      this.table.loading = true;
      this.getLoad({});
    },
    methods: {
      // 每页多少条
      handleSizeChange(val) {
        this.page.pageSize = val;
      },
      handleCurrentChange(val) {
        this.page.currentPage = val;
      },
      // TODO 审批功能
      handleUpdate(row) {
        this.addLoading = true;
        managerResourceUdpApiIndexExamine({id: row.id}).then(res => {
          this.addLoading = false;
          if (res && res.code === 200) {
            this.$message.success('审批成功');
            this.handleClickSearch();
          } else {
            this.$message.error(res.message);
          }
        })
      },
      // TODO 点击搜索
      handleClickSearch() {
        this.getLoad({username: this.username, status: this.status});
      },
      // TODO 加载表格
      getLoad({username, status}) {
        let obj = {};
        if (username) {
          obj.username = username;
        }
        if (status && status !== -1) {
          obj.status = status;
        }
        managerResourceGetApiIndexExamineAll(obj).then((result) => {
          this.table.loading = false;
          if (result.code === 200) {
            result = result.data || [];
            this.table.data=result;
            let i = 1;

            this.table.data.forEach(item => {
              item.index = i++;
            })
          } else {
            this.table.data = [];
          }
        });
      },
    }
  }
</script>

<style lang="scss" scoped>
  .el-form-item__content .el-input-group {
    vertical-align: middle;
  }
</style>
