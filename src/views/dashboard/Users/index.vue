<template>
  <el-scrollbar>
    <template>
      <div class="el-form-my">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item v-if="showBtn.add">
            <el-tooltip effect="dark" content="添加" placement="bottom-start">
              <el-button @click="handleAdd" :size="size" type="primary" icon="el-icon-plus"></el-button>
            </el-tooltip>
          </el-form-item>
          <el-form-item>
            <el-input v-model="username" :size="size" placeholder="请输入用户名">
              <el-button
                type="primary"
                slot="append"
                icon="el-icon-search"
                @click="handleClickSearch"
              ></el-button>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
    </template>

    <com-table
      :tableDataLoading="table.loading"
      :tableData="table.data"
      :tableOption="table.option"
      :isOperate="table.isOperate"
      :isPage="table.isPage"
    >
      <template slot="username" slot-scope="scope">
        <a href="javascript:void(0)" @click="handleClickUserName(scope.row)">{{scope.row.username}}</a>
      </template>
      <template slot="status" slot-scope="scope">
        <span v-if="scope.row.status==='1'">正常</span>
        <span v-else>停用</span>
      </template>
      <template slot="operate" slot-scope="scope">
        <el-button-group>
          <el-tooltip effect="dark" content="编辑" placement="bottom-start">
            <el-button
              @click="handleUpdate(scope.row)"
              :size="size"
              type="primary"
              icon="el-icon-edit"
            ></el-button>
          </el-tooltip>
          <el-tooltip effect="dark" content="删除" placement="bottom-start">
            <el-button
              type="danger"
              :size="size"
              icon="el-icon-delete-solid"
              @click="handleDelete(scope.row)"
            ></el-button>
          </el-tooltip>
<!--          <el-tooltip effect="dark" content="修改密码" placement="bottom-start">-->
<!--            <el-button-->
<!--              type="warning"-->
<!--              :size="size"-->
<!--              icon="el-icon-set-up"-->
<!--              @click="handleOpenChangePassword(scope.row)"-->
<!--            ></el-button>-->
<!--          </el-tooltip>-->
          <el-tooltip v-if="showBtn.authority" effect="dark" content="授权" placement="bottom-start">
            <el-button
              type="success"
              :size="size"
              icon="el-icon-s-check"
              @click="handleOpenRole(scope.row)"
            ></el-button>
          </el-tooltip>
        </el-button-group>
      </template>
    </com-table>
    <el-dialog
      :title="title+'用户'"
      :close-on-click-modal="false"
      width="400px"
      @closed="resetForm('form')"
      :visible.sync="dialogFormVisible"
    >
      <el-form ref="form" :model="form" :size="size" :rules="rules">
        <el-form-item prop="username" label="用户名">
          <el-input
            :style="style"
            :size="size"
            v-model="form.username"
            autocomplete="off"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="!form.id" prop="password" label="密码">
          <el-input
            :style="style"
            :size="size"
            v-model="form.password"
            autocomplete="off"
            placeholder="请输入密码"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="到期时间">
          <el-date-picker
            :size="size"
            value-format="yyyy-MM-dd"
            :style="style"
            type="date"
            v-model="form.exptime"
            placeholder="请选择到期时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item prop="status" label="状态">
          <el-select :style="style" :size="size" v-model="form.status" placeholder="请选择用户状态">
            <el-option label="正常" value="1"></el-option>
            <el-option label="停用" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="调用接口最大次数">
          <el-input
            :style="style"
            :size="size"
            v-model="form.max_inter_num"
            autocomplete="off"
            placeholder="请输入调用接口最大次数"
            type="number"
          ></el-input>
        </el-form-item>
        <el-form-item label="调用接口总次数">
          <el-input
            :style="style"
            :size="size"
            v-model="form.total_inter_num"
            autocomplete="off"
            placeholder="请输入调用接口总次数"
            type="number"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input
            :style="style"
            :size="size"
            v-model="form.tel"
            autocomplete="off"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input
            :style="style"
            :size="size"
            v-model="form.email"
            autocomplete="off"
            placeholder="请输入邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户信息">
          <el-input
            :style="style"
            :size="size"
            v-model="form.userinfo"
            autocomplete="off"
            placeholder="请输入用户信息"
          ></el-input>
        </el-form-item>
        <el-form-item label="IP">
          <el-input
            type="textarea"
            v-model="form.ip"
            :autosize="{ minRows: 4, maxRows: 6}"
            placeholder="指定限定IP，格式：10.20.19.172,10.20.19.173"
            :style="style"
          ></el-input>
        </el-form-item>
        <el-form-item style="text-align: right">
          <el-button
            :loading="addLoading"
            :size="size"
            type="primary"
            @click="handleSubmit('form')"
          >{{title}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title="用户授权"
      :close-on-click-modal="false"
      width="722px"
      @closed="resetForm('form')"
      :visible.sync="dialogRoleVisible"
    >
      <el-form class="el-form-label" ref="form" :model="form" :size="size" :rules="rules">
        <el-form-item>
          <h3>数据资源</h3>
          <el-transfer
            v-model="role.checkedData"
            :data="role.dataList"
            :titles="['未授权','已授权/待授权']"
            :props="{
              key:'id',
              label:'z_name'
            }"
          ></el-transfer>
          <h3>接口资源</h3>
          <el-transfer
            v-model="role.checkedInterface"
            :data="role.interfaceList"
            :titles="['未授权','已授权/待授权']"
            :props="{
              key:'id',
              label:'api_name'
            }"
          ></el-transfer>
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
    <el-dialog
      title="用户信息"
      :close-on-click-modal="false"
      width="722px"
      @closed="resetForm('form')"
      :visible.sync="dialogInfoVisible"
    >
      <Info :row="userInfoRow"/>
    </el-dialog>
    <ChangePassword :row="changePassword.form" @close="changePassword.visible=false" :visible="changePassword.visible"/>
  </el-scrollbar>
