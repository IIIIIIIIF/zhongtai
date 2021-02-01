<template>
  <el-scrollbar>
    <template>
      <div class="el-form-my">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item>
            <el-input v-model="id" :size="size" placeholder="根据任务编号检索">
              <el-button type="primary" slot="append" icon="el-icon-search" @click="handleClickSearch"></el-button>
            </el-input>
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
          prop="id"
          width="80px"
          label="任务编号">
        </el-table-column>
        <el-table-column
          prop="explan"
          label="说明">
        </el-table-column>
        <el-table-column
          prop="task_status"
          label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.task_status===1">执行成功</span>
            <span v-if="scope.row.task_status===2">未执行</span>
            <span v-if="scope.row.task_status===3">执行失败</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="160px">
          <template slot-scope="scope">
            <el-button-group>
              <el-tooltip
                v-if="scope.row.task_status===2"
                effect="dark"
                content="执行"
                placement="bottom-start">
                <el-button
                  @click="handleExe(scope.row.id)"
                  :size="size"
                  type="warning"
                  icon="el-icon-eleme"></el-button>
              </el-tooltip>
              <el-tooltip
                v-if="showBtn.delete"
                effect="dark"
                content="删除"
                placement="bottom-start">
                <el-button
                  type="danger"
                  :size="size"
                  icon="el-icon-delete-solid"
                  @click="handleDelete(scope.row)"></el-button>
              </el-tooltip>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </el-scrollbar>
</template>

<script>
  import {
    managerResourceGetListTask,
    managerResourceExecRemote,
    managerResourceDeleteTask
  } from '@/api/manager';
  import {getShowBtn} from "@/tools/utils";

  export default {
    name: "index",
    data() {
      return {
        showBtn: {
          add: false,
          update: false,
          delete: false,
        },
        id: "",
        dialogFormVisible: false,//默认不显示dialog
        addLoading: false,
        tableData: [],
        tableDataLoading: false,
        size: this.$store.getters.getAppSize,
        style: "width:100%",
      }
    },
    mounted() {
      this.showBtn = getShowBtn(this.$route.query.id);
      this.tableDataLoading = true;
      this.getLoad({});
    },
    methods: {
      // TODO 删除任务
      handleDelete(row){
        this.$confirm('确定要删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          managerResourceDeleteTask({
            id: row.id
          }).then((res) => {
            if (res && res.code === 200) {
              this.getLoad();
              this.$message.success("删除成功")
            } else {
              this.$message.error(res.message);
            }
          });
        })
      },
      // TODO 执行任务
      handleExe(id) {
        this.$confirm('是否执行？', '提示', {
          confirmButtonText: '执行',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          managerResourceExecRemote({
            id: row.id
          }).then((res) => {
            if (res && res.code === 200) {
              this.handleClickSearch();
              this.$message.success("执行成功")
            } else {
              this.$message.error(res.message);
            }
          });
        })
      },
      // TODO 检索功能
      handleClickSearch() {
        this.getLoad({id: this.id});
      },
      // TODO 加载表格
      getLoad({id}) {
        let obj = {};
        if (id) {
          obj.id = id;
        }
        managerResourceGetListTask(obj).then((result) => {
          this.tableDataLoading = false;
          if (result.code === 200) {
            result = result.data || [];
            this.tableData = result;
          } else {
            this.tableData = [];
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
