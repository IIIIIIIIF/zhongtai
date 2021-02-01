<template>
  <el-scrollbar>
    <template>
      <div class="el-form-my">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item>
            <el-select
              @change="handleChangeIstype"
              :style="style"
              :size="size"
              v-model="istype"
              placeholder="请选择资源类型">
              <el-option label="全部" value="-1"></el-option>
              <el-option label="公有" value="1"></el-option>
              <el-option label="私有" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input v-model="name" :size="size" placeholder="请输入索引名称">
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
          prop="id"
          label="数据资源编号">
        </el-table-column>
        <el-table-column
          prop="name"
          label="索引名称">
        </el-table-column>
        <!--        <el-table-column-->
        <!--          prop="source"-->
        <!--          label="索引来源">-->
        <!--          <template slot-scope="scope">-->
        <!--            <div v-html="handleFormatterSource(scope.row.source)"></div>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
        <el-table-column
          prop="explan"
          label="索引说明">
        </el-table-column>
        <el-table-column
          prop="owner_name"
          label="所属人">
        </el-table-column>
        <el-table-column
          prop="istype"
          label="资源类型" v-if="istype!=='1'&&istype!=='2'">
          <template slot-scope="scope">
            <span v-if="scope.row.istype==1">公有</span>
            <span v-else-if="scope.row.istype==2">私有</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="120px">
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
      :title="title+'索引'"
      :close-on-click-modal="false"
      width="400px"
      @closed="resetForm('form')"
      :visible.sync="dialogFormVisible"
    >
      <el-form ref="form" :model="form" :size="size" :rules="rules">
        <el-form-item prop="istype" label="资源类型">
          <el-select
            :style="style"
            :size="size"
            v-model="form.istype"
            placeholder="请选择资源类型">
            <el-option label="公有" :value="1"></el-option>
            <el-option label="私有" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="id" label="资源编号">
          <el-input
            :style="style"
            :size="size"
            v-model="form.id"
            autocomplete="off"
            placeholder="请输入数据资源编号"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="索引名称">
          <el-input
            :style="style"
            :size="size"
            v-model="form.name"
            autocomplete="off"
            placeholder="请输入索引名称"></el-input>
        </el-form-item>
        <el-form-item prop="z_name" label="中文简称">
          <el-input
            :style="style"
            :size="size"
            v-model="form.z_name"
            autocomplete="off"
            placeholder="请输入中文简称"></el-input>
        </el-form-item>
        <el-form-item prop="sourcepid" label="索引来源">
          <el-select
            :style="style"
            :size="size"
            @change="handleChangeSourcepid"
            v-model="form.sourcepid"
            placeholder="请选择索引来源">
            <el-option
              v-for="item in sourceAll"
              :key="item.id"
              :label="item.explan"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="form.sourcepid&&sourceAllChild.length>0">
          <template
            v-for="item in sourceAllChild">
            <el-checkbox
              v-model="form.source"
              :label="item.id">
              {{item.explan}}
            </el-checkbox>
          </template>
        </el-form-item>
        <el-form-item prop="sort" label="索引种类">
          <!--          @change="handleChangeSourcepid"    -->
          <el-select
            :style="style"
            :size="size"
            v-model="form.sort"
            placeholder="请选择索引种类">
            <el-option label="内部" value="0"></el-option>
            <el-option label="公有" value="1"></el-option>
            <el-option label="工具" value="2"></el-option>
            <el-option label="第三方" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="ES映射">
          <el-input
            :style="style"
            :size="size"
            v-model="form.mapping"
            autocomplete="off"
            placeholder="请输入ES映射"></el-input>
        </el-form-item>
        <el-form-item label="索引说明">
          <el-input
            :style="style"
            :size="size"
            v-model="form.explan"
            autocomplete="off"
            placeholder="请输入索引说明"></el-input>
        </el-form-item>
        <el-form-item label="返回字段">
          <el-input
            type="textarea"
            v-model="form.return_fields"
            :autosize="{ minRows: 4, maxRows: 6}"
            placeholder="显示返回资源，中间以英文逗号分割，支持*"
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
    managerResourceGetIndexInfoAll,
    managerResourceGetSourceAll,
    managerResourceAddIndexInfo,
    managerResourceUpdateIndexInfo,
    managerResourceDeleteIndexInfo,
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
        name: "",
        istype: "",
        password: "",
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
          name: "",
          sourcepid: "",
          istype: "",
          mapping: "",
          explan: "",
          z_name: "",
          return_fields: "",
          source: [],
          sort: "",
          add: true,//默认为添加操作
        },
        style: "width:100%",
        rules: {
          id: [
            {required: true, message: "请输入数据资源编号", trigger: ['blur', 'change']}
          ],
          name: [
            {required: true, message: "请输入索引名称", trigger: ['blur', 'change']}
          ],
          sourcepid: [
            {required: true, message: "请选择索引来源", trigger: ['blur', 'change']}
          ],
          istype: [
            {required: true, message: "请选择资源类型", trigger: ['blur', 'change']}
          ],
          sort: [
            {required: true, message: "请选择索引种类", trigger: ['blur', 'change']}
          ],
          z_name: [
            {required: true, message: "请输入中文简称", trigger: ['blur', 'change']}
          ],
        }
      }
    },
    mounted() {
      this.showBtn = getShowBtn(this.$route.query.id);
      this.tableDataLoading = true;
      this.initData({callback: this.initDataTable});
      this.getLoad({});
    },
    methods: {
      handleChangeIstype(val) {

        this.handleClickSearch();
      },
      // TODO 索引来源格式化
      // handleFormatterSource(source) {
      //   let _html = ``;
      //   if (source) {
      //     source = source.split(",");
      //     for (let i = 0; i < source.length; i++) {
      //       if (this.sourceIdList[source[i]]) {
      //         _html += this.sourceIdList[source[i]] + "<br/>";
      //       }
      //     }
      //     return _html;
      //   }
      //   return source;
      // },

      handleClickSearch() {
        this.getLoad({istype: this.istype === "-1" ? "" : this.istype, likeField: this.name});
      },
      // TODO 重置表单
      resetForm(formName) {
        this.form = {
          id: "",
          name: "",
          sourcepid: "",
          istype: "",
          mapping: "",
          explan: "",
          return_fields: "",
          z_name: "",
          source: [],
          sort: "",
          add: true,//默认为添加操作
        }
      },
      // TODO 表单提交
      handleSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.form.source = this.form.source.toString();
            if (!this.form.add) {
              this.addLoading = true;
              // TODO 修改
              managerResourceUpdateIndexInfo({
                ...this.form
              }).then((res) => {
                this.addLoading = false;
                if (res && res.code === 200) {
                  this.getLoad({});
                  this.dialogFormVisible = false;
                  this.$message.success("修改成功")
                } else {
                  if (typeof this.form.source === "string") {
                    this.form.source = this.form.source.split(",");
                  }

                  this.$message.error(res.message);
                }
              })
            } else {
              this.addLoading = true;
              // TODO 添加
              managerResourceAddIndexInfo({...this.form}).then((res) => {
                this.addLoading = false;
                if (res && res.code === 200) {
                  this.getLoad({});
                  this.dialogFormVisible = false;
                  this.$message.success("添加成功")
                } else {
                  if (typeof this.form.source === "string") {
                    this.form.source = this.form.source.split(",");
                  }
                  this.$message.error(res.message);
                }
              })
            }
          }
        })
      },
      // TODO 显示添加操作表单
      handleAdd() {
        this.resetForm('form');
        this.form.add = true;
        this.dialogFormVisible = true;
        this.title = "添加";
        this.initData({type: 1, pid: 0, field: "id,explan", callback: this.initAddDialog})
      },
      // TODO 删除操作
      handleDelete(row) {
        this.$confirm('确定要删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          managerResourceDeleteIndexInfo({
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
      // TODO 显示修改操作表单
      handleUpdate(row) {
        this.initData({type: 1, pid: 0, field: "id,explan", callback: this.initAddDialog})
        this.form.add = false;
        this.dialogFormVisible = true;
        this.title = "修改";
        this.form.id = row.id;
        this.form.name = row.name;
        this.form.sourcepid = row.sourcepid;
        this.form.istype = row.istype;
        this.form.mapping = row.mapping;
        this.form.explan = row.explan;
        this.form.z_name = row.z_name;
        this.form.return_fields = row.return_fields;
        this.form.sort = row.sort;
        console.log(this.form)
        this.handleChangeSourcepid();

        if (row.source) {
          this.form.source = row.source.split(",");
          for (let i = 0; i < this.form.source.length; i++) {
            this.form.source[i] = parseInt(this.form.source[i])
          }
        } else {
          this.form.source = [];
        }
      },
      getLoad({istype, likeField}) {
        let obj = {
          field:"explan,id,istype,mapping,name,return_fields,sort,source,sourcepid,z_name"
        };
        if (istype && istype !== '-1') {
          obj.istype = istype;
        }
        if (likeField) {
          obj.likeField = likeField;
        }
        managerResourceGetIndexInfoAll(obj).then((result) => {
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
      initData({type, pid, field, callback}) {
        let obj = {};
        if (type) {
          obj.type = type;
        }
        if (pid) {
          obj.pid = pid;
        }
        if (field) {
          obj.field = field;
        }
        managerResourceGetSourceAll(obj).then((res) => {
          if (res.code === 200) {
            callback(res.data || []);
          } else {
            callback([]);
          }
        });
      },
      initDataTable(array) {
        array.forEach(item => {
          this.sourceIdList[item.id] = item.explan;
        })
      },
      initAddDialog(array) {
        console.log(array)
        this.sourceAll = [];
        array.forEach(item => {
          this.sourceAll.push(item);
        })
      },
      // TODO 索引来源修改事件
      handleChangeSourcepid(val) {
        this.sourceAllChild = [];
        this.initData({
          type: 3,
          // pid: this.form.sourcepid,
          pid: val,
          field: 'id,explan',
          callback: (array) => {
            if (this.form.add) {
              this.form.source = [];
            }
            this.sourceAllChild = [];
            array.forEach(item => {
              if (this.form.add) {
                this.form.source.push()
              }
              this.sourceAllChild.push(item);
            })
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
