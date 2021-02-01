<template>
  <div class="testTools">
    <h3 class="title">向量检索</h3>
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
            <td>type</td>
            <td>
              <el-select
                style="width:100%"
                v-model="type"
                @change="handleChangeSelect">
                <el-option label="找文章" :value="1"></el-option>
                <el-option label="找专家" :value="2"></el-option>
              </el-select>
            </td>
            <td>类型</td>
            <td>query</td>
            <td>String</td>
          </tr>
          <tr>
            <td>indexName</td>
            <td>
              <el-input :disabled="disabledIndexName" :size="size" placeholder="请输入索引编号" v-model="form.indexName"
                        autocomplete="off"></el-input>
            </td>
            <td>索引编号,逗号分隔</td>
            <td>query</td>
            <td>string</td>
          </tr>
          <tr>
            <td>queryVectorText</td>
            <td>
              <el-input type="textarea" v-model="form.queryVectorText" :autosize="{ minRows: 5, maxRows: 6}"
                        placeholder="请输入文本内容" :style="{width:'100%'}">
              </el-input>
            </td>
            <td>文本内容</td>
            <td>query</td>
            <td>string</td>
          </tr>
          <tr>
            <td>queryVector</td>
            <td>
              <el-input :size="size" v-model="form.queryVector" autocomplete="off"></el-input>
            </td>
            <td>向量内容</td>
            <td>query</td>
            <td>String</td>
          </tr>
          <tr>
            <td>fieldVector</td>
            <td>
              <el-input :size="size" v-model="form.fieldVector" autocomplete="off"></el-input>
            </td>
            <td>向量字段</td>
            <td>query</td>
            <td>String</td>
          </tr>
          <tr>
            <td>similarity</td>
            <td>
              <el-input :size="size" max="0.1" min="0.0" v-model="form.similarity" autocomplete="off"></el-input>
            </td>
            <td>相似度，0.0-0.1之间</td>
            <td>query</td>
            <td>String</td>
          </tr>
          <tr>
            <td>
              <el-button :loading="addLoading" :size="size" type="primary" @click="handleSubmit('form')">{{title}}
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
        <div class="result">
          <h3 class="title">返回数据</h3>
          <!--
