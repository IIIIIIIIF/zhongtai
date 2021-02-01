<template>
  <div class="testTools">
    <h3 class="title">检索推荐</h3>
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
                placeholder="请输入索引编号"
                v-model="form.indexName"
                autocomplete="off"></el-input>
            </td>
            <td></td>
            <td>query</td>
            <td>string</td>
          </tr>
          <tr>
            <td>type</td>
            <td>
              <el-select
                style="width:100%"
                v-model="form.type">
                <el-option label="专家推荐" :value="1"></el-option>
                <el-option label="机构推荐" :value="2"></el-option>
                <el-option label="专家+机构" :value="3"></el-option>
              </el-select>
            </td>
            <td></td>
            <td>query</td>
            <td>string</td>
          </tr>
          <tr>
            <td>text</td>
            <td>
              <el-input
                type="textarea"
                v-model="form.text"
                :autosize="{ minRows: 5, maxRows: 6}"
                placeholder="请输入文章内容"
                :style="{width:'100%'}">
              </el-input>
            </td>
            <td></td>
            <td>query</td>
            <td>string</td>
          </tr>
          <tr>
            <td>docSize</td>
            <td>
              <el-input
                :size="size"
                v-model="form.docSize"
                autocomplete="off"></el-input>
            </td>
            <td>相似文章数量</td>
            <td>query</td>
            <td>Integer</td>
          </tr>
          <tr>
            <td>recommendAuidSize</td>
            <td>
              <el-input
                :size="size"
                v-model="form.recommendAuidSize"
                autocomplete="off"></el-input>
            </td>
            <td>推荐专家数量</td>
            <td>query</td>
            <td>Integer</td>
          </tr>
          <tr>
            <td>recommendOrgSize</td>
            <td>
              <el-input
                :size="size"
                v-model="form.recommendOrgSize"
                autocomplete="off"></el-input>
            </td>
            <td>推荐机构数量</td>
            <td>query</td>
            <td>Integer</td>
          </tr>
          <tr>
            <td>unlikeTexts</td>
            <td>
              <el-input
                :size="size"
                v-model="form.unlikeTexts"
                placeholder="排除文本"
                autocomplete="off"></el-input>
            </td>
            <td>排除文本</td>
            <td>query</td>
            <td>String</td>
          </tr>
          <tr>
            <td>max_query_terms</td>
            <td>
              <el-input
                :size="size"
                placeholder="最大查询次数，增加此值提升精准度并降低性能（默认值25）"
                v-model="form.max_query_terms"
                autocomplete="off"></el-input>
            </td>
            <td>最大查询次数</td>
            <td>query</td>
            <td>Integer</td>
          </tr>
          <tr>
            <td>min_term_freq</td>
            <td>
              <el-input
                :size="size"
                v-model="form.min_term_freq"
                placeholder="最小词频，小于该值将被忽略（默认值1）"
                autocomplete="off"></el-input>
            </td>
            <td>最小词频</td>
            <td>query</td>
            <td>Integer</td>
          </tr>
          <tr>
            <td>min_doc_freq</td>
            <td>
              <el-input
                :size="size"
                v-model="form.min_doc_freq"
                placeholder="最小文档频率，小于该值将被忽略（默认值1）"
                autocomplete="off"></el-input>
            </td>
            <td>最小文档频率</td>
            <td>query</td>
            <td>Integer</td>
          </tr>
          <tr>
            <td>max_doc_freq</td>
            <td>
              <el-input
                :size="size"
                v-model="form.max_doc_freq"
                placeholder="最大文档频率，大于该值将被忽略（默认值2的31次方-1）"
                autocomplete="off"></el-input>
            </td>
            <td>最大文档频率</td>
            <td>query</td>
            <td>Integer</td>
          </tr>
          <tr>
            <td>min_word_length</td>
            <td>
              <el-input
                :size="size"
                v-model="form.min_word_length"
                placeholder="最小词长度，小于该值将被忽略（默认值0）"
                autocomplete="off"></el-input>
            </td>
            <td>最小词长度</td>
            <td>query</td>
            <td>Integer</td>
          </tr>
          <tr>
            <td>max_word_length</td>
            <td>
              <el-input
                :size="size"
                v-model="form.max_word_length"
                placeholder="最大词长度，大于该值将被忽略（默认值0）"
                autocomplete="off"></el-input>
            </td>
            <td>最大词长度</td>
            <td>query</td>
            <td>Integer</td>
          </tr>
          <tr>
            <td>stop_words</td>
            <td>
              <el-input
                :size="size"
                v-model="form.stop_words"
                placeholder="停词，以英文逗号分隔"
                autocomplete="off"></el-input>
            </td>
            <td>停词</td>
            <td>query</td>
            <td>String</td>
          </tr>
          <tr>
            <td>minimum_should_match</td>
            <td>
              <el-input :size="size"
                        v-model="form.minimum_should_match"
                        placeholder="最小匹配度，默认值30%"
                        autocomplete="off">
                <template slot="append">%</template>
              </el-input>
            </td>
            <td>最小匹配度</td>
            <td>query</td>
            <td>Integer</td>
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
        <div class="result">
          <h3 class="title">文章列表</h3>
          <Article :list="article.list" :options="article.options"/>
        </div>
        <div class="col clear">
          <div class="request expert">
            <h3 class="title">推荐专家</h3>
            <Expert :list="expert.list" :options="expert.options"/>
          </div>
          <div class="request org">
            <h3 class="title">推荐机构</h3>
            <Org :list="org.list" :options="org.options"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {apiSearchMoreLikeSearch} from "../../api/manager";
  import {Article,Expert,Org} from "./components";
  // TODO 测试工具
  export default {
    name: "index",
    components:{
      Article,Expert,Org
    },
    data() {
      return {
        addLoading: false,
        title: "try it out!",
        size: this.$store.getters.getAppSize,
        style: "width:100%",

        expert:{
          list:[],
          options:{
            loading:false,
          }
        },
        article:{
          list:[],
          options:{
            loading:false,
          }
        },
        org:{
          list:[],
          options:{
            loading:false,
          }
        },


        form: {
          // Authorization:'',
          // indexName: '10006',
          indexName: '10001',
          type: 2, //1.找专家 2、找机构 3、同时找专家和机构
          text:"在低燃气压力条件下(燃气压力低至500Pa)可实现稳定燃烧、正常点火、燃烧稳定(不出现离焰、回火、爆燃等)，烟气不超标。在外界风压变化时(-200Pa到500Pa) 可实现稳定燃烧、正常点火、燃烧稳定(不出现离焰、回火、爆燃等)，烟气不超标。",
          docSize:2,//最相似文章数量
          recommendAuidSize:20,//推荐专家数量
          recommendOrgSize:10,//推荐机构数量
          unlikeTexts:'',//排除文本
          max_query_terms:'',//最大查询词数
          min_doc_freq:'',//最小词频，低于该值将被忽略
          max_doc_freq:'',//最大词频，高于该值将被忽略
          min_word_length:'',//最小词长度，低于该值将被忽略
          max_word_length:'',//最大词长度，高于该值将被忽略
          stop_words:'',//停词，逗号分隔
          minimum_should_match:'30',//最小匹配度，默认30%
        }
      }
    },
    mounted() {
      // if (this.$route.query.indexName) {
      //   this.form.indexName = this.$route.query.indexName;
      //   this.handleSubmit();
      // }
    },
    methods: {
      handleSubmit() {
        this.expert.options.loading=true;
        this.article.options.loading=true;
        this.org.options.loading=true;
        if(!this.form.indexName){
          this.$message.error('请输入索引编号');
        }
        apiSearchMoreLikeSearch({
          ...this.form,
          // min_doc_freq:this.form.min_doc_freq?this.form.min_doc_freq:0,
          // max_doc_freq:this.form.max_doc_freq?this.form.max_doc_freq:0,
          // min_term_freq:this.form.min_term_freq?this.form.min_term_freq:0,
          // max_query_terms:this.form.max_query_terms?this.form.max_query_terms:0,
          // min_word_length:this.form.min_word_length?this.form.min_word_length:0,
          // max_word_length:this.form.max_word_length?this.form.max_word_length:0,
          minimum_should_match: this.form.minimum_should_match.indexOf("%")!==-1?this.form.minimum_should_match:this.form.minimum_should_match+'%'
        }).then(res=>{
          this.expert.options.loading=false;
          this.article.options.loading=false;
          this.org.options.loading=false;
          if(res&&res.code===200&&res.data){
            if(res.data.au&&res.data.au.expertsRecommend&&res.data.au.expertsRecommend.length>0){
              this.expert.list=res.data.au.expertsRecommend||[];
            }else{
              this.expert.list=[];
            }
            if(res.data.dic&&res.data.dic.sources&&res.data.dic.sources.length>0){
              this.article.list=res.data.dic.sources||[];
            }else{
              this.article.list=[];
            }
            if(res.data.org&&res.data.org.orgRecommend&&res.data.org.orgRecommend.length>0){
              let arr=[];
              let org=res.data.org.orgRecommend||[];
              org.forEach(item=>{
                if(item.child&&item.child.length>0){
                  item.child.forEach(jtem=>{
                    if(jtem.org){
                      arr.push({org:item.org, two:jtem.org, score:jtem.score})
                    }
                  })
                }else{
                  if(item.org){
                    arr.push({org:item.org, two:'', score:item.score})
                  }
                }
              });
              this.org.list=arr||[];
            }else{
              this.org.list=[];
            }
          }else{

          }
        }).catch(e=>{
          this.$message.error('检索失败，没有当前索引');
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

    &>h3.title {
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
            width: 12%;
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

      .requestRight {
        box-sizing: border-box;
        margin: 20px 0;
        padding:0 0 20px;
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
        .col{
          width: 100%;
          margin-top: 30px;
          .org{
            float: right;
          }
        }
      }
    }
  }
</style>
