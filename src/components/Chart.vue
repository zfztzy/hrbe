<template>
  <div>
		<h1 @click="create">{{title}}</h1>
    <div class="Echarts">
        <div :ref="keyId" style="width: 600px;height: 400px;"></div>
    </div>
  </div>
</template>
 
<script>
export default {
  name: 'Echarts',
  props: {
    titleData:{
      type: Array
    },
    xAxis: {
      type: Array
    },
    yAxis: {
      type: Array
    },
    series: {
      type: Array
		},
		keyId: {
			type: String
		},
		title: {
			type: String
		}
  },
  data () {
    return {
    }
  },
  methods: {
    myEcharts(){
      var myChart = this.$echarts.init(this.$refs[this.keyId]);
      //配置图表
      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
            color: '#999'
            }
          }
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            // magicType: { show: true, type: ['line', 'bar'] },
            // restore: { show: true },
            // saveAsImage: { show: true }
          }
        },
        legend: {
          data: this.titleData
        },
        xAxis: this.xAxis,
        yAxis: this.yAxis,
        series: this.series
      }
			myChart.setOption(option);
		},
		create () {
			console.log(this.keyId);
			console.log(this.$refs[this.keyId]);
			this.myEcharts()
		}
  },
  mounted(){
    this.myEcharts();
	},
	watch: {
		titleData: {
			handler: function () {
				this.myEcharts()
			}
		},
		xAxis: {
			handler: function () {
				this.myEcharts()
			}
		},
		yAxis: {
			handler: function () {
				this.myEcharts()
			}
		},
		series: {
			handler: function () {
				this.myEcharts()
			}
		},
		key: {
			handler: function () {
				this.myEcharts()
			}
		},
	}
}
</script>
 
<style>
 
</style>