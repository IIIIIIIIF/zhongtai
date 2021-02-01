<template>
  <div>
    <Header/>
    <div id="conts">
      <Sidebar class="conts_sidebar"/>
      <div class="conts_content">
        <router-view/>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
  import Header from '../Front/Header';
  import Footer from '../Front/Footer';
  import Sidebar from './Sidebar'

  export default {
    name: "index",
    components: {
      Header,
      Footer,
      Sidebar
    },
    data() {
      return {}
    }
  }
</script>

<style lang="scss" scoped>
  #conts{
    width: 1200px;
    margin: 0 auto;
    position: relative;
    min-height: 600px;
    .conts_sidebar{
      position: absolute;
      top: 0;
      left: 0;
    }
    .conts_content{
      padding-left: 180px;
      padding-top: 20px;
      padding-bottom: 20px;
    }
  }
</style>
