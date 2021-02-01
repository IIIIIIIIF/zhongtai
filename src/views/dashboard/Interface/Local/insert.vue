<!-- 添加/修改接口 -->
<template>
  <el-form ref="form" :model="form" :size="size" :rules="rules">
    <el-form-item prop="id" label="资源编号">
      <el-input
        :style="style"
        :size="size"
        v-model="form.id"
        autocomplete="off"
        placeholder="请输入接口资源编号"
      ></el-input>
    </el-form-item>
    <el-form-item prop="api_type" label="接口类型">
      <el-select :style="style" :size="size" v-model="form.api_type" placeholder="请选择接口类型">
        <el-option
          v-for="item in apiTypeList"
          :label="item.name"
          :value="item.id"
          :key="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="api_name" label="接口名称">
      <el-input
        :style="style"
        :size="size"
        v-model="form.api_name"
        autocomplete="off"
        placeholder="请输入接口名称"
      ></el-input>
    </el-form-item>
    <el-form-item prop="api_illustrate" label="接口说明">
      <el-input
        :style="style"
        :size="size"
        v-model="form.api_illustrate"
        autocomplete="off"
        placeholder="请输入接口说明"
      ></el-input>
    </el-form-item>
    <el-form-item prop="url" label="接口地址">
      <el-input
        :style="style"
        :size="size"
        v-model="form.url"
        autocomplete="off"
        placeholder="请输入接口地址"
      ></el-input>
    </el-form-item>
    <el-form-item prop="request_mode" label="请求方式">
      <el-select :style="style" :size="size" v-model="form.request_mode" placeholder="请选择请求方式">
        <el-option label="GET" :value="1"></el-option>
        <el-option label="POST" :value="2"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="type" label="接口类型">
      <el-select :style="style" :size="size" v-model="form.type" placeholder="请选择接口类型">
        <el-option label="共有" :value="1"></el-option>
        <el-option label="私有" :value="2"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="完整示例">
      <el-input
        :style="style"
        :size="size"
        v-model="form.url_example"
        autocomplete="off"
        placeholder="请输入完整URL示例"
      ></el-input>
    </el-form-item>
    <el-form-item label="认证方式">
      <el-input
        :style="style"
        :size="size"
        v-model="form.auth_method"
        autocomplete="off"
        placeholder="请输入授权认证方式"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-table :data="form.request_param_list" id="return_fields_list" style="width: 100%">
        <el-table-column prop="param" label="参数名称">
          <template slot-scope="scope">
            <el-input
              :style="style"
              :size="size"
              v-model="scope.row.param"
              autocomplete="off"
              placeholder="请输入参数名称"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="param" label="必选">
          <template slot-scope="scope">
            <el-select
              :style="style"
              :size="size"
              v-model="scope.row.isMandatory"
              placeholder="请选择是否必选"
            >
              <el-option label="必选" value="true"></el-option>
              <el-option label="非必选" value="false"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="param" label="类型范围">
          <template slot-scope="scope">
            <el-input
              :style="style"
              :size="size"
              v-model="scope.row.type"
              autocomplete="off"
              placeholder="请输入类型及范围"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="param" label="说明">
          <template slot-scope="scope">
            <el-input
              :style="style"
              :size="size"
              v-model="scope.row.explan"
              autocomplete="off"
              placeholder="请输入字段说明"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <el-button-group>
            <el-tooltip effect="dark" content="添加" placement="bottom-start">
              <el-button
                :size="size"
                @click="handleClickAdd('request_param_list')"
                type="primary"
              >+
              </el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除" placement="bottom-start">
              <el-button
                @click="handleClickRemoveItem('request_param_list',scope.row)"
                type="danger"
                :size="size"
              >-
              </el-button>
            </el-tooltip>
          </el-button-group>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-table :data="form.return_fields_list" id="return_fields_list" style="width: 100%">
        <el-table-column prop="field" label="返回字段">
          <template slot-scope="scope">
            <el-input
              v-if="scope.row.field||scope.row.field===''"
              :style="style"
              :size="size"
              v-model="scope.row.field"
              autocomplete="off"
              placeholder="返回字段名称"
            ></el-input>
            <el-input
              v-else
              style="width:100%;padding-left:1.5em;"
              :size="size"
              v-model="scope.row.fields"
              autocomplete="off"
              placeholder="返回字段名称"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="字段类型">
          <template slot-scope="scope">
            <el-input
              :style="style"
              :size="size"
              v-model="scope.row.type"
              autocomplete="off"
              placeholder="请输入返回字段类型"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="explan" label="字段说明">
          <template slot-scope="scope">
            <el-input
              :style="style"
              :size="size"
              v-model="scope.row.explan"
              autocomplete="off"
              placeholder="请输入返回字段说明"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="remarks" label="备注">
          <template slot-scope="scope">
            <el-input
              :style="style"
              :size="size"
              v-model="scope.row.remarks"
              autocomplete="off"
              placeholder="请输入备注"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button-group>
              <el-tooltip effect="dark" content="添加" placement="bottom-start">
                <el-button
                  :size="size"
                  @click="handleClickAdd('return_fields_list','append',scope.row)"
                  type="primary"
                >+
                </el-button>
              </el-tooltip>
              <el-tooltip
                v-if="scope.row.field||scope.row.field===''"
                effect="dark"
                content="添加子项"
                placement="bottom-start"
              >
                <el-button
                  :size="size"
                  @click="handleClickAdd('return_fields_list','child',scope.row)"
                  type="primary"
                >+
                </el-button>
              </el-tooltip>
              <el-tooltip effect="dark" content="删除" placement="bottom-start">
                <el-button
                  @click="handleClickRemoveItem('return_fields_list',scope.row)"
                  type="danger"
                  :size="size"
                >-
                </el-button>
              </el-tooltip>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item label="返回结果">
      <el-input
        type="textarea"
        v-model="form.return_result"
        :autosize="{ minRows: 4, maxRows: 6}"
        placeholder="请输入返回结果"
        :style="style">
      </el-input>
    </el-form-item>
    <el-form-item label="图标路径">
      <el-input
        :style="style"
        :size="size"
        v-model="form.api_icon_path"
        autocomplete="off"
        placeholder="请输入图标路径"
      ></el-input>
    </el-form-item>
    <el-form-item style="text-align: right">
      <el-button
        :loading="addLoading"
        :size="size"
        type="primary"
        @click="handleSubmit('form')"
      >{{title}}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import {
    managerResourceGetApiListTypeAll,
    managerResourceUpdateApiList,
    managerResourceAddApiList,
    managerResourceGetApiList
  } from "../../../../api/manager";
  import {logout} from "../../../../tools/utils";
  import {mapGetters} from 'vuex'

  export default {
    name: "insert",
    props: {
      // 标题
      title: {
        type: String,
        required: true,
      },
      // 当前行
      row: {},
      // 数据类型
      sort:{
        type:Number,
        required:true,
        default:1,//2.第三方
      },
      // true:添加 false:修改
      add:{
        type:Boolean,
        required:true,
      }
    },
    data() {
      return {
        addLoading: false,
        size: this.$store.getters.getAppSize,
        apiTypeList: [], //用来列表集合
        style: "width:100%",
        form: {
          api_type: "", //接口类型
          api_name: "", //接口名称
          api_type_name: "", //接口类型名称
          api_illustrate: "", //接口说明
          url: "", //接口地址
          request_mode: "", //请求方式
          type: "", //接口类型
          url_example: "", //完整URL示例
          auth_method: "", //授权认证方式
          request_param: "", //请求字段
          api_return: "", //返回字段
          //动态请求字段说明
          request_param_list: [
            {
              param: "",
              isMandatory: "",
              type: "",
              explan: ""
            }
          ], //动态返回字段说明
          return_fields_list: [
            {
              field: "",
              type: "",
              explan: "",
              remarks: "",
              child: []
            }
          ],
          return_result: "",
          api_icon_path: "",
          sort: '',//分类 2.第三方  可选
          owner_id: '',//持有人id    可选
          owner_name: '',//持有人姓名  可选
          id: "", //接口资源编号
          add: true //默认为添加操作
        },
        rules: {
          id: [
            {
              required: true,
              message: "请输入资源编号",
              trigger: ["blur", "change"]
            }
          ],
          api_type: [
            {
              required: true,
              message: "请输入接口类型",
              trigger: ["blur", "change"]
            }
          ],
          api_name: [
            {
              required: true,
              message: "请输入接口名称",
              trigger: ["blur", "change"]
            }
          ],
          api_illustrate: [
            {
              required: true,
              message: "请输入接口说明",
              trigger: ["blur", "change"]
            }
          ], //接口说明
          url: [
            {
              required: true,
              message: "请输入接口地址",
              trigger: ["blur", "change"]
            }
          ], //接口地址
          request_mode: [
            {
              required: true,
              message: "请输入选择请求方式",
              trigger: ["blur", "change"]
            }
          ], //请求方式
          type: [
            {
              required: true,
              message: "请选择接口类型",
              trigger: ["blur", "change"]
            }
          ]
        }
      }
    },
    mounted() {
      this.initData(); // TODO 初始化数据
    },
    methods: {
      logout,
      ...mapGetters(['getUsersInfo']),
      initData() {
        //接口类型
        managerResourceGetApiListTypeAll().then(res => {
          if (res && res.code === 200) {
            this.apiTypeList = res.data || [];
            if(this.row.id){
              managerResourceGetApiList({
                id:this.row.id
              }).then((result)=>{
                if(result&&result.code===200){
                  let row=result.data;
                  for (let item in row) {
                    this.form[item] = row[item];
                  }
                  if (this.form['api_type']) {
                    this.form['api_type'] = parseInt(this.form['api_type']);
                  }
                  if (this.form['request_param']) {
                    this.form.request_param_list = this.backGenerateRequestParamList(this.form.request_param);
                  }
                  if (this.form['api_return']) {
                    this.form.return_fields_list = this.backGenerateApiReturn(this.form.api_return);
                  }
                }
              });
            }else{

            }
          } else {
            this.apiTypeList = [];
          }
        });
      },
      // TODO 回显请求参数
      backGenerateRequestParamList(param) {
        let requestParamList = [
          {
            param: "",
            isMandatory: "",
            type: "",
            explan: ""
          }
        ];
        if (param) {
          requestParamList = [];
          let table = document.createElement("table");
          table.innerHTML = param;
          let trs = table.querySelectorAll("tr");
          trs.forEach(item => {
            let tds = item.querySelectorAll("td");
            requestParamList.push({
              param: tds[0].innerText,
              isMandatory: tds[1].innerText,
              type: tds[2].innerText,
              explan: tds[3].innerText
            });
          });
        }
        return requestParamList;
      },

      // TODO 回显返回参数
      backGenerateApiReturn(param) {
        let apiReturnArr = [
          {
            field: "",
            type: "",
            explan: "",
            remarks: ""
          }
        ];
        if (param) {
          let table = document.createElement("table");
          table.innerHTML = param;
          apiReturnArr = [];
          let trs = table.querySelectorAll("tr");
          trs.forEach(item => {
            let tds = item.querySelectorAll("td");
            let obj = {
              field: tds[0].innerHTML,
              type: tds[1].innerHTML,
              explan: tds[2].innerHTML,
              remarks: tds[3].innerHTML
            };
            if (
              tds[0] &&
              tds[0].style &&
              tds[0].style.textIndent &&
              parseInt(tds[0].style.textIndent) === 45
            ) {
              obj.fields = tds[0].innerHTML;
              obj.field = "";
              obj.child = [];
            }
            apiReturnArr.push(obj);
          });
        }
        return apiReturnArr;
      },
      // TODO 请求参数列表添加
      //listname:列表名称
      //type 追加方式
      //当前行
      handleClickAdd(listname, type, row) {
        if (listname === "request_param_list") {
          this.form[listname].push({
            param: "",
            isMandatory: "",
            type: "",
            explan: ""
          });
        } else {
          if (type === "append") {
            this.form[listname].push({
              field: "",
              type: "",
              explan: "",
              remarks: "",
              child: []
            });
          } else {
            this.form[listname].splice(this.form[listname].indexOf(row) + 1, 0, {
              fields: "",
              type: "",
              explan: "",
              remarks: ""
            });
          }
        }
      },
      // TODO 点击删除则从数组中移出此项
      handleClickRemoveItem(listname, row) {
        if (this.form[listname].length === 1) {
          this.$message.error('最少留一项');
          return false;
        }
        this.form[listname].splice(this.form[listname].indexOf(row));
      },
      // TODO 生成返回说明
      generateApiReturn() {
        let list = this.form.return_fields_list;
        let _html = "";
        for (let i = 0; i < list.length; i++) {
          let field = list[i].field || "";
          let fields = list[i].fields || "";
          let type = list[i].type || "-";
          let explan = list[i].explan || "-";
          let remarks = list[i].remarks || "-";
          if (field || fields) {
            if (field) {
              _html +="<tr><td style='text-align: left'>"+field+"</td><td>"+type+"</td><td>"+explan+"</td><td>"+remarks+"</td></tr>";
            } else {
              _html+="<tr><td style='text-align: left;text-indent: 45px;'>"+field+"</td><td>"+type+"</td><td>"+explan+"</td><td>"+remarks+"</td></tr>"
            }
          }
        }
        return _html;
      },
      // TODO 生成请求参数
      generateRequestParams() {
        let list = this.form.request_param_list;
        let _html = "";
        for (let i = 0; i < list.length; i++) {
          let explan = list[i].explan || "";
          let param = list[i].param || "";
          let type = list[i].type || "";
          let isMandatory = list[i].isMandatory || "";
          if (explan || param || type) {
            _html += "<tr><td>"+param+"</td><td>"+isMandatory+"</td><td>"+type+"</td><td>"+explan+"</td></tr>";
          }
        }
        return _html;
      },

      // TODO 提交表单
      handleSubmit(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.form.api_return = this.generateApiReturn();
            this.form.request_param = this.generateRequestParams();
            // sort=2属于第三方 需要添加用户名和id
            if(this.sort===2){
              let info=this.getUsersInfo();
              if(!info.id){
                this.$message.error('用户信息获取失败，请重新登录');
                this.logout();
                return false;
              }
              this.form.owner_id=info.id;
              this.form.owner_name=info.username;
            }

            if (!this.add) {
              this.addLoading = true;
              // TODO 修改
              managerResourceUpdateApiList({
                ...this.form,
                sort:this.sort
              }).then(res => {
                this.addLoading = false;
                if (res && res.code === 200) {
                  this.$message.success("修改成功");
                  this.$emit('close');
                } else {
                  this.$message.error(res.message);
                }
              });
            } else {
              this.addLoading = true;
              // TODO 添加
              managerResourceAddApiList({
                ...this.form,
                sort:this.sort
              }).then(res => {
                this.addLoading = false;
                if (res && res.code === 200) {
                  this.$message.success("添加成功");
                  this.$emit('close');
                } else {
                  this.$message.error(res.message);
                }
              });
            }
          }
        });
      },
    }
  }
</script>

<style scoped lang="scss">

</style>
