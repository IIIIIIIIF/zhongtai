<template>
  <div class="my_settlement">
    <div class="el-form-my">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-tooltip
            effect="dark"
            content="资源入驻"
            placement="bottom-start">
            <el-button
              @click="handleOpenApply"
              :size="size"
              type="primary">资源入驻
            </el-button>
          </el-tooltip>
        </el-form-item>
        <el-form-item>
          <el-select
            :size="size"
            @change="handleChangeIsType"
            v-model="search.istype"
            placeholder="请选择接口类型">
            <el-option label="公有/私有" :value="0"></el-option>
            <el-option label="公有" :value="1"></el-option>
            <el-option label="私有" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="search.showPermission">
          <el-select
            :size="size"
            @change="handleChangeIsType"
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
      <template slot="id" slot-scope="scope">
        <router-link target="_blank" :to="'/test?indexName='+scope.row.id">{{scope.row.id}}</router-link>
      </template>
      <template slot="z_name" slot-scope="scope">
        <router-link target="_blank" :to="'/test?indexName='+scope.row.id">{{scope.row.z_name}}</router-link>
      </template>
      <template slot="operate" slot-scope="scope">
        <template v-if="scope.row.istype===1">
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
                @click="handleClickApply(scope.row.id,scope.row.z_name)"
                :size="size"
                type="primary">购买
              </el-button>
            </el-tooltip>
          </template>
        </template>
        <el-button-group v-else>
          <el-tooltip
            effect="dark"
            content="文件上传"
            placement="bottom-start">
            <el-button
              @click="handleOpenFile(scope.row.type,scope.row.id)"
              :size="size"
              type="primary">文件上传
            </el-button>
          </el-tooltip>
          <el-tooltip
            effect="dark"
            content="接口上传"
            placement="bottom-start">
            <el-button
              type="danger"
              :size="size"
              @click="handleOpenInterface(scope.row.type,scope.row.id)">接口上传
            </el-button>
          </el-tooltip>
        </el-button-group>
      </template>
    </com-table>
    <el-dialog
      :title="dialog.title"
      :close-on-click-modal="false"
      :width="dialog.width"
      :visible.sync="dialog.open">
      <Apply @close="handleCloseDialog" v-if="dialog.visibleApply"/>
      <FileUpload :index_id="dialog.id" :indexTypeId="dialog.indexTypeId" @close="handleCloseDialog" v-if="dialog.visibleFile"/>
      <InterfaceUpload :index_id="dialog.id" :indexTypeId="dialog.indexTypeId" @close="handleCloseDialog" v-if="dialog.visibleInterface"/>
    </el-dialog>
  </div>
</template>

