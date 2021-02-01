<template>
  <div class="sidebar-logo-container" :class="{'opened':!opened}">
    <transition name="sidebarLogoFade">
      <router-link key="expand" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 class="sidebar-title">{{ title }} </h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'SidebarLogo',
    props: {
      opened:{
        type:Boolean,
        default:false
      }
    },
    data() {
      return {
        title: '资源管理后台',
        logo: require('@/assets/manager/logo.png')
      }
    },
    mounted(){
      this.init();
    },
    methods:{
      init(){
        if(this.$route.path.indexOf('/center')===0){
          this.title="个人中心";
        }else{
          this.title="资源管理后台";
        }
      }
    },
    watch:{
      $route(to,form){
        if(to.path.indexOf('/center')===0&&form.path.indexOf('/center')!==0){
          this.init();
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .sidebarLogoFade-enter-active {
    transition: opacity 1.5s;
  }

  .sidebarLogoFade-enter,
  .sidebarLogoFade-leave-to {
    opacity: 0;
  }

  .sidebar-logo-container {
    position: relative;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #2b2f3a;
    padding-left: 22px;
    /*text-align: center;*/
    overflow: hidden;
    box-sizing: border-box;

    & .sidebar-logo-link {
      height: 100%;
      width: 100%;

      & .sidebar-logo {
        width: 32px;
        height: 32px;
        vertical-align: middle;
        margin-right: 12px;
      }

      & .sidebar-title {
        display: inline-block;
        margin: 0;
        color: #fff;
        font-weight: 600;
        line-height: 50px;
        font-size: 14px;
        font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
        vertical-align: middle;
      }
    }

    &.opened {
      .sidebar-logo {
        margin-right: 0px;
      }
      .sidebar-title{
        display: none;
      }
    }
  }
</style>
