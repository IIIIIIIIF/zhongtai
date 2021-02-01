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
      <com-table
        class="centerData"
        :tableDataLoading="table.loading"
        :tableData="table.data"
        :tableOption="table.option"
        :isOperate="table.isOperate"
        :isPage="table.isPage">
        <template slot-scope="scope" slot="type">
          <span v-html="handleFormatterType(scope.row.type)"></span>
        </template>
        <template slot-scope="scope" slot="operate">
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
      </com-table>
    </template>
    <el-dialog
      :title="title+'动态'"
      :close-on-click-modal="false"
      width="400px"
      @closed="resetForm('form')"
      :visible.sync="dialogFormVisible"
    >
      <el-form ref="form" :model="form" :size="size" :rules="rules">
        <el-form-item prop="languages" label="语种">
          <el-input
            :style="style"
            :size="size"
            v-model="form.languages"
            autocomplete="off"
            placeholder="请输入语种"></el-input>
        </el-form-item>
        <el-form-item prop="type" label="数据集类别">
          <el-select
            :style="style"
            :size="size"
            v-model="form.type"
            placeholder="数据集类别">
            <el-option v-for="item in typeListDialog" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="resource_name" label="资源名称">
          <el-input
            :style="style"
            :size="size"
            v-model="form.resource_name"
            autocomplete="off"
            placeholder="请输入资源名称"></el-input>
        </el-form-item>
        <el-form-item prop="sourcecoll" label="收录来源">
          <el-input
            :style="style"
            :size="size"
            v-model="form.sourcecoll"
            autocomplete="off"
            placeholder="请输入收录来源"></el-input>
        </el-form-item>
        <el-form-item prop="total_literature" label="文献综述">
          <el-input
            :style="style"
            :size="size"
            v-model="form.total_literature"
            autocomplete="off"
            placeholder="请输入文献总数"></el-input>
        </el-form-item>
        <el-form-item prop="collection_year" label="收录年限">
          <el-input
            :style="style"
            :size="size"
            v-model="form.collection_year"
            autocomplete="off"
            placeholder="请输入收录年限"></el-input>
        </el-form-item>
        <el-form-item prop="renewal_cycle" label="更新周期">
          <el-input
            :style="style"
            :size="size"
            v-model="form.renewal_cycle"
            autocomplete="off"
            placeholder="请输入更新周期"></el-input>
        </el-form-item>
        <el-form-item prop="discipline_scope" label="学科范围">
          <el-input
            :style="style"
            :size="size"
            v-model="form.discipline_scope"
            autocomplete="off"
            placeholder="请输入学科范围"></el-input>
        </el-form-item>
        <el-form-item prop="resource_charact" label="资源特色">
          <el-input
            :style="style"
            :size="size"
            v-model="form.resource_charact"
            autocomplete="off"
            placeholder="请输入资源特色"></el-input>
        </el-form-item>
        <el-form-item prop="resource_charact" label="截止时间">
          <el-input
            :style="style"
            :size="size"
            v-model="form.endTime"
            autocomplete="off"
            placeholder="请输入截至时间"></el-input>
        </el-form-item>
        <el-form-item prop="picture_file" label="图片路径">
          <el-input
            :style="style"
            :size="size"
            v-model="form.picture_file"
            autocomplete="off"
            placeholder="请输入图片路径"></el-input>
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
    managerResourceAddDataSet,
    managerResourceDeleteDataSet,
    managerResourceUpdateDataSet,
    managerResourceGetDataSetAll,
    managerResourceGetApiListTypeAll,
    managerResourceGetApiListTypeKeAll
  } from '@/api/manager';
  import { getShowBtn} from "@/tools/utils";
  export default {
    name: "index",
    data() {
      return {
        table: {
          //表格数据
          data: [],
          option: [
            // {type:'selection', label:'#'},
            {prop: 'index', label: '序号', width: "50px"},
            {prop: 'languages', label: '语种',width:'50px'},
            {prop: 'type', label: '数据类别',isSlot:true,name:'type',width:'70px'},
            {prop: 'resource_name', label: '资源名称',width:'70px'},
            {prop: 'sourcecoll', label: '收录来源',width:'70px'},
            {prop: 'total_literature', label: '文献总数',width:'70px'},
            {prop: 'collection_year', label: '收录年限',width:'70px'},
            {prop: 'renewal_cycle', label: '更新周期',width:'70px'},
            {prop: 'discipline_scope', label: '学科范围',width:'70px'},
            {prop: 'resource_charact', label: '资源特色'},
            {prop: 'endTime', label: '截至时间',width:'70px'},
            {name:'operate', label:'操作',isSlot: true,width:'100px'},
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
        id: "",
        index_name: "",
        sourceIdList: {},
        addLoading: false,
        typeList: [],//用来列表集合
        typeListDialog: [],//添加/修改
        title: '添加',
        dialogFormVisible: false,
        size: this.$store.getters.getAppSize,
        form: {
          languages: "",
          type: "",
          typeListDialog: "",
          resource_name: "",
          sourcecoll: "",
          total_literature: "",
          collection_year: "",
          renewal_cycle: "",
          discipline_scope: "",
          resource_charact: "",
          picture_file: "",
          endTime: "",
          id: "",
          add: true,//默认为添加操作
        },
        style: "width:100%",
        rules: {
          languages: [
            {required: true, message: "请输入语种", trigger: ['blur', 'change']}
          ],
          type: [
            {required: true, message: "请选择输入数据集类别", trigger: ['blur', 'change']}
          ],
          resource_name: [
            {required: true, message: "请输入资源名称", trigger: ['blur', 'change']}
          ],
          sourcecoll: [
            {required: true, message: "请输入录入来源", trigger: ['blur', 'change']}
          ],
          total_literature: [
            {required: true, message: "请输入文献总数", trigger: ['blur', 'change']}
          ],
          collection_year: [
            {required: true, message: "请输入收录年限", trigger: ['blur', 'change']}
          ],
          renewal_cycle: [
            {required: true, message: "请输入更新周期", trigger: ['blur', 'change']}
          ],
          discipline_scope: [
            {required: true, message: "请输入学科范围", trigger: ['blur', 'change']}
          ],
          resource_charact: [
            {required: true, message: "请输入资源特色", trigger: ['blur', 'change']}
          ],
          picture_file: [
            {required: true, message: "请输入图片路径", trigger: ['blur', 'change']}
          ],
          endTime: [
            {required: true, message: "请输入截止时间", trigger: ['blur', 'change']}
          ],
        }
      }
    },
    mounted() {
      this.showBtn = getShowBtn(this.$route.query.id);
      this.table.loading = true;
      this.initData();// TODO 初始化数据
      this.getLoad();
    },
    methods: {
      resetForm(formName) {
        // this.$refs[formName].resetFields();
        this.form = {
          languages: "",
          type: "",
          typeListDialog: "",
          resource_name: "",
          sourcecoll: "",
          total_literature: "",
          collection_year: "",
          renewal_cycle: "",
          discipline_scope: "",
          resource_charact: "",
          picture_file: "",
          endTime: "",
          id: "",
          add: true,//默认为添加操作
        }
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
                  this.getLoad();
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
                  this.getLoad();
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
        this.initDialogData();
      },
      handleDelete(row) {
        this.$confirm('确定要删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          managerResourceDeleteDataSet({
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
      handleUpdate(row) {
        this.form.add = false;
        this.dialogFormVisible = true;
        this.title = "修改";
        this.initDialogData();

        this.form.languages = row.languages;
        this.form.type = row.type;
        this.form.typeListDialog = row.typeListDialog;
        this.form.resource_name = row.resource_name;
        this.form.sourcecoll = row.sourcecoll;
        this.form.total_literature = row.total_literature;
        this.form.collection_year = row.collection_year;
        this.form.renewal_cycle = row.renewal_cycle;
        this.form.discipline_scope = row.discipline_scope;
        this.form.resource_charact = row.resource_charact;
        this.form.picture_file = row.picture_file;
        this.form.endTime = row.endTime;
        this.form.id = row.id;

      },
      getLoad() {
        managerResourceGetDataSetAll().then((result) => {
          this.table.loading = false;
          if (result.code === 200) {
            result = result.data || [];
            this.table.data = result;
            let i = 1;
            this.table.data.forEach(item => {
              item.index = i++;
            })
          } else {
            this.table.data = [];
          }
        });
      },
      handleFormatterType(type) {
        let str = "";
        for (let i = 0; i < this.typeList.length; i++) {
          if (this.typeList[i].id === type) {
            str = this.typeList[i].name;
            break;
          }
        }
        return str;
      },
      initData() {
        managerResourceGetApiListTypeAll({}).then((res) => {
          if (res && res.code === 200) {
            this.typeList = res.data || [];
          } else {
            this.typeList = [];
          }
        })
      },
      initDialogData() {
        managerResourceGetApiListTypeKeAll({type: 2}).then((res) => {
          if (res && res.code === 200) {
            this.typeListDialog = res.data || [];
          } else {
            this.typeListDialog = [];
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
