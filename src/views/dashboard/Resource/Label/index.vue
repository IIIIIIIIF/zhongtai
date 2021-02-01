<template>
  <el-scrollbar>
    <template>
      <div class="el-form-my">
        <el-form :inline="true" class="demo-form-inline">
          <!--          <el-form-item prop="type">-->
          <!--            <el-select-->
          <!--              :style="style"-->
          <!--              :size="size"-->
          <!--              @change="handleChangeType"-->
          <!--              v-model="form.type"-->
          <!--              placeholder="请选择资源类型">-->
          <!--              <el-option label="全部" value="-1"></el-option>-->
          <!--              <el-option label="集群" value="1"></el-option>-->
          <!--              <el-option label="接口" value="2"></el-option>-->
          <!--              <el-option label="节点" value="3"></el-option>-->
          <!--            </el-select>-->
          <!--          </el-form-item>-->
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
        <template slot-scope="scope" slot="operate">
          <el-button-group>
            <el-tooltip
              v-if="showBtn.update"
              effect="dark" content="编辑" placement="bottom-start">
              <el-button @click="handleUpdate(scope.row)" :size="size" type="primary" icon="el-icon-edit"></el-button>
            </el-tooltip>
            <el-tooltip v-if="showBtn.delete" effect="dark" content="删除" placement="bottom-start">
              <el-button type="danger" :size="size" icon="el-icon-delete-solid"
                         @click="handleDelete(scope.row)"></el-button>
            </el-tooltip>
          </el-button-group>
        </template>
      </com-table>
<!--      <el-table-->
<!--        v-loading="tableDataLoading"-->
<!--        :data="tableData"-->
<!--        highlight-current-row-->
<!--        border-->
<!--        style="width: 100%">-->
<!--        <el-table-column-->
<!--          v-if="!role"-->
<!--          prop="owner_name"-->
<!--          label="所有者"></el-table-column>-->
<!--        -->
<!--      </el-table>-->
    </template>
    <el-dialog
      :title="title+'标签'"
      :close-on-click-modal="false"
      width="722px"
      @closed="resetForm('form')"
      :visible.sync="dialogFormVisible"
    >
      <el-form class="el-form-label" ref="form" :model="form" :size="size" :rules="rules">
        <!--        <el-form-item prop="id">-->
        <!--          <el-input-->
        <!--            :style="style"-->
        <!--            :size="size"-->
        <!--            v-model="form.id"-->
        <!--            autocomplete="off"-->
        <!--            placeholder="请输入标签编号"></el-input>-->
        <!--        </el-form-item>-->
        <el-form-item prop="alias">
          <el-input
            :style="style"
            :size="size"
            v-model="form.alias"
            autocomplete="off"
            placeholder="请输入标签别名"></el-input>
        </el-form-item>
        <!--        <el-form-item>-->
        <!--          <el-input-->
        <!--            :style="style"-->
        <!--            :size="size"-->
        <!--            v-model="form.indices"-->
        <!--            autocomplete="off"-->
        <!--            placeholder="请输入索引别名"></el-input>-->
        <!--        </el-form-item>-->
        <el-form-item>
          <h4>公有资源</h4>
          <el-transfer
            v-model="list.checkedPublic"
            :data="list.public"
            :titles="['未添加','已添加/待添加']"
            :props="{
              key:'id',
              label:'explan'
            }">
            <template slot-scope="{option}">
              <span :title="option.explan">{{option.explan}}</span>
            </template>
          </el-transfer>
          <h4>私有资源</h4>
          <el-transfer
            v-model="list.checkedPrivate"
            :data="list.private"
            :titles="['未添加','已添加/待添加']"
            :props="{
              key:'id',
              label:'z_name'
            }">
            <template slot-scope="{option}">
              <span :title="option.z_name">{{option.z_name}}</span>
            </template>
          </el-transfer>
        </el-form-item>
        <el-form-item style="text-align: right">
          <el-button
            :loading="addLoading"
            :size="size"
            type="primary"
            @click="handleSubmit('form')">
            {{title}}
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-scrollbar>
</template>

