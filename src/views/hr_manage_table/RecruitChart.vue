<template>
	<div>
		<div class="chartMenu">
			<a-range-picker
				style=" margin: -5px 0; width:250px; margin-top:30px"
				key="aa"
				format="YYYY-MM-DD"
				:placeholder="['开始时间', '结束时间']"
				@change="onChange"
				@ok="onOk"
			/>
			<br>
			<a-select
				ref="select"
				style="margin: -5px 0; width:250px; margin-top:30px"
				v-model="chartType"
				placeholder="维度选择"
			>
				<a-select-option key="key1" value='pdu'>pdu</a-select-option>
				<a-select-option key="key2" value='地域'>地域</a-select-option>
				<a-select-option key="key3" value='招聘顾问'>招聘顾问</a-select-option>
			</a-select>
			<br>
			<a-select
				v-if="chartType==='pdu'"
				ref="select"
				style="margin: -5px 0; width:250px; margin-top:30px; margin-bottom:30px"
				v-model="department"
				placeholder="部门选择"
			>
				<a-select-option key="key1" value='上海海思'>上海海思</a-select-option>
				<a-select-option key="key2" value='海思半导体'>海思半导体</a-select-option>
			</a-select>
			<a-select
				v-else-if="chartType==='招聘顾问'"
				ref="select"
				style="margin: -5px 0; width:250px; margin-top:30px; margin-bottom:30px"
				v-model="region"
				placeholder="地域"
			>
				<template v-for="i in regionList">
					<a-select-option :key="i" :value='i'>{{i}}</a-select-option>
				</template>
			</a-select>
			<br>
			<a-button style="" @click='build'> 确定 </a-button>
		</div>
		<div class="midPic">
			<chart keyId="chart1" :series="[series1, series2, series3, series4]" :xAxis="[xData]" :yAxis="[yData1]" :titleData="titleData"/>
		</div>
	</div>
</template>
 
<script>
function typeOf(obj) {
  const toString = Object.prototype.toString;
  const map = {
    '[object Boolean]'  : 'boolean',
    '[object Number]'   : 'number',
    '[object String]'   : 'string',
    '[object Function]' : 'function',
    '[object Array]'    : 'array',
    '[object Date]'     : 'date',
    '[object RegExp]'   : 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]'     : 'null',
    '[object Object]'   : 'object'
  };
  return map[toString.call(obj)];
}
function deepCopy(data) {
  const t = typeOf(data);
  let o;

  if (t === 'array') {
    o = [];
  } else if ( t === 'object') {
    o = {};
  } else {
    return data;
  }

  if (t === 'array') {
    for (let i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]));
    }
  } else if ( t === 'object') {
    for (let i in data) {
      o[i] = deepCopy(data[i]);
    }
  }
  return o;
}


import * as request from "@/network/request"
import Chart from '../../components/Chart.vue';
export default {
  components: { Chart },
  name: 'Echarts',
  data () {
		return {
			regionList: [],
			titleData: ['创建', '流程中', '已入职', '淘汰'],
			xData: {
				type: 'category',
				data: [],
				axisPointer: {
					type: 'shadow'
				},
				axisLabel: {
					rotate: 50, //文字旋转
				}
			},
			yData1: {
				type: 'value',
				name: '人数',
				min: 0,
				max: 30,
				interval: 3,
				axisLabel: {
					formatter: '{value} '
				}
			},
			// yData2: {
			// 	type: 'value',
			// 	name: '满足度',
			// 	min: 0,
			// 	max: 100,
			// 	interval: 5,
			// 	axisLabel: {
			// 		formatter: '{value} %'
			// 	}
			// },
			series1: {
				name: '创建',
				type: 'bar',
				tooltip: {
					valueFormatter: function (value) {
						return value + '人';
					}
				},
				data: []
			},
			series2: {
				name: '流程中',
				type: 'bar',
				tooltip: {
					valueFormatter: function (value) {
						return value + '人';
					}
				},
				data: []
			},
			series3: {
				name: '已入职',
				type: 'bar',
				tooltip: {
					valueFormatter: function (value) {
						return value + '人';
					}
				},
				data: []
			},
			series4: {
				name: '淘汰',
				type: 'bar',
				tooltip: {
					valueFormatter: function (value) {
						return value + '人';
					}
				},
				data: []
			},
      selectDate:[],
			department: undefined,
			chartType: undefined,
			region: undefined,
		}
  },
  methods: {
    onChange (dateString) {
			this.selectDate = []
      let aa =  deepCopy(dateString[0])
      let bb =  deepCopy(dateString[1])
      console.log(aa.format('YYYY-MM-DD 00:00:00'));
      console.log(bb.format('YYYY-MM-DD 23:59:59'));
      this.selectDate.push(aa.format('YYYY-MM-DD 00:00:00'))
      this.selectDate.push(bb.format('YYYY-MM-DD 23:59:59'))
      console.log(this.selectDate);
    },
    onOk (dateString) {
      this.selectDate = dateString
		},
		build () {
			console.log(this.chartType);
			console.log(this.department);
			console.log(this.selectDate);
			console.log(this.region);
			let res = {
        chartType: this.chartType,
        department: this.department,
        date: this.selectDate,
        region: this.region
      }
      request.request({
      url: this.getBaseUrl() + 'get_applicant_pic/',
      method: 'post',
      data: res
      }).then(res =>{
				let picValue = res.data.picValue
				console.log(picValue);
				this.xData = {
					type: 'category',
					data: picValue.xName,
					axisPointer: {
						type: 'shadow'
					}
				}
				this.series1 = {
					name: '创建',
					type: 'bar',
					tooltip: {
						valueFormatter: function (value) {
							return value + '人';
						}
					},
					data: picValue.x1
				}
				this.series2 = {
					name: '流程中',
					type: 'bar',
					tooltip: {
						valueFormatter: function (value) {
							return value + '人';
						}
					},
					data: picValue.x2
				}
				this.series3 = {
					name: '已入职',
					type: 'bar',
					tooltip: {
						valueFormatter: function (value) {
							return value + '人';
						}
					},
					data: picValue.x3
				}
				this.series4 = {
					name: '淘汰',
					type: 'bar',
					tooltip: {
						valueFormatter: function (value) {
							return value + '人';
						}
					},
					data: picValue.x4
				}
      }).catch(err =>{
        console.log(err);
      })
		},
		getRegionList2 () {
      request.request({
      url: this.getBaseUrl() + 'get_applicant_region/',
      method: 'post',
      }).then(res =>{
				this.regionList = res.data.regionList
			}).catch(err =>{
        console.log(err);
      })
		}
	},
	created () {
		this.getRegionList2()
	}
}
</script>
 
<style>
.midPic{
	position: absolute;
	top: 30%;
	left: 30%;
}

.chartMenu{
	margin: 40px;	
}
</style>