<template>
  <!-- 模板头部右侧人物信息及下拉 -->
  <div class="miss">
    <el-dropdown>
      <span class="el-dropdown-link uname">
        {{userInfo.username}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown" class="">
        <el-dropdown-item v-if="this.userInfo.roleId==19">
          <span @click="routerLinks('/center')" class="unamedropdown">个人中心</span>
        </el-dropdown-item>
        <el-dropdown-item  v-if="this.userInfo.roleId==19">
          <span @click="routerLinks('/test')" class="unamedropdown">测试工具</span>
        </el-dropdown-item>
        <el-dropdown-item  v-if="this.userInfo.roleId==19">
          <span @click="routerLinks('/recommend')" class="unamedropdown">检索推荐</span>
        </el-dropdown-item>
        <el-dropdown-item  v-if="this.userInfo.roleId==19">
          <span @click="routerLinks('/vector')" class="unamedropdown">向量检索</span>
        </el-dropdown-item>
        <el-dropdown-item>
          <span @click="logout" class="unamedropdown">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import {logout} from '@/tools/utils'

  export default {
    name: "index",
    data() {
      return {
        userInfo: {
          id: "",
          username: "",
          roleId: "",
          token: ""
        }
      }
    },
    mounted() {
      this.userInfo = this.getUsersInfo();
    },
    methods: {
      logout,
      ...mapGetters(["getUsersInfo"]),
      routerLinks(path){
        if(path===this.$route.path){
          return false;
        }
        this.$router.push({path});
      }
    }
  }
</script>

<style lang="scss" scoped>
  .miss{
    text-align: right;
  }
  .unamedropdown{
    min-width: 60px;
    display: block;width:100%;height:100%
  }
</style>
