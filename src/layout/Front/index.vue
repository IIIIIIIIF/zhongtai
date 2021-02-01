<template>
  <div>
    <Header/>
    <div id="conts">
      <router-view/>
    </div>
    <Footer v-if="showFooter"/>
  </div>
</template>

<script>
  import Header from './Header';
  import Footer from './Footer';

  export default {
    name: "index",
    components: {
      Header,
      Footer
    },
    mounted(){
      this.initData()
    },
    data() {
      return {
        showFooter:true,
      }
    },
    methods:{
      initData(){
        if(this.$route.meta.showFooter===false){
          this.showFooter=false;
        }else{
          this.showFooter=true;
        }
      }
    },
    watch:{
      $route(){
        this.initData();
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
