<template>
  <el-scrollbar>
    <template>
      <div class="el-form-my">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item>
            <el-input v-model="ext_api_name" :size="size" placeholder="请输入接口名称">
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
          width="120px"
          label="外部接口编号">
        </el-table-column>
        <el-table-column
          prop="ext_api_name"
          width="160px"
          label="外部接口名称">
        </el-table-column>
        <el-table-column
          prop="request_mode"
          width="160px"
          label="请求方式">
          <template slot-scope="scope">
            <span v-if="scope.row.request_mode===1">GET</span>
            <span v-else>POST</span>
          </template>
        </el-table-column>
        <!--        <el-table-column-->
        <!--          prop="source"-->
        <!--          label="请求来源">-->
        <!--        </el-table-column>-->
        <el-table-column
          prop="url"
          label="请求地址">
        </el-table-column>
        <el-table-column
          prop="explan"
          label="接口说明">
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
              <el-tooltip v-uif="showBtn.delete" effect="dark" content="删除" placement="bottom-start">
                <el-button type="danger" :size="size" icon="el-icon-delete-solid"
                           @click="handleDelete(scope.row)"></el-button>
              </el-tooltip>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <el-dialog
      :title="title+'接口'"
      :close-on-click-modal="false"
      width="400px"
      @closed="resetForm('form')"
      :visible.sync="dialogFormVisible"
    >
      <el-form ref="form" :model="form" :size="size" :rules="rules">
        <el-form-item prop="id" label="接口编号">
          <el-input
            :style="style"
            :size="size"
            v-model="form.id"
            autocomplete="off"
            placeholder="请输入外部接口编号"></el-input>
        </el-form-item>
        <el-form-item prop="ext_api_name" label="接口名称">
          <el-input
            :style="style"
            :size="size"
            v-model="form.ext_api_name"
            autocomplete="off"
            placeholder="请输入外部接口名称"></el-input>
        </el-form-item>
        <el-form-item prop="source" label="接口来源">
          <el-select
            :style="style"
            :size="size"
            v-model="form.source"
            placeholder="请选择接口来源">
            <!--            <el-option v-for="item in typeListDialog" :key="item.id" :label="item.name" :value="item.id"></el-option>-->
          </el-select>
        </el-form-item>
        <el-form-item prop="explan" label="接口说明">
          <el-input
            type="textarea"
            v-model="form.explan"
            :autosize="{ minRows: 4, maxRows: 6}"
            placeholder="请输入接口说明"
            :style="style">
          </el-input>
        </el-form-item>
        <el-form-item prop="url" label="接口地址">
          <el-input
            :style="style"
            :size="size"
            v-model="form.url"
            autocomplete="off"
            placeholder="请输入接口地址"></el-input>
        </el-form-item>
        <el-form-item prop="request_mode" label="请求方式">
          <el-select
            :style="style"
            :size="size"
            v-model="form.request_mode"
            placeholder="请选择请求方式">
            <el-option label="GET" :value="1"></el-option>
            <el-option label="POST" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="ext_api_type" label="接口类型">
          <el-input
            :style="style"
            :size="size"
            v-model="form.ext_api_type"
            autocomplete="off"
            placeholder="请输入接口类型"></el-input>
        </el-form-item>
        <el-form-item prop="api_version" label="接口版本">
          <el-input
            :style="style"
            :size="size"
            v-model="form.api_version"
            autocomplete="off"
            placeholder="请输入接口版本"></el-input>
        </el-form-item>
        <el-form-item prop="url_example" label="完整示例">
          <el-input
            :style="style"
            :size="size"
            v-model="form.url_example"
            autocomplete="off"
            placeholder="请输入完整URL示例"></el-input>
        </el-form-item>
        <el-form-item prop="auth_method" label="认证方式">
          <el-input
            :style="style"
            :size="size"
            v-model="form.auth_method"
            autocomplete="off"
            placeholder="请输入授权认证方式"></el-input>
        </el-form-item>
        <el-form-item prop="request_param" label="请求参数">
          <el-input
            type="textarea"
            v-model="form.request_param"
            :autosize="{ minRows: 4, maxRows: 6}"
            placeholder="请输入请求参数"
            :style="style">
          </el-input>
        </el-form-item>
        <el-form-item prop="ext_api_return" label="返回结果">
          <el-input
            type="textarea"
            v-model="form.ext_api_return"
            :autosize="{ minRows: 4, maxRows: 6}"
            placeholder="请输入返回结果"
            :style="style">
          </el-input>
        </el-form-item>
        <el-form-item prop="result_file_desc" label="返回字段说明">
          <el-input
            type="textarea"
            v-model="form.result_file_desc"
            :autosize="{ minRows: 4, maxRows: 6}"
            placeholder="请输入返回字段说明"
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
    <el-dialog
      title="修改密码"
      :close-on-click-modal="false"
      width="400px"
      @closed="resetForm('form')"
      :visible.sync="dialogChangePasswordVisible"
    >

    </el-dialog>
  </el-scrollbar>
