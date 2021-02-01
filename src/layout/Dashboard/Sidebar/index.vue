<template>
  <div :class="{'sidebarTamplate':true,'length':opened,'sort':!opened}">
    <Logo :opened="opened" :collapse="false"/>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
      >
        <template v-if="isCenter">
          <template v-for="item in navList">
            <el-submenu
              :title="item.title"
              :index="item.id"
              v-if="item.children&&item.children.length>0">
              <template slot="title">
                <i :class="item.meta.icon"></i>
                <span v-if="opened">{{item.meta.title}}</span>
              </template>
              <el-menu-item
                :index="its.id"
                :key="inds"
                v-for="(its,inds) in item.children">
                <router-link :title="its.meta.title" :to="{path:its.url,query:{id:its.id}}">
                  <i :class="its.meta.icon"></i>
                  <span v-if="opened">{{its.meta.title}}</span>
                </router-link>
              </el-menu-item>
            </el-submenu>
            <el-menu-item :index="item.id" :key="item.id" v-else>
              <router-link :to="{name:item.name,query:{}}">
                <i :class="item.meta.icon"></i>
                <span v-if="opened">{{item.meta.title}}</span>
              </router-link>
            </el-menu-item>
          </template>
        </template>
        <template v-else v-for="(item,index) in navList">
          <el-submenu
            :title="item.name"
            :index="'2'+item.id"
            v-if="item.child.length>0">
            <template slot="title">
              <i :class="'fa '+item.icon"></i>
              <span v-if="opened">{{item.name}}</span>
            </template>
            <el-menu-item
              :index="'2'+its.id"
              :key="inds"
              v-for="(its,inds) in item.child">
              <router-link :title="its.name" :to="{path:its.url,query:{id:its.id}}">
                <i :class="'fa '+its.icon"></i>
                <span v-if="opened">{{its.name}}</span>
              </router-link>
            </el-menu-item>
          </el-submenu>
          <el-menu-item :title="item.name" :index="item.id" v-else>
            <i :class="'fa '+item.icon"></i>
            <span slot="title" v-if="opened">{{item.name}}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
  import Logo from './logo'
  import variables from '@/styles/variables.scss'
  import {mapGetters, mapActions} from 'vuex'
  import {centerRouter} from "@/config/router";

  export default {
    name: "index",
    components: {Logo},
    props: {
      opened: {
        type: Boolean,
        default: true,//默认为打开状态
      },
    },
    data() {
      return {
        isCollapse: false,
        navList: [],
        isCenter: true,//默认个人中心连接
        variables: {
          ...variables
        }
      }
    },
    computed: {},
    created() {

    },
    mounted() {
      this.init();
    },
    methods: {
      ...mapGetters(['getSortMenuNav']),
      ...mapActions(['logout']),
      init() {
        //个人中心
        if (this.$route.path.indexOf('/center') === 0) {
          this.isCenter = true;
          this.navList = centerRouter[0].children;
        } else {
          this.isCenter = false;
          this.navList = this.getSortMenuNav();
          if (this.navList.length === 0) {
            this.logout();
          }
        }
      },
    },
    watch: {
      $route(to,form) {
        if (form.path.indexOf('/center')!==0&&this.$route.path.indexOf('/center') === 0) {
          this.init();
        }
      }
    }
  }
</script>
<style lang="scss">
  .sidebar-container {
    .el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }
</style>
<style lang="scss" scoped>
  //getAppMenuWidth
  .length {
    width: 210px !important;
  }

  .sort {
    width: 80px !important;
  }

  .sidebar-container {
    user-select: none;
    transition: width .28s;
    width: 210px;
    background-color: #304156;
    height: 100%;
    position: fixed;
    font-size: 0;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 1001;
    overflow: hidden;
  }

  .el-scrollbar {
    height: 93%;

    a {
      display: inline-block;
      width: 100%;
      height: 100%;
      color: rgb(191, 203, 217);
    }

    i {
      color: rgb(191, 203, 217);
      display: inline-block;
      margin-right: 4px;
      width: 20px;
    }
  }

  .el-menu-item.is-active a {
    color: #409eff;
  }
</style>