</template>

<script>
  import ChangePassword from './changPassword'
import {
  managerKFJGetUserListAll,
  managerKFJRegister,
  managerKFJDeleteUser,
  managerKFJChangeUser,
  managerResourceGetIndexInfoAll,
  managerResourceGetApiListAll,
  managerKFJGetUserJdiction,
  managerKFJChangeUserPermission,
  managerKFJGetAdUserListAll,
  managerKFJChangeAdUser
} from "@/api/manager";
import { getShowBtn } from "@/tools/utils";
import Info from './info'

export default {
  name: "index",
  components:{Info,ChangePassword},
  data() {
    return {
      showBtn: {
        add: false,
        update: false,
        delete: false,
        authority: false,
        password: false
      },
      role: {
        //用户授权
        dataList: [], //数据资源列表
        checkedData: [], //已选中的数据资源
        interfaceList: [], //接口资源列表
        checkedInterface: [] //已选中的接口资源
      },
      id: "",
      changePassword:{
        visible:false,
        form:{
          id:"",
          username:"",
          oldpassword:""
        }
      },
      username: "",
      addLoading: false,
      title: "添加",
      dialogFormVisible: false,
      dialogInfoVisible: false,
      dialogRoleVisible: false,
      userInfoRow:{},//点击后保存的用户信息 并传给子组件
      size: this.$store.getters.getAppSize,
      form: {
        username: "",
        password: "",
        id: "",
        status: "",
        max_inter_num: "",
        total_inter_num: "",
        tel: "",
        email: "",
        ip: "",
        exptime: "",
        userinfo: ""
      },
      style: "width:100%",
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: ["blur", "change"]
          },
          {
            validator: (rule, value, callback) => {
              if (value) {
                if (this.form.id) {
                  callback();
                } else {
                  let flag = false; //没有找到
                  this.table.data.forEach(item => {
                    if (item.username === value) {
                      flag = true;
                    }
                  });
                  if (flag) {
                    callback(new Error("用户名已存在"));
                  } else {
                    callback();
                  }
                }
              } else {
                callback(new Error("请输入用户名"));
              }
            },
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: ["blur", "change"] }
        ],
        status: [
          {
            required: true,
            message: "请选择账户状态",
            trigger: ["blur", "change"]
          }
        ]
      },
      table: {
        //表格数据
        data: [],
        option: [
          // {type:'selection', label:'#'},
          { prop: "index", label: "序号", width: "30px" },
          { prop: "username", label: "用户名", name: "username", isSlot: true },
          { prop: "status", label: "用户状态", name: "status", isSlot: true },
          { name: "operate", label: "操作", isSlot: true }
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
    this.getLoad({});
  },
  methods: {
    // TODO 点击用户名
    handleClickUserName(row) {
      this.dialogInfoVisible = true;
      this.userInfoRow = { ...row };
    },

    handleOpenChangePassword(row) {
      this.changePassword.form.id=row.id;
      this.changePassword.form.username=row.username;
      this.changePassword.form.oldpassword=row.password;
      this.changePassword.visible=true;
    },
    handleOpenRole(row) {
      this.id = row.id;
      this.dialogRoleVisible = true;
      this.initRole();
    },
    // TODO dialog 用户授权打开时初始化数据
    initRole() {
      //加载数据资源数据
      managerResourceGetIndexInfoAll({
        field: "id,z_name"
      }).then(res => {
        if (res && res.code === 200) {
          this.role.dataList = res.data || [];
        }
      });
      //加载接口资源数据
      managerResourceGetApiListAll({
        field: "id,api_name"
      }).then(res => {
        if (res && res.code === 200) {
          this.role.interfaceList = res.data || [];
        }
      });
      //获取当前用户已经授权的资源
      managerKFJGetUserJdiction({
        id: this.id
      }).then(res => {
        if (res && res.code === 200) {
          if (res.data.index_permission) {
            this.role.checkedData = res.data.index_permission.split(",");
            for (let i = 0; i < this.role.checkedData.length; i++) {
              this.role.checkedData[i] = parseInt(this.role.checkedData[i]);
            }
          }
          if (res.data.api_permission) {
            this.role.checkedInterface = res.data.api_permission.split(",");
            for (let i = 0; i < this.role.checkedInterface.length; i++) {
              this.role.checkedInterface[i] = parseInt(
                this.role.checkedInterface[i]
              );
            }
          }
        }
      });
    },
    // TODO 提交授权
    handleSubmitRole() {
      managerKFJChangeUserPermission({
        id: this.id,
        index_permission: this.role.checkedData.toString(),
        api_permission: this.role.checkedInterface.toString()
      }).then(res => {
        if (res && res.code === 200) {
          this.$message.success("授权成功");
          this.dialogRoleVisible = false;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // TODO 模糊检索
    handleClickSearch() {
      this.getLoad({ username: this.username });
    },
    // TODO 重置表单
    resetForm(formName) {
      this.id = "";
      this.role.checkedRoles = [];
      this.role.checkedInterface = [];
      this.form = {
        username: "",
        password: "",
        id: "",
        status: "",
        max_inter_num: "",
        total_inter_num: "",
        tel: "",
        email: "",
        ip: "",
        exptime: "",
        userinfo: ""
      };
      // this.$refs.form.clearValidate();
      // this.$refs[formName].resetFields();
    },
    // TODO 提交 添加/修改 表单
    handleSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.form.id) {
            this.addLoading = true;
            // TODO 修改
            if (this.$route.meta.role === 1) {
              managerKFJChangeAdUser({
                ...this.form
              }).then(res => {
                this.addLoading = false;
                if (res && res.code === 200) {
                  this.getLoad({});
                  this.dialogFormVisible = false;
                  this.$message.success("修改成功");
                } else {
                  this.$message.error(res.message);
                }
              });
            } else {
              managerKFJChangeUser({
                ...this.form
              }).then(res => {
                this.addLoading = false;
                if (res && res.code === 200) {
                  this.getLoad({});
                  this.dialogFormVisible = false;
                  this.$message.success("修改成功");
                } else {
                  this.$message.error(res.message);
                }
              });
            }
          } else {
            this.addLoading = true;
            // TODO 添加
            managerKFJRegister({ ...this.form }).then(res => {
              this.addLoading = false;
              if (res && res.code === 200) {
                this.getLoad({});
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
        managerKFJDeleteUser({
          id: row.id
        }).then(res => {
          if (res && res.code === 200) {
            this.getLoad({});
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
      this.form.username = row.username;
      this.form.password = row.password;
      this.form.status = row.status;
      this.form.max_inter_num = row.max_inter_num;
      this.form.total_inter_num = row.total_inter_num;
      this.form.tel = row.tel;
      this.form.email = row.email;
      this.form.ip = row.ip;
      this.form.exptime = row.exptime;
      this.form.userinfo = row.userinfo;
    },
    getLoad({ username }) {
      let obj = {
        //  id,tel,userinfo,mail,ip,type,roleId,exptime,max_inter_num,total_inter_num,status
        field:
          "id,username,tel,userinfo,mail,ip,type,roleId,exptime,max_inter_num,total_inter_num,status,password"
      };
      if (username) {
        obj.username = username;
      }
      if (this.$route.meta.role === 1) {
        managerKFJGetAdUserListAll(obj).then(result => {
          this.table.loading = false;
          if (result.code === 200) {
            result = result.data || [];
            this.table.data = result;
            let i = 1;
            this.table.data.forEach(item => {
              item.index = i++;
            });
          } else {
            this.table.data = [];
          }
        });
      } else {
        managerKFJGetUserListAll(obj).then(result => {
          this.table.loading = false;
          if (result.code === 200) {
            result = result.data || [];
            this.table.data = result;
            let i = 1;
            this.table.data.forEach(item => {
              item.index = i++;
            });
          } else {
            this.table.data = [];
          }
        });
      }
    }
  },
  watch: {
    $route() {
      this.showBtn = getShowBtn(this.$route.query.id);
      this.table.loading = true;
      this.getLoad({});
    }
  }
};
</script>
<style lang="scss">
.el-form-labels {
  .el-form-item {
    margin-bottom: 0;
  }
  .el-form-item__label,
  .el-form-item__content {
    line-height: 24px;
  }
  label {
    width: 140px;
    display: inline-block;
    text-align: right;
  }
}
.el-form-label .el-transfer-panel {
  width: 260px;
}
</style>
<style lang="scss" scoped>
.el-form-item__content .el-input-group {
  vertical-align: middle;
}
</style>
