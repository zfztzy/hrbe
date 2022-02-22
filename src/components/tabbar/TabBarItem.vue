<template>
    <div class="tab-bar-item" @click="itemClick">
        <slot v-if="!isActive" name="item-icon"></slot>
        <slot v-else name="item-active"></slot>
        <div :style="activeStyle">
            <slot name="item-text"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name:'TabBarItem',
    props:{
        'path':String,
        activeColor:{
            type:String,
            default:'#00a1d6'
        }
    },

    computed:{
        isActive(){
            return this.$route.path.indexOf(this.path) !==-1
        },
        activeStyle(){
            return this.isActive ? {color: this.activeColor} : {}
        }

    },
    methods:{
        itemClick(){
            this.$router.push(this.path)
        }
    }

}
</script>

<style>

.tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    box-shadow: 0px -0.5px 1px rgba(35, 35, 35, 0.08);
}

.tab-bar-item img{
    margin-top: 3px;
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
}
.active{
  color: #00a1d6;
}
</style>