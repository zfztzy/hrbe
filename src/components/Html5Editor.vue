<template>
    <div v-show="isHtml5Editor">
        <!-- Two-way Data-Binding -->
        <template v-if="editing">
            <quill-editor
                ref="myQuillEditor"
                v-model="content"
                :options="editorOption"
                style="height:300px"
            />    
            <a-button @click="confirm"  style="position: absolute; right:100px; bottom: 20px"> 确定 </a-button>
            <a-button @click="close" style="position: absolute; right:20px; bottom: 20px"> 取消 </a-button>
        </template>
        <template v-else>         
            <el-scrollbar style="margin:60px; height:300px">
                <div v-html="content"></div>
            </el-scrollbar>
            <a-button @click="edit" style="position: absolute; right:100px; bottom: 20px"> 修改 </a-button>
            <a-button @click="close" style="position: absolute; right:20px; bottom: 20px"> 取消 </a-button>
        </template>
    </div>
</template>

<script>
// import * as request from "../../network/request"
export default {
    props: {
        isHtml5Editor: {
            type: Boolean,
            default: false
        },
        model: {
            type: Object
        },
        editType: {
            type: Boolean
        }
    },
    data() {
        return {
            content: '<h2>I am Example</h2>',
            //富文本编辑器配置
            editorOption: {
            // Some Quill options...
            },
            editing: false
        };
    },
    methods: {
        close() {
            this.$emit('close')
        },
        onEditorBlur(quill) {
            console.log('editor blur!', quill)
        },
        //获得焦点事件
        onEditorFocus(quill) {
            console.log('editor focus!', quill)
        },
        // 准备富文本编辑器
        onEditorReady(quill) {
            console.log('editor ready!', quill)
        },
        //内容改变事件
        onEditorChange({ quill, html, text }) {
            console.log('editor change!', quill, html, text)
            this.content = html
        },
        confirm () {
            this.$emit('confirm', {model:this.model, value: this.content})
            this.close()
            this.editing = false
        },
        edit () {
            this.editing = true
        },
        cancel () {
            this.editing = false
        },
        editUpdate () {
            this.editing = this.editType
        }
    },
    created() {
    },
    mounted() {
    },
    watch: {
        model: {
            handler (newValue) {
                if(newValue.requirements) {
                    this.content = newValue.requirements
                    this.editUpdate()
                } else {
                    this.content = ''
                    this.editUpdate()
                }
            }
        },
        editType: {
            handler (newValue) {
                this.editing = newValue
            }
        }
    }
}
</script>

<style>
.Html5EditorBack {
  width: 98%;
  height: 90%;
  position: fixed;
  background-color: #fff;
  z-index: 999;
  left: 1%;
  top: 5%;
  border-radius: 2%
}
</style>