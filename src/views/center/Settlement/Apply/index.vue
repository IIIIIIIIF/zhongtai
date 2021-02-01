<template>
  <div class="apply">
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item prop="type" label="资源类型：">
        <el-select
          :style="style"
          :size="size"
          @change="handleChangeResourceType"
          v-model="form.type"
          placeholder="请选择资源类型">
          <el-option :value="1" label="公有"></el-option>
          <el-option :value="2" label="私有"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="resource_id" label="资源种类：" v-if="resourceIndexInfo.length>0">
        <el-select
          :style="style"
          :size="size"
          @change="handleChangeResourceId"
          v-model="form.resource_id"
          placeholder="请选择资源种类">
          <el-option v-for="item in resourceIndexInfo" :value="item.id" :label="item.explan" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="name" label="资源名称：">
        <el-select
          :style="style"
          :size="size"
          v-model="form.name"
          placeholder="请选择资源种类">
          <el-option v-for="item in indexTypeList" :value="item.id" :label="item.chn_name" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="forecast_size" label="资源数量：">
        <el-input
          :style="style"
          :size="size"
          placeholder="请输入预计资源数量(条)"
          type="number"
          v-model="form.forecast_size"></el-input>
      </el-form-item>
      <el-form-item prop="join_type" label="入驻方式：">
        <el-select
          :style="style"
          :size="size"
          v-model="form.join_type"
          placeholder="请选择期望入驻方式">
          <el-option :value="1" label="文件导入"></el-option>
          <el-option :value="2" label="接口导入"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="update_type" label="更新方式：">
        <el-select
          :style="style"
          :size="size"
          v-model="form.update_type"
          placeholder="请选择期望数据更新方式">
          <el-option :value="1" label="文件导入"></el-option>
          <el-option :value="2" label="接口导入"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="update_cycle" label="更新周期：">
        <el-select
          :style="style"
          :size="size"
          v-model="form.update_cycle"
          placeholder="请选择更新周期">
          <el-option :value="1" label="日更新"></el-option>
          <el-option :value="2" label="周更新"></el-option>
          <el-option :value="3" label="月更新"></el-option>
          <el-option :value="4" label="实时更新"></el-option>
          <el-option :value="5" label="自定义"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="api_service" label="接口服务：">
        <!--        <template-->
        <!--          v-for="item in api_serviceArray">-->
        <!--          <el-checkbox-->
        <!--            v-model="form.api_service"-->
        <!--            :label="item.id">-->
        <!--            {{item.explan}}-->
        <!--          </el-checkbox>-->
        <!--        </template>-->
        <el-checkbox-group v-model="form.api_service">
          <el-checkbox label="1">检索查询</el-checkbox>
          <el-checkbox label="2">检索聚合</el-checkbox>
          <el-checkbox label="3">数据修改</el-checkbox>
          <el-checkbox label="4">数据删除</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item style="text-align: right;">
        <el-button
          :size="size"
          :loading="addLoading"
          type="primary"
          @click="handleSubmit('form')">申请
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {managerResourceGetIndexInfoAll} from "../../../../api/manager";
  import {resourceSubmitDataJoinApply,resourceGetIndexTypeList} from "../../../../api/settlement";
  import {formatterDate} from "../../../../tools/utils";
  import {mapGetters} from 'vuex'
  export default {
    name: "index",
    data() {
      return {
        addLoading: false,
        size: this.$store.getters.getAppSize,
        style: "width:410px",
        resourceIndexInfo: [],
        indexTypeList:[],
        api_serviceArray: [
          {id: 1, name: "检索查询"},
          {id: 2, name: "检索聚合"},
          {id: 3, name: "数据修改"},
          {id: 4, name: "数据删除"},
        ],
        form: {
          type: "",//资源类型 1.公有 2.私有
          resource_id: "",//资源类型
          name: "",//资源名称
          status:1,//状态值  默认1   1.审批中  2.已审核  3.未通过
          resource_name: "",//资源前名称
          forecast_size: "",//预计条数
          join_type: "",//入驻类型 1.文件 2.接口
          update_type: "",//期望修改方式 1.文件 2.接口
          update_cycle: "",//更新周期 1.日更新 2.周更新 3.月更新 4.实时更新 5.自定义更新
          api_service: [],//接口服务
        },
        rules: {
          type: [
            {required: true, message: "请选择资源类型", trigger: ['blur', 'change']},
          ],
          resource_id: [
            {required: true, message: "请选择资源种类", trigger: ['blur', 'change']},
          ],
          name: [
            {required: true, message: "请选择资源名称", trigger: ['blur', 'change']},
          ],
          forecast_size: [
            {required: true, message: "请输入资源数量(条)", trigger: ['blur', 'change']},
          ],
          join_type: [
            {required: true, message: "请选择入驻方式", trigger: ['blur', 'change']},
          ],
          update_type: [
            {required: true, message: "请选择更新方式", trigger: ['blur', 'change']},
          ],
          update_cycle: [
            {required: true, message: "请选择更新周期", trigger: ['blur', 'change']},
          ],
          api_service: [
            {required: true, message: "请选择您需要的接口服务", trigger: ['blur', 'change']},
          ]
        }
      }
    },
    mounted(){
      this.initData();
    },
    methods: {
      ...mapGetters(['getUsersInfo','logout']),
      // TODO 初始化数据
      initData(){
        resourceGetIndexTypeList({
          field:'id,chn_name'
        }).then((res) => {
          if (res && res.code === 200 && res.data && res.data.length > 0) {
            this.indexTypeList=res.data||[];
          }
        });
      },
      // TODO 提交入驻申请
      handleSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let obj = {
              ...this.form
            };
            obj.apply_name=this.getUsersInfo().username;
            obj.apply_id=this.getUsersInfo().id;
            if(!obj.apply_name||!obj.apply_id){
              this.$message.error("用户信息获取失败,请重新登录");
              this.logout();
              return false;
            }
            // obj.name = obj.resource_name + obj.name;
            obj.api_service=obj.api_service.toString();
            obj.apply_time=formatterDate('yyyy-MM-dd hh:mm:ss');
            // obj.apply_time=formatterDate('yyyy-MM-dd');
            this.addLoading=true;
            resourceSubmitDataJoinApply(obj).then((res)=>{
              this.addLoading=false;
              if(res&&res.code===200){
                this.$message.success('申请成功');
                this.$emit('close')
                // this.$router.push('/settlement/mySettlement');
              }else{
                this.$message.error(res.message);
              }
            })
          }
        });
      },
      // TODO 资源类型修改事件
      handleChangeResourceType(id) {
        managerResourceGetIndexInfoAll({
          istype: id,
          field: 'id,explan,name',
        }).then((res) => {
          if (res && res.code === 200 && res.data && res.data.length > 0) {
            this.resourceIndexInfo = res.data;
          } else {
            this.resourceIndexInfo = [];
          }
        })
      },
      // TODO 资源类型修改事件
      handleChangeResourceId(id) {
        let str = '';
        // if(this.form.type===1){
        //   str+=`公有_`;
        // }else{
        //   str+='私有_';
        // }
        str += this.resourceIndexInfo[this.resourceIndexInfo.findIndex(item => item.id === id)].name + "_";
        this.form.resource_name = str;
      }
    }
  }
</script>

<style scoped>

</style>
