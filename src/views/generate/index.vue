<!--创新助手生成word模板-->
<template>
  <div class="generate">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="专家报告" name="expert">
        <Expert/>
      </el-tab-pane>
      <el-tab-pane label="机构报告" name="org">
        <Org/>
      </el-tab-pane>
      <el-tab-pane label="技术报告" name="subject">
        <Subject/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import {Expert,Org,Subject} from './template'
  export default {
    name: "index",
    components:{
      Expert,
      Org,
      Subject
    },
    data() {
      return {
        activeName: 'expert'
      }
    },
    methods: {
      handleClick(tab, event) {
        // console.log(tab, event);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .generate {
    width: 1200px;
    margin: 0 auto;
  }
</style>
