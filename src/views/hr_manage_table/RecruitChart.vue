<template>
  <div>
		<chart :series="[series1, series2, series3]" :xAxis="[xData]" :yAxis="[yData1, yData2]" :titleData="titleData"/>
  </div>
</template>
 
<script>
import Chart from '../../components/Chart.vue';
export default {
  components: { Chart },
  name: 'Echarts',
  data () {
		return {
			titleData: ['需求总数', '月度满足数', '需求满足度'],
			xData: {
				type: 'category',
				data: ['5033部', '5032部', '5031部', '5030部', '5029部', '5028部', '5027部','5036部'],
				axisPointer: {
					type: 'shadow'
				}
			},
			yData1: {
				type: 'value',
				name: '人数',
				min: 0,
				max: 250,
				interval: 50,
				axisLabel: {
					formatter: '{value} '
				}
			},
			yData2: {
				type: 'value',
				name: '满足度',
				min: 0,
				max: 100,
				interval: 5,
				axisLabel: {
					formatter: '{value} %'
				}
			},
			series1: {
				name: '需求总数',
				type: 'bar',
				tooltip: {
					valueFormatter: function (value) {
						return value + '人';
					}
				},
				data: [
					2, 4, 7, 23, 25, 76, 135, 162, 32, 20, 6, 3
				]
			},
			series2: {
				name: '月度满足数',
				type: 'bar',
				tooltip: {
					valueFormatter: function (value) {
						return value + '人';
					}
				},
				data: [
					2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
				]
			},
			series3: {
				name: '需求满足度',
				type: 'line',
				yAxisIndex: 1,
				tooltip: {
					valueFormatter: function (value) {
						return value + ' %';
					}
				},
				data: [50, 60, 70, 77, 79, 60, 53, 99, 89,]
			}
		}
  },
  methods: {
	}
}
</script>
 
<style>
 
</style>