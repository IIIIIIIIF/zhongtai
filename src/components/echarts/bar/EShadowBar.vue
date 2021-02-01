<template>
  <div class="EShadowBar">
    <div :id="id" :ref="id" :style="styles"></div>
  </div>
</template>

<script>
  import {upTo} from "../../../tools/utils";

  export default {
    name: "EShadowBar",
    props: {
      loading: {
        type: Boolean
      },
      options: {
        type: Object,
        default: {
          xAxis: {
            name: ''
          },
          yAxis: {
            name: ''
          }
        }
      },
      // echarts id
      id: {
        type: String,
        required: true,
      },
      data: {
        required: true,
        type: Object
      },
      step: {
        type: Number
      },
      // echarts 样式 主要设置 宽度/高度
      styles: {
        type: String,
        default: "width:100%;height:400px"
      },
      titles: {
        type: Object,
        required: true,
      }
    },
    data() {
      return {
        xAxisData: [],//x轴
        seriesData: [],//y轴
        chart: "",//echarts.init
      }
    },
    mounted() {
      this.chart = echarts.init(document.getElementById(this.id));
      this.isLoading(this.loading);
    },
    methods: {
      upTo,
      getOption() {
        let data = this.seriesData || [];
        let yMax = this.upTo(Math.max(...data), this.step);//获取最大值 且为100的整数
        let dataShadow = [];

        data.forEach(item => {
          dataShadow.push(yMax);
        });
        let zoomSize = 6;
        this.chart && this.chart.on('click', function (params) {
          this.chart.dispatchAction({
            type: 'dataZoom',
            startValue: this.xAxisData[Math.max(params.dataIndex - zoomSize / 2, 0)],
            endValue: this.xAxisData[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
          });
        });
        return {
          title: this.titles,
          xAxis: {
            name: this.options.xAxis.name,
            data: this.xAxisData,
            axisLabel: {
              inside: true,
              textStyle: {
                color: '#fff'
              }
            },
            axisTick: {
              show: true
            },
            axisLine: {
              show: true
            },
            z: 10
          },
          yAxis: {
            name: this.options.yAxis.name,
            axisLine: {
              show: true
            },
            axisTick: {
              show: true
            },
            axisLabel: {
              textStyle: {
                color: '#999'
              }
            }
          },
          dataZoom: [
            {
              type: 'inside'
            }
          ],
          series: [
            { // For shadow
              type: 'bar',
              itemStyle: {
                color: 'rgba(0,0,0,0.05)'
              },
              barGap: '-100%',
              barMaxWidth: 50,
              barCategoryGap: '30%',
              data: dataShadow,
              animation: false
            },
            {
              type: 'bar',
              barMaxWidth: 50,
              itemStyle: {
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    {offset: 0, color: '#83bff6'},
                    {offset: 0.5, color: '#188df0'},
                    {offset: 1, color: '#188df0'}
                  ]
                )
              },
              emphasis: {
                itemStyle: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#2378f7'},
                      {offset: 0.7, color: '#2378f7'},
                      {offset: 1, color: '#83bff6'}
                    ]
                  )
                }
              },
              data: data
            }
          ]
        }
      },
      isLoading(val) {
        if (this.xAxisData.length === 0 || this.seriesData.length === 0) {
          this.chart && this.chart.hideLoading();
          this.chart && this.chart.showLoading({
            text: '暂无数据',
            color: "#ffffff",
            textColor: "#8a8e91",
            maskColor: 'rgba(255,255,255,0.8)'
          });
        } else {
          if (val) {
            this.chart && this.chart.showLoading();
          } else {
            this.chart && this.chart.hideLoading();
          }
        }
      }
    },
    watch: {
      data: {
        immediate: true,
        deep: true,
        handler(data, oldData) {
          if (data === oldData) {
            return false;
          }
          this.xAxisData = data.xAxisData || [];
          this.seriesData = data.seriesData || [];
          this.chart && this.chart.setOption(this.getOption())
        }
      },
      loading: {
        immediate: true,
        handler(val) {
          this.isLoading(val);
        }
      }
    }
  }
</script>

<style scoped>

</style>
