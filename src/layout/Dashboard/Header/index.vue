<template>
  <div :class="{'header':true,'clear':true,'paddingLeft':!opened}">
    <div class="navbar">
      <div class="pull-left">
        <i
          @click="handleClickChangeNavOpened"
          :class="{'el-icon-s-fold':opened,'el-icon-s-unfold':!opened}"></i>
        <span>{{title}}</span>
      </div>
      <div class="pull-right">
        <Miss/>
<!--        <el-dropdown>-->
<!--          <span class="el-dropdown-link">-->
<!--            {{username}}<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
<!--          </span>-->
<!--          <el-dropdown-menu slot="dropdown">-->
<!--            <el-dropdown-item>-->
<!--              <span style="display: block;width:100%;height:100%" @click="logout">退出</span>-->
<!--            </el-dropdown-item>-->
<!--          </el-dropdown-menu>-->
<!--        </el-dropdown>-->
      </div>
    </div>
    <div class="tags-view-container">
      <Tag/>
    </div>
  </div>
</template>

<script>
  import Miss from '@/components/Miss'
  import Tag from './Tag';
  import {logout} from '@/tools/utils'
  import {mapGetters, mapActions} from 'vuex'
  import {centerRouter} from "@/config/router";

  export default {
    name: "index",
    components: {Tag,Miss},
    props: {
      opened: {
        type: Boolean,
        default: true,//默认为打开状态
      },
    },
    data() {
      return {
        username: "",
        title:"首页",
        openeds: Boolean(this.$store.getters.getAppMenuOpened)
      }
    },
    created() {
      let userInfo = this.getUsersInfo() || "我的";
      this.username = userInfo.username;
      this.loadTitle(this.$route.path);

    },
    methods: {
      logout,
      ...mapGetters(['getUsersInfo', 'getAppMenuOpened']),
      ...mapActions(['setAppMenuOpened']),
      handleClickChangeNavOpened() {
        this.setAppMenuOpened(!this.$store.getters.getAppMenuOpened);
        this.openeds = Boolean(this.$store.getters.getAppMenuOpened);
        this.$emit('changeOpened', this.openeds);
      },
      loadTitle(path){
        //如果是来源于个人中心则从静态路由种查找title
        if(this.$route.path.indexOf('/center')===0){
          let index=centerRouter[0].children.findIndex(item=>item.name===this.$route.name);
          this.title=centerRouter[0].children[index].meta.title;
          return false;
        }
        let navs=this.$store.getters.getSortMenuNav||[];
        for(let i=0;i<navs.length;i++){
          let nav=navs[i].child;
          for(let j=0;j<nav.length;j++){
            if(nav[j].url===path){
              this.title=`${navs[i].name}/${nav[j].name}`;
              break;
            }
          }
        }
      }
    },
    watch:{
      $route(to){
        this.loadTitle(to.path)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .header {
    box-sizing: border-box;
    width: 100%;
    padding-left: 210px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;
    background-color: #ffffff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    transition: padding-left .28s;


    .navbar {
      height: 50px;

      .pull-left {
        padding-left: 12px;
        padding-top: 10px;
        i,span{
          display: inline-block;
          vertical-align: middle;
        }
        i{
          cursor: pointer;
          font-size: 24px;
        }
        span{
          color: #636363;
          font-size: 14px;
        }
      }
      .pull-right {
        cursor: pointer;
        user-select: none;
        height: 100%;
        line-height: 50px;
        padding-right: 30px;
      }
    }

    .tags-view-container {
      height: 34px;
      width: 100%;
      background-color: #fff;
      border-bottom: 1px solid #d8dce5;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
    }
    &.paddingLeft{
      padding-left: 80px !important;
    }
  }
</style>
