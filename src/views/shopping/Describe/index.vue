<template>
  <div class="container">
    <div class="info">
      <div class="list-item">
        <div class="img"><img id="api_icon_path" :src="titleInfo.api_icon_path" alt="暂无图片"></div>
        <div class="list-content">
          <p class="list-content-title">{{titleInfo.api_name}}</p>
          <p class="list-content-type"><span style="font-weight: bold;">接口类型：</span>基础接口</p>
          <p class="list-content-describe"><span style="font-weight: bold;">描述：</span>{{titleInfo.api_illustrate}}
          </p>
          <p class="list-content-api_fee_type"><span style="font-weight: bold;">套餐类型：</span>{{titleInfo.api_fee_type}}
          </p>
          <!--<p class="list-content-api_price"><span style="font-weight: bold;">接口资费：</span>暂无数据</p>-->
        </div>
        <!--<a href="">立即申请</a>-->
      </div>
    </div>
    <el-row :gutter="20">
      <el-col :span="5" class="navs" style="padding-left: 0;padding-right: 0">
        <ul id="leftNav">
          <li>
            <div>推荐接口</div>
            <ul class="child">
              <template v-for="(item,i) in leftNav">
                <li @click="locationDetails(item.api_type,item.id,item.api_name)">{{item.name}}</li>
              </template>
            </ul>
          </li>
        </ul>
      </el-col>
      <el-col :span="19" class="listp">
        <div class="rightParent">
          <ul style="padding: 0;">
            <li class="active" @click="tabInterfaceError($event,'interface')">接口信息</li>
            <li @click="tabInterfaceError($event,'errorDocument')">错误文档</li>
          </ul>
          <div class="contents">
            <div v-if="interfaceError===0" id="interfaceInfo" v-html="titleInfo.api_details"></div>
            <div v-else class="error">
              <div style="padding: 20px 0;">
                <div class="CyRyc3P9ATy-PHYxLUszQ">
                  <span class="GGymsPTQfMAt3GZ41zXg4">错误代码</span>
                  <br>
                  <table class="_2wyPrzFgCG0_A5z0zkJL-c" v-html="errorDoc"></table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import $ from 'jquery';
  import {resourceGetApilistType,resourceGetApiErrCodeAll,resourceGetApilist} from '@/api/shopping';

  export default {
    name: "Describe",
    data() {
      return {
        interfaceError: 0,//默认0为显示接口信息，错误文档：1
        query: {},//api_type,id,api_name
        titleInfo: {},//页面详细信息
        errorDoc: "暂无数据",//错误文档
        leftNav: [],
        login: false,//默认没有登录
        index: true,//是否为首页，默认为不是
        shopping: false,//默认不是数据超市
      }
    },
    mounted(){
      this.query = {
        api_type:this.$route.query.api_type,
        id:this.$route.query.id,
        api_name:this.$route.query.api_name
      };
      this.getApilist();
      this.getApiErrCodeAll();
      this.getApilistByType();
    },
    methods:{
      tabInterfaceError(event, str) {
        let el = $(event.currentTarget);//获取当前点击的元素
        if (!(el.hasClass("active"))) {
          el.addClass("active").siblings().removeClass("active");
          if (str == "interface") {
            this.interfaceError = 0;
          } else {
            this.interfaceError = 1;
          }
        }
      },
      getParam(paramName) {
        let paramValue = "", isFound = !1;
        if (location.search.indexOf("?") === 0 && location.search.indexOf("=") > 1) {
          let arrSource = unescape(location.search).substring(1, location.search.length).split("&"), i = 0;
          while (i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() === paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++
        }
        return paramValue === "" && (paramValue = null) , paramValue
      },
      locationDetails(api_type, id, api_name) {
        let that = this;
        that.query = {
          api_type, id, api_name
        };
        that.getApilist();
        that.getApiErrCodeAll();
        that.getApilistByType(id);
      },
      getApilistByType(id) {
        let that = this;
        resourceGetApilistType({
          id: id||that.query.api_type
        }).then((result)=>{
          if (result.code === 200) {
            that.leftNav = result.data;
          } else {
            that.leftNav = [];
          }
        });
      },
      getApiErrCodeAll() {
        let that = this;
        resourceGetApiErrCodeAll().then(result=>{
          if (result.code === 200) {
            let _html = '<tr style="font-weight: bold; color: rgb(109, 97, 81);"><td>代码</td><td>说明</td></tr>';
            result = result.data;
            for (let i = 0; i < result.length; i++) {
              _html+=`<tr><td>${result[i].code||'-'}</td><td>${result[i].message||'-'}</td></tr>`;
            }
            that.errorDoc = _html;
          } else {
            that.errorDoc = "暂无数据";
          }
        });
      },
      getApilist() {//获取页面详细信息
        let that = this;
        resourceGetApilist({
          id: that.query.id
        }).then((result)=>{
          if (result.code === 200) {
            result = result.data;
            if (!(result.api_name)) {
              result.api_name = "暂无数据";
            }
            if (!(result.api_illustrate)) {//描述
              result.api_illustrate = "暂无数据";
            }
            if (!(result.api_fee_type)) {
              result.api_fee_type = "包年";//套餐类型
            }
            // if (!(result.api_price)) {//接口资费-暂时在页面上没有显示
            //   result.api_price="暂无数据";
            // }
            if (!(result.api_details)) {//接口信息
              result.api_details = "暂无数据";
            }
            if (!(result.api_icon_path)) {//logo
              result.api_icon_path = "";
            } else {
              result.api_icon_path = require("@/assets/shopping/open/" + result.api_icon_path);
            }
            if (!(result.api_type)) {//接口类型
              result.api_type = "暂无数据";
            } else {
              resourceGetApilistType({
                id: result.api_type
              }).then((res)=>{
                if (res.code === 200) {
                  result.api_type = res.data.name;
                } else {
                  result.api_type = "暂无数据";
                }
              });
            }
            that.titleInfo = result;
          }
        });
      }
    }
  }
</script>

<style>
  @import "../assets/public.scss";
</style>
<style lang="scss" scoped>
  @import "../assets/public";
  .info{
    margin-bottom: 0;
  }
</style>
