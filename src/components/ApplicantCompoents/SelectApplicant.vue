<template>
	<div v-show="isSelectApplicant">
		<div class="selectApplicant">
			<a-table :columns="columns" :data-source="[model]" :pagination="false" :rowKey="(record,index)=>{return index}" style="margin: 15px">
				<a slot="name" slot-scope="text">{{ text }}</a>
			</a-table>
      <a-button type="" style="position: absolute; right: 10%; bottom: 5%;" @click="handleCopy()">复制</a-button>
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
				title: '在/离职状态',
				dataIndex: 'onjob',
				key: 'onjob',
				},
				{
				title: '期望面试时间及方式',
				dataIndex: 'interviews',
				key: 'interviews',
				},
				{
				title: '意向地',
				dataIndex: 'region',
				key: 'region',
				},
				{
				title: 'HR沟通记录',
				dataIndex: 'reason1',
				key: 'reason1',
				}
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
		},handleCopy() {
      const that = this
      let text = ''
      for (let i in this.columns) {
        console.log(this.columns[i]);
        if (this.columns[i].title) {
          text += this.columns[i].title
          text += '\t'
        }
      }
      text += '\n'
      for (let i in this.columns) {
        console.log(this.columns[i]);
        if (this.columns[i].title) {
          text += this.model[this.columns[i].dataIndex]
          text += '\t'
        }
      }
      console.log(text);
      this.$copyText(text)
      .then(() => {
        that.$message.success('复制成功')
      })
      .catch(() => {
        that.$message.success('复制失败')
      })
    },
    
	},
	mounted () {
    this.model = deepCopy(this.Applicant)
	},
	watch: {
		Applicant: {
			handler: function (newValue, oldValue) {
				console.log(newValue)
				console.log(oldValue)
				this.model = deepCopy(this.Applicant)
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