<script>

  import {
    managerResourceGetIndexInfoAll,
    managerResourceGetIndexInfo
  } from "@/api/manager";
  import {
    managerResourceGetIndexLabelList,
    managerResourceAddIndexLabel,
    managerResourceUpdateIndexLabel,
    managerResourceDeleteIndexLabel,
  } from '@/api/manager';
  import {getShowBtn,logout} from "@/tools/utils";
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
            {prop: 'id', label: '编号'},
            {prop: 'alias', label: '标签别名'},
            {prop: 'owner_name', label: '所有者',isShow:false},
            {name:'operate', label:'操作',isSlot: true,width:'200px'},
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
        title: '添加',
        dialogFormVisible: false,
        size: this.$store.getters.getAppSize,
        form: {
          id: "",
          alias: "",//标签别名
          indices: "",//索引别名
          owner_id: "",//所有者id
          owner_name: "",//所有者name
          add: false,
        },
        style: "width:100%",
        rules: {
          // id: [
          // {required: true, message: "请输入标签编号", trigger: ['blur', 'change']}
          // ],
          alias: [
            {required: true, message: "请输入标签别名", trigger: ['blur', 'change']}
          ]
        },
        role: false,
        list: {
          public: [],//公有资源列表
          private: [],//私有资源列表
          checkedPublic: [],//已经选中的公有资源
          checkedPrivate: [],//已经选中的私有资源
        }
      }
    },
    mounted() {
      this.role = this.$route.meta.role || false;

      if (!this.role) {
        this.table.option.forEach(item=>{
          if(item.prop==='owner_name'){
            item.isShow=true;
          }
        });
        this.showBtn = getShowBtn(this.$route.query.id);
      } else {
        this.showBtn = {
          add: true,
          update: true,
          delete: true
        }
      }
      this.getLoad({});
      this.initData();

    },
    methods: {
      logout,
      ...mapGetters(['getUsersInfo']),
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
        this.list.checkedPublic = [];
        this.list.checkedPrivate = [];

        this.form = {
          id: "",
          alias: "",//标签别名
          indices: "",//索引别名
          owner_id: "",//所有者id
          owner_name: "",//所有者name
          add: false,
        };
        // this.$refs[formName].resetFields();
      },
      // TODO 表单提交
      handleSubmit(formName) {

        // return false;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (!this.form.add) {
              this.addLoading = true;
              // TODO 修改
              managerResourceUpdateIndexLabel({
                id: this.form.id,
                indexLabel: {
                  id: this.form.id,
                  alias: this.form.alias,//标签别名
                  indices: [...this.list.checkedPrivate, ...this.list.checkedPublic].toString(),//索引别名
                  owner_id: this.form.owner_id,//所有者id
                  owner_name: this.form.owner_name,//所有者name
                }
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
              let info = this.getUsersInfo();
              let id = info.id;
              let name = info.username;
              if (!id || !name) {
                this.$message.error('获取用户信息获取失败，请重新登录');
                this.logout();
                return false;
              }
              this.form.owner_id = id;//获取用户Id 并赋值
              this.form.owner_name = name;//获取用户姓名 并赋值
              // TODO 添加
              managerResourceAddIndexLabel({
                alias: this.form.alias,
                // id: this.form.id,
                indices: [...this.list.checkedPrivate, ...this.list.checkedPublic].toString(),
                owner_id: this.form.owner_id,
                owner_name: this.form.owner_name
              }).then((res) => {
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
          managerResourceDeleteIndexLabel({
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
        this.form.alias = row.alias;//标签别名
        this.form.indices = row.indices;//索引别名

        this.formatterIndices(row.indices);


        this.form.owner_id = row.owner_id;//所有者id
        this.form.owner_name = row.owner_name;//所有者name
      },
      getLoad({type}) {
        this.table.loading = true;
        let obj = {};
        if (type) {
          obj.type = type;
        }
        this.getSourceAll({
          type: obj.type,
          callback: (array) => {
            this.table.loading = false;
            this.table.data = array;
            let i = 1;
            this.table.data.forEach(item => {
              item.index = i++;
            })
          }
        });
      },
      // TODO 添加/修改 框打架默认加载
      dialogOpen() {

      },
      // TODO 获取所有数据
      getSourceAll({type, pid, field, callback}) {
        let obj = {};
        // 如果是普通用户则根据当前登录用户进行查询
        if (this.role) {
          let info = this.getUsersInfo();
          let id = info.id;
          if (!id) {
            this.$message.error('获取用户信息获取失败，请重新登录');
            this.logout();
            return false;
          }
          obj.apply_id = id;
        }
        managerResourceGetIndexLabelList(obj).then((result) => {
          this.table.loading = false;
          if (result.code === 200) {
            callback(result.data || []);
          } else {
            callback([]);
          }
        });
      },
      // TODO 加载数据列表(公有数据/私有数据)
      initData() {
        let info = this.getUsersInfo();
        if (!info.id) {
          this.$message.error('用户信息获取失败，请重新登录');
          this.logout();
          return false;
        }
        managerResourceGetIndexInfo({
          own_id: info.id,
          field: "id,z_name"
        }).then(res => {
          if (res && res.code === 200) {
            this.list.private = res.data || [];
          } else {
            this.list.private = [];
          }
        });
        managerResourceGetIndexInfoAll({
          istype: 1,
          field: 'id,explan'
        }).then(res => {
          if (res && res.code === 200) {
            this.list.public = res.data || [];
          } else {
            this.list.public = [];
          }
        })
      },
      // TODO 修改弹窗 格式化索引
      formatterIndices(arr) {
        arr = arr.split(',');
        arr.forEach(item => {
          for (let i = 0; i < this.list.public.length; i++) {
            if (this.list.public[i].id == item) {
              this.list.checkedPublic.push(parseInt(item));
              break;
            }
          }
          for (let i = 0; i < this.list.private.length; i++) {
            if (this.list.private[i].id == item) {
              this.list.checkedPrivate.push(parseInt(item));
              break;
            }
          }
        });
      }
    }
  }
</script>
<style>
  .el-form-label .el-transfer-panel {
    width: 260px;
    /*width: 35%;*/
  }
</style>
<style lang="scss" scoped>
  .el-form-item__content .el-input-group {
    vertical-align: middle;
  }
</style>
