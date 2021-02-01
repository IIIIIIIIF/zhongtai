<template>
  <div class="centerInterface">
    <div class="el-form-my">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-tooltip
            effect="dark"
            content="接口入驻"
            placement="bottom-start">
            <el-button
              @click="handleOpenDialog({field:'insert'})"
              :size="size"
              type="primary">接口入驻
            </el-button>
          </el-tooltip>
        </el-form-item>
        <el-form-item>
          <el-select
            :size="size"
            @change="handleChangeApiType"
            v-model="search.apiType"
            placeholder="请选择接口类型">
            <el-option label="全部" :value="0"></el-option>
            <template v-for="(item,index) in apiTypeList">
              <el-option :key="index" :label="item.name" :value="item.id"></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select
            :size="size"
            @change="handleChangeType"
            v-model="search.type"
            placeholder="请选择接口类型">
            <el-option label="公有/私有" :value="0"></el-option>
            <el-option label="公有" :value="1"></el-option>
            <el-option label="私有" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="showPermission">
          <el-select
            :size="size"
            @change="handleChangeType"
            v-model="search.permission"
            placeholder="请选择接口类型">
            <el-option label="未购买/已购买" :value="0"></el-option>
            <el-option label="未购买" :value="1"></el-option>
            <el-option label="已购买" :value="2"></el-option>
          </el-select>
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
      <template slot="api_name" slot-scope="scope">
        <span @click="handleOpenDialog({field:'data',row:scope.row})" style="display: inline-block;width: 100%;height: 100%;cursor: pointer;">{{scope.row.api_name}}</span>
      </template>
      <template slot="type" slot-scope="scope">
        <span v-if="scope.row.type===1">公有</span>
        <span v-else>私有</span>
      </template>
      <template slot="operate" slot-scope="scope">
        <template v-if="scope.row.type===1">
          <template v-if="handleFormatterApply(scope.row).flag">
            <el-link type="danger" v-if="handleFormatterApply(scope.row).flag===1">{{handleFormatterApply(scope.row).message}}</el-link>
            <el-link type="success" v-else>{{handleFormatterApply(scope.row).message}}</el-link>
          </template>
          <template v-else>
            <el-tooltip
              effect="dark"
              content="购买"
              placement="bottom-start">
              <el-button
                @click="handleClickApply(scope.row.id,scope.row.api_name)"
                :size="size"
                type="primary">购买
              </el-button>
            </el-tooltip>
          </template>
        </template>
      </template>
    </com-table>

    <el-dialog
      :title="dialog.insert.title"
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
        :sort="2"
        @close="handleCloseInsert"
      />
      <template v-if="dialog.data.visible">
        <pre class="datePre">{{dialog.data.row.return_result||'暂无数据'}}</pre>
      </template>
    </el-dialog>
  </div>
</template>

