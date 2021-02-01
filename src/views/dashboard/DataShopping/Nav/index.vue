<template>
  <el-scrollbar>
    <template>
      <div class="el-form-my">
        <el-form :inline="true" class="demo-form-inline">
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
          label="序号">
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称">
          <template slot-scope="scope">
            <span v-html="handleFormatterName(scope.row.pid,scope.row.name)"></span>
          </template>
        </el-table-column>
        <el-table-column
          prop="pid"
          label="父级名称">
          <template slot-scope="scope">
            <span v-html="handleFormatterPid(scope.row.pid)"></span>
          </template>
        </el-table-column>
        <el-table-column
          prop="orderid"
          label="排序">
        </el-table-column>
        <el-table-column
          prop="stauts"
          label="显示状态">
          <template slot-scope="scope">
            <span v-if="scope.row.stauts===1">显示</span>
            <span v-else>不显示</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="120px"
        >
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
      :title="title+'动态'"
      :close-on-click-modal="false"
      width="400px"
      @closed="resetForm('form')"
      :visible.sync="dialogFormVisible"
    >
      <el-form ref="form" :model="form" :size="size" :rules="rules">
        <el-form-item prop="pid" label="父级名称">
          <el-select
            :style="style"
            :size="size"
            v-model="form.pid"
            placeholder="请选择父级名称">
            <el-option :value="0" label="无"></el-option>
            <template v-for="item in tableData">
              <el-option  v-if="item.pid===0" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item prop="name" label="名称">
          <el-input
            :style="style"
            :size="size"
            v-model="form.name"
            autocomplete="off"
            placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item prop="orderid" label="排列顺序">
          <el-input
            :style="style"
            :size="size"
            v-model="form.orderid"
            autocomplete="off"
            placeholder="请输入排列顺序"></el-input>
        </el-form-item>
        <el-form-item prop="stauts" label="状态">
          <el-select
            :size="size"
            :style="style"
            v-model="form.stauts"
            autocomplete="off"
            placeholder="请选择是否显示">
            <el-option label="隐藏" :value="0"></el-option>
            <el-option label="显示" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="picture_file" label="图标地址">
          <el-input
            :style="style"
            :size="size"
            v-model="form.picture_file"
            autocomplete="off"
            placeholder="请输入图标地址"></el-input>
        </el-form-item>
        <el-form-item style="text-align: right">
          <el-button
            :loading="addLoading"
            :size="size"
            type="primary"
            @click="handleSubmit('form')">{{title}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-scrollbar>
</template>

<script>
  import {
    managerResourceGetApiListTypeAll,
    managerResourceAddApiListType,
    managerResourceUpdateApiListType,
    managerResourceDeleteApiListType,
  } from '@/api/manager';
  import {sortMenuShopping} from "@/tools/utils";
  import { getShowBtn} from "@/tools/utils";
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
        tableInitData: [],//没有经过排序的数据
        title: '添加',
        dialogFormVisible: false,
        tableDataLoading: false,
        size: this.$store.getters.getAppSize,
        form: {
          pid:"",
          name:"",
          orderid:"",
          stauts:"",
          picture_file:"",
          id: "",
          add: true,//默认为添加操作
        },
        style: "width:100%",
        rules: {
          pid: [
            {required: true, message: "请选择父级名称", trigger: ['blur', 'change']}
          ],
          name: [
            {required: true, message: "请输入名称", trigger: ['blur', 'change']}
          ],
          orderid: [
            {required: true, message: "请输入排列顺序", trigger: ['blur', 'change']}
          ],
          stauts: [
            {required: true, message: "请选择是否显示", trigger: ['blur', 'change']}
          ],
          picture_file: [
            {required: true, message: "请输入图片路径", trigger: ['blur', 'change']}
          ]
        }
      }
    },
    mounted() {
      this.showBtn = getShowBtn(this.$route.query.id);
      this.tableDataLoading = true;
      this.getLoad({});
    },
    methods: {
      resetForm(formName) {
        // this.$refs[formName].resetFields();
        this.form = {
          pid:"",
          name:"",
          orderid:"",
          stauts:"",
          picture_file:"",
          id: "",
          add: true,//默认为添加操作
        }
      },
      handleClickSearch() {
        this.getLoad({name: this.name});
      },
      handleSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (!this.form.add) {
              this.addLoading = true;
              // TODO 修改
              managerResourceUpdateApiListType({
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
              managerResourceAddApiListType({...this.form}).then((res) => {
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
      handleAdd() {
        this.form.add = true;
        this.dialogFormVisible = true;
        this.title = "添加";
      },
      handleDelete(row) {
        this.$confirm('确定要删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          managerResourceDeleteApiListType({
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
      handleUpdate(row) {
        this.form.add = false;
        this.dialogFormVisible = true;
        this.title = "修改";

        this.form.pid = row.pid;
        this.form.name = row.name;
        this.form.orderid = row.orderid;
        this.form.stauts = row.stauts;
        this.form.picture_file = row.picture_file;
        this.form.id = row.id;

      },
      getLoad({}) {
        let obj = {};
        managerResourceGetApiListTypeAll(obj).then((result) => {
          this.tableDataLoading = false;
          if (result.code === 200) {
            result = result.data || [];
            this.tableInitData = [...result];
            this.tableData = sortMenuShopping(result);
          } else {
            this.tableData = [];
          }
        });
      },
      handleFormatterPid(pid) {
        let str = "";
        for (let i = 0; i < this.tableInitData.length; i++) {
          if (this.tableInitData[i].id === pid) {
            str = this.tableInitData[i].name;
            break;
          }
        }
        if (!str) {
          return '-';
        }
        return str;
      },
      handleFormatterName(pid, name) {
        if (pid === 0) {
          return `<span>${name}</span>`;
        }
        return `<span style="text-indent: 3em;display: block;">${name}</span>`;
      },

    }
  }
</script>

<style lang="scss" scoped>
  .el-form-item__content .el-input-group {
    vertical-align: middle;
  }
</style>
