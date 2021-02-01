<template>
  <div :class="{'sidebarTamplate':true}">
    <!--    <el-menu-->
    <!--      :collapse="isCollapse"-->
    <!--      :background-color="variables.menuBg"-->
    <!--      :default-active="defaultActive"-->
    <!--      :text-color="variables.menuText"-->
    <!--    >-->
    <el-menu
      :collapse="isCollapse"
      :default-active="defaultActive"
      :default-openeds="defaultOpeneds"
    >
      <template v-for="item in navList">
        <el-submenu
          :title="item.name"
          :index="item.id+''"
          v-if="item.child&&item.child.length>0">
          <template slot="title">
            <i :class="item.icon"></i>
            <span v-if="opened">{{item.name}}</span>
          </template>
          <el-menu-item
            :index="its.id+''"
            :key="inds"
            v-for="(its,inds) in item.child">
            <router-link :title="its.name" :to="{path:its.url,query:{id:its.id}}">
              <i :class="its.icon"></i>
              <span v-if="opened">{{its.name}}</span>
            </router-link>
          </el-menu-item>
        </el-submenu>
        <el-menu-item :index="item.id+''" :key="item.id" v-else>
          <router-link :to="{path:item.url,query:{}}">
            <i :class="item.icon"></i>
            <span v-if="opened">{{item.name}}</span>
          </router-link>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
  import {sortMenuNav} from "@/tools/utils";
  import {getIndexFontNav} from '@/api'
  import variables from '@/styles/variables.scss'
  import {mapGetters, mapActions} from 'vuex'
  import {centerRouter} from "@/config/router";

  export default {
    name: "index",
    components: {},
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
        variables: {
          ...variables
        },
        defaultActive: "10001",
        defaultOpeneds:[]
      }
    },
    computed: {},
    created() {

    },
    mounted() {
      this.init();
      this.initData();
    },
    methods: {
      ...mapGetters(['getSortMenuNav']),
      ...mapActions(['logout']),
      init() {
        getIndexFontNav().then(({data}) => {
          this.navList = sortMenuNav(data);
          this.initData();
        });
      },
      initData() {
        this.defaultOpeneds = [];
        let path = this.$route.path;
        for (let i = 0; i < this.navList.length; i++) {
          let item = this.navList[i];
          if (item.url === path) {
            this.defaultActive = item.id + "";
            break;
          }
          if (item && item.child && item.child.length > 0) {
            let itemChild = item.child;
            let flag = false;//默认在子项中没有找到匹配当前路由
            for (let j = 0; j < itemChild.length; j++) {
              if (itemChild[j].url === path) {
                this.defaultActive = itemChild[j].id + "";
                flag = true;
                break;
              }
            }
            if (flag) {
              break;
            }
          }
        }
        for (let i = 0; i < this.navList.length; i++) {
          let item = this.navList[i];
          this.defaultOpeneds.push(this.navList[i].id + "");
          if (item && item.child && item.child.length > 0) {
            let itemChild = item.child;
            for (let j = 0; j < itemChild.length; j++) {
              this.defaultOpeneds.push(itemChild[j].id + "");
            }
          }
        }
      }
    },
    watch: {
      $route(){
        this.initData()
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

  a:focus {
    color: #303133;
  }
</style>
<style lang="scss" scoped>
  .conts_sidebar {
    .el-menu {
      border-right: 0;
    }
  }

  //getAppMenuWidth
  .sidebarTamplate {
    width: 160px;
    overflow-x: hidden;
  }

  .sidebar-container {
    user-select: none;
    transition: width .28s;
    width: 210px;
    /*background-color: #304156;*/
    height: 100%;
    position: fixed;
    font-size: 0;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 1001;
    overflow: hidden;
  }

  .sidebarTamplate {
    user-select: none;
    height: 100%;

    a {
      display: inline-block;
      width: 100%;
      height: 100%;
      /*color: rgb(191, 203, 217);*/
    }


    i {
      /*color: rgb(191, 203, 217);*/
      display: inline-block;
      margin-right: 4px;
      width: 20px;
    }
  }

  .el-menu-item.is-active a {
    color: #409eff;
  }
</style>