<script>
  import {
    resourceGetApiListInfo,
    resourceGetApilistTypeAll,
    resourceAddApiIndexExamine
  } from "../../../api/shopping";
  import {
    mapGetters
  } from 'vuex'
  import Insert from '../../dashboard/Interface/Local/insert'
  import {
    logout
  } from "../../../tools/utils";

  export default {
    name: "index",
    components: {Insert},
    data() {
      return {
        size: this.$store.getters.getAppSize,
        apiTypeList: [],//
        search: {
          apiType: 0,//筛选类型
          type: 0,//公有/私有
          permission: 0,//未购买/已购买
        },
        showPermission: true,
        table: {
          //表格数据
          data: [],
          option: [
            // {type:'selection', label:'#'},
            {prop: 'id', label: '资源编号', width: "20px"},
            {prop: 'api_name', label: '资源名称', width: '30px',isSlot:true,name:'api_name'},
            {prop: 'api_illustrate', label: '描述'},
            {prop: 'type', label: '资源类型', width: '20px', isSlot: true, name: "type"},
            {name: 'operate', label: '操作', isSlot: true, width: '20px'}
            // {name:'operate', label:'操作',isSlot: true,width:'20px'},
          ],
          //是否分页
          isPage: true,
          //loading加载
          loading: false
        },
        tableDataAll: {},
        tableDataAllApply: [],
        dialog: {
          visible: false, //是否显示dialog
          insert: {
            visible: false, //是否显示dialog中的insert组件
            add: true, //insert组件是添加还是修改 true:添加 false:修改
            row: {}, //如果是修改的话row是必填，需要传入当前行的所有信息
            title: "添加接口"
          },
          data: {
            visible: false,
            row: {},
            title: ""
          }
        }
      };
    },
    mounted() {
      this.initData();
      this.handleChangeType();

    },
    methods: {
      logout,
      ...mapGetters(['getUsersInfo']),
      // TODO 打开dialog
      handleOpenDialog({field, row}) {
        this.dialog.visible=true;
        if (field === 'insert') {
          this.dialog.insert.visible=true;
          this.dialog.insert.row = {};
          this.dialog.insert.add = true;
          this.dialog.insert.title="添加接口";
        } else if (field === 'data') {
          this.dialog.data.visible=true;
          this.dialog.data.visible = true;
          this.dialog.data.row = row;
          this.dialog.insert.title="样例数据";
        }
      },
      // TODO dialog关闭事件
      handleClose() {
        this.dialog.visible = false;
        this.dialog.insert.visible = false;
      },
      // TODO 关闭dialog组件
      handleCloseInsert() {
        this.handleClose();
        this.handleChangeType();
      },
      // TODO 初始化下拉数据
      initData() {
        resourceGetApilistTypeAll({}).then(res => {
          if (res && res.code === 200 && res.data && res.data.length > 0) {
            res = res.data;
            let arr = [];
            res.forEach(item => {
              if (item.pid === 15) {
                arr.push(item);
              }
            });
            this.apiTypeList = arr;
          }
        })
      },
      // TODO 公有/私有 修改事件
      handleChangeType() {
        if (this.search.type === 2) {
          this.showPermission = false;
        } else {
          this.showPermission = true;
        }
        this.getApiListTableData({type: this.search.type, permission: this.search.permission});
      },
      // TODO  api 列表数据
      getApiListTableData({type, permission}) {
        let info = this.getUsersInfo();
        if (!info.id) {
          this.$message.error('用户信息获取失败，请重新登录');
          this.logout();
          return false;
        }
        resourceGetApiListInfo({
          owner_id: info.id,
          field: 'id,api_illustrate,api_name,api_price,api_type,auth_method,request_mode,type,url,url_example,return_result'
        }).then(res => {
          if (res && res.code === 200 && res.data && res.data.api_info && res.data.api_info.length > 0) {
            this.tableDataAll = res.data;
            this.table.data = [];
            let index_per = this.tableDataAll.api_permission;
            if (index_per) {
              let index_permission = index_per.index_permission || "";
              let api_permission = index_per.api_permission || "";
              if (index_permission) {
                if (api_permission) {
                  this.tableDataAllApply = index_permission + ',' + api_permission;
                } else {
                  this.tableDataAllApply = index_permission;
                }
              } else {
                this.tableDataAllApply = api_permission;
              }

            }
            //-----------申请中-----------
            let api_examine = this.tableDataAll.api_examine || [];
            let arr = [];
            api_examine.forEach(item => {
              arr.push(item.api_index_id);
            });
            this.tableDataAll.api_examine = arr;
            //-----------申请中-----------
            //-----------表格数据-----------
            if (this.tableDataAll.api_info && Array.isArray(this.tableDataAll.api_info) && this.tableDataAll.api_info.length > 0) {
              this.tableData = [];
              for (let i = 0; i < this.tableDataAll.api_info.length; i++) {
                if (type !== 0) {
                  if (permission !== 0) {
                    if (permission === 1) {
                      if (type === this.tableDataAll.api_info[i].type && this.tableDataAllApply.indexOf(this.tableDataAll.api_info[i].id) === -1) {
                        if(this.search.apiType!==0&&parseInt(this.tableDataAll.api_info[i].api_type)===this.search.apiType){
                          this.table.data.push({
                            ...this.tableDataAll.api_info[i],
                          });
                        }else if(this.search.apiType===0){
                          this.table.data.push({
                            ...this.tableDataAll.api_info[i],
                          });
                        }
                      }
                    } else {
                      if (type === this.tableDataAll.api_info[i].type && this.tableDataAllApply.indexOf(this.tableDataAll.api_info[i].id) !== -1) {
                        if(this.search.apiType!==0&&parseInt(this.tableDataAll.api_info[i].api_type)===this.search.apiType){
                          this.table.data.push({
                            ...this.tableDataAll.api_info[i],
                          });
                        }else if(this.search.apiType===0){
                          this.table.data.push({
                            ...this.tableDataAll.api_info[i],
                          });
                        }
                      }
                    }

                  } else {
                    if (type === this.tableDataAll.api_info[i].type) {
                      if(this.search.apiType!==0&&parseInt(this.tableDataAll.api_info[i].api_type)===this.search.apiType){
                        this.table.data.push({
                          ...this.tableDataAll.api_info[i],
                        });
                      }else if(this.search.apiType===0){
                        this.table.data.push({
                          ...this.tableDataAll.api_info[i],
                        });
                      }
                    }
                  }
                } else if (permission !== 0) {
                  if (permission === 1) {
                    if (this.tableDataAllApply.indexOf(this.tableDataAll.api_info[i].id) === -1 && this.tableDataAll.api_info[i].type !== 2) {
                      if(this.search.apiType!==0&&parseInt(this.tableDataAll.api_info[i].api_type)===this.search.apiType){
                        this.table.data.push({
                          ...this.tableDataAll.api_info[i],
                        });
                      }else if(this.search.apiType===0){
                        this.table.data.push({
                          ...this.tableDataAll.api_info[i],
                        });
                      }
                    }
                  } else {
                    if (this.tableDataAllApply.indexOf(this.tableDataAll.api_info[i].id) !== -1 || this.tableDataAll.api_info[i].type === 2) {
                      if(this.search.apiType!==0&&parseInt(this.tableDataAll.api_info[i].api_type)===this.search.apiType){
                        this.table.data.push({
                          ...this.tableDataAll.api_info[i],
                        });
                      }else if(this.search.apiType===0){
                        this.table.data.push({
                          ...this.tableDataAll.api_info[i],
                        });
                      }
                    }
                  }
                } else {
                  if(this.search.apiType!==0&&parseInt(this.tableDataAll.api_info[i].api_type)===this.search.apiType){
                    this.table.data.push({
                      ...this.tableDataAll.api_info[i],
                    });
                  }else if(this.search.apiType===0){
                    this.table.data.push({
                      ...this.tableDataAll.api_info[i],
                    });
                  }
                }
              }
            }
          } else {
            this.table.data = [];
          }
        })
      },
      // TODO 点击购买按钮
      handleClickApply(id, z_name) {
        let info = this.getUsersInfo();
        if (!info.id) {
          this.$message.error('用户信息获取失败，请重新登录');
          this.logout();
          return false;
        }
        resourceAddApiIndexExamine({
          user_id: info.id,
          username: info.username,
          api_index_id: id,
          aoi_name: z_name,
          status: 2,
          type: 1,// 1.数据资源/索引  2.接口
        }).then((res) => {
          if (res && res.code === 200) {
            this.$message.success('已申请');
            this.handleChangeType();
          } else {
            this.$message.error('申请失败');
          }
        });
      },
      // TODO 数据显示格式
      handleFormatterApply(row) {
        // 申请中
        if (this.tableDataAll.api_examine.indexOf(row.id) !== -1) {
          return {
            message: '申请中',
            flag: true
          };
        } else if (this.tableDataAllApply.indexOf(row.id) !== -1) {
          return {
            message: '已购买',
            flag: true
          };
        }
        return {
          flag: false
        };
      },
      // 筛选条件筛选
      handleChangeApiType(val) {
        this.handleChangeType()
      }
    }
  };
</script>

<style lang="scss" scoped>
  .datePre{
    padding: 20px;
    overflow-x: scroll;
    max-height: 400px;
    overflow-y: scroll;
    border: 1px solid #eee;
  }
</style>
