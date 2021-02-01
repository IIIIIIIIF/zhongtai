<template>
  <el-scrollbar>
    <template>
      <div class="el-form-my">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item prop="type">
            <el-select
              :style="style"
              :size="size"
              @change="handleChangeType"
              v-model="form.type"
              placeholder="请选择资源类型">
              <el-option label="全部" value="-1"></el-option>
              <el-option label="集群" value="1"></el-option>
              <!--              <el-option label="接口" value="2"></el-option>-->
              <el-option label="节点" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-tooltip v-if="showBtn.add" effect="dark" content="添加" placement="bottom-start">
              <el-button @click="handleAdd" :size="size" type="primary" icon="el-icon-plus"></el-button>
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
          label="序号"></el-table-column>
        <el-table-column
          prop="id"
          label="资源编号"></el-table-column>
        <el-table-column
          prop="sort"
          label="来源种类"></el-table-column>
        <el-table-column
          prop="host"
          label="ip地址"></el-table-column>
        <el-table-column
          prop="port"
          label="端口号"></el-table-column>
        <el-table-column
          prop="explan"
          label="来源说明"></el-table-column>
        <el-table-column
          label="操作"
          width="200px">
          <template slot-scope="scope">
            <el-button-group>
              <el-tooltip
                v-if="showBtn.update"
                effect="dark"
                content="编辑"
                placement="bottom-start">
                <el-button
                  @click="handleUpdate(scope.row)"
                  :size="size"
                  type="primary"
                  icon="el-icon-edit"></el-button>
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

    <el-dialog
      :title="title+'资源来源'"
      :close-on-click-modal="false"
      width="400px"
      @closed="resetForm('form')"
      :visible.sync="dialogFormVisible"
    >
      <el-form ref="form" :model="form" :size="size" :rules="rules">
        <el-form-item prop="pid">
          <el-select :style="style" :size="size" v-model="form.pid" placeholder="请选择父级资源">
            <!--            <el-option label="无" value="0"></el-option>-->
            <el-option v-for="item in pidList" :key="item.id" :label="item.explan" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item prop="id" label="资源编号">
          <el-input
            :style="style"
            :size="size"
            v-model="form.id"
            autocomplete="off"
            placeholder="请输入资源编号"></el-input>
        </el-form-item>
        <el-form-item prop="sort" label="来源种类">
          <el-input
            :style="style"
            :size="size"
            v-model="form.sort"
            autocomplete="off"
            placeholder="请输入来源种类"></el-input>
        </el-form-item>
        <el-form-item prop="host" label="IP">
          <el-input
            :style="style"
            :size="size"
            v-model="form.host"
            autocomplete="off"
            placeholder="请输入IP地址"></el-input>
        </el-form-item>
        <el-form-item prop="port" label="端口号">
          <el-input
            :style="style"
            :size="size"
            v-model="form.port"
            autocomplete="off"
            placeholder="请输入端口号"></el-input>
        </el-form-item>
        <el-form-item prop="explan" label="说明">
          <el-input
            type="textarea"
            v-model="form.explan"
            :autosize="{ minRows: 4, maxRows: 6}"
            placeholder="请输入说明"
            :style="style">
          </el-input>
        </el-form-item>

        <el-form-item style="text-align: right">
          <el-button
            :loading="addLoading"
            :size="size"
            type="primary"
            @click="handleSubmit('form')">{{title}}
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-scrollbar>
</template>

