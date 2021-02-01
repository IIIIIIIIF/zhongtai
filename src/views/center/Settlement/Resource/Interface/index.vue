<template>
  <div class="interfaceUpload">
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item prop="data" label="数据">
        <el-input
          type="textarea"
          v-model="form.data"
          :autosize="{ minRows: 10, maxRows: 30}"
          placeholder=""
          :style="style">
        </el-input>
      </el-form-item>
      <el-form-item>
        <div data-v-5f045eea="" id="interfaceInfo">
          <div class="_3mI9vzzfmLhiRP_ZblBh_I">
            <div class="_9O66VMLASWwXd_JY3nLjo">接口说明</div>
            <div class="CyRyc3P9ATy-PHYxLUszQ">
              <span class="GGymsPTQfMAt3GZ41zXg4">URL</span><br>
              <span class="_3sxISbd1jaVUPalXk2Yskv">{{host}}/manager/open/api/bulkIndex</span><br>
            </div>
            <div class="CyRyc3P9ATy-PHYxLUszQ"><span class="GGymsPTQfMAt3GZ41zXg4">HTTP请求方式</span><br>POST</div>
            <div class="CyRyc3P9ATy-PHYxLUszQ"><span class="GGymsPTQfMAt3GZ41zXg4">授权方式</span><br>TOKEN</div>
            <div class="CyRyc3P9ATy-PHYxLUszQ"><span class="GGymsPTQfMAt3GZ41zXg4">请求参数</span><br>
              <table class="_2wyPrzFgCG0_A5z0zkJL-c">
                <tbody>
                <tr style="font-weight: bold; color: rgb(109, 97, 81);">
                  <td>参数</td>
                  <td>必选</td>
                  <td>类型及范围</td>
                  <td style="max-width: 50%;">说明</td>
                </tr>
                <tr>
                  <td>indexTypeId</td>
                  <td>true</td>
                  <td>Number</td>
                  <td>资源编号</td>
                </tr>
                <tr>
                  <td>data</td>
                  <td>true</td>
                  <td>Array</td>
                  <td>数据。例如：[{"data":"1"}]</td>
                </tr>
                </tbody>
              </table>
              <span>注意 : 请求参数需要URLEncode。</span>
            </div>
          </div>
        </div>
      </el-form-item>
      <el-form-item style="text-align: right">
        <el-button
          :size="size"
          :loading="addLoading"
          type="primary"
          @click="handleSubmit('form')">上传
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {resourceGetIndexTypeList} from "../../../../../api/settlement";
  import {mapGetters} from 'vuex'
  import {openApiBulkIndex} from "../../../../../api/open";
  //data:{},index:""
  export default {
    name: "index",
    data() {
      const checkData = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入需要提交的数据'));
        }
        try {
          JSON.parse('{"data":' + value + '}');
          callback();
        } catch (e) {
          callback(new Error('数据格式错误，必须是标准json数组格式数据'));
        }
      };
      return {
        addLoading: false,
        size: this.$store.getters.getAppSize,
        style: "width:100%",
        resourceList: [],
        form: {
          index_id:'',
          indexTypeId: '',
          data:
            `[
{"fieldName":"","fieldName":"","fieldName":""},{"fieldName":"","fieldName":"","fieldName":""}
]`
        },
        rules: {
          data: [
            {required: true, message: "请输入需要提交的数据", trigger: ['blur', 'change']},
            {validator: checkData, trigger: ['blur', 'change']}
          ]
        },
        host: window.location.origin,
      }
    },
    props: {
      indexTypeId: {
        required: true,
      },
      'index_id': {
        required: true,
      }
    },
    mounted() {
      this.initData();
    },
    methods: {
      ...mapGetters(['getUsersInfo']),
      handleSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let info = this.getUsersInfo();
            let id = info.id;
            if (!id) {
              this.$message.error('用户信息获取失败，请重新登录');
              this.logout();
              return false;
            }

            let data = '{"data":' + this[formName].data + '}';
            this.addLoading = true;
            openApiBulkIndex({
              userId: id,
              indexTypeId: this.form.indexTypeId,
              data: JSON.parse(data).data
            }).then(res => {
              this.addLoading = false;
              if (res && res.code === 200) {
                this.$message.success('上传成功');
                this.$emit('close')
              } else {
                this.$message.error('上传失败');
              }
            });
          }
        })
      },
      initData() {
        let info = this.getUsersInfo();
        let id = info.id;
        if (!id) {
          this.$message.error('用户信息获取失败，请重新登录');
          this.logout();
          return false;
        }
        resourceGetIndexTypeList({
          field: 'id,chn_name'
        }).then((res) => {
          if (res && res.code === 200 && res.data && res.data.length > 0) {
            this.resourceList = res.data || [];
          }
        });
      },
    },
    watch: {
      indexTypeId: {
        immediate: true,//首次加载的时候执行函数
        // deep:true,//深入观察，监听数值，对象属性值的变化
        handler(val) {
          this.form.indexTypeId = val;
        }
      },
      index_id: {
        immediate: true,//首次加载的时候执行函数
        // deep:true,//深入观察，监听数值，对象属性值的变化
        handler(val) {
          this.form.index_id= val;
        }
      }
    }
  }
</script>
<style lang="scss">
  .interfaceUpload {

    .el-textarea__inner {
      white-space: normal;
      overflow-wrap: normal;
    }
  }
</style>
<style lang="scss" scoped>
  .interfaceUpload {
    ._3mI9vzzfmLhiRP_ZblBh_I {
      margin: 0;
      border-radius: 2px;
      border: 1px solid #e0e0e0;
    }

    ._9O66VMLASWwXd_JY3nLjo {
      position: relative;
      padding: 0 20px;
      font-weight: 500;
      font-size: 14px;
      line-height: 30px;
      background: #f3f3f3;
    }

    .GGymsPTQfMAt3GZ41zXg4 {
      font-size: 12px;
      font-weight: bold;
      vertical-align: baseline;
    }

    .vWVd2CUGioLTvw9RYKJL9 {
      color: #ff3b30;
    }

    ._3sxISbd1jaVUPalXk2Yskv {
      color: #0284ff;
    }

    .CyRyc3P9ATy-PHYxLUszQ {
      padding: 0 20px;
      font-size: 12px;
      color: #454545;
      line-height: 20px;
      vertical-align: baseline;
    }

    ._2wyPrzFgCG0_A5z0zkJL-c {
      width: 100%;
      border-collapse: collapse;
      text-align: center;
      padding: 8px;
      margin: auto;
      margin-top: 18px;;
      border: 1px solid #e0e0e0;
    }

    ._2wyPrzFgCG0_A5z0zkJL-c tr:nth-of-type(2n+1) {
      background: #f3f3f3;
    }

    ._2wyPrzFgCG0_A5z0zkJL-c td {
      margin: 3px 15px;
    }

    ._2C4u64Jh8chwype1z-_abw {
      border: 1px solid #ccc;
      border-radius: 4px;
      margin: 0 0 10px;
      background-color: #f3f3f3;
    }

    ._3esZo1y7zXaBhkpT45S9gN {
      width: 100%;
      height: 320px;
      display: block;
      padding: 9.5px;
      font-size: 12px;
      line-height: 1.428571423;
      color: #333;
      word-break: break-all;
      word-wrap: break-word;
      white-space: pre;
      font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
      overflow: scroll;
    }

    ._2wyPrzFgCG0_A5z0zkJL-c td:last-of-type {
      width: 50%;
    }

  }
</style>
