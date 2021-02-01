<template>
  <div class="centerSecurity">
    <h3 class="title">用户信息</h3>
    <div class="user">
      <Info :web="true" :row="info"></Info>
    </div>
  </div>
</template>

<script>
  import Info from '../../dashboard/Users/info'
  import {managerKFJGetUser} from "../../../api/manager";
  import {logout} from "../../../tools/utils";
  import {mapGetters} from 'vuex'

  export default {
    name: "index",
    data() {
      return {
        info: {}
      }
    },
    components:{Info},
    mounted() {
      this.getUser();
    },
    methods: {
      logout,
      ...mapGetters(['getUsersInfo']),
      getUser() {
        let info = this.getUsersInfo();
        if (!info.id) {
          this.$message.error('获取用户信息失败，请重新登录');
          this.logout();
          return false;
        }
        managerKFJGetUser({
          id: info.id,
        }).then(res => {
          if (res && res.data) {
            this.info = res.data || {};
          } else {
            this.info = {};
          }
        });
      }
    }
  }
</script>
<style lang="scss" scoped>
  .centerSecurity {
    h3.title {
      background: none;
      display: inline-block;
      font-size: 15px;
      color: #505061;
      padding: 5px;
      border-bottom: 2px solid #050c40;
    }

    .user {
      padding: 10px;
      border: 1px solid #c7c7c7;
      border-radius: 10px;
      margin-top: 20px;
    }
  }
</style>
