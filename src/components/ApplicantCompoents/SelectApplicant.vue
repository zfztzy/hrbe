<template>
	<div v-show="isSelectApplicant">
		<div class="selectApplicant">
			<!-- <el-scrollbar style="height:100%">
					<a-row :gutter="16"  style="margin: 20px" >
							<a-col :span="4">
									<a-statistic v-if='model.name' title="姓名" :value="model.name" style="margin-right: 50px"/>
									<a-statistic v-else title="姓名" value="---" class="demo-class"/>
							</a-col>
							<a-col :span="4">
									<a-statistic v-if='model.process_status' title="流程状态" :value="model.process_status" class="demo-class"/>
									<a-statistic v-else title="流程状态" value="---" class="demo-class"/>
							</a-col>
							<a-col :span="4">
									<a-statistic v-if='model.resume_status' title="简历状态" :value="model.resume_status" class="demo-class"/>
									<a-statistic v-else title="简历状态" value="---" class="demo-class"/>
							</a-col>
							<a-col :span="8">
									<a-statistic title="电话" :value="model.phone_num" groupSeparator="" class="demo-class"/>
							</a-col>
							<a-col :span="4">
									<a-statistic title="姓名" :value="model.name" style="margin-right: 50px"/>
							</a-col>
							<a-col :span="4">
									<a-statistic v-if='model.graduated_from' title="毕业院校" :value="model.graduated_from" class="demo-class"/>
									<a-statistic v-else title="毕业院校" value="---" class="demo-class"/>
							</a-col>
					</a-row>
					<a-row :gutter="16"  style="margin: 20px" >
							<a-col :span="4">
									<a-statistic v-if='model.education' title="学历" :value="model.education" class="demo-class"/>
									<a-statistic v-else title="学历" value="---" class="demo-class"/>
							</a-col>
							<a-col :span="4">
									<a-statistic v-if='model.major' title="专业" :value="model.major" class="demo-class"/>
									<a-statistic v-else title="专业" value="---" class="demo-class"/>
							</a-col>
							<a-col :span="4">
									<a-statistic v-if='model.working_seniority' title="工作年限" :value="model.working_seniority" class="demo-class"/>
									<a-statistic v-else title="工作年限" value="---" class="demo-class"/>
							</a-col>
							<a-col :span="4">
									<a-statistic v-if='model.job' title="面试岗位" :value="model.job" class="demo-class"/>
									<a-statistic v-else title="面试岗位" value="---" class="demo-class"/>
							</a-col>
							<a-col :span="4">
									<a-statistic v-if='model.region' title="地域" :value="model.region" class="demo-class"/>
									<a-statistic v-else title="地域" value="---" class="demo-class"/>
							</a-col>
							<a-col :span="4">
									<a-statistic v-if='model.sex' title="性别" :value="model.sex" class="demo-class"/>
									<a-statistic v-else title="性别" value="---" class="demo-class"/>
							</a-col>
					</a-row>
					<a-row :gutter="16"  style="margin: 20px" >
							<a-col :span="4">
									<a-statistic v-if='model.suggest_level' title="建议职级" :value="model.suggest_level" class="demo-class"/>
									<a-statistic v-else title="建议职级" value="---" class="demo-class"/>
							</a-col>
							<a-col :span="4">
									<a-statistic v-if='model.entrance' title="入学日期" :value="model.entrance" class="demo-class"/>
									<a-statistic v-else title="入学日期" value="---" class="demo-class"/>
							</a-col>
							<a-col :span="4">
									<a-statistic v-if='model.graduation' title="毕业日期" :value="model.graduation" class="demo-class"/>
									<a-statistic v-else title="毕业日期" value="---" class="demo-class"/>
							</a-col>
							<a-col :span="4">
									<a-statistic v-if='model.related' title="关联需求" :value="model.related" class="demo-class"/>
									<a-statistic v-else title="关联需求" value="---" class="demo-class"/>
							</a-col>
							<a-col :span="4">
									<a-statistic v-if='model.arrival_time' title="能够到岗时间" :value="model.arrival_time" class="demo-class"/>
									<a-statistic v-else title="能够到岗时间" value="---" class="demo-class"/>
							</a-col>
							<a-col :span="4">
									<a-statistic v-if='model.recommender' title="招聘顾问" :value="model.recommender" class="demo-class"/>
									<a-statistic v-else title="招聘顾问" value="---" class="demo-class"/>
							</a-col>
					</a-row>
					<a-row :gutter="16"  style="margin: 20px" >
							<a-col :span="4">
									<a-statistic v-if='model.recommend_time' title="推荐时间" :value="model.recommend_time" class="demo-class"/>
									<a-statistic v-else title="推荐时间" value="---" class="demo-class"/>
							</a-col>
							<a-col :span="4">
									<a-statistic v-if='model.own_interviewer' title="软通面试人" :value="model.own_interviewer" class="demo-class"/>
									<a-statistic v-else title="软通面试人" value="---" class="demo-class"/>
							</a-col>
							<a-col :span="4">
									<a-statistic v-if='model.own_interview_results' title="软通面试结果" :value="model.own_interview_results" class="demo-class"/>
									<a-statistic v-else title="软通面试结果" value="---" class="demo-class"/>
							</a-col>
							<a-col :span="4">
									<a-statistic v-if='model.reason1' title="原因" :value="model.reason1" class="demo-class"/>
									<a-statistic v-else title="原因" value="---" class="demo-class"/>
							</a-col>
							<a-col :span="4">
									<a-statistic v-if='model.own_interview_time' title="软通面试时间" :value="model.own_interview_time" class="demo-class"/>
									<a-statistic v-else title="软通面试时间" value="---" class="demo-class"/>
							</a-col>
							<a-col :span="4">
									<a-statistic v-if='model.machine_test_type' title="软通机试类型" :value="model.machine_test_type" class="demo-class"/>
									<a-statistic v-else title="软通机试类型" value="---" class="demo-class"/>
							</a-col>
					</a-row>
					<a-row :gutter="16"  style="margin: 20px" >
							<a-col :span="4">
									<a-statistic v-if='model.machine_test_score' title="机试成绩" :value="model.machine_test_score" class="demo-class"/>
									<a-statistic v-else title="机试成绩" value="---" class="demo-class"/>
							</a-col>
							<a-col :span="4">
									<a-statistic v-if='model.machine_test_time' title="机试时间" :value="model.machine_test_time" class="demo-class"/>
									<a-statistic v-else title="机试时间" value="---" class="demo-class"/>
							</a-col>
							<a-col :span="4">
									<a-statistic v-if='model.hw_interviewer1' title="华为技面人" :value="model.hw_interviewer1" class="demo-class"/>
									<a-statistic v-else title="华为技面人" value="---" class="demo-class"/>
							</a-col>
							<a-col :span="4">
									<a-statistic v-if='model.hw_interview_results1' title="华为技面结果" :value="model.hw_interview_results1" class="demo-class"/>
									<a-statistic v-else title="华为技面结果" value="---" class="demo-class"/>
							</a-col>
							<a-col :span="4">
									<a-statistic v-if='model.hw_interview_time1' title="华为技面时间" :value="model.hw_interview_time1" class="demo-class"/>
									<a-statistic v-else title="华为技面时间" value="---" class="demo-class"/>
							</a-col>
							<a-col :span="4">
									<a-statistic v-if='model.hw_interviewer2' title="华为综面人" :value="model.hw_interviewer2" class="demo-class"/>
									<a-statistic v-else title="华为综面人" value="---" class="demo-class"/>
							</a-col>
					</a-row>
					<a-row :gutter="16"  style="margin: 20px" >
							<a-col :span="4">
									<a-statistic v-if='model.hw_interview_results2' title="华为综面结果" :value="model.hw_interview_results2" class="demo-class"/>
									<a-statistic v-else title="华为综面结果" value="---" class="demo-class"/>
							</a-col>
							<a-col :span="4">
									<a-statistic v-if='model.hw_interview_time2' title="华为综面时间" :value="model.hw_interview_time2" class="demo-class"/>
									<a-statistic v-else title="华为综面时间" value="---" class="demo-class"/>
							</a-col>
							<a-col :span="4">
									<a-statistic v-if='model.final_result' title="入项结果" :value="model.final_result" class="demo-class"/>
									<a-statistic v-else title="入项结果" value="---" class="demo-class"/>
							</a-col>
							<a-col :span="4">
									<a-statistic v-if='model.final_time' title="入项时间" :value="model.final_time" class="demo-class"/>
									<a-statistic v-else title="入项时间" value="---" class="demo-class"/>
							</a-col>
					</a-row>
			</el-scrollbar> -->
			<a-table :columns="columns" :data-source="[model]">
				<a slot="name" slot-scope="text">{{ text }}</a>
			</a-table>
			<a-button @click="close" class="cancelButtom">关闭</a-button>
		</div>
	</div>
