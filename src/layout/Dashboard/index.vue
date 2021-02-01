<template>
  <div class="app-wrapper">
    <Sidebar :opened="opened" class="sidebar-container"/>
    <div :class="{'main-container':true,'marginLeft':!opened}">
      <Header @changeOpened="handleChangeOpened" :opened="opened"/>
      <div class="tags-view">
<!--        <keep-alive :include="cachedViews">-->
<!--          <router-view :key="key" />-->
<!--        </keep-alive>-->
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
  import Sidebar from './Sidebar'
  import Header from './Header'

  export default {
    name: "index",
    components: {
      Sidebar,
      Header
    },
    data() {
      return {
        opened:(()=>{
          if(this.$store.getters.getAppMenuOpened==='true'||this.$store.getters.getAppMenuOpened===true){
            return true;
          }else{
            return false;
          }
        })()
      }
    },
    mounted(){},
    computed: {},
    methods: {
      handleChangeOpened(val){
        this.opened=val;
      }
    }
  }
</script>
<style>
  html,body,#app,.app-wrapper{
    height:100%;
  }
</style>
<style lang="scss" scoped>
  .main-container {
    box-sizing: border-box;
    padding-left: 210px;
    width: 100%;
    height: 100%;
    background-color: #f0f2f5;
    transition: padding-left .28s;
    .tags-view{
      padding: 90px 10px 10px 10px;
      overflow: hidden;
    }
    &.marginLeft{
      padding-left: 80px !important;
    }
  }
</style>