<script>
  import {
    managerResourceGetSourceAll,
    managerResourceAddSource,
    managerResourceUpdateSource,
    managerResourceDeleteSource,
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
        addLoading: false,
        tableData: [],
        pidList: [],
        title: '添加',
        dialogFormVisible: false,
        tableDataLoading: false,
        size: this.$store.getters.getAppSize,
        form: {
          id: "",
          sort: "",
          explan: "",
          pid: "",
          host: "",
          port: "",
          add: false,
        },
        style: "width:100%",
        rules: {
          pid: [
            {required: true, message: "请选择父级资源", trigger: ['blur', 'change']}
          ],
          id: [
            {required: true, message: "请输入资源编号", trigger: ['blur', 'change']}
          ],
          sort: [
            {required: true, message: "请输入来源种类", trigger: ['blur', 'change']}
          ],
          explan: [
            {required: true, message: "请输入说明", trigger: ['blur', 'change']},
          ],
        }
      }
    },
    mounted() {
      this.showBtn = getShowBtn(this.$route.query.id);
      this.tableDataLoading = true;
      this.getLoad({});
    },
    methods: {
      // TODO 资源类型筛选
      handleChangeType() {
        if (this.form.type === "-1") {
          this.getLoad({})
        } else {
          this.getLoad({type: this.form.type})
        }
      },
      // TODO 初始化表单
      resetForm(formName) {
        this.form = {
          id: "",
          sort: "",
          explan: "",
          pid: "",
          host: "",
          port: ""
        };
        // this.$refs[formName].resetFields();
      },
      // TODO 表单提交
      handleSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (!this.form.add) {
              this.addLoading = true;
              // TODO 修改
              managerResourceUpdateSource({
                ...this.form
              }).then((res) => {
                this.addLoading = false;
                if (res && res.code === 200) {
                  this.getLoad({});
                  this.dialogFormVisible = false;
                  this.$message.success("修改成功")
                } else {
                  this.$message.error(res.message);
                }
              })
            } else {
              this.addLoading = true;
              // TODO 添加
              managerResourceAddSource({...this.form}).then((res) => {
                this.addLoading = false;
                if (res && res.code === 200) {
                  this.getLoad({});
                  this.dialogFormVisible = false;
                  this.$message.success("添加成功")
                } else {
                  this.$message.error(res.message);
                }
              })
            }
          }
        })
      },
      // TODO 添加数据dialog
      handleAdd() {
        this.dialogFormVisible = true;
        this.form.add = true;
        this.title = "添加";
        this.dialogOpen();
      },
      // TODO 删除
      handleDelete(row) {
        this.$confirm('确定要删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          managerResourceDeleteSource({
            id: row.id
          }).then((res) => {
            if (res && res.code === 200) {
              this.getLoad({});
              this.$message.success("删除成功")
            } else {
              this.$message.error(res.message);
            }
          });
        })
      },
      // TODO 修改dialog
      handleUpdate(row) {
        this.dialogOpen();
        this.form.add = false;
        this.dialogFormVisible = true;
        this.title = "修改";
        this.form.id = row.id;
        this.form.sort = row.sort;
        this.form.explan = row.explan;
        this.form.pid = row.pid;
        this.form.host = row.host;
        this.form.port = row.port;
      },
      getLoad({type}) {
        let obj = {};
        if (type) {
          obj.type = type;
        }
        this.getSourceAll({
          type: obj.type,
          callback: (array) => {
            this.tableDataLoading = false;
            this.tableData = array;
            let i = 1;
            this.tableData.forEach(item => {
              item.index = i++;
            })
          }
        });
      },
      // TODO 添加/修改 框打架默认加载
      dialogOpen() {
        this.getSourceAll({
          pid: 0,
          field: "id,explan",
          callback: (array) => {
            this.pidList = [{id: 0, explan: "无"}];
            array.forEach(item => {
              this.pidList.push(item);
            });
          }
        });
      },
      getSourceAll({type, pid, field, callback}) {
        let obj = {};
        if (type) {
          obj.type = type;
        }
        if (pid || pid == 0) {
          obj.pid = pid;
        }
        if (field) {
          obj.field = field;
        }
        managerResourceGetSourceAll(obj).then((result) => {
          this.tableDataLoading = false;
          if (result.code === 200) {
            callback(result.data || []);
          } else {
            callback([]);
          }
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-form-item__content .el-input-group {
    vertical-align: middle;
  }
</style>
