<template>
  <div class="center">
    <Layout class="centerLayout" title="">
      <e-shadow-bar
        id="gyE"
        :data="{xAxisData:gy.xAxisData,seriesData:gy.seriesData}"
        :step="100"
        :loading="loadingEShadowBarGY"
        :options="{xAxis:{name:'资源名称'},yAxis:{name:'数量'}}"
        :titles="{text:'公有资源'}"/>
    </Layout>
    <Layout class="centerLayout" title="">
      <e-shadow-bar
        id="syE"
        :data="{xAxisData:sy.xAxisData,seriesData:sy.seriesData}"
        :step="10"
        :options="{xAxis:{name:'资源名称'},yAxis:{name:'数量'}}"
        :loading="loadingEShadowBarSY"
        :titles="{text:'私有资源'}"/>
    </Layout>
  </div>
</template>

<script>
  import {Layout} from './components'
  import {resourceIndexDocCount} from "../../../api/settlement";
  import {mapGetters} from 'vuex'
  import {logout} from "../../../tools/utils";

  export default {
    name: "index",
    components: {Layout},
    data() {
      return {
        loadingEShadowBarGY: true,
        loadingEShadowBarSY: true,
        gy: {
          xAxisData: [],
          seriesData: []
        },
        sy: {
          xAxisData: [],
          seriesData: []
        }

      }
    },
    mounted() {
      this.loadData()
    },
    methods: {
      logout,
      ...mapGetters(['getUsersInfo']),
      loadData() {
        let info = this.getUsersInfo();
        if (!info.id) {
          this.$message.error('用户信息获取失败，请重新登录');
          this.logout();
          return false;
        }
        this.loadingEShadowBarGY = true;
        this.loadingEShadowBarGY = true;
        resourceIndexDocCount({
          auid: info.id,
          param: 'docs.count'
        }).then((res) => {
          this.loadingEShadowBarGY = false;
          this.loadingEShadowBarSY = false;
          if (res && res.code === 200) {
            this.gy.xAxisData = [];
            this.sy.xAxisData = [];
            this.gy.seriesData = [];
            this.sy.seriesData = [];
            for (let item in res.data["gy"]) {
              this.gy.xAxisData.push(item.split('-')[0]);
              this.gy.seriesData.push(res.data['gy'][item]['docs.count'])
            }
            for (let item in res.data["sy"]) {
              this.sy.xAxisData.push(item.split('-')[0]);
              this.sy.seriesData.push(res.data['sy'][item]['docs.count'])
            }
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .center{
    /*display: flex;*/
    /*box-sizing: border-box;*/
    .centerLayout{
      /*display: inline-block;*/
      /*vertical-align: top;*/
      /*width: 50%;*/
    }
  }

</style>