ID：
作者名称：CNAME
作者机构：AORG
作者信息：INTRO
研究方向：DIRECTION
合作人物：COOPERATE  包含合作信息
-->
          <template v-if="type===1">
            <article-item v-for="(item,index) in tableData.data" :data="item" :key="index"/>
          </template>
          <template v-else>
            <el-collapse v-model="activeNames">
              <el-collapse-item v-for="(item,index) in tableData.data" :name="index+1" :key="index">
                <template slot="title">
                  <div style="padding-left: 30px;">{{item.CNAME||''}} {{item.AORG||''}}</div>
                </template>
                <div style="padding-left: 40px;padding-right: 30px;">
                  <template v-if="item.INTRO">
                    <div style="font-weight: bold">简介：</div>
                    <div style="padding-left: 10px;" v-html="standardString(item.INTRO||'')"></div>
                  </template>
                  <template v-if="item.DIRECTION">
                    <div style="font-weight: bold">描述：</div>
                    <div style="padding-left: 10px;">{{item.DIRECTION||''}}</div>
                  </template>
                  <template v-if="item.COOPERATE">
                    <div style="font-weight: bold">合作信息：</div>
                    <el-table
                      :data="item.COOPERATE"
                      border
                      style="width: 100%">
                      <el-table-column
                        prop="NAME"
                        label="专家姓名">
                      </el-table-column>
                      <el-table-column
                        prop="NUM"
                        label="合作次数">
                      </el-table-column>
                      <el-table-column
                        prop="HUIYI"
                        label="会议">
                      </el-table-column>
                      <el-table-column
                        prop="QIKAN"
                        label="期刊">
                      </el-table-column>
                      <el-table-column
                        prop="BIAOZHUN"
                        label="标准">
                      </el-table-column>
                      <el-table-column
                        prop="XIANGMU"
                        label="项目">
                      </el-table-column>
                    </el-table>
                  </template>
                </div>
              </el-collapse-item>
            </el-collapse>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import articleItem from './components/articleItem'

  import {apiSearchMoreLikeSearch, apiSearchVectorSearch} from "../../api/manager";
  // TODO 测试工具
  export default {
    name: "index",
    components: {
      articleItem,
    },
    data() {
      return {
        activeNames: ['1'],
        addLoading: false,
        title: "try it out!",
        size: this.$store.getters.getAppSize,
        style: "width:100%",
        tableData: {
          loading: false,
          data: []
        },
        type: 1,
        disabledIndexName: false,
        form: {
          indexName: '40001',
          queryVectorText: '互联网的高速发展使得新闻网页成为了网民了解国内外大事的首要选择,然而中国互联网存在着大量重复新闻网页的现象,' +
            '对于提高用户体验以及新闻情报的分析造成了一定的困难.' +
            '本文以SpotSigs算法为基础提出了一种中文新闻网页相似性检测方法,在先行词选取阶段使用基础先行词与优化先行词相结合的选择策略,' +
            '从而降低了网页中的导航栏、广告等噪音对中文新闻网页相似性检测的影响.以实际的中文新闻网页为实验数据集,通过准确率、' +
            '召回率两项指标验证了基于SpotSigs算法的中文新闻网页相似性检测方法的有效性和可行性,特别在相似度阈值较低的情况下具有较好的性能.',
          fieldVector: 'VECDATA',
          queryVector: '',
          similarity: '0.1',
        },
      }
    },
    mounted() {
      if (this.$route.query.indexName) {
        this.form.indexName = this.$route.query.indexName;
        this.handleSubmit();
      }
      ////http://api.kefuju.cn/cdp/api/search/vectorSearch?indexName=40004&queryVectorText=%E5%93%87%E5%93%88%E5%93%88&fieldVector=VECDATA&similarity=0.5
      // apiSearchVectorSearch({
      //   indexName:'40004',
      //   queryVectorText:('检索结果'),
      //   fieldVector:'VECDATA',
      //   similarity:'0.1'
      // }).then(res=>{
      //   if(res&&res.hits&&res.hits.length>0){
      //     this.tableData.data=res.hits||[];
      //   }
      // })
      this.handleChangeSelect(1)
    },
    methods: {
      handleChangeSelect(val) {
        if (val === 1) {
          this.form.indexName = "40001";
          this.form.queryVectorText='在低燃气压力条件下(燃气压力低至500Pa)可实现稳定燃烧、正常点火、' +
            '燃烧稳定(不出现离焰、回火、爆燃等)，烟气不超标。' +
            '在外界风压变化时(-200Pa到500Pa) 可实现稳定燃烧、正常点火、燃烧稳定(不出现离焰、回火、爆燃等)，烟气不超标。';
          this.disabledIndexName = false;
        } else {
          this.form.indexName = '41001';
          this.disabledIndexName = true;
          this.form.queryVectorText='互联网的高速发展使得新闻网页成为了网民了解国内外大事的首要选择,然而中国互联网存在着大量重复新闻网页的现象,' +
            '对于提高用户体验以及新闻情报的分析造成了一定的困难.' +
            '本文以SpotSigs算法为基础提出了一种中文新闻网页相似性检测方法,在先行词选取阶段使用基础先行词与优化先行词相结合的选择策略,' +
            '从而降低了网页中的导航栏、广告等噪音对中文新闻网页相似性检测的影响.以实际的中文新闻网页为实验数据集,通过准确率、' +
            '召回率两项指标验证了基于SpotSigs算法的中文新闻网页相似性检测方法的有效性和可行性,特别在相似度阈值较低的情况下具有较好的性能.';
        }
        this.tableData.data = [];
      },
      handleSubmit() {
        if (!this.form.indexName) {
          this.$message.error('请输入索引编号');
          return false;
        }
        if (!this.form.fieldVector) {
          this.$message.error('请输入向量字段');
          return false;
        }
        this.addLoading = true;
        apiSearchVectorSearch({
          ...this.form
        }).then(res => {
          if (res && res.hits && res.hits.length > 0) {
            this.tableData.data = (res.hits || [])
          } else {
            this.tableData.data = [{NAME: '暂无数据'}];
          }
        }).catch(e => {
          this.$message.error('检索失败，没有当前索引');
        }).finally(e => {
          this.addLoading = false;
        });
      },
      standardString(str){
        if(str.indexOf("^A")!==-1){
          str = str.replace(/[\^]A/g, "");
        }
        if(str.indexOf("^B")!==-1){
          str = str.replace(/[\^]B/g, " ");
        }
        if(str.indexOf("^C")!==-1){
          str = str.replace(/[\^]C/g, " ");
        }
        if(str.indexOf("^D")!==-1){
          str = str.replace(/[\^]D/g, " ");
        }
        if(str.indexOf("^E")!==-1){
          str = str.replace(/[\^]E/g, " ");
        }
        if(str.indexOf("%")!==-1){
          str = str.replace(/[%]/g, ";<br/>");
        }
        return str;
      }
    },
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
              width: 10%;
            }

            th:nth-of-type(2), td:nth-of-type(2) {
              width: 46%;
            }

            th:nth-of-type(3), td:nth-of-type(3) {
              width: 24%;
              text-align: center;
            }


            th:nth-of-type(4), td:nth-of-type(4) {
              width: 10%;
            }

            th:nth-of-type(5), td:nth-of-type(5) {
              width: 10%;
            }
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
          display: inline-block;
          width: 48%;
          vertical-align: top;
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

        .col {
          width: 100%;
          margin-top: 30px;

          .org {
            float: right;
          }
        }
      }
    }
  }
</style>
