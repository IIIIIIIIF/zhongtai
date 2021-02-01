<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="5" class="navs" style="padding-left: 0;padding-right: 0">
        <ul id="leftNav">
          <template v-for="(item,i) in parent">
            <li :key="i">
              <div @click="pclick($event)">
                {{item.name}}
                <span class="fa fa-angle-down"></span>
              </div>
              <ul class="child" style="display:block;">
                <template v-if="item.name.indexOf('数据集')!=-1">
                  <template v-for="(it,j) in child">
                    <li
                      v-if="it.pid==item.id"
                      @click="cclick($event)"
                      :key="j"
                      data-url="getDataSetAll"
                      :data-id="it.id"
                    >
                      <img
                        align="absmiddle"
                        :src="it.picture_file"
                        :data-src="it.picture_file1"
                        alt
                      />
                      {{it.name}}
                    </li>
                  </template>
                </template>
                <template v-else>
                  <template v-for="(it,j) in child">
                    <li
                      :key="j"
                      v-if="it.pid==item.id"
                      @click="cclick($event)"
                      data-url="getApilistByType"
                      :data-id="it.id"
                    >
                      <img
                        align="absmiddle"
                        :src="it.picture_file"
                        :data-src="it.picture_file1"
                        alt
                      />
                      {{it.name}}
                    </li>
                  </template>
                </template>
              </ul>
            </li>
          </template>
        </ul>
      </el-col>
      <el-col :span="19" class="listp">
          <h3>{{title}}</h3>
          <template v-if="list.length!=0">
            <template v-if="type==0">
              <div class="list-main">
                <div class="list-item" v-for="(item,i) in list" :key="i">
                  <div class="img">
                    <img :src="item.picture_file" alt="暂无图片"/>
                  </div>
                  <div class="list-content">
                    <p class="list-content-title">{{item.resource_name}}</p>
                    <p class="list-content-describe">
                      <span style="font-weight: bold;">描述：</span>
                      {{item.resource_charact}}
                    </p>
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="list-main">
                <div class="list-item" v-for="(item,i) in list" :key="i">
                  <div class="img">
                    <img :src="item.api_icon_path" alt="暂无图片"/>
                  </div>
                  <div class="list-content">
                    <p
                      class="list-content-title"
                      @click="openWindow({path:'/shopping/describe',query:{api_type:item.api_type,id:item.id,api_name:item.api_name}})"
                    >{{item.api_name}}</p>
                    <p class="list-content-describe">
                      <span style="font-weight: bold;">描述：</span>
                      {{item.api_illustrate}}
                    </p>
                    <p class="list-content-describe">
                      <span style="font-weight: bold;">套餐类型：</span>
                      包年
                    </p>
                  </div>
                  <a
                    v-if="item.status==1"
                    href="javascript:void(0)"
                    class="insert"
                    style="background-color:#d4d4d4;color:#000000;"
                  >已申请</a>
                  <a
                    v-else-if="item.status==3"
                    href="javascript:void(0)"
                    class="insert"
                    style="background-color:#d4d4d4;color:#000000;"
                  >已审批</a>
                  <a
                    v-else
                    href="javascript:void(0)"
                    @click="inserts(i,item.id,item.api_name)"
                    data-id="99001"
                    data-name="匹配检索"
                    class="insert"
                  >立即申请</a>
                </div>
              </div>
            </template>
          </template>
          <template v-else>
            <span style="padding-top:10px;padding-left: 10px;display: block;">暂无数据</span>
          </template>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import $ from "jquery";
  import {
    resourceGetApilistTypeAll,
    resourceURL,
    resourceGetApiIndexExamineStatus,
    resourceAddApiIndexExamine
  } from "@/api/shopping";
  import {openWindow} from "@/tools/utils";
  import {mapGetters} from "vuex";
  import {logout} from "../../../tools/utils";

  export default {
    name: "List",
    data() {
      return {
        diy: -1, //默认不显示数据定制
        needs: -1, //默认不显示提交需求
        need: {
          //存储需求
          remarks: "", //备注
          username: "", //联系人姓名
          phone: "", //联系人手机号
          company: "" //单位名称
        },
        parent: [], //保存首页左侧导航
        child: [], //保存首页左侧导航
        title: "", //保存首页右侧列表标题
        list: [], //保存首页右侧列表数据
        type: 0, //保存首页右侧列表切换内容  默认为 0:数据集 1:API接口
        el: "", //保存当前点击的立即申请按钮
        login: false, //默认没有登录
        index: true, //是否为首页，默认为不是
        shopping: false //默认不是数据超市
      };
    },
    mounted() {
      //获取左侧导航
      this.getApiListTypeAll();
    },
    methods: {
      logout,
      ...mapGetters(["getAuthorization", "getUsersInfo"]),
      openWindow,
      // TODO 点击立即申请按钮
      inserts(i, id, api_name) {
        let info = this.getUsersInfo();
        if (!info.id) {
          this.$message.error("用户信息获取失败，请重新登录");
          this.logout();
          return false;
        }
        resourceAddApiIndexExamine({
          user_id: info.id,
          username: info.username,
          api_index_id: id,
          aoi_name: api_name,
          type: "1"
        }).then(res => {
          if (res && res.code === 200) {
            this.list[i].status = 1;
          } else {
            this.$message.error("申请失败");
          }
        });
      },
      getApiListTypeAll() {
        resourceGetApilistTypeAll({}).then(res => {
          if (res && res.code === 200 && res.data && res.data.length > 0) {
            let result = res.data;
            var parent = [];
            var child = [];
            for (var i = 0; i < result.length; i++) {
              if (result[i].stauts === 1) {
                if (result[i].pid === 0) {
                  parent.push(result[i]);
                } else {
                  let picture_file = result[i].picture_file;
                  try {
                    result[i].picture_file = require("@/assets/shopping/open/" +
                      picture_file);
                    result[i].picture_file1 = require("@/assets/shopping/open/" +
                      (picture_file.substring(0, picture_file.length - 4) +
                        "3.png"));
                  } catch (e) {
                    result[i].picture_file = "";
                    result[i].picture_file1 = "";
                  } finally {
                    child.push(result[i]);
                  }
                }
              }
            }
            parent = this.bubbleSortNumberId(parent, "orderid");
            child = this.bubbleSortNumberId(child, "orderid");
            this.parent = parent;
            this.child = child;

            let interval = setInterval(function () {
              let leftNav = $(
                "#leftNav>li:first-of-type>ul:first-of-type>li:first-of-type"
              );
              if (leftNav.length !== 0) {
                leftNav.click();
                clearInterval(interval);
              }
            }, 20);
          } else {
            this.$message.error("数据获取失败");
          }
        });
      },
      pclick(event) {
        let el = $(event.currentTarget);
        var ul = el.parent().find("ul");
        if (ul.css("display") === "block") {
          el.parent()
            .find(".fa")
            .addClass("active");
          ul.css("display", "none");
        } else {
          ul.css("display", "block");
          el.parent()
            .find(".fa")
            .removeClass("active");
        }
      },
      cclick(event) {
        let el = $(event.currentTarget); //获取当前点击的元素
        if (!el.hasClass("active")) {
          this.list = [];
          let that = this;
          that.diy = -1;
          that.title = el.text();
          let p = el
            .parent()
            .parent()
            .parent();
          for (let i = 0; i < p.length; p++) {
            let pactive = $(p[i]).find(".active");
            if (pactive.find("img").length !== 0) {
              let pactiveImg = pactive.find("img");
              that.replaceImg(pactiveImg);
            }
            $(p[i])
              .find(".active")
              .removeClass("active");
          }
          let src = el.find("img").attr("src");
          that.replaceImg(el.find("img"));
          el.siblings().removeClass("active");
          el.addClass("active");
          if (el.attr("data-url") === "getDataSetAll") {
            that.type = 0; //数据集
          } else {
            that.type = 1; //API接口
          }
          //getApilistByType
          let obj = {
            type: that.type,
            api_type: el.attr("data-id"),
            user_id: that.getAuthorization()
          };
          if (el.attr("data-url") === "getApilistByType") {
            obj.field = "id,api_name,type,api_type,api_illustrate,status,api_icon_path";
          }
          resourceURL(el.attr("data-url"), obj).then(result => {
            if (result.code === 200 && result.data && result.data.length > 0) {
              result = result.data;
              let re = [];
              for (let i = 0; i < result.length; i++) {
                if (result[i]["status"] == "1" && that.type == 1) {
                  re.push(result[i]);
                } else if (that.type == 0) {
                  re.push(result[i]);
                }
              }
              result = re;
              if (that.type == 0) {
                for (let i = 0; i < result.length; i++) {
                  try {
                    result[i].picture_file = require("@/assets/shopping/open/" +
                      result[i].picture_file);
                  } catch (e) {
                    result[i].picture_file = "";
                  }
                }
              } else {
                for (let i = 0; i < result.length; i++) {
                  let api_icon_path = result[i].api_icon_path;
                  try {
                    result[
                      i
                      ].api_icon_path = require("@/assets/shopping/open/" +
                      api_icon_path);
                  } catch (e) {
                    result[i].api_icon_path = "";
                  }
                  let info = this.getUsersInfo();
                  if (!info.id) {
                    result[i].status = "";
                  } else {
                    resourceGetApiIndexExamineStatus({
                      user_id: info.id,
                      api_index_id: result[i].id
                    }).then(res => {
                      result[i].status = res.data;
                    });
                  }

                  // }
                }
                if (!el) {
                  if (!that.el.attr("data-id")) {
                    that.el.removeAttr("style");
                  }
                }
                that.list = result;
              }
            } else {
              that.list = [];
            }
          });
        } else {
          return false;
        }
      },
      replaceImg(ele) {
        let src = ele.attr("src");
        let data_src = ele.attr("data-src");
        let three = src;
        src = data_src;
        data_src = three;
        ele.attr("src", src);
        ele.attr("data-src", data_src);
      },
      bubbleSortNumberId(arr, a) {
        for (let i = 0; i < arr.length; i++) {
          for (let j = i; j < arr.length; j++) {
            if (arr[i][a] > arr[j][a]) {
              let obj = arr[j];
              arr[j] = arr[i];
              arr[i] = obj;
            }
          }
        }
        return arr;
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../assets/public";


</style>
