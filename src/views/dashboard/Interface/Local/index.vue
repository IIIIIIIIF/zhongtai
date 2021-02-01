<template>
  <el-scrollbar>
    <template>
      <div class="el-form-my">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item>
            <el-input v-model="name" :size="size" placeholder="请输入接口名称">
              <el-button
                type="primary"
                slot="append"
                icon="el-icon-search"
                @click="handleClickSearch"
              ></el-button>
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
        style="width: 100%"
      >
        <el-table-column prop="index" width="50px" label="序号"></el-table-column>
        <el-table-column prop="id" width="120px" label="接口资源编号"></el-table-column>
        <el-table-column prop="api_name" width="160px" label="接口名称"></el-table-column>
        <el-table-column prop="api_type" width="160px" label="接口类型">
          <template slot-scope="scope">
            <span v-html="handleFormatterApiType(scope.row.api_type)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="api_illustrate" label="接口说明"></el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
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
        </el-table-column>
      </el-table>
    </template>

    <el-dialog
      :title="dialog.insert.title+'接口'"
      :close-on-click-modal="false"
      width="900px"
      @close="handleClose"
      :visible.sync="dialog.visible"
    >
      <Insert
        v-if="dialog.insert.visible"
        :title="dialog.insert.title"
        :row="dialog.insert.row"
        :add="dialog.insert.add"
        :sort="1"
        @close="handleCloseInsert"
      />
    </el-dialog>
  </el-scrollbar>
</template>

<script>
import Insert from "./insert";
import {
  managerResourceGetApiListAll,
  managerResourceGetApiListTypeAll,
  managerResourceDeleteApiList,
} from "@/api/manager";
import { getShowBtn } from "@/tools/utils";

export default {
  name: "index",
  components: { Insert },
  data() {
    return {
      showBtn: {
        add: false,
        update: false,
        delete: false
      },
      id: "",
      name: "",
      sourceIdList: {},
      addLoading: false,
      tableData: [],
      apiTypeList: [], //用来列表集合
      typeListDialog: [], //添加/修改
      tableDataLoading: false,
      size: this.$store.getters.getAppSize,
      dialog: {
        visible: false, //是否显示dialog
        insert: {
          visible: false, //是否显示dialog中的insert组件
          add: true, //insert组件是添加还是修改 true:添加 false:修改
          row: {}, //如果是修改的话row是必填，需要传入当前行的所有信息
          title: "添加"
        }
      }
    };
  },
  mounted() {
    this.showBtn = getShowBtn(this.$route.query.id);
    this.tableDataLoading = true;
    this.initData(); // TODO 初始化数据
    this.getLoad({});
  },
  methods: {
    // dialog关闭事件
    handleClose() {
      this.dialog.visible = false;
      this.dialog.insert.visible = false;
    },
    // TODO 搜索功能
    handleClickSearch() {
      this.getLoad({ name: this.name });
    },
    // TODO 关闭dialog组件
    handleCloseInsert(){
      this.handleClose();
      this.handleClickSearch();
    },
    //点击添加的时候 显示dialog及insert组件
    handleAdd() {
      this.dialog.visible = true;
      this.dialog.insert.visible = true;
      this.dialog.insert.row = {};
      this.dialog.insert.add = true;
      this.dialog.insert.title = "添加"; //
    },
    handleDelete(row) {
      this.$confirm("确定要删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        managerResourceDeleteApiList({
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
      this.dialog.visible = true;
      this.dialog.insert.visible = true;
      this.dialog.insert.row = { ...row };
      this.dialog.insert.add = false; //修改
      this.dialog.insert.title = "修改"; //
    },
    getLoad({ name }) {
      let obj = {
        field:"id,api_name,type,api_type,api_illustrate"
      };
      if (name) {
        obj.likeField = name;
      }
      managerResourceGetApiListAll(obj).then(result => {
        this.tableDataLoading = false;
        if (result.code === 200) {
          result = result.data || [];
          this.tableData = result;
          let i = 1;
          this.tableData.forEach(item => {
            item.index = i++;
          });
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
      //接口类型
      managerResourceGetApiListTypeAll().then(res => {
        if (res && res.code === 200) {
          this.apiTypeList = res.data || [];
        } else {
          this.apiTypeList = [];
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.el-form-item__content .el-input-group {
  vertical-align: middle;
}
</style>
