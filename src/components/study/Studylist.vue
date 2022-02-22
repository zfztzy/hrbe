<template>
    <div>
        <div v-for='(i, index) in slist' :key="index" class="studyBox">
            <div class="studyTextbox" @click="studyDetail(i.id)">
                <h2 class="studyTitle">{{index+1}}、 {{i.title}} </h2>
                <p class="studyContent">{{i.content}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'SList',
    props:['slist'],
    data(){
        return{
        }
    },
    methods:{
        studyDetail(id){
            this.$router.push({path:'/study/content',query: {id:id}})
        },
    },


    
}
</script>

<style>
.studyBox{
    margin: 20px;
    padding: 20px;
    overflow: hidden;
    width: 700px;
    background-color: #ffffff;
    border: 0.1px solid rgb(236, 234, 234);
    box-shadow: 5px 5px 2.5px #888888;
}

.studyTextbox{
    float: right;
    width: 100%;
}

.studyTitle{
    color: #00a1d6;
    text-decoration: none;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp:1;
    -webkit-box-orient: vertical;
}


.studyContent{
    font: normal normal normal 14px/1 FontAwesome;
    font-size: inherit;
    text-rendering: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp:2;
    -webkit-box-orient: vertical;
}
</style>