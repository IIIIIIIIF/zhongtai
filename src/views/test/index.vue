<template>
  <div class="testTools">
    <h3 class="title">测试工具</h3>
    <div class="test-content">
      <el-form class="testForm" ref="form" :model="form" :size="size">
        <table :cellpadding="0" :cellspacing="0">
          <tr>
            <th>Parameter</th>
            <th>Value</th>
            <th>Description</th>
            <th>Parameter Type</th>
            <th>Data Type</th>
          </tr>
          <tr>
            <td>indexName</td>
            <td>
              <el-input
                :size="size"
                v-model="form.indexName"
                autocomplete="off"></el-input>
            </td>
            <td></td>
            <td>query</td>
            <td>string</td>
          </tr>
          <tr>
            <td>queryString</td>
            <td>
              <el-input
                :size="size"
                v-model="form.queryString"
                autocomplete="off"></el-input>
            </td>
            <td></td>
            <td>query</td>
            <td>string</td>
          </tr>
          <tr>
            <td>aggFields</td>
            <td>
              <el-input
                :size="size"
                v-model="form.aggFields"
                autocomplete="off"></el-input>
            </td>
            <td></td>
            <td>query</td>
            <td>string</td>
          </tr>
          <tr>
            <td>from</td>
            <td>
              <el-input
                :size="size"
                type="number"
                v-model="form.from"
                autocomplete="off"></el-input>
            </td>
            <td></td>
            <td>query</td>
            <td>integer</td>
          </tr>
          <tr>
            <td>size</td>
            <td>
              <el-input
                :size="size"
                type="number"
                v-model="form.size"
                autocomplete="off"></el-input>
            </td>
            <td></td>
            <td>query</td>
            <td>integer</td>
          </tr>
          <tr>
            <td>
              <el-button
                :loading="addLoading"
                :size="size"
                type="primary"
                @click="handleSubmit('form')">{{title}}
              </el-button>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </el-form>
      <div class="requestRight">
        <div class="request">
          <h3 class="title">请求</h3>
          <pre class="code">{{request}}</pre>
        </div>
        <div class="result">
          <h3 class="title">返回内容</h3>
          <pre class="code">{{result}}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {managerApiSearchPreciseSearch} from "../../api/manager";
  // TODO 测试工具
  export default {
    name: "index",
    data() {
      return {
        addLoading: false,
        title: "try it out!",
        size: this.$store.getters.getAppSize,
        style: "width:100%",
        result: {},
        request: '',
        form: {
          // Authorization:'',
          indexName: '10001',
          queryString: '',
          from: 0,
          size: 1,
          aggFields: '',
        }
      }
    },
    mounted() {
      if (this.$route.query.indexName) {
        this.form.indexName = this.$route.query.indexName;
        this.handleSubmit();
      }
    },
    methods: {
      handleSubmit(formName) {
        let obj = {};
        for (let item in this.form) {
          if (this.form[item]) {
            obj[item] = this.form[item]+""
          } else if (this.form[item] === 0) {
            obj[item] = "0";
          }
        }
        managerApiSearchPreciseSearch(obj).then((res) => {
          this.result = res;
          try {
            if (this.result && this.result.data) {
              this.result.data = JSON.parse(this.result.data)
            }
          } catch (e) {

          }
//格式化参数
          let params = '';
          for (let item in this.form) {
            if (this.form[item]) {
              params += `${item}=${this.form[item]}&`;
            }
          }
          this.request =
            `请求URL：http://apit.kefuju.cn/cdp/api/search/preciseSearch
参数：${params ? params.slice(0, params.length - 1) : '无'}
请求方式：GET
`;
        });
      }
    }
  }
</script>
<style lang="scss" scoped>
  .testTools {
    width: 1200px;
    margin: 20px auto;
    background-color: #e7f0f7;
    border: 1px solid #c3d9ec;

    & > h3.title {
      color: #0f6ab4;
      font-size: 0.9em;
      border-bottom: 1px solid #c3d9ec;
      padding: 10px;
    }

    .test-content {
      padding: 10px;

      .testForm {
        width: 100%;
      }

      table {
        width: 100%;

        tr {

          th, td {
            border-bottom: 1px solid #cccccc;
          }

          th {
            padding-bottom: 10px;
            padding-left: 0;
            padding-right: 0;
          }


          td {
            padding-left: 0;
            padding-right: 0;
            box-sizing: border-box;
            min-height: 50px;
            padding-top: 10px;
            padding-bottom: 10px;
          }

          th:nth-of-type(1), td:nth-of-type(1) {
            width: 8%;
          }

          th:nth-of-type(2), td:nth-of-type(2) {
            width: 46%;
          }

          th:nth-of-type(3), td:nth-of-type(3) {
            width: 24%;
          }

          th:nth-of-type(4), td:nth-of-type(4) {
            width: 10%;
          }

          th:nth-of-type(5), td:nth-of-type(5) {
            width: 10%;
          }
        }

      }

      .requestRight {
        box-sizing: border-box;
        margin: 20px 0;
        padding: 0 0 20px;
        border-radius: 10px;


        .request {
          margin-bottom: 20px;
        }

        .request, .result {
          h3 {
            color: #0f6ab4;
            font-size: 0.9em;
            padding-bottom: 10px;
          }

          .code {
            box-sizing: border-box;
            border-radius: 10px;
            min-height: 100px;
            word-break: break-all;
            word-wrap: break-word;
            white-space: pre-wrap;
            font-family: "Anonymous Pro", "Menlo", "Consolas", "Bitstream Vera Sans Mono", "Courier New", monospace;
            padding: 10px;
            font-size: 0.9em;
            max-height: 400px;
            overflow-y: auto;
            background-color: #fcf6db;
            border: 1px solid #e5e0c6;

          }
        }
      }
    }
  }
</style>
