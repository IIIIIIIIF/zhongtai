<template>
  <div>
    <Header/>
    <div id="content">
      <router-view/>
    </div>
    <Footer/>
  </div>
</template>

<script>
  import Header from './Header'
  import Footer from './Footer'

  export default {
    name: "ShoppingLayout",
    components: {
      Header,
      Footer
    },
    data() {
      return {}
    }
  }
</script>

<style lang="scss" scoped>
  #content {
    padding-top: 70px;
  }
</style>