<script>
  import {resourceGetIndexInfoList} from "../../../api/settlement";
  import {mapGetters} from 'vuex'
  import {Apply, FileUpload, InterfaceUpload} from "../Settlement/index.js";
  import {logout} from "../../../tools/utils";
  import {resourceAddApiIndexExamine} from "../../../api/shopping";

  export default {
    name: "index",
    components: {Apply, FileUpload, InterfaceUpload},
    data() {
      return {
        search: {
          istype: 0, // 1.公有 2.私有
          permission: 0,// 1.未购买 2.已购买
          showPermission: true,//是否显示已购买 和 未购买
        },
        dialog: {
          id: "",
          indexTypeId:'',
          title: "资源入驻",
          width: "550px",
          visibleApply: false,//入驻申请
          visibleFile: false,//文件上传
          visibleInterface: false,//接口上传
          open: false,
        },
        tableData: [],
        tableDataAll: {},
        tableDataAllApply: "",//已经购买
        indexTypeList: {},
        size: this.$store.getters.getAppSize,
        table: {
          //表格数据
          data: [],
          option: [
            // {type:'selection', label:'#'},
            {prop: 'id', label: '资源编号',isSlot:true,name:'id'},
            {prop: 'z_name', label: '资源名称',isSlot:true,name:'z_name'},
            {prop: 'explan', label: '资源说明'},
            {prop: 'istypeName', label: '资源类型'},
            {name:'operate', label:'操作',isSlot: true},
          ],
          //是否分页
          isPage: true,
          //loading加载
          loading: false
        },
      }
    },
    mounted() {
      this.loadData({istype: this.search.istype, permission: this.search.permission})
    },
    methods: {
      ...mapGetters(['getUsersInfo']),
      logout,
      loadData({istype, permission}) {
        let info = this.getUsersInfo();
        if (!info.id) {
          this.$message.error('用户信息获取失败，请重新登录');
          this.logout();
          return false;
        }
        this.table.loading = true;
        resourceGetIndexInfoList({
          owner_id: info.id,
          field: 'id,istype,name,z_name,explan,type'
        }).then((res) => {
          this.table.loading = false;
          if (res && res.code === 200 && res.data) {
            this.tableDataAll = res.data;
            this.table.data=[];
            let index_per = this.tableDataAll.index_permission;
            if (index_per) {
              let index_permission = index_per.index_permission || "";
              let api_permission = index_per.api_permission || "";
              if(index_permission){
                if(api_permission){
                  this.tableDataAllApply = index_permission +','+ api_permission;
                }else{
                  this.tableDataAllApply = index_permission;
                }
              }else{
                this.tableDataAllApply =   api_permission;
              }
            }
            //-----------申请中-----------
            let index_examine = this.tableDataAll.index_examine || [];
            let arr = [];
            index_examine.forEach(item => {
              arr.push(item.api_index_id);
            });
            this.tableDataAll.index_examine = arr;
            //-----------申请中-----------
            //-----------表格数据-----------
            if (this.tableDataAll.index_info && Array.isArray(this.tableDataAll.index_info) && this.tableDataAll.index_info.length > 0) {
              this.tableData = [];
              for (let i = 0; i < this.tableDataAll.index_info.length; i++) {
                if (istype !== 0) {
                  if (permission !== 0) {
                    if (permission === 1) {
                      if (istype === this.tableDataAll.index_info[i].istype && this.tableDataAllApply.indexOf(this.tableDataAll.index_info[i].id) === -1) {
                        this.table.data.push({
                          ...this.tableDataAll.index_info[i],
                          istypeName:this.tableDataAll.index_info[i].istype===1?'公有':'私有'
                        });
                      }
                    } else {
                      if (istype === this.tableDataAll.index_info[i].istype && this.tableDataAllApply.indexOf(this.tableDataAll.index_info[i].id) !== -1) {
                        this.table.data.push({
                          ...this.tableDataAll.index_info[i],
                          istypeName:this.tableDataAll.index_info[i].istype===1?'公有':'私有'
                        });
                      }
                    }

                  } else {
                    if (istype === this.tableDataAll.index_info[i].istype) {
                      this.table.data.push({
                        ...this.tableDataAll.index_info[i],
                        istypeName:this.tableDataAll.index_info[i].istype===1?'公有':'私有'
                      });
                    }
                  }
                } else if (permission !== 0) {
                  if (permission === 1) {
                    if (this.tableDataAllApply.indexOf(this.tableDataAll.index_info[i].id) === -1 && this.tableDataAll.index_info[i].istype !== 2) {
                      this.table.data.push({
                        ...this.tableDataAll.index_info[i],
                        istypeName:this.tableDataAll.index_info[i].istype===1?'公有':'私有'
                      });
                    }
                  } else {
                    if (this.tableDataAllApply.indexOf(this.tableDataAll.index_info[i].id) !== -1 || this.tableDataAll.index_info[i].istype === 2) {
                      this.table.data.push({
                        ...this.tableDataAll.index_info[i],
                        istypeName:this.tableDataAll.index_info[i].istype===1?'公有':'私有'
                      });
                    }
                  }

                } else {
                  this.table.data.push({
                    ...this.tableDataAll.index_info[i],
                    istypeName:this.tableDataAll.index_info[i].istype===1?'公有':'私有'
                  });
                }
              }
            } else {
              this.table.data.push({
                ...this.tableDataAll.index_info[i],
                istypeName:this.tableDataAll.index_info[i].istype===1?'公有':'私有'
              });
            }
            //-----------表格数据-----------
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
          type: 2,// 1.数据资源/索引  2.接口
        }).then((res) => {
          if (res && res.code === 200) {
            this.$message.success('已申请');
            this.handleChangeIsType();
          } else {
            this.$message.error('申请失败');
          }
        });
      },
      // TODO 数据显示格式
      handleFormatterApply(row) {
        // 申请中
        if (this.tableDataAll.index_examine.indexOf(row.id) !== -1) {
          return {
            message: '申请中',
            flag:1
          };
        } else if (this.tableDataAllApply.indexOf(row.id) !== -1) {
          return {
            message: '已购买',
            flag: 2
          };
        }
        return {
          flag: false
        };
      },
      // TODO 筛选条件
      handleChangeIsType() {
        if (this.search.istype !== 2) {
          this.search.showPermission = true;
        } else {
          this.search.showPermission = false;
        }
        this.loadData({istype: this.search.istype, permission: this.search.permission})
      },
      handleOpenApply() {
        this.dialog.title = "资源入驻";
        this.dialog.open = true;
        this.dialog.visibleApply = true;
        this.dialog.visibleFile = false;
        this.dialog.visibleInterface = false;
        this.dialog.width = "550px";
      },
      handleOpenFile(type,id) {
        this.dialog.indexTypeId = type;
        this.dialog.id = id;
        this.dialog.title = "文件上传";
        this.dialog.open = true;
        this.dialog.visibleFile = true;
        this.dialog.visibleApply = false;
        this.dialog.visibleInterface = false;
        this.dialog.width = "450px";
      },
      handleOpenInterface(type,id) {
        this.dialog.indexTypeId = type;
        this.dialog.id=id;
        this.dialog.title = "接口上传";
        this.dialog.open = true;
        this.dialog.visibleInterface = true;
        this.dialog.visibleFile = false;
        this.dialog.visibleApply = false;
        this.dialog.width = "550px";
      },
      handleCloseDialog() {
        this.dialog.open = false;
        this.dialog.visibleInterface = false;
        this.dialog.visibleFile = false;
        this.dialog.visibleApply = false;
      }
    }
  }
</script>
<style lang="scss">
  .centerData{
    .el-link{
      user-select: none;
      cursor: default;
      text-decoration: none;
      font-size: 12px;
    }
    .el-link.el-link--danger.is-underline:hover:after, .el-link.el-link--danger:after,.el-link.el-link--success.is-underline:hover:after, .el-link.el-link--success:after{
      border-color: transparent;
    }
  }
</style>
<style lang="scss" scoped></style>