</template>

<script>
import moment from 'moment';
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

export default {
	props: {
		isSelectApplicant: {
			type: Boolean,
			default: false
		},
		Applicant: {
			type: Object
		}
	},
	data() {
		return {
			None: '+86',
			model: {},
			columns: [
				{
				title: 'key',
				dataIndex: 'key',
				key: 'key',
				},
				{
				title: '推荐时间',
				dataIndex: 'recommend_time',
				key: 'recommend_time',
				},
				{
				title: '招聘',
				dataIndex: 'recommender',
				key: 'recommender',
				},
				{
				title: '候选人姓名',
				dataIndex: 'name',
				key: 'name',
				},
				{
				title: '联系电话',
				dataIndex: 'phone_num',
				key: 'phone_num',
				},
				{
				title: '性别',
				dataIndex: 'sex',
				key: 'sex',
				},
				{
				title: '学历',
				dataIndex: 'education',
				key: 'education',
				},
				{
				title: '学校',
				dataIndex: 'graduated_from',
				key: 'graduated_from',
				},
				{
				title: '专业',
				dataIndex: 'major',
				key: 'major',
				},
				{
				title: '毕业时间',
				dataIndex: 'graduation',
				key: 'graduation',
				},
				{
				title: '工作年限',
				dataIndex: 'working_seniority',
				key: 'working_seniority',
				},
				{
				title: '技术方向',
				dataIndex: 'job',
				key: 'job',
				},
				{
				title: '/在/离职状态',
				dataIndex: 'education',
				key: 'education',
				},
				{
				title: '期望面试时间及方式',
				dataIndex: 'education',
				key: 'education',
				},
				{
				title: '意向地',
				dataIndex: 'education',
				key: 'education',
				},
				{
				title: 'HR沟通记录',
				dataIndex: 'education',
				key: 'education',
				},
			]
		};
	},
	methods: {
		close () {
			this.$emit('close')
		},
		formatDate (date) {
			if (date) {
				date = moment(date).format('YYYY-MM-DD')
				console.log(date); 
				return date
			}
		},
		formatDateTime (date) {
			if (date) {
				date = moment(date).format('YYYY-MM-DD HH:MM:ss')
				return date
			}
		}
	},
	mounted () {
		this.model = deepCopy(this.Applicant)
		// this.model.hw_interview_time2 = this.formatDateTime(this.model.hw_interview_time2)
		// this.model.hw_interview_time1 = this.formatDateTime(this.model.hw_interview_time1)
		// this.model.machine_test_time = this.formatDateTime(this.model.machine_test_time)
		// this.model.own_interview_time = this.formatDateTime(this.model.own_interview_time)
		// this.model.recommend_time = this.formatDate(this.model.recommend_time)
		// this.model.arrival_time = this.formatDate(this.model.arrival_time)
		// this.model.final_time = this.formatDate(this.model.final_time)
		// this.model.entrance = this.formatDate(this.model.entrance)
		// this.model.graduation = this.formatDate(this.model.graduation)
	},
	watch: {
		Applicant: {
			handler: function (newValue, oldValue) {
				console.log(newValue)
				console.log(oldValue)
				this.model = deepCopy(this.Applicant)
				// this.model.hw_interview_time2 = this.formatDateTime(this.model.hw_interview_time2)
				// this.model.hw_interview_time1 = this.formatDateTime(this.model.hw_interview_time1)
				// this.model.machine_test_time = this.formatDateTime(this.model.machine_test_time)
				// this.model.own_interview_time = this.formatDateTime(this.model.own_interview_time)
				// this.model.recommend_time = this.formatDate(this.model.recommend_time)
				// this.model.arrival_time = this.formatDate(this.model.arrival_time)
				// this.model.final_time = this.formatDate(this.model.final_time)
				// this.model.entrance = this.formatDate(this.model.entrance)
				// this.model.graduation = this.formatDate(this.model.graduation)
			}
		}
	}
}
</script>

<style>
.selectApplicant {
  width: 98%;
  height: 90%;
  position: fixed;
  background-color: #fff;
  z-index: 999;
  left: 1%;
  top: 5%;
  border-radius: 2%
}

.cancelButtom {
  position: absolute;
  right: 5%;
  bottom: 5%;
}
</style>