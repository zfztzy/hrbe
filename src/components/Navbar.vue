<template>
    <div style="position: sticky; top:0; z-index: 3;">
        <div :class='{navbar: true}'  :style="pagestyle">
            <slot></slot>
            <a @mouseover ='show()' @mouseleave="none()" :class="{barright:true}">二维码</a>
        </div>
        <img v-show="isShow" @mouseover ='show()' @mouseleave="none()" src="../assets/Reward.jpeg" class="navbarImg" alt="">
    </div>
</template>

<script>
export default {
    name:'Navbar',
    props:{
        links:Array,
        pagestyle:{
            type:String,
            default:'background-color: #333333;'
        },
    },
    data(){
        return{
            isShow:false
        }
    },
    methods:{
        show(){
            this.isShow = true
        },
        none(){
            this.isShow = false
        }
    }
}
</script>

<style>
/* 导航 */
.navbar {
    overflow: hidden;
    background-color: #333333;
    color: white;
    box-shadow: 0px 1px 1px rgba(29, 29, 29, 0.088);
}
 
/* 导航栏样式 */
.navbar a {
    float: left;
    display: block;
    text-align: center;
    padding: 14px 20px;
    text-decoration: none;
}

.navbar a.barright {
    float: right;
    margin-right: 4%;
}
 
/* 鼠标移动到链接的颜色 */
.navbar a:hover {
    background-color: #ddd;
    color: black;
    
}

/* 响应式布局 - 在屏幕设备宽度尺寸小于 400px 时, 让导航栏目上下堆叠显示 */
@media screen and (max-width: 400px) {
    .navbar a {
        float: none;
        width: 100%;
    }
}

.navbarImg{
    position: absolute;
    right: 0.5%;
    height:80px;
    width: 80px;
    border-radius: 50%;
    margin-right:4%;
    margin-top: 10px;
    transform:scale(2)
    
}
</style>