</template>

<script>
  import {
    managerResourceGetListExtApiList,
    managerResourceGetApiListTypeAll,
    managerResourceDeleteExtApiList,
    managerResourceAddDataSet,
    managerResourceUpdateDataSet,
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
        ext_api_name: "",
        sourceIdList: {},
        addLoading: false,
        tableData: [],
        apiTypeList: [],//用来列表集合
        typeListDialog: [],//添加/修改
        title: '添加',
        dialogFormVisible: false,
        tableDataLoading: false,
        dialogChangePasswordVisible: false,
        size: this.$store.getters.getAppSize,
        form: {
          ext_api_name: "",
          source: "",
          explan: "",
          url: "",
          request_mode: "",
          ext_api_type: "",
          api_version: "",
          url_example: "",
          auth_method: "",
          request_param: "",
          ext_api_return: "",
          result_file_desc: "",
          id: "",
          add: true,//默认为添加操作
        },
        style: "width:100%",
        rules: {
          id: [
            {required: true, message: "请输入外部接口编号", trigger: ['blur', 'change']}
          ],
          ext_api_name: [
            {required: true, message: "请输入外部接口名称", trigger: ['blur', 'change']}
          ],
          source: [
            {required: true, message: "请选择接口来源", trigger: ['blur', 'change']}
          ],
          explan: [
            {required: true, message: "请输入接口说明", trigger: ['blur', 'change']}
          ],
          url: [
            {required: true, message: "请输入接口地址", trigger: ['blur', 'change']}
          ],
          request_mode: [
            {required: true, message: "请选择请求方式", trigger: ['blur', 'change']}
          ]
        }
      }
    },
    mounted() {
      this.showBtn = getShowBtn(this.$route.query.id);
      this.tableDataLoading = true;
      this.initData();// TODO 初始化数据
      this.getLoad({});
    },
    methods: {
      resetForm(formName) {
        // this.$refs[formName].resetFields();
        this.form = {
          ext_api_name: "",
          source: "",
          explan: "",
          url: "",
          request_mode: "",
          ext_api_type: "",
          api_version: "",
          url_example: "",
          auth_method: "",
          request_param: "",
          ext_api_return: "",
          result_file_desc: "",
          id: "",
          add: true,//默认为添加操作
        }
      },
      handleClickSearch() {
        this.getLoad({ext_api_name: this.ext_api_name});
      },
      handleSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (!this.form.add) {
              this.addLoading = true;
              // TODO 修改
              managerResourceUpdateDataSet({
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
              managerResourceAddDataSet({...this.form}).then((res) => {
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
          managerResourceDeleteExtApiList({
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
        this.form.ext_api_name = row.ext_api_name;
        this.form.source = row.source;
        this.form.explan = row.explan;
        this.form.url = row.url;
        this.form.request_mode = row.request_mode;
        this.form.ext_api_type = row.ext_api_type;
        this.form.api_version = row.api_version;
        this.form.url_example = row.url_example;
        this.form.auth_method = row.auth_method;
        this.form.request_param = row.request_param;
        this.form.ext_api_return = row.ext_api_return;
        this.form.result_file_desc = row.result_file_desc;
        this.form.id = row.id;

      },
      getLoad({ext_api_name}) {
        let obj = {};
        if (ext_api_name) {
          obj.ext_api_name = ext_api_name;
        }
        managerResourceGetListExtApiList(obj).then((result) => {
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
      handleFormatterApiType(api_type) {
        let str = "";
        for (let i = 0; i < this.apiTypeList.length; i++) {
          if (this.apiTypeList[i].id == api_type) {
            str = this.apiTypeList[i].name;
            break;
          }
        }
        return str || api_type;
      },
      initData() {
        managerResourceGetApiListTypeAll().then((res) => {
          if (res && res.code === 200) {
            this.apiTypeList = res.data || [];
          } else {
            this.apiTypeList = [];
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-form-item__content .el-input-group {
    vertical-align: middle;
  }
</style>
