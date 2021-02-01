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
    </template>

    <el-dialog
      :title="title+'菜单'"
      :close-on-click-modal="false"
      width="400px"
      @closed="resetForm('form')"
      :visible.sync="dialogFormVisible"
    >
      <el-form ref="form" :model="form" :size="size" :rules="rules">
        <el-form-item prop="parentId" label="父级菜单">
          <el-select :style="style" :size="size" v-model="form.parentId" placeholder="请选择父级菜单">
            <el-option label="无" :value="0"></el-option>
            <template v-for="(item,index) in table.data">
              <el-option
                :key="index"
                label="item.name"
                :value="item.id"
                v-if="item.flag===1&&item.parentId===0"
              ></el-option>
              <el-option
                :key="index"
                style="padding-left:3em"
                :label="item.name"
                :value="item.id"
                v-else-if="item.flag===1"
              ></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item prop="name" label="菜单名称">
          <el-input
            :style="style"
            :size="size"
            v-model="form.name"
            autocomplete="off"
            placeholder="请输入菜单名称"
          ></el-input>
        </el-form-item>
        <el-form-item prop="flag" label="标识">
          <el-select :style="style" :size="size" v-model="form.flag" placeholder="请选择标识">
            <el-option label="菜单" :value="1"></el-option>
            <el-option label="按钮" :value="2"></el-option>
            <!--            <el-option label="链接" :value="3"></el-option>-->
          </el-select>
        </el-form-item>
        <el-form-item label="URL">
          <el-input
            :style="style"
            :size="size"
            v-model="form.url"
            autocomplete="off"
            placeholder="请输入URL"
          ></el-input>
        </el-form-item>
        <el-form-item label="图标">
          <el-input
            :style="style"
            :size="size"
            v-model="form.icon"
            autocomplete="off"
            placeholder="请输入icon图标路径"
          ></el-input>
        </el-form-item>
        <el-form-item label="顺序">
          <el-input
            :style="style"
            :size="size"
            v-model="form.numberId"
            autocomplete="off"
            placeholder="请输入排序数字"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="addLoading"
            :size="size"
            type="primary"
            @click="handleSubmit('form')"
          >{{title}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-scrollbar>
</template>

<script>
import {
  managerKFJGetMenuList,
  managerKFJAddMenu,
  managerKFJDeleteMenu,
  managerKFJUpdateMenu
} from "@/api/manager";
import { sortMenuAll, getShowBtn } from "@/tools/utils";
import { mapGetters } from "vuex";

export default {
  name: "index",
  data() {
    return {
      showBtn: {
        add: false,
        update: false,
        delete: false
      },
      addLoading: false,
      visible: false,
      title: "添加",
      dialogFormVisible: false,
      size: this.$store.getters.getAppSize,
      form: {
        parentId: "",
        name: "",
        flag: "",
        id: "",
        url: "",
        icon: "",
        numberId: ""
      },
      style: "width:100%",
      rules: {
        parentId: [
          {
            required: true,
            message: "请选择父级菜单",
            trigger: ["blur", "change"]
          }
        ],
        name: [
          {
            required: true,
            message: "请输入菜单名称",
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
                    if (item.name === value) {
                      flag = true;
                    }
                  });
                  if (flag) {
                    callback(new Error("菜单名称已存在"));
                  } else {
                    callback();
                  }
                }
              } else {
                callback(new Error("请输入菜单名称"));
              }
            },
            trigger: "blur"
          }
        ],
        flag: [
          { required: true, message: "请选择标识", trigger: ["blur", "change"] }
        ]
      },
      table: {
        //表格数据
        data: [],
        option: [
          // {type:'selection', label:'#'},
          { prop: "index", label: "序号", width: "30px" },
          {
            prop: "name",
            label: "名称",
            width: "200px",
            name: "name",
            isSlot: true
          },
          {
            prop: "parentId",
            name: "parentId",
            isSlot: true,
            label: "父级名称"
          },
          { prop: "flag", label: "标识", name: "flag", isSlot: true },
          { prop: "url", label: "url" },
          { prop: "icon", label: "图标" },
          { prop: "numberId", label: "排序" },
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
    ...mapGetters(["getMenuAllSort"]),
    resetForm(formName) {
      this.form = {
        parentId: "",
        name: "",
        flag: "",
        id: "",
        url: "",
        icon: "",
        numberId: ""
      };
      // this.$refs[formName].resetFields();
      this.$refs.form.clearValidate();
    },
    handleSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.form.id) {
            this.addLoading = true;
            // TODO 修改
            managerKFJUpdateMenu({
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
            managerKFJAddMenu({ ...this.form }).then(res => {
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
        managerKFJDeleteMenu({
          id: row.id
        }).then(res => {
          if (res && res.code === 200) {
            this.getLoad();
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
      this.form.parentId = row.parentId;
      this.form.name = row.name;
      this.form.flag = row.flag;
      this.form.url = row.url;
      this.form.icon = row.icon;
      this.form.numberId = row.numberId;
    },
    handleFormatterFlag(row) {
      if (row.flag === 1) {
        return "菜单";
      } else if (row.flag === 2) {
        return "按钮";
      } else {
        return "链接";
      }
    },
    handleFormatterParentId(row) {
      if (row.parentId === 0) {
        return "-";
      }
      for (let i = 0; i < this.table.data.length; i++) {
        if (this.table.data[i].id === row.parentId) {
          return this.table.data[i].name;
        }
      }
      return "-";
    },
    handleFormatterName(row, val) {
      if (row.flag === 1 && row.parentId !== 0) {
        return `<label style='width: 100%;height: 100%;display: inline-block;text-align: left;font-weight:normal;text-indent: 1.5em'>${val}</label>`;
      }
      if (row.flag === 2) {
        return `<label style='width: 100%;height: 100%;display: inline-block;text-align: left;font-weight:normal;text-indent: 3em'>${val}</label>`;
      }
      return `<label style='width: 100%;height: 100%;display: inline-block;text-align: left;font-weight:normal'>${val}</label>`;
    },
    getLoad() {
      managerKFJGetMenuList({}).then(result => {
        this.table.loading = false;
        if (result.code === 200) {
          result = result.data || [];

          this.table.data = sortMenuAll(result);
        } else {
          this.table.data = [];
        }
      });
    }
  }
};
</script>

<style scoped>
</style>
