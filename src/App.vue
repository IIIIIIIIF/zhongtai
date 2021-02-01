<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import {mapActions,mapGetters} from 'vuex';
  export default {
    name: 'App',
    data(){
    return{

      }
    },
    mounted(){
      if(!(this.getAppSize())){
        //medium/small/mini
        this.setAppSize("small")
      }
    },
    methods:{
      ...mapActions(['setAppSize']),
      ...mapGetters(['getAppSize'])
    }
  }
</script>

<style>
  @import "./styles/public.scss";
</style>

