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
        :tableDataLoading="table.loading"
        :tableData="table.data"
        :tableOption="table.option"
        :isOperate="table.isOperate"
        :isPage="table.isPage"
      >
        <template slot="name" slot-scope="scope">
          <span v-html="handleFormatterName(scope.row,scope.row.name)"></span>
        </template>
        <template slot="parentId" slot-scope="scope">{{handleFormatterParentId(scope.row)}}</template>
        <template slot="flag" slot-scope="scope">{{handleFormatterFlag(scope.row)}}</template>
        <template slot="operate" slot-scope="scope">
          <el-button-group>
            <el-tooltip
              v-if="showBtn.authority"
              effect="dark"
              content="授权"
              placement="bottom-start"
            >
              <el-button
                @click="handleOpenRole(scope.row)"
                :size="size"
                type="success"
                icon="el-icon-check"
              ></el-button>
            </el-tooltip>
            <el-tooltip v-if="showBtn.update" effect="dark" content="编辑" placement="bottom-start">
              <el-button
                @click="handleUpdate(scope.row)"
                :size="size"
                type="primary"
                icon="el-icon-edit"
              ></el-button>
            </el-tooltip>
            <el-tooltip v-if="showBtn.delete" effect="dark" content="删除" placement="bottom-start">
              <el-button
                type="danger"
                :size="size"
                icon="el-icon-delete-solid"
                @click="handleDelete(scope.row)"
              ></el-button>
            </el-tooltip>
          </el-button-group>
        </template>
      </com-table>

      <!-- <el-table
        v-loading="tableDataLoading"
        :data="tableData"
        highlight-current-row
        border
        style="width: 100%"
      >
        <el-table-column prop="index" width="50px" label="序号"></el-table-column>
        <el-table-column prop="name" label="角色名称"></el-table-column>
        <el-table-column prop="remark" label="描述"></el-table-column>
        <el-table-column label="操作" width="160px">
          <template slot-scope="scope">
            <el-button-group>
              <el-tooltip
                v-if="showBtn.authority"
                effect="dark"
                content="授权"
                placement="bottom-start"
              >
                <el-button
                  @click="handleOpenRole(scope.row)"
                  :size="size"
                  type="success"
                  icon="el-icon-check"
                ></el-button>
              </el-tooltip>
              <el-tooltip v-if="showBtn.update" effect="dark" content="编辑" placement="bottom-start">
                <el-button
                  @click="handleUpdate(scope.row)"
                  :size="size"
                  type="primary"
                  icon="el-icon-edit"
                ></el-button>
              </el-tooltip>
              <el-tooltip v-if="showBtn.delete" effect="dark" content="删除" placement="bottom-start">
                <el-button
                  type="danger"
                  :size="size"
                  icon="el-icon-delete-solid"
                  @click="handleDelete(scope.row)"
                ></el-button>
              </el-tooltip>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>-->
    </template>
    <el-dialog
      :title="title+'菜单'"
      :close-on-click-modal="false"
      width="400px"
      @closed="resetForm('form')"
      :visible.sync="dialogFormVisible"
    >
      <el-form ref="form" :model="form" :size="size" :rules="rules">
        <el-form-item prop="name" label="角色名称">
          <el-input
            :style="style"
            :size="size"
            v-model="form.name"
            autocomplete="off"
            placeholder="请输入角色名称"
          ></el-input>
        </el-form-item>
        <el-form-item prop="remark" label="描述">
          <el-input
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 6}"
            placeholder="请输入描述信息"
            :style="style"
            v-model="form.remark"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button :size="size" type="primary" @click="handleSubmit('form')">{{title}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      @closed="resetForm"
      title="角色授权"
      :close-on-click-modal="false"
      width="744px"
      :visible.sync="dialogRoleVisible"
    >
      <el-form class="el-form-role">
        <el-form-item>
          <el-transfer
            v-model="rightRole"
            :data="menuList"
            :titles="['未授权','已授权/待授权']"
            :props="{
              key:'id',
              label:'name'
            }"
          >
            <template slot-scope="{option}">
              <span v-if="option.parentId===0">{{option.name}}</span>
              <span
                v-else-if="option.flag===1"
                style="text-indent: 1em;display: inline-block"
              >{{option.name}}</span>
              <span v-else style="text-indent: 2em;display: inline-block;">{{option.name}}</span>
            </template>
          </el-transfer>
        </el-form-item>
        <el-form-item style="text-align: right">
          <el-button
            :loading="addLoading"
            :size="size"
            type="primary"
            @click="handleSubmitRole()"
          >授权</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-scrollbar>
</template>

