<template>
  <el-scrollbar>
    <template>
      <div class="el-form-my">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item>
            <el-input v-model="index_name" :size="size" placeholder="请输入索引名称">
              <el-button type="primary" slot="append" icon="el-icon-search" @click="handleClickSearch"></el-button>
            </el-input>
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
          label="序号">
        </el-table-column>
        <el-table-column
          prop="index_name"
          label="索引名称">
        </el-table-column>
        <el-table-column
          prop="content"
          label="更新内容">
        </el-table-column>
        <el-table-column
          prop="up_type"
          label="操作类型">
          <template slot-scope="scope">
            <span v-if="scope.row.up_type===1">新增</span>
            <span v-else>删除</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="time"
          label="操作时间">
        </el-table-column>
        <el-table-column
          label="操作"
          width="120px"
        >
          <template slot-scope="scope">
            <el-button-group>
              <el-tooltip v-if="showBtn.update" effect="dark" content="编辑" placement="bottom-start">
                <el-button @click="handleUpdate(scope.row)" :size="size" type="primary" icon="el-icon-edit"></el-button>
              </el-tooltip>
              <el-tooltip v-if="showBtn.delete" effect="dark" content="删除" placement="bottom-start">
                <el-button type="danger" :size="size" icon="el-icon-delete-solid"
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
        <el-form-item prop="index_name" label="索引名称">
          <el-input
            :style="style"
            :size="size"
            v-model="form.index_name"
            autocomplete="off"
            placeholder="请输入数据更新索引名称"></el-input>
        </el-form-item>
        <el-form-item prop="up_type" label="更新类型">
          <el-select :style="style" :size="size" v-model="form.up_type" placeholder="请选择更新类型">
            <el-option label="新增" :value="1"></el-option>
            <el-option label="删除" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="content" label="更新内容">
          <el-input
            type="textarea"
            v-model="form.content"
            :autosize="{ minRows: 4, maxRows: 6}"
            placeholder="请输入更新内容"
            :style="style">
          </el-input>
        </el-form-item>
        <el-form-item prop="time" label="操作时间">
          <el-date-picker
            :size="size"
            value-format="yyyy-MM-dd"
            :style="style"
            type="date"
            v-model="form.time"
            placeholder="请选择操作时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            type="textarea"
            v-model="form.remark"
            :autosize="{ minRows: 4, maxRows: 6}"
            placeholder="请输入备注"
            :style="style">
          </el-input>
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
    managerResourceGetListDataDynam,
    managerResourceAddDataDynam,
    managerResourceDeleteDataDynam,
    managerResourceUpdateDataDynam,
  } from '@/api/manager';
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
        id: "",
        index_name: "",
        sourceIdList: {},
        addLoading: false,
        tableData: [],
        title: '添加',
        dialogFormVisible: false,
        tableDataLoading: false,
        size: this.$store.getters.getAppSize,
        sourceAll: [],//所有索引来源
        sourceAllChild: [],//索引来源子集 需要根据选中的索引来源进行获取
        form: {
          id: "",
          index_name: "",
          up_type: "",
          content: "",
          time: "",
          remark: "",
          add: true,//默认为添加操作
        },
        style: "width:100%",
        rules: {
          index_name: [
            {required: true, message: "请输入数据更新索引名称", trigger: ['blur', 'change']}
          ],
          up_type: [
            {required: true, message: "请选择更新类型", trigger: ['blur', 'change']}
          ],
          content: [
            {required: true, message: "请输入更新内容", trigger: ['blur', 'change']}
          ],
          time: [
            {required: true, message: "请选择操作时间", trigger: ['blur', 'change']}
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
      handleClickSearch() {
        this.getLoad({index_name: this.index_name});
      },
      resetForm(formName) {
        // this.$refs[formName].resetFields();
        this.form = {
          id: "",
          index_name: "",
          up_type: "",
          content: "",
          time: "",
          remark: "",
          add: true,//默认为添加操作
        }
      },
      handleSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (!this.form.add) {
              this.addLoading = true;
              // TODO 修改
              managerResourceUpdateDataDynam({
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
              managerResourceAddDataDynam({...this.form}).then((res) => {
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
          managerResourceDeleteDataDynam({
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

        this.form.id = row.id;
        this.form.index_name = row.index_name;
        this.form.up_type = row.up_type;
        this.form.content = row.content;
        this.form.time = row.time;
        this.form.remark = row.remark;

      },
      getLoad({index_name}) {
        let obj = {};
        if (index_name) {
          obj.index_name = index_name;
        }
        managerResourceGetListDataDynam(obj).then((result) => {
          this.tableDataLoading = false;
          if (result.code === 200) {
            result = result.data || [];
            this.tableData = result;
            let i = 1;
            this.tableData.forEach(item => {
              item.index = i++;
            })
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