<script>
import {
  managerKFJGetRoleList,
  managerKFJAddRole,
  managerKFJUpdateRole,
  managerKFJDeleteRole,
  managerKFJGetRoleAuthority,
  managerKFJGetMenuList,
  managerKFJAddAuthority
} from "@/api/manager";
import { sortMenuAll, getShowBtn } from "@/tools/utils";

export default {
  name: "index",
  data() {
    return {
      showBtn: {
        add: false,
        update: false,
        delete: false,
        authority: false
      },
      rightRole: [],
      dialogRoleVisible: false, //角色授权dialog
      addLoading: false, //增删改按钮loading
      title: "添加",
      dialogFormVisible: false,
      size: this.$store.getters.getAppSize,
      form: { name: "", id: "", remark: "" },
      menuList: [],
      style: "width:100%",
      rules: {
        parenId: [
          {
            required: true,
            message: "请选择父级菜单",
            trigger: ["blur", "change"]
          }
        ],
        remark: [
          {
            required: true,
            message: "请输入描述信息",
            trigger: ["blur", "change"]
          }
        ]
      },
      roleId: "",
      table: {
        //表格数据
        data: [],
        option: [
          // {type:'selection', label:'#'},
          { prop: "index", label: "序号", width: "30px" },
          { prop: "name", label: "角色名称" },
          { prop: "remark", label: "描述" },
          { name: "operate", label: "操作", isSlot: true }
          // {prop:'date', label:'提交时间',sortable:true},
        ],
        //是否分页
        isPage: false,
        //loading加载
        loading: false
      }
    };
  },
  mounted() {
    this.showBtn = getShowBtn(this.$route.query.id);
    this.table.loading = true;
    this.getLoad();
  },
  methods: {
    //角色授权
    handleSubmitRole() {
      if (this.rightRole.length === 0) {
        this.$message.error("至少选择一项");
        return false;
      }
      this.addLoading = true;
      managerKFJAddAuthority({
        ids: this.rightRole.toString(),
        roleId: this.roleId
      }).then(res => {
        this.addLoading = false;
        if (res && res.code === 200) {
          this.$message.success("授权成功");
          this.dialogRoleVisible = false;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    handleOpenRole(row) {
      this.roleId = row.id;
      this.dialogRoleVisible = true;
      managerKFJGetMenuList().then(res => {
        if (res && res.code === 200) {
          this.menuList = sortMenuAll(res.data);
          managerKFJGetRoleAuthority({
            roleId: this.roleId
          }).then(res => {
            if (res && res.code === 200) {
              res.data = res.data || [];
              res.data.forEach(item => {
                this.rightRole.push(item.menuId);
              });
            } else {
              this.$message.error("权限列表获取失败");
            }
          });
        } else {
          this.$message.error("菜单获取失败");
        }
      });
    },
    resetForm(formName) {
      this.form = { name: "", id: "", remark: "" };
      this.rightRole = [];
      this.menuList = [];
      // this.$refs[formName].resetFields();
    },
    handleSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.form.id) {
            this.addLoading = true;
            // TODO 修改
            managerKFJUpdateRole({
              ...this.form
            }).then(res => {
              this.addLoading = false;
              if (res && res.code === 200) {
                this.getLoad();
                this.dialogFormVisible = false;
                this.$message.success("修改成功");
              } else {
                this.$message.error(res.message);
              }
            });
          } else {
            this.addLoading = true;
            // TODO 添加
            managerKFJAddRole({ ...this.form }).then(res => {
              this.addLoading = false;
              if (res && res.code === 200) {
                this.getLoad();
                this.dialogFormVisible = false;
                this.$message.success("添加成功");
              } else {
                this.$message.error(res.message);
              }
            });
          }
        }
      });
    },
    handleAdd() {
      this.dialogFormVisible = true;
      this.title = "添加";
    },
    handleDelete(row) {
      this.$confirm("确定要删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        // TODO 删除
        managerKFJDeleteRole({
          id: row.id
        }).then(res => {
          if (res && res.code === 200) {
            this.loadData();
            this.$message.success("删除成功");
          } else {
            this.$message.error(res.message);
          }
        });
      });
    },
    handleUpdate(row) {
      this.dialogFormVisible = true;
      this.title = "修改";
      this.form.id = row.id;
      this.form.name = row.name;
      this.form.remark = row.remark;
    },

    getLoad() {
      managerKFJGetRoleList({}).then(result => {
        this.table.loading = false;
        if (result && result.code === 200) {
          this.table.data = result.data || [];
          let i = 1;
          this.table.data.forEach(item => {
            item.index = i++;
          });
        } else {
          this.$message.error(result.message);
        }
      });
    }
  }
};
</script>
<style lang="scss">
.el-form-role .el-transfer-panel {
  width: 260px;
  /*width: 35%;*/
}
</style>
<style scoped>
</style